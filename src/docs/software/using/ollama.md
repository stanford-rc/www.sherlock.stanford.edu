## Introduction

[Ollama][url_ollama] is a relatively easy way to get up and running with LLMs, specifically with chatbots. It supports easy swapping and retraining of prominent models like Llama, Gemma, Qwen, and Mistral, specifically locally so your research data is more secure from data exfil. The Sherlock module hosts many of these modules for seamless loading, though you can also pull and retrain them yourself if you'd prefer.

## More documentation

This documentation covers basic usage on Sherlock. For more advanced documentation of Ollama, please see the [Ollama documentation][url_ollama_docs].

## Ollama on Sherlock

Ollama is available on Sherlock and the corresponding [module][url_modules] can be
loaded with:

``` none
$ ml Ollama
```

To read more about the module, you can execute `ml spider Ollama` at the Sherlock
prompt, or refer to the [Software list page][url_software_list].

## Basic Usage

After loading the module, you will likely need to request a GPU to support inference.

``` none
$ salloc --mem-per-gpu 16GB --cpus-per-gpu 4 -p gpu -G 1 -C GPU_MEM:32GB
```

should be enough to handle all but the highest parameter models, though it may be a bit overkill for very low parameter models. You can tweak the allocation as needed.

Once you have a GPU, you need to start an Ollama server:

``` none
$ ollama serve
``` 

Your prompt may seem to disappear at this point, but with the server up, you can pull a model from the [Ollama model library][url_ollama_library]:

``` none
ollama pull <model name>
```

The model will download or--if it is available locally in the Sherlock model library--reference the local model. Now you can run the model with:

``` none
ollama run <model name>
```

Once the model is running, you can query at you would any other LLM.

## Model management

There are several commands for managing the models available to you on Sherlock:

List your models:		```ollama list```
List currently loaded models:	```ollama ps```
Stop a running model:		```ollama stop <model name>```
Show model info:		```ollama show <model name>```
Remove a model:			```ollama rm <model name>```

## Advanced usage

You can do things like customize a model with Ollama. Refer to ["Customize a model"][url_ollama_customize] in their documentation for instructions.	

[comment]: # (link URLS ---------------------------------------------------)

[url_ollama]:		//https://ollama.com/
[url_ollama_docs]:	//https://github.com/ollama/ollama/
[url_ollama_library]:	//https://ollama.com/library
[url_ollama_customize]:	//https://github.com/ollama/ollama?tab=readme-ov-file#customize-a-model

[url_modules]:          ../modules.md
