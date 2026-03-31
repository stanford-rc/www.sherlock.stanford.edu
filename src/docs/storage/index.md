---
icon: material/database
tags:
    - storage
---

# Storage <small>on Sherlock</small>

Sherlock provides access to several filesystems, each with distinct storage
characteristics. Each user and PI group get access to a set of predefined
directories in these filesystems to store their data.

!!! danger "Sherlock is a compute cluster, not a storage system"

    Sherlock's storage resources are limited and are shared among many users.
    They are meant to store data and code associated with projects for which
    you are using Sherlock's computational resources. This space is for work
    actively being computed on with Sherlock, and should not be used as a
    target for backups from other systems.

    If you're looking for a long-term storage solution for research data,
    Stanford Research Computing offers the [Oak storage system][url_oak], which
    is specifically intended for this usage.

Those filesystems are shared with other users, and are subject to quota limits
and for some of them, purge policies (time-residency limits).


## Filesystem overview

### Features and purpose

| Name                     | Type                 | Backups / Snapshots | Performance | Purpose | Cost |
| ------------------------ |--------------------- |------------------ | ----------- | ------- | ---- |
|`$HOME`, `$GROUP_HOME`    | [NFS][url_NFS]       | :fontawesome-solid-check:{: .chk_yes :} / :fontawesome-solid-check:{: .chk_yes :} | low | small, important files (source code, executable files, configuration files...) | free |
|`$SCRATCH`, `$GROUP_SCRATCH` | [Lustre][url_lustre] | :fontawesome-solid-xmark:{: .chk_no :} / :fontawesome-solid-xmark:{: .chk_no :} | high bandwidth | large, temporary files (checkpoints, raw application output...) | free |
|`$L_SCRATCH`              | local SSD    | :fontawesome-solid-xmark:{: .chk_no :} / :fontawesome-solid-xmark:{: .chk_no :} | low latency, high IOPS | job specific output requiring high IOPS | free |
|`$OAK`                    | [Lustre][url_lustre] | option / :fontawesome-solid-xmark:{: .chk_no :} | moderate | long term storage of research data | volume-based[^oak_sd] |


### Access scope

| Name           |  Scope        | Access sharing level |
| -------------- |  ------------ | ----------- |
|`$HOME`         |  cluster      | user        |
|`$GROUP_HOME`   |  cluster      | group       |
|`$SCRATCH`      |  cluster      | user        |
|`$GROUP_SCRATCH`|  cluster      | group       |
|`$L_SCRATCH`    |  compute node | user        |
|`$OAK`          |  cluster (optional, purchase required) | group |

Group storage locations are typically shared between all the members of the
same PI group. User locations are only accessible by the user.


### Quotas and limits

!!! info "Volume and inodes"

    Quotas are applied on both volume (the amount of data stored in bytes) and
    inodes: an inode (index node) is a data structure in a Unix-style file
    system that describes a filesystem object such as a file or a directory.
    In practice, each filesystem entry (file, directory, link) counts as an
    inode.

| Name           | Quota type | Volume quota | Inode quota | Retention |
| -------------- | ---------- | ------------ | ----------- | --------- |
|`$HOME`         | directory  |        15 GB | n/a         | :octicons-infinity-16:  |
|`$GROUP_HOME`   | directory  |         1 TB | n/a         | :octicons-infinity-16:  |
|`$SCRATCH`      | directory  |       100 TB | 20 million  | [time limited][url_purge] |
|`$GROUP_SCRATCH`| directory  |       100 TB | 20 million  | [time limited][url_purge] |
|`$L_SCRATCH`    | n/a        |          n/a | n/a         | job lifetime  |
|`$OAK`          | directory  | amount purchased | function of the volume purchased | :octicons-infinity-16: |


Quota types:

* **directory**: based on files location and account for all the files
  that are in a given directory.
* **user**: based on files ownership and account for all the files that
  belong to a given user.
* **group**: based on files ownership and account for all the files that
  belong to a given group.

Retention types:

* **:octicons-infinity-16:**: files are kept as long as the user account exists
  on Sherlock.
