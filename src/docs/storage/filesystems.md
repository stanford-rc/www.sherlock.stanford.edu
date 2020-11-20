<!-- markdownlint-disable MD024 -->
The following sections describe the characteristics and best uses of each of
the Sherlock's filesystems.

## `$HOME`

!!! summary

    `$HOME` is your home directory. It's the best place to keep your code
    and important data as it provides snapshots and off-site replication. It is
    not meant to host data that will be actively read and written to by compute
    jobs.

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | high speed, distributed NFS file system |
| **Quota**         | 15 GB for the whole `$HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots][url_snapshots]) for more info)* |
| **Backups**       | off-site replication |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes |

### Recommended usage

`$HOME` is best suited for personal configuration files, scripts, small
reference files or datasets, source code and individual software installation

When you log in, the system automatically sets the current working directory to
`$HOME`: it's the location you'll end up when connecting to Sherlock. You can
store your source code and build your executables there.

We strongly recommend using `$HOME` to reference your home directory in
scripts, rather than its explicit path.

### Checking quota usage

The `sh_quota` tool can be used to display quota usage on `$HOME`

```shell
$ sh_quota -f HOME
```

See the [Checking Quotas][url_check_quotas] section for more details.

-----

## `$GROUP_HOME`

!!! summary

    `$GROUP_HOME` is your group home directory. It's the best place to keep your
    group's shared code, software installations and important data as it
    provides snapshots and off-site replication. It is not meant to host data
    that will be actively read and written to by compute jobs.

`$HOME` and `$GROUP_HOME` are based on the same physical file system.

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | high speed, distributed NFS file system |
| **Quota**         | 1 TB for the whole `$GROUP_HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots][url_snapshots]) for more info)* |
| **Backups**       | off-site replication |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes |


### Recommended usage

`$GROUP_HOME` is best suited for group shared source code, common software
installations, shared data sets and scripts.

We strongly recommend using `$GROUP_HOME` to reference your group home
directory in scripts, rather than its explicit path.

### Checking quota usage

The `sh_quota` tool can be used to display quota usage on `$GROUP_HOME`

```shell
$ sh_quota -f GROUP_HOME
```

See the [Checking Quotas][url_check_quotas] section for more details.


-----

## `$SCRATCH`

!!! summary

    `$SCRATCH` is your personal scratch space. It's the best place to store
    temporary files, such as raw job output, intermediate files, unprocessed
    results, and so on.

