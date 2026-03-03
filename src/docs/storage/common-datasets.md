## Common datasets

To help researchers save time on downloads, Stanford Research Computing hosts
databases and models for commonly used software in `$COMMON_DATASETS`.  This is
a read-only storage space that is accessible to all Sherlock users, even those
who do not own Oak storage.

### Optimizing performance

For faster run times and optimal performance, you should **NOT** run jobs
against `$COMMON_DATASETS` directly. Researchers should instead copy your
desired dataset to `$SCRATCH` or `$GROUP_SCRATCH`, and then reference that copy
in your jobs.

### Syncing between $SCRATCH and $COMMON_DATASETS

Tools such as [`rsync`][url_sh_rsync] or [`dsync`][url_dsync] can be used to
restore files that may have been deleted from `$SCRATCH` due to the 90-day
purge policy.

The code snippet below shows an example of starting an interactive session on
the `service` partition and using `dsync` to copy an common dataset called
`data` to `$SCRATCH`.

```shell
$ sh_dev -c 4 -p service -t 2:00:00
salloc: Granted job allocation 16755526

$ ml system mpifileutils
$ srun dsync $COMMON_DATASETS/data $SCRATCH/data
```

[comment]: #  (link URLs -----------------------------------------------------)

[url_sh_rsync]:         /docs/storage/data-transfer.md#rsync
[url_dsync]:            //mpifileutils.readthedocs.io/en/0.12-rtd/dsync.1.html


--8<--- "includes/_acronyms.md"
