## Introduction

[AlphaFold][url_af] is an artificial intelligence (AI) system developed by
[Google DeepMind][url_deepmind] for predicting protein structures. Using deep
learning, AlphaFold's accuracy matches that of traditional experimental
techniques at a fraction of the cost and in less time. This document provides
guidelines for installing and running AlphaFold in user space on Sherlock.

!!! Note "Boltz"

    [Boltz][url_boltz] is an open-source AI model released by MIT, designed
    to accurately model complex biomolecular interactions, and that achieves
    state-of-the-art performance at the level of AlphaFold 3.

    To access Boltz on Sherlock, you can simply load the `py-boltz`
    module, in the `biology` category, and start predicting structures:

    ``` none
    $ ml biology py-boltz
    $ boltz predict <input_path> --use_msa_server
    ```

## AlphaFold 3 on Sherlock

### Installing AlphaFold 3

#### Requesting model parameters

Access to AlphaFold 3 model parameters is granted at the discretion of
Google DeepMind and is subject to their [Terms of Use][url_tou]. Each
user must request their own copy of the model parameters. Researchers
can complete the request form found [here][url_form].

!!! Warning "Personal Gmail address only"

    When filling out the request form, **you must use a personal Gmail address
    for the Google account email address field.** Your Stanford email address
    will not work and your request will be rejected.

#### Downloading model parameters

Once your access is approved by Google DeepMind, you will receive a link
to download the model parameters file, `af3.bin.zst`. It is recommended to
download the model parameters to `$HOME`. The file is ~1 GB in size.

``` none
$ mkdir $HOME/af3_model
$ cd $HOME/af3_model
$ wget <personal_download_link>
```

You can make a copy of your model parameters to `$SCRATCH`, which will
have faster performance when running AlphaFold 3.

``` none
$ cp -R $HOME/af3_model $SCRATCH
```

#### Copying the databases

For faster performance, you will need a copy of the AlphaFold 3 databases
in `$SCRATCH` or `$GROUP_SCRATCH`. Stanford Research Computing maintains
a copy in the [Common Datasets repository][url_oak_common]. You can use
the following template to create a batch job for copying the databases.

``` shell
#!/bin/bash
#SBATCH --ntasks=4
#SBATCH --partition=service
#SBATCH --time=6:00:00

ml system mpifileutils
srun dcp $COMMON_DATASETS/alphafold3 $SCRATCH/af3_db
```

Unmodified files are purged from `$SCRATCH` and `$GROUP_SCRATCH` every 90
days. As you run AlphaFold, you can include a `dsync` in your scripts that
compares your `$SCRATCH` databases with those in
`$COMMON_DATASETS/alphafold3` and automatically copies over any
missing files (shown in the example scripts below).

#### Getting the Apptainer image

Container software like Apptainer allow researchers to easily "contain"
or package software and port it between compute platforms. Stanford Research
Computing provides a container for the latest [stable release][url_release]
of AlphaFold 3. However, if you would like to use the most recent
development version of AlphaFold 3, you can follow the instructions below
for building your own container.

To copy the prebuilt container for AlphaFold 3:

``` none
$ cp /home/groups/sh_support/share/containers/af3_v301.sif $SCRATCH/af3_v301.sif
```

!!! tip "Check for the latest version"

    The container filename above may not reflect the latest available version.
    Run `ls /home/groups/sh_support/share/containers/af3_*.sif` to see what
    is currently available.

To build your own container:

``` none
$ sh_dev -m 12GB
$ mkdir -p $GROUP_HOME/$USER
$ cd $GROUP_HOME/$USER

$ git clone https://github.com/google-deepmind/alphafold3.git
$ cd alphafold3
$ wget https://raw.githubusercontent.com/google-deepmind/alphafold3/main/docker/jackhmmer_seq_limit.patch

$ apptainer build af3_dev.sif /home/groups/sh_support/share/containers/alphafold/af3_dev.def

$ exit
```

