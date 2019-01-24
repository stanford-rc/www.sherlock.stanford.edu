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

Those file systems are shared with other users, and are subject to quota limits
and for some of them, purge policies (time-residency limits).


## Filesystem overview

### Features and purpose

<!-- color styles for yes/no checks -->
<style>
.yes { color: darkgreen; }
.no  { color: darkred;   }
.md-typeset code { word-break: keep-all; }
</style>


| Name                     | Type                 | Backups / Snapshots | Performance | Purpose | Cost |
| ------------------------ |--------------------- |------------------ | ----------- | ------- | ---- |
|`$HOME`, `$GROUP_HOME`    | [NFS][url_NFS]       | <b class="yes">:fa-check:</b> / <b class="yes">:fa-check:</b> | Low | Small, important files (source code, executables, configuration files...) | Free |
|`$SCRATCH`, `$GROUP_SCRATCH` | [Lustre][url_lustre] | <b class="no">:fa-times:</b> / <b class="no">:fa-times:</b> | High bandwidth | Large, temporary files (checkpoints, raw application output...) | Free |
|`$L_SCRATCH`              | Local SSD    | <b class="no">:fa-times:</b> / <b class="no">:fa-times:</b> | Low latency, high IOPS | Job specific output requiring high IOPS | Free |
|`$OAK`                    | [Lustre][url_lustre] | <b class="no">:fa-times:</b> / option | Moderate | Long term storage of research data | Based on volume[^oak_sd] |


### Quotas and limits

| Name           | Quota type | Quota value | Retention |
| -------------- | ---------- | ----------: | --------- |
|`$HOME`         | user       |       15 GB | $\infty$  |
|`$GROUP_HOME`   | group      |        1 TB | $\infty$  |
|`$SCRATCH`      | user       |       20 TB | [time limited][url_purge] |
|`$GROUP_SCRATCH`| group      |       30 TB | [time limited][url_purge] |
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


### Access scope

| Name           |  Scope        | Access sharing level |
| -------------- |  ------------ | ----------- |
|`$HOME`         |  cluster      | user        |
|`$GROUP_HOME`      |  cluster      | group       |
|`$SCRATCH`      |  cluster      | user        |
|`$GROUP_SCRATCH`   |  cluster      | group       |
|`$L_SCRATCH`    |  compute node | user        |
|`$OAK`          |  cluster (optional, purchase required) | group |

Group storage locations are typically shared between all the members of the
same PI group. User locations are only accessible by the user.

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

[url_NFS]:              https://en.wikipedia.org/wiki/Network_File_System
[url_lustre]:           https://en.wikipedia.org/wiki/Lustre_(file_system)
[url_oak]:              https://oak-storage.stanford.edu
[url_data_sshfs]:       data-transfer#sshfs
[url_purge]:            /docs/storage/filesystems/#expiration-policy

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_sd]: For more information about Oak, its characteristics and cost model,
           please see the [Oak Service Description page][url_oak].
