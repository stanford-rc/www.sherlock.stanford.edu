## Introduction

[AlphaFold][url_af] is an artificial intelligence (AI) system developed by
[Google DeepMind][url_deepmind] for predicting protein structures. Using deep
learning, AlphaFold's accuracy matches that of traditional experimental
techniques at a fraction of the cost and in less time. This document provides
guidelines for installing and running AlphaFold in user space on Sherlock.

!!! Note "Immediate access to Boltz-1"

    [Boltz][url_boltz] is an open-source AI model released by MIT, designed
    to accurately model complex biomolecular interactions, and that achieves
    state-of-the-art performance at the level of AlphaFold 3.

    To access Boltz-1 on Sherlock, you can simply load the `py-boltz`
    module, in the `biology` category, and start predicting structures:

    ```
    $ ml biology py-boltz
    $ boltz predict <input_path> --use_msa_server
    ```

## Alphafold 3 on Sherlock

### Installing Alphafold 3

1. Request the Model Parameters from Google DeepMind.

    Access to AlphaFold 3 model parameters is granted at the discretion of
    Google DeepMind and is subject to their [Terms of Use][url_tou]. Each
    user must request their own copy of the model parameters. Researchers
    can complete the request form found [here][url_form].

    When filling out the request form, **you must use a personal Gmail
    address for the Google account email address field.** Your Stanford
    email address will not work and your request will be rejected.

2. Download the model parameters to Sherlock.

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
    
3. Copy the Databases to `$SCRATCH` or `$GROUP_SCRATCH`.

    For faster performance, you will need a copy of the AlphaFold 3 databases
    in `$SCRATCH` or `$GROUP_SCRATCH`. Stanford Research Computing maintains 
    a copy in the [Oak Common Datasets Repository][url_oak_common].You can use 
    the following template to create a batch job for copying the databases.
    
    ```shell
    #!/bin/bash
    #SBATCH --cpus-per-task=8
    #SBATCH --partition=service
    #SBATCH --time=6:00:00
    
    ml system mpifileutils
    srun -n $SLURM_TASKS_PER_NODE dcp /oak/stanford/datasets/common/alphafold3 $SCRATCH/af3_db
    ```
    
    Unmodified files are purged from `$SCRATCH` and `$GROUP_SCRATCH` every 90 
    days. As you run AlphaFold, you can include a `dsync` in your scripts that 
    compares your `$SCRATCH` databases with those in
    `/oak/stanford/datasets/common/alphafold3` and automatically copies over any 
    missing files (shown in the example scripts below).

4. Copy or Build the AlphaFold 3 Apptainer Image

    Container software like Apptainer allow researchers to easily "contain"
    or package software and port it between compute platforms. Stanford Research 
    Computing provides a container for the latest [stable release][url_release]
    of Alphafold 3. However, if you would like to install the most recent 
    development version of Alphafold 3, you can follow the instructions below 
    for building your own container.
    
    To copy the pre-built container for Alphafold 3:
    
    ```none
    $ cp /home/groups/sh_support/share/containers/af3_v301.sif $SCRATCH/af3_v301.sif
    ```
    
    
    To build your own container:
    
    ```none
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

1. Set up your input and output directories

    Create directories for AlphaFold 3 inputs and outputs in `$SCRATCH` or
    `$GROUP_SCRATCH`.

    ``` none
    $ mkdir -p $SCRATCH/af_input
    $ mkdir -p $SCRATCH/af_output
    ```

    The input directory is where you will put the `.json` files containing your
    input sequence.

2. Write and submit a batch script for running the AlphaFold 3 pipeline.

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
    
    ### This section is for automatically syncing from Oak databases
    ### Uncomment to activate this in your script
    # module load system mpifileutils
    # srun -n $SLURM_TASKS_PER_NODE dsync --quiet /oak/stanford/datasets/common/alphafold3 $SCRATCH/af3_db

    # model and database paths variables
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
         af3_dev.sif \
         --norun_inference \
         --json_path=/root/af_input/$INPUT_JSON \
         --model_dir=/root/models \
         --db_dir=/root/public_databases \
         --output_dir=/root/af_output
    ```

