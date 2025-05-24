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
run additional processes[^ssh_job_limits], or observe how you application
behaves, debug issues, and so on.

The `salloc` command supports the same parameters as `sbatch`, and can override
any default configuration. Note that any `#SBATCH` directive in your job script
will not be interpreted by `salloc` when it is executed in this way. You must
specify all arguments directly on the command line for them to be taken into
account.



## Batch jobs
<!-- TODO needs review -->

It's easy to schedule batch jobs on Sherlock. A **job** is simply an instance
of your program (for example an R, Python or Matlab script) that is submitted
to the scheduler (Slurm) for asynchronous execution on a compute node.
Submitting a job using the `sbatch` command creates a batch job, which will
either start immediately or enter a pending state in the queue, depending on
current cluster load and resource availability.


### Job queuing

The time a job spends pending is primarily influenced by two factors:

* the number of jobs ahead of yours in the queue,
* the amount and type of resources your job requests.

To minimize queue time, request only the resources necessary for your workload.
Overestimating resource needs can result in longer wait times. Profiling your
code interactively (for example, in an [`sh_dev` session][anc_sh_dev] session
using tools like [`htop`][url_htop], [`nvtop`][anc_nvtop],
[`sacct`][url_sacct]) can help you determine appropriate resource requirements.


### Requesting resources

When submitting a job, you can request the following:

* **[CPUs][anc_cpus]:** How many CPU cores the program you are calling the in
  the `sbatch` script needs. Unless it can utilize multiple CPUs at once you
  should request a single CPU. Check your code's documentation or try running
  in an interactive session with [`sh_dev`][anc_sh_dev] and run `htop` if you
  are unsure.

* **[GPUs][anc_gpus]:** If your code is GPU-enabled, how many GPUs does your
  code need?

* **Memory (RAM):** Estimate how much memory your job will consume. Consider
  whether your program loads large datasets or uses significant memory on your
  local machine. For most jobs, the default memory allocation usually suffices.

* **Time:** Specify how long your job will take to run to completion.

* **[Partition][anc_partition]:** Choose the compute partition (e.g., `normal`,
  `gpu`, `owners`, `bigmem`).

You also need to indicate the scheduler what your job should should do: what
modules to load, and how to execute your application. Note that any logic you
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

Because it's a Python script that uses some NumPy code, we need to load the
`python/3.6.1` and the `py-numpy/1.19.2_py36` modules. The Python script is
then called just as you would on the command line, at the end of the `sbatch`
script.

``` shell
#!/usr/bin/bash
#SBATCH --job-name=test_job
#SBATCH --output=test_job.%j.out
#SBATCH --error=test_job.%j.err
#SBATCH --time=10:00
#SBATCH -p normal
#SBATCH -c 1
#SBATCH --mem=8GB

module load python/3.6.1
module load py-numpy/1.19.2_py36
python3 mycode.py
```

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

    This last output means that job 44915821 has been running (R) on compute
    node `sh02-01n49` for 10 seconds (0:10).

While your job is running you can connect to the node it's running on via SSH,
to monitor your job in real-time. For example, if your job is running on node
`sh02-01n49`, you can connect to it with:

``` none
$ ssh sh02-01n49
```
and then use tools like [`htop`][url_htop] to watch processes and resource
usage.

You can also manage this job based on the jobid assigned to it (44915854). For
example the job can be canceled with the [`scancel`][url_scancel] command
.
After your job completes you can asses and fine-tune your resource requests
(time, CPU/GPU, memory) with the [`sacct`][url_sacct] or `seff` commands.


### Estimating resources

To get a better idea of the amount of resources your job will need, you can use
the `ruse` command, available as a [module][anc_modules]:

```none
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
values over time. The purpose or Ruse is not to profile processes in detail,
but to follow jobs that run for many minutes, hours or days, with no
performance impact and without changing the measured application in any way.

You'll find complete documentation and details about `ruse`'s usage on the
[project webpage][url_ruse], but here are a few useful examples.

#### Sizing a job

In its simplest form, `ruse` can help discover how much resources a new script
or application will need. For instance, you can start a sizing session on a
compute node with an overestimated amount of resources, and start your
application like this:

```none
$ ruse ./myapp

```

This will generate a `<myapp>-<pid>/ruse` output file in the current directory,
looking like this:

```none
Time:           02:55:47
Memory:         7.4 GB
Cores:          4
Total_procs:    3
Active_procs:   2
Proc(%): 99.9  99.9
```

It shows that `myapp`:

* ran for almost 3 hours
* used a little less than 8B of memory
* had 4 cores available,
* spawned 3 processes, among which at most 2 were active at the same time,
* that both active processes each used 99.9% of a CPU core

This information could be useful in tailoring the job resource requirements to
its exact needs, making sure that the job won't be killed for exceeding one of
its resource limits, and that the job won't have to wait too long in queue for
resources that it won't use. The corresponding job request could look like
this:

```none
#SBATCH --time 3:00:00
#SBATCH --mem 8GB
#SBATCH --cpus-per-task 2
```


##### Verifying a job's usage

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

```none
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

```none
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
* the `queued` columns show the amount ot CPU cores or GPUs requested by
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

It's often useful to run lightweight, recurring administrative tasks on a
cluster, such as data transfer or monitoring jobs. On Sherlock, these tasks can
be run in the **service** partition, which is designed specifically for this
purpose.

The `service` partition is not intended for compute intensive workloads,
but rather for lightweight tasks that do not require significant computing
resources. This includes jobs such as data transfers, backups, archival
processes, CI/CD pipelines, lightweight database servers, job managers, and
other menial or cron-like operations.

* **Purpose:** Intended for non-computational, background, or administrative
  tasks that are important for cluster operations but do not need high
  performance.

* **Resource Allocation:** Resources in the service partition are heavily
  oversubscribed. This means that multiple jobs may share the same CPU and
  memory resources, leading to minimal compute performance. The focus is on
  maximizing throughput for many small, low-impact jobs, not on delivering fast
  or isolated execution.

* **Performance:** Not suitable for regular compute-intensive workloads. Jobs
  running here may experience significant slowdowns or contention if they
  attempt to use substantial CPU or memory.

* **Best Fit:**

    * Scheduled and recurring jobs (e.g., via [`scrontab`][anc_scrontab])
    * Data movement (`rsync`, `scp`, etc.)
    * Automated backups and data archival tasks
    * Monitoring agents, job managers, or lightweight daemons
    * CI/CD tasks that do not require high performance nor specialized hardware

* **Partition Usage:** The service partition is an ideal replacement for
  traditional cron jobs on login nodes, providing a dedicated and isolated
  environment for such workloads without impacting user-facing compute
  partitions.


### Recurring jobs

!!! Warning

    `Cron` tasks are not supported on Sherlock.

Users are not allowed to create `cron` jobs on Sherlock, for a variety of
reasons:

* resources limits cannot be easily enforced in `cron` jobs, meaning that a
  single user can end up monopolizing all the resources of a login node,
* no amount of resources can be guaranteed when executing a `cron` job, leading
  to unreliable runtime and performance,
* user `cron` jobs have the potential of bringing down whole
  nodes by creating fork bombs, if they're not carefully crafted and tested,
* compute and login nodes could be redeployed at any time, meaning that
  `cron` jobs scheduled there could go away without the user being notified,
  and cause all sorts of unexpected results,
* `cron` jobs could be mistakenly scheduled on several nodes and run multiple
  times, which could result in corrupted files.

As an alternative, if you need to run recurring tasks at regular intervals, we
recommend the following approach: by using the `--begin` job submission option,
and creating a job that resubmits itself once it's done, you can virtually
emulate the behavior and benefits of a `cron` job, without its disadvantages:
your task will be scheduled on a compute node, and use all of the resources it
requested, without being impacted by anything else.

Depending on your recurring job's specificities, where you submit it and the
state of the cluster at the time of execution, the starting time of that task
may not be guaranteed and result in a delay in execution, as it will be
scheduled by Slurm like any other jobs. Typical recurring jobs, such as file
synchronization, database updates or backup tasks don't require strict starting
times, though, so most users find this an acceptable trade-off.

The table below summarizes the advantages and drawbacks of each approach:

|     | Cron tasks | Recurring jobs |
| --- | :--------: | :------------: |
| Authorized on Sherlock              | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Dedicated resources for the task    | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Persistent across node redeployment | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Unique, controlled execution        | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Precise schedule                    | :fontawesome-solid-check:{: .chk_yes :}| :fontawesome-solid-xmark:{: .chk_no :}  |

#### Recurring job example

The script below presents an example of such a recurring job, that would
emulate a `cron` task. It will append a timestamped line to a `cron.log` file
in your `$HOME` directory and run every 7 days.


``` shell title="cron.sbatch"
#!/bin/bash
#SBATCH --job-name=cron
#SBATCH --begin=now+7days
#SBATCH --dependency=singleton
#SBATCH --time=00:02:00
#SBATCH --mail-type=FAIL


