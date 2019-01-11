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
| **Type**          | Isilon high speed NFS file system |
| **Quota**         | 15 GB for the whole `$HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots](data-protection#snapshots) for more info)* |
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

### Check quota usage

The `df -h $HOME` command could be used to check your quota usage in `$HOME`:

```
$ df -h $HOME
Filesystem             Size  Used Avail Use% Mounted on
srcf.isilon:/ifs/home   15G  3.5G   12G  24% /home/users
```

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
| **Type**          | Isilon high speed NFS file system |
| **Quota**         | 1 TB for the whole `$GROUP_HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots](data-protection#snapshots) for more info)* |
| **Backups**       | off-site replication |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes |


### Recommended usage

`$GROUP_HOME` is best suited for group shared source code, common software
installations, shared data sets and scripts.

We strongly recommend using `$GROUP_HOME` to reference your group home directory in
scripts, rather than its explicit path.

### Check quota usage

The `df -h $GROUP_HOME` command could be used to check your group quota usage in
`$GROUP_HOME`:

```
$ df -h $GROUP_HOME
Filesystem           Size  Used Avail Use% Mounted on
srcf.isilon:/ifs/PI  1.0T  646G  379G  64% /home/groups
```

-----

## `$SCRATCH`

!!! summary

    `$SCRATCH` is your personal scratch space. It's the best place to store
    temporary files, such as raw job output, intermediate files, unprocessed
    results, and so on.

!!! danger "Purge policy"

    **Files are automatically purged from `$SCRATCH`** after an inactivity
    period.

    `$SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc. See the [Expiration
    Policy](#expiration_policy) section for details.

| Characteristics   |   |
| ----------------- | --- |
| **Type**          | Parallel, high-performance Lustre file system |
| **Quota**         | 20 TB per user (based on file ownership) |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not modified in the last 6 months are automatically purged |
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

### Check quota usage

The `lfs quota -u $USER -h $SCRATCH` command could be used to check your quota
usage in `$SCRATCH`:

```
$ lfs quota -u $USER -h $SCRATCH
Disk quotas for user kilian (uid 215845):
     Filesystem    used   quota   limit   grace   files   quota   limit   grace
/scratch/users/kilian
                 749.4G     20T     20T       - 2028766  20000000 20000000       -
```

**NB**: user quotas are based on file ownership, meaning that all files
belonging to a given user will count towards her user quota, no matter
where they're located on the file system. That means that if you have files
in `$GROUP_SCRATCH`, those will also count toward your user quota.

The different values displayed in `lfs quota` are as follows:

* **used**: actual usage in volume (bytes) or number of files,
* **quota**, or *"soft quota"*: this limit can be exceeded for the duration
  of the grace period (7 days). When the grace period expired, the soft
  quota is considered a hard limit and can't be exceeded anymore.
* **limit**, or *"hard quota"*: this value represents the maximum amount of
  resources (volume or number of files) that a user is allowed to use. That
  limit can never be exceeded.

Note that to make things easier, soft and hard quotas are set to the same
value on Sherlock. This practically disables the soft quota behavior, which has
proven confusing.

### Expiration policy

!!! Danger "Inactive files are automatically purged"

    Files that are **not modified in the last 6 months** will be automatically
    deleted from the filesystem.

To manage available space and maintain optimal performance for all jobs, all
files on `$SCRATCH` are subject to automatic purges. Meaning that after a
period of inactivity, files that are not used anymore will be automatically
deleted from the filesystem.

File activity is defined based on the last time a file's contents (the actual
data in the file) have been modified. Meaning that **files whose contents have
not been modified in the previous 6 months will be automatically deleted.**

Each time a file's contents are modified, the expiration countdown is reset,
and the file gets another 6-month of lifetime.

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
afterwards, it will be automatically become eligible for deletion on August
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
| **Type**          | Parallel, high-performance Lustre file system |
| **Quota**         | 30 TB per group (based on file ownership) |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not accessed in the last 6 months are automatically purged |
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

### Check quota usage

The `lfs quota -g $(id -gn $USER) -h $SCRATCH` command could be used to check
your group  quota usage in `$SCRATCH`:

```
$ lfs quota -g $(id -gn $USER) -h $SCRATCH
Disk quotas for group ruthm (gid 32264):
     Filesystem    used   quota   limit   grace   files   quota   limit   grace
/scratch/PI/ruthm
                 13.87T     28T     30T       - 4171746  28000000 30000000       -
```

**NB**: group quotas are based on file ownership, meaning that all files
belonging to a given group will count towards the group quota, no matter where
they're located on the file system. That means that all the files that belong
to each of the group members will count toward the group quota.

See the [`$SCRATCH`](#scratch) section for more details about the meaning of
the different fields in `lfs quota`.

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
| **Type**          | Local filesystem, specific to each node, based on SSD |
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

    `$OAK` is the latest *cheap'n'deep* storage offering of the SRCC. It
    provides a long-term, affordable storage option for research data, and is
    ideally suited to host large datasets, or curated, post-processed results
    from job campaigns, as well as final results used for publication.

`$OAK` is available as an option on Sherlock. For complete details and
characteristics, including pricing, please refer to the [Oak Storage Service
page][url_oak].


| Characteristics   |   |
| ----------------- | --- |
| **Type**          | Parallel, capacitive Lustre filesystem |
| **Quota**         | amount purchased *(in 10 TB increments)* |
| **Snapshots**     | optional[^oak_snap] |
| **Backups**       | **NO** |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes <br/>*(also available through gateways outside of Sherlock)* |


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

### Check quota usage

The `lfs quota -g $(id -gn $USER) -h $OAK` command could be used to check
your group  quota usage in `$OAK`:

```
$ lfs quota -h -g ruthm $OAK
Disk quotas for group ruthm (gid 32264):
     Filesystem    used   quota   limit   grace   files   quota   limit   grace
/oak/stanford/groups/ruthm
                  9.16T  18.63T  18.63T       -  384864  1500000 1500000       -
```

See the [`$SCRATCH`](#scratch) section for more details about the meaning
of the different fields in `lfs quota`.


[comment]: #  (link URLs -----------------------------------------------------)

[url_oak]:              https://oak-storage.stanford.edu
[url_oak_snap]:         https://srcc.stanford.edu/oak-rsnapshot

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_snap]: Snapshots on `$OAK` require additional storage space. Please see
  the [Oak Snapshots Feature][url_oak_snap] page for details.
[^metadata]: Metadata are data such as a file's size, name, path, owner,
  permissions, etc.

