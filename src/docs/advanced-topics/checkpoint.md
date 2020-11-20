# Checkpoint/restart

## Introduction

Checkpointing is the action of saving the state of a running process to a file,
so it can be restarted later from the checkpoint file, continuing its execution
from where it left off, potentially on a different system.

Checkpointing is particularly useful on large HPC systems like Sherlock. From
the user's perspective, checkpointing enables jobs to run longer than the
maximum runtime limit configured on a partition. It could also improve job
throughput by splitting a long running job into multiple shorter ones, that
could fit more easily inside free resource slots.

Long-running jobs are also subject to all of the risks of system instability
due to power outages, hardware defects, etc. A program with a short execution
time can easily be restarted, but for long-running programs, it is preferable
to use checkpoints to minimize the risk of losing several days' worth of
computation.

!!! info

    For more information about checkpointing in general, we recommend taking a
    look at [this presentation][url_pres_chkpt].

Application developers are in the best position to implement checkpointing
features in their code, as they're the most knowledgeable about the inner
workings of their programs. And if an application already supports
checkpointing internally, users should try to take advantage of it.  But
unfortunately, not many application support checkpointing natively, so a more
systemic approach is often necessary.


## DMTCP

[Distributed MultiThreaded CheckPointing (DMTCP)][url_dmtcp] is a generic
checkpointing framework, living entirely in user-space, that can transparently
checkpoint a threaded or distributed computation, without any modification to
the application, and periodically save its state on disk.

It supports MPI, OpenMP, Python, Perl, R, Julia, MATLAB and many programming
languages. DMTCP works with no modifications to the application binaries and
doesn't require particular privileges.

DMTCP implements a coordinated checkpointing system, where one _coordinator_ is
started for each computation that needs to be checkpointed. A DMTCP coordinator
process is started on one host (typically a node allocated to your job).
Application binaries are then started through the `dmtcp_launch` command, which
will allow them to connect to the coordinator upon startup. As threads are
spawned, child processes are forked, remote processes are spawned via ssh,
libraries are dynamically loaded, DMTCP transparently and automatically tracks
them. `dmtcp_command` can then be used to generate checkpoints, and a
`dmtcp_restart_script.sh` will be available to restart the application from a
checkpoint. Typically, generating or restarting from a checkpoint takes less
than a few seconds.

!!! note

    Checkpoint files are backed up, so even if the coordinator dies or if the
    job is terminated while the checkpoint files are being written, the
    application can still resume from previous, successfully generated
    checkpoint files.

Benefits of checkpointing and restarting jobs with DMTCP will provide:

    * the possibility of running jobs for any length of time,
    * increased job throughput,
    * improved resilience against node failures,
    * better overall utilization of resources


### Overview

Here are the general steps required to run a program with checkpointing:

```shell

### start dmtcp_coordinator in the background
$ dmtcp_coordinator --daemon --exit-on-last $@ 1>/dev/null 2>&1

### launch program with dmtcp_launch
$ dmtcp_launch ./my.app &

### generate a checkpoint, that will generate a "dmtcp_restart_script.sh" script
$ dmtcp_command --bcheckpoint
```

And to restart the application from the latest checkpoint:

```shell
### restart
$ ./dmtcp_restart_script.sh
```


### More documentation

The following documentation is specifically intended for using DMTCP on
Sherlock. For more complete documentation about DMTCP in general, please see
the [DMTCP documentation][url_dmtcp], and especially the [FAQ][url_dmtcp_faq]

!!! warning "DMTCP is not a magic bullet"

    Not all applications will work well with DMTCP, so your experience may vary
    from application to application.  Users are encouraged to experiment with
    their own applications, to test checkpoint/restart in their production
    workloads and to report their findings at {{ support_email }}



## Using DMTCP on Sherlock

### Requirements

DMTCP is installed as a [module][url_modules] on Sherlock and can be accessed
like this:

```shell
$ ml system
$ ml dmtcp
```

The `dmtcp` module on Sherlock provides a convenient wrapper over DMTCP
commands, called `start_coordinator`,  which can significantly simplify
checkpointing and resuming jobs. The example below will use that wrapper.

### Checkpointing jobs

#### Interactive jobs

The following example will take you through checkpointing a serial application interactively on Sherlock.

##### Checkpointing

1. Get on a compute node using with the `dev` command:
```shell
$ sdev
```

2. Once on the compute node, load the `dmtcp` module:
```shell
$ ml system dmtcp
```

3. Start the DMTCP coordinator through the `start_coordinator` wrapper, indicating
that you'd like a checkpoint file to be automatically generated every minute
(`-i 60`):
```shell
$ start_coordinator -i 60
Starting DMTCP coordinator for job 3413922
```

4. Start your "program" under DMTCP's control, and let it run for a few minutes.
Here, for illustration purposes, our application will be a simple Bash shell
loop:

```shell
$ dmtcp_launch bash -c 'for i in {1..100}; do echo $i; sleep 10; done'
```

4. While your job is running, on the second terminal (where the coordinator is running), you can
   send checkpoint and other commands to your running job. Type '?' for available commands.
   E.g., 'c' for checkpointing, 's' for querying the job status, and 'q' for terminating the job,
```shell
c
s
q
```

#### Restarting
repeat steps 1-2 and 4 above, and replace the step 3 with the `dmtcp_restart` command. Here are the steps on `Cori`:

1. Get on a compute node - same as step 1 above
2. Start the coordinator on another terminal - same as step 2 above
3. Restart application from checkpoint files using `dmtcp_restart` command
  ```shell
  dmtcp_restart ckpt_a.out_*.dmtcp
  ```
4. Send checkpoint and other commands from the coordinator prompt - same as step 4 above

In the example above, the `dmtcp_coordinator` command is invoked before the application launch.
If not,  both `dmtcp_launch` and `dmtcp_restart` invoke `dmtcp_coordinator` internally, which then
detaches from its parent process. You can also run `dmtcp_coordinator` as a daemon (using the --daemon option)
in the background (this is useful for batch jobs).
DMTCP provides a command, `dmtcp_command`, to send the commands to the coordinator remotely.

```shell
dmtcp_command --checkpoint  # checkpoint all processes
dmtcp_command --status      # query the status
dmtcp_command --quit        # kill all processes and quit
```

All `dmtcp_*` commands support command line options (use `--help` to see the list).
For instance, you can enable periodic checkpointing using the `-i <checkpoint interval (secs)>` option
when invoking the `dmtcp_coordinator`, `dmtcp_launch` or `dmtcp_restart`
command. Both `dmtcp_launch` and `dmtcp_restart` assume the coordinator is running
on the localhost and listening to the port number 7779. If the coordinator runs at different host and listens
to a different port, you can use the `-h <hostname>` and `-p <port number>` options or using the environment variables,
`DMTCP_COORD_HOST` and `DMTCP_COORD_PORT`, to make `dmtcp_launch` or `dmtcp_restart` connect to their coordinator.



NOTE: must use interpreter for scripts


#### Batch jobs

#### Automating





[comment]: #  (link URLs -----------------------------------------------------)

[url_dmtcp]:        //dmtcp.sourceforge.net
[url_dmtcp_faq]:    //dmtcp.sourceforge.net/FAQ.html
[url_pres_chkpt]:   http://www.ceci-hpc.be/assets/training/checkpointing.pdf

[url_modules]:      /docs/software/modules


--8<--- "includes/_acronyms.md"