After you have created the `af3_dev.sif` file, you should put a copy of it
in `$SCRATCH` or `$GROUP_SCRATCH`.

And that's it! Once you have the model parameters, databases, and Apptainer
image, you are ready to start running AlphaFold 3 on Sherlock.


### Using AlphaFold 3

#### Setting up input and output directories

Create directories for AlphaFold 3 inputs and outputs in `$SCRATCH` or
`$GROUP_SCRATCH`.

``` none
$ mkdir -p $SCRATCH/af_input
$ mkdir -p $SCRATCH/af_output
```

AlphaFold 3 takes `.json` files as input, describing the sequences you want
to fold. For the full input format specification, see the [AlphaFold 3 input
documentation][url_af3_input]. Here is a minimal example for a single protein
chain:

``` json
{
  "name": "my_protein",
  "modelSeeds": [1],
  "sequences": [
    {
      "protein": {
        "id": "A",
        "sequence": "MGYINVVKDMTQNLRSLLNLLDKKVTSGLGASEVDGQLISLRGAGQFPASQASNSS"
      }
    }
  ],
  "dialect": "alphafold3",
  "version": 1
}
```

Save the file in your `af_input` directory. The `name` field determines the
name of the output sub-directory.

#### Running the data pipeline

Running AlphaFold 3 can be broken down into two parts: pipeline and
inference. The pipeline refers to the genetic sequence search/template
search, and inference refers to predicting structures. GPUs are only
utilized during inference, so we are going to run the pipeline on CPUs.
You can use the following batch script as a template.

In order to run the pipeline step on a particular sequence, the bash
variable `INPUT_JSON` needs to be set to the filename of the input `.json`
file you would like to fold, and the `.json` file needs to be placed in the
`af_input` directory. In the template below the example input file is
`fold_input_2PV7.json`.

``` shell
#!/bin/bash
#SBATCH --partition=normal
#SBATCH --cpus-per-task=8
#SBATCH --mem=20G
#SBATCH --time=0-01:00:00

### Uncomment to sync missing database files from Oak before running
# rsync -a $COMMON_DATASETS/alphafold3/ $SCRATCH/af3_db/

# model and database paths variables
SIF_FILE=af3_dev.sif
MODEL_PARAMS_PATH=$SCRATCH/af3_model
DB_PATH=$SCRATCH/af3_db
INPUT_JSON=fold_input_2PV7.json

# run alphafold3 apptainer container
apptainer run \
     --nv \
     --bind $SCRATCH/af_input:/root/af_input \
     --bind $SCRATCH/af_output:/root/af_output \
     --bind $MODEL_PARAMS_PATH:/root/models \
     --bind $DB_PATH:/root/public_databases \
     $SIF_FILE \
     --norun_inference \
     --json_path=/root/af_input/$INPUT_JSON \
     --model_dir=/root/models \
     --db_dir=/root/public_databases \
     --output_dir=/root/af_output
```

!!! tip "8 CPUs is the sweet spot for the data pipeline"

    AlphaFold 3 uses `jackhmmer` and `nhmmer` for sequence searches, which
    are capped at 8 CPUs. Going beyond 8 provides almost no additional
    speedup. If you do change `--cpus-per-task`, pass the matching values
    explicitly with `--jackhmmer_n_cpu=<N>` and `--nhmmer_n_cpu=<N>`.

#### Running inference

AlphaFold 3 runs best on [GPUs with CUDA Capability > 7.x][url_cuda_gpus].
When writing your batch script for inference, you should include a
constraint for the [GPU type][url_node_feat]. You can use the following
batch script as a template.

In order to run the inference step on your particular sequence of interest,
you will need to modify the bash variable `DATA_JSON` with the directory and
filename of the data `.json` file created during the pipeline step. The data
directory and file are located in your `af_output` directory. In the
template example below the data directory and file is `/2pv7/2pv7_data.json`.

