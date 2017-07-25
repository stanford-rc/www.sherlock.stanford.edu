<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

Sherlock provides access to several different file systems, each with distinct
storage characteristics. Each user and PI group get access to a set of pre-defined
directories in these file systems to store their data.

Those file systems are shared with other users, and are subject to quota limits
and for some of them, purge policies (time-residency limit).

!!! danger "Sherlock is a compute cluster, not a storage system"

    Sherlock's storage resources are limited and are shared among many users.
    They are meant to store data and code associated with projects for which
    you are using Sherlock's computational resources. This space is for work
    actively being computed on with Sherlock, and should not be used as a
    target for backups from other systems.

## File systems overview

!!! tip "Filesystem environment variables"

    To facilitate access and data management, user and group storage location
    on Sherlock are identified by a set of environment variables, such as
    `$HOME` or `$SCRATCH`.

    We strongly recommend using those variables in your scripts rather than
    explicit paths, to facilitate transition to new systems for instance. By
    using those environment variables, you'll be sure that your scripts will
    continue to work even if the underlying filesystem paths change.


To see the contents of these variables, you can use the `echo` command. For
instance, to see the absolute path of your $SCRATCH directory:
```
$ echo $SCRATCH
/scratch/users/kilian
```

### List

| Name           |  Scope | Access type | Cost |
| -------------- |  ------------ | ------ | ------ | ---- |
|`$HOME`         |  cluster  | user   | Free |
|`$PI_HOME`      |  cluster  | group  | Free |
|`$SCRATCH`      |  cluster  | user   | Free |
|`$PI_SCRATCH`   |  cluster  | group  | Free |
|`$L_SCRATCH`    |  compute node | user | Free |
|`$OAK`          |  cluster (optional, purchase required) | group | Yes[^oak_sd] |

Group storage locations are typically shared between all the members of the
same PI group. User locations are only accessible by the user.

### Quotas and limits

| Name           | Quota type | Quota value | Retention |
| -------------- | ---------: | ----------: | --------- |
|`$HOME`         | user       |       15 GB | $\infty$  |
|`$PI_HOME`      | group      |        1 TB | $\infty$  |
|`$SCRATCH`      | user       |       20 TB | time limited   |
|`$PI_SCRATCH`   | group      |       30 TB | time limited   |
|`$L_SCRATCH`| n/a        |         n/a | job       |
|`$OAK`          | group      | amount purchased | $\infty$ |

Quota types:

* **user**: based on files ownership and account for all the files that
  belong to a given user.
* **group**: based on files ownership and account for all the files that
  belong to a given group.
* **directory**: based on files location and account for all the files
  that are in a given directory.

Retention types:

* **$\infty$**: files are kept as long as the user account exists on Sherlock.
* **time limited**: files are kept for a fixed length of time after they've
  been last modified.
* **job**: files are only kept for the duration of the job and are
  automatically purged when the job ends.


### Features and purpose

<!-- color styles for yes/no checks -->
<style>
.yes {
    color: darkgreen;
}
.no {
    color: darkred;
}
</style>


| Name                     | Type                 | Backups/Snapshots | Performance | Purpose |
| ------------------------ |--------------------- |------------------ | ----------- | ------- |
|`$HOME`, `$PI_HOME       `| [NFS][url_NFS]       | <b class="yes">:fa-check:</b> / <b class="yes">:fa-check:</b> | Low | Small, important files (source code, executables, configuration files...) |
|`$SCRATCH`, `$PI_SCRATCH` | [Lustre][url_lustre] | <b class="no">:fa-times:</b> / <b class="no">:fa-times:</b> | High bandwidth | Large, temporary files (checkpoints, raw application output...) |
|`$L_SCRATCH`          | Local SSD    | <b class="no">:fa-times:</b> / <b class="no">:fa-times:</b> | Low latency, high IOPS | Job specific output requiring high IOPS |
|`$OAK`                    | [Lustre][url_lustre] | <b class="no">:fa-times:</b> / option | Moderate | Long term storage of research data |



## Filesystem details

### `$HOME`

!!! summary

    `$HOME` is your home directory. It's the best place to keep your code
    and important data as it provides snapshots and off-site replication. It is
    not meant to host data that will be actively read and written to by compute
    jobs.

