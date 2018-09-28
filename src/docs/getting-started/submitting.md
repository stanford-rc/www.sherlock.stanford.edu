## Principle

!!! danger "Login nodes are not for computing"

    Login nodes are shared among many users and therefore must not be used to
    run computationally intensive tasks. Those should be submitted to the
    scheduler which will dispatch them on compute nodes.

### Requesting resources

A mandatory prerequisite for running computational tasks on Sherlock is to
request computing resources. This is done via a resource scheduler, whose very
purpose is to match compute resources in the cluster (CPUs, GPUs, memory, ...)
with user resource requests.

The scheduler provides three key functions:

1. it allocates access to resources (compute nodes) to users for some duration
   of time so they can perform work.
2. it provides a framework for starting, executing, and monitoring work
   (typically a parallel job such as MPI) on a set of allocated nodes.
3. it arbitrates contention for resources by managing a queue of pending jobs


### Slurm

<!-- HTML interlude for the main page logo -->
<style>
@media only screen and (max-width: 720px) {
    #logo_head {
        display: none;
    }
}
</style>
<img id="slurm_logo" align="right" height="115px"
     alt="Slurm" src="https://slurm.schedmd.com/slurm_logo.png"/>


Sherlock uses [Slurm][url_slurm], an open-source resource manager and job
scheduler, used by many of the world's [supercomputers and computer
clusters][url_top500].


Slurm supports a variety of job submission techniques. By accurately requesting
the resources you need, you’ll be able to get your work done.

!!! tip "Wait times in queue"

    As a quick rule of thumb, it's important to keep in mind that the more
    resources your job requests (CPUs, GPUs, memory, nodes, and time), the
    longer it may have to wait in queue before it could start.

    In other words:
    accurately requesting resources to match your job's needs will minimize
    your wait times.


## How to submit a job

A job consists in two parts: resource requests and job steps.

: **Resource requests** describe the amount of computing resource (CPUs, GPUs,
memory, expected run time, etc.) that the job will need to successfully run.

: **Job steps** describe tasks that must be executed.


### Batch scripts

The typical way of creating a job is to write a job submission script. A
submission script is a shell script (e.g. a Bash script) whose first comments,
if they are prefixed with `#SBATCH`, are interpreted by Slurm as parameters
describing resource requests and submissions options[^man_sbatch].

The submission script itself is a job step. Other job steps are created with
the `srun` command.

For instance, the following script would request one task with one CPU for 10
minutes, along with 2 GB of memory, in the default partition:

```bash
#!/bin/bash
#
#SBATCH --job-name=test
#
#SBATCH --time=10:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=2G

srun hostname
srun sleep 60
```

When started, the job would run a first job step `srun hostname`, which will
launch the command `hostname` on the node on which the requested CPU was
allocated. Then, a second job step will start the `sleep` command.

You can create this job submission script on Sherlock using a [text
editor][url_texteditors] such as `nano` or `vim`, and save it as `submit.sh`.

!!! warning "Slurm directives must be at the top of the script"

    Slurm will ignore all `#SBATCH` directives after the first non-comment
    line.  Always put your `#SBATCH` parameters at the top of your batch
    script.

### Job submission

Once the submission script is written properly, you can submit it to the
scheduler with the `sbatch` command. Upon success, `sbatch` will return the ID
it has assigned to the job (the jobid).

```
$ sbatch submit.sh
Submitted batch job 1377
```

### Check the job

Once submitted, the job enters the queue in the `PENDING` state. When resources
become available and the job has sufficient priority, an allocation is created
for it and it moves to the `RUNNING` state. If the job completes correctly, it
goes to the `COMPLETED` state, otherwise, its state is set to `FAILED`.

You'll be able to check the status of your job and follow its evolution with
the `squeue -u $USER` command:

```
$ squeue -u $USER
     JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
      1377    normal     test   kilian  R       0:12      1 sh-101-01
```

The scheduler will automatically create an output file that will contain the
result of the commands run in the script file. That output file is names
`slurm-<jobid>.out` by default, but can be customized via submission options.
In the above example, you can list the contents of that output file with the
following commands:

```
$ cat slurm-1377.out
sh-101-01
```

Congratulations, you've submitted your first batch job on Sherlock!


##  What's next?

Actually, quite a lot. Although you now know how to submit a simple batch job,
there are many other options and areas to explore in the next sections:

* [Data transfer][url_transfer]
* [Storage][url_storage]
* [Running jobs][url_runningjobs]



[comment]: #  (link URLs -----------------------------------------------------)

[url_slurm]:  https://slurm.schedmd.com
[url_top500]: https://top500.org

[url_texteditors]:    prerequisites/#text-editors
[url_running]:        /docs/user-guide/running-jobs/

[url_transfer]:       /docs/storage/data-transfer
[url_storage]:        /docs/storage
[url_runningjobs]:    /docs/user-guide/running-jobs/

[comment]: #  (footnotes -----------------------------------------------------)

[^man_sbatch]: You can get the complete list of parameters by referring to the
  `sbatch` manual page (`man sbatch`).

