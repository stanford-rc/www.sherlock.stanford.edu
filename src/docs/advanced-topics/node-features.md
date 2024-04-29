---
tags:
  - slurm
  - advanced

---

In heterogeneous environments, computing resources are often grouped together
into single pools of resources, to make things easier and more accessible. Most
applications can run on any type of hardware, so having all resources regrouped
in the same partitions maximizes utilization and make job submission much
easier, as users don't have dozens of options to choose from.

But for more specific use cases, it may be necessary to specifically select
the hardware jobs will run on, either for performance or reproducibility
purposes.

To that end, all the compute nodes on Sherlock have _feature_ tags assigned to
them. Multiple characteristics are available for each node, such as their
[class][url_node-class], CPU manufacturer, generation, part number and
frequency, as well as Infiniband and GPU characteristics.

!!! info "Requiring specific node features is generally not necessary"

    Using node features is an advanced topic which is generally not necessary
    to run simple jobs on Sherlock. If you're just starting, you most likely
    don't need to worry about those, they're only useful in very specific
    cases.


## Available features

The table below lists the possible features defined for each node.

| Feature name  | Description | Examples |
| ------------- | ----------- | -------- |
| `CLASS:xxx`   | Node type, as defined in the [Sherlock catalog][url_catalog] | `CLASS:SH3_CBASE`, `CLASS:SH3_G4TF64` |
| `CPU_MNF:xxx` | CPU manufacturer | `CPU_MNF:INTEL`, `CPU_MNF:AMD` |
| `CPU_GEN:xxx` | CPU generation | `CPU_GEN:RME` for AMD Rome<br/>`CPU_GEN:SKX` for Intel Skylake|
| `CPU_SKU:xxx` | CPU name | `CPU_SKU:5118`, `CPU_SKU:7502P` |
| `CPU_FRQ:xxx` | CPU core base frequency | `CPU_FRQ:2.50GHz`, `CPU_FRQ:2.75GHz` |
| `GPU_BRD:xxx` | GPU brand | `GPU_BRD:GEFORCE`, `GPU_BRD:TESLA` |
| `GPU_GEN:xxx` | GPU generation | `GPU_GEN:VLT` for Volta<br/>`GPU_GEN:AMP` for Ampere |
| `GPU_SKU:xxx` | GPU name | `GPU_SKU:A100_SXM4`, `GPU_SKU:RTX_3090` |
| `GPU_MEM:xxx` | GPU memory | `GPU_MEM:32GB`, `GPU_MEM:80GB` |
| `GPU_CC:xxx`  | GPU [Compute Capabilities][url_gpu_cc] | `GPU_CC:6.1`, `GPU_CC:8.0` |
| `IB:xxx`      | Infiniband generation/speed | `IB:EDR`, `IB:HDR` |
| `NO_GPU`      | special tag set on CPU-only nodes |


### Listing the features available in a partition

All the node features available in a partition can be listed with
`sh_node_feat` command.

For instance, to list all the GPU types in the `gpu` partition:

``` none
$ sh_node_feat -p gpu | grep GPU_SKU
GPU_SKU:P100_PCIE
GPU_SKU:P40
GPU_SKU:RTX_2080Ti
GPU_SKU:V100_PCIE
GPU_SKU:V100S_PCIE
GPU_SKU:V100_SXM2
```

To list all the CPU generations available in the `normal` partition:

``` none
$ sh_node_feat -p normal | grep CPU_GEN
CPU_GEN:BDW
CPU_GEN:MLN
CPU_GEN:RME
CPU_GEN:SKX
```



## Requesting specific node features

Those node features can be used in job submission options, as additional
_constraints_ for the job, so that the scheduler will only select nodes that
match the requested features.

!!! important "Adding job constraints often increases job pending times"

    It's important to keep in mind that requesting specific node features
    usually increases job pending times in queue. The more constraints the
    scheduler has to satisfy, the smaller the pool of compute nodes jobs can
    run on. hence the longer it may take for the scheduler to find eligible
    resources to run those jobs.

To specify a node feature as a job constraint, the `-C`/`--constraint`
[option][url_constraints_doc] can be used.

For instance, to submit a job that should only run on an AMD Rome CPU, you can
add the following to your job submission options:

``` none
#SBATCH -C CPU_GEN:RME
```

Or to make sure that your training job will run on a GPU with 80GB of GPU
memory:

``` none
#SBATCH -G 1
#SBATCH -C GPU_MEM:80GB
```

### Multiple constraints

For more complex cases, multiple constraints could be composed in different
ways, using logical operators.

!!! danger "Many node feature combinations are impossible to satisfy"

    Many combinations will result in impossible conditions, and will make
    jobs impossible to run on any node. The scheduler is usualyl able to detect
    this and reject the job at submission time.

    For instance, submitting a job requesting an Intel CPU on the HDR IB
    fabric:

    ``` none
    #SBATCH -C 'CPU_MNF:INTEL&IB:HDR'
    ```

    will result in the following error:
    ``` none
    error: Job submit/allocate failed: Requested node configuration is not available
    ```

    as all the compute nodes on the IB fabric use AMD CPUs. Constraints must be
    used carefully and sparsingly to avoid unexpected suprises.



Some of the possible logical operations between constraints are listed below:

#### `AND`

Only nodes with all the requested features are eligible to run the job. The
ampersand sign (`&`) is used as the `AND` operator. For example:

``` none
#SBATCH -C 'GPU_MEM:32GB&IB:HDR'
```

will request a GPU with 32GB of memory on the HDR Infiniband fabric to run the
job.


#### `OR`

Only nodes with at least one of specified features will be eligible to run
the job. The pipe sign (`|`) is used as the `OR` operator.

In multi-node jobs, it means that nodes allocated to the job may end up having
different features.  For example, the following options:

``` none
#SBATCH -N 1
#SBATCH -C "CPU_GEN:RME|CPU_GEN:MLN"
```

may result in a two-node job where one node as an AMD Rome CPU, and the other
node has a AMD Milan CPU.


#### Matching `OR`:

When you need all nodes in a multi-node job to have the same set of features, a
matching `OR` condition can be defined by enclosing the options within square
brackets (`[`,`]`).

For instance, the following options may be used to request a job to run on
nodes with the same frequency, either 2.5 GHz or 2.75GHz:

``` none
#SBATCH -C "[CPU_FRQ:2.50GHz|CPU_FRQ:2.75GHz]"
```

!!! warning "Node features are text tags"

    Node features are text tags, they have no associated numerical value,
    meaning that they can't be compared.

    For instance, it's possible to add a constraint for GPU Compute
    Capabilities greater than 8.0. The workaround is to add a job constraint
    that satisfies all the possible values of that tag, like:

    ``` none
    #SBATCH -C "GPU_CC:8.0|GPU_CC:8.6"
    ```



For more information, complete details about the `--constraints`/`-C` job
submission option and its syntax can be found in the official [Slurm
documentation][url_constraints_doc].





--8<--- "includes/_acronyms.md"

[url_node-class]:       ../orders.md#configurations
[url_catalog]:          //www.sherlock.stanford.edu/catalog
[url_gpu_cc]:           //developer.nvidia.com/cuda-gpus
[url_constraints_doc]:  //slurm.schedmd.com/sbatch.html#OPT_constraint
