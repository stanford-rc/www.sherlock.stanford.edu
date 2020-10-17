<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

Sherlock provides access to several file systems, each with distinct storage
characteristics. Each user and PI group get access to a set of pre-defined
directories in these file systems to store their data.

!!! danger "Sherlock is a compute cluster, not a storage system"

    Sherlock's storage resources are limited and are shared among many users.
    They are meant to store data and code associated with projects for which
    you are using Sherlock's computational resources. This space is for work
    actively being computed on with Sherlock, and should not be used as a
    target for backups from other systems.

    If you're looking for a long-term storage solution for reserach data, SRCC
    offers the [Oak storage system](url_oak), which is specifically intended
    for this usage.

Those file systems are shared with other users, and are subject to quota limits
and for some of them, purge policies (time-residency limits).


## Filesystem overview

### Features and purpose

| Name                     | Type                 | Backups / Snapshots | Performance | Purpose | Cost |
| ------------------------ |--------------------- |------------------ | ----------- | ------- | ---- |
|`$HOME`, `$GROUP_HOME`    | [NFS][url_NFS]       | :fontawesome-solid-check:{: .chk_yes :} / :fontawesome-solid-check:{: .chk_yes :} | low | small, important files (source code, executables, configuration files...) | free |
|`$SCRATCH`, `$GROUP_SCRATCH` | [Lustre][url_lustre] | :fontawesome-solid-times:{: .chk_no :} / :fontawesome-solid-times:{: .chk_no :} | high bandwidth | large, temporary files (checkpoints, raw application output...) | free |
|`$L_SCRATCH`              | local SSD    | :fontawesome-solid-times:{: .chk_no :} / :fontawesome-solid-times:{: .chk_no :} | low latency, high IOPS | job specific output requiring high IOPS | free |
|`$OAK`                    | [Lustre][url_lustre] | option / :fontawesome-solid-times:{: .chk_no :} | moderate | long term storage of research data | volume-based[^oak_sd] |


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

!!! info

    Quotas are applied on both volume (the amount of data stored in bytes) and
    inode: an inode (index node) is a data structure in a Unix-style file
    system that describes a file-system object such as a file or a directory.
    In practice, each filesystem entry (file, directory, link) counts as an
    inode.

| Name           | Quota type | Volume quota | Inode quota | Retention |
| -------------- | ---------- | -----------: | ----------: | --------- |
|`$HOME`         | directory  |        15 GB | n/a         | $\infty$  |
|`$GROUP_HOME`   | directory  |         1 TB | n/a         | $\infty$  |
|`$SCRATCH`      | directory  |       100 TB | 50 million  | [time limited][url_purge] |
|`$GROUP_SCRATCH`| directory  |       100 TB | 50 million  | [time limited][url_purge] |
|`$L_SCRATCH`    | n/a        |          n/a | n/a         | job lifetime  |
|`$OAK`          | group      | amount purchased | function of the volume purchased | $\infty$ |


Quota types:



* **directory**: based on files location and account for all the files
  that are in a given directory.
* **group**: based on files ownership and account for all the files that
  belong to a given group.

Retention types:

* **$\infty$**: files are kept as long as the user account exists on Sherlock.
* **time limited**: files are kept for a fixed length of time after they've
  been last modified. Once the limit is reached, files expire and are
  automatically deleted.
* **job lifetime**: files are only kept for the duration of the job and are
  automatically purged when the job ends.


#### Checking quotas

To check your quota usage on the different filesystems you have access to, you
can use the `sh_quota` command:

```
$ sh_quota
+---------------------------------------------------------------------------+
| Disk usage for user kilian (group: ruthm)                                 |
+---------------------------------------------------------------------------+
|   Filesystem |  volume /   limit                  | inodes /  limit       |
+---------------------------------------------------------------------------+
          HOME |   9.4GB /  15.0GB [||||||     62%] |      - /      - (  -%)
    GROUP_HOME | 562.6GB /   1.0TB [|||||      56%] |      - /      - (  -%)
       SCRATCH |  65.0GB / 100.0TB [            0%] | 143.8K /  50.0M (  0%)
 GROUP_SCRATCH | 172.2GB / 100.0TB [            0%] |  53.4K /  50.0M (  0%)
           OAK |  30.8TB / 240.0TB [|          12%] |   6.6M /  36.0M ( 18%)
+---------------------------------------------------------------------------+
```

Several options are provided to allow listing quotas for a specific filesystem
only, or in the context of a different group (for users who are members of
several PI groups). Please see the `sh_quota` usage information for details:

```
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
```
$ sh_quota -f HOME
```

If you belong to multiple groups, you can display the group quotas for your
secondary groups with:
```
$ sh_quota -g <group_name>
```

And finally, for great output control, an option to display quota usage in JSON
is provided via the `-j` option:

```
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
  `$GROUP_HOME`
* temporary output of jobs, large checkpoint files --> `$SCRATCH`
* curated output of job campaigns, large group-shared datasets, archives --> `$OAK`

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
```
$ echo $SCRATCH
/scratch/users/kilian
```

Or for instance, to move to your group-shared home directory:
```
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
[url_oak]:              //oak-storage.stanford.edu
[url_data_sshfs]:       /docs/storage/data-transfer#sshfs
[url_purge]:            /docs/storage/filesystems/#expiration-policy

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_sd]: For more information about Oak, its characteristics and cost model,
           please see the [Oak Service Description page][url_oak].


--8<--- "includes/_acronyms.md"