* **time limited**: files are kept for a fixed length of time after they've
  been last modified. Once the limit is reached, files expire and are
  automatically deleted.
* **job lifetime**: files are only kept for the duration of the job and are
  automatically purged when the job ends.

!!! info "Global fail-safe user and quota groups on `/scratch`"

    To prevent potential issues which would result in the filesystem filling up
    completely and making it unusable for everyone, additional user and
    group-level quotas are in place on the `/scratch` filesystem, as a
    fail-safe:

    * a user will not be able to use more than 250 TB (50M inodes) in total, in
      all the `/scratch` directories they have access to.

    * a group will not be able to use more than 1 PB (200M inodes) in total
      across all the `/scratch` directories its group members have access to.



#### Checking quotas

To check your quota usage on the different filesystems you have access to, you
can use the `sh_quota` command:

``` none
$ sh_quota
+---------------------------------------------------------------------------+
| Disk usage for user kilian (group: ruthm)                                 |
+---------------------------------------------------------------------------+
|   Filesystem |  volume /   limit                  | inodes /  limit       |
+---------------------------------------------------------------------------+
          HOME |   9.4GB /  15.0GB [||||||     62%] |      - /      - (  -%)
    GROUP_HOME | 562.6GB /   1.0TB [|||||      56%] |      - /      - (  -%)
       SCRATCH |  65.0GB / 100.0TB [            0%] | 143.8K /  20.0M (  0%)
 GROUP_SCRATCH | 172.2GB / 100.0TB [            0%] |  53.4K /  20.0M (  0%)
           OAK |  30.8TB / 240.0TB [|          12%] |   6.6M /  36.0M ( 18%)
+---------------------------------------------------------------------------+
```

Several options are provided to allow listing quotas for a specific filesystem
only, or in the context of a different group (for users who are members of
several PI groups). Please see the `sh_quota` usage information for details:

``` none
$ sh_quota -h
sh_quota: display user and group quota information for all accessible filesystems.

Usage: sh_quota [OPTIONS]
    Optional arguments:
        -f FILESYSTEM   only display quota information for FILESYSTEM.
                        For instance: "-f $HOME"
        -g GROUP        for users with multiple group memberships, display
                        group quotas in the context of that group
        -n              don't display headers
        -j              JSON output (implies -n)
```

##### Examples

For instance, to only display your quota usage on `$HOME`:

``` none
$ sh_quota -f HOME
```

If you belong to multiple groups, you can display the group quotas for your
secondary groups with:

``` none
$ sh_quota -g <group_name>
```

And finally, for great output control, an option to display quota usage in JSON
is provided via the `-j` option:

``` none
$ sh_quota -f SCRATCH -j
{
  "SCRATCH": {
    "quotas": {
      "type": "user",
      "blocks": {
        "usage": "47476660",
        "limit": "21474836480"
      },
      "inodes": {
        "usage": "97794",
        "limit": "20000000"
      }
    }
  }
}
```


#### Locating large directories

It's not always easy to identify files and directories that take the most space
when getting close to the quota limits. Some tools can help with that.

* [`du`][url_du] can be used to display the volume used by files and
  directories, in a given folder:

    ``` none
    $ cd mydir/
    $ du --human-readable --summarize  *
    101M    dir
    2.0M    file
    ```

    !!! note

        `du` will ignore hidden entries (everything that starts with a dot (`.`)).
        So when using it in your `$HOME` directory, it will skip things like
        `.cache` or `.conda`, which can contain significant volumes.


