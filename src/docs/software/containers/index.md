## Introduction

Containers are a solution to the problem of how to get software to run reliably
when moved from one computing environment to another. They also resolve
installation problems by packaging all the dependencies of an application
within a self-sustainable image, _a.k.a_ a container.

!!! info "What's a container?"

    Put simply, a container consists of an entire runtime environment: an
    application, plus all its dependencies, libraries and other binaries, and
    configuration files needed to run it, bundled into one package. By
    containerizing the application platform and its dependencies, differences
    in OS distributions and underlying infrastructure are abstracted away.


## Container solutions

There are several ways to run containers in general, and on Sherlock
specifically.

<div class="grid cards" markdown>

-   :material-docker: **[Apptainer][url_apptainer]**

    ---

    [Apptainer][url_apptainer_up] (formerly Singularity) is an open source
    container platform designed to run complex applications on high-performance
    computing (HPC) clusters in a simple, portable, and reproducible way.

    [:octicons-arrow-right-24: More information][url_apptainer]

-   More to come...


</div>


[comment]: #  (link URLs -----------------------------------------------------)

<!-- TODO -->
[url_apptainer]:    singularity.md

[url_apptainer_up]: //apptainer.org/


[comment]: #  (footnotes -----------------------------------------------------)

--8<--- "includes/_acronyms.md"
