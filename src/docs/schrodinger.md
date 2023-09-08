## Introduction

The [Schrodinger][url_schro] software suite is used to simulate and model molecular behavior at the atomic level.  Schrodinger's software tools include molecular dynamics simulations, quantum mechanics calculations, virtual screening and visualization tools.

Stanford Libraries has purchased a site license for the Schrodinger suite.  Please contact Stanford Libraries: sciencelibrary@stanford.edu cc'ing srcc-support@stanford.edu if you would like to access Schrodinger on Sherlock.  After we receive confirmation, 
we will add your faculty sponsor (PI) to the sh_sw-schrodinger Sherlock group.

## Schrodinger on Sherlock

Schrodinger software is loaded with the module command.  To load the current default version:

```bash
module load chemistry schrodinger
```

To see all of our versions use the module spider command:

```bash
$ module spider schrodinger
```

Once loaded your $SCHRODINGER variable is automatically set and all Schrodinger commands will run.  For example to run the jaguar command:

```bash
$ jaguar run  -WAIT H20.in
```

To call the basic Schrodinger run command, just enter:

```bash
$ run
```

or glide:
​
```bash
$ glide
usage: glide_startup.py [options] <input_file>
glide_startup.py: error: the following arguments are required: input_file
```

## Example batch submission

Sample [sbatch][url_sbatch] script, requesting 1 CPU, for 10 minutes on the normal partition with default memory:

```bash
#!/usr/bin/bash
#SBATCH -o water.%j.out
#SBATCH -e water.%j.err
#SBATCH -n 1
#SBATCH -t 10:00
#SBATCH -p normal
# Load required modules
module load chemistry schrodinger
# Run Schrodinger, -WAIT is often required
jaguar run -WAIT H20.in
```

Input file:

```
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

Save as H2O.in


Submit the sbatch script:
```bash
$ sbatch water.sbatch
```

## Maestro GUI


For maestro, once you load the Schrodinger module simply call the Maestro GUI with:

$ maestro


If you are using a Mac, open the Terminal App and ssh with the -X option:

```bash
ssh -X <YourSuNetID>@login.sherlock.stanford.edu
sh_dev -m 16GB
ml load chemistry schrodinger
maestro &
```
This will launch the Maestro graphical user interface in the background in an sh_dev session with 16GB of memory.  


!!! warning GUI's
Please be aware that GUIs run over a network and X11 can be quite slow and the HPC environment is not best for GUI analysis, it's more ideal for large scale batch job submission and computation.  


If you are using a Windows desktop/laptop you will need to use an X11 client like MobaXterm or Xming, see [X11][url_X11] at Stanford for more information.

!!! warning OnDemand shell sessions
Note that opening an X11/GUI session will not work in a Sherlock OnDemand terminal session.  You will need to use the methods mentioned above, i.e. a standard terminal session with an X11 client.


[comment]: #  (link URLs -----------------------------------------------------)

[url_schro]:  //www.schrodinger.com/
[url_X11]:  //uit.stanford.edu/service/sharedcomputing/moreX
[url_sbatch]:      //docs/user-guide/running-jobs/#batch-jobs
[url_support]:          mailto:{{ support_email }}
[comment]: #  (footnotes -----------------------------------------------------)
