## Overview

Below is an overview for using Matlab on Sherlock.
1. Check to see if you are in the sw_matlab group with the id command
2. Purchase Matlab license and send srcc-support@stanford.edu cc'ing software@stanford.edu your receipt/license
3. module load and run Matlab


## Matlab Licensing on Sherlock

Matlab is available if your PI has purchased a license (approximately $70/user) for any group members that will run 
Matlab on Sherlock. 
In order to use Matlab we need to verify that your PI group has a current Matlab license either purchased from Stanford 
Software Licensing or Matworks directly.

To purchase from the Stanford Software Store go to: https://stanford.onthehub.com/WebStore/Welcome.aspx.  

After your purchase, contact us (srcc-support@stanford.edu) to request Matlab access and cc Stanford Software Licensing 
(software@stanford.edu ).  Include your license ID or receipt in the email. 

Once verified, we will add you to the sw_matlab group on Sherlock.  ***Note:*** your group may have already purchased a license.  
To see if you can run Matlab and are in this group type id in your Sherlock shell session: 

```
$ id
```
If you see **sw_matlab** you can run Matlab on Sherlock.
```
$uid=28622(yourSUNet) etc...98009(sw_matlab),99001(sh_users)
```
## Matlab Usage

The Matlab [module][url_modules] can be
loaded with:

```
$ ml load matlab
```

This will load the current default version.  For a list of available versions run `ml spider matlab` at the Sherlock
prompt, or refer to the [Software list page][url_software_list].



You will need to use Matlab on a dev or [compute node][url_node] and *not* a login node.  If you use it on a login node you will see:
```
-----------------------------------------------------------------------
 WARNING: running Matlab directly on login nodes is not supported.
 Please make sure you request an interactive session on a compute node
 with "sdev" for instance) before launching Matlab interactively.
-----------------------------------------------------------------------
```
Once you are on a dev or compute node and your environment is configured (_ie._ when the `matlab` module is loaded), Matlab
can be started by simply typing matlab at the shell prompt.  To get an interactive session:

```
$sdev
srun: job 59701124 queued and waiting for resources
srun: job 59701124 has been allocated resources
```
If you want an interactive node other than a dev node, for instance your PI's node or an idle node in the "owners" partition
use srun with "--pty bash" as the last 2 arguments:
```
srun -p <PI's partition name> --time=1:00:00 --pty bash
```

Note:  you can see what partitions you can run on and if your PI is an [owner][url_owners] and thus has a partition with the `sh_part` command.


Load the Matlab module:

```
$ml load matlab
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

#### Running a Matlab script

There are several ways to launch a Matlab script on the [command line][url_mathworks_cmd]:

| Method | Output |
| ------ | ------ |
| `matlab -nodesktop < script.m`| displayed on screen, on `stdout`, have Matlab run the code in script.m|
| ` matlab -nodisplay`| Start the JVM software without starting the MATLAB desktop. 
| ` matlab -nojvm`| do not start the JVM. 

More Matlab [options][url_matlab_options]

#### Matlab GUI

It's often best to use your laptop or desktop to develop, debug Matlab and  visualize the output.  If you do need to use
the Matlab GUI on a large cluster like Sherlock, you will need to use a standard ssh client such as the "Terminal" application on MacOS
or MobaXTerm on Windows and not Sherlock's [Sherlock onDemand][urlOpen onDemand] shell access app.
You will need to enable X11 forwarding by connecting to Sherlock with the **-X** option to the ssh command on your 
laptop/desktop and load the x11 module in the system module group, and of course Matlab:

```
ssh -X <YourSUNetID>@login.sherlock.stanford.edu
```

Once on Sherlock:

```
$ ml load matlab
$ ml load system x11
$ matlab
```

More info on [X11 forwarding][url_X11_forwarding].



#### Submitting a Matlab job

Here is an example Matlab batch script that is submitted with `sbatch`. 

```
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

This simple job, named "matlab_test" will [submit][url_submit] the Matlab script "example.m" to the scheduler, to the normal [partition][url_partition] 
for 10 minutes and use one [CPU][url_sbatch_CPU] and 8GB of RAM.  It will send you an email (to whatever email you used wen you signed up for Sherlock) 
when it begins, ends or fails.  

Additionally to aid in debugging, it will log any errors and output to the files matlab_test.JOBID.out/err with the job's SLURM job ID appended
to the filename (%j).  Note, there are **many** options and resources (CPUs, RAM, time) you can control within the 
[sbatch][url_sbatch_docs] script.

To create the sbatch scrip, open a [text editor][url_text_editor] on Sherlock, for example nano, vim, vi or the Sherlock onDemand File manager App 

```
$ nano matlab_test.sbatch
```

Save matlab_test.sbatch

Submit the job with the sbatch command:
```
$ sbatch matlab_test.sbatch
$ Submitted batch job 59942277
$
```


[comment]: #  (link URLs ----------------------------------------------------- )
[url_matlab_options]:     https://www.mathworks.com/help/matlab/matlab_env/startup-options.html
[url_sbatch_CPU]:        https://slurm.schedmd.com/cpu_management.html
[url_sbatch_docs]:      https://slurm.schedmd.com/sbatch.html
[url_mathworks_cmd]:     https://www.mathworks.com/help/matlab/ref/matlablinux.html
[url_X11_forwarding]:    https://uit.stanford.edu/service/sharedcomputing/moreX 
[urlOpen onDemand]:      https://login.sherlock.stanford.edu
[url_modules]:          /docs/software/modules
[url_software_list]:    /docs/software/list
[url_storage]:          /docs/storage
[url_gpu]:              /docs/user-guide/gpu
[url_text_editor]:      /docs/getting-started/prerequisites/#text-editors
[url_submit]:        /docs/getting-started/submitting/#batch-scripts
[url_node]:         /docs/user-guide/running-jobs/#compute-nodes
[url_owners]:      /docs/overview/concepts/#the-condominium-model
[url_partition]:    /docs/overview/glossary/#partition
