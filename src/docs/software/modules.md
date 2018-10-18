## Environment modules

Software is provided on Sherlock under the form of loadable *environment
modules*.

!!! tldr "Software is only accessible via modules"

    The use of a module system means that most software is not accessible by
    default and has to be loaded using the `module` command. This mechanism
    allows us to provide multiple versions of the same software concurrently,
    and gives users the possibility to easily switch between software versions.

Sherlock uses [Lmod][url_lmod] to manage software installations. The modules
system helps setting up the user's shell environment to give access to
applications, and make running and compiling software easier. It also allows us
to provide multiple versions of the same software, that would otherwise
conflict with each other, and abstract things from the OS sometimes rigid
versions and dependencies.

When you first log into Sherlock, you'll be presented with a default, bare bone
environment with minimal software available. The module system is used to
manage the user environment and to *activate* software packages on demand.
In order to use software installed on Sherlock, you must first load the
corresponding software module.

When you load a module, the system will set or modify your user environment
variables to enable access to the software package provided by that module. For
instance, the `$PATH` environment variable might be updated so that appropriate
executables for that package can be used.


## Module categories

Modules on Sherlock are organized by scientific field, in distinct categories.
This is to limit the information overload that can result when displaying the
full list of available modules. Given the large diversity of the Sherlock user
population,  all users are not be interested in the same kind of software, and
high-energy physicists may not want to see their screens cluttered with the
latest bioinformatics packages.

!!! summary "Module categories"

    You will first have to load a category module before getting access to
    individual modules. The `math` and `devel` categories are loaded by
    default, and modules in those categories can be loaded directly

For instance, to be able to load the `gromacs` module, you'll first need to
load the `chemistry` module. This can be done in a single command, by
specifying first the category, then the actual application module name:
```
$ module load chemistry gromacs
```

The `math` and `devel` categories, which are loaded by default, provide direct
access to compilers, languages, and MPI and numerical libraries.

For a complete list of software odule categories, please refer to the [list of
available software][url_list]

