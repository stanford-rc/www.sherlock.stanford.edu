---
icon: material/calendar-clock
tags:
    - slurm
    - advanced
---

# Scheduling on Sherlock

## Job distribution across nodes

In a shared cluster, many jobs run concurrently across different subsets of
nodes. The scheduler packs jobs together to keep utilization high, leaving
only small gaps between allocations.

![Job distribution diagram](../images/job_distribution.svg#only-light)
![Job distribution diagram](../images/job_distribution_dark.svg#only-dark)

The diagram above shows how six jobs with different node and time requirements
are laid out across six nodes over nine time units. Jobs A and B fill most of
the cluster at t=0–3, leaving only Node 4 free (later filled by Job D). Jobs
C through E run concurrently at t=3–6/7, followed by Job F which spans all
six nodes.

A few things to observe:

- Large jobs (like Job F, 6 nodes) must wait until all required nodes are
  simultaneously free, which typically means a longer queue wait.
- Small jobs (like C and E, 1 node each) can often start right away by fitting
  into gaps left by larger jobs.
- Free slots (shown in grey) represent idle capacity the scheduler will try
  to fill.


## Backfill scheduling

Slurm does not run jobs strictly in priority order. Instead it uses a
[backfill][url_backfill] strategy: the scheduler looks ahead in the queue and
starts lower-priority jobs early if doing so will not delay any
higher-priority job's reserved start time.

![Backfill scheduling diagram](../images/backfill_scheduling.svg#only-light)
![Backfill scheduling diagram](../images/backfill_scheduling_dark.svg#only-dark)

In the diagram above, high-priority Job X has a reserved start at t=6 when
enough resources free up. Rather than leaving those resources idle until then,
Slurm fills the gap with lower-priority jobs Y and Z, which finish before
Job X needs to start.

The practical effect is that a job with a small resource footprint or a short
time limit is much more likely to slip into a gap and start immediately, while
a large job may have to wait until enough nodes are free at the same time.


## Implications for your jobs

- Request only the nodes and time your job actually needs. Overestimating the
  time limit reduces the chance that a backfill slot is available.
- Use [job arrays][url_job_arrays] for many independent tasks rather than
  requesting a large number of nodes at once.
- Short, small jobs get priority access to backfill slots and can often start
  within minutes even when the cluster is busy.


[comment]: # (link URLs --------------------------------------------------------)

[url_backfill]:   //slurm.schedmd.com/sched_config.html#backfill
[url_job_arrays]: //slurm.schedmd.com/job_array.html


--8<--- "includes/_acronyms.md"
