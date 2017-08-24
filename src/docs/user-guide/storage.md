<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

Sherlock provides access to several file systems, each with distinct storage
characteristics. Each user and PI group get access to a set of pre-defined
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
| -------------- |  ------------ | ------ | ------ |
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
| -------------- | ---------- | ----------: | --------- |
|`$HOME`         | user       |       15 GB | $\infty$  |
|`$PI_HOME`      | group      |        1 TB | $\infty$  |
|`$SCRATCH`      | user       |       20 TB | time limited   |
|`$PI_SCRATCH`   | group      |       30 TB | time limited   |
|`$L_SCRATCH`    | n/a        |         n/a | job       |
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
  been last modified. Once the limit is reached, files expire and are
  automatically deleted.
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



## Where should I store my files?


!!! important "Not all filesystems are equivalent"

    Choosing the appropriate storage location for your files is an essential
    step towards making your utilization of the cluster the most efficient
    possible. It will make your own experience much smoother, yield better
    performance for your jobs and simulations, and contribute to make Sherlock
    a useful and well-functioning resource for everyone.

Here is where we recommend storing different types of files and data on
Sherlock:

* personal scripts, configuration files and software installations --> `$HOME`
* group-shared scripts, software installations and medium-sized datasets -->
  `$PI_HOME`
* temporary output of jobs, large checkpoint files --> `$SCRATCH`
* curated output of job campaigns, large group-shared datasets, archives --> `$OAK`

## Filesystem details

### `$HOME`

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

#### Recommended usage

`$HOME` is best suited for personal configuration files, scripts, small
reference files or datasets, source code and individual software installation

When you log in, the system automatically sets the current working directory to
`$HOME`: it's the location you'll end up when connecting to Sherlock. You can
store your source code and build your executables there.

We strongly recommend using `$HOME` to reference your home directory in
scripts, rather than its explicit path.

#### Check quota usage

