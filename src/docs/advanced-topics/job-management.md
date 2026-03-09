---
tags:
    - slurm
    - advanced
---

## Job submission limits

Sherlock enforces limits on the number of jobs that can be in queue at any
given time, to ensure fair access to resources for all users.

!!! tip "Checking current limits"

    Run `sh_part` to see the current submission limits for each partition.

### Queue limits

When the per-user or per-group queue limit is reached, job submissions will
fail with:

``` shell
sbatch: error: MaxSubmitJobsPerAccount
sbatch: error: MaxSubmitJobsPerUser
```

`MaxSubmitJobsPerUser` means the per-user limit has been reached;
`MaxSubmitJobsPerAccount` means the limit for your group (Slurm account) has
been reached, regardless of how many jobs you personally have in queue.

### Wall-time limits

Jobs on the `normal` partition are limited to 2 days. To run longer, add the
`long` QOS to your submission script:

``` shell { .copy .select }
#SBATCH --time=3-00:00:00
#SBATCH --qos=long
```

!!! info "Owners partition"

    If you have access to an [owners][url_owners] partition, the maximum
    wall-clock time is 7 days and you do not need the `long` QOS.


## Minimizing the number of jobs in queue

Reducing the number of jobs submitted to the scheduler is generally good
practice. One effective approach is to pack more work into each job.

For example, consider a 100-task array job running one `app` instance per
array item:

``` shell { title="array_job.sbatch" .copy .select }
#!/bin/bash
#SBATCH --array=1-100
#SBATCH -n 1

./app ${SLURM_ARRAY_TASK_ID}
```

This creates 100 jobs in queue, each using 1 CPU. Instead, you can consolidate
them by running multiple tasks per array item:

``` shell { title="array_job_optimized.sbatch" .copy .select }
#!/bin/bash
#SBATCH --array=0-99:10
#SBATCH -n 10

for i in {0..9}; do
    srun -n 1 ./app $((SLURM_ARRAY_TASK_ID+i)) &
done

wait # important: keeps the job alive until background tasks finish
```

* `--array=0-99:10` submits 10 array jobs with indexes 0, 10, 20 ... 90
* `-n 10` allocates 10 CPUs per array job
* the `for` loop runs 10 tasks in parallel, covering indexes
  `SLURM_ARRAY_TASK_ID` to `SLURM_ARRAY_TASK_ID + 9`

This runs the same 100 `app` instances while reducing the number of queued
jobs by 10x, helping stay within submission limits.


--8<--- "includes/_acronyms.md"

[url_owners]:  ../concepts.md#investing-in-sherlock