| Characteristics |   |
| ------------- | --- |
| Type          | Isilon high speed NFS file system |
| Quota         | 15 GB for the whole `$HOME` directory |
| Snapshots     | yes *(cf. [Snapshots](#snapshots) for more info)* |
| Backups       | off-site replication |
| Purge policy  | not purged |
| Scope  | all login and compute nodes |

**Recommended usage**

: `$HOME` is best suited for personal configuration files, scripts, small
    reference files or datasets, source code and individual software
    installation

    When you log in, the system automatically sets the current working
    directory to `$HOME`: it's the location you'll end up when connecting to
    Sherlock. You can store your source code and build your executables there.

    We recommend using `$HOME` to reference your home directory in scripts,
    rather than its explicit path.

**Check quota usage**

: The `df -h $HOME` command could be used to check your quota usage in `$HOME`:

    ```
    $ df -h $HOME
    Filesystem             Size  Used Avail Use% Mounted on
    srcf.isilon:/ifs/home   15G  3.5G   12G  24% /home/users
    ```


### `$PI_HOME`

!!! summary

    `$PI_HOME` is your group home directory. It's the best place to keep your
    group's shared code, software installations and important data as it
    provides snapshots and off-site replication. It is not meant to host data
    that will be actively read and written to by compute jobs.

`$HOME` and `$PI_HOME` are based on the same physical file system.

| Characteristics |   |
| ------------- | --- |
| Type          | Isilon high speed NFS file system |
| Quota         | 1 TB for the whole `$PI_HOME` directory |
| Snapshots     | yes *(cf. [Snapshots](#snapshots) for more info)* |
| Backups       | off-site replication |
| Purge policy  | not purged |
| Scope  | all login and compute nodes |

**Recommended usage**

: `$PI_HOME` is best suited for group shared source code, common software
    installations, shared data sets and scripts.

    We recommend using `$PI_HOME` to reference your group home directory in
    scripts, rather than its explicit path.

**Check quota usage**

: The `df -h $PI_HOME` command could be used to check your group quota usage in
`$PI_HOME`:

    ```
    $ df -h $PI_HOME
    Filesystem           Size  Used Avail Use% Mounted on
    srcf.isilon:/ifs/PI  1.0T  646G  379G  64% /home/groups
    ```

### `$SCRATCH`

!!! summary

    `$SCRATCH` is your personal scratch space. It's the best place to store
    temporary files, such as raw job output, intermediate files, unprocessed
    results, and so on.

!!! danger "`$SCRATCH` is not a backup target"

    `$SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc.

| Characteristics |   |
| ------------- | --- |
| Type          | Parallel, high-performance Lustre file system |
| Quota         | 20 TB per user (based on file ownership) |
| Snapshots     | **NO** |
| Backups       | **NO** |
| Purge policy  | data not accessed in the last 6 months are automatically purged |
| Scope  | all login and compute nodes |


**Recommended usage**

: `$SCRATCH` is best suited for large files, such as raw job output,
    intermediate job files, unprocessed simlulation results, and so on.  This
    is the recommended location to run jobs from, and to store files that will
    be read or written to during job execution.

    Old files are automatically purged on `$SCRATCH` so users should avoid
    storing long-term data there.

    Each compute node has a 56Gb/s low latency Infiniband link to
    `$SCRATCH`. The aggregate bandwidth of the filesystem is about
    50GB/s. So any job with high data performance requirements will take
    advantage from using `$SCRATCH` for I/O.

    We recommend using `$SCRATCH` to reference your group home directory in
    scripts, rather than its explicit path.

**Check quota usage**

: The `lfs quota -u $USER -h $SCRATCH` command could be used to check your
    quota usage in `$SCRATCH`:

    ```
    $ $ lfs quota -u $USER -h $SCRATCH
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


### `$PI_SCRATCH`

`$SCRATCH` and `$PI_SCRATCH` are based on the same physical file system.

!!! summary

    `$PI_SCRATCH` is your group shared scratch space. It's the best place to
    store temporary files, such as raw job output, intermediate files, or
    unprocessed results that need to be shared among users within a group.

!!! danger "`$PI_SCRATCH` is not a backup target"

    `$PI_SCRATCH` is not meant to store permanent data, and should only be used
    for data associated with currently running jobs. It's not a target for
    backups, archived data, etc.

| Characteristics |   |
| ------------- | --- |
| Type          | Parallel, high-performance Lustre file system |
| Quota         | 30 TB per group (based on file ownership) |
| Snapshots     | **NO** |
| Backups       | **NO** |
| Purge policy  | data not accessed in the last 6 months are automatically purged |
| Scope  | all login and compute nodes |


**Recommended usage**

: `$PI_SCRATCH` is best suited for large files, such as raw job output,
    intermediate job files, unprocessed simlulation results, and so on.  This
    is the recommended location to run jobs from, and to store files that will
    be read or written to during job execution.

    Old files are automatically purged on `$PI_SCRATCH` so users should avoid
    storing long-term data there.

    We recommend using `$PI_SCRATCH` to reference your group home directory in
    scripts, rather than its explicit path.

**Check quota usage**

: The `lfs quota -g $(id -gn $USER) -h $SCRATCH` command could be used to check
your group  quota usage in `$SCRATCH`:

    ```
    $ lfs quota -g $(id -gn $USER) -h $SCRATCH
    Disk quotas for group ruthm (gid 32264):
         Filesystem    used   quota   limit   grace   files   quota   limit   grace
    /scratch/PI/ruthm
                     13.87T     28T     30T       - 4171746  28000000 30000000       -
    ```

    **NB**: group quotas are based on file ownership, meaning that all files
    belonging to a given group will count towards the group quota, no matter
    where they're located on the file system. That means that all the files
    that belong to each of the group members will count toward the group quota.

    See the [`$SCRATCH`](#scratch) section for more details about the meaning
    of the different fields in `lfs quota`.


### `$L_SCRATCH`

!!! summary

    `$L_SCRATCH` is **local** to each compute node, and could be used to store
    temporary files for jobs with high IOPS requirements. Files stored in
    `$L_SCRATCH` are purged at the end of the job.

| Characteristics |   |
| ------------- | --- |
| Type          | Local filesystem, specific to each node, based on SSD |
| Quota         | n/a (usable space limited by the size of the physical storage devices, typically around 150 GB) |
| Snapshots     | **NO** |
| Backups       | **NO** |
| Purge policy  | data immediately purged at the end of the job |
| Scope  | locally on each node, not shared across nodes |

**Recommended usage**

: `$L_SCRATCH` is best suited for small temporary files and applications
    which require low latency and high IOPS levels, typically intermediate job
    files, checkpoints, dumps of temporary states, etc.

    Files stored in `$L_SCRATCH` are local to each node and can't be accessed
    from other nodes nor login nodes.

    All files stored in `$L_SCRATCH` are automatically purged ath the end of
    the job, whether the job was successful or not. If you need to conserve
    files that were generated in `$L_SCRATCH` after the job ends, don't forget
    to add a command to copy them to one of the more peristent storage
    locations, such as `$HOME` or `$SCRATCH`.

    We recommend using `$L_SCRATCH` to reference your group home directory in
    scripts, rather than its explicit path.


### `$OAK`

!!! summary

    `$OAK` is the latest *cheap'n'deep* storage offering of the SRCC. It
    provides a long-term, affordable storage option for research data, and is
    ideally suited to host large datasets, or curated, post-processed results
    from job campaigns, as well as final results used for publication.

`$OAK` is available as an option on Sherlock. For complete details and
characteristics, including pricing, please refer to the [Oak Storage Service
page][url_oak].


| Characteristics |   |
| ------------- | --- |
| Type          | Parallel, capacitive Lustre filesystem |
| Quota         | amount purchased *(in 10 TB increments)* |
| Snapshots     | optional[^oak_snap] |
| Backups       | **NO** |
| Purge policy  | not purged |
| Scope  | all login and compute nodes <br/>*(also available through gateways outside of Sherlock)* |


**Recommended usage**

: `$OAK` is ideally suited for large shared datasets, archival data and
    curated, post-processed results   from job campaigns, as well as final
    results used for publication.

    Although jobs can directly read and write to `$OAK` during execution, it is
    recommended to first stage files from `$OAK` to `$SCRATCH` at the beginning
    of a series of jobs, and save the desired results back from `$SCRATCH` to
    `$OAK` at the end of the job campaign.

    We recommend using `$OAK` to reference your group home directory in
    scripts, rather than its explicit path.

**Check quota usage**

: The `lfs quota -g $(id -gn $USER) -h $OAK` command could be used to check
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



## Snapshots

!!! important

    Snapshots are only available on `$HOME` and `$PI_HOME`.

File system snapshots represent the state of the file system at a particular
point in time. They allow accessing the file system contents as it was a
different times in the past, and get back data that may have been deleted or
modified since the snapshot was taken.

### Accessing snapshots

Snapshots taken in `$HOME` and `$PI_HOME` are accessible in a `.snapshot`
directory at any level of the hierarchy. Those `.snapshot` directories don't
appear when listing directory contents with `ls`, but they can be listed
explicitly or accessed with `cd`:

```
$ cd $HOME
$ ls -ald .snapshot/home*
[...]
drwx------ 118 sunetid group  6680 Jul 21 11:16 .snapshot/home.daily.20170721
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.daily.20170722
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.daily.20170723
drwx------ 118 sunetid group  6702 Jul 24 10:57 .snapshot/home.daily.20170724
drwx------ 118 sunetid group  6702 Jul 24 10:57 .snapshot/home.daily.latest
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.hourly.20170722-16:00
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.hourly.20170722-17:00
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.hourly.20170722-18:00
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.hourly.20170722-19:00
drwx------ 118 sunetid group  6702 Jul 21 16:19 .snapshot/home.hourly.20170722-20:00
[...]
$ cd .snapshot/home.daily.latest
```

For instance:

* the `$HOME/.snapshot/home.daily.latest` directory is the latest daily
  snapshot available, and store the contents of the $HOME directory as they
  were when the last daily snapshot was taken,
* the `$HOME/foo/.snapshot/home.hourly.20170722-18:00` can be used to retrieve
  the contents of the `$HOME/foo` directory as it was at 6pm on July 22th, 2017.


### Restoring from a snapshot

If you deleted a file or modified it and want to restore an earlier version,
you can simply copy the file from its saved version in the appropriate
snapshot.

Examples:

* to restore the last known version of `$HOME/foo/bar`:

    ```
    $ cp $HOME/foo/.snapshot/home.hourly.latest/bar $HOME/foo/bar
    ```
    or
    ```
    $ cp $HOME/.snapshot/foo/home.hourly.latest/bar $HOME/foo/bar

    ```
    (both commands are equivalent)


* to restore your `~/.bashrc` file from 2 days ago:

    ```
    $ SNAP_DATE=$(date +%Y%m%d -d "2 days ago")
    $ cp $HOME/.snapshot/home.daily.${SNAP_DATE}/.bashrc $HOME/.bashrc
    ```

### Snapshot policy

The current[^snap_policy] policy is to take snapshots on an hourly, daily and
weekly basis.  Older snapshots automatically expire after their retention
period. The snapshot policy applies to both `$HOME` and `$PI_HOME` storage
spaces.


| Snapshot frequency | Retention period | Number of snapshots |
| -----------------: | ---------------: | ------------------: |
| hourly             | 2 days           | 48                  |
| daily              | 1 week           | 7                   |
| weekly             | 1 month          | 4                   |


The shortest interval between snapshots is an hour. That means that if you
create a file and then delete it within the hour, it won't appear in snapshots,
and you won't be able to restore it.

If a file exists for more than an hour, and is then deleted, it will be present
in the hourly snapshots for the next 48 hours, and you'll be able to retrieve
it during that period. Similarly, if a file exists for more than a day, it
could be restored for up to 7 days.

Snapshots don't count towards your quota.

Snapshots, as well as the entire filesystem, are replicated to an off-site
system, to ensure that data could be retrieved even in case of a catastrophic
failure of the whole system or datacenter-level disaster.



## Sharing data with other groups

:construction:

ACLs can be used to allow users from other groups to access your files on
Sherlock. More details to come.

:construction:




[comment]: #  (link URLs -----------------------------------------------------)

[url_NFS]:      https://en.wikipedia.org/wiki/Network_File_System
[url_lustre]:   https://en.wikipedia.org/wiki/Lustre_(file_system)
[url_oak]:      https://oak-storage.stanford.edu

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_sd]: For more information about Oak, it's characteristics and cost model,
  please see the [Oak Service Description page][url_oak].
[^snap_policy]: The snapshot policy is subject to change and may be adjusted as
  the storage system usage conditions evolve.
[^oak_snap]: Snapshots on `$OAK` are based on clone and incremental snapshots
  and require additional storage space.