!!! danger "Purge policy"

    **Files are automatically purged from `$SCRATCH`** after an inactivity
    period:

    - files that are not modified after 90 days are automatically deleted,
    - contents need to change for a file to be considered modified. The `touch`
      command does not modify file contents and thus does not extend a file's
      lifetime on the filesystem.

    `$SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc. See the [Expiration
    Policy](#expiration-policy) section for details.

| Characteristics   |   |
| ----------------- | --- |
| **Type**          | Parallel, high-performance Lustre file system |
| **Quota**         | 100 TB / 50,000,000 inodes[^inodes] |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not modified in the last 90 days are automatically purged |
| **Scope**         | all login and compute nodes |


### Recommended usage

`$SCRATCH` is best suited for large files, such as raw job output, intermediate
job files, unprocessed simulation results, and so on.  This is the recommended
location to run jobs from, and to store files that will be read or written to
during job execution.

Old files are automatically purged on `$SCRATCH` so users should avoid storing
long-term data there.

Each compute node has a low latency, high-bandwidth Infiniband link to
`$SCRATCH`. The aggregate bandwidth of the filesystem is about 75GB/s. So any
job with high data performance requirements will take advantage from using
`$SCRATCH` for I/O.

We strongly recommend using `$SCRATCH` to reference your scratch directory in
scripts, rather than its explicit path.

### Checking quota usage

The `sh_quota` tool can be used to display quota usage on `$SCRATCH`

```shell
$ sh_quota -f SCRATCH
```

See the [Checking Quotas][url_check_quotas] section for more details.


### Expiration policy

!!! Danger "Inactive files are automatically purged"

    Files that are **not modified in the last 90 days** will be automatically
    deleted from the filesystem.

To manage available space and maintain optimal performance for all jobs, all
files on `$SCRATCH` are subject to automatic purges. Meaning that after a
period of inactivity, files that are not used anymore will be automatically
deleted from the filesystem.

File activity is defined based on the last time a file's contents (the actual
data in the file) have been modified. Meaning that **files whose contents have
not been modified in the previous 90 days will be automatically deleted.**

Each time a file's contents are modified, the expiration countdown is reset,
and the file gets another 90-day of lifetime.

!!! important "Metadata changes don't qualify as an update"

    Modifying a file's contents is the only way to reset the expiration
    countdown and extend the file's lifetime on the filesystem.

    Metadata modifications such as: reading the file, renaming it, moving it to
    a different directory, changing its permissions or its ownership,
    "touching" it to update its last modification or access times, won't have
    any effect on the purge countdown.

Purges are based on an internal filesystem property that reflects the last date
a file's data has been modified, and which is unfortunately not readily
accessible by users.

Please note that tools like `ls` will only display the date of the last
metadata[^metadata] modification for a file, which is not necessarily relevant
to determine a file's eligibility for deletion. For instance, using the `touch`
command on a file to update its last modification date will only update the
metadata, not the data, and as such, will not reset the purge countdown timer.

Filesystem purges are a continuous process: they don't run at particular times,
but are carried out in a permanent background fashion. Files are not
necessarily deleted right away when they become eligible for deletion.  For
instance, if you create a file on February 1st and don't ever modify it
afterwards, it will be automatically become eligible for deletion on May
1st, and can be deleted anytime after this date.

Empty directories that would remain after all their files have been purged are
are not automatically deleted, because user workflows may rely on and require
specific directory trees to be present. And there's no good way to distinguish
between a directory created empty intentionally, and a directory emptied by
automatic purges.


-----

## `$GROUP_SCRATCH`

`$SCRATCH` and `$GROUP_SCRATCH` are based on the same physical file system.

!!! summary

    `$GROUP_SCRATCH` is your group shared scratch space. It's the best place to
    store temporary files, such as raw job output, intermediate files, or
    unprocessed results that need to be shared among users within a group.

!!! danger "`$GROUP_SCRATCH` is **NOT** a backup target"

    `$GROUP_SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc.

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | parallel, high-performance Lustre file system |
| **Quota**         | 100 TB / 50,000,000 inodes[^inodes] |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not accessed in the last 90 days are automatically purged |
| **Scope**         | all login and compute nodes |


### Recommended usage

`$GROUP_SCRATCH` is best suited for large files, such as raw job output,
intermediate job files, unprocessed simulation results, and so on.  This is
the recommended location to run jobs from, and to store files that will be read
or written to during job execution.

Old files are automatically purged on `$GROUP_SCRATCH` so users should avoid
storing long-term data there.

We strongly recommend using `$GROUP_SCRATCH` to reference your group scratch
directory in scripts, rather than its explicit path.

### Checking quota usage

The `sh_quota` tool can be used to display quota usage on `$GROUP_SCRATCH`

```shell
$ sh_quota -f GROUP_SCRATCH
```

See the [Checking Quotas][url_check_quotas] section for more details.


### Expiration policy