``` shell
#!/bin/bash
#SBATCH --partition=gpu
#SBATCH --cpus-per-task=8
#SBATCH --mem=20G
#SBATCH --gpus=1
#SBATCH --constraint=GPU_SKU:H100_SXM5
#SBATCH --time=0-00:10:00

### Uncomment to sync missing database files from Oak before running
# rsync -a $COMMON_DATASETS/alphafold3/ $SCRATCH/af3_db/

# model and database paths variables
SIF_FILE=af3_dev.sif
MODEL_PARAMS_PATH=$SCRATCH/af3_model
DB_PATH=$SCRATCH/af3_db
DATA_JSON=/2pv7/2pv7_data.json

# JAX compilation cache (avoids recompiling kernels on every run)
CACHE_DIR=$SCRATCH/.cache/jax
mkdir -p $CACHE_DIR

# run alphafold3 apptainer container
apptainer run \
     --nv \
     --env JAX_TRACEBACK_FILTERING=off \
     --env XLA_FLAGS="--xla_gpu_enable_triton_gemm=false" \
     --env JAX_COMPILATION_CACHE_DIR=/root/.cache/jax \
     --bind $SCRATCH/af_input:/root/af_input \
     --bind $SCRATCH/af_output:/root/af_output \
     --bind $MODEL_PARAMS_PATH:/root/models \
     --bind $DB_PATH:/root/public_databases \
     --bind $CACHE_DIR:/root/.cache/jax \
     $SIF_FILE \
     --norun_data_pipeline \
     --json_path=/root/af_output/$DATA_JSON \
     --model_dir=/root/models \
     --output_dir=/root/af_output
```

!!! tip "Out of GPU memory on large inputs?"

    For very long sequences or large complexes (roughly >5,000 tokens),
    inference may run out of GPU memory. You can enable JAX unified memory
    to spill overflow to system RAM by adding
    `--env XLA_PYTHON_CLIENT_ALLOCATOR=platform` to your `apptainer run`
    command. This allows larger inputs to run at the cost of some performance.

#### Chaining pipeline and inference jobs

Rather than waiting for the pipeline job to finish before submitting inference,
you can use the `--dependency` option to submit both jobs upfront and have
inference start automatically once the pipeline succeeds.

``` shell
# Submit the pipeline job and capture its job ID
PIPELINE_JOB=$(sbatch --parsable run_pipeline.sh)

# Submit inference to run only after the pipeline job completes successfully
sbatch --dependency=afterok:$PIPELINE_JOB run_inference.sh
```

If the pipeline job fails, the dependent inference job will not start. You
can cancel it with `scancel <inference_job_id>`.

#### Understanding the output

After running both steps, your `af_output` directory will contain a
sub-directory named after the `name` field in your input JSON. Its contents
after a full run look like this:

``` none
af_output/
└── my_protein/
    ├── my_protein_data.json          # intermediate output from the pipeline step
    ├── my_protein_model.cif          # best predicted structure
    ├── my_protein_confidences.json   # per-residue confidence scores (pLDDT, PAE)
    ├── my_protein_summary_confidences.json
    ├── ranking_scores.csv            # ranking of all generated samples
    ├── seed-1_sample-0/
    │   ├── model.cif
    │   ├── confidences.json
    │   └── summary_confidences.json
    ├── seed-1_sample-1/
    ...
    └── TERMS_OF_USE.md
```

By default, AlphaFold 3 generates 5 samples per seed. The top-ranked
structure is copied to `my_protein_model.cif` at the top level.

### Best Practices

#### Maintaining databases with `dsync`

Stanford Research Computing maintains a copy of the AlphaFold 3 databases
in the [Common Datasets repository][url_oak_common], so you don't need to
download them from Google DeepMind yourself. Since unmodified files in
`$SCRATCH` and `$GROUP_SCRATCH` are purged every 90 days, you can use
`dsync` to periodically re-sync your local copy from Oak, transferring only
files that are missing or outdated.

``` none
$ module load system mpifileutils
$ srun dsync --quiet $COMMON_DATASETS/alphafold3 $SCRATCH/af3_db
```

Note that running `dsync` will increase the runtime of your job depending on
how many files need to be re-copied. You can also run it separately and
periodically from its own sbatch script.

