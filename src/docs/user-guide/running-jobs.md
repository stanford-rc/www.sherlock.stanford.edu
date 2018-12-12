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

    To minimize disruption and ensure a confortable working environment for
    users, resource limits are enforced on login nodes, and processes started
    there will automatically be terminated if their resource usage (including
    CPU time, memory and run time) exceed those limits.


## Slurm commands

Slurm allows requesting resources and submitting jobs in a variety of ways. The
main Slurm commands to submit jobs are listed in the table below:

| Command  | Description | Behavior |
| -------- | ----------- | -------- |
| `salloc` | Request resources and allocates them to a job | Starts a new shell, but does not execute anything |
| `srun`   | Request resources and runs a command on the allocated compute node(s) | Blocking command: will not return until the job ends |
| `sbatch` | Request resources and runs a script on the allocated compute node(s) | Asynchronous command: will return as soon as the job is submitted |

## Interactive jobs

### Dedicated nodes

Interactive jobs allow users to log in to a compute node to run commands
interactively on the command line. They could be an integral
part of an interactive programming and debugging workflow. The simplest way to
establish an interactive session on Sherlock is to use the `sdev` command:

```
$ sdev
```

This will open a login shell using one core and 4 GB of memory on one node for
one hour. The `sdev` sessions run on dedicated compute nodes. This ensures
minimal wait times when you need to access a node for testing script, debug
code or any kind of interactive work.

`sdev` also provides X11 forwarding via the submission host (typically the
login node you're connected to) and can thus be used to run GUI applications.


### Compute nodes

If you need more resources[^dev_limits], you can pass options to `sdev`, to
request more CPU cores, more nodes, or even run in a different partition.
`sdev -h` will provide more information:

```
$ sdev -h
sdev: start an interactive shell on a compute node

Usage: sdev [OPTIONS]
    Optional arguments:
        -n      number of CPU cores to request (default: 1)
        -N      number of nodes to request (default: 1)
        -m      memory amount to request (default: 4GB)
        -p      partition to run the job in (default: dev)
        -t      time limit (default: 01:00:00, ie. 1 hour)
        -r      allocate resources from the named reservation (default: none)
        -J      job name (default: sdev)
        -q      quality of service to request for the job (default: normal)

```

Another way to get an interactive session on a compute node is to use `srun` to
execute a shell through the scheduler. For instance, to start a `bash` session
on a compute node, with the default resource requirements (one core for 2
hours), you can run:

```
$ srun --pty bash
```

The main advantage of this approach is that it will allow you to specify the
whole range of submission options that `sdev` may not support.

Finally, if you prefer to submit an existing job script or other executable as
an interactive job, you can use the `salloc` command:

```
$ salloc script.sh
```

If you don't provide a command to execute, `salloc` will start a Slurm job and
allocate resources for it, but it will not automatically connect you to the
allocated node(s). It will only start a new shell on the same node you launched
`salloc` from, and set up the appropriate `$SLURM_*` environment
variables. So you will typically need to look at them to see
what nodes have been assigned to your job. For instance:

```
$ salloc
salloc: Granted job allocation 655914
$ echo $SLURM_NODELIST
sh-101-55
$ ssh sh-101-55
[...]
sh-101-55 ~ $
```

#### Connecting to nodes

!!! warning "Login to compute nodes"

    Users are not allowed to login to compute nodes unless they have a job
    running there.

If you SSH to a compute node without any active job allocation, you'll be
greeted by the following message:

```
$ ssh sh-101-01
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

--8<--- "_wip.md"
[comment]: #_




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

<!-- color styles for yes/no checks -->
<style>
.yes { color: darkgreen; }
.no  { color: darkred;   }
</style>

|     | Cron tasks | Recurring jobs |
| --- | :--------: | :------------: |
| Authorized on Sherlock                | <b class="no">:fa-times:</b> | <b class="yes">:fa-check:</b> |
| Dedicated resources for the task      | <b class="no">:fa-times:</b> | <b class="yes">:fa-check:</b> |
| Persistent across node redeployments  | <b class="no">:fa-times:</b> | <b class="yes">:fa-check:</b> |
| Unique, controlled execution          | <b class="no">:fa-times:</b> | <b class="yes">:fa-check:</b> |
| Potential execution delay             | <b class="yes">:fa-check:</b> | <b class="no">:fa-times:</b> |

### Example

The script below presents an example of such a recurring, self-resubmitting
job, that would emulate a `cron` task. It will append a timestamped line to a
`cron.log` file in your `$HOME` directory and run every 7 days.

```bash tab="cron.sbatch"
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

```
$ sbatch cron.sbatch
```

It will start running for the first time 7 days after
you submit it, and it will continue to run until you cancel it with the
following command (using the job name, as defined by the `--job-name` option):

```
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



### Example

Here's the recurring job example from above, modified to:

1. instruct the scheduler to send a `SIGUSR1` signal to the job 90
   seconds[^signal_delay] before reaching its time limit (with the `#SBATCH
   --signal` option),
2. re-submit itself upon receiving that `SIGUSR1` signal (with the `trap`
   command)

```bash tab="persistent.sbatch"
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

## Insert the command to run below. Here, we're just outputing the date every
## 10 seconds, forever

echo "$(date): job $SLURM_JOBID starting on $SLURM_NODELIST"
while true; do
    echo "$(date): normal execution"
    sleep 60
done

```

!!! danger "Long running processes need to run in the background"

    If your job's actual paylod (the application or command you want to run) is
    running continuously for the whole duration of the job, it needs to be run
    in the background, so the trap can be processed.

    To run your application in the background, just add a `&` at the end of the
    command and then add a `wait` statement at the end of the script, to make
    the shell wait until the end of the job.

    For instance, if you were to run a [PostgreSQL database server][url_pgsql],
    the `while true ... done` loop in the previous example could be replaced by
    something like this:

    ```bash
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


The previous [example](#example_1) can then be modified as follows:

```bash tab="persistent.sbatch" hl_lines="10"
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

## Insert the command to run below. Here, we're just outputing the date every
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

The job runs for 5 minutes, then received the `SIGUSR`` signal, is re-queued,
restarts for 5 minutes, and so on, until it's properly `scancel`led.


[comment]: #  (TODO: batch jobs, resource requirements, partitions, qos, limits, mail...)


[comment]: #  (link URLs -----------------------------------------------------)

[url_sbatch]:   https://slurm.schedmd.com/sbatch.html
[url_trap]:     http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html
[url_signals]:  https://en.wikipedia.org/wiki/Signal_(IPC)
[url_job_deps]: https://slurm.schedmd.com/sbatch.html#OPT_dependency

[url_mariadb]:  /docs/software/using/mariadb
[url_pgsql]:    /docs/software/using/postgresql



[comment]: #  (footnotes -----------------------------------------------------)

[^dev_limits]: The dedicated partition that `sdev` uses by default only allows
  up to 2 cores and 8 GB or memory per user at any given time. So if you need
  more resources for your interactive session, you may have to specify a
  different partition. See the [Partitions](#partitions) section for more
  details.

[^ssh_job_limits]: Please note that your SSH session will be attached to your
  running job, and that resources used by that interactive shell will count
  towards your job's resource limits. So if you start a process using large
  amounts of memory via SSH while your job is running, you may hit the job's
  memory limits, which will trigger its termination.


[^signal_delay]: Due to the resolution of event handling by the scheduler, the
  signal may be sent up to 60 seconds earlier than specified.
