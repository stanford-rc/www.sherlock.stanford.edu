
!!! Warning "Data protection is mostly a task for the user"

    Except for `$HOME` and `$GROUP_HOME`, data on Sherlock is not backed up,
    nor archived. It's up to each user and group to make sure they maintain
    multiple copies of their data if needed.


## Snapshots

File system snapshots represent the state of the file system at a particular
point in time. They allow accessing the file system contents as it was a
different times in the past, and get back data that may have been deleted or
modified since the snapshot was taken.

!!! important

    Snapshots are only available on `$HOME` and `$GROUP_HOME`.

### Accessing snapshots

Snapshots taken in `$HOME` and `$GROUP_HOME` are accessible in a `.snapshot`
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
period. The snapshot policy applies to both `$HOME` and `$GROUP_HOME` storage
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


## Backups

Although the SRCC doesn't offer any backup service _per se_, we do provide all
the tools required to [transfer data][url_datatransfer] in and out of Sherlock.

Suggested options to backup your data include:

* [Oak][url_oak], SRCC's long-term research data storage service
  <small>(**Recommended**)</small>
* [University IT Storage options][url_uit_storage] and [backup
  services][url_uit_backup]
* Cloud storage providers (see the [Data transfer][url_datatransfer] page for
  information about the tools we provide to transfer files to/from the cloud)

[comment]: #  (link URLs -----------------------------------------------------)

[url_datatransfer]:     data-transfer#cloud-storage
[url_oak]:              https://oak-storage.stanford.edu
[url_uit_storage]:      https://uit.stanford.edu/service/storage
[url_uit_backup]:       https://uit.stanford.edu/services/category/backup-and-storage
[url_cloud]:


[comment]: #  (footnotes -----------------------------------------------------)

[^snap_policy]: The snapshot policy is subject to change and may be adjusted as
           the storage system usage conditions evolve.

