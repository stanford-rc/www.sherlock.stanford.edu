## Common datasets

To help researchers save time on downloads, Stanford Research Computing hosts
databases and models for commonly used software in `$COMMON_DATASETS`. This is
a read-only storage space that is accessible to all Sherlock users.

### Available datasets

The following datasets are currently available in `$COMMON_DATASETS`:

| Dataset | Path | Description |
| ------- | ---- | ----------- |
| [AlphaFold 3][url_af3] | `$COMMON_DATASETS/alphafold3` | Genetic sequence and structural template databases for AlphaFold 3.<br><small>See our [AlphaFold documentation][url_af3_docs] for instructions on running it on Sherlock.</small> |
| [NCBI BLAST databases][url_ncbi_blast] | `$COMMON_DATASETS/blast` | Sequence databases for use with NCBI BLAST and related tools.<br><small>[Copy the databases](#optimizing-performance) you need to `$SCRATCH`, then set `BLASTDB=$SCRATCH/blast` before running BLAST.</small> |
| [Ollama models][url_ollama_lib] | `$COMMON_DATASETS/ollama` | Pre-downloaded LLM models for use with Ollama.<br><small>Automatically integrated with the `ollama` module — no manual setup needed. See our [Ollama documentation][url_ollama_docs] for more details.</small> |

To see the full and up-to-date list of available datasets, run:

``` none
$ ls $COMMON_DATASETS
```

### Optimizing performance

For faster run times and optimal performance, you should **NOT** run jobs
against `$COMMON_DATASETS` directly. Instead, copy your desired dataset to
`$SCRATCH` or `$GROUP_SCRATCH`, and then reference that copy in your jobs.

#### Syncing between `$SCRATCH` and `$COMMON_DATASETS`

Tools such as [`rsync`][url_sh_rsync] or [`dsync`][url_dsync] can be used to
restore files that may have been deleted from `$SCRATCH` due to the 90-day
purge policy.

For example, to copy the AlphaFold 3 databases to `$SCRATCH`:

```shell
$ sh_dev -c 4 -p service -t 2:00:00
salloc: Granted job allocation 16755526

$ ml system mpifileutils
$ srun dsync $COMMON_DATASETS/alphafold3 $SCRATCH/alphafold3
```

[comment]: #  (link URLs -----------------------------------------------------)

[url_af3]:              //github.com/google-deepmind/alphafold3
[url_ncbi_blast]:       //blast.ncbi.nlm.nih.gov/
[url_ollama_lib]:       //ollama.com/library
[url_dsync]:            //mpifileutils.readthedocs.io/en/0.12-rtd/dsync.1.html

[url_af3_docs]:         /docs/software/using/alphafold.md
[url_ollama_docs]:      /docs/software/using/ollama.md
[url_sh_rsync]:         /docs/storage/data-transfer.md#rsync


--8<--- "includes/_acronyms.md"