The `df -h $HOME` command could be used to check your quota usage in `$HOME`:

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

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | Isilon high speed NFS file system |
| **Quota**         | 1 TB for the whole `$PI_HOME` directory |
| **Snapshots**     | yes *(cf. [Snapshots](#snapshots) for more info)* |
| **Backups**       | off-site replication |
| **Purge policy**  | not purged |
| **Scope**         | all login and compute nodes |


#### Recommended usage

`$PI_HOME` is best suited for group shared source code, common software
installations, shared data sets and scripts.

We strongly recommend using `$PI_HOME` to reference your group home directory in
scripts, rather than its explicit path.

#### Check quota usage

The `df -h $PI_HOME` command could be used to check your group quota usage in
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

| Characteristics   |   |
| ----------------- | --- |
| **Type**          | Parallel, high-performance Lustre file system |
| **Quota**         | 20 TB per user (based on file ownership) |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not modified in the last 6 months are automatically purged |
| **Scope**         | all login and compute nodes |


#### Recommended usage

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

#### Check quota usage

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

#### Expiration policy

!!! Warning

    Files not modified in over 6 months will be automatically deleted

To manage available space and maintain optimal performance for all jobs, all
files[^scratch_owner_exception]  on `$SCRATCH` are subject to automatic
expiration. Based their last modification date of files, as displayed by `ls
-l`, files whose contents have not been modified in the previous 6 months will
be automatically deleted.

For instance, if you create a file on February 1st and don't ever modify it
afterwrads, it will be automatically deleted on August 1st.

Please note that reading a file does not qualify as a modification.

If you copy an file from another filesystem (such as `$OAK` or `$HOME`), the
last modification date of the file on `$SCRATCH` will be the date it's been
copied over. File modification dates are local to each filesystem and are not
carried along when copying files across fielsystems.



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

| Characteristics   |     |
| ----------------- | --- |
| **Type**          | Parallel, high-performance Lustre file system |
| **Quota**         | 30 TB per group (based on file ownership) |
| **Snapshots**     | **NO** |
| **Backups**       | **NO** |
| **Purge policy**  | data not accessed in the last 6 months are automatically purged |
| **Scope**         | all login and compute nodes |


#### Recommended usage

`$PI_SCRATCH` is best suited for large files, such as raw job output,
intermediate job files, unprocessed simlulation results, and so on.  This is
the recommended location to run jobs from, and to store files that will be read
or written to during job execution.

Old files are automatically purged on `$PI_SCRATCH` so users should avoid
storing long-term data there.

We strongly recommend using `$PI_SCRATCH` to reference your group scratch
directory in scripts, rather than its explicit path.

#### Check quota usage

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


### `$L_SCRATCH`

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

#### Recommended usage

`$L_SCRATCH` is best suited for small temporary files and applications which
require low latency and high IOPS levels, typically intermediate job files,
checkpoints, dumps of temporary states, etc.

Files stored in `$L_SCRATCH` are local to each node and can't be accessed from
other nodes, nor from login nodes.

All files stored in `$L_SCRATCH` are automatically purged ath the end of the
job, whether the job was successful or not. If you need to conserve files that
were generated in `$L_SCRATCH` after the job ends, don't forget to add a
command to copy them to one of the more peristent storage locations, such as
`$HOME` or `$SCRATCH`.

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


### `$OAK`

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


#### Recommended usage

`$OAK` is ideally suited for large shared datasets, archival data and curated,
post-processed results   from job campaigns, as well as final results used for
publication.

Although jobs can directly read and write to `$OAK` during execution, it is
recommended to first stage files from `$OAK` to `$SCRATCH` at the beginning of
a series of jobs, and save the desired results back from `$SCRATCH` to `$OAK`
at the end of the job campaign.

We strongly recommend using `$OAK` to reference your group home directory in
scripts, rather than its explicit path.

#### Check quota usage

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
  the contents of the `$HOME/foo` directory as it was at 6pm on July 22th,
  2017.


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

### Traditional Unix permissions

Standard [Unix file permissions][url_unix_perms] are supported on Sherlock and
provide **read**, **write** and **execute** permissions for the three distinct
access classes.

The access classes are defined as follows:

* Files and directories are owned by a user. The owner determines the file's
  *user class*. Distinct permissions apply to the owner.
* Files and directories are assigned a group, which define the file's *group
  class*. Distinct permissions apply to members of the file's group. The owner
  may be a member of the file's group.
* Users who are not the owner, nor a member of the group, comprise a file's
  *others class*. Distinct permissions apply to others.

The following permissions apply to each class:

* The `read` permission grants the ability to read a file. When set for a
  directory, this permission grants the ability to read the names of files in
  the directory, but not to find out any further information about them such as
  contents, file type, size, ownership, permissions.
* The `write` permission grants the ability to modify a file. When set for a
  directory, this permission grants the ability to modify entries in the
  directory. This includes creating files, deleting files, and renaming files.
* The `execute` permission grants the ability to execute a file. This
  permission must be set for executable programs, including shell scripts, in
  order to allow the operating system to run them. When set for a directory,
  this permission grants the ability to access file contents and
  meta-information if its name is known, but not list files inside the
  directory, unless read is set also.

!!! note "Shared directories traversal"

    If you need to give access to one of your files to another user, they will
    at least need *execute* permission on each directory within the path to
    that file.

The effective permissions are determined based on the first class the user
falls within in the order of *user*, *group* then *others*. For example, the
user who is the owner of the file will have the permissions given to the user
class regardless of the permissions assigned to the group class or others
class.

While traditional Unix permissions are sufficient in most cases to share files
with all the users within the same group, they are not enough to share files
with a specific subset of users, or with users from other groups. Access
Control Lists (ACLs) can be used for that purpose.

There are two type of ACLs supported on Sherlock depending on the underlying
filesystem:

| Type       |  Filesystems |
| ---------- |  ------------ |
| NFSv4 ACLs |  `$HOME` and `$PI_HOME` |
| POSIX ACLs |  `$SCRATCH`, `$PI_SCRATCH`, `$L_SCRATCH` and `$OAK` |


### POSIX ACLs

POSIX ACLs allows you to grant or deny access to files and directories for
different users (or groups), independently of the file owner or group.

Two types of POSIX ACLs can be defined:

* **Access ACLs**: grant permission for a specific file or directory.
* **Default ACLs**: allow to set a default set of ACLs that will be applied to
  any file or directory without any already defined ACL. Can only be set on
  directories.

ACLs are set with the `setfacl` command, and displayed with `getfacl`. For more
details and examples, please refer to [this documentation][url_rhel_posix_acl].

In the example below, we allow two users to access a restricted directory
located at `$PI_SCRATCH/restricted-dir/`:

```
$ cd $PI_SCRATCH

### Create new directory
$ mkdir restricted-dir

### Remove 'group' and 'other' access
$ chmod g-rwx,o-rwx restricted-dir

### Give user bob read and traversal permissions to the directory
$ setfacl -m u:bob:rX restricted-dir

### Use default ACLs (-d) to give user bob read access to all new
### files and sub-directories that will be created in "restricted-dir"
$ setfacl -d -m u:bob:rX restricted-dir

### Give user alice read, write and traversal permissions for the directory
$ setfacl -m u:alice:rwX restricted-dir

### Use default ACLs (-d) to give user alice read and write access to all
### new files and sub-directories
$ setfacl -d -m u:alice:rwX restricted-dir

### Show ACLs
$ getfacl restricted-dir
# file: restricted-dir/
# owner: joe
# group: grp
# flags: -s-
user::rwx
user:bob:r-x
group::---
mask::r-x
other::---
default:user::rwx
default:user:alice:rwx
default:user:bob:r-x
default:group::---
default:mask::rwx
default:other::---
```

!!! warning "Default permissions on `$PI_SCRATCH` don't allow sharing outside of your group"

    By default, the Unix permissions on the root directory `$PI_SCRATCH` don't
    allow read nor traversal access for *others* (*ie.* any user no part of
    your PI group). If you need to share files with users outside of your own
    group, please [contact us][url_contact] so we can set the appropriate
    permissions on your folder.

For `$SCRATCH`, you're the owner of the directory and so you can change the
permissions yourself.


### NFSv4 ACLs

`$HOME` and `$PI_HOME` also allow setting ACLs, albeit with different
syntax and semantics than POSIX ACLs. The principle is very similar,
though.

An ACL in NFSv4 is a list of rules setting permissions on files or directories.
A permission rule, or Access Control Entry (ACE), is of the form
`type:flags:principle:permissions`.

For complete documentation and examples on using NFSv4 ACLs, please see the
manual page at [nfs4_acl(5)][url_nfs4_acl_man].



## Accessing Sherlock files from other systems

!!! warning "External filesystems cannot be mounted on Sherlock"

    For a variety of security, manageability and technical considerations, we
    can't mount external filesystems nor data storage systems on Sherlock. The
    recommended approach is to make Sherlock's data available on external
    systems.

You can mount any of your Sherlock directories on any external system you have
access to by using SSHFS. For more details, please refer to the [Data
Transfer][url_data_sshfs] page.


[comment]: #  (link URLs -----------------------------------------------------)

[url_NFS]:              https://en.wikipedia.org/wiki/Network_File_System
[url_lustre]:           https://en.wikipedia.org/wiki/Lustre_(file_system)
[url_oak]:              https://oak-storage.stanford.edu
[url_oak_snap]:         https://srcc.stanford.edu/oak-rsnapshot
[url_rhel_posix_acl]:   https://access.redhat.com/documentation/en-US/Red_Hat_Storage/2.0/html/Administration_Guide/ch09s05.html
[url_unix_perms]:       https://en.wikipedia.org/wiki/File_system_permissions
[url_contact]:          srcc-support@stanford.edu
[url_nfs4_acl_man]:     http://linux.die.net/man/5/nfs4_acl
[url_data_sshfs]:       /docs/user-guide/data-transfer#sshfs
[url_node_ownership]:   /docs/overview/concepts/#the-condominium-model


[comment]: #  (footnotes -----------------------------------------------------)

[^oak_sd]: For more information about Oak, it's characteristics and cost model,
           please see the [Oak Service Description page][url_oak].

[^snap_policy]: The snapshot policy is subject to change and may be adjusted as
           the storage system usage conditions evolve.

[^oak_snap]: Snapshots on `$OAK` require additional storage space. Please see
           [the Oak Snapshots Feature page][url_oak_snap] for details.

[^scratch_owner_exception]: Groups which explicitely purchased storage space on
           `/scratch` are exempt from the policy. Please note that `/scratch`
           ownership is different and not related to
           [node ownership][url_node_ownership].
