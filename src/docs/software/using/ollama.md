---
icon: simple/ollama
tags:
    - software
    - AI
---

## Introduction

[Ollama][url_ollama] provides a streamlined way to start using Large Language
Models (LLMs). It allows users to easily swap and retrain popular models such
as Llama, Gemma, Qwen, and Mistral on their local systems, enhancing the
security of research data. Sherlock provides an Ollama module that handles the environment setup, and
many popular models are cached on Sherlock so they can be pulled quickly
without downloading from the internet. Alternatively, users can
pull and retrain models themselves for greater flexibility.

!!! tip "Why run your own LLM on Sherlock?"

    Running your own LLM instance on Sherlock GPU nodes has several advantages
    over cloud-based AI services:

    - your code, data, and prompts never leave Stanford's infrastructure, which
      matters when working with unpublished results or sensitive research data
    - there is no per-token cost, no subscription, and no rate limits, so you
      can run long agentic sessions, process large codebases, or repeat queries
      freely without watching a usage meter or hitting a cap mid-task
    - GPU allocations on Sherlock are free to use, and large open-source models
      (32B+) that would be expensive to access through commercial APIs are
      available at no cost

### More documentation

The following documentation is specifically intended for using Ollama on
Sherlock. For more complete documentation about Ollama in general, please see
the [Ollama documentation][url_ollama_docs].


## Ollama on Sherlock

Ollama is available on Sherlock and the corresponding [module][url_modules] can
be loaded with:

``` none
$ ml ollama
```

For a list of available versions, you can execute `ml spider ollama` at the
Sherlock prompt, or refer to the [Software list page][url_software_list].



## Using Ollama

### Requesting a GPU

Although not strictly required, Ollama runs best on GPUs, so you will likely
need to request a GPU to support inference.

For starters and basic testing, you can get a quick allocation on a
[lightweight GPU instance][url_gpu_instant] with:

``` none
$ sh_dev -g 1
```

For more intensive work or larger models, you can request a more robust
allocation. For example:

``` none
$ salloc -p gpu --cpus-per-task 4 -G 1 -C GPU_MEM:32GB
```

should be more than enough to handle all but the highest parameter models,
though it may be a bit overkill for very low parameter models. You can tweak
the allocation as needed.


### Starting the Ollama server

Once you have a GPU, you need to start an Ollama server:

``` none
$ ollama serve
```

This will start the server in the foreground. If you want to run it in the
background, you can use:

``` none
$ ollama serve &
```

or use a terminal multiplexer such as `tmux` or `screen`.

### Using models

You'll then need to pull a model or use one of the models available on
Sherlock. To do this, you need to open a new terminal, load the Ollama module
again, and connect to the same GPU allocation you started the server on.

To do this, from another terminal, get the name of the node you started the
server on with `squeue`, and then connect to that node with `ssh`. Once
connected, load the Ollama module again with `ml ollama`.

You can now pull a model from the [Ollama model library][url_ollama_library]:

``` none
$ ollama pull <model name>
```

The model will download (or, if it's available locally in the Sherlock model
library, it will be synchronized to your own cache location). Now you can run
the model with:

``` none
$ ollama run <model name>
```

Once the model is running, you can query at you would any other LLM.

Here's an example of running the `mistral:7b` model:

``` none
$ ollama pull mistral:7b
model mistral:7b found in on-prem cache, syncing...
[...]
success
$ ollama run mistral:7b
> In one word, what is the capital of France?
Paris.
> exit
```


### Model management

There are several commands for managing the models available to you on Sherlock:

| Command | Description |
|---------|-------------|
| `ollama list` | List your currently downloaded models. |
| `ollama ps` | List currently loaded models |
| `ollama stop <model name>` | Stop a running model |
| `ollama show <model name>` | Show model info |
| `ollama rm <model name>` | Remove a model |



## Ollama server as a batch job

### Running Ollama server in a job

You can also run the Ollama server in a batch job, and use it from other jobs,
or as a coding assistant for your development / interactive sessions.


Here's an example Slurm script that requests a GPU and starts the Ollama server:

``` bash { title="ollama_server.sh" .copy .select }
#!/bin/bash
#SBATCH --job-name      ollama_server-%j
#SBATCH --output        ollama_server-%j.out
#SBATCH --error         ollama_server-%j.err
#SBATCH --partition     gpu
#SBATCH --gpus          1
#SBATCH --constraints   [GPU_MEM:16GB|GPU_MEM:24GB|GPU_MEM:32GB|GPU_MEM:48GB|GPU_MEM:80GB]
#SBATCH --cpus-per-task 4
#SBATCH --time          02:00:00


# Load the Ollama module
ml ollama

# choose a random port for the Ollama server (>1024)
OLLAMA_PORT=$(( RANDOM % 60000 + 1024 ))
while (echo > /dev/tcp/localhost/$OLLAMA_PORT) &>/dev/null; do
    OLLAMA_PORT=$(( ( RANDOM % 60000 )  + 1024 ))
done

# Save endpoint to a known location for easy access from other sessions
echo "$SLURM_NODELIST:$OLLAMA_PORT" > ~/.ollama_server

# Start the Ollama server
echo "-----------------------------------------------------------------"
echo "Starting Ollama server on host $SLURM_NODELIST, port $OLLAMA_PORT"
echo "use OLLAMA_HOST=$SLURM_NODELIST:$OLLAMA_PORT to connect"
echo "-----------------------------------------------------------------"
echo

OLLAMA_HOST=0.0.0.0:$OLLAMA_PORT ollama serve
```

