---
icon: material/tune
tags:
    - advanced
---

# Advanced topics

This section covers aspects of Sherlock that go beyond the basics covered in
the [Getting started](../getting-started/index.md) and [User
guide](../user-guide/index.md) sections, and require more configuration or
understanding of the underlying system.

<div class="grid cards" markdown>

- :material-lan-connect: **[Connecting](connection.md)**

    ---

    The default `login.sherlock.stanford.edu` alias is suitable for most use
    cases. This page covers scenarios where more control is needed: connecting
    to a specific login node, available authentication methods, and SSH client
    configuration options.

    [:octicons-arrow-right-24: Connection options](connection.md)

- :material-format-list-text: **[Jobs](submission-options.md)**

    ---

    Goes deeper into Slurm job configuration: the full set of `#SBATCH`
    directives, queue and wall-time limits, Slurm constraints for targeting
    specific hardware, and the service partition for lightweight recurring
    tasks such as data transfers.

    [:octicons-arrow-right-24: Job submission options](submission-options.md)

</div>


--8<--- "includes/_acronyms.md"
