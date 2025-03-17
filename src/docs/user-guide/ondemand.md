## Introduction

The Sherlock OnDemand interface allows you to conduct your research on Sherlock
through a web browser. You can manage files (create, edit and move them),
submit and monitor your jobs, see their output, check the status of the job
queue, run a Jupyter notebook and much more, without logging in to Sherlock the
traditional way, via a SSH terminal connection.

!!! quote

    In neuroimaging there are a number of software pipelines that output HTML
    reports heavy on images files. Sherlock OnDemand allows users to check
    those as they appear on their `$SCRATCH` folder, for quick quality control,
    instead of having to mount remote filesystems, download data locally or
    move to any other storage location. Since the data itself is already quite
    big and costly to move, OnDemand is extremely helpful for fast assessment.

    _-- Carolina Ramirez, Williams PANLab_


### More documentation

[Open OnDemand][url_ood] was created by the [Ohio Supercomputer
Center][url_osc].
[![ood](images/ood_logo.png)][url_ood]{: .fl_right :}


The following documentation is specifically intended for using OnDemand on
Sherlock. For more complete documentation about OnDemand in general, please see
the [extensive documentation for OnDemand created by OSC][url_ood_docs],
including many video tutorials.



## Connecting

!!! Note "Connection information"

    To connect to Sherlock OnDemand, simply point your browser to
    **https://ondemand.sherlock.stanford.edu**

Sherlock OnDemand requires the same level of authentication than connecting to
Sherlock over SSH. You will be prompted for your SUNet ID and password, and
will go through the regular two-step authentication process.

The Sherlock OnDemand **Dashboard** will then open. From there, you can use the
menus across the top of the page to manage files, get a shell on Sherlock,
submit jobs or open interactive applications such as Jupyter Notebooks or
RStudio sessions.

![ood_dashboard](images/ood_dashboard.png)

To end your Sherlock OnDemand session, click on the ["Log Out"][url_ood_logout]
link at the top right of the Dashboard window and close your browser.


## Getting a shell

You can get shell access to Sherlock by choosing **Clusters > Sherlock Shell
Access** from the top menu in the OnDemand **Dashboard**.

In the window that will open, you'll be logged in to one of Sherlock's login
nodes, exactly as if you were using SSH to connect. Except you don't need to
install any SSH client on your local machine, configure [Kerberos][url_gssapi]
or deal with your SSH client configuration to [avoid endless two-factor
prompts][url_avoid_duo]. How cool is that?

![ood_shell](images/ood_shell.png)


## Managing files

To create, edit or move files, click on the **Files** menu from the
**Dashboard** page. A drop-down menu will appear, listing your most common
[storage locations][url_storage] on Sherlock: `$HOME`, `$GROUP_HOME`,
`$SCRATCH`, `$GROUP_SCRATCH`, and all Oak storage you have access to, including
your main `$OAK`[^oak_access]. Any [`rclone` remotes][url_rclone] you create on
Sherlock to connect to cloud storage will appear here as well.

Choosing one of the file spaces opens the **File Explorer** in a new browser
tab. The files in the selected directory are listed.

There are two sets of buttons in the File Explorer.

* Under the three vertical dots menu next to each filename:
  ![fs_btn1](images/file_explorer_btn1.png) Those buttons allow you to
  **View**, **Edit**, **Rename**, **Download**, or **Delete** a file.

* At the top of the window, on the right side:
  ![fs_btn2](images/file_explorer_btn2.png)

    | Button | Function |
    | ------ | -------- |
    | **Open in Terminal** | Open a terminal window on Sherlock in a new browser tab |
    | **Refresh** | Refresh the list of directory contents |
    | **New File** | Create a new, empty file |
    | **New Directory** | Create a new sub-directory |
    | **Upload** | Copy a file from your local machine to Sherlock |
    | **Download** | Download selected files to your local machine |
    | **Copy/Move** | Copy or move selected files (after moving to a different directory) |
    | **Delete** | Delete selected files |
    | **Change directory** | Change your current working directory |
    | **Copy path** | Copy the current working directory path to your clipboard |
    | **Show Dotfiles** | Toggle the display of dotfiles (files starting with a `.`, which are usually hidden) |
    | **Show Owner/Mode** | Toggle the display of owner and permission settings |