#### JAX compilation cache

On its first run, AlphaFold 3 compiles GPU kernels via XLA, which can take
several minutes. By pointing the compilation cache to `$SCRATCH`, subsequent
runs reuse the compiled kernels and start significantly faster. The inference
script above already sets this up — just make sure `CACHE_DIR` points to a
consistent location across runs.

If you are running multiple jobs in parallel, they can safely share the same
cache directory.

#### GPU selection

The Apptainer container has been tested extensively on Sherlock GPUs with
CUDA capability 8.x or higher. These include H100, L40S, RTX 3090, A100, and
A40 model GPUs. New models, such as the H100 and L40S, produce the fastest
run times, with older models taking slightly longer. Consumer grade GPUs,
such as the RTX 3090, are also sequence limited due to lower GPU memory.

To run exclusively on a particular GPU model, you can use the SLURM
`--constraint` option. This option takes a node's feature as an argument and
sets it as a requirement of the job. Use the Sherlock utility `sh_node_feat
-h` to see a list of available node features.

Multiple job constraints can also be specified with AND (&) and OR (|)
operators. For example, if you are submitting an inference job to the queue
and want to run from a larger pool of GPU resources, you can specify both
H100 or L40S GPUs:

``` shell
#SBATCH --constraint="GPU_SKU:H100_SXM5|GPU_SKU:L40S"
```

Additionally, the compute capability is also listed as a node feature, and
you can specify it directly as a constraint. For example, you can specify
compute capabilities 8.9 or 9.0 with:

``` shell
#SBATCH --constraint="GPU_CC:8.9|GPU_CC:9.0"
```

Successful inference runs on GPUs with CUDA capability 7.x or lower are
limited by sequence length and GPU memory. If you do wish to run an
inference job on an older GPU, the Apptainer container contains logic to
test for the compute capability of the available GPU and set the appropriate
environmental variables before running AlphaFold 3. A successful run,
however, is not guaranteed. To specify a particular GPU use the SLURM
`--constraint` option mentioned above.

#### Notes on Apptainer containers

On Sherlock, the preferred method for running AlphaFold 3 is from an
Apptainer container. The definition file (`af3_dev.def`) provided by SRC is
modified from the Dockerfile that Google DeepMind publishes with AlphaFold 3.
It takes into account the heterogeneity of the Sherlock cluster, and provides
logic to determine which environment variables need to be set based on the
compute capability of the available GPU.

AlphaFold 3 reads and writes to several directories during runtime such as
`af_input`, `af_output`, `af3_model`, and `af3_db`. In order to run from a
container, the necessary directories on Sherlock's filesystem need to be
bound to the filesystem within the container; this is the purpose of the
`--bind` flags in the sbatch scripts above.

The container runs AlphaFold 3 using the `%runscript` section. The contents
of the `%runscript` section are executed when the container image is run with
`apptainer run`. This is different from the typical usage of Apptainer
containers, where software within the container is explicitly called during
runtime.

[comment]: #  (link URLs -----------------------------------------------------)

[url_af]:             //deepmind.google/technologies/alphafold/
[url_boltz]:          //github.com/jwohlwend/boltz
[url_deepmind]:       //deepmind.google/
[url_tou]:            //github.com/google-deepmind/alphafold3/blob/main/WEIGHTS_TERMS_OF_USE.md
[url_form]:           //github.com/google-deepmind/alphafold3?tab=readme-ov-file#obtaining-model-parameters
[url_release]:        //github.com/google-deepmind/alphafold3/releases
[url_af3_input]:      //github.com/google-deepmind/alphafold3/blob/main/docs/input.md
[url_oak_common]:     /docs/storage/common-datasets.md
[url_cuda_gpus]:      //developer.nvidia.com/cuda-gpus
[url_node_feat]:      /docs/advanced-topics/node-features.md
[url_mpifileutils]:   //github.com/hpc/mpifileutils

--8<--- "includes/_acronyms.md"
