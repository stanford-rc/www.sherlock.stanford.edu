## Introduction

[Quantum ESPRESSO][url_qe] is an integrated suite of Open-Source computer codes
for electronic-structure calculations and materials modeling at the nanoscale.
It is based on density-functional theory, plane waves, and
pseudo-potentials.Perl is a high-level, general-purpose, interpreted, dynamic
programming

Quantum ESPRESSO has evolved into a distribution of independent and
inter-operable codes in the spirit of an open-source project. The Quantum
ESPRESSO distribution consists of a “historical” core set of components, and a
set of plug-ins that perform more advanced tasks, plus a number of third-party
packages designed to be inter-operable with the core components. Researchers
active in the field of electronic-structure calculations are encouraged to
participate in the project by contributing their own codes or by implementing
their own ideas into existing codes.


### More documentation

The following documentation specifically intended for using Quantum Espresso on
Sherlock.  For more complete documentation about Quantum Espresso in general,
please see the [Quantum Espresso documentation][url_qe_docs].


## Quantum Espresso on Sherlock

To run Quantum Espresso on Sherlock, you can use one of the [provided
modules][url_soft_qe], or run it from a container.

The CPU version of Quantum Espresso can be loaded via the `quantum-espresso`
module:

```bash
$ ml chemistry quantum-espresso
```

and the GPU version can be loaded via the `quantum-espresso_gpu` module:

```bash
$ ml chemistry quantum-espresso_gpu
```


## Examples

Here are a few examples showing how to run the AUSURF112 benchmark.

### Preparation

The first step is to get the benchmark files:

```bash
$ cd $SCRATCH
$ git clone https://github.com/QEF/benchmarks qe_benchmarks
$ cd qe_benchmarks/AUSURF112
```

### CPU version

To submit a Quantum Espresso job to run the AUSURF112 benchmark on CPU nodes,
the following submission script can be used:

=== "qe-bench_cpu.sbatch"

    ```bash
    #!/bin/bash
    #SBATCH --nodes=2                # number of nodes for the job
    #SBATCH --ntasks-per-node=16     # number of tasks per node
    #SBATCH --time=00:30:00          # total run time limit (HH:MM:SS)
    #SBATCH --mail-type=begin        # send email when job begins
    #SBATCH --mail-type=end          # send email when job ends

    module reset
    module load chemistry
    module load quantum-espresso/7.0

    cd $SCRATCH/qe_benchmarks
    cd AUSURF112

    srun pw.x -input ausurf.in -npool 2

    ```

In this example, the job will request 32 CPU cores on 2 nodes, 30 minutes of
run time, and will send an email notification when the job starts and when it
ends.

The job can be submitted with:

```bash
$ sbatch qe-bench_cpu.sbatch
```

### GPU version

#### Native

The GPU version can be loaded through the `quantum-espresso_gpu` module.

Using the same benchmark files as for the CPU version above, you can create a
job submissions script like this:

=== "qe-bench_gpu.sbatch"

    ```bash
    #!/bin/bash
    #SBATCH --partition=gpu          # partition to submit the job to
    #SBATCH --nodes=2                # number of nodes for the job
    #SBATCH --gpus-per-node=1        # number of GPUs per node
    #SBATCH --time=00:30:00          # total run time limit (HH:MM:SS)
    #SBATCH --mail-type=begin        # send email when job begins
    #SBATCH --mail-type=end          # send email when job ends

    module reset
    module load chemistry
    module load quantum-espresso_gpu/7.0

    cd $SCRATCH/qe_benchmarks
    cd AUSURF112

    srun pw.x -input ausurf.in -npool 2

    ```

In this example, the job will request 2 GPU on 2 nodes, 30 minutes of run time,
and will send an email notification when the job starts and when it ends.

It can be submitted with:

```bash
$ sbatch qe-bench_gpu.sbatch
```


#### NGC container

Another option to run a GPU version of Quantum Espresso is to use a 3rd-party
container.

The NVIDIA GPU Cloud ([NGC][url_ngc]) hosts a [Quantum Espresso
container][url_ngc_qe] container that could be used on Sherlock.

##### With Singularity

To use the container with Singularity, first pull the Quantum Espresso
container with:

```shell
$ cd $SCRATCH
$ singularity pull docker://nvcr.io/hpc/quantum_espresso:qe-7.0
```

Then create the following script:

=== "qe-bench_gpu_singularity.sbatch"
    ```
    #!/bin/bash
    #SBATCH --partition=gpu          # partition to submit the job to
    #SBATCH --nodes=2                # number of nodes for the job
    #SBATCH --gpus-per-node=1        # number of GPUs per node
    #SBATCH --mem=32GB               # memory per node
    #SBATCH --time=00:30:00          # total run time limit (HH:MM:SS)
    #SBATCH --mail-type=begin        # send email when job begins
    #SBATCH --mail-type=end          # send email when job ends

    cd $SCRATCH/qe_benchmarks
    cd AUSURF112

    srun singularity run --nv \
        $SCRATCH/quantum_espresso_qe-7.0.sif \
        pw.x -input ausurf.in -npool 2

    ```

and submit it:

```bash
$ sbatch qe-bench_gpu_singularity.sbatch
```

##### With pyxis/enroot

To use the container with pyxis/enroot, you can directly submit the following
script:

=== "qe-bench_gpu_enroot.sbatch"
    ```
    #!/bin/bash
    #SBATCH --partition=gpu          # partition to submit the job to
    #SBATCH --nodes=2                # number of nodes for the job
    #SBATCH --gpus-per-node=1        # number of GPUs per node
    #SBATCH --mem=32GB               # memory per node
    #SBATCH --time=00:30:00          # total run time limit (HH:MM:SS)
    #SBATCH --mail-type=begin        # send email when job begins
    #SBATCH --mail-type=end          # send email when job ends

    cd $SCRATCH/qe_benchmarks
    cd AUSURF112

    srun --container-image nvcr.io/hpc/quantum_espresso:qe-7.0 \
         --container-workdir $PWD \
         pw.x -input ausurf.in -npool 2
    ```

and submit it:

```bash
$ sbatch qe-bench_gpu_singularity.sbatch
```




[comment]: #  (link URLs -----------------------------------------------------)

[url_qe]:           //www.quantum-espresso.org
[url_qe_docs]:      //www.quantum-espresso.org/documentation/
[url_spof_qe]:      /docs/software/list/#quantum-espresso

[url_ngc]:          //ngc.nvidia.com
[url_ngc_qe]:       //ngc.nvidia.com/catalog/containers/hpc:quantum_espresso

[comment]: #  (footnotes -----------------------------------------------------)


--8<--- "includes/_acronyms.md"