* [`ncdu`][url_ncdu] is an interactive disk usage analyzer, that generates
  visual representation of the volume (and inode count) for directories. To run
  it, you need to load the `ncdu` module, and then run it on your directory of
  choice:

    ``` none
    $ ml system ncdu
    $ ncdu $HOME
    ```

    For very large directories, running `ncdu` in an interactive shell on a
    compute node is recommended, via [`sh_dev`][url_sh_dev]. You can request
    multiple codes, and run multiple `ncdu` threads to speed up processing of
    large directories:

    ``` none
    $ sh_dev -c 4
    $ ml system ncdu
    $ ncdu -t 4
    ```

    You'll been then presented with an interactive file browser, showing
    information about the volume used by your directories, which should make easy
    to pinpoint where most space is used.

    !!! note "Apparent size vs. disk usage"

        By default, `du` and `ncdu` report **disk usage**, which is the actual
        space allocated on disk. On some filesystems, there could be some
        difference with the real size of your files, because of block
        allocation overhead. Data reported by `sh_quota` is based on real block
        usage on the filesystem.

        To see the actual logical size of your files (i.e. what you would
        transfer or back up), you can use the `--apparent-size` flag:

        ```
        $ du --apparent-size $HOME/dir
        $ ncdu --apparent-size $HOME/dir
        ```

        Within `ncdu`, you can also toggle between apparent size and disk usage
        by pressing ++"a"++ while browsing.


!!! info

    Note that any tool you use to view directory contents will only be able to
    show files that your user account has read access to. So on group-shared
    spaces, if you see a major difference between the totals from a tool like
    `ncdu` and the information reported by `sh_quota`, that can be an indicator
    that one of your group members has restricted permissions on a large number
    of items in your space.


## Where should I store my files?

!!! warning "Not all filesystems are equivalent"

    Choosing the appropriate storage location for your files is an essential
    step towards making your utilization of the cluster the most efficient
    possible. It will make your own experience much smoother, yield better
    performance for your jobs and simulations, and contribute to make Sherlock
    a useful and well-functioning resource for everyone.

Here is where we recommend storing different types of files and data on
Sherlock:

| Use case | Recommended filesystem |
|---|---|
| Personal scripts, configuration files, source code | `$HOME` |
| Group-shared code, shared software installations | `$GROUP_HOME` |
| Active job input/output, large temporary files, checkpoints | `$SCRATCH` / `$GROUP_SCRATCH` |
| High-IOPS job I/O, node-local temporary files | `$L_SCRATCH` |
| Long-term storage, large reference datasets, curated results | `$OAK` |


### Choosing the right filesystem for job I/O

`$HOME` and `$GROUP_HOME` are the right place for source code, scripts, and
configuration files (not for performance, but because they offer snapshots,
off-site replication, and long-term retention). They are NFS-based and not
designed for large-file or parallel I/O: running many concurrent jobs against
them degrades performance for all users on the cluster.

`$SCRATCH` and `$GROUP_SCRATCH` are the right location for most active job
I/O: a dedicated flash-backed Lustre filesystem connected via high-bandwidth
InfiniBand, suited for large sequential and parallel I/O across many processes.

`$L_SCRATCH` is local SSD on each compute node, offering the lowest latency
and highest IOPS on the cluster. It is well suited for workloads with many
small random reads and writes (ML training, frequent checkpointing). The
trade-off is that it is node-local (not usable across nodes) and deleted at
job end, so results must be copied out before the job completes.

`$OAK` is optimized for large-capacity long-term storage and is used by a
large number of Stanford researchers across many systems, well beyond Sherlock.
It is not designed for bursty or parallel job I/O. If your workflow requires
data on `$OAK`, stage it to `$SCRATCH` at the start of the job and copy
results back at the end:

``` shell { title="job.sbatch" .copy .select }
#!/bin/bash
#SBATCH --job-name=my_analysis
#SBATCH --partition=normal
#SBATCH --time=2:00:00

# stage input data from Oak to scratch at the start of the job
cp -r $OAK/data/my_dataset $SCRATCH/

# run the analysis using data on scratch
python my_analysis.py --input $SCRATCH/my_dataset --output $SCRATCH/results

# copy results back to Oak at the end
cp -r $SCRATCH/results $OAK/results/my_run
```


### Shell startup files and external filesystems { #startup-files }

When you connect to Sherlock over SSH, and when Slurm starts a job on a
compute node, your `~/.bashrc` is executed. If it references paths on
filesystems that are slow to respond or temporarily unavailable, two problems
can result:

* **Slow or hanging login**: a slow or unresponsive filesystem referenced in
  `~/.bashrc` will cause your SSH session to hang at login.

