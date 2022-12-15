---
tags:
    - tech
---

# Technical specifications
<!-- markdownlint-disable MD013 MD037 -->

{% macro get_value(category, item, attr="value", rnd=0, fmt="{:,}") -%}
    {%- set val = facts   | selectattr("name", "==", category)
                          | map(attribute="fields") | first
                          | selectattr("name", "==", item)
                          | map(attribute=attr) | first -%}
    {%- if val is number -%} {# round numbers #}
        {%- if '.' not in val|string -%} {# convert ints back to int #}
            {%- set val = val | round(rnd, "floor") | int -%}
        {%- else -%} {# keep floats as is #}
            {%- set val = val | round(rnd, "floor") -%}
        {%- endif -%}
    {%- endif -%}
    {{ fmt.format(val) }}
{%- endmacro -%}


## In a nutshell

Sherlock features over **{{ get_value("hardware", "compute nodes", rnd=-2)
}}** compute nodes, **{{ get_value("computing", "CPU cores", rnd=-2) }}+** CPU
cores and **{{ get_value("computing", "GPUs", rnd=-2) }}+** GPUs, for a total
computing power of more than **{{ get_value("computing", "PFLOPs (FP64)", rnd=1) }}**
Petaflops. That would rank it in the Top500 list of the most powerful
supercomputers in the world.

The cluster currently extends {{ get_value("networking", "Infiniband switches",
"desc", fmt="{}") }}. A **{{ get_value("storage", "`$SCRATCH`", fmt="{}") |
filesizeformat }}** {{ get_value("storage", "`$SCRATCH`", "desc", fmt="{}") }},
provides scratch storage for more than **{{ get_value("users", "user accounts",
rnd=-2) }}** users, and **{{ get_value("users", "PI groups", rnd=-2) }}** PI
groups.


## Resources

The Sherlock cluster has been initiated in January 2014 with a base of freely
available computing resources (about 2,000 CPU cores) and the accompanying
networking and storage infrastructure (about 1 PB of shared storage).

Since then, it's been constantly expanding, spawning multiple cluster
generations, with numerous contributions from many research groups on campus.

!!! sherlock "Cluster generations"

    For more information about Sherlock's ongoing evolution and expansion,
    please see [Cluster generations][url_clugens].

### Interface

| Type           | Qty  | Details |
| ---            | ---: |         |
| [login nodes][url_login] | {{ get_value("interfaces", "login nodes") }} :octicons-server-24: | `sherlock.stanford.edu` (load-balanced) |
| [data transfer nodes][url_dtn] | {{ get_value("interfaces", "data transfer nodes (DTNs)") }} :octicons-server-24: | dedicated bandwidth for large data transfers |

### Computing

!!! info "Access to computing resources"

    Computing resources marked with :material-lock-open-outline:{: .chk_yes :}
    below are freely available to every Sherlock user. Resources marked with
    :material-lock-outline:{: .chk_no :} are only accessible to Sherlock
    [owners][url_owners] and their research teams.



<style>
th:nth-child(2)  { min-width: 0 !important;
</style>

| Type  | Access | Nodes | CPU cores | Details |
| ---   | :---:   | ---:  | ---:      | ---     |
{%- set partitions = facts | selectattr("name", "==", "partitions") | first -%}
{%- for part in partitions.fields %}
| {{ part.desc }}<br/><small>**`{{ part.name }}`** partition</small>  | {{ part.access
        | replace("public",  ":material-lock-open-outline:{: .chk_yes :}")
        | replace("private", ":material-lock-outline:{: .chk_no :}") -}}
| {{- '{:,}'.format(part.nodes) }} :octicons-server-24: | {{ '{:,}'.format(part.cores) }} :octicons-cpu-24: | <small>
    {%- if part.name != "owners" -%}
        {{ part.details | replace("\n","<br/>")
                        | replace(" nodes w/", "x")
                        | replace("-core", " :octicons-cpu-24:")
                        | replace(" GPUs"," :material-expansion-card:")
                        | replace("IB, ", "IB<br/><span style='visibility: hidden'>- </span>")
        }}
    {%- else -%}
        {%- set d = part.details -%}
        {{ d.split("\n")|length }} different node configurations, including GPU and _bigmem_ nodes
    {%- endif -%}
</small> |
{%- endfor %}
| **Total** | | **{{ get_value("hardware", "compute nodes") }} :octicons-server-24:** | **{{ get_value("computing", "CPU cores") }} :octicons-cpu-24:** | **{{ get_value("computing", "GPUs") }} :material-expansion-card:** |



### Storage

!!! info "More information"

    For more information about storage options on Sherlock, please refer to the
    [Storage section][url_storage] of the documentation.

Sherlock is architected around shared storage components, meaning that users
can find the same files and directories from all of the Sherlock nodes.

* Highly-available NFS filesystem for user and group home directories (with
  hourly snapshots and off-site replication)
* High-performance Lustre scratch filesystem ({{ get_value("storage",
  "`$SCRATCH`", fmt="{}") | filesizeformat }} {{ get_value("storage",
  "`$SCRATCH`", "desc", fmt="{}") | replace("**","") }})
* Direct access to SRCC's [Oak][url_oak] long-term research data storage system
  ({{ get_value("storage", "`$OAK`", fmt="{}") | filesizeformat }})



[comment]: #  (link URLs -----------------------------------------------------)
[url_status]:  https://status.sherlock.stanford.edu
[url_gpus]:    /docs/user-guide/gpu
[url_storage]: /docs/storage
[url_login]:   /docs/user-guide/running-jobs/#login-nodes
[url_dtn]:     /docs/storage/data-transfer#data-transfer-node-dtn
[url_oak]:     //uit.stanford.edu/service/oak-storage
[url_clugens]: /docs/concepts/#cluster-generations
[url_owners]:  /docs/concepts/#investing-in-sherlock



--8<--- "includes/_acronyms.md"
