---
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


### :brands-openai: Codex

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


[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:          ../modules.md
[url_sw_list]:          ../list.md
[url_ollama]:           ollama.md

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

[url_crush]:            //github.com/charmbracelet/crush
[url_crush_docs]:       //github.com/charmbracelet/crush#configuration


--8<--- "includes/_acronyms.md"