## Insert the command to run below. Here, we're just storing the date in a
## cron.log file
date -R >> $HOME/cron.log

## Resubmit the job for the next execution
sbatch $0
```

If the job payload (here the `date` command) fails for some reason and
generates and error, the job will not be resubmitted, and the user will be
notified by email.

We encourage users to get familiar with the submission options used in this
script by giving a look at the `sbatch` [man page][url_sbatch], but some
details are given below:


| Submission\ option\ or\ command | Explanation |
| ------- | ----------- |
| `--job-name=cron` |  makes it easy to identify the job, is used by the  `--dependency=singleton` option to identify identical jobs, and will allow canceling the job by name (because its jobid will change each time it's  submitted) |
| `--begin=now+7days`  |  will instruct the scheduler to not even consider the job   for scheduling before 7 days after it's been submitted |
| `--dependency=singleton` |  will make sure that only one `cron` job runs at any given time |
| `--time=00:02:00` |  runtime limit for the job (here 2 minutes). You'll need to adjust the value   depending on the task you need to run (shorter runtime requests usually   result in the job running closer to the clock mark) |
| `--mail-type=FAIL` |  will send an email notification to the user if the job ever fails |
| `sbatch $0` |  will resubmit the job script by calling its own name (`$0`)   after successful execution |

You can save the script as `cron.sbatch` or any other name, and submit it with:

``` none
$ sbatch cron.sbatch
```

It will start running for the first time 7 days after
you submit it, and it will continue to run until you cancel it with the
following command (using the job name, as defined by the `--job-name` option):

``` none
$ scancel -n cron
```



### Persistent jobs

[Recurring jobs](#recurring-jobs) described above are a good way to emulate
`cron` jobs on Sherlock, but don't fit all needs, especially when a persistent
service is required.

For instance, workflows that require a persistent database connection would
benefit from an ever-running database server instance. We don't provide
persistent database services on Sherlock, but instructions and examples on how
to submit database server jobs are provided for [MariaDB][anc_mariadb] or
[PostgreSQL][anc_pgsql].

In case those database instances need to run pretty much continuously (within
the limits of available resources and runtime maximums), the previous approach
described in the [recurring jobs](#recurring-jobs) section could fall a bit
short.  Recurring jobs are mainly designed for jobs that have a fixed execution
time and don't reach their time limit, but need to run at given intervals (like
synchronization or backup jobs, for instance).

Because a database server process will never end within the job, and will
continue until the job reaches its time limit, the last re-submission command
(`sbatch $0`) will actually never be executed, and the job won't be
resubmitted.

To work around this, a possible approach is to catch a specific
[signal][url_signals] sent by the scheduler at a predefined time, before the
time limit is reached, and then re-queue the job. This is easily done with the
Bash [`trap`][url_trap] command, which can be instructed to re-submit a job
when it receives the [`SIGUSR1`][url_signals] signal.

!!! important "Job re-submission and execution delay"

    Jobs that are automatically re-submitted using this technique won't restart
    right away: the will get back in queue and stay pending until their
    execution conditions (priority, resources, usage limits...) are satisfied.



#### Persistent job example

Here's the recurring job example from above, modified to:

1. instruct the scheduler to send a `SIGUSR1` signal to the job 90
   seconds[^signal_delay] before reaching its time limit (with the `#SBATCH
   --signal` option),
2. re-submit itself upon receiving that `SIGUSR1` signal (with the `trap`
   command)


``` shell title="persistent.sbatch"
#!/bin/bash
#
#SBATCH --job-name=persistent
#SBATCH --dependency=singleton
#SBATCH --time=00:05:00
#SBATCH --signal=B:SIGUSR1@90

