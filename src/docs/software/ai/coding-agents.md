---
icon: material/robot
tags:
    - software
    - AI
---

# AI coding agents

## Overview

Coding agents are AI-powered CLI tools that can read and modify files, run
commands, navigate projects, and carry out multi-step development tasks,
all from your terminal.

Unlike browser-based or editor-integrated assistants, CLI agents work directly
in the environment where the code lives. On Sherlock, that means they can
operate on files in your project directories, run tests and build commands on
actual compute nodes, and integrate naturally into shell-based workflows,
without needing a graphical interface or a local copy of the code.

A few practical advantages over GUI-based tools:

- they work over SSH with no display required, making them well-suited for
  remote HPC environments
- they can be embedded in scripts or batch jobs to automate repetitive tasks
  across large codebases
- they have direct access to the same filesystems and modules as your jobs,
  so they can read logs, inspect outputs, and act on results without extra
  setup

Several of them are available on Sherlock as [modules][url_modules] and can
be loaded and used directly in interactive sessions or batch jobs.

!!! warning "Most coding agents use external services"

    With the exception of tools explicitly configured to use a local model
    (e.g. via [Ollama][url_ollama]), most coding agents send your prompts and
    code to external cloud services. Consider this when working with sensitive
    or unpublished research data.

!!! tip "Checking current versions"

    Run `ml spider <package>` to see the versions currently available on
    Sherlock, or browse the [Software list page][url_sw_list].


## Available agents

### :simple-anthropic: Claude Code

[Claude Code][url_claude_code] is an AI coding tool from Anthropic. It
understands your project, edits files, runs commands, and handles git
workflows directly from the terminal.

``` none { .copy .select }
$ ml claude-code
$ claude
```

Claude Code requires an [Anthropic API key][url_anthropic_api]:

``` none { .copy .select }
$ export ANTHROPIC_API_KEY=<your-api-key>
```

For full documentation, see the [Claude Code docs][url_claude_code_docs].


### :fontawesome-brands-google: Gemini CLI

[Gemini CLI][url_gemini_cli] is Google's open-source terminal AI agent,
powered by the Gemini model family. It offers a generous free tier.

``` none { .copy .select }
$ ml gemini-cli
$ gemini
```

Gemini CLI can authenticate via a Google account (browser-based login on first
run) or with a `GEMINI_API_KEY` environment variable:

``` none { .copy .select }
$ export GEMINI_API_KEY=<your-api-key>
```


### :brands-openai: OpenAI Codex CLI

[Codex][url_codex] is a CLI coding agent from OpenAI. It runs locally but
sends code and prompts to the OpenAI API.

``` none { .copy .select }
$ ml codex
$ codex
```

Codex requires an [OpenAI API key][url_openai_api]:

``` none { .copy .select }
$ export OPENAI_API_KEY=<your-api-key>
```


### :simple-cursor: Cursor CLI

[Cursor CLI][url_cursor_cli] is the terminal counterpart to the Cursor editor.
It requires an active [Cursor][url_cursor] account.

``` none { .copy .select }
$ ml cursor-cli
$ cursor
```


### :simple-githubcopilot: GitHub Copilot CLI

[GitHub Copilot CLI][url_copilot_cli] brings Copilot's coding assistant to
the terminal. It requires an active [GitHub Copilot][url_copilot] subscription.

``` none { .copy .select }
$ ml copilot-cli
$ gh copilot
```


### :simple-mistralai: Mistral Vibe

[Mistral Vibe][url_mistral_vibe] is a minimal CLI coding agent by Mistral AI.
It requires a [Mistral API key][url_mistral_api].

``` none { .copy .select }
$ ml mistral-vibe
$ mistral-vibe
```

``` none { .copy .select }
$ export MISTRAL_API_KEY=<your-api-key>
```


### :brands-opencode: OpenCode

[OpenCode][url_opencode] is an open-source terminal AI coding agent with a
TUI interface. It supports a wide range of model providers (OpenAI, Anthropic,
Gemini, and [many others][url_opencode_providers]), including local
[Ollama][url_ollama] instances.

``` none { .copy .select }
$ ml opencode
$ opencode
```

