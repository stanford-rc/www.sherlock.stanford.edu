---
tags:
    - software
---

## Introduction

[Enroot][url_enroot] is a container runtime developed by NVIDIA that runs
Docker and OCI container images in unprivileged user space, without requiring
root access or a daemon. It converts container images into unprivileged
sandboxes that can be started like regular processes.

[Pyxis][url_pyxis] is a companion Slurm plugin, also developed by NVIDIA,
that integrates Enroot directly into `srun` and `sbatch`. Together, they allow
running containers as native Slurm job steps, without any manual image
management.

### More documentation

The following documentation is specifically intended for using Enroot and
Pyxis on Sherlock. For more complete documentation, please refer to the
[Enroot][url_enroot] and [Pyxis][url_pyxis] documentation on GitHub.


## Enroot on Sherlock

Enroot and Pyxis are available on Sherlock and work alongside
[Apptainer][url_apptainer] as an alternative container solution. They are
particularly well-suited for workflows that rely on images from [Docker
Hub][url_dockerhub] or the [NVIDIA GPU Cloud (NGC)][url_ngc].

### Importing images

The first step is to import a container image using `enroot import`. This
converts a Docker/OCI image into a squash filesystem (`.sqsh`) file:

``` none
$ enroot import docker://debian:12
```

To import an image from the NVIDIA GPU Cloud:

``` none
$ enroot import docker://nvcr.io/nvidia/pytorch:24.01-py3
```

Images are saved as `.sqsh` files in the current directory by default. For
better performance, store them in `$SCRATCH` or `$GROUP_SCRATCH`.

### Creating containers

Once you have a `.sqsh` file, create a container from it:

``` none
$ enroot create debian+12.sqsh
```

This unpacks the image into a container root filesystem stored under
`$ENROOT_DATA_PATH`. You can list your containers with `enroot list` and
remove them with `enroot remove <name>`.

### Running containers

Start an interactive session in a container:

``` none
$ enroot start debian+12
```

To run a specific command:

``` none
$ enroot start debian+12 python3 my_script.py
```

!!! note "Sherlock filesystems are automatically mounted"

    All Sherlock [filesystems][url_filesystems] (`$HOME`, `$GROUP_HOME`,
    `$SCRATCH`, `$GROUP_SCRATCH`, `$L_SCRATCH`, and `$OAK` if applicable) are
    automatically mounted inside the container and accessible at their usual
    paths.

If a container expects data at a specific path, you can remap a directory
using `--mount`. For example, to make `$SCRATCH/mydata` available as `/data`
inside the container:

``` none
$ enroot start --mount $SCRATCH/mydata:/data debian+12
```


### Using Pyxis with Slurm

Pyxis handles image importing and container creation automatically, so you
don't need to run `enroot import` or `enroot create` manually. You can specify
a container image directly in your `srun` or `sbatch` commands:

``` shell
$ srun --container-image ./debian+12.sqsh python3 my_script.py
```

Or reference an image directly from Docker Hub (Pyxis will import it
automatically on first use):

``` shell
$ srun --container-image docker://debian:12 python3 my_script.py
```

Standard Sherlock filesystems are automatically mounted inside the container.
To mount additional paths, use `--container-mounts` with a comma-separated
list of `host:container` pairs:

``` shell
$ srun --container-image ./debian+12.sqsh \
       --container-mounts /path/on/host:/path/in/container \
       python3 my_script.py
```

!!! tip "Caching imported images"

    When referencing a Docker Hub image directly with `--container-image
    docker://...`, Pyxis imports and caches it automatically on first use.
    Subsequent jobs reuse the cached image, avoiding redundant downloads. The
    cache is stored under `$SCRATCH/.enroot` by default.


#### Example batch script

``` shell
#!/bin/bash
#SBATCH --partition=normal
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=1:00:00

srun --container-image $SCRATCH/debian+12.sqsh \
     python3 my_script.py
```



[comment]: #  (link URLs -----------------------------------------------------)

[url_enroot]:       //github.com/NVIDIA/enroot
[url_pyxis]:        //github.com/NVIDIA/pyxis
[url_dockerhub]:    //hub.docker.com/
[url_ngc]:          //catalog.ngc.nvidia.com/

[url_apptainer]:    apptainer.md
[url_filesystems]:  ../../storage/filesystems.md
