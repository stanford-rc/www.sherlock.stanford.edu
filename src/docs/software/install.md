---
tags:
    - software
---

If the software package or version you need is not available in the [list of
provided software][url_sw_list], you may compile and install it yourself. The
recommended location for user-installed software is `$GROUP_HOME`, the [group
shared directory][url_grp_home]: it benefits from hourly snapshots and off-site
replication, and can easily be shared with members of a research group.

!!! danger "Login nodes are not for compiling"

    Compiling software can be resource-intensive and must not be done on login
    nodes, which are shared among all users. Use a compute node, for instance
    via the [`sh_dev`][url_sh_dev] command.


## Loading build dependencies

Sherlock provides compilers, MPI libraries, and other development tools as
[modules][url_modules]. Before compiling, load the modules that provide the
compiler and any libraries your software depends on (its *build dependencies*),
so the build system can detect them automatically.

The `system` module category provides compilers and low-level tools. To see
what is available:

``` none
$ ml system
$ ml avail
```

For instance, to load the [GCC][url_module_gcc] compiler:

``` none { .copy .select }
$ ml system gcc/14.2.0
```

!!! tip "Load all dependencies before building"

    If the software you are compiling requires external libraries (BLAS, MPI,
    HDF5, etc.), load the corresponding modules before starting the build.
    The module system will set the necessary environment variables (`CFLAGS`,
    `LDFLAGS`, `PKG_CONFIG_PATH`, etc.) automatically, so the build system can
    detect them.


## Building from source

Most open-source software is distributed as source code and must be compiled
before use. The build process is driven by a *build system*, which describes
how to compile the code and where to install it. The most common ones you will
encounter are described below.

### Installation prefix

Most build systems use a *prefix* to determine where files will be installed.
Use a path under `$GROUP_HOME` to make your installation persistent and shared:

``` none { .copy .select }
$ export PREFIX=$GROUP_HOME/$USER/software/<package>-<version>
$ mkdir -p $PREFIX
```

Then pass this prefix to the build system as shown in the sections below.

!!! warning "Always specify a prefix when installing"

    Without an explicit prefix, most build systems will default to
    system-wide paths like `/usr/local`, which will fail with permission
    errors on Sherlock. Even if a writable default exists (like `/tmp`),
    it would only be local to the node where the build ran and unavailable
    to any other node or job. Software must be installed on a [shared
    filesystem][url_grp_home] to be usable across Sherlock.


### Build systems

The build system describes how to compile the code and where to install it.
The most common ones you will encounter are described below.

#### GNU Make

Some projects ship a handwritten `Makefile` without any configure step. This
is the simplest possible build system: the prefix is passed directly on the
`make` command line. `make` is available on all nodes without loading any
module:

``` shell { .copy .select }
$ make -j $(nproc) PREFIX=$PREFIX
$ make install PREFIX=$PREFIX
```

Check the project's `README` or `Makefile` for the exact variable name, as
it varies (`PREFIX`, `DESTDIR`, `INSTALL_DIR`, etc.).


#### Autotools

[Autotools][url_autotools] (also known as the GNU Build System) is the
traditional build system used by many open-source packages. It typically uses a
`configure` script to detect the environment and generate `Makefile`s.

The typical workflow is:

``` shell { .copy .select }
$ ./configure --prefix=$PREFIX
$ make -j $(nproc)
$ make install
```

Where `$(nproc)` uses all available CPU cores to parallelize the build.

If the source comes with a `configure.ac` file but no `configure` script, you
first need to generate it:

``` shell { .copy .select }
$ autoreconf -fi
$ ./configure --prefix=$PREFIX
$ make -j $(nproc)
$ make install
```

!!! tip "Checking available options"

    Most packages support a range of `configure` options. Run `./configure
    --help` to see all available options, including flags to enable or disable
    optional features and to point to external libraries.


#### CMake

[CMake][url_cmake] is a cross-platform build system generator widely used in
modern projects. It generates build files from a `CMakeLists.txt` file.

Load `cmake` after all the other dependency modules, so it can detect them
properly:

``` none { .copy .select }
$ ml system gcc/14.2.0 hdf5/1.14.0
$ ml cmake/3.28.0
```

The typical workflow is:

``` shell { .copy .select }
$ mkdir build && cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX=$PREFIX -DCMAKE_BUILD_TYPE=Release
$ make -j $(nproc)
$ make install
```

Out-of-source builds (in a separate `build/` directory) are recommended: they
keep the source tree clean and make it easy to rebuild from scratch.

!!! tip "Checking available options"

    Run `cmake -LAH ..` from the build directory to list all available
    variables and their current values, including descriptions.


#### Meson

[Meson][url_meson] is a modern build system increasingly adopted by scientific
and system software projects (Mesa, GLib, HDF5, etc.) as a faster alternative
to Autotools. It drives [Ninja][url_ninja] to perform the actual compilation.

Load `meson` and `ninja` after all dependency modules:

``` none { .copy .select }
$ ml system gcc/14.2.0
$ ml meson/1.4.0 ninja/1.11.1
```

The typical workflow is:

``` shell { .copy .select }
$ meson setup build --prefix=$PREFIX
$ ninja -C build -j $(nproc)
$ ninja -C build install
```

