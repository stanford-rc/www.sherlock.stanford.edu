---
tags:
    - slurm
---

## Job submission limits

You may have encountered situations where your jobs get rejected at submission
with errors like this:

``` shell
sbatch: error: MaxSubmitJobsPerAccount
sbatch: error: MaxSubmitJobsPerUser
```

There are a number of limits on Sherlock, that are put in place to guarantee
that all of the users can have a fair access to resources and a smooth
experience while using them. One of those limits is about the total number of
jobs a single user (and a single group) can have in queue at any given time.
This helps ensuring that the scheduler is able to continue operating in an
optimal fashion, without being overloaded by a single user or group.

To see the job submission limits on Sherlock run the `sh_part` command.  

To run longer than 2 days on the normal partition you will need to add the "long" QOS to your submission scripts.
For example to run for exactly 3 days add the following two lines to your sbatch script:   

``` shell
#SBATCH --time=3-00:00:00
#SBATCH --qos=long
```

If you have access to an [owners][url_owners] partition you will not need to add this QOS since the MaxWall on owners is 7 days.

### Minimizing the number of jobs in queue

It's generally a good practice to try reducing the number of jobs submitted to
the scheduler, and depending on your workflow, there are various approaches for
this. One solution may be to pack more work within a single job, which could
help in reducing the overall number of jobs you'll have to submit.

Imagine you have a 100-task array job, where you run 1 `app` task per array
item, which looks like this:


``` shell
#!/bin/bash
#SBATCH --array=1-100
#SBATCH -n 1

./app ${SLURM_ARRAY_TASK_ID}
```

This script would create 100 jobs in queue (even though they would all
be regrouped under the same job array), each using 1 CPU to run 1 task.



Instead of that 100-task array job, you can try something like this:

``` shell
#!/bin/bash
#SBATCH --array=0-99:10
#SBATCH -n 10

for i in {0..9}; do
    srun -n 1 ./app $((SLURM_ARRAY_TASK_ID+i)) &
done

wait # important to make sure the job doesn't exit before the background tasks are done
```

* `--array=0-99:10` will use job array indexes 0, 10, 20 ... 90
* `-n 10` will make sure each job can be subdivided in 10 1-CPU steps
* the `for` loop will launch 10 tasks, with indexes from `SLURM_ARRAY_TASK_ID`
  to `SLURM_ARRAY_TASK_ID + 9`.

This would submit a 10-task array job, each of them running 10 steps
simultaneously, on the 10 CPUs that each of the job array item will be allocated.

In the end, you'll have run the same number of `app` instances, but you'll have
divided the number of jobs submitted by 10, and allow you to submit the same
amount of work to the scheduler, while staying under the submission limits.


--8<--- "includes/_acronyms.md"

[url_owners]:  /docs/concepts/#investing-in-sherlock

