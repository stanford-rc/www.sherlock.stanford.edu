## Overview

[MATLAB][url_matlab] (_matrix laboratory_) is a multi-paradigm numerical
computing environment and proprietary programming language developed by
[MathWorks][url_mathworks]. MATLAB allows matrix manipulations, plotting of
functions and data, implementation of algorithms, creation of user interfaces,
and interfacing with programs written in other languages.

Below is an overview of the steps for using MATLAB on Sherlock.

   1. check to see if you can load the `matlab` module,
   2. if you can't, please see the first section below,
   3. load the module, and run `matlab`


## MATLAB Licensing on Sherlock

MATLAB is a commercial software suite, which requires users to purchase a
license before they can use it. **Groups are responsible for procuring their
own licenses to use on Sherlock.**

MATLAB is licensed at the group-level on Sherlock. Meaning that all the members
of an authorized group will get access to MATLAB.

!!! tip "How many licenses should a group purchase?"

    We usually recommend groups to purchase as many licenses as they will have
    users running MATLAB on Sherlock.

MATLAB licenses can be purchased through [Stanford Software
Licensing][url_software] by visiting:
https://stanford.onthehub.com/WebStore/Welcome.aspx.

After your purchase, you can [contact us][url_contact] to request MATLAB
access. Please CC Stanford Software Licensing (software@stanford.edu), and
include your license ID or receipt in the email, for verification.

Once we get approval from the Software License team, all the members of your
group will be granted access to MATLAB on Sherlock.

### Verifying access

When you've been granted access to MATLAB, you will be able to load the
`matlab` module with the following command:
```
$ ml matlab
```
If this command produces an error emssage, please [contact us][url_contact].



## MATLAB Usage

Once your group has been granted access, the MATLAB [module][url_modules] can
be loaded with:

```
$ ml load matlab
```

This will load the current default version. For a list of available versions
run `ml spider matlab` at the Sherlock prompt, or refer to the [Software list
page][url_software_list].


Running MATLAB directly on login nodes is not supported and will produce the
following message:
```
-----------------------------------------------------------------------
 WARNING: running MATLAB directly on login nodes is not supported.
 Please make sure you request an interactive session on a compute node
 with "sdev" for instance) before launching MATLAB interactively.
-----------------------------------------------------------------------
```

You will need to [submit a job][url_submit] or request an [interactive
session][url_interactive] on a [compute node][url_node] before you can start
MATLAB.

Once you are on a compute node and your environment is configured (_ie._ when
the `matlab` module is loaded), MATLAB can be started by simply typing `matlab`
at the shell prompt.

```
$ sdev
$ ml load matlab
$ matlab
MATLAB is selecting SOFTWARE OPENGL rendering.
                          < M A T L A B (R) >
                Copyright 1984-2019 The MathWorks, Inc.
                R2019a (9.6.0.1072779) 64-bit (glnxa64)
                             March 8, 2019

To get started, type doc.
For product information, visit www.mathworks.com.

>>
```

For a listing of command line options:

```
$ matlab -help
```

#### Running a MATLAB script

There are several ways to launch a MATLAB script on the command line, as
documented in the [MATLAB documentation][url_matlab_cmd]:

| Method | Output |
| ------ | ------ |
| `matlab -nodesktop < script.m` | MATLAB will run the code from `script.m` and display output on `stdout` |
| `matlab -nodisplay`| Start MATLAB in CLI mode, without its graphical desktop environment |
| `matlab -nojvm`| do not start the JVM[^JVM] |


#### MATLAB GUI

It's often best to use your laptop or desktop to develop, debug MATLAB and
visualize the output. If you do need to use the MATLAB GUI on a large cluster
like Sherlock, you will need to enable X11 forwarding in your [SSH
client][url_ssh_client].

For instance:

```
$ ssh -X <YourSUNetID>@login.sherlock.stanford.edu
```

And then, once on Sherlock:

```
$ ml load matlab
$ matlab
```

For more info on X11 forwarding, you can refer to this [UIT page][url_X11_UIT].



#### Submitting a MATLAB job

Here is an example MATLAB batch script that can submitted with `sbatch`:

```shell
#!/bin/bash
#SBATCH --job-name=matlab_test
#SBATCH --output=matlab_test."%j".out
#SBATCH --error=matlab_test."%j".err
#SBATCH --partition=normal
#SBATCH --time=00:10:00
#SBATCH --cpus-per-task=1
#SBATCH --mem=8GB
#SBATCH --mail-type=ALL

module load matlab
matlab -nodisplay < example.m
```

This simple job, named `matlab_test` will run a MATLAB script named `example.m`
in the `normal` [partition][url_partition], for a duration of 10 minutes, and
use 1 [CPU][url_sbatch_CPU] and 8GB of RAM.  It will send you an email (to
whatever email you used wen you signed up for Sherlock) when it begins, ends or
fails.

Additionally, to aid in debugging, it will log any errors and output to the
files `matlab_test.JOBID.{out,err}` with the jobid appended to the
filename (`%j`).  Note, there are **many** options and resources (CPUs, RAM,
time) you can control within the [sbatch][url_sbatch_docs] script.

To create the script, open a [text editor][url_text_editor] on Sherlock, copy
the contents of the script, and save it as `matlab_test.sbatch`

Then, submit the job with the `sbatch` command:
```
$ sbatch matlab_test.sbatch
Submitted batch job 59942277
```

You can check the status of the job with the [`squeue`][url_squeue] command,
and check the contents of the `matlab_test.JOBID.{out,err}` files to see the
results.



[comment]: #  (link URLs ----------------------------------------------------- )

[url_matlab]:           https://www.mathworks.com/matlab
[url_mathworks]:        https://www.mathworks.com/
[url_matilab_cmd]:      https://www.mathworks.com/help/matlab/ref/matlablinux.html
[url_matlab_options]:   https://www.mathworks.com/help/matlab/matlab_env/startup-options.html
[url_software]:         https://uit.stanford.edu/service/softwarelic
[url_X11_UIT]:          https://uit.stanford.edu/service/sharedcomputing/moreX
[url_contact]:          srcc-support@stanford.edu
[url_submit]:           /docs/getting-started/submitting/#batch-scripts
[url_node]:             /docs/user-guide/running-jobs/#compute-nodes
[url_interactive]:      /docs/user-guide/running-jobs/#interactive-jobs
[url_ssh_client]:       /docs/getting-started/prerequisites/#ssh-clients
[url_sbatch_CPU]:       https://slurm.schedmd.com/cpu_management.html
[url_sbatch_docs]:      https://slurm.schedmd.com/sbatch.html
[url_modules]:          /docs/software/modules
[url_software_list]:    /docs/software/list
[url_text_editor]:      /docs/getting-started/prerequisites/#text-editors
[url_partition]:        /docs/overview/glossary/#partition
[url_squeue]:           /docs/getting-started/submitting/#check-the-job


[comment]: #  (footnotes -----------------------------------------------------)

[^JVM]: MATLAB uses the Java® Virtual Machine (JVM™) software to run the
  desktop and to display graphics. The `-nojvm` option enables you to start
  MATLAB without the JVM. Using this option minimizes memory usage and improves
  initial start-up speed, but restricts functionality.