As `$SCRATCH` and `$GROUP_SCRATCH` are on the same filesystem, the same expiration
policy applies to both. Please see the [`$SCRATCH`](#scratch) section above for
more details.

-----

## `$L_SCRATCH`

!!! summary

    `$L_SCRATCH` is **local** to each compute node, and could be used to store
    temporary files for jobs with high IOPS requirements. Files stored in
    `$L_SCRATCH` are purged at the end of the job.

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | local filesystem, specific to each node, based on SSD |
| **Quota**         | n/a (usable space limited by the size of the physical storage devices, typically around 150 GB) |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data immediately purged at the end of the job |
| **Scope**         | locally on each node, not shared across nodes |

### Recommended usage

`$L_SCRATCH` is best suited for small temporary files and applications which
require low latency and high IOPS levels, typically intermediate job files,
checkpoints, dumps of temporary states, etc.

Files stored in `$L_SCRATCH` are local to each node and can't be accessed from
other nodes, nor from login nodes.

Please note that an additional, job-specific environment variable,
`$L_SCRATCH_JOB`, will be set to a subdirectory of `$L_SCRATCH` for each job.
So, if you have two jobs running on the same compute node, `$L_SCRATCH` will be
the same and accessible from both jobs, while `$L_SCRATCH_JOB` will be
different for each job.

For instance, if you have jobs `98423` and `98672` running on this same
nodes, the variables will be set as follows:

| Job id  | `$L_SCRATCH` | `L_SCRATCH_JOB` |
| ------: | ------------ | --------------- |
| `98423` | `/lscratch/kilian` | `/lscratch/kilian/98423` |
| `98672` | `/lscratch/kilian` | `/lscratch/kilian/98672` |

We strongly recommend using `$L_SCRATCH` to reference your local scratch
directory in scripts, rather than its full path.

### Expiration policy

All files stored in `$L_SCRATCH_JOB` are automatically purged at the end of the
job, whether the job was successful or not. If you need to conserve files that
were generated in `$L_SCRATCH_JOB` after the job ends, don't forget to add a
command at the end of your batch script to copy them to one of the more
persistent storage locations, such as `$HOME` or `$SCRATCH`.

Data stored in `$L_SCRATCH` will be purged at the end of a job, only if no
other job from the same user is still running on the node. Which means that
data stored in `$L_SCRATCH` (but in not `$L_SCRATCH_JOB`) will persist on the
node until the last job from the user terminates.

-----

## `$OAK`

!!! summary

    `$OAK` is SRCC's research data storage offering. It provides an affordable,
    longer-term storage option for labs and researchers, and is ideally suited
    to host large datasets, or curated, post-processed results from job
    campaigns, as well as final results used for publication.

!!! important "Order `$OAK`"

    **Oak storage can be easily ordered online using the [Oak Storage Service
    page][url_oak].**

    _`$OAK` is opt-in and is available as an option on Sherlock. Meaning that
    only members of groups which have purchased storage on Oak can access this
    filesystem._

    For
    complete details and characteristics, including pricing, please refer to
    the [Oak Storage Service page][url_oak].


| Characteristics   |   |
| ----------------- | --- |
| **Type**          | parallel, capacitive Lustre filesystem |
| **Quota**         | amount purchased *(in 10 TB increments)* |
| **Snapshots**     | **NO** |
| **Backups**       | optional cloud backup available <br/>_please [contact us][url_contact] for details_ |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes <br/>_also available through gateways outside of Sherlock_ |


### Recommended usage

`$OAK` is ideally suited for large shared datasets, archival data and curated,
post-processed results   from job campaigns, as well as final results used for
publication.

Although jobs can directly read and write to `$OAK` during execution, it is
recommended to first stage files from `$OAK` to `$SCRATCH` at the beginning of
a series of jobs, and save the desired results back from `$SCRATCH` to `$OAK`
at the end of the job campaign.

We strongly recommend using `$OAK` to reference your group home directory in
scripts, rather than its explicit path.

!!! warning "`$OAK` is not backed up"

    `$OAK` is not backed up or replicated, by design, and deleted files cannot
    be recovered. We recommend all researchers to keep an additional copy of their
    important files (for instance, in [Google Drive][url_gdrive]).

!!! tip "Cloud backup option"

    For additional data security, SRCC now offers "cloud backup" of Oak data as
    a managed service option. For an additional monthly fee, data on Oak can be
    backed up to the cloud (researchers are responsible for cloud storage
    costs). Please [contact us][url_contact] if you'd like additional
    information.


### Checking quota usage

The `sh_quota` tool can be used to display quota usage on `$OAK`

```shell
$ sh_quota -f OAK
```

See the [Checking Quotas][url_check_quotas] section for more details.



[comment]: #  (link URLs -----------------------------------------------------)

[url_contact]:          mailto:{{ support_email }}
[url_oak]:              <https://uit.stanford.edu/service/oak-storage>
[url_check_quotas]:     /docs/storage/#checking-quotas
[url_snapshots]:        /docs/storage/data-protection/#snapshots
[url_gdrive]:           /docs/storage/data-transfer/#google-drive

[comment]: #  (footnotes -----------------------------------------------------)

[^metadata]: Metadata are data such as a file's size, name, path, owner,
  permissions, etc.

[^inodes]: An inode (index node) is a data structure in a Unix-style file
  system that describes a file-system object such as a file or a directory.


--8<--- "includes/_acronyms.md"
