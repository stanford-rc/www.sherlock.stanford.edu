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
| **Snapshots**     | yes *(cf. [Snapshots](#snapshots) for more info)* |
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

## `$PI_HOME`

!!! summary

    `$PI_HOME` is your group home directory. It's the best place to keep your
    group's shared code, software installations and important data as it
    provides snapshots and off-site replication. It is not meant to host data
    that will be actively read and written to by compute jobs.

`$HOME` and `$PI_HOME` are based on the same physical file system.

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | Isilon high speed NFS file system |
| **Quota**         | 1 TB for the whole `$PI_HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots](#snapshots) for more info)* |
| **Backups**       | off-site replication |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes |


### Recommended usage

`$PI_HOME` is best suited for group shared source code, common software
installations, shared data sets and scripts.

We strongly recommend using `$PI_HOME` to reference your group home directory in
scripts, rather than its explicit path.

### Check quota usage

The `df -h $PI_HOME` command could be used to check your group quota usage in
`$PI_HOME`:

```
$ df -h $PI_HOME
Filesystem           Size  Used Avail Use% Mounted on
srcf.isilon:/ifs/PI  1.0T  646G  379G  64% /home/groups
```

-----

## `$SCRATCH`

!!! summary

    `$SCRATCH` is your personal scratch space. It's the best place to store
    temporary files, such as raw job output, intermediate files, unprocessed
    results, and so on.

!!! danger "`$SCRATCH` is not a backup target"

    `$SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc.

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
job files, unprocessed simlulation results, and so on.  This is the recommended
location to run jobs from, and to store files that will be read or written to
during job execution.

Old files are automatically purged on `$SCRATCH` so users should avoid storing
long-term data there.

Each compute node has a 56Gb/s low latency Infiniband link to `$SCRATCH`. The
aggregate bandwidth of the filesystem is about 50GB/s. So any job with high
data performance requirements will take advantage from using `$SCRATCH` for
I/O.

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
                 749.4G     18T     20T       - 2028766  18000000 20000000       -
```

**NB**: user quotas are based on file ownership, meaning that all files
belonging to a given user will count towards her user quota, no matter
where they're located on the file system. That means that if you have files
in `$PI_SCRATCH`, those will also count toward your user quota.

The different values displayed in `lfs quota` are as follows:

* **used**: actual usage in volume (bytes) or number of files,
* **quota**, or *"soft quota"*: this limit can be exceeded for the duration
  of the grace period (7 days). When the grace period expired, the soft
  quota is considered a hard limit and can't be exceeded anymore.
* **limit**, or *"hard quota"*: this value represents the maximum amount of
  resources (volume or number of files) that a user is allowed to use. That
  limit can never be exceeded.

### Expiration policy

!!! Warning

    Files not modified in over 6 months will be automatically deleted

To manage available space and maintain optimal performance for all jobs, all
files[^scratch_owner_exception]  on `$SCRATCH` are subject to automatic
purges. Based on their last modification date, as displayed by `ls
-l`, files whose contents have not been modified in the previous 6 months will
be automatically deleted.

For instance, if you create a file on February 1st and don't ever modify it
afterwards, it will be automatically deleted on August 1st.

Please note that reading a file does not qualify as a modification.

-----

## `$PI_SCRATCH`

`$SCRATCH` and `$PI_SCRATCH` are based on the same physical file system.

!!! summary

    `$PI_SCRATCH` is your group shared scratch space. It's the best place to
    store temporary files, such as raw job output, intermediate files, or
    unprocessed results that need to be shared among users within a group.

!!! danger "`$PI_SCRATCH` is **NOT** a backup target"

    `$PI_SCRATCH` is not meant to store permanent data, and should only be used
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

`$PI_SCRATCH` is best suited for large files, such as raw job output,
intermediate job files, unprocessed simlulation results, and so on.  This is
the recommended location to run jobs from, and to store files that will be read
or written to during job execution.

Old files are automatically purged on `$PI_SCRATCH` so users should avoid
storing long-term data there.

We strongly recommend using `$PI_SCRATCH` to reference your group scratch
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

As `$SCRATCH` and `$PI_SCRATCH` are on the same fielsystem, the same expiration
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

For instance, if you have jobs `98423` and `98672` running on ths same
nodes, the variables will be set as follows:

| Job id  | `$L_SCRATCH` | `L_SCRATCH_JOB` |
| ------: | ------------ | --------------- |
| `98423` | `/lscratch/kilian` | `/lscratch/kilian/98423` |
| `98672` | `/lscratch/kilian` | `/lscratch/kilian/98672` |

We strongly recommend using `$L_SCRATCH` to reference your local scratch
directory in scripts, rather than its full path.

### Expiration policy

All files stored in `$L_SCRATCH` are automatically purged ath the end of the
job, whether the job was successful or not. If you need to conserve files that
were generated in `$L_SCRATCH` after the job ends, don't forget to add a
command to copy them to one of the more peristent storage locations, such as
`$HOME` or `$SCRATCH`.

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

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_snap]: Snapshots on `$OAK` require additional storage space. Please see
           [the Oak Snapshots Feature page][url_oak_snap] for details.

