---
tags:
    - slurm
---

## Login nodes

!!! danger "Login nodes are not for computing"

    Login nodes are shared among many users and therefore must not be
    used to run computationally intensive tasks. Those should be submitted to
    the scheduler which will dispatch them on compute nodes.

The key principle of a shared computing environment is that resources are
shared among users and access to them must be scheduled. On Sherlock, it is
**mandatory** to schedule work by requesting resources and submitting jobs to
the scheduler. Because login nodes are shared by all users, they must not be
used to execute computational tasks.

Acceptable use of login nodes include:

* lightweight file transfers,
* script and configuration file editing,
* job submission and monitoring.

!!! warning "Resource limits are enforced"

    To minimize disruption and ensure a comfortable working environment for
    users, resource limits are enforced on login nodes. Processes started
    there will automatically be terminated if their resource usage (including
    CPU time, memory and run time) exceed those limits.


## Slurm commands

Slurm is the job scheduler used on Sherlock. It is responsible for managing the
resources of the cluster and scheduling jobs on compute nodes.

There are several ways to request resources and submit jobs. The main Slurm
commands to submit jobs are listed in the table below:

| Command  | Description | Behavior |
| -------- | ----------- | -------- |
| `salloc` | Request resources and allocates them to a job | Starts a new interactive shell on a compute node |
| `srun`   | Request resources and runs a command on the allocated compute node(s) | Blocking command: will not return until the executed command ends |
| `sbatch` | Request resources and runs a script on the allocated compute node(s) | Asynchronous command: will return as soon as the job is submitted |

## Interactive jobs

### Dedicated nodes

Interactive jobs allow users to log in to a compute node to run commands
interactively on the command line. They could be an integral part of an
interactive programming and debugging workflow. The simplest way to establish
an interactive session on Sherlock is to use the `sh_dev` command:

``` none
$ sh_dev
```

!!! tip

    `sh_dev` is the recommended starting point for interactive work. It uses
    sensible defaults, runs on dedicated nodes, and typically gives you
    immediate access without any wait time.

This will open a login shell using one core and 4 GB of memory on one node for
one hour. The `sh_dev` sessions run on dedicated compute nodes. This ensures
minimal wait times when you need to access a node for testing script, debug
code or any kind of interactive work.

