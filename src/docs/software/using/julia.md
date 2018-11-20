## Introduction

[Julia][url_julia] is a high-level general-purpose dynamic programming language
that was originally designed to address the needs of high-performance numerical
analysis and computational science, without the typical need of separate
compilation to be fast, also usable for client and server web use, low-level
systems programming or as a specification language. Julia aims to create an
unprecedented combination of ease-of-use, power, and efficiency in a single
language.

### More documentation

The following documentation is specifically intended for using Julia on Sherlock.
For more complete documentation about Julia in general, please see the [Julia
documentation][url_julia_docs].

## Julia on Sherlock

Julia is available on Sherlock and the corresponding [module][url_modules] can
be loaded with:

```
$ ml julia
```

For a list of available versions, you can execute `ml spider julia` at the
Sherlock prompt, or refer to the [Software list page][url_software_list].


### Using Julia

Once your environment is configured (_ie._ when the `julia` module is loaded),
julia can be started by simply typing julia at the shell prompt:

```
$ julia

_
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.0.0 (2018-08-08)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |

julia>
```

For a listing of command line options:

```
$ julia --help

julia [switches] -- [programfile] [args...]
 -v, --version             Display version information
 -h, --help                Print this message

 -J, --sysimage <file>     Start up with the given system image file
 -H, --home <dir>          Set location of `julia` executable
 --startup-file={yes|no}   Load `~/.julia/config/startup.jl`
 --handle-signals={yes|no} Enable or disable Julia's default signal handlers
 --sysimage-native-code={yes|no}
                           Use native code from system image if available
 --compiled-modules={yes|no}
                           Enable or disable incremental precompilation of modules

 -e, --eval <expr>         Evaluate <expr>
 -E, --print <expr>        Evaluate <expr> and display the result
 -L, --load <file>         Load <file> immediately on all processors

 -p, --procs {N|auto}      Integer value N launches N additional local worker processes
                           "auto" launches as many workers as the number
                           of local CPU threads (logical cores)
 --machine-file <file>     Run processes on hosts listed in <file>

 -i                        Interactive mode; REPL runs and isinteractive() is true
 -q, --quiet               Quiet startup: no banner, suppress REPL warnings

```

#### Running a Julia script

A Julia program is easy to run on the command line outside of its interactive
mode.

Here is an example where we create a simple [Hello World][url_helloworld]
program and launch it with Julia

```
$ echo 'println("hello world")' > helloworld.jl
```


That script can now simply be executed by calling `julia <script_name>`:

```
$ julia helloworld.jl
hello world
```

#### Submitting a Julia job

Here's an example Julia sbatch script that can be submitted via `sbatch`:

```bash tab="julia_test.sbatch"
#!/bin/bash

#SBATCH --time=00:10:00
#SBATCH --mem=4G
#SBATCH --output=julia_test.log

# load the module
ml julia

# run the Julia application
srun julia helloworld.jl
```

You can save this script as `julia_test.sbatch` and submit it to the scheduler
with:

```
$ sbatch julia_test.sbatch
```

Once the job is done, you should get a `julia_test.log` file in the current
directory, with the following contents:

```
$ cat julia_test.log
hello world
```


### Julia packages

Julia provides an ever-growing list of [packages][url_julia_pkgs] that can be
used to install add-on functionality to your Julia code.

Installing packages with Julia is very simple. Julia includes a package module
in its base installation that handles installing, updating, and removing
packages.

First import the `Pkg` module:

```
julia> import Pkg
julia> Pkg.status()
    Status `~/.julia/environments/v1.0/Project.toml`
```

!!! tip "Julia packages only need to be installed once"

    You only need to install Julia packages once on Sherlock. Since fielsystems
    are shared, packages installed on one node will immediately be available on
    all nodes on the cluster.

#### Installing packages

You can first check the status of packages installed on Julia using the status
function of the `Pkg` module:

```
julia> Pkg.status()
No packages installed.
```

You can then add packages using the add function of the `Pkg` module:

