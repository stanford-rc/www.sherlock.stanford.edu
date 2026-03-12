---
icon: material/format-list-text
tags:
    - slurm
    - advanced
---

`#SBATCH` directives are Slurm options embedded in a batch script as special
comments. They are equivalent to passing the same flags on the `sbatch` command
line. The full reference is in the [Slurm `sbatch` documentation][url_sbatch],
but the most commonly used options are described below.

Most of these options also apply to [`salloc`][url_salloc] and
[`srun`][url_srun] when passed directly on the command line, though some
options are specific to batch submission.

!!! warning "Directives must come before any executable line"

    Slurm stops parsing `#SBATCH` directives as soon as it encounters the first
    executable line (any line that is not a comment or blank). Directives placed
    after executable code are silently ignored. Always place all `#SBATCH` lines
    at the top of the script, right after the shebang.


## Example script

A typical batch job using the most common options:

``` shell { title="job.sbatch" .copy .select }
#!/bin/bash
#SBATCH --job-name=analysis         # job name (shown in squeue and notifications)
#SBATCH --output=%x.%j.out          # stdout file (%x = job name, %j = job ID)
#SBATCH --error=%x.%j.err           # stderr file
#SBATCH --time=4:00:00              # wall-clock time limit (HH:MM:SS)
#SBATCH --partition=normal          # partition to submit to
#SBATCH --cpus-per-task=4           # CPU cores per task
#SBATCH --mem=16GB                  # memory per node
#SBATCH --mail-type=END,FAIL        # send email on job end or failure

module load python/3.11.7
python3 analysis.py
```

## Common `#SBATCH` options

### Resources

| Option | Short | Description | Example |
| ------ | :---: | ----------- | ------- |
| `--cpus-per-task=<n>` | `-c` | Number of [CPU][url_cpu] cores per task. Set to `1` unless your code is explicitly multi-threaded or uses [OpenMP][url_openmp]. | `#SBATCH --cpus-per-task=8` |
| `--mem=<size>` | | Total memory per [node][url_node]. Accepts `K`, `M`, `G`, `T` suffixes. | `#SBATCH --mem=16GB` |
| `--mem-per-cpu=<size>` | | Memory per allocated [CPU][url_cpu] core. Alternative to `--mem`; do not use both. | `#SBATCH --mem-per-cpu=4GB` |
| `--ntasks=<n>` | `-n` | Number of parallel tasks ([MPI][url_mpi] ranks). Defaults to `1`. | `#SBATCH --ntasks=4` |
| `--nodes=<n>` | `-N` | Number of [nodes][url_node] to allocate. | `#SBATCH --nodes=2` |
| `--gpus=<n>` | `-G` | Number of [GPUs][url_gpu] to allocate. Requires submitting to the `gpu` [partition][url_partition]. | `#SBATCH --gpus=1` |
| `--time=<time>` | `-t` | Wall-clock time limit. Accepted formats: `MM:SS`, `HH:MM:SS`, `D-HH:MM:SS`. The job is killed when the limit is reached. | `#SBATCH --time=2:00:00` |
| `--partition=<name>` | `-p` | [Partition][url_partition] to submit to (e.g. `normal`, `gpu`, `bigmem`, `owners`). | `#SBATCH --partition=gpu` |


### Output

| Option | Short | Description | Example |
| ------ | :---: | ----------- | ------- |
| `--job-name=<name>` | `-J` | Name shown in `squeue`, `sacct`, and email notifications. | `#SBATCH --job-name=my_run` |
| `--output=<file>` | `-o` | File for standard output. `%j` expands to the job ID, `%x` to the job name. Defaults to `slurm-%j.out`. | `#SBATCH --output=%x.%j.out` |
| `--error=<file>` | `-e` | File for standard error. If omitted, `stderr` is merged into the `--output` file. | `#SBATCH --error=%x.%j.err` |
| `--open-mode=append` | | Append to output files instead of overwriting them. Useful for [recurring jobs][url_recurring]. | `#SBATCH --open-mode=append` |


### Notifications

| Option | Short | Description | Example |
| ------ | :---: | ----------- | ------- |
| `--mail-user=<addr>` | | Email address for notifications. Defaults to your SUNet address. | `#SBATCH --mail-user=you@stanford.edu` |
| `--mail-type=<events>` | | Comma-separated list of events that trigger an email. Common values: `BEGIN`, `END`, `FAIL`, `ALL`. | `#SBATCH --mail-type=END,FAIL` |


### Job control

| Option | Short | Description | Example |
| ------ | :---: | ----------- | ------- |
| `--dependency=<type:jobid>` | `-d` | Delay the [job][url_job] until a condition on another job is met. Common types: `afterok` (start after successful completion), `afterany` (start regardless of exit status), `singleton` (only one job with this name runs at a time). See the [Slurm dependency documentation][url_dep_docs] for the full list. | `#SBATCH --dependency=afterok:12345` |
| `--array=<range>` | `-a` | Submit a [job array][url_array_docs]. Each element runs the same script with a unique `$SLURM_ARRAY_TASK_ID`. Ranges can include step sizes and a maximum number of simultaneously running tasks. | `#SBATCH --array=1-100%10` |
| `--begin=<time>` | `-b` | Defer job start until a given time. Accepts absolute timestamps or relative offsets like `now+1hour`, `now+7days`. | `#SBATCH --begin=now+2hour` |
| `--signal=<sig>@<n>` | | Send signal `<sig>` to the [job][url_job] `<n>` seconds before reaching the time limit. Useful to trigger graceful shutdown or resubmission in [persistent jobs][url_persistent]. | `#SBATCH --signal=B:SIGUSR1@90` |


### Node selection

| Option | Short | Description | Example |
| ------ | :---: | ----------- | ------- |
| `--constraint=<feature>` | `-C` | Require [nodes][url_node] with a specific feature (e.g. GPU model, CPU generation). See the [Node features][url_node_features] page for available values. | `#SBATCH --constraint=GPU_SKU:A100_SXM4` |


[comment]: #  (link URLs -----------------------------------------------------)

[url_sbatch]:           //slurm.schedmd.com/sbatch.html
[url_salloc]:           //slurm.schedmd.com/salloc.html
[url_srun]:             //slurm.schedmd.com/srun.html
[url_array_docs]:       //slurm.schedmd.com/job_array.html
[url_dep_docs]:         //slurm.schedmd.com/sbatch.html#OPT_dependency
[url_node_features]:    node-features.md
[url_persistent]:       service-jobs.md#persistent-jobs
[url_recurring]:        service-jobs.md#recurring-jobs

[url_cpu]:              ../glossary.md#cpu
[url_gpu]:              ../glossary.md#gpu
[url_node]:             ../glossary.md#node
[url_mpi]:              ../glossary.md#mpi
[url_openmp]:           ../glossary.md#openmp
[url_partition]:        ../glossary.md#partition
[url_job]:              ../glossary.md#job


--8<--- "includes/_acronyms.md"
