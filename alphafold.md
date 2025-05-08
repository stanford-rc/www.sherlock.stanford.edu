## Introduction

[AlphaFold][url_af] is an artificial intelligence (AI) system developed by
[Google DeepMind][url_deepmind] for predicting protein structures. Using deep
learning, Alphafold's accuracy matches that of traditional experimental
techniques at a fraction of the cost and in less time. This document provides
guidelines for installing and running AlphaFold in user space on Sherlock.

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
    
    ```
    mkdir $HOME/af3_model
	cd $HOME/af3_model
	wget <personal_download_link>
    ```
    You can make a copy of your model parameters to `$SCRATCH`, which will
    for faster performance when running AlphaFold 3.
    
    ```
    cp -R $HOME/af3_model $SCRATCH
    ```
    
3. Clone the AlphaFold 3 GitHub Repo into `$GROUP_HOME`

    ```
    mkdir -p $GROUP_HOME/$USER
    cd $GROUP_HOME/$USER
    git clone https://github.com/google-deepmind/alphafold3.git
    ```
    
4. Download the Databases to `$SCRATCH` or `$GROUP_SCRATCH`.

    For faster performance, you will need a copy of the AlphaFold 3 databases
    in `$SCRATCH` or `$GROUP_SCRATCH`. You can use the following template to
    create a batch job for downloading the databases.
    
    ```
    #!/bin/bash
    #SBATCH -t 10:00:00
    
    bash fetch_databases.sh $SCRATCH/af3_db
    ```
    
    This script assumes that you are submitting the job from within the 
    GitHub repository that you cloned into `$GROUP_HOME/$USER`. Feel free to
    modify the script if you want to use your own partition, download to a
    different location, or submit the job from a different directory.
    
    Although unmodified files are purged from `$SCRATCH` and `$GROUP_SCRATCH`
    every 90 days, Stanford Research Computing maintains a copy of the
    AlphaFold 3 databases within the Oak Common Datasets Repository. As you run
    AlphaFold, you can include a `dsync` in your scripts that compares your
    `$SCRATCH` databases with those on `$OAK` and automatically copies over
    any missing files.
    
5. Build the AlphaFold 3 Apptainer Image

    Container software like Apptainer allow researchers to easily "contain"
    or package software and port it between compute platforms. The following
    commands will allow you to build your own copy of AlphaFold 3 into
    a `.sif` file, or container image.
    
    ```
    sh_dev -m 12GB
    
    cd $GROUP_HOME/$USER/alphafold3
    
    wget https://gist.githubusercontent.com/cagancayco/a71ae18ab5044e14526e0c83becaf647/raw/9f6104366d59fa9a96bb92693cfa60930184c981/af3.def
    
    apptainer build af3.sif af3.def
    
    exit
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
    mkdir -p $SCRATCH/af_input
    mkdir -p $SCRATCH/af_output
    ```
    
    The input directory is where you will put the `.json` files containing
    
2. Write and submit a batch script for running the AlphaFold 3 pipeline.

    Running AlphaFold3 can be broken down into two parts: pipeline and
    inference. GPUs are only utilized during inference, so we are going
    to run the pipeline on CPUs. You can use the following batch script
    as a template.
    
    ```
    #!/bin/bash
    #SBATCH --partition=normal
    #SBATCH --cpus-per-task=8
    #SBATCH --mem=20G
    #SBATCH --time=0-01:00:00

    # model and database paths variables
    MODEL_PARAMS_PATH=$SCRATCH/af3_model
    DB_PATH=$SCRATCH/af3_db
    
    # run alphafold3 singularity container
    singularity run \
         --nv \
         --bind $SCRATCH/af_input:/root/af_input \
         --bind $SCRATCH/af_output:/root/af_output \
         --bind $MODEL_PARAMS_PATH:/root/models \
         --bind $DB_PATH:/root/public_databases \
         af3.sif \
         --norun_inference \
         --json_path=/root/af_input/fold_input_2PV7.json \
         --model_dir=/root/models \
         --db_dir=/root/public_databases \
         --output_dir=/root/af_output
    ```
    
3. Write and submit a batch script for running inference.

    AlphaFold 3 runs fastest on GPUs with CUDA Capability > 7.x. When writing
    your batch script for inference, you should include a constraint for the
    GPU type.
    
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

    # run alphafold3 singularity container
    singularity run \
         --nv \
         --env JAX_TRACEBACK_FILTERING=off \
         --bind $SCRATCH/af_input:/root/af_input \
         --bind $SCRATCH/af_output:/root/af_output \
         --bind $MODEL_PARAMS_PATH:/root/models \
         --bind $DB_PATH:/root/public_databases \
     af3.sif \
     --norun_data_pipeline \
     --json_path=/root/af_output/2pv7/2pv7_data.json \
     --model_dir=/root/models \
     --output_dir=/root/af_output
    ```

[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:        /docs/software/list.md
[url_af]:             https://deepmind.google/technologies/alphafold/
[url_deepmind]:       https://deepmind.google/
[url_tou]: https://github.com/google-deepmind/alphafold3/blob/main/WEIGHTS_TERMS_OF_USE.md
[url_form]:           https://github.com/google-deepmind/alphafold3?tab=readme-ov-file#obtaining-model-parameters

--8<--- "includes/_acronyms.md"
