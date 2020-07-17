## Introduction

[MATLAB][url_matlab] is a numerical computing environment and proprietary
programming language developed by [MathWorks][url_mathworks].

### More documentation

The following documentation is specifically intended for using Matlab on
Sherlock. For more complete documentation about Matlab in general, please see
the official [MATLAB documentation][url_matlab_doc].

## MATLAB on Sherlock

### Licensing

MATLAB is a commercial software suite, which requires users to purchase a
license before they can use it. MATLAB is licensed at the group-level on
Sherlock, meaning that once a group is granted access to the software, all the
members of the authorized group will get access to MATLAB.

!!! warning "Groups are responsible for procuring their own licenses"

    MATLAB licenses[^lic_num] can be purchased through [Stanford Software
    Licensing][url_software] by visiting the following link:
    https://stanford.onthehub.com/WebStore/Welcome.aspx.

    After your purchase, you can [contact us][url_contact] to request MATLAB
    access. Please CC Stanford Software Licensing (software@stanford.edu), and
    include your license ID or receipt in the email, for verification. Once we
    get approval from the Software License team, all the members of your group
    will be granted access to MATLAB on Sherlock.


> **Note**: a number of free, open-source alternatives exist and can be used
in many situations: [Octave][url_octave], [R][url_R], [Julia][url_julia], or
[Python][url_python] are all available on Sherlock, and can often replace
MATLAB with good results.


### Using MATLAB

Once your group has been granted access, the MATLAB [module][url_modules] can
be loaded with:

```
$ ml load matlab
```

This will load the current default version. For a list of available versions
run `ml spider matlab` at the Sherlock prompt, or refer to the [Software list
page][url_software_list].


!!! danger "MATLAB can't run on login nodes"

    Running MATLAB directly on login nodes is not supported and will produce
    the following message:
    ```
    -----------------------------------------------------------------------
    WARNING: running MATLAB directly on login nodes is not supported.  Please
    make sure you request an interactive session on a compute node with "sdev"
    for instance) before launching MATLAB interactively.
    -----------------------------------------------------------------------
    ```
    You will need to [submit a job][url_submit] or request an [interactive
    session][url_interactive] on a [compute node][url_node] before you can
    start MATLAB.

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
$ sdev
$ ml load matlab
$ matlab
```

For more info on X11 forwarding, you can refer to this [UIT page][url_X11_UIT].



### Examples

#### Simple MATLAB job

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
use 1 [CPU][url_cpu] and 8GB of RAM.  It will send you an email (to
whatever email you used wen you signed up for Sherlock) when it begins, ends or
fails.

Additionally, to aid in debugging, it will log any errors and output to the
files `matlab_test.JOBID.{out,err}` with the jobid appended to the
filename (`%j`).

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


#### Parallel loop

You can run your MATLAB code across multiple CPUs on Sherlock using
[`parfor`][url_parfor] loops, to take advantage of the multiple CPU cores that
each node features. You can submit a job requesting as many CPUs as there are
on a node in a single job.  The key is to grab the [SLURM environment
variable][url_SLURM_ENV] `$SLURM_CPUS_PER_TASK` and create the worker pool in
your MATLAB code with:

```matlab
parpool('local', str2num(getenv('SLURM_CPUS_PER_TASK')))
```

Here is an example of a `sbatch` submission script that requests 16 CPUs on a
node, and runs a simple MATLAB script using `parfor`.

Save the two scripts below as `parfor.sbatch` and `parfor.m`:

=== `parfor.sbatch`
```bash
#!/bin/bash
#SBATCH -J pfor_matlab
#SBATCH -o pfor".%j".out
#SBATCH -e pfor".%j".err
#SBATCH -t 20:00
#SBATCH -p normal
#SBATCH -c 16
#SBATCH --mail-type=ALL

module load matlab
matlab -nosplash -nodesktop -r parfor.m
```

=== `parfor.m`
```matlab
%============================================================================
% Parallel Monte Carlo calculation of PI
%============================================================================
parpool('local', str2num(getenv('SLURM_CPUS_PER_TASK')))
R = 1;
darts = 1e7;
count = 0;
tic
parfor i = 1:darts
   % Compute the X and Y coordinates of where the dart hit the...............
   % square using Uniform distribution.......................................
   x = R*rand(1);
   y = R*rand(1);
   if x^2 + y^2 <= R^2
      % Increment the count of darts that fell inside of the.................
      % circle...............................................................
     count = count + 1; % Count is a reduction variable.
   end
end
% Compute pi.................................................................
myPI = 4*count/darts;
T = toc;
fprintf('The computed value of pi is %8.7f.n',myPI);
fprintf('The parallel Monte-Carlo method is executed in %8.2f seconds.n', T);
delete(gcp);
exit;
```


You can now submit the job with the following command:
```bash
sbatch parfor.sbatch
```

If you run `htop` or `pstree -u $USER` on the compute node that is running your
job, you will see all 16 cores allocated to your MATLAB code.

You can also try that same job with different numbers of CPUs, and see how well
it scales.

[comment]: #  (link URLs ----------------------------------------------------- )

[url_matlab]:           //www.mathworks.com/matlab
[url_mathworks]:        //www.mathworks.com/
[url_matlab_cmd]:       //www.mathworks.com/help/matlab/ref/matlablinux.html
[url_matlab_doc]:       //www.mathworks.com/help/matlab/
[url_matlab_options]:   //www.mathworks.com/help/matlab/matlab_env/startup-options.html
[url_software]:         //uit.stanford.edu/service/softwarelic
[url_X11_UIT]:          //uit.stanford.edu/service/sharedcomputing/moreX
[url_octave]:           //www.gnu.org/software/octave/

[url_contact]:          mailto:srcc-support@stanford.edu

[url_R]:                /docs/software/using/R
[url_julia]:            /docs/software/using/julia
[url_python]:           /docs/software/using/python
[url_submit]:           /docs/getting-started/submitting/#batch-scripts
[url_node]:             /docs/user-guide/running-jobs/#compute-nodes
[url_interactive]:      /docs/user-guide/running-jobs/#interactive-jobs
[url_ssh_client]:       /docs/getting-started/prerequisites/#ssh-clients
[url_modules]:          /docs/software/modules
[url_software_list]:    /docs/software/list
[url_text_editor]:      /docs/getting-started/prerequisites/#text-editors
[url_partition]:        /docs/overview/glossary/#partition
[url_cpu]:              /docs/overview/glossary/#cpu
[url_squeue]:           /docs/getting-started/submitting/#check-the-job
[url_parfor]:           https://www.mathworks.com/help/parallel-computing/parfor.html
[url_SLURM_ENV]:        https://slurm.schedmd.com/sbatch.html#lbAJ



[comment]: #  (footnotes -----------------------------------------------------)

[^lic_num]: We usually recommend groups to purchase as many licenses as groups
  will have users running MATLAB on Sherlock.

[^JVM]: MATLAB uses the Java® Virtual Machine (JVM™) software to run the
  desktop and to display graphics. The `-nojvm` option enables you to start
  MATLAB without the JVM. Using this option minimizes memory usage and improves
  initial start-up speed, but restricts functionality.


--8<--- "_acronyms.md"
