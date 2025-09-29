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

### Requesting a GPU (optional but recommended)

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


## Advanced usage

You can do things like customize a model with Ollama. Refer to ["Customize a
model"][url_ollama_customize] in their documentation for instructions.



[comment]: # (link URLS ---------------------------------------------------)

[url_ollama]:               //ollama.com/
[url_ollama_docs]:          //docs.ollama.com/
[url_ollama_library]:       //ollama.com/library
[url_ollama_customize]:     //github.com/ollama/ollama#customize-a-model

[url_software_list]:        ../list.md
[url_modules]:              ../modules.md