## Creating and editing jobs

You can create new job scripts, edit existing scripts, and submit them to the
scheduler through the Sherlock OnDemand interface.

From the top menus in the **Dashboard**, choose **Jobs > Job Composer**. A Job
Composer window will open. There are two tabs at the top: **Jobs** and
**Templates**.

In the **Jobs** tab, you'll find a list of the job you've submitted through
OnDemand. The **Templates** tab will allow you to define your own job
templates.

### Creating a new job script

To create a new job script. you'll need to follow the steps below.

#### Select a template

Go to the **Jobs** tab in the **Jobs Composer** interface. You'll find a
default template there: "_Simple Sequential Job_".

To create a new job script, click the blue **New Job > From Default Template**
button in the upper left. You'll see a green message at the top of the
page indicating: "Job was successfully created".

At the right of the **Jobs** page, you can see the **Job Details**, including
the location of the script and the script name (by default, `main_job.sh`).
Under that, you will see the contents of the job script in a section named
**Submit Script**.

![ood_new_job](images/ood_new_job.png)

#### Edit the job script

You'll need to edit the job script, so it contains the commands and workflow
that you want to submit to the scheduler.

If you need more resources than the defaults, you must include options to
change them in the job script. For more details, see the [Running
jobs][url_running_jobs] section.

You can edit the script in several ways:

* click the blue **Edit Files** button at the top of the **Jobs** tab in the
  Jobs Composer window,
* in the **Jobs** tab in the **Jobs Composer** window, find the **Submit
  Script** section at the bottom right. Click the blue **Open Editor** button.

After you save the file, the editor window remains open, but if you return to
the **Jobs Composer** window, you will see that the content of  your script has
changed.

#### Edit the job options

In the **Jobs** tab in the **Jobs Composer** window, click the blue **Job
Options** button. The options for the selected job such as name, the job script
to run, and the account it run under are displayed and can be edited. Click
**Save** or **Cancel** to return to the job listing.


## Submitting jobs

To submit a job, select in in the **Jobs** tab in the **Jobs Composer** page.
Click the green **Submit** button to submit the selected job. A message at the
top of the window shows whether the job submission was successful or not. If it
is not, you can edit the job script or options and resubmit. When the job is
submitted successfully, the status of the job in the **Jobs Composer** window
will change to _Queued_ or _Running_. When  the job completes, the status will
change to _Completed_.

![ood_submit_job](images/ood_submit_job.png)

## Monitoring jobs

From the **Dashboard** page, The **Jobs > Active Jobs** top-level menu will
bring you to a live view of Sherlock's scheduler queue. You'll be able to see
all the jobs currently in queue, including running and pending jobs, as well as
some details about individual jobs.

![ood_my_jobs](images/ood_my_jobs.png)

At the bottom of the detailed view, you'll find two button that will bring you
to the directory where that job's files are located, either in the **File
Manager** or in a **Shell** session.



## Interactive applications

One of the main features of Sherlock OnDemand is the ability to run
interactive applications directly from the web interface, without leaving your
web browser.


### Jupyter Notebooks

You can run Jupyter Notebooks (using Python, Julia or other languages) through
Sherlock OnDemand.

!!! warning "Some preliminary setup may be required"

    Before running your first Jupyter Notebook with `IJulia`, you'll need to
    run the following steps (this only needs to be done once):

    ```
    $ ml julia
    $ julia
    julia> using Pkg;
    julia> Pkg.add("IJulia")
    ```

    When you see the message that `IJulia` has been installed, you can end your
    interactive session.

To start a Jupyter session from Sherlock OnDemand:

1. Select **Interactive Apps > Jupyter Notebook** from the top menu in the
   **Dashboard** page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your notebook starts.

   ![ood_jup](images/ood_jup.png)

3. Click the blue **Launch** button to start your JupyterHub session. You may
   have to wait in the queue for resources to become available for you.

4. When your session starts, you can click on the blue **Connect to Jupyter**
   button to open your Jupyter Notebook. The Dashboard window will display
   information about your Jupyter session, including the name of the compute
   node it is running on, when it started, and how much time remains.
   ![ood_sess](images/ood_sess.png)