`sh_dev` also provides X11 forwarding via the submission host (typically the
login node you're connected to) and can thus be used to run GUI applications.


### Compute nodes

If you need more resources[^dev_limits], you can pass options to `sh_dev`, to
request more CPU cores, more nodes, or even run in a different
[partition][anc_public_parts]. `sh_dev -h` will provide more information:

``` none
$ sh_dev -h
sh_dev: start an interactive shell on a compute node.

Usage: sh_dev [OPTIONS]
    Optional arguments:
        -c      number of CPU cores to request (OpenMP/pthreads, default: 1)
        -g      number of GPUs to request (default: none)
        -n      number of tasks to request (MPI ranks, default: 1)
        -N      number of nodes to request (default: 1)
        -m      memory amount to request (default: 4GB)
        -p      partition to run the job in (default: dev)
        -t      time limit (default: 01:00:00)
        -r      allocate resources from the named reservation (default: none)
        -J      job name (default: sh_dev)
        -q      quality of service to request for the job (default: normal)

    Note: the default partition only allows for limited amount of resources.
    If you need more, your job will be rejected unless you specify an
    alternative partition with -p.
```

For instance, you can request 4 CPU cores, 8 GB of memory and 1 GPU in the `gpu`
partition with:

``` none
$ sh_dev -c 4 -m 8GB -g 1 -p gpu
```


Another way to get an interactive session on a compute node is to use `salloc`
to execute a shell through the scheduler. For instance, to start a shell on a
compute node in the `normal` partition, with the default resource requirements
(one core for 2 hours), you can run:

``` none
$ salloc
```

The main advantage of this approach is that it will allow you to specify the
whole range of submission options that `sh_dev` may not support.

You can also submit an existing job script or other executable as
an interactive job:

``` none
$ salloc ./script.sh
```


#### Connecting to nodes

!!! warning "Connecting to compute nodes"

    Users are not allowed to connect to compute nodes unless they have a job
    running there.

If you SSH to a compute node without any active job allocation, you'll be
greeted by the following message:

``` none
$ ssh sh02-01n01
Access denied by pam_slurm_adopt: you have no active jobs on this node
Connection closed
$
```

Once you have a job running on a node, you can SSH directly to it and
run additional processes[^ssh_job_limits], or observe how your application
behaves, debug issues, and so on.

The `salloc` command supports the same parameters as `sbatch`, and can override
any default configuration. Note that any `#SBATCH` directive in your job script
will not be interpreted by `salloc` when it is executed in this way. You must
specify all arguments directly on the command line for them to be taken into
account.



## Batch jobs

A **batch job** is a script submitted to the scheduler (Slurm) for
asynchronous execution on a compute node. It can run any program (an R,
Python, or Matlab script, a compiled binary, or any sequence of shell
commands). Submitting a job with `sbatch` will either start it immediately or
place it in a pending state in the queue, depending on resource availability.


### Job queuing

The time a job spends pending is primarily influenced by two factors:

* the number of jobs ahead of yours in the queue,
* the amount and type of resources your job requests.

To minimize queue time, request only the resources necessary for your workload.
Overestimating resource needs can result in longer wait times. Profiling your
code interactively (for example, in an [`sh_dev` session][anc_sh_dev]
using tools like [`htop`][url_htop], [`nvtop`][anc_nvtop],
[`sacct`][url_sacct]) can help you determine appropriate resource requirements.


### Requesting resources

When submitting a job, you can request the following:

* **[CPUs][anc_cpus]:** How many CPU cores the program called in the `sbatch`
  script needs. Unless it can utilize multiple CPUs at once, request a single
  CPU. Check your code's documentation or profile it interactively with
  [`sh_dev`][anc_sh_dev] and `htop` if unsure.

* **[GPUs][anc_gpus]:** If your code is GPU-enabled, how many GPUs does your
  code need?

* **Memory (RAM):** Estimate how much memory your job will consume. Consider
  whether your program loads large datasets or uses significant memory on your
  local machine. For most jobs, the default memory allocation usually suffices.

* **Time:** Specify how long your job will take to run to completion.

* **[Partition][anc_partition]:** Choose the compute partition (e.g., `normal`,
  `gpu`, `owners`, `bigmem`).

You also need to tell the scheduler what your job should do: what modules to
load, and how to execute your application. Note that any logic you
can code into a bash script with the [bash scripting language][url_bash] can
also be coded into an `sbatch` script.

#### Example `sbatch` script

The example job below will run the Python script `mycode.py` for 10 minutes on
the `normal` partition using 1 CPU and 8 GB of memory. To aid in debugging, we
are naming this job "test_job" and appending the Job ID (`%j`) to the two
output files that Slurm creates when a job is executed. The output files are
written to the directory in which you launched your job (you can also specify a
different path). One file will contain any errors and the other will contain
non-error output. Look in these 2 files ending in `.err` and `.out` for useful
debugging information and error output.

``` shell { title="test.sbatch" .copy .select }
#!/bin/bash
#SBATCH --job-name=test_job       (1)
#SBATCH --output=test_job.%j.out  (2)
#SBATCH --error=test_job.%j.err   (3)
#SBATCH --time=10:00              (4)
#SBATCH --partition=normal        (5)
#SBATCH --cpus-per-task=1         (6)
#SBATCH --mem=8GB                 (7)

module load python/3.6.1 # (8)!
module load py-numpy/1.19.2_py36
python3 mycode.py
```

1. Job name shown in `squeue` output and email notifications.
2. Standard output file; `%j` is replaced by the job ID at runtime.
3. Standard error file; keeping it separate from `stdout` makes debugging easier.
4. Wall-clock time limit (10 minutes here); the job is killed if it exceeds this.
5. Partition to submit to; `normal` is the default general-purpose partition.
6. Number of CPU cores; set to `1` unless your code is explicitly multi-threaded.
7. Memory (RAM) to allocate; adjust based on your application's needs.
8. Always load software modules explicitly, with the version, for reproducibility.

!!! info "More `#SBATCH` options"

    The example above covers the basics. For a curated list of commonly used
    directives with examples, see the [SBATCH options][url_sbatch_opts] page.

Here are the steps to create and submit this batch script:

1. Create and edit the `sbatch` script with a [text editor][anc_texteditors]
   like `vim`/`nano` or the [OnDemand file manager][anc_filemanager]. Then save
   the file, in this example we call it `test.sbatch`.

2. Submit to the scheduler with the [`sbatch`][url_sbatch] command:

    ``` none
    $ sbatch test.sbatch
    ```

3. Monitor your job and job ID in the queue with the [`squeue`][url_squeue]
   command:

    ``` none
    $ squeue --me
       JOBID    PARTITION   NAME      USER      ST  TIME  NODES  NODELIST(REASON)
       4915821     normal   test_job  <userID>  PD  0:00      1  (Resources)
    ```

    Notice that the jobs state is "Pending" (`PD`). Once the job starts to run,
    its state will change to "Running" (`R`), and the `NODES` column will
    indicate how many nodes are being used. The `NODELIST(REASON)` column will
    show the reason why the job is pending. In this case, it is waiting for
    resources to become available.

    ``` none
    $ squeue --me
       JOBID    PARTITION   NAME      USER      ST  TIME  NODES  NODELIST(REASON)
       4915821     normal   test_job  <userID>   R  0:10      1  sh02-01n49
    ```

    This last output means that job 4915821 has been running (R) on compute
    node `sh02-01n49` for 10 seconds (0:10).

While your job is running you can connect to the node it's running on via SSH,
to monitor your job in real-time. For example, if your job is running on node
`sh02-01n49`, you can connect to it with:

``` none
$ ssh sh02-01n49
```

and then use tools like [`htop`][url_htop] to watch processes and resource
usage.

You can also manage this job based on the jobid assigned to it (4915821). For
example, the job can be canceled with the [`scancel`][url_scancel] command.

After your job completes you can assess and fine-tune your resource requests
(time, CPU/GPU, memory) with the [`sacct`][url_sacct] or `seff` commands.


### Estimating resources

To get a better idea of the amount of resources your job will need, you can use
the `ruse` command, available as a [module][anc_modules]:

``` none
$ module load system ruse
```

[`ruse`][url_ruse] is a command line tool developed by Jan Moren to measure a
process' resource usage. It periodically measures the resource use of a process
and its sub-processes, and can help you find out how much resource to allocate
to your job. It will determine the actual memory, execution time and cores that
individual programs or MPI applications need to request in their job submission
options.

`ruse` periodically samples the process and its sub-processes and keeps track of
the CPU, time and maximum memory use. It also optionally records the sampled
values over time. The purpose of `ruse` is not to profile processes in detail,
but to follow jobs that run for many minutes, hours or days, with no
performance impact and without changing the measured application in any way.

You'll find complete documentation and details about `ruse`'s usage on the
[project webpage][url_ruse], but here are a few useful examples.

#### Sizing a job

In its simplest form, `ruse` can help discover how much resources a new script
or application will need. For instance, you can start a sizing session on a
compute node with an overestimated amount of resources, and start your
application like this:

``` none
$ ruse ./myapp

```

This will generate a `<myapp>-<pid>/ruse` output file in the current directory,
looking like this:

``` none
Time:           02:55:47
Memory:         7.4 GB
Cores:          4
Total_procs:    3
Active_procs:   2
Proc(%): 99.9  99.9
```

It shows that `myapp`:

* ran for almost 3 hours
* used a little less than 8 GB of memory
* had 4 cores available,
* spawned 3 processes, among which at most 2 were active at the same time,
* that both active processes each used 99.9% of a CPU core

This information could be useful in tailoring the job resource requirements to
its exact needs, making sure that the job won't be killed for exceeding one of
its resource limits, and that the job won't have to wait too long in queue for
resources that it won't use. The corresponding job request could look like
this:

``` shell { .copy .select }
#SBATCH --time 3:00:00
#SBATCH --mem 8GB
#SBATCH --cpus-per-task 2
```


#### Verifying a job's usage

It's also important to verify that applications, especially parallel ones, stay
in the confines of the resources they've requested. For instance, a number of
parallel computing libraries will make the assumption that they can use all the
resources on the host, will automatically determine the number of physical CPU
cores present on the compute node, and start as many processes. This could be a
significant issue if the job requested less CPUs, as more processes will be
constrained on less CPU cores, which will result in node overload and degraded
performance for the application.

To avoid this, you can start your application with `ruse` and report usage for
each time step specified with `-t`. You can also request the reports to be
displayed directly on `stdout` rather than stored in a file.

For instance, this will report usage every 10 seconds:

``` none
$ ruse -s -t10 --stdout ./myapp
   time         mem   processes  process usage
  (secs)        (MB)  tot  actv  (sorted, %CPU)
     10        57.5    17    16   33  33  33  25  25  25  25  25  25  25  25  20  20  20  20  20
     20        57.5    17    16   33  33  33  25  25  25  25  25  25  25  25  20  20  20  20  20
     30        57.5    17    16   33  33  33  25  25  25  25  25  25  25  25  20  20  20  20  20

Time:           00:00:30
Memory:         57.5 MB
Cores:          4
Total_procs:   17
Active_procs:  16
Proc(%): 33.3  33.3  33.2  25.0  25.0  25.0  25.0  25.0  25.0  24.9  24.9  20.0  20.0  20.0  20.0  19.9
```

Here, we can see that despite having being allocated 4 CPUs, the application
started 17 threads, 16 of which were active running intensive computations,
with the unfortunate consequence that each process could only use a fraction of
a CPU.

In that case, to ensure optimal performance and system operation, it's
important to modify the application parameters to make sure that it doesn't
start more computing processes than the number of requested CPU cores.



## Available resources

Whether you are submitting a [batch job](#batch-jobs), or an or [interactive
job](#interactive-jobs), it's important to know the resources that are
available to you. For this reason, we provide [`sh_part`][url_sh_part], a
command-line tool to help answer questions such as:

* which [partitions][anc_partition] do I have access to?
* how many jobs are running on them?
* how many CPUs can I use?
* where should I submit my jobs?

`sh_part` can be executed on any login or compute node to see what partitions
are available to you, and its output looks like this:

``` none
$ sh_part
 partition           || nodes         | CPU cores             | GPUs                 || job runtime     | mem/core        | per-node
 name         public ||   idle  total |   idle  total  queued |   idle  total queued || default maximum | default maximum |    cores   mem(GB)  gpus
-----------------------------------------------------------------------------------------------------------------------------------------------------
 normal*      yes    ||      0    218 |    438   5844    6949 |      0      0      0 ||      2h      7d |     6GB     8GB |    20-64   128-384     0
 bigmem       yes    ||      0     11 |    537    824     255 |      0      0      0 ||      2h      1d |     6GB    64GB |   24-256  384-4096     0
 gpu          yes    ||      0     33 |    354   1068     905 |     25    136    196 ||      1h      2d |     8GB    32GB |    20-64  191-2048   4-8
 dev          yes    ||      1      4 |     64    104       0 |     62     64      0 ||      1h      2h |     6GB     8GB |    20-32   128-256  0-32
 service      yes    ||      5      6 |    129    132       0 |      0      0      0 ||      1h      2h |     1GB     8GB |    20-32   128-256     0
-----------------------------------------------------------------------------------------------------------------------------------------------------
```

The above example shows four possible partitions where jobs can be submitted:
`normal,` `bigmem,` `gpu,`, `dev`, and `service`. It also provides additional
information such as the maximum amount of time allowed in each partition, the
number of other jobs already in queue, along with the ranges of resources
available on nodes in each partition. In particular:

* in the `partition name` column, the `*` character indicates the default
  partition.
* the `queued` columns show the amount of CPU cores or GPUs requested by
  pending jobs,
* the `per-node` columns show the range of resources available on each node in
  the partition. For instance, the `gpu` partition has nodes with 20 to 64 CPU
  cores and 191 to 2048 GB of memory, and up to 8 GPUs per node.


### Public partitions

Here are the main public partitions available to everyone on Sherlock:


| Partition | Purpose | Resources | Limits |
| --------- | ------- | --------- | ------ |
| `normal`  | General purpose compute jobs | 20-64 cores/node, 6-8 GB RAM/core | default runtime of 2 hours, max. 2 days (up to 7 days with the `long` QOS[^long_qos]) |
| `bigmem`  | High memory compute jobs | for jobs requiring > 256GB, up to 4 TB RAM/node | Maximum runtime of 1 day |
| `gpu`     | GPU compute jobs | 20-64 cores/node, up to 2TB RAM/node, 4 or 8 GPUs/node | 16 GPUs/user |
| `dev`     | Development and testing jobs | dedicated nodes and lightweight GPU instances (MIG) | 2h max, 4 cores + 2 GPUs/user |
| `service` | Lightweight, recurring administrative tasks | massively over-subscribed resources | 2 jobs, 16 cores/user, 2 days runtime |





## Service jobs

For lightweight, recurring, or persistent tasks (data transfers, backups,
database servers, cron-like jobs), Sherlock provides a dedicated `service`
partition. See the [Service jobs][url_service_jobs] page for full details,
including examples of recurring and persistent job scripts.


[comment]: #  (link URLs -----------------------------------------------------)

[url_sbatch]:       //slurm.schedmd.com/sbatch.html
[url_sh_part]:      //news.sherlock.stanford.edu/posts/a-better-view-at-sherlock-s-resources
[url_htop]:         //htop.dev/
[url_sacct]:        //slurm.schedmd.com/sacct.html
[url_squeue]:       //slurm.schedmd.com/squeue.html
[url_bash]:         //www.gnu.org/software/bash/manual/bash.html
[url_scancel]:      //slurm.schedmd.com/scancel.html
[url_ruse]:         //github.com/JanneM/Ruse

[url_sbatch_opts]:  ../advanced-topics/sbatch-options.md
[url_service_jobs]: ../advanced-topics/service-jobs.md

[anc_modules]:      ../software/modules.md
[anc_partition]:    ../glossary.md#partition
[anc_cpus]:         ../glossary.md#cpu
[anc_gpus]:         ../glossary.md#gpu
[anc_nvtop]:        gpu.md#advanced-options
[anc_sh_dev]:       #interactive-jobs
[anc_public_parts]: #public-partitions
[anc_filemanager]:  ondemand.md#managing-files
[anc_texteditors]:  ../getting-started/index.md#text-editors

[comment]: #  (footnotes -----------------------------------------------------)

[^dev_limits]: The dedicated partition that `sh_dev` uses by default only allows
  up to 2 cores and 8 GB or memory per user at any given time. So if you need
  more resources for your interactive session, you may have to specify a
  different partition.

[^ssh_job_limits]: Please note that your SSH session will be attached to your
  running job, and that resources used by that interactive shell will count
  towards your job's resource limits. So if you start a process using large
  amounts of memory via SSH while your job is running, you may hit the job's
  memory limits, which will trigger its termination.

[^long_qos]: the `long` QOS can only be used in the `normal` partition, and is
  only accessible to users who are *not* part of an owners group (since owner
  groups can already run for up to 7 days in their respective partition).


--8<--- "includes/_acronyms.md"