# catch the SIGUSR1 signal
_resubmit() {
    ## Resubmit the job for the next execution
    echo "$(date): job $SLURM_JOBID received SIGUSR1 at $(date), re-submitting"
    sbatch $0
}
trap _resubmit SIGUSR1

## Insert the command to run below. Here, we're just outputting the date every
## 10 seconds, forever

echo "$(date): job $SLURM_JOBID starting on $SLURM_NODELIST"
while true; do
    echo "$(date): normal execution"
    sleep 60
done
```

!!! danger "Long running processes need to run in the background"

    If your job's actual payload (the application or command you want to run) is
    running continuously for the whole duration of the job, it needs to be
    executed in the background, so the trap can be processed.

    To run your application in the background, just add a `&` at the end of the
    command and then add a `wait` statement at the end of the script, to make
    the shell wait until the end of the job.

    For instance, if you were to run a [PostgreSQL database server][anc_pgsql],
    the `while true ... done` loop in the previous example could be replaced by
    something like this:

    ``` none
    postgres -i -D $DB_DIR &
    wait
    ```


#### Persistent `$JOBID`

One potential issue with having a persistent job re-submit itself when it
reaches its runtime limit is that it will get a different `$JOBID` each time
it's (re-)submitted.

This could be particularly challenging when other jobs depend on it, like in
the database server scenario, where client jobs would need to start only if the
database server is running. This can be achieved with [job
dependencies][url_job_deps], but those dependencies have to be expressed using
jobid numbers, so having the server job's id changing at each re-submission
will be difficult to handle.

To avoid this, the re-submission command (`sbatch $0`) can be replaced by
a re-queuing command:

    scontrol requeue $SLURM_JOBID

The benefit of that change is that the job will keep the same `$JOBID` across
all re-submissions. And now, dependencies can be added to other jobs using that
specific `$JOBID`, without having to worry about it changing. And there will be
only one `$JOBID` to track for that database server job.


The previous [example](#persistent-job-example) can then be modified as
follows:

``` shell title="persistent.sbatch" hl_lines="10"
#!/bin/bash
#SBATCH --job-name=persistent
#SBATCH --dependency=singleton
#SBATCH --time=00:05:00
#SBATCH --signal=B:SIGUSR1@90

# catch the SIGUSR1 signal
_requeue() {
    echo "$(date): job $SLURM_JOBID received SIGUSR1, re-queueing"
    scontrol requeue $SLURM_JOBID
}
trap '_requeue' SIGUSR1

## Insert the command to run below. Here, we're just outputting the date every
## 60 seconds, forever

echo "$(date): job $SLURM_JOBID starting on $SLURM_NODELIST"
while true; do
    echo "$(date): normal execution"
    sleep 60
