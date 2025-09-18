## Introduction

[AlphaFold][url_af] is an artificial intelligence (AI) system developed by
[Google DeepMind][url_deepmind] for predicting protein structures. Using deep
learning, Alphafold's accuracy matches that of traditional experimental
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

## Alphafold 3

### Installing Alphafold 3 on Sherlock

1. Request the Model Parameters from Google DeepMind.

    Access to AlphaFold 3 model parameters is granted at the discretion of
    Google DeepMind and is subject to their [Terms of Use][url_tou]. Each
    user must request their own copy of the model parameters. Researchers
    can complete the form the request form found [here][url_form].
    
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
    
3. Clone the AlphaFold 3 GitHub Repo into `$GROUP_HOME`

    ```
    $ mkdir -p $GROUP_HOME/$USER
    $ cd $GROUP_HOME/$USER
    $ git clone https://github.com/google-deepmind/alphafold3.git
    ```
    
4. Download the Databases to `$SCRATCH` or `$GROUP_SCRATCH`.

    For faster performance, you will need a copy of the AlphaFold 3 databases
    in `$SCRATCH` or `$GROUP_SCRATCH`. You can use the following template to
    create a batch job for downloading the databases.
    
    ```
    #!/bin/bash
    #SBATCH -t 5:00:00
    
    bash $GROUP_HOME/$USER/alphafold3/fetch_databases.sh $SCRATCH/af3_db
    ```
    
    Feel free to modify the script if you want to use your own partition,
    downloaded AlphaFold 3 to location different from `$GROUP_HOME/$USER`,
    or want to download the database to a different location. The database
    will take approximately 1 hour to download, you may proceed to the next
    step while it completes.
    
    Although unmodified files are purged from `$SCRATCH` and `$GROUP_SCRATCH`
    every 90 days, Stanford Research Computing maintains a copy of the
    AlphaFold 3 databases within the Oak Common Datasets Repository. As you run
    AlphaFold, you can include a `dcp` in your scripts that compares your
    `$SCRATCH` databases with those on `$OAK` and automatically copies over
    any missing files.
    
6. Build the AlphaFold 3 Apptainer Image

    Container software like Apptainer allow researchers to easily "contain"
    or package software and port it between compute platforms. The following
    commands will allow you to build your own copy of AlphaFold 3 into
    a `.sif` file, or container image.
    
    ``` none
    $ sh_dev -m 12GB
    $ cd $GROUP_HOME/$USER/alphafold3
    $ wget https://gist.githubusercontent.com/cagancayco/a71ae18ab5044e14526e0c83becaf647/raw/9f6104366d59fa9a96bb92693cfa60930184c981/af3.def
    $ apptainer build af3.sif af3.def
    $ exit
    ```
    
    Once you have created the `af3.sif` file, you should put a copy in
    `$SCRATCH` or `$GROUP_SCRATCH`.

And that's it! Once you have the model parameters, databases, and Apptainer
image, you are ready to start running AlphaFold 3 on Sherlock.

### Running AlphaFold 3 on Sherlock

1. Set up your input and output directories

    Create directories for AlphaFold 3 inputs and outputs in `$SCRATCH` or
    `$GROUP_SCRATCH`.
    
    ```
    $ mkdir -p $SCRATCH/af_input
    $ mkdir -p $SCRATCH/af_output
    ```
    
    The input directory is where you will put the `.json` files containing your input sequence.
    
2. Write and submit a batch script for running the AlphaFold 3 pipeline.

    Running AlphaFold 3 can be broken down into two parts: pipeline and
    inference. The pipeline refers to the genetic sequence search/template 
    search, and inference refers to predicting structures. GPU's are only 
    utilized during inference, so we are going to run the pipeline on CPUs.
    You can use the following batch script as a template. 

    In order to run the pipeline step on a particular sequence, the bash variable
    `INPUT_JSON` needs to be set to the filename of the input `.json` file
    you would like to fold, and the `.json` file needs to be placed in the `af_input`
    directory. In the template below the example input file is `fold_input_2PV7.json`.
    
    ```
    #!/bin/bash
    #SBATCH --partition=normal
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=20G
    #SBATCH --time=0-01:00:00

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
         af3.sif \
         --norun_inference \
         --json_path=/root/af_input/$INPUT_JSON \
         --model_dir=/root/models \
         --db_dir=/root/public_databases \
         --output_dir=/root/af_output
    ```
    
4. Write and submit a batch script for running inference.

    AlphaFold 3 runs best on GPUs with CUDA Capability > 7.x. When writing
    your batch script for inference, you should include a constraint for the
    GPU type. You can use the following batch script as a template. 

    In order to run the inference step on your particular sequence of interest,
    you will need to modify the bash variable `DATA_JSON` with the directory and
    filename of the data `.json` file created during the pipeline step. The data
    directory and file are located in your `af_output` directory. In the
    template example below the data directory and file is `/2pv7/2pv7_data.json`.
    
    ```
    #!/bin/bash
    #
    #SBATCH --partition=gpu
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=12G
    #SBATCH --gpus=1
    #SBATCH --constraint=GPU_SKU:H100_SXM5
    #SBATCH --time=0-00:10:00

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
         af3.sif \
         --norun_data_pipeline \
         --json_path=/root/af_output/$DATA_JSON \
         --model_dir=/root/models \
         --output_dir=/root/af_output
    ```