!!! tip "Checking available options"

    Run `meson configure build` after setup to list all available options and
    their current values.


## Using your software

Once software is installed in `$PREFIX`, you need to make it available in your
environment. The simplest approach is to update the relevant environment
variables directly, for instance in your `~/.bashrc` or at the top of your
batch scripts:

``` shell { .copy .select }
export PATH=$PREFIX/bin:$PATH
export LD_LIBRARY_PATH=$PREFIX/lib:$LD_LIBRARY_PATH
export MANPATH=$PREFIX/share/man:$MANPATH
```

!!! tip "Write a module file instead"

    Manually setting environment variables works, but it's fragile: it can
    easily conflict with other software, is hard to manage across multiple
    installations, and doesn't compose well with the module system. The
    recommended approach is to write a [Lmod][url_lmod] module file for your
    installation instead. This lets you (and your group members) load it with
    the standard `ml` command, just like any other software on Sherlock, with
    all environment variables set and unset cleanly and automatically.

### Writing a module file

Lmod uses [Lua][url_lua]-based module files. Create a directory structure for
your modules, for instance in `$GROUP_HOME/modules`:

``` none { .copy .select }
$ mkdir -p $GROUP_HOME/modules/<package>
```

Then create a module file at
`$GROUP_HOME/modules/<package>/<version>.lua`:

``` lua { title="$GROUP_HOME/modules/myapp/1.0.lua" .copy .select }
whatis("Name:        myapp")
whatis("Version:     1.0")
whatis("Description: My custom application")

local prefix = "/home/groups/<group>/software/myapp-1.0"

prepend_path("PATH",            pathJoin(prefix, "bin"))
prepend_path("LD_LIBRARY_PATH", pathJoin(prefix, "lib"))
prepend_path("MANPATH",         pathJoin(prefix, "share/man"))
```

Replace `/home/groups/<group>/software/myapp-1.0` with the actual path to your
installation.

### Enabling your module repository

To make your modules loadable with `ml`, add your module directory to the
`MODULEPATH` in your `~/.bashrc`:

``` shell { .copy .select }
export MODULEPATH=$GROUP_HOME/modules:$MODULEPATH
```

After sourcing your `~/.bashrc` (or opening a new shell), your module will be
available:

``` none
$ ml myapp/1.0
```

### Sharing with the Sherlock community

If your group would like to share your modules with all Sherlock users, please
[contact us][url_contact] to get your module repository added to the `contribs`
category. See the [Modules page][url_modules_contribs] for more details about
contributed modules.


## Package managers

For Python and other interpreted languages, the installation model is different:
rather than compiling from source, packages are installed via dedicated package
managers that handle compilation and dependency resolution automatically.

See the [Python page][url_python] for full details, including:

* installing packages with [`pip`][url_pip_install]
* creating isolated environments with [`venv`][url_venv]
* using [`uv`][url_uv] for faster dependency management

!!! danger "Avoid Anaconda/Conda on Sherlock"

    Anaconda and Conda are generally not recommended on Sherlock: they install
    sub-optimal software, write large amounts of files to `$HOME`, and can
    conflict with the module system. See the [Anaconda page][url_anaconda] for
    the full rationale and alternatives.


## Containers

For software that is difficult to compile, has complex system dependencies, or
requires a specific OS environment, using a container image is often simpler
than building from source. [Apptainer][url_apptainer] and [Enroot][url_enroot]
are available on Sherlock and can run images from Docker Hub or other
registries directly on compute
nodes, without any installation step.

See the [Containers page][url_containers] for details.


## Getting help with installations

Build failures often come down to missing dependencies, incompatible flags, or
environment issues that are tedious to debug by hand. [AI coding
agents][url_coding_agents] available on Sherlock can help: point one at a
build error or a failed `configure` run and ask it to diagnose the problem,
suggest fixes, or adjust the build flags. They work directly in the terminal
and can read log files, inspect the environment, and propose commands to try.
This makes them a practical first step before [opening a support ticket][url_contact].


[comment]: #  (link URLs -----------------------------------------------------)

[url_sw_list]:          list.md
[url_module_gcc]:       list.md#gcc
[url_contact]:          mailto:{{support_email}}
[url_grp_home]:         ../storage/filesystems.md#group_home
[url_modules]:          modules.md
[url_modules_contribs]: modules.md#contributed-software
[url_sh_dev]:           ../user-guide/running-jobs.md#interactive-jobs
[url_autotools]:        //www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html
[url_cmake]:            //cmake.org
[url_meson]:            //mesonbuild.com
[url_ninja]:            //ninja-build.org
[url_lmod]:             //lmod.readthedocs.io
[url_lua]:              //www.lua.org

[url_python]:           using/python.md
[url_pip_install]:      using/python.md#installing-packages
[url_venv]:             using/python.md#virtual-environments
[url_uv]:               using/python.md#using-uv
[url_anaconda]:         using/anaconda.md
[url_coding_agents]:    ai/coding-agents.md
[url_containers]:       containers/index.md
[url_apptainer]:        containers/apptainer.md
[url_enroot]:           containers/enroot.md


--8<--- "includes/_acronyms.md"