```
julia> Pkg.add("Distributions")
INFO: Cloning cache of Distributions from git://github.com/JuliaStats/Distributions.jl.git
INFO: Cloning cache of NumericExtensions from git://github.com/lindahua/NumericExtensions.jl.git
INFO: Cloning cache of Stats from git://github.com/JuliaStats/Stats.jl.git
INFO: Installing Distributions v0.2.7
INFO: Installing NumericExtensions v0.2.17
INFO: Installing Stats v0.2.6
INFO: REQUIRE updated.
```

Using the status function again, you can see that the package and its
dependencies have been installed:

```
julia> Pkg.status()
Required packages:
 - Distributions                 0.2.7
Additional packages:
 - NumericExtensions             0.2.17
 - Stats                         0.2.6
```

#### Updating Packages

The update function of the `Pkg` module can update all packages installed:

```
julia> Pkg.update()
INFO: Updating METADATA...
INFO: Computing changes...
INFO: Upgrading Distributions: v0.2.8 => v0.2.10
INFO: Upgrading Stats: v0.2.7 => v0.2.8
```
#### Removing packages

The remove function of the `Pkg` module can remove any packages installed as
well:

```
julia> Pkg.rm("Distributions")
INFO: Removing Distributions v0.2.7
INFO: Removing Stats v0.2.6
INFO: Removing NumericExtensions v0.2.17
INFO: REQUIRE updated.

julia> Pkg.status()
Required packages:
 - SHA                           0.3.2

julia> Pkg.rm("SHA")
INFO: Removing SHA v0.3.2
INFO: REQUIRE updated.

julia> Pkg.status()
No packages installed.
```

Working with packages in Julia is simple!


### Examples

Julia can natively spawn parallel workers across multiple compute nodes,
without using MPI. There are two main modes of operation:

1. ClusterManager: in this mode, you can spawn workers from within the Julia
   interpreter, and each worker will actually submit jobs to the scheduler,
   executing instructions within those jobs.

2. using the `--machine-file` option: here, you submit a SLURM job and run the
   Julia interpreter in parallel mode within the job's resources.

The second mode is easier to use, and more convenient, since you have all your
resources available and ready to use when the job starts. In mode 1, you'll
need to wait for jobs to be dispatched and executed inside Julia.

Here is a quick example on how to use the `--machine-file` option on
Sherlock.

Given following Julia script (`julia_parallel_test.jl`) that will print a line
with the process id and the node it's executing on, in parallel:

```
@everywhere println("process: $(myid()) on host $(gethostname())")
```

You can submit the following job:

```bash tab="julia_test.sbatch"
#!/bin/bash
#SBATCH --nodes 2
#SBATCH --ntasks-per-node 4
#SBATCH --time 5:0

ml julia
julia --machine-file <(srun hostname -s)  ./julia_parallel_test.jl
```

Save as `julia_test.sbatch`, and then:

```
$ sbatch  julia_test.sbatch
```

It will:

  1. Request 2 nodes, 4 tasks per node (8 tasks total)
  2. load the `julia` module
  3. Run Julia in parallel with a machine file that is automatically generated,
     listing the nodes that are assigned to your job.

It should output something like this in your job's output file:

```
process: 1 on host sh-06-33.int
      From worker 2:    process: 2 on host sh-06-33.int
      From worker 3:    process: 3 on host sh-06-34.int
      From worker 5:    process: 5 on host sh-06-33.int
      From worker 4:    process: 4 on host sh-06-33.int
      From worker 6:    process: 6 on host sh-06-33.int
      From worker 8:    process: 8 on host sh-06-34.int
      From worker 9:    process: 9 on host sh-06-34.int
      From worker 7:    process: 7 on host sh-06-34.int
```


[comment]: #  (link URLs -----------------------------------------------------)
[url_julia]:        http://julialang.org/
[url_julia_docs]:   https://docs.julialang.org/
[url_julia_pkgs]:   https://pkg.julialang.org/

[url_helloworld]:   https://en.wikipedia.org/wiki/%22Hello,_World!%22_program
[url_modules]:      /docs/software/modules
[url_software_list]:/docs/software/list