!!! tip "Searching for a module"

    To know how to access a module, you can use the `module spider
    <module_name>` command. It will search through all the installed modules,
    even if they're masked, and display instructions to load them. See the
    [Examples](#examples) section for details.




## Module usage

The most common `module` commands are outlined in the following table.
`module` commands may be shortened with the `ml` alias, with slightly different
semantics.

!!! tip "Module names auto-completion"

    The `module` command supports auto-completion, so you can just start typing
    the name of a module, and press ++tab++ to let the shell automatically
    complete the module name and/or version.

| Module\ command | Short\ version | Description    |
| --------------- | -------------- | -------------- |
| `module avail` | `ml av` | List\ available\ software[^missing_mod] |
| `module spider gromacs` | `ml spider gromacs` | Search for particular software|
| `module keyword blas` | `ml key blas` | Search for `blas` in module names and descriptions|
| `module whatis gcc` | `ml whatis gcc` | Display information about the `gcc` module |
| `module help gcc` | `ml help gcc` | Display module specific help |
| `module load gcc` | `ml gcc` | Load a module to use the associated software |
| `module load gsl/2.3` | `ml gsl/2.3` | Load specific version of a module |
| `module unload gcc` | `ml -gcc` | Unload a module |
| `module swap gcc icc` |  `ml -gcc icc` | Swap a module (unload `gcc` and replace it with `icc`) |
| `module purge` | `ml purge` | Remove all modules[^sticky_mod]
| `module save foo` | `ml save foo` | Save the state of all loaded modules in a collection named `foo` |
| `module restore foo` | `ml restore foo` | Restore the state of saved modules from the `foo` collection |

Additional module sub-commands are documented in the `module help` command. For
complete reference, please refer to the [official Lmod
documentation][url_lmod_user].


### Module properties

!!! important "Multiple versions"

    When multiple versions of the same module exist, `module` will load the one
    marked as `Default (D)`. For the sake of reproducibility, we recommend
    always specifying the module version you want to load, as defaults may
    evolve over time.

To quickly see some of the modules characteristics, `module avail` will display
colored property attributes next to the module names. The main module
properties are:

* `S`: Module is sticky, requires `--force` to unload or purge
* `L`: Indicate currently loaded module
* `D`: Default module that will be loaded when multiple versions are available
* `r`: Restricted access, typically software under license.  [Contact
  us][url_contact] for details
* `g`: GPU-accelerated software, will only run on GPU nodes
* `m`: Software supports parallel execution using MPI


### Searching for modules

You can search through all the available modules for either:

* a module name (if you already know it), using `module spider`
* any string within modules names and descriptions, using `module keyword`

For instance, if you want to know how to load the `gromacs` module, you can do:
```
$ module spider gromacs
```

If you don't know the module name, or want to list all the modules that contain
a specific string of characters in their name or description, you can use
`module keyword`. For instance, the following command will list all the modules
providing a BLAS library:
```
$ module keyword blas
```


### Examples

#### Listing

To list all the modules that can be loaded, you can do:

```
$ ml av

-- math -- numerical libraries, statistics, deep-learning, computer science ---
   R/3.4.0             gsl/1.16             openblas/0.2.19
   cudnn/5.1  (g)      gsl/2.3       (D)    py-scipystack/1.0_py27 (D)
   cudnn/6.0  (g,D)    imkl/2017.u2         py-scipystack/1.0_py36
   fftw/3.3.6          matlab/R2017a (r)

------------------ devel -- compilers, MPI, languages, libs -------------------
   boost/1.64.0          icc/2017.u2           python/2.7.13    (D)
   cmake/3.8.1           ifort/2017.u2         python/3.6.1
   cuda/8.0.61    (g)    impi/2017.u2   (m)    scons/2.5.1_py27 (D)
   eigen/3.3.3           java/1.8.0_131        scons/2.5.1_py36
   gcc/6.3.0      (D)    julia/0.5.1           sqlite/3.18.0
   gcc/7.1.0             llvm/4.0.0            tbb/2017.u2
   h5utils/1.12.1        nccl/1.3.4     (g)    tcltk/8.6.6
   hdf5/1.10.0p1         openmpi/2.0.2  (m)

-------------- categories -- load to make more modules available --------------
   biology      devel (S,L)    physics    system
   chemistry    math  (S,L)    staging    viz

  Where:
   S:  Module is Sticky, requires --force to unload or purge
   r:  Restricted access
   g:  GPU support
   L:  Module is loaded
   m:  MPI support
   D:  Default Module

Use "module spider" to find all possible modules.
Use "module keyword key1 key2 ..." to search for all possible modules matching
any of the "keys".
```

#### Searching

To search for a specific string in modules names and descriptions, you can run:

```
$ module keyword numpy
---------------------------------------------------------------------------

The following modules match your search criteria: "numpy"
---------------------------------------------------------------------------

  py-scipystack: py-scipystack/1.0_py27, py-scipystack/1.0_py36
    The SciPy Stack is a collection of open source software for scientific
    computing in Python. It provides the following packages: numpy, scipy,
    matplotlib, ipython, jupyter, pandas, sympy and nose.

---------------------------------------------------------------------------
[...]
$ ml key compiler
---------------------------------------------------------------------------

The following modules match your search criteria: "compiler"
---------------------------------------------------------------------------

  cmake: cmake/3.8.1
    CMake is an extensible, open-source system that manages the build
    process in an operating system and in a compiler-independent manner.

  gcc: gcc/6.3.0, gcc/7.1.0
    The GNU Compiler Collection includes front ends for C, C++, Fortran,
    Java, and Go, as well as libraries for these languages (libstdc++,
    libgcj,...).

  icc: icc/2017.u2
    Intel C++ Compiler, also known as icc or icl, is a group of C and C++
    compilers from Intel

  ifort: ifort/2017.u2
    Intel Fortran Compiler, also known as ifort, is a group of Fortran
    compilers from Intel

  llvm: llvm/4.0.0
    The LLVM Project is a collection of modular and reusable compiler and
    toolchain technologies. Clang is an LLVM native C/C++/Objective-C
    compiler,

---------------------------------------------------------------------------
```
To get information about a specific module, especially how to load it, the
following command can be used:
```
$ module spider gromacs

-------------------------------------------------------------------------------
  gromacs: gromacs/2016.3
-------------------------------------------------------------------------------
    Description:
      GROMACS is a versatile package to perform molecular dynamics, i.e.
      simulate the Newtonian equations of motion for systems with hundreds to
      millions of particles.

    Properties:
      GPU support      MPI support

    You will need to load all module(s) on any one of the lines below before
    the "gromacs/2016.3" module is available to load.

      chemistry
```

#### Loading

Loading a category module allows to get access to field-specific software:

```
$ ml chemistry
$ ml av

------------- chemistry -- quantum chemistry, molecular dynamics --------------
   gromacs/2016.3 (g,m)    vasp/5.4.1 (g,r,m)

-- math -- numerical libraries, statistics, deep-learning, computer science ---
   R/3.4.0             gsl/1.16             openblas/0.2.19
   cudnn/5.1  (g)      gsl/2.3       (D)    py-scipystack/1.0_py27 (D)
   cudnn/6.0  (g,D)    imkl/2017.u2         py-scipystack/1.0_py36
   fftw/3.3.6          matlab/R2017a (r)

------------------ devel -- compilers, MPI, languages, libs -------------------
   boost/1.64.0          icc/2017.u2           python/2.7.13    (D)
   cmake/3.8.1           ifort/2017.u2         python/3.6.1
   cuda/8.0.61    (g)    impi/2017.u2   (m)    scons/2.5.1_py27 (D)
   eigen/3.3.3           java/1.8.0_131        scons/2.5.1_py36
   gcc/6.3.0      (D)    julia/0.5.1           sqlite/3.18.0
   gcc/7.1.0             llvm/4.0.0            tbb/2017.u2
   h5utils/1.12.1        nccl/1.3.4     (g)    tcltk/8.6.6
   hdf5/1.10.0p1         openmpi/2.0.2  (m)

-------------- categories -- load to make more modules available --------------
   biology          devel (S,L)    physics    system
   chemistry (L)    math  (S,L)    staging    viz

[...]
```
### Reseting the modules environment

If you want to reset your modules environment as it was when you initially
connected to Sherlock, you can use the `ml reset` command: it will remove all
the modules you have loaded, and restore the original state where only the
`math` and `devel` categories are accessible.

If you want to remove *all* modules from your environment, including the
default `math` and `devel` modules, you can use `ml --force purge`.

### Loading modules in jobs

In order for an application running in a Slurm job to have access to any
necessary module-provided software packages, we recommend loading those modules
in the job script directly. Since Slurm propagates all user environment
variables by default, this is not strictly necessary, as jobs will inherit the
modules loaded at submission time. But to make sure things are reproducible and
avoid issues, it is preferable to explicitly load the modules in the batch
scripts.

`module load` commands should be placed right after `#SBATCH` directives and
before the actual executable calls. For instance:

```bash
#!/bin/bash
#SBATCH ...
#SBATCH ...
#SBATCH ...

ml reset
ml load gromacs/2016.3

srun gmx_mpi ...
```

## Custom modules

Users are welcome and encouraged to build and install their own software on
Sherlock. To that end, and to facilitate usage or sharing of their custom
software installations, they can create their own module repositories.

See the [Software Installation page][url_install] for more details.

### Lab-provided software

PI groups and Labs can share their software installations and modules with the
whole Sherlock community of users, and let everyone benefit from their tuning
efforts and software developments.

Those modules are available in the specific `labs` category, and organized by
lab name.

For instance, listing the available lab modules can be done with:

```
$ ml labs
$ ml av
-------------------- labs -- lab-contributed software ----------------------
   poldrack
```

To get information about a specific lab module:

```
$ ml show poldrack
----------------------------------------------------------------------------
   /share/software/modules/labs/poldrack.lua:
----------------------------------------------------------------------------
prepend_path("MODULEPATH","/home/groups/russpold/modules")
whatis("Name:        poldrack")
whatis("Version:     1.0")
whatis("Category:    labs")
whatis("URL:         https://github.com/poldracklab/lmod_modules")
whatis("Description: Software modules contributed by the Poldrack Lab.")
```

And to list the available software modules contributed by the lab:

```
$ ml poldrack
$ ml av

------------------------ /home/groups/russpold/modules -------------------------
   afni/17.3.03           freesurfer/6.0.1            gsl/2.3      (D)
   anaconda/5.0.0-py36    fsl/5.0.9                   pigz/2.4
   ants/2.1.0.post710     fsl/5.0.11           (D)    remora/1.8.2
   c3d/1.1.0              git-annex/6.20171109        xft/2.3.2
[...]
```


[comment]: #  (link URLs -----------------------------------------------------)

[url_lmod]:         //lmod.readthedocs.io
[url_lmod_user]:    //lmod.readthedocs.io/en/latest/010_user.html
[url_list]:         list
[url_install]:      /docs/software/install
[url_contact]:      mailto:srcc-support@stanford.edu


[comment]: #  (footnotes -----------------------------------------------------)

[^missing_mod]: If a module is not listed here, it might be unavailable in the
  loaded modules categories, and require loading another category module.
  Search for not-listed software using the `module spider` command.

[^sticky_mod]: The `math` and `devel` category modules will not be unloaded
  with `module purge` as they are "sticky". If a user wants to unload a sticky
  module, they must specify the `--force` option.


