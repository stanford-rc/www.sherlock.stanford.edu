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




## Recurring jobs
[comment]: #_

!!! Warning

    `Cron` tasks are not supported on Sherlock.

Users are not allowed to create `cron` jobs on Sherlock, for a variety of
reasons:

* resources limits cannot be easily enforced in `cron` jobs, meaning that a
  single user can end up monopolizing all the resources of a login node,
* user `cron` jobs have the potential of bringing down whole
  nodes by creating fork bombs, if they're not carefully crafted and tested,
* compute and login nodes could be redeployed at any time, meaning that
  `cron` jobs scheduled there could go away without the user being notified,
  and cause all sorts of unexpected results.

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

### Example

The script below presents an example of such a recurring, self-resubmitting
job, that would emulate a `cron` task. It will append a timestamped line to a
`cron.log` file in your `$HOME` directory and run every 7 days.

```bash
#!/bin/bash
#SBATCH --job-name=cron
#SBATCH --begin=now+7days
#SBATCH --dependency=singleton
#SBATCH --time=00:02:00
#SBATCH --mail-type=FAIL

date -R >> $HOME/cron.log

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
| `--job-name=cron` |  makes it easy to identify the job, is used by the  `--depency=singleton` option to identify identical jobs, and will allow  cancelling the job by name (because it's jobid will change each time it's  submitted) |
| `--begin=now+7days`  |  will instruct the scheduler to not even consider the job   for scheduling before 7 days after it's been submitted |
| `--dependency=singleton` |  will make sure that only one `cron` job runs at any given time |
| `--time=00:02:00` |  runtime limit for the job. You'll need to adjust the value   depending on the task you need to run (shorter runtime requests usually   result in the job running closer to the clock mark) |
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



[comment]: #  (batch jobs, resource requirements, partitions, qos, limits, mail...)




[comment]: #  (link URLs -----------------------------------------------------)

[url_sbatch]:   https://slurm.schedmd.com/sbatch.html



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