Providers and API keys are configured on first run via:

``` none { .copy .select }
$ opencode auth login
```


### Crush

[Crush][url_crush] is an open-source AI coding agent that supports multiple
model providers, including local [Ollama][url_ollama] instances (a
privacy-friendly option when combined with Sherlock's GPU nodes).

``` none { .copy .select }
$ ml crush
$ crush
```

See the [Crush documentation][url_crush_docs] for configuration details,
including how to point it to a local Ollama endpoint.


## Using a local Ollama instance

Running a coding agent against a local [Ollama][url_ollama] instance on a GPU
compute node is a privacy-friendly alternative to cloud API services: your code
and prompts never leave Sherlock. See the [Ollama page][url_ollama] for
instructions on starting an Ollama server as a batch job. The job script writes
the current endpoint to `~/.ollama_server`. Read it once before launching any
agent:

``` shell
$ export OLLAMA_HOST=$(cat ~/.ollama_server)
$ export OLLAMA_BASE_URL=http://$OLLAMA_HOST/v1
```

For tools that do not support environment variable interpolation in their
configuration files (such as Codex), SSH local port forwarding gives a static
`localhost:11434` endpoint that never changes:

``` shell
$ ssh -NfL 11434:localhost:${OLLAMA_HOST#*:} ${OLLAMA_HOST%:*}
```

### Configuring OpenCode

OpenCode can be configured with an `opencode.json` file in your project
directory (or at `~/.config/opencode/config.json` for a global default).
The `{env:VAR}` syntax substitutes environment variables at startup:

``` json { .copy .select title="opencode.json" }
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "{env:OLLAMA_BASE_URL}"
      },
      "models": {
        "qwen2.5-coder:7b": {
          "name": "Qwen 2.5 Coder 7B"
        }
      }
    }
  }
}
```

Replace the model ID and name with whichever model you have pulled in Ollama
(see `ollama list`). Then select the provider on first run with:

``` none
$ opencode auth login
```

### Configuring Crush

Crush reads its configuration from `~/.config/crush/crush.json`. It supports
standard shell `$VAR` substitution in configuration values, including `base_url`:

``` json { .copy .select title="~/.config/crush/crush.json" }
{
  "$schema": "https://charm.land/crush.json",
  "providers": {
    "ollama": {
      "id": "ollama",
      "name": "Local Ollama",
      "base_url": "$OLLAMA_BASE_URL",
      "type": "openai",
      "api_key": "ollama",
      "models": [
        {
          "id": "qwen2.5-coder:7b",
          "name": "Qwen 2.5 Coder 7B"
        }
      ]
    }
  }
}
```

The `api_key` field is required by the configuration format but not checked by
Ollama, so any non-empty string works.

### Other agents

Codex does not support environment variable interpolation in its configuration file,
so the cleanest approach is to use SSH local port forwarding (see above) and
keep a static `localhost:11434` endpoint in `~/.codex/config.json`:

``` json { .copy .select title="~/.codex/config.json" }
{
  "provider": "ollama",
  "providers": {
    "ollama": {
      "name": "Ollama",
      "baseURL": "http://localhost:11434/v1",
      "envKey": "OLLAMA_API_KEY"
    }
  }
}
```

The `envKey` field tells Codex which environment variable to read the API key
from. Ollama does not check it, but the variable must be set and non-empty:

``` shell
$ export OLLAMA_API_KEY=ollama
```

Claude Code uses the Ollama Anthropic-compatible endpoint, which does not have
the `/v1` suffix. Derive it from `OLLAMA_BASE_URL`:

``` { .shell .annotate }
$ ANTHROPIC_BASE_URL=http://$OLLAMA_HOST \
  ANTHROPIC_AUTH_TOKEN=ollama \              # (1)!
  ANTHROPIC_API_KEY="" \                     # (2)!
  claude --model <model-name>
```

1. Ollama accepts any non-empty token value here.
2. Overrides any real `ANTHROPIC_API_KEY` already set in your environment,
   so Claude Code does not attempt to reach the Anthropic API.

!!! tip "Context window size"

    Claude Code requires a large context window (64k tokens or more). Ollama
    defaults to 2k, so you will likely need to increase `num_ctx` before use.
    See [Increasing context window size][url_ollama_num_ctx] on the Ollama page
    for instructions.

Gemini CLI and Mistral Vibe are tied to their respective cloud API services
and do not support local model endpoints.


## Tips and tricks

### Use agents in scripts

Most agents support a non-interactive, single-prompt mode that works well in
batch jobs or shell scripts. Pass your prompt directly on the command line
instead of starting an interactive session:

``` shell
# Claude Code
$ claude -p "review this Python script for numerical stability issues"

# Gemini CLI
$ gemini -p "suggest SLURM options to optimize this job for memory use"

# Codex
$ codex -q "refactor this MPI initialization code to handle edge cases"

# Mistral Vibe
$ vibe --prompt "explain what this CUDA kernel does and how to profile it"
```

This is particularly useful for automating repetitive tasks, such as
post-processing job outputs or generating summaries of results. Most agents
also accept input via `stdin`, so you can pipe data directly:

``` shell
$ cat slurm-${SLURM_JOB_ID}.out | claude -p "the simulation failed, explain the error and suggest a fix"
$ cat results.csv | gemini -p "summarize the key trends in these simulation results"
```

### Resume sessions across SSH connections

Since HPC work often spans multiple login sessions, it helps to be able to pick
up where you left off. Claude Code saves session history automatically and lets
you resume from the command line:

``` { .shell .annotate }
$ claude --continue          # (1)!
$ claude --resume            # (2)!
$ claude --resume my-session # (3)!
```

1. resume the most recent session
2. open an interactive session picker
3. resume a named session

Name a session early with `/rename` so it's easy to find later. Sessions are
stored per project directory, so they carry over across SSH connections as long
as you work in the same directory.

### Read before you write

Before making any changes to an unfamiliar project, consider starting in a
read-only or planning mode. Claude Code calls this Plan Mode, and can be
started with:

``` shell
$ claude --permission-mode plan
```

In Plan Mode, Claude only reads files and asks questions, and makes no edits
until you approve a plan. You can also switch into it during a session with
**Shift+Tab**. This is a good habit when working on production code or shared
group repositories.

### Control output format for scripting

When integrating an agent into an existing pipeline, check whether it supports
structured output. Several agents have flags for this:

``` shell
# Claude Code: plain text response only
$ claude -p "check this script for issues" --output-format text < my_script.sh

# Claude Code: full JSON conversation log with cost and timing metadata
$ claude -p "analyze this file" --output-format json < results.py

# Gemini CLI
$ gemini -p "check this script for issues" --output-format json < my_script.sh

# Mistral Vibe
$ vibe --prompt "check this script for issues" --output json < my_script.sh

# Codex
$ codex -q --json "check this script for issues" < my_script.sh
```

This makes it straightforward to capture and process the agent's output in
a shell script or downstream tool.


[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:          ../modules.md
[url_sw_list]:          ../list.md
[url_ollama]:           ../using/ollama.md
[url_ollama_num_ctx]:   ../using/ollama.md#num-ctx

[url_claude_code]:      //github.com/anthropics/claude-code
[url_claude_code_docs]: //docs.anthropic.com/en/docs/claude-code
[url_anthropic_api]:    //console.anthropic.com/

[url_gemini_cli]:       //github.com/google-gemini/gemini-cli

[url_codex]:            //github.com/openai/codex
[url_openai_api]:       //platform.openai.com/api-keys

[url_cursor_cli]:       //cursor.com/cli
[url_cursor]:           //cursor.com

[url_copilot_cli]:      //github.com/github/copilot-cli
[url_copilot]:          //github.com/features/copilot

[url_mistral_vibe]:     //github.com/mistralai/mistral-vibe
[url_mistral_api]:      //console.mistral.ai/

[url_opencode]:           //github.com/sst/opencode
[url_opencode_providers]: //opencode.ai/docs/providers/

[url_crush]:            //github.com/charmbracelet/crush
[url_crush_docs]:       //github.com/charmbracelet/crush#configuration


--8<--- "includes/_acronyms.md"