5. In your new Jupyter Notebook tab, you'll see 3 tabs: Files, Running and
   Clusters.
   ![ood_jup_notebook](images/ood_jup_notebook.png)

   By default, you are in the **Files** tab; that displays the contents of your
   `$HOME` directory on Sherlock. You can navigate through your files there.

   Under the **Running** tab, you will see the list of all the notebooks or
   terminal sessions that you have currently running.

6. You can now start a Jupyter Notebook:

    1. To open an existing Jupyter Notebook, which is already stored on
       Sherlock, navigate to its location in the **Files** tab and click on its
       name. A new window running the notebook will open.
    2. To create a new Jupyter Notebook, click on the **New** button at the top
       right of the file listing, and choose the kernel of your choice from the
       drop down.

To terminate your Jupyter Notebook session, go back to the Dashboard, and click
on the **My Interactive Sessions** in the top menu. This will bring you to a
page listing all your currently active interactive session. Identify the one
you'd like to terminate and click on the red **Cancel** button.

### JupyterLab

To run JupyterLab via Sherlock OnDemand:

1. Select **Interactive Apps > JupyterLab** from the top menu in the
   Dashboard page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your session starts.

3. Click the blue **Launch** button to start your JupyterLab session. You may
   have to wait in the queue for resources to become available.

4. When your session starts, click the blue **Connect to JupyterLab**
   button. A new window opens with the JupyterLab interface.

5. The first time you connect to JupyterLab via Sherlock OnDemand, you'll see
   2 tabs: Files and Launcher.

   ![ood_juplab](images/ood_juplab.png)

   The **Files** tab displays the contents of your `$HOME` directory on Sherlock.
   You can navigate through your files there.

   In the Launcher tab, you will have the option to create a new Jupyter Notebook
   new Console session by clicking the tile showing the kernel of your choice.
   You can also open the Terminal or a text editor for a variety of file
   types by clicking the corresponding tile.

To create a new kernel for IJulia:

1. In the **Launcher**, click the **Terminal** tile in the "Other" section.

2. In the Terminal, run the following commands:

    ```none
    $ ml julia
    $ julia
    julia> using Pkg;
    julia> Pkg.add("IJulia")
    ```

3. Open a new **Launcher** tab by clicking the **+** sign next to your open Terminal
   tab. Julia will now be listed in the "Notebook" and "Console" sections as an
   available kernel.

To create a custom kernel for a virtual environment using Python 3.x:

1. In a shell session, activate your environment and run the following:

    ```none
    $ pip3 install ipykernel
    $ python3 -m ipykernel install --user --name env --display-name "My Env"
    ```

    This will create a kernel for the environment `env`. It will appear as `My
    Env` in the JupyterLab Launcher.

    !!! Note "Creating a custom kernel for a Python 2.x environment"

        When working with a Python 2.x environment, use the `python`/`pip`
        commands instead.

2. The custom kernel will now be listed as option in the "Notebook" and
   "Console" sections in the JupyterLab Launcher. To start a Jupyter Notebook
   using your virtual environment, click on the tile for that kernel.

    !!! warning "Creating a custom kernel for a conda environment"

        In order to use a kernel created from a conda environment, you must
        unload the `python` and `py-jupyterlab` modules from your JupyterLab
        session. This can be done using the JupyterLab Lmod extension. To use
        the Lmod extension, select the bottom tab in the left side menu of your
        JupyterLab window. You may also need to restart the kernel for your
        notebook or console.


### MATLAB

To run MATLAB via Sherlock OnDemand:

1. Select **Interactive Apps > MATLAB** from the top menu in the
   Dashboard page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your session starts.

3. Click the blue **Launch** button to start your MATLAB session. You may
   have to wait in the queue for resources to become available.

4. When your session starts, click the blue **Connect to MATLAB**
   button. A new window opens with the MATLAB interface.

   ![ood_matlab](images/ood_matlab.png)

### RStudio

To run RStudio via Sherlock OnDemand:

1. Select **Interactive Apps > RStudio Server** from the top menu in the
   Dashboard page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your session starts.

