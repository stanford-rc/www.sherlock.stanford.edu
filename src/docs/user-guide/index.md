---
icon: material/book-open-variant
tags:
    - overview
---

# User guide

This section covers the core of using Sherlock day-to-day once you have an
account and can connect to the cluster.

<div class="grid cards" markdown>

- :material-play-circle: **[Running jobs](running-jobs.md)**

    ---

    All computational work on Sherlock must go through the [Slurm][url_slurm]
    scheduler. Login nodes are shared and have strict resource limits; they are
    only suitable for lightweight tasks. This page covers how to request
    resources, write batch scripts, and submit and monitor your work.

    [:octicons-arrow-right-24: Running jobs](running-jobs.md)

- :material-web: **[OnDemand](ondemand.md)**

    ---

    Sherlock OnDemand provides a web-based interface to the cluster, accessible
    from any browser without a SSH client. Manage files, submit and monitor
    jobs, and launch interactive applications such as Jupyter notebooks,
    RStudio, or a full remote desktop session.

    [:octicons-arrow-right-24: OnDemand](ondemand.md)

- :material-expansion-card: **[Specialized resources](gpu.md)**

    ---

    Sherlock includes nodes with GPUs and other specialized hardware for
    workloads that require them. This page covers how to request and use GPU
    nodes in your jobs.

    [:octicons-arrow-right-24: GPU nodes](gpu.md)

- :material-bug-outline: **[Troubleshooting](troubleshoot.md)**

    ---

    When something isn't working as expected, this page covers how to diagnose
    common problems and how to submit an effective support request to the SRCC
    team.

    [:octicons-arrow-right-24: Troubleshooting](troubleshoot.md)

</div>


[comment]: #  (link URLs -----------------------------------------------------)

[url_slurm]:    //slurm.schedmd.com/


--8<--- "includes/_acronyms.md"
