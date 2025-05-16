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
shared among users and must be scheduled. It is **mandatory** to schedule work
by submitting jobs to the scheduler on Sherlock. And since login nodes are a
shared resource, they must not be used to execute computing tasks.

Acceptable use of login nodes include:

* lightweight file transfers,
* script and configuration file editing,
* job submission and monitoring.

!!! warning "Resource limits are enforced"

    To minimize disruption and ensure a comfortable working environment for
    users, resource limits are enforced on login nodes, and processes started
    there will automatically be terminated if their resource usage (including
    CPU time, memory and run time) exceed those limits.


## Slurm commands

Slurm allows requesting resources and submitting jobs in a variety of ways. The
main Slurm commands to submit jobs are listed in the table below:

| Command  | Description | Behavior |
| -------- | ----------- | -------- |
| `salloc` | Request resources and allocates them to a job | Starts a new interactive shell on a compute node |
| `srun`   | Request resources and runs a command on the allocated compute node(s) | Blocking command: will not return until the executed command ends |
| `sbatch` | Request resources and runs a script on the allocated compute node(s) | Asynchronous command: will return as soon as the job is submitted |

## Interactive jobs

### Dedicated partition

Interactive jobs allow users to log in to a compute node to run commands
interactively on the command line. They could be an integral
part of an interactive programming and debugging workflow. The simplest way to
establish an interactive session on Sherlock is to use the `sh_dev` command:

``` none
$ sh_dev
```

This will open a login shell using one core and 4 GB of memory on one node for
one hour. The `sh_dev` sessions run on dedicated compute nodes. This ensures
minimal wait times when you need to access a node for testing script, debug
code or any kind of interactive work.

