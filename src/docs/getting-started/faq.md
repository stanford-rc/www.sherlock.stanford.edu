## General

 - [How do I cite Sherlock in my research publications and presentations?](#how-do-i-cite-sherlock-in-my-publications-and-talks)

## Getting Started

 - [How do I become a Sherlock user?](#how-do-i-become-a-sherlock-user)
 - [How do I access Sherlock?](#how-do-i-access-sherlock)
 - [How do I request access to a PI’s account if I already have an account on Sherlock?](#how-do-i-request-access-to-a-pis-account-if-i-already-have-an-account-on-sherlock)
 - [What is my Sherlock username and password?](#what-is-my-sherlock-username-and-password)
 - [Can an external (non Stanford) collaborator get a SUNetID so they can log in to Sherlock?](#can-an-external-collaborator-get-a-sunetid-so-they-can-log-in-to-sherlock)
 - [What do I do if I left Stanford and my SUNetID password no longer works?](#what-do-i-do-if-i-left-stanford-and-my-sunetid-password-no-longer-works)
 - [How do I change/reset my password?](#how-do-i-changereset-my-password)
 - [What PI groups am I a member of?](#what-groups-am-i-a-member-of)
 - [How do I access the HIVE - The HANA Immersive Visualization Environment?](#how-do-i-access-the-hive-the-hana-immersive-visualization-environment)
 - [What login shells are supported and how do I change my default shell?](#what-login-shells-are-supported-and-how-do-i-change-my-default-shell)
 - [Is SSH key authentication allowed on Sherlock machines?](#is-ssh-key-authentication-allowed-on-sherlock-machines)
 - [Why is SSH key authentication not working even though I’ve added my public key to $HOME/.ssh/authorized_keys?](#why-is-ssh-key-authentication-not-working-even-though-ive-added-my-public-key-to-homesshauthorized_keys)
 - [Why am I getting “ssh_exchange_identification: read: Connection reset by peer” when I try to log in via SSH ?](#why-am-i-getting-ssh_exchange_identification-read-connection-reset-by-peer-when-i-try-to-log-in-via-ssh)

## Software

 - [What software is installed on Sherlock?](#what-software-does-sherlock-offer)
 - [How do I use the modules utility?](#how-do-i-use-the-modules-utility)
 - [How do I get help with Sherlock software?](#how-do-i-get-help-with-sherlock-software)
 - [Why is command XXX not available?](#why-is-command-xxx-not-available)
 - [Why do I get an error that says a module cannot be loaded due to a conflict?](#why-do-i-get-an-error-that-says-a-module-cannot-be-loaded-due-to-a-conflict)
 - [How do I request installation of a new or updated software?](#how-do-i-request-installation-of-a-new-or-updated-software)
 - [Why do all module commands in my scripts fail with "module command not found?"?](#why-do-all-module-commands-in-my-scripts-fail-with-module-command-not-found)

## Cluster Usage

 - [How do I submit a job to the queue?](#how-do-i-submit-a-job-to-the-queue)
 - [Can I login directly to a compute node?](#can-i-login-directly-to-a-compute-node)
 - [How do I run a set of jobs in parallel?](#how-do-i-run-a-set-of-jobs-in-parallel)
 - [What are the queue limits?](#what-are-the-queue-limits)
 - [Why isn’t my job starting?](#why-isnt-my-job-starting)
 - [Why does my job fail after a couple of seconds?](#why-does-my-job-fail-after-a-couple-of-seconds)
 - [Why does my job fail with “exceeded memory limit, being killed”?](#why-does-my-job-fail-with-exceeded-memory-limit-being-killed)
 - [Why does my sinteractive job fail with “Connection to <host> closed.”?](#why-does-my-sinteractive-job-fail-with-connection-to-closed)
 - [How do I get the maximum wall time for my jobs increased?](#how-do-i-get-the-maximum-wall-time-for-my-jobs-increased)
 - [Can I create a cron job?](#can-i-create-a-cron-job)

## Performance and Coding

 - [What compilers does Sherlock support?](#what-compilers-does-sherlock-support)
 - [Which versions of MPI does Sherlock support?](#which-versions-of-mpi-does-sherlock-support)
 - [Can Sherlock help me parallelize and optimize my code?](#can-sherlock-help-me-parallelize-and-optimize-my-code)
 - [Does Sherlock provide GPU computing resources?](#does-sherlock-provide-gpu-computing-resources)

## File I/O, Storage, and Transfers

 - [How much storage space have I used / do I have access to?](#how-much-storage-space-have-i-used-do-i-have-access-to)
 - [How do I get my storage quota increased?](#how-do-i-get-my-storage-quota-increased)
 - [How do I share files?](#how-do-i-share-files)
 - [I accidentally deleted/corrupted a file, how do I restore it?](#i-accidentally-deletedcorrupted-a-file-how-do-i-restore-it)
 - [How do I request a restore of my files from tape backup?](#how-do-i-request-a-restore-of-my-files-from-tape-backup)

## General

### How do I cite Sherlock in my publications and talks?

Citations and acknowledgements help demonstrate the impact of HPC resources and support staff in research at Stanford. We ask that an acknowledgment be given to Sherlock in any publications, presentations, or talks that were made possible by Sherlock/SRCC. Please reference the Sherlock as “The Stanford Research Computing Center” in citations and acknowledgements. Acceptable example citations are below.

*   This work was completed in part with resources provided by the Sherlock Cluster and the Stanford Research Computing Center.
*   We are grateful for the support of the Stanford Research Computing Center for assistance with the calculations carried out in this work.
*   We acknowledge the Stanford Research Computing Center for support of this work.

If you cite or acknowledge Sherlock in your work, please let us know SRCC by sending a brief email to [ressearch-computing-support<span>@</span>stanford<span>.</span>stanford<span>.</span>edu](mailto:research-computing-support%40.stanford.edu)

### How do I become a Sherlock user?

To request an account, the sponsoring Stanford faculty member should email [**research-computing-support@stanford.edu**](mailto:research-computing-support@stanford.edu) specifying the names and SUNetIDs (usernames) of his/her research team members needing an account. Sherlock is open to the Stanford community as a computing resource to support departmental or sponsored research, thus a faculty member's explicit consent is required for account requests. Note that Sherlock is not a platform for course work, class assignments or general-use training sessions.


### How do I access Sherlock?

There are various ways to access Sherlock

 * To access Sherlock interactively, most people use SSH. 
 * If you want to access files stored on Sherlock, it is possible to use scp, Globus Online, and Samba (Windows file shares).

Before you can login to Sherlock, you need to [request an account](/docs/getting-started/prerequisites/#how-to-request-an-account), 
and then setup Kerberos on your laptop/desktop. Complete instructions are included 
[in the connecting documentation pages](/docs/getting-started/connecting/).

### How do I request access to a PI’s account if I already have an account on Sherlock?

Please submit a User Account Request and provide both your [SUNetID](https://uit.stanford.edu/service/accounts/sunetids) and the PI Account (the PI's SUNetID).

### What is my Sherlock username and password?

Sherlock uses Stanford University SUNetIDs for user credentials. When your Sherlock account is created, your Sherlock username/password will be the same as your SUNetID credentials.

### Can an external collaborator get a SUNetID so they can log in to Sherlock?

Yes. Your PI can request base SUNetIDs for external collaborators as necessary. See [SUNetID Account Request](https://accounts.stanford.edu/create?execution=e1s1) for more information.

### What do I do if I left Stanford and my SUNetID password no longer works?

It should be possible to use your SUNetID for authentication indefinitely, but IT services may expire it when you leave. If you have an Sherlock account, but you still can’t log in, it is likely that password authentication has been disabled by IT services. Contact [research-computing-support@<span>.</span>stanford<span>.</span>edu](mailto:research-computing-support%40stanford.edu) if you believe your account should be reinstated.

### How do I change/reset my password?

We cannot change or reset your password. Go to the [SUNetID Password Recovery](https://uit.stanford.edu/service/accounts/passwords) page to change or reset your password.


### What groups am I a member of?

To list the groups you are a member of, type `groups`.

### How do I access the HIVE- The HANA Immersive Visualization Environment?

The HIVE  visualization equipment can be reserved for events, classes, or visualization work by contacting research-computing-support@stanford.edu. More information on the HIVE visualization facility can be found on the [HIVE](https://icme.stanford.edu/resources/hive) webpage.


### What login shells are supported and how do I change my default shell?

Sherlock supports the following shells:

 *  **/bin/bash**
 *  **/bin/tcsh**
 *  **/bin/zsh**

Use this command to change your shell:

```bash
$ chsh -s /path/to/shell
```

It may take up to 30 minutes for that change to become active.


### Is SSH key authentication allowed on Sherlock machines?

SSH key pair authentication is allowed on Sherlock. Sherlock recommends using passphrase-protected private keys in combination with an SSH agent on your client machine for security. Add your public key to `$HOME/.ssh/authorized_keys` on Sherlock to allow access from your machine.


### Why is SSH key authentication not working even though I’ve added my public key to $HOME/.ssh/authorized_keys?

The default umask on Sherlock can cause an issue with SSH key authentication. Use this command to correct the permissions if there are problems using key-based authentication:

```bash
$ chmod -R g-w ~/.ssh
```

### Why am I getting “ssh_exchange_identification: read: Connection reset by peer” when I try to log in via SSH?

You can get this error if your account was just added and you try to login too many times before the account is fully provisioned or you incorrectly enter your password too many times. This is done to limit the ability for malicious users to use brute force SSH attacks against our systems. The limits for an invalid user is 5 failed login attempts and for a valid user entering a bad password is 10 failed login attempts. If these limits are exceeded, an IP address block will be added and will remain active for 4 hours. If necessary, contact Sherlock support and we can remove the block earlier.

## Software

### What software does Sherlock offer?

Software available within the Sherlock environment is continuously changing and we often add new software and versions of existing software. Information about available software and how to use specific software pacakges can be found in the [Software](/docs/software/overview/) section of this manual.

To view the the current list of installed software, log in to any Sherlock system and use the command:

```bash
$ module avail
```

To view software versions available for a specific piece of software use this command:

```bash
$ module avail <software>
```

### How do I use the modules utility?

The module system can be accessed by entering `module` on the command line. More information can also be found in the [Software](/docs/software/overview/) section of the User Guide.

### How do I get help with Sherlock software?

The primary resource for any software is the official documentation and manual which can be accessed by issuing the following command:

```bash
$ man <command>
```

Sherlock also maintains supplementary documentation for issues specific to our systems, including basic usage and customizations. Consult the [Software](/docs/software/overview/) page for more information.

### Why is command XXX not available?

You probably have not loaded the appropriate software module. To use most software packages, you must first load the appropriate software module. See [Software](/docs/software/overview/) for more information on how to use pre-installed software on Sherlock.


### Why do I get an error that says a module cannot be loaded due to a conflict?

Some modules are incompatible with each other and cannot be loaded simultaneously. This is especially true for software that provides the same commands, such as MPI implementations which all provide `mpirun` and `mpiexec` commands.

The module command typically gives you a hint about which module conflicts with the one you are trying to load. If you see such an error you will need to remove the previously loaded module with the command:


```bash
$ module unload <name>
```

### How do I request installation of a new or updated software?

Send email to [research-computing-support<span>@</span>stanford<span>.</span>edu](mailto:research-computing-support%40stanford.edu) with the details of your software request including what software package you need, which version, and any optional dependencies you require.

### Why do all module commands in my scripts fail with "module command not found?"?

Depending on your shell or working environment, it is possible that the module setup commands aren’t run. To correct this you need to source the appropriate shell startup scripts in your script.

*   For bash/sh/zsh add `source /etc/profile`
*   For tcsh add `. /etc/csh.cshrc`

## Cluster Usage

### How do I submit a job to the queue?

Sherlock uses [Slurm](http://slurm.schedmd.com) to manage resources and job queues. For more information on how to run specific types of jobs consult the [Running Jobs on Sherlock](/docs/getting-started/submitting/) section of this manual.

### Can I login directly to a compute node?

You may obtain a shell on a compute node through the utility `sdev`. This command takes the same arguments as `sbatch`. More information about interactive jobs is aviablable here: [Interactive Jobs](/docs/user-guide/running-jobs/#interactive-jobs)

### How do I run a set of jobs in parallel?

There are a variety of methods for configuring parallel jobs based on the software package and resource requirements. Two commonly used approaches are [Parallel Batch Jobs](/docs/getting-started/faq/#batch-scripts) and [Job Arrays](https://ask.cyberinfrastructure.org/t/what-are-good-uses-for-job-arrays/733).

### What are the queue limits?

Run `accounts qos` on Sherlock to view the current limits.

You can see your default account with this command:

```bash
$ sacctmgr list user $USER
```

### Why isn’t my job starting?

There are a number of reasons that your job may be sitting in the queue. The output of the command `<span class="pre">squeue</span>` typically will help determine why your job is not running. Look at the **NODELIST(REASON)**. A pending job may have these reasons:

 * **(Priority)**: Other jobs have priority over your job.
 * **(Resources)**: Your job has enough priority to run, but there aren’t enough free resources to run it.
 * **(QOSResourceLimit)**: Your job exceeds the QOS limits. The QOS limits include wall time, number of jobs a user can have running at once, number of nodes a user can use at once, etc. This may or may no be a permanent status. If your job requests a wall time greater than what is allowed or exceeds the limit on the number of nodes a single job can use, this status will be permanent. However, your job may be in this status if you currently have jobs running and the total number of jobs running or aggregate node usage is at your limits. In this case, jobs in this state will become eligible when your existing jobs finish.

Please contact Sherlock support if you feel that your job is not being properly queued.

!!! Warning

    If you see a large number of jobs aren’t running when resources are idle, We may have an upcoming maintenance window. Your job may be 
    requesting a wall time which will overlap with this maintenance window . This will cause the job to stay in the queue until after 
    maintenance is performed. We notify users via email both prior to performing maintenance and after the maintenance is completed.

### Why does my job fail after a couple of seconds?

There is most likely a problem in your job submission script (ex: the program you are attempting to run cannot be found by a compute node), or the program you are attempting to run is producing an error and terminating prematurely.

If you require further assistance troubleshooting the problem, send your submission script and output from your job to [research-computing-support<span>@</span>stanford<span>.</span>edu](mailto:research-computing-support%40stanford.edu).

### Why does my job fail with “exceeded memory limit, being killed"?

By default, SLURM allocates 2GB of memory per CPU core being used in a job. This follows from the fact most Sherlock nodes contain 16 cores and 32GB of memory. If your job requires more than the default amount of memory per core, you must include the `--mem-per-cpu=<MB>` in your sbatch job script. For example, to use 16 CPU cores and 256GB of memory on a bigmem node the required sbatch flags would be: `--ntasks=16 --cpus-per-task=1 --mem-per-cpu=16000`

### Why does my sinteractive job fail with "Connection to <host> closed."?

There are 2 likely possibilities for this error. The first problem could be that you are over the time limit. The default timeout for sinteractive is 2 hours. This can be increased with the `--time=<timespec>` option.

The second possiblity is that your job exceeded the memory limit. You will need to request additional memory with the `--mem-per-cpu=<MB>` option. See the above question above for more details.

### How do I get the maximum wall time for my jobs increased?

The Sherlock queuing system attempts to provide fair and balanced resource allocation to all Sherlock users. The maximum wall time per job exists to prevent individual users from using more than their fair share of cluster resources.

If your particular job requires an extraordinary amount of wall time, please submit a special request for resources to [research-computing-support<span>@</span>stanford<span>.</span>edu](mailto:research-computing-support%40stanford.edu).

### Can I create a cron job?

Yes, with the standard [cron](http://man7.org/linux/man-pages/man8/cron.8.html) command.

## Performance and Coding

### What compilers does Sherlock support?

Sherlock supports the GNU, Intel Composer, and PGI compiler suites.

### Which versions of MPI does Sherlock support?

Sherlock maintains builds of OpenMPI, IntelMPI, and MVAPICH2 for supported compilers. See [this GitHub tutorial](https://github.com/akkornel/mpi4py) for a nice introduction to MPI.

### Can Sherlock help me parallelize and optimize my code?

Support staff is available to consult with your research team to help parallelize and optimize your code for use on Sherlock. Contact Sherlock staff at [research-computing-support<span>@</span>stanford<span>.</span>edu](mailto:research-computing-support%40stanford.edu) to arrange a consultation.

### Does Sherlock provide GPU computing resources?

Yes. Sherlock maintains a number of GPU-equipped compute nodes. For details on how to submit jobs to the GPU nodes see [GPU Nodes](/docs/user-guide/gpu/).

## File I/O, Storage, and Transfers

### How much storage space have I used / do I have access to?

Use the `quota` command to list your current usage and available storage, and the custom [sh_quota](/docs/storage/filesystems/#checking-quota-usage) command for more details.

### How do I get my storage quota increased?

We now offer resonably priced Sherlock storage with Oak.  See our [Oak page](/docs/storage/filesystems/#oak) for more info.

### How do I share files?

Please see [Data Sharing](/docs/storage/data-sharing/).

Using your group’s `/project` directory is the preferred way to share data amongst group members. Project directories are created for all PI and project accounts. The default permissions restrict access to the project group account, but permissions can be customized to allow access to other users.

### I accidentally deleted/corrupted a file, how do I restore it?

The best way to recover a deleted/corrupted file is from a snapshot. More information about snapshots is availabe here: [Data Protection](/docs/storage/data-protection/).

### How do I request a restore of my files from tape backup?

Sherlock maintains a tape backup of all home and project directories, but only for disaster recovery purposes. There is no long term history of files on tape. You should use file system snapshots to retrieve a previous version of a file or directory. See [Data Protection](/docs/storage/data-protection/) for more information.
