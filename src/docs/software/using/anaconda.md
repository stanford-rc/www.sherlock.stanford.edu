## Introduction

Anaconda is a Python/R distribution that aims to simplify package management
and deployment for scientific computing. Although it can have merits on
individual computers, it's often counter-productive on shared HPC systems like
Sherlock.

!!! danger "Avoid using Anaconda on Sherlock"

    We recommend **NOT** using Anaconda on Sherlock, and instead consider other
    options like virtual environments or containers.


## Why Anaconda should be avoided on Sherlock

Anaconda is widely used in several scientific domain like data science, AI/ML,
bioinformatics, and is often listed in some software documentation as the
recommended (if not only) way to install it

It is a useful solution for simplifying the management of Python and scientific
libraries on a personal computer. However, on highly-specialized HPC systems
like Sherlock, management of these libraries and dependencies should be done by
SRCC staff, to ensure compatibility and optimal performance on the cluster
hardware.

For instance:

* Anaconda very often installs software (compilers, scientific libraries etc.)
  which already exist on our Sherlock as [modules][url_modules], and does so in
  a sub-optimal fashion, by installing sub-optimal versions and configurations,
* It installs binaries which are not optimized for the processor architectures
  on Sherlock,
* it makes incorrect assumptions about the location of various system
  libraries,
* Anaconda installs software in `$HOME` by default, where it writes large
  amounts of files. A single Anaconda installation can easily fill up your
  `$HOME` directory quota, and makes things difficult to manage,
* Anaconda installations can't easily be relocated,
* Anaconda modifies your `$HOME/.bashrc` file, which can easily cause conflicts
  and slow things down when you log in.

Worse, a conda recipe can force the installation of `R` (even though it's
already [available][url_r] on Sherlock). This installation won't perform
nearly as well as the version we provide as a module (which uses optimized
libraries), or not at all, the jobs launched with it may crash and end up
wasting both computing resources and your time.


## What to do instead

### Use a virtual environment

Instead of using Anaconda for your project, or when the installation
instructions of the software you want to install are using it, you can use a
[virtual environment][url_venv].

A virtual environment offers all the functionality you need to use Python on
Sherlock. You can convert Anaconda instructions and use a virtual environment
instead, by following these steps:

1. list the dependencies (also called requirements) of the application you want
   to use:
    * check if there is a `requirements.txt` file in the Git repository or in
     the software sources,
    * or, check the variable `install_requires` of in the `setup.py` file, which
     lists the requirements.
2. find which dependencies are Python modules and which are libraries provided
by Anaconda. For example, `CUDA` and `CuDNN` are libraries that Anaconda can
install, but which should not be re-installed as they are already available as
modules on Sherlock,
3. remove from the list of dependencies everything which is not a Python module
(e.g. `cudatoolkit` and `cudnn`),
4. create a [virtual environment][url_venv] to install your dependencies.

And that's it: your software should run, without Anaconda. If you have any
issues, please don't hesitate to [contact us][url_contact].

### Use a container

In some situations, the complexity of a program's dependencies requires
the use of a solution where you can control the entire software environment. In
these situations, we recommend using a [container][url_container].

!!! tip

    Existing Docker images can easily be converted into Apptainer/Singularity
    images.

The only potential downside of using containers is their size and the
associated storage usage. But if your research group plans on using several
container images, it could be useful to collect them all in a single location
(like `$GROUP_HOME`) to avoid duplication.




[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:        /docs/oftware/list
[url_r]:              /docs/software/using/R
[url_venv]:           /docs/software/using/Python#virtual-environments
[url_container]:      /docs/software/containers

[url_contact]:        mailto:{{ support_email }}

[url_pypi]:           //pypi.org

--8<--- "includes/_acronyms.md"
