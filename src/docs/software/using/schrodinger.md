## Introduction

The [Schrödinger][url_schrodinger] suite is a commercial and licensed software
used to simulate and model molecular behavior at the atomic level.
The Schrödinger software tools include molecular dynamics simulations, quantum
mechanics calculations, virtual screening and visualization tools.

### More documentation

The following documentation specifically intended for using Schrödinger on
Sherlock. For more complete documentation about Schrödinger in general, please
contact [Schrödinger support][url_schrodinger_support].


## Schrödinger on Sherlock

### Licensing

[Stanford Libraries][url_sul] have purchased a site license for the Schrödinger
suite.  Please contact Stanford Libraries at sciencelibrary@stanford.edu and CC
{{ support_email }} if you would like to access Schrödinger on Sherlock: after
we receive confirmation, your PI group will be granted access on Sherlock.

### Using Schrödinger

You can use Schrödinger software after having loaded the corresponding
[software module][url_modules] with the `module` command. To load the current
default version:

```bash
module load chemistry schrodinger
```

To see all the available versions, you can use the `module spider` command:

```bash
$ module spider schrodinger
```

Once loaded, the `$SCHRODINGER` environment variable is automatically set to
allow all Schrödinger commands to run. For example, to run the `jaguar`
command:

```bash
$ jaguar run -WAIT H20.in
```

To call the basic Schrödinger `run` command, just enter:

```bash
$ run
```

or `glide`:

```bash
$ glide
usage: glide_startup.py [options] <input_file>
glide_startup.py: error: the following arguments are required: input_file
```


### Maestro GUI

!!! info "OnDemand shell sessions"

    Opening an X11/GUI session will not work in a [Sherlock
    OnDemand][url_ondemand_doc] terminal session. You will need to use the
    method mentioned below, i.e. a standard terminal session with an X11
    client.

To launch the Maestro GUI, once you have loaded the Schrödinger module, simply
run:

```bash
$ maestro
```

You'll need to enable X11 forwarding in your initial connection to Sherlock,
and request it as well for your job allocation.

Here are some example commands you can run:

```bash
# on your local machine
$ ssh -X login.sherlock.stanford.edu

# then from a Sherlock login node
$ sh_dev -m 16GB

# and finally on the allocated compute node:
$ ml load chemistry schrodinger
$ maestro
```

This will launch Maestro on a compute node and display its graphical user
interface on your local machine's display.

!!! warning "GUI performance"

    Please note that running graphical user interfaces (GUIs) over the network
    via X11 over SSH may not necessarily yield the best performance. Graphical
    analysis is often best done on a local machine, while intensive, batch
    scheduled computations are carried over on the cluster.


For more information about X11 forwarding, you can refer to this
[page][url_x11].


## Examples

### batch job submission

Here's an example [batch][url_sbatch] script, requesting 1 CPU, for 10 minutes
on the `normal` partition, that can be saved as `water.sbatch`:

```bash
#!/usr/bin/bash
#SBATCH -o water.%j.out
#SBATCH -e water.%j.err
#SBATCH -n 1
#SBATCH -t 10:00
#SBATCH -p normal

# Load required modules
module load chemistry schrodinger

# Run Schrödinger, -WAIT is often required
jaguar run -WAIT H20.in
```

Save this input file as `H2O.in`:

```none
&gen
&
&echo
&
&zmat
O       0.0000000000000   0.0000000000000  -0.1135016000000
H1      0.0000000000000   0.7531080000000   0.4540064000000
H2      0.0000000000000  -0.7531080000000   0.4540064000000
&
```

And you can submit the batch script with:

```bash
$ sbatch water.sbatch
```

After execution, you should find a `H20.out` output file in the current
directory, as well as a log file (`H20.log`). If you don't, you can check for
errors in the job output and error files: `water.<jobid>.{out,err}`.

[comment]: #  (link URLs -----------------------------------------------------)

[url_schrodinger]:          //www.schrodinger.com
[url_schrodinger_support]:  //support.schrodinger.com/s/
[url_sul]:                  //library.stanford.edu/
[url_x11]:                  //uit.stanford.edu/service/sharedcomputing/moreX

[url_modules]:              /docs/software/modules
[url_sbatch]:               /docs/user-guide/running-jobs/#batch-jobs
[url_ondemand_doc]:         /docs/user-guide/ondemand/
