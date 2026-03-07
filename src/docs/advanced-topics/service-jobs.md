---
tags:
    - slurm
    - advanced
---

The `service` partition is designed for lightweight, recurring, or persistent
tasks that don't require significant compute resources: data transfers, backups,
archival processes, CI/CD pipelines, lightweight database servers, monitoring
agents, and similar cron-like operations.

Resources in the `service` partition are heavily oversubscribed, meaning
multiple jobs share the same CPU and memory. It is not suitable for
compute-intensive workloads. Its main advantage is that jobs submitted there
are isolated from user-facing compute partitions, and are managed by Slurm
like any other job.

!!! warning "`service` is not for compute"

    Jobs running in the `service` partition may experience significant slowdowns
    if they attempt to use substantial CPU or memory. Use `normal`, `bigmem`, or
    `gpu` for anything compute-intensive.

Typical use cases:

* Scheduled and recurring jobs (e.g., via [`scrontab`](#slurm-crontab))
* Data movement (`rsync`, `scp`, etc.)
* Automated backups and data archival
* Monitoring agents, job managers, or lightweight daemons
* CI/CD tasks that do not require high performance or specialized hardware


## Recurring jobs

!!! warning

    `cron` tasks are not supported on Sherlock.

Users are not allowed to create `cron` jobs on Sherlock, for a variety of
reasons:

* resource limits cannot be easily enforced in `cron` jobs, meaning that a
  single user can end up monopolizing all the resources of a login node,
* no amount of resources can be guaranteed when executing a `cron` job, leading
  to unreliable runtime and performance,
* user `cron` jobs have the potential of bringing down whole nodes by creating
  fork bombs, if they're not carefully crafted and tested,
* compute and login nodes could be redeployed at any time, meaning that `cron`
  jobs scheduled there could go away without the user being notified, and cause
  all sorts of unexpected results,
* `cron` jobs could be mistakenly scheduled on several nodes and run multiple
  times, which could result in corrupted files.

As an alternative, you can use the `--begin` submission option and create a job
that resubmits itself once it's done, effectively emulating a `cron` job
without its disadvantages: your task runs on a compute node with dedicated
resources, unaffected by other users.

The starting time of such a task may not be precise, as Slurm schedules it like
any other job. For typical recurring tasks (file synchronization, backups,
database updates), this is usually an acceptable trade-off.

The table below summarizes the advantages and drawbacks of each approach:

|     | Cron tasks | Recurring jobs |
| --- | :--------: | :------------: |
| Authorized on Sherlock              | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Dedicated resources for the task    | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Persistent across node redeployment | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Unique, controlled execution        | :fontawesome-solid-xmark:{: .chk_no :} | :fontawesome-solid-check:{: .chk_yes :} |
| Precise schedule                    | :fontawesome-solid-check:{: .chk_yes :}| :fontawesome-solid-xmark:{: .chk_no :}  |

### Recurring job example

The script below emulates a `cron` task: it appends a timestamped line to a
`cron.log` file in your `$HOME` directory and runs every 7 days.

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

If the job payload fails, the job will not be resubmitted, and the user will
be notified by email. Key options used in this script:

| Option | Explanation |
| ------ | ----------- |
| `--job-name=cron` | Identifies the job in `squeue` and by `--dependency=singleton`; also allows canceling by name since the job ID changes at each resubmission |
| `--begin=now+7days` | Defers scheduling for 7 days after submission |
| `--dependency=singleton` | Ensures only one instance of the job runs at any given time |
| `--time=00:02:00` | Runtime limit; shorter requests tend to run closer to the scheduled time |
| `--mail-type=FAIL` | Sends an email notification if the job fails |
| `sbatch $0` | Resubmits the script itself after successful execution |

Submit it with:

``` none
$ sbatch cron.sbatch
```

It will run for the first time 7 days after submission, and continue until
canceled by name:

``` none
$ scancel -n cron
```


## Persistent jobs

[Recurring jobs](#recurring-jobs) work well for tasks with a fixed execution
time that need to run at regular intervals. They are less suited for persistent
services, like a database server, that run continuously until the job hits its
time limit.

Because a database server process never ends on its own, the final `sbatch $0`
resubmission command is never reached. To handle this, the job can instead
catch a [signal][url_signals] sent by the scheduler shortly before the time
limit, and use it to requeue itself. This is done with the Bash
[`trap`][url_trap] command.

!!! info "Execution delay after requeue"

    Jobs resubmitted this way re-enter the queue and may wait before restarting,
    depending on priority and resource availability.

Instructions and examples for submitting persistent database servers are
available for [MariaDB][anc_mariadb] and [PostgreSQL][anc_pgsql].

### Persistent job example

The example below is modified from the recurring job above to:

1. send a `SIGUSR1` signal to the job 90 seconds[^signal_delay] before its
   time limit (via `--signal`),
2. requeue itself upon receiving that signal (via `trap`).

``` shell title="persistent.sbatch"
#!/bin/bash
#SBATCH --job-name=persistent
#SBATCH --dependency=singleton
#SBATCH --time=00:05:00
#SBATCH --signal=B:SIGUSR1@90

# catch the SIGUSR1 signal
_resubmit() {
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

!!! danger "Long-running processes must run in the background"

    If your job payload runs continuously for the whole duration of the job, it
    must be executed in the background so the signal trap can be processed. Add
    `&` at the end of the command and a `wait` statement at the end of the
    script.

    For example, to run a PostgreSQL database server:

    ``` none
    postgres -i -D $DB_DIR &
    wait
    ```


### Persistent `$JOBID`

Each resubmission via `sbatch $0` produces a new `$JOBID`, which makes it
difficult to express [job dependencies][url_job_deps] on the persistent job
from other jobs.

To preserve the same `$JOBID` across resubmissions, replace the `sbatch $0`
call with a requeue command:

``` shell
scontrol requeue $SLURM_JOBID
```

The updated script (highlighted line):

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

Submitting that job will produce output similar to this:

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

The job runs for 5 minutes, receives `SIGUSR1`, requeues with the same job ID,
and restarts, repeating until explicitly canceled with `scancel`.


## Slurm crontab

As an alternative to the approach above, Slurm provides the
[`scrontab`][url_scrontab] command to schedule jobs at specific times or
intervals, similar to the traditional `cron` system, while taking advantage of
Slurm resource management capabilities.

To edit your `scrontab` script:

``` none
$ scrontab -e
```

This opens your default editor (`vim` on Sherlock). Once saved, the job is
automatically scheduled. To list existing scripts:

``` none
$ scrontab -l
```

### Example `scrontab` script

`scrontab` scripts support regular Slurm options (`--time`, `--cpus-per-task`,
etc.). The example below runs every three hours in the `service` partition,
with a 10-minute runtime limit.

!!! note "Log file output"

    By default, Slurm will **overwrite** output files at each execution. Add
    `#SCRON --open-mode=append` to keep a running log across executions.

``` crontab
#SCRON -p service
#SCRON -t 00:10:00
#SCRON -o mycron_output-%j.out
#SCRON --open-mode=append

0 */3 * * * /path/to/your/script.sh
```

!!! info "Exceeding resource limits"

    If your resource requests exceed the partition limits, the job will be
    rejected when saving the script. For instance, requesting `-c 32` in the
    `service` partition will produce:

    ``` none
    There was an issue with the job submission on lines 26-29
    The error code return was: Job violates accounting/QOS policy (job submit limit, user's size and/or time limits)
    The error message was: QOSMaxCpuPerUserLimit
    The failed lines are commented out with #BAD:
    Do you want to retry the edit? (y/n)
    ```

### Long-running `scrontab` jobs

For long-running processes (database servers, job managers), set a short
execution interval so the job restarts quickly if interrupted, and use
`--dependency=singleton` to prevent duplicate instances:

``` crontab
#SCRON -p service
#SCRON -t 1-00:00:00
#SCRON --dependency=singleton
#SCRON --name=my_process

0 * * * * /path/to/your/script.sh
```

This instructs the scheduler to check every hour whether an instance is running
and start one if not.

!!! warning "Avoiding duplicate job instances"

    Always use `--dependency=singleton` to prevent multiple instances from
    running simultaneously, especially when editing the `scrontab` file.


### Monitoring `scrontab` jobs

Monitor `scrontab` jobs with `squeue` like any other Slurm job. To list only
your `scrontab` jobs:

``` none
$ squeue --me -O JobID,EligibleTime,CronJob | awk 'NR==1 || $NF=="Yes"'
JOBID               ELIGIBLE_TIME       CRON_JOB
105650              2025-05-23T13:20:00 Yes
```

The `ELIGIBLE_TIME` column shows the next scheduled execution time.


### Canceling a `scrontab` job

Edit the `scrontab` file with `scrontab -e` and comment out all lines
associated with the job. The job is removed from the queue immediately on save.

!!! info "Using `scancel` on a `scrontab` job"

    `scancel` requires the `--cron` flag for `scrontab` jobs:

    ```bash
    $ scancel 105650
    scancel: error: Kill job error on job id 105650: Cannot cancel scrontab jobs without --cron flag.
    ```

    When canceled with `--cron`, the corresponding entries are prepended with
    `#DISABLED` in the `scrontab` file and must be manually re-enabled.


[comment]: #  (link URLs -----------------------------------------------------)

[url_trap]:         //tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html
[url_signals]:      //en.wikipedia.org/wiki/Signal_(IPC)
[url_job_deps]:     //slurm.schedmd.com/sbatch.html#OPT_dependency
[url_scrontab]:     //slurm.schedmd.com/scrontab.html

[anc_mariadb]:      ../software/using/mariadb.md
[anc_pgsql]:        ../software/using/postgresql.md

[comment]: #  (footnotes -----------------------------------------------------)

[^signal_delay]: Due to the resolution of event handling by the scheduler, the
  signal may be sent up to 60 seconds earlier than specified.


--8<--- "includes/_acronyms.md"