You can submit this script with `sbatch`:

``` none
$ sbatch ollama_server.sh
Submitted batch job 6515470
```

The job requests 1 GPU with at least 16GB of GPU memory, for 2 hours.

Once the job has started, you can check the output file
`ollama_server-{jobid}.out` to find the server endpoint.

``` none
$ cat ollama_server-6515470.out
-----------------------------------------------------------------
Starting Ollama server on host sh03-16n12, port 18137
use OLLAMA_HOST=sh03-16n12:18137 to connect
-----------------------------------------------------------------
[...]
```

### Connecting to the server

Once the job is running, the server endpoint is available in `~/.ollama_server`.
Open a new terminal and export it:

``` shell
$ export OLLAMA_HOST=$(cat ~/.ollama_server)
```

You can then use it directly with the Ollama CLI:

``` shell
$ ml ollama
$ ollama run qwen2.5-coder:7b
> In one word, what is the capital of France?
Paris.
> exit
```

Or set up SSH local port forwarding so the server is reachable at the standard
`localhost:11434` endpoint (useful for tools that do not support environment
variable interpolation in their configuration):

``` shell
$ ssh -NfL 11434:localhost:${OLLAMA_HOST#*:} ${OLLAMA_HOST%:*}
```


!!! info

    The Ollama server running in the Slurm job is capable of serving multiple
    clients at the same time, and it's possible to use the same server endpoint
    from multiple clients, as long as they can access the compute nodes
    (potentially through a SSH tunnel).

    Ollama can be used as a local LLM provider in several contexts on Sherlock:
    [AI coding agents][url_coding_agents], the [Zed editor][url_ai_ide], and
    the [code-server AI assistant][url_code-server-ai].



## Advanced usage

### Customizing models

You can customize a model with Ollama. Refer to ["Customize a
model"][url_ollama_customize] in their documentation for instructions.

### Increasing context window size { #num-ctx }

Ollama caps the context window at 4k tokens for GPUs with less than 24GB of
GPU memory, regardless of the model's native context size. Most coding agent
workflows need much more than that (some agents, such as Claude Code, require
64k tokens or more). Many modern models (including `qwen2.5-coder`, `llama3.1`,
and `mistral-nemo`) have native support for up to 128k tokens, but Ollama will
not use that capacity unless you explicitly configure it.

The recommended way is to create a custom model via a Modelfile:

``` none { .copy .select }
FROM qwen2.5-coder:7b
PARAMETER num_ctx 65536
```

Save that as `Modelfile`, then build and use the custom model:

``` none { .copy .select }
$ ollama create qwen2.5-coder-64k -f Modelfile
$ ollama run qwen2.5-coder-64k
```

The custom model will appear in `ollama list` and can be referenced by name in
any agent configuration. For more details, see the [Ollama Modelfile
documentation][url_ollama_modelfile].

Alternatively, you can set `OLLAMA_CONTEXT_LENGTH` when starting the server to
apply a context size globally to all models:

``` none { .copy .select }
OLLAMA_CONTEXT_LENGTH=65536 ollama serve
```

This is convenient when running Ollama as a batch job, since the value can be
set directly in the job script alongside `OLLAMA_HOST`.



[comment]: # (link URLS ---------------------------------------------------)

[url_ollama]:               //ollama.com/
[url_ollama_docs]:          //docs.ollama.com/
[url_ollama_library]:       //ollama.com/library
[url_ollama_customize]:     //github.com/ollama/ollama#customize-a-model
[url_ollama_modelfile]:     //github.com/ollama/ollama/blob/main/docs/modelfile.md
[url_continue]:             //continue.dev/

[url_gpu_instant]:          ../../user-guide/gpu.md#instant-lightweight-gpu-instances
[url_software_list]:        ../list.md
[url_modules]:              ../modules.md
[url_code-server]:          ../../user-guide/ondemand.md#vs-code
[url_code-server-ai]:       ../../user-guide/ondemand.md#ai-coding-assistant-in-code-server
[url_coding_agents]:        ../ai/coding-agents.md#using-a-local-ollama-instance
[url_ai_ide]:               ../ai/ai-ide.md