3. Click the blue **Launch** button to start your RStudio session. You may have
   to wait in the queue for resources to become available.

4. When your session starts, click the blue **Connect to RStudio Server**
   button. A new window opens with the RStudio interface.

![ood_rstudio](images/ood_rstudio.png)

!!! warning "Installing packages in RStudio"

    You may encounter errors while installing R packages within RStudio. First
    try installing R packages in a shell session on the Sherlock command line.
    See our [R packages][url_r_packages] documentation for more information.


### TensorBoard

To run TensorBoard via Sherlock OnDemand:

1. Select **Interactive Apps > TensorBoard** from the top menu in the
   Dashboard page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your session starts.

3. Click the blue **Launch** button to start your TensorBoard session. You may have
   to wait in the queue for resources to become available.

4. When your session starts, click the blue **Connect to TensorBoard**
   button. A new window opens with the TensorBoard interface.

![ood_tb](images/ood_tb.png)

### VS Code

You can use VS Code on Sherlock through the code-server interactive app.

!!! Note "Using your local VS Code with remote SSH"

    Connecting to Sherlock from VS Code on your local machine is not
    supported at this time due to a known issue with the closed-source "Remote
    SSH" extension.


To start a VS Code session via Sherlock OnDemand:

1. Select **Interactive Apps > code-server** from the top menu in the
   Dashboard page.

2. In the screen that opens, specify the different parameters for your job
   (time limit, number of nodes, CPUs, partition to use, etc.). You can also
   choose to be notified by email when your session starts.

3. Click the blue **Launch** button to start your code-server session. You may have
   to wait in the queue for resources to become available.

4. When your session starts, click the blue **Connect to code-server**
   button. A new window opens with the code-server interface.

![ood_code-server](images/ood_code-server.png)

## Support

If you are experiencing issues with Sherlock or your interactive session, you can
contact us directly from Sherlock OnDemand.

To submit a ticket about Sherlock or Sherlock OnDemand in general:

1. Select **Help -> Submit Support Ticket** from the top menu in the
   Dashboard page.

2. In the screen that opens, complete the Support Ticket form. When applicable,
   please provide:

       - the full path to any files involved in your question or problem,

       - the command(s) you ran, and/or the job submission script(s) you used,

       - the **exact, entire** error message (or trace) you received.

3. Click the blue **Submit support ticket** form. Research Computing support will
   respond to you as soon as we are able.

To submit a ticket about your current or recent interactive session:

1. Select **My Interactive Sessions** from the top menu in the Dashboard page.

2. In the screen that opens, find the card for the session you need help with.
   Active sessions will have a green header, and past sessions will have a gray
   header. Click that card's **Submit support ticket** link to open the Support
   Ticket form.
   ![ood_sess_support](images/ood_sess_support.png)

3. Complete the Support Ticket form. When applicable, please provide:

       - the full path to any files involved in your question or problem,

       - the command(s) you ran, and/or the job submission script(s) you used,

       - the **exact, entire** error message (or trace) you received.

4. Click the blue **Submit support ticket** form. Research Computing support will
   respond to you as soon as we are able.




[comment]: #  (link URLs -----------------------------------------------------)

[url_contact]:      mailto:{{ support_email }}
[url_oak]:          //uit.stanford.edu/service/oak-storage
[url_osc]:          //www.osc.edu
[url_ood]:          //openondemand.org
[url_ood_docs]:     //www.osc.edu/resources/online_portals/ondemand
[url_ood_logout]:   //login.sherlock.stanford.edu/logout

[url_storage]:      /docs/storage/index.md
[url_rclone]:       /docs/software/using/rclone.md
[url_gssapi]:       /docs/advanced-topics/connection.md#gssapi
[url_avoid_duo]:    /docs/advanced-topics/connection.md#avoiding-multiple-duo-prompts
[url_running_jobs]: /docs/user-guide/running-jobs.md
[url_r_packages]:   /docs/software/using/R.md#r-packages

[comment]: #  (footnotes -----------------------------------------------------)

[^oak_access]:      if you have access to the [Oak storage system][url_oak].



--8<--- "includes/_acronyms.md"