`sh_dev` also provides X11 forwarding via the submission host (typically the
login node you're connected to) and can thus be used to run GUI applications.


### Generic compute nodes

If you need more resources[^dev_limits], you can pass options to `sh_dev`, to
request more CPU cores, more nodes, or even run in a different partition.
`sh_dev -h` will provide more information:

``` none
$ sh_dev -h
sh_dev: start an interactive shell on a compute node.

Usage: sh_dev [OPTIONS]
    Optional arguments:
        -c      number of CPU cores to request (OpenMP/pthreads, default: 1)
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

Another way to get an interactive session on a compute node is to use `srun` to
execute a shell through the scheduler. For instance, to start a `bash` session
on a compute node, with the default resource requirements (one core for 2
hours), you can run:

``` none
$ srun --pty bash
```

The main advantage of this approach is that it will allow you to specify the
whole range of submission options that `sh_dev` may not support.

Finally, if you prefer to submit an existing job script or other executable as
an interactive job, you can use the `salloc` command:

``` none
$ salloc script.sh
```

If you don't provide a command to execute, `salloc` will start a Slurm job and
allocate resources for it, but it will not automatically connect you to the
allocated node(s). It will only start a new shell on the same node you launched
`salloc` from, and set up the appropriate `$SLURM_*` environment
variables. So you will typically need to look at them to see
what nodes have been assigned to your job. For instance:

``` none
$ salloc
salloc: Granted job allocation 655914
$ echo $SLURM_NODELIST
sh02-01n55
$ ssh sh02-01n55
[...]
sh02-01n55 ~ $
```

#### Connecting to nodes

!!! warning "Login to compute nodes"

    Users are not allowed to login to compute nodes unless they have a job
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

Batch jobs form the core of Sherlock's workload management system. These jobs, submitted via the `sbatch` command, execute on compute nodes rather than login nodes, ensuring optimal resource utilization across the cluster. When you submit a script using `sbatch`, Slurm schedules its execution based on available resources and priority.

The time-to-start for a batch job depends on two primary factors:
1. Current queue length (number of pending jobs ahead of yours)
2. Resource requirements specified in your job script

Key resource parameters include:
- **CPUs**: Number of CPU cores required
- **GPUs**: GPU resources needed
- **Memory**: RAM allocation
- **Time**: Maximum runtime duration
- **Partition**: Target compute node group

Proper resource specification is crucial - requesting only necessary resources helps minimize queue wait times while ensuring job completion within allocated limits.

The length of time a job will pend is determined by several factors; how many other jobs are in the queue ahead or your job and how many resources your job is requesting are the most important factors. One key principle when requesting resources is to always try to request as few resources as you need to get your job done. This will ensure your job pends in the queue for as little time as necessary. To get a rough idea of what resources are needed, you can profile your code/jobs in an [sh_dev session][url_sh_dev] in real-time with [`htop`][url_htop], [`nvtop`][url_nvtop], [`sacct`][url_sacct] etc. The basic concept is to tell the scheduler what resources your job needs and how long is should run. These resources are:

**CPUs:** How many CPUs the program you are calling the in the sbatch script needs, unless it can utilize multiple CPUs at once you should request a single CPU. Check your code's documentation or try running in an interactive session with [`sh_dev`][url_sh_dev] and run htop if you are unsure.

**GPUs:** If your code is GPU enabled, how many GPUs does your code need? Use the diagnostic tool [`nvtop`][url_nvtop] to see if your code is capable of running on multiple GPUs and how much GPU memory it's using in real-time.

**memory (RAM):** How much memory your job will consume. Some things to consider, will it load a large file or matrix into memory? Does it consume a lot of memory on your laptop? Often the default memory is sufficient for many jobs.

**time:** How long will it take for your code to run to completion?

**partition:** What set of compute nodes on Sherlock will you run on, normal, gpu, owners, bigmem? Use the [`sh_part`][url_sh_part] command to see what partitions you are allowed to run on. The default partition on Sherlock is the normal partition.

Next, you tell the scheduler what your job should should do: load modules and run your code. Note that any logic you can code into a bash script with the [bash scripting language][url_bash] can also be coded into an sbatch script.

This example job, will run the Python script mycode.py for 10 minutes on the normal partition using 1 CPU and 8 GB of memory. To aid in debugging we are naming this job "test_job" and appending the Job ID (%j) to the two output files that Slurm creates when a job is run. The output files are written to the directory in which you launched your job in, you can also specify a different path. One file will contain any errors and the other will contain non-error output.  Look in these 2 files ending in .err and .out for useful debugging information and error output.

Because it's a Python 3 script that uses some Numpy code, we need to load the python/3.6.1 and the py-numpy/1.19.2_py36 modules. The Python script is then called just as you would on the command line at the end of the sbatch script:

sbatch script:

```shell
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
Create and edit the sbatch script with a [text editor][url_texteditors] like vim/nano or the [OnDemand file manager][url_filemanager]. Then save the file, in this example we call it "test.sbatch".

Submit to the scheduler with the [`sbatch`][url_sbatch] command:

```
$sbatch test.sbatch
```
Monitor your job and job ID in the queue with the [squeue][url_squeue] command:

```
$squeue -u $USER
   JOBID     PARTITION     NAME     USER    ST       TIME  NODES  NODELIST(REASON)
   44915821    normal    test_job  <userID>  PD       0:00      1 (Priority)
```

Notice that the jobs state (ST) in pending (PD)

Once the job starts to run that will change to R:

```
$squeue -u $USER
    JOBID     PARTITION     NAME     USER     ST      TIME  NODES   NODELIST(REASON)
    44915854    normal test_job  <userID>     R	     0:10	  1     sh02-01n49
```

Here you can see it has been running (R) on the compute node sh02-01n49 for 10 seconds.  While your job is running you have ssh access to that
node and can run diagnostic tools such as [`htop`][url_htop] and [`nvtop`][url_nvtop] in order to monitor your job's memory and CPU/GPU utilization in real-time.
You can also manage this job based on the JobID assigned to it (44915854).  For example the job can be cancelled with the [`scancel`][url_scancel] command.  After your job completes you can asses and fine-tune your resource requests (time, CPU/GPU, memory) with the [`sacct`][url_sacct] or seff commands.


### Resource requests

To get a better idea of the amount of resources your job will need, you can use
the `ruse` command, available as a [module][url_modules]:

```none
$ module load system ruse
```

[`ruse`][url_ruse] is a command line tool developed by Jan Moren to measure a
process' resource usage. It periodically measures the resource use of a process
and its subprocesses, and can help you find out how much resource to allocate
to your job. It will determine the actual memory, execution time and cores that
individual programs or MPI applications need to request in their job submission
options.

`ruse` periodically samples the process and its subprocesses and keeps track of
the CPU, time and maximum memory use. It also optionally records the sampled
values over time. The purpose or Ruse is not to profile processes in detail,
but to follow jobs that run for many minutes, hours or days, with no
performance impact and without changing the measured application in any way.

You'll find complete documentation and details about `ruse`'s usage on the
[project webpage][url_ruse], but here are a few useful examples.

##### Sizing a job

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

* which [partitions][url_partition] do I have access to?
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
-----------------------------------------------------------------------------------------------------------------------------------------------------
```

The above example shows four possible partitions where jobs can be submitted:
`normal,` `bigmem,` `dev,` or `gpu.` It also provides additional information
such as the maximum amount of time allowed in each partition, the number of
other jobs already in queue, along with the ranges of resoruces available on
nodes in each partition. In particular:

* in the `partition name` column, the `*` character indicates the default
  partition.
* the `queued` columns show the amount ot CPU cores or GPUs requested by
  pending jobs,
* the `per-node` columns show the range of resources available on each node in
  the partition. For instance, the `gpu` partition has nodes with 20 to 64 CPU
  cores and 191 to 2048 GB of memory, and up to 8 GPUs per node.



## Recurring jobs

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

The table below summarizes the advantages and inconvenients of each approach:


|     | Cron tasks | Recurring jobs |
| --- | :--------: | :------------: |
| Authorized on Sherlock                | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Dedicated resources for the task      | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Persistent across node redeployments  | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Unique, controlled execution          | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Precise schedule                      | :fontawesome-solid-check:{: .chk_yes :}| :fontawesome-solid-xmark:{: .chk_no :}  |

### Recurring job example

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
| `--job-name=cron` |  makes it easy to identify the job, is used by the  `--dependency=singleton` option to identify identical jobs, and will allow  cancelling the job by name (because its jobid will change each time it's  submitted) |
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



## Persistent jobs

[Recurring jobs](#recurring-jobs) described above are a good way to emulate
`cron` jobs on Sherlock, but don't fit all needs, especially when a persistent
service is required.

For instance, workflows that require a persistent database connection would
benefit from an ever-running database server instance. We don't provide
persistent database services on Sherlock, but instructions and examples on how
to submit database server jobs are provided for [MariaDB][url_mariadb] or
[PostgreSQL][url_pgsql].

In case those database instances need to run pretty much continuously (within
the limits of available resources and runtime maximums), the previous approach
described in the [recurring jobs](#recurring-jobs) section could fall a bit
short.  Recurring jobs are mainly designed for jobs that have a fixed execution
time and don't reach their time limit, but need to run at given intervals (like
synchronization or backup jobs, for instance).

Because a database server process will never end within the job, and will
continue until the job reaches its time limit, the last resubmission command
(`sbatch $0`) will actually never be executed, and the job won't be
resubmitted.

To work around this, a possible approach is to catch a specific
[signal][url_signals] sent by the scheduler at a predefined time, before the
time limit is reached, and then re-queue the job. This is easily done with the
Bash [`trap`][url_trap] command, which can be instructed to re-submit a job
when it receives the [`SIGUSR1`][url_signals] signal.

!!! important "Automatically resubmitting a job doesn't make it immediately runnable"

    Jobs that are automatically re-submitted using this technique won't restart
    right away: the will get back in queue and stay pending until their
    execution conditions (priority, resources, usage limits...) are satisfied.



### Persistent job example

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

    For instance, if you were to run a [PostgreSQL database server][url_pgsql],
    the `while true ... done` loop in the previous example could be replaced by
    something like this:

    ``` none
    postgres -i -D $DB_DIR &
    wait
    ```


### Persistent `$JOBID`

One potential issue with having a persistent job re-submit itself when it
reaches its runtime limit is that it will get a different `$JOBID` each time
it's (re-)submitted.

This could be particularly challenging when other jobs depend on it, like in
the database server scenario, where client jobs would need to start only if the
database server is running. This can be achieved with [job
dependencies][url_job_deps], but those dependencies have to be expressed using
jobids, so having the server job's id changing at each re-submission will be
difficult to handle.

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

```
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
[url_bash]:         //www.gnu.org/software/bash/manual/bash.html
[url_scancel]:      //slurm.schedmd.com/scancel.html
[url_ruse]:         //github.com/JanneM/Ruse

[url_modules]:      /docs/software/modules.md
[url_mariadb]:      /docs/software/using/mariadb.md
[url_pgsql]:        /docs/software/using/postgresql.md
[url_partition]:    /docs/glossary.md#partition
[url_nvtop]:        /docs/user-guide/gpu.md#advanced-options
[url_sh_dev]:       /docs/user-guide/running-jobs.md#interactive-jobs
[url_filemanager]:  /docs/user-guide/ondemand.md#managing-files
[url_texteditors]:  /docs/getting-started/index.md#text-editors

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


--8<--- "includes/_acronyms.md"