* **Job holds**: when starting a job, the scheduler will initiate a shell on the
  compute node to establish your environment. If it takes too long to start
  because it is waiting on a slow or unresponsive filesystem, Slurm will give
  up and hold the job with:

    ``` none
    (user env retrieval failed requeued held)
    ```

    The job will not start until the hold is manually cleared with `scontrol
    release <jobid>`. A held job looks like this in `squeue`:

    ``` none
    $ squeue --me
       JOBID  PARTITION  NAME      USER    ST  TIME  NODES  NODELIST(REASON)
       123456    normal  my_job  kilian    PD  0:00      1  (user env retrieval failed requeued held)
    ```

    When a large job array is released or many jobs start at once, all the
    shells are spawned simultaneously, each trying to access the same
    filesystem. Even a transient slowdown can cause enough latency to trigger
    the failure, resulting in dozens or hundreds of jobs being held at once.


### What to avoid in `~/.bashrc` { #bashrc-antipatterns }

* **Adding external references to `$PATH`**: adding software installed on an
  external filesystem to `$PATH` in `~/.bashrc` means every shell start will
  access that filesystem, including all concurrent job starts.
* **Sourcing scripts** located on external filesystems.
* **Activating Conda environments** automatically at shell startup.

!!! warning "Check your `~/.bashrc` for a Conda initialization block"

    The Conda installer prompts you to run `conda init`, which appends an
    initialization block to `~/.bashrc`. By default, this activates the base
    environment on every shell start. If the Conda installation lives on a
    slow filesystem, every login and every job startup will be affected.

    Check the bottom of your `~/.bashrc` for a `conda initialize` block and
    verify where the referenced installation is located. To disable automatic
    base activation:

    ``` shell
    $ conda config --set auto_activate_base false
    ```

Keep `~/.bashrc` lightweight. Software installations and virtual environments
should be installed on `$HOME` or `$GROUP_HOME`. Sourcing scripts and
activating environments should be done in job scripts, where they are really
needed. Loading them on-demand will avoid affecting every login and impacting
every job startup time.

!!! tip "Testing your startup file speed"

    You can check how long your shell initialization takes by timing a new
    bash session from a login node:

    ``` shell
    $ time bash -i -c true
    ```

    If it takes more than a few seconds, your startup files are likely
    referencing external resources.


## Accessing filesystems

### On Sherlock

!!! tip "Filesystem environment variables"

    To facilitate access and data management, user and group storage location
    on Sherlock are identified by a set of environment variables, such as
    `$HOME` or `$SCRATCH`.

We strongly recommend using those variables in your scripts rather than
explicit paths, to facilitate transition to new systems for instance. By using
those environment variables, you'll be sure that your scripts will continue to
work even if the underlying filesystem paths change.


To see the contents of these variables, you can use the `echo` command. For
instance, to see the absolute path of your $SCRATCH directory:

``` none
$ echo $SCRATCH
/scratch/users/kilian
```

Or for instance, to move to your group-shared home directory:

``` none
$ cd $GROUP_HOME
```


### From other systems

!!! warning "External filesystems cannot be mounted on Sherlock"

    For a variety of security, manageability and technical considerations, we
    can't mount external filesystems nor data storage systems on Sherlock. The
    recommended approach is to make Sherlock's data available on external
    systems.

You can mount any of your Sherlock directories on any external system you have
access to by using SSHFS. For more details, please refer to the [Data
Transfer][url_data_sshfs] page.


[comment]: #  (link URLs -----------------------------------------------------)

[url_NFS]:              //en.wikipedia.org/wiki/Network_File_System
[url_lustre]:           //en.wikipedia.org/wiki/Lustre_(file_system)
[url_oak]:              //uit.stanford.edu/service/oak-storage
[url_ncdu]:             //dev.yorhel.nl/ncdu
[url_du]:               //www.gnu.org/software/coreutils/manual/html_node/du-invocation.html#du-invocation

[url_data_sshfs]:       data-transfer.md#sshfs
[url_purge]:            filesystems.md#expiration-policy
[url_sh_dev]:           ../user-guide/running-jobs.md#interactive-jobs

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_sd]: For more information about Oak, its characteristics and cost model,
           please see the [Oak Service Description page][url_oak].


--8<--- "includes/_acronyms.md"