3. Write and submit a batch script for running inference.

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
    #
    #SBATCH --partition=gpu
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=12G
    #SBATCH --gpus=1
    #SBATCH --constraint=GPU_SKU:H100_SXM5
    #SBATCH --time=0-00:10:00

    ### This section is for automatically syncing from Oak databases
    ### Uncomment to activate this in your script
    # module load system mpifileutils
    # srun -n $SLURM_TASKS_PER_NODE dsync --quiet /oak/stanford/datasets/common/alphafold3 $SCRATCH/af3_db
    
    # model and database paths variables
    MODEL_PARAMS_PATH=$SCRATCH/af3_model
    DB_PATH=$SCRATCH/af3_db
    DATA_JSON=/2pv7/2pv7_data.json

    # run alphafold3 apptainer container
    apptainer run \
         --nv \
         --env JAX_TRACEBACK_FILTERING=off \
         --bind $SCRATCH/af_input:/root/af_input \
         --bind $SCRATCH/af_output:/root/af_output \
         --bind $MODEL_PARAMS_PATH:/root/models \
         --bind $DB_PATH:/root/public_databases \
         af3_dev.sif \
         --norun_data_pipeline \
         --json_path=/root/af_output/$DATA_JSON \
         --model_dir=/root/models \
         --output_dir=/root/af_output
    ```

### Best Practices

1. Using `dsync` to maintain your databases in `$SCRATCH` or `$GROUP_SCRATCH`

    Stanford Research Computing maintains a copy of the AlphaFold 3 database
    within the Oak Common Datasets Repository. We recommend, however, initially
    downloading the AlphaFold 3 database files directly from Google DeepMind to
    a scratch directory.  This reduces the traffic on the network between Oak
    and Sherlock and is typically faster than a direct copy. Unmodified files
    within `$SCRATCH` and `$GROUP_SCRATCH` are purged every 90 days. In order
    to maintain a complete database you can include the `dcp` command in your
    pipeline and inference sbatch scripts, which compares your `$SCRATCH`
    databases with those on Oak and automatically copies over any missing
    files.

    The `dsync` command is part of the `mpifileutils` module.
    [mpiFileUtils][url_mpifileutils] is a suite of MPI-based tools used to
    manage large datasets. `dsync` functions similar to `rsync` but can 
    leverage multiple cpu cores to copy files faster.  Here is an example usage 
    for an AlphaFold database located in `$SCRATCH`.

    ``` none
    $ module load system mpifileutils
    $ srun -n $SLURM_TASKS_PER_NODE dsync --quiet /oak/stanford/datasets/common/alphafold3 $SCRATCH/af3_db
    ```

    Please keep in mind that running `dsync` will increase the runtime of your
    job depending on how many files need to be re-copied. You can also run the
    `dsync` command separately and periodically from its own sbatch script.

2. Running on GPUs with CUDA Compute Capability 8.x or higher

    The apptainer container has been tested extensively on Sherlock GPUs with
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

    Specifying the compute capability can simplify your `--constraint` list
    because some GPU models have the same compute capability, as seen in the
    table below. It also addresses the central problem we are working around,
    since you can directly limit your SLURM job to the GPUs which satisfy the
    8.x or higher requirement.

    | GPU Model | Compute Capability |
    |:---:|:---:|
    | GPU_SKU:H100_SXM5 | GPU_CC:9.0 |
    | GPU_SKU:L40S | GPU_CC:8.9 |
    | GPU_SKU:A40 <br> GPU_SKU:RTX_3090 | GPU_CC:8.6 |
    | GPU_SKU:A100_PCIE <br> GPU_SKU:A100_SXM4 | GPU_CC:8.0 |
    | GPU_SKU:RTX_2080Ti | GPU_CC:7.5 |
    | GPU_SKU:V100_PCIE <br> GPU_SKU:V100S_PCIE <br> GPU_SKU:V100_SXM2 <br> GPU_SKU:TITAN_V | GPU_CC:7.0 |
    | GPU_SKU:P40 <br> GPU_SKU:TITAN_Xp | GPU_CC:6.1 |
    | GPU_SKU:P100_PCIE | GPU_CC:6.0 |

3. Running on GPUs with CUDA Compute Capability 7.x or lower

    Successful inference runs on GPUs with CUDA capability 7.x or lower are
    limited by sequence length and GPU memory. If you do wish to run an
    inference job on an older GPU, the apptainer container contains logic to
    test for the compute capability of the available GPU and set the appropriate
    environmental variables before running AlphaFold 3. A successful run,
    however, is not guaranteed. To specify a particular GPU use the SLURM
    `--constraint` option mentioned above.

4. Notes on Apptainer containers

    On Sherlock, the preferred method for running AlphaFold 3 is from an
    Apptainer container. The Apptainer definition file (`af3_dev.def`) SRC 
    provides is modified from the Docker file that Google DeepMind publishes 
    with AlphaFold 3. The definition file we provide takes into account the
    heterogeneity of the Sherlock cluster, and provides logic to determine which
    environment variables need to be set based on the compute capability of the
    available GPU.

    AlphaFold 3 reads and write to several directories during runtime such as
    `af_input`, `af_output`, `af3_model`, and `af3_db` directories. In order to
    run from a container, the necessary directories on Sherlock's filesystem
    need to be bound to the filesystem within the container; this the purpose of
    `--bind` flags in the sbatch scripts above.

    The container also runs AlphaFold 3 using the `%runscript` section option.
    The contents of the `%runscript` section are executed when the container
    image (`af3_dev.sif`) is run with `apptainer run`. This is different from
    the typical usage of Apptainer containers, where software within the
    container are explicitly called during runtime.

[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:        ../list.md
[url_af]:             //deepmind.google/technologies/alphafold/
[url_boltz]:          //github.com/jwohlwend/boltz
[url_deepmind]:       //deepmind.google/
[url_tou]:            //github.com/google-deepmind/alphafold3/blob/main/WEIGHTS_TERMS_OF_USE.md
[url_form]:           //github.com/google-deepmind/alphafold3?tab=readme-ov-file#obtaining-model-parameters
[url_oak_common]:     /docs/storage/data-sharing.md#oak-common-datasets
[url_cuda_gpus]:      //developer.nvidia.com/cuda-gpus
[url_node_feat]:      /docs/advanced-topics/node-features.md
[url_mpifileutils]:   //github.com/hpc/mpifileutils

--8<--- "includes/_acronyms.md"