done
```

Submitting that job will produce an output similar to this:

``` none
Mon Nov  5 10:30:59 PST 2018: Job 31182239 starting on sh-06-34
Mon Nov  5 10:30:59 PST 2018: normal execution
Mon Nov  5 10:31:59 PST 2018: normal execution
Mon Nov  5 10:32:59 PST 2018: normal execution
Mon Nov  5 10:33:59 PST 2018: normal execution
Mon Nov  5 10:34:59 PST 2018: Job 31182239 received SIGUSR1, re-queueing
slurmstepd: error: *** JOB 31182239 ON sh-06-34 CANCELLED AT 2018-11-05T10:35:06 DUE TO JOB REQUEUE ***
Mon Nov  5 10:38:11 PST 2018: Job 31182239 starting on sh-06-34
Mon Nov  5 10:38:11 PST 2018: normal execution
Mon Nov  5 10:39:11 PST 2018: normal execution
```

The job runs for 5 minutes, then received the `SIGUSR1` signal, is re-queued,
restarts for 5 minutes, and so on, until it's properly `scancel`led.



### Slurm crontab

As an alternative, Slurm also offers the possibility to emulate regular
traditional `cron` jobs using the [`scrontab`][url_scrontab] command. This is a
Slurm-specific command that allows users to schedule jobs to run at specific
times or intervals, similar to the traditional `cron` system. The main
difference is that `scrontab` jobs are managed by Slurm, and can take advantage
of the scheduler resource management capabilities.

The full documentation about `scrontab` is available in the [Slurm
documentation][url_scrontab], but you'll find some more Sherlock-specific
information below.

To edit your `scrontab` script, you can use the following command:

``` none
$ scrontab -e
```

This will open your default editor on Sherlock (`vim` is the default), where
you can edit your script, and once you save it, it will automatically be
scheduled for execution.

You can view your existing `scron` scripts with:

``` none
$ scrontab -l
```


#### Example `scrontab` script

Each `scrontab` script can include regular Slurm submissions, (like
`-t-`/`--time`, `-c`/`--cpus-per-task`, etc).  Here's an example `scrontab` job
script that will run every three hours in the `service` partition, and run a
script that won't need more than 10 minutes to complete.

!!! note "Log file output"

    By default, Slurm will **overwrite** output files at each execution. If you
    want to keep a runnin glog of each execution, you can add a `#SCRON
    --open-mode=append` line to your `scrontab` script, which will tell Slurm
    to append any new output to the exisitng output file.

``` crontab
#SCRON -p service
#SCRON -t 00:10:00
#SCRON -o mycron_output-%j.out
#SCRON --open-mode=append

