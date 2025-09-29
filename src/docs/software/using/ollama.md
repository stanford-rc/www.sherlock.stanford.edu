## Introduction

[Ollama][url_ollama] provides a streamlined way to start using Large Language
Models (LLMs). It allows users to easily swap and retrain popular models such
as Llama, Gemma, Qwen, and Mistral on their local systems, enhancing the
security of research data. For convenience, Sherlock provides a module that
includes many of these models for seamless loading. Alternatively, users can
pull and retrain models themselves for greater flexibility.

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

For starters and basic testing, you can get a quick allocation on a lightweight
GPU instance with:

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

``` bash title="ollama_server.sh"
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

On another compute node (e.g. from another job or an interactive session), you
can connect to the server using the `OLLAMA_HOST` environment variable,
indicated by the output of the "ollama_server" server job.

Open a new terminal, request an interactive session or connect to another job
on Sherlock, and run:

``` none
$ ml ollama
$ OLLAMA_HOST=sh03-16n12:18137 ollama run mistral:7b
> In one word, what is the capital of France?
Paris.
> exit
```


!!! info

    The Ollama server running in the Slurm job is capable of serving multiple
    clients at the same time, and it's possible to use the same server endpoint
    from multiple clients, as long as they can access the compute nodes
    (potentially through a SSH tunnel).


#### Use your own coding assistant in `code-server`

You can also use the Ollama server as a coding assistant in `code-server`, the
[VS Code interactive application][url_code-server] available on Sherlock.

In the IDE, you can install the [Continue][url_continue] extension, to connect
to your local Ollama server.

After installation, the Continue icon should be visible in the left-hand side
panel, or via the ++ctrl+l++ key-binding. Before it could be used, the
estension needs to be [configured][url_continue_config] to use the Ollama
server.


Here's an example configuration snippet, assuming the Ollama server is running
on `sh03-16n12:18137`:

``` yaml
models:
  - name: Autodetect
    apiBase: http://sh03-16n12:18137
    provider: ollama
    model: AUTODETECT
```

After that, in the Continue pannel, you can start chatting with the model.

More details and examples are also available in the [Ollama
documentation][url_ollama_continue].



## Advanced usage

You can do things like customize a model with Ollama. Refer to ["Customize a
model"][url_ollama_customize] in their documentation for instructions.



[comment]: # (link URLS ---------------------------------------------------)

[url_ollama]:               //ollama.com/
[url_ollama_docs]:          //docs.ollama.com/
[url_ollama_library]:       //ollama.com/library
[url_ollama_customize]:     //github.com/ollama/ollama#customize-a-model
[url_ollama_continue]:      //ollama.com/blog/continue-code-assistant
[url_continue]:             //continue.dev/
[url_continue_config]:      //docs.continue.dev/guides/ollama-guide#how-to-configure-ollama-with-continue

[url_software_list]:        ../list.md
[url_modules]:              ../modules.md
[url_code-server]:          ../../user-guide/ondemand/#vs-code
