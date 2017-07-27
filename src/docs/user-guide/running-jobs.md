!!! bug ":construction: Work in progress :construction:"

    This page is a work in progress and is not complete yet. We are actively
    working on adding more content and information.




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
If you prefer to submit an existing job script or other executable as an
interactive job, you can use the `salloc` command:

```
$ salloc script.sh
```

If you don't provide a command to execute, `salloc` wil start a Slurm job and
allocate resources for it, but it will not automatically connect you to the
allocated node(s). It will only start a new shell on the same node you launched
`salloc` from, and set up the appropriate `$SLURM_*` [environment
variables][url_slurm_env]. So you will typically need to look at them to see
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

#### Connecting to compute nodes

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


[comment]: #  (batch jobs, resource requirements, partitions, qos, limits, mail...)




[comment]: #  (link URLs -----------------------------------------------------)

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