### Best Practices

1. Using `dcp` to maintain your in Databases to `$SCRATCH` or `$GROUP_SCRATCH`

    Stanford Research Computing maintains a copy of the AlphaFold 3 database within
    the Oak Common Datasets Repository. We recommend, however, intially downloading
    the AlphaFold 3 database files directly from Google DeepMind to a scratch directory.
    This reduces the traffic on the network between Oak and Sherlock and is typically
    faster than  a direct copy. Unmodified files within `$SCRATCH` and `$GROUP_SCRATCH`
    are purged every 90 days. In order to maintain a complete database you can include
    the `dcp` command in your pipeline and inference sbatch scripts, which compares
    your `$SCRATCH` databases with those on Oak and automatically copies over any
    missing files.

    The `dcp` command is located in the `mpifileutils` module. mpiFileUtils is a
    suite of MPI-based tools used to manage large datasets. `dcp` functions similar to
    `cp` but can leverage multiple cpu cores to copy files faster. Here is an example usage for an AlphaFold database located in `$SCRATCH`.
 
    ```
    module load system mpifileutils
    srun -n $SLURM_TASKS_PER_NODE dcp --quite /oak/stanford/datasets/common/alphafold3 $SCRATCH/af3_db
    ```

    Please keep in mind that running `dcp` will increase the runtime of your job 
    depending on how many files need to be re-copied. You can also run the `dcp` 
    command separately and periodically from its own sbatch script. 

2. Running on GPUs with CUDA Capability 8.x or higher

   The apptainer container has been tested extensively on Sherlock GPU's with 
   CUDA capability 8.x or higher. These include H100, L40S, RTX 3090, A100, and 
   A40 model GPU's. New models, such as the H100 and L40S, produce the fastest 
   runtimes, with older models taking slightly longer. Consumer grade GPU's, such
   as the RTX 3090, are also sequence limited due to lower GPU memory.

   To run exclusively on a particular GPU model, you can use the SLURM `--constraint`
   option. This option takes a node's feature as an argument and sets it as a requirement
   of the job. Use the Sherlock utility `sh_node_feat -h` to see a list of available
   node features.
   
   Multiple job constraints can also be specified with AND (&) and OR (|) operators. For example, 
   if you are submitting an inference job to the queue and want to run from a larger pool of
   GPU resources, you can specify both H100 or L40S GPU's:
   ```
   #SBATCH --constraint="GPU_SKU:H100_SXM5|GPU_SKU:L40S"
   ```

3. Running on GPUs with CUDA Capability 7.x or lower

   Successful inference runs on GPU's with CUDA capability 7.x or lower are limited
   by sequence length and GPU memory. If you do wish to run an inference job on an
   older GPU, the apptainer container contains logic to test for the compute
   capability of the available GPU and set the appropriate environmental variables
   before running AlphaFold 3. A successful run, however, is not guaranteed. To specify a 
   particular GPU use the SLURM `--constraint` option mentioned above.

4. Notes on Apptainer containers

   On Sherlock, the preferred method for running AlphaFold 3 is from an Apptainer 
   container. The Apptainer definition file (`af3.def`) SRC provides is modified
   from the Docker file that Google DeepMind's publishes with AlphaFold 3. SRC's 
   definition file takes into account the heterogeneity of the Sherlock cluster, and 
   provides logic to determine which environment variables need to be set based on the 
   compute capability of the available GPU. 

   AlphaFold 3 reads and write to several directories during runtime such as `af_input`,
   `af_output`, `af3_model`, and `af3_db` directories. In order to run from a container, 
   the necessary directories on Sherlock's filesystem need to be bound to the filesystem
   within the container; this the purpose of `--bind` flags in the sbatch scripts above.

   The container also runs AlphaFold 3 using the `%runscript` section option. The contents
   of the `%runscript` section are executed when the container image (`af3.sif`) is run with 
   `apptainer run`. This is different from the typical usage of Apptainer containers, 
   where software within the container are explicitly called during runtime.

[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:        /docs/software/list.md
[url_af]:             https://deepmind.google/technologies/alphafold/
[url_boltz]:          https://github.com/jwohlwend/boltz
[url_deepmind]:       https://deepmind.google/
[url_tou]:            https://github.com/google-deepmind/alphafold3/blob/main/WEIGHTS_TERMS_OF_USE.md
[url_form]:           https://github.com/google-deepmind/alphafold3?tab=readme-ov-file#obtaining-model-parameters

--8<--- "includes/_acronyms.md"
