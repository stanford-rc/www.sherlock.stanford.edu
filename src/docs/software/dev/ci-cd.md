---
icon: material/source-branch-sync
tags:
    - software
---

# CI/CD on Sherlock

## Overview

CI/CD workflows can run on Sherlock by submitting your CI runner as a Slurm
batch job. Since Sherlock does not support persistent processes on login nodes
outside of the scheduler, CI/CD runners must run in batch jobs. It works well
for nightly builds, integration tests, and automated checks that do not require
sub-minute response times.

The runner contacts your CI server, picks up pending jobs, executes them, and
exits. Scheduling is handled by [`scrontab`][url_scrontab] rather than a
long-running daemon.


## GitLab CI

`gitlab-runner` is available on Sherlock in the `system` category. See the
[software list][url_sw_list] for available versions.

### Registering the runner

Register your runner once. The configuration is saved to
`~/.gitlab-runner/config.toml` and persists across jobs:

``` none { .copy .select }
$ ml system gitlab-runner
$ gitlab-runner register
```

You will be prompted for:

- the GitLab instance URL (e.g. `https://gitlab.com` or your institution's
  GitLab)
- a registration token from your project's **Settings > CI/CD > Runners**
- a runner name and executor (`shell` is the simplest choice for running
  directly on Sherlock compute nodes)

### Running as a batch job

`gitlab-runner run` starts a service that picks up pending pipeline jobs and
keeps running until the Slurm time limit is reached:

``` bash { title="gitlab-runner.sh" .copy .select }
#!/bin/bash
#SBATCH --job-name      gitlab-runner
#SBATCH --output        gitlab-runner-%j.out
#SBATCH --partition     normal
#SBATCH --cpus-per-task 4
#SBATCH --time          01:00:00

ml system gitlab-runner
gitlab-runner run
```

Set the time limit long enough to cover your typical pipeline duration. If
your pipeline runs GPU tests, add `--gpus 1` and switch to the `gpu`
partition.

### Automating with `scrontab`

To submit the runner automatically on a schedule, use
[`scrontab`][url_scrontab_doc]:

``` none
$ scrontab -e
```

``` none { .copy .select }
#SCRON -p normal
#SCRON -J gitlab-runner
#SCRON -t 01:00:00
#SCRON -o gitlab-runner-%j.out
#SCRON --open-mode=append
@midnight ml system gitlab-runner && gitlab-runner run
```

This submits a new runner job at midnight each day. See
[Recurring jobs][url_scrontab_doc] for more scheduling options.


## GitHub Actions

GitHub Actions self-hosted runners are not available as a Sherlock module.
The runner binary is tied to a specific repository or organization and must
be downloaded directly from GitHub. The setup is done once.

### Setting up the GitHub Actions runner

Create a directory for the runner, then download and extract the binary from
the [GitHub Actions runner releases page][url_gh_runner_releases]. Choose the
`linux-x64` build:

``` shell { .copy .select }
$ mkdir ~/actions-runner && cd ~/actions-runner
$ tar xzf /path/to/actions-runner-linux-x64-*.tar.gz
```

Register the runner using the token from your repository's **Settings >
Actions > Runners > New self-hosted runner**:

``` shell { .copy .select }
$ ./config.sh --url https://github.com/<owner>/<repo> \
              --token <registration-token> \
              --name sherlock-runner \
              --labels sherlock,linux,x64 \
              --unattended
```

The registration is saved in the runner directory and persists across jobs.
You only need a new token if you explicitly remove and re-register the runner.

### Running the GitHub Actions runner as a batch job

`./run.sh` starts a service that picks up pending workflow jobs and keeps
running until the Slurm time limit is reached:

``` bash { title="github-runner.sh" .copy .select }
#!/bin/bash
#SBATCH --job-name      github-runner
#SBATCH --output        github-runner-%j.out
#SBATCH --partition     normal
#SBATCH --cpus-per-task 4
#SBATCH --time          01:00:00

cd ~/actions-runner
./run.sh
```

Set the time limit long enough to cover your typical workflow duration. The
runner will process all queued jobs during that window.

### Automating the GitHub Actions runner with `scrontab`

``` none
$ scrontab -e
```

``` none { .copy .select }
#SCRON -p normal
#SCRON -J github-runner
#SCRON -t 01:00:00
#SCRON -o github-runner-%j.out
#SCRON --open-mode=append
@midnight cd ~/actions-runner && ./run.sh
```


## Targeting Sherlock in your pipeline

In your `.gitlab-ci.yml` or GitHub Actions workflow, use tags (GitLab) or
labels (GitHub) to route jobs to the Sherlock runner:

=== "GitLab CI"

    ``` yaml { .copy .select }
    test-on-sherlock:
      tags:
        - sherlock
      script:
        - module load python/3.12
        - pytest tests/
    ```

=== "GitHub Actions"

    ``` yaml { .copy .select }
    jobs:
      test:
        runs-on: [self-hosted, sherlock]
        steps:
          - uses: actions/checkout@v4
          - run: |
              module load python/3.12
              pytest tests/
    ```


[comment]: # (link URLs --------------------------------------------------------)

[url_scrontab]:           //slurm.schedmd.com/scrontab.html
[url_scrontab_doc]:       ../../advanced-topics/service-jobs.md#slurm-crontab
[url_gh_runner_releases]: //github.com/actions/runner/releases
[url_sw_list]:            ../list.md#gitlab-runner


--8<--- "includes/_acronyms.md"