0 */3 * * * /path/to/your/script.sh
```

!!! info "Exceeding resource limits"

    If your job requirement specifications exceed the defined limits in the
    requested partition, the job will be rejected and an error message will be
    displayed when saving the `scrontab` script. For instance, requesting `-c
    32` in the `service` partition will result in the following massage:

    ``` none
    There was an issue with the job submission on lines 26-29
    The error code return was: Job violates accounting/QOS policy (job submit limit, user's size and/or time limits)
    The error message was: QOSMaxCpuPerUserLimit
    The failed lines are commented out with #BAD:
    Do you want to retry the edit? (y/n)
    ```

#### Long-running `scrontab` jobs

In most cases, `scron` jobs will be short-lived, and their execution duration
will be smaller than the interval between executions. But sometimes, it may be
useful to maintain a long-running process, to manage jobs or keep a database
instance running for longer than the maximum runtime.

For those long-running jobs, you can set the execution interval to be fairly
short (so the job is restarted early when it's interrupted), and add the
`--dependency=singleton` submission option, to make sure that only one instance
of the job is running at any given time:

``` crontab
#SCRON -p service
#SCRON -t 1-00:00:00
#SCRON --dependency=singleton
#SCRON --name=my_process

0 * * * * /path/to/your/script.sh
```

This will instruct The scheduler to check every hour whether an instance of the
job is running, and start it if it's not.

!!! warning "Avoiding duplicate job instances"

    To avoid having multiple instances of the same job running at the same
    time, and starting multiple instances each time the `scrontab` file is
    edited, make sure to the `--dependency=singleton` option.


#### Monitoring `scrontab` jobs

You can monitor your `scrontab` jobs with `squeue`, like every other Slurm job.
For instance, to only list your `scrontab` jobs, you can use the following
command:

``` none
$ squeue --me -O JobID,EligibleTime,CronJob | awk 'NR==1 || $NF=="Yes"'
JOBID               ELIGIBLE_TIME       CRON_JOB
105650              2025-05-23T13:20:00 Yes
```

The `ELIGIBLE_TIME` column indicates the next time the batch system will run
your job.


#### Canceling a `scrontab` job

To cancel a `scrontab` job, you can edit the `scrontab` file with `scrontab -e`
and comment out all the lines associated with the job you want to cancel. This
will immediately remove the `scrontab` job from the queue when the script is
saved, and prevent the job from being executed in the future.

!!! info "Using `scancel` on a `scrontab` job"

    The `scancel` command will give a warning when attempting
    to remove a job started with `scrontab`.

    ```bash
    $ scancel 105650
    scancel: error: Kill job error on job id 105650: Cannot cancel scrontab jobs without --cron flag.
    ```

    When canceling a `scrontab` job with the `--cron` flag, the corresponding
    entries in the `scrontab` file are prepended with `#DISABLED`. These
    comments will need to be removed before the job will be able to start
    again.




[comment]: #  (TODO: batch jobs, resource requirements, partitions, qos, limits, mail...)


[comment]: #  (link URLs -----------------------------------------------------)

[url_sbatch]:       //slurm.schedmd.com/sbatch.html
[url_trap]:         //tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html
[url_signals]:      //en.wikipedia.org/wiki/Signal_(IPC)
[url_job_deps]:     //slurm.schedmd.com/sbatch.html#OPT_dependency
[url_sh_part]:      //news.sherlock.stanford.edu/posts/a-better-view-at-sherlock-s-resources
[url_htop]:         //htop.dev/
[url_sacct]:        //slurm.schedmd.com/sacct.html
[url_squeue]:       //slurm.schedmd.com/squeue.html
[url_scrontab]:     //slurm.schedmd.com/scrontab.html
[url_bash]:         //www.gnu.org/software/bash/manual/bash.html
[url_scancel]:      //slurm.schedmd.com/scancel.html
[url_ruse]:         //github.com/JanneM/Ruse

[anc_modules]:      /docs/software/modules.md
[anc_mariadb]:      /docs/software/using/mariadb.md
[anc_pgsql]:        /docs/software/using/postgresql.md
[anc_partition]:    /docs/glossary.md#partition
[anc_cpus]:         /docs/glossary.md#cpu
[anc_gpus]:         /docs/glossary.md#gpu
[anc_nvtop]:        /docs/user-guide/gpu.md#advanced-options
[anc_sh_dev]:       /docs/user-guide/running-jobs.md#interactive-jobs
[anc_public_parts]: /docs/user-guide/running-jobs.md#public-partitions
[anc_filemanager]:  /docs/user-guide/ondemand.md#managing-files
[anc_texteditors]:  /docs/getting-started/index.md#text-editors
[anc_scrontab]:     /docs/user-guide/running-jobs.md#slurm-crontab

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

[^signal_delay]: Due to the resolution of event handling by the scheduler, the
  signal may be sent up to 60 seconds earlier than specified.

[^long_qos]: the `long` QOS can only be used in the `normal` partition, and is
  only accessible to users who are *not* part of an owners group (since owner
  groups can already run for up to 7 days in their respective partition).


--8<--- "includes/_acronyms.md"
