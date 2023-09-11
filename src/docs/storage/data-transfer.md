---
tags:
    - connection
---

## Transfer protocols

A number of methods allow transferring data in/out of Sherlock. For most cases,
we recommend using [SSH-based file transfer commands](#ssh-based protocols),
such as `scp`, `sftp`, or `rsync`.  They will provide the best
performance for data transfers from and to campus.


!!! important "For large transfers, using DTNs is recommended"

    Most casual data transfers could be done through the login nodes, by
    pointing your transfer tool to `login.sherlock.stanford.edu`. But because
    of resource limits on the login nodes, larger transfer may not work as
    expected.

    For transferring large amounts of data, Sherlock features a specific [Data
    Transfer Node](#data-transfer-nodes-dtns), with dedicated bandwidth, as well as a managed
    [Globus endpoint](#globus), that can be used for scheduled, unattended data
    transfers.

We also provide tools on Sherlock to transfer data to various [Cloud
providers](#cloud-storage), such as AWS, Google Drive, Dropbox, Box, etc.


### Prerequisites

Most of the commands detailed below require a terminal and an SSH client[^ssh]
on your local machine to launch commands.

You'll need to start a terminal and type the given example commands at the
prompt, omitting the initial `$` character (it just indicates a command prompt,
and then should not be typed in).


--8<--- "includes/_host_keys.md"


### SSH-based protocols

!!! important "User name"

    In all the examples below, you'll need to replace `<sunetid>` by your
    actual SUNet ID. If you happen to use the same login name on your local
    machine, you can omit it.

#### SCP (Secure Copy)

: The easiest command to use to transfer files to/from Sherlock is `scp`. It
    works like the `cp` command, except it can work over the network to copy
    files from one computer to another, using the secure SSH protocol.

    The general syntax to copy a file to a remote server is:
    ```
    $ scp <source_file_path> <username>@<remote_host>:<destination_path>'
    ```

    For instance, the following command will copy the file named `foo` from
    your local machine to your home directory on Sherlock:
    ```
    $ scp foo <sunetid>@login.sherlock.stanford.edu:
    ```
    Note the `:` character, that separates the hostname from the destination
    path. Here, the destination path is empty, which will instruct scp to copy
    the file in your home directory.

    You can copy `foo` under a different name, or to another directory, with
    the following commands:
    ```
    $ scp foo <sunetid>@login.sherlock.stanford.edu:bar
    $ scp foo <sunetid>@login.sherlock.stanford.edu:~/subdir/baz
    ```

    To copy back files from Sherlock to your local machine, you just need to
    reverse the order of the arguments:
    ```
    $ scp <sunetid>@login.sherlock.stanford.edu:foo local_foo
    ```

    And finally, `scp` also support recursive copying of directories, with the
    `-r` option:
    ```
    $ scp -r dir/ <sunetid>@login.sherlock.stanford.edu:dir/
    ```
    This will copy the `dir/` directory and all of its contents in your home
    directory on Sherlock.


#### SFTP (Secure File Transfer Protocol)

: SFTP clients are interactive file transfer programs, similar to FTP, which
    perform all operations over an encrypted transport.

    A variety of graphical SFTP clients are available for different OSes:

    * [WinSCP][url_winscp] :fontawesome-brands-windows:
    * [SecureFX][url_securefx] :fontawesome-brands-windows:,
    * [Fetch][url_fetch][^fetch_su] :fontawesome-brands-apple:
    * [CyberDuck][url_cyberduck] :fontawesome-brands-apple:

    When setting up your connection to Sherlock in the above programs, use the
    following information:

        Hostname: login.sherlock.stanford.edu
        Port:     22
        Username: SUNet ID
        Password: SUNet ID password

    OpenSSH also provides a command-line SFTP client, originally named `sftp`.

    To log in to Sherlock:
    ```
    $ sftp <sunetid>@login.sherlock.stanford.edu
    Connected to login.sherlock.stanford.edu.
    sftp>

    ```
    For more information about using the command-line SFTP client, you can
    refer to this [tutorial][url_sftp_tuto] for more details and examples.

#### rsync

: If you have complex hierarchies of files to transfer, or if you need to
    synchronize a set of files and directories between your local machine and
    Sherlock, `rsync` will be the best tool for the job. It will efficiently
    transfer and synchronize files across systems, by checking the timestamp
    and size of files. Which means that it won't re-transfer files that have
    not changed since the last transfer, and will complete faster.

    For instance, to transfer the whole `~/data/` folder tree from your local
    machine to your home directory on Sherlock, you can use the following
    command:
    ```
    $ rsync -a ~/data/ <sunetid>@login.sherlock.stanford.edu:data/
    ```
    Note the slash (`/`) at the end of the directories name,  which is
    important to instruct `rsync` to synchronize the whole directories.

    To get more information about the transfer rate and follow its progress,
    you can use additional options:
    ```
    $ rsync -avP ~/data/ <sunetid>@login.sherlock.stanford.edu:data/
    sending incremental file list
    ./
    file1
          1,755,049 100%    2.01MB/s    0:00:00 (xfr#2, to-chk=226/240)
    file2
          2,543,699 100%    2.48MB/s    0:00:00 (xfr#3, to-chk=225/240)
    file3
         34,930,688  19%   72.62MB/s    0:00:08

    [...]
    ```
    For more information about using the `rsync`, you can
    refer to this [tutorial][url_rsync_tuto] for more details and examples.

#### SSHFS

: Sometimes, moving files in and out of the cluster, and maintaining two
    copies of each of the files you work on, both on your local machine and on
    Sherlock, may be painful. Fortunately, Sherlock offers the ability to mount
    any of its filesystems to your local machine, using a secure and encrypted
    connection.

    With SSHFS, a FUSE-based filesystem implementation used to mount remote
    SSH-accessible filesystems, you can access your files on Sherlock as if
    they were locally stored on your own computer.

    This comes particularly handy when you need to access those files from an
    application that is not available on Sherlock, but that you already use or
    can install on your local machine. Like a data processing program that you
    have licensed for your own computer but can't use on Sherlock, a specific
    text editor that only runs on MacOS, or any data-intensive 3D rendering
    software that wouldn't work comfortably enough over a forwarded X11
    connection.

    SSHFS is available for [Linux][url_sshfs_linux] :fontawesome-brands-linux:,
    [MacOS][url_sshfs_macos] :fontawesome-brands-apple:, and [Windows][url_sshfs_windows]
    :fontawesome-brands-windows:.

    !!! warning "SSHFS on macOS"

        SSHFS on macOS is known to try to automatically reconnect filesystem
        mounts after resuming from sleep or suspend, even without any valid
        credentials.  As a result, it will generate a lot of failed connection
        attempts and likely make your [IP address blacklisted][url_auth_fail]
        on login nodes.

        Make sure to unmount your SSHFS drives before putting your macOS system
        to sleep to avoid this situation.


    For instance, on a Linux machine with SSHFS installed, you could mount your
    Sherlock home directory with the following commands:

    ```
    $ mkdir ~/sherlock_home
    $ sshfs <sunetid>@login.sherlock.stanford.edu:./ ~/sherlock_home
    ```

    And to unmount it:
    ```
    $ umount ~/sherlock_home
    ```

    For more information about using SSHFS on your local machine, you can
    refer to this [tutorial][url_sshfs_tuto] for more details and examples.



### Globus

Globus improves SSH-based file transfer protocols by providing the following
features:

* automates large data transfers,
* handles transient errors, and can resume failed transfers,
* simplifies the implementation of high-performance transfers between computing
  centers.

Globus is a Software as a Service (SaaS) system that provides end-users with a
browser interface to initiate data transfers between endpoints. Globus allows
users to "drag and drop" files from one endpoint to another. Endpoints are
terminals for data; they can be laptops or supercomputers, and anything in
between. The Globus web service negotiates, monitors, and optimizes transfers
through firewalls and across network address translation (NAT). Under certain
circumstances, with high performance hardware transfer rates exceeding 1 GB/s
are possible. For more information about Globus, please see the [Globus
documentation][url_globus_doc].

#### Authentication

To use Globus, you will first need to authenticate at
[Globus.org][url_globus]. You can either sign up for a Globus account, or
use your SUNet ID account for authentication to Globus (which will be
required to authenticate to the Sherlock endpoint).

To use your SUNet ID, choose "Stanford University" from the drop down menu at
the [Login page][url_globus_login] and follow the instructions from there.

#### Transfer

!!! info "Endpoint name"

    The Globus endpoint name for Sherlock is [`SRCC
    Sherlock`][url_globus_sherlock].

!!! important "Oak endpoint"

    The Sherlock endpoint only provides access to Sherlock-specific file
    systems (`$HOME`, `$GROUP_HOME`, `$SCRATCH` and `$GROUP_SCRATCH`).
    [Oak][url_oak] features its own Globus endpoint: [`SRCC
    Oak`][url_globus_oak].


You can use Globus to transfer data between your local workstation (e.g., your
laptop or desktop) and Sherlock. In this workflow, you configure your local
workstation as a Globus endpoint by installing the Globus Connect software.

1. Log in to [Globus.org][url_globus_login]
2. Use the [Manage Endpoints][url_globus_xfer_mgmt] interface to "add Globus
   Connect Personal" as an endpoint (you'll need to install Globus Connect
   Personal on your local machine)
3. [Transfer Files][url_globus_xfer_start], using your new workstation endpoint
   for one side of the transfer, and the Sherlock endpoint (`SRCC Sherlock`) on
   the other side.

You can also transfer data between two remote endpoints, by choosing another
endpoint you have access to instead of your local machine.

#### CLI and API

Globus also provides a command-line interface (CLI) and application
programming interface (API) as alternatives to its web interface.

For more information about the API, please see the
[Globus API documentation][url_globus_api] for more details.

For more information about the CLI, please see the
[Globus CLI documentation][url_globus_cli] and
[Globus CLI quickstart][url_globus_cli_quickstart]. Note that the Globus CLI
is available through the module system on Sherlock:

```shell
$ module load system py-globus-cli
$ globus login
# follow instructions to get set up
```

Once you've authorized the application, you can use the `globus` CLI to copy
files in between endpoints and collections that you have access to. Endpoints
and collections are identified by their unique UUID4 identifiers, which are
viewable through the [Globus webapp][url_globus_login]. The CLI will step you
through any additional authorizations required for you to access the
endpoints or collections.

For example, to asynchronously copy files between Sherlock and Oak (if
that you have already been allocated Oak storage):

```shell
$ GLOBUS_SHERLOCK_UUID="6881ae2e-db26-11e5-9772-22000b9da45e"
$ GLOBUS_OAK_UUID="8b3a8b64-d4ab-4551-b37e-ca0092f769a7"
$ globus transfer --recursive \
    "$GLOBUS_SHERLOCK_UUID:$SCRATCH/my-interesting-project" \
    "$GLOBUS_OAK_UUID:$OAK/my-interesting-project-copy"
```


## Data Transfer Nodes (DTNs)

!!! Warning "No shell"

    The DTNs don't provide any interactive shell, so connecting via SSH
    directly won't work. It will only accept `scp`, `sftp`, `rsync` of `bbcp`
    connections.

A pool of dedicated Data Transfer Nodes is available on Sherlock, to provide
exclusive resources for large-scale data transfers.

The main benefit of using it is that transfer tasks can't be disrupted by other
users interactive tasks or filesystem access and I/O-related workloads on the
login nodes.

By using the Sherlock DTNs, you'll make sure that your data flows will go
through a computer whose sole purpose is to move data around.

It supports:

* SSH-based protocols (such as the ones [described
  above](#ssh-based-protocols))
* [BBCP][url_bbcp]
* [Globus](#globus)


To transfer files via the DTNs, simply use `dtn.sherlock.stanford.edu` as a
remote server hostname. For instance:

``` shell
$ scp foo <sunetid>@dtn.sherlock.stanford.edu:~/foo
```

!!! Important "$HOME on DTNs"

    One important difference to keep in mind when transferring files through the
    Sherlock DTNs is that the default destination path for files, unless specified,
    is the user `$SCRATCH` directory, not `$HOME`.

    That means that the following command:
    ```
    $ scp foo <sunetid>@dtn.sherlock.stanford.edu:
    ```
    will create the `foo` file in  `$SCRATCH/foo`, and not in `$HOME/foo`.

    You can transfer file to your `$HOME` directory via the DTNs by specifying the
    full path as the destination:
    ```
    $ scp foo <sunetid>@dtn.sherlock.stanford.edu:$HOME/foo
    ```

## Cloud storage

If you need to backup some of your Sherlock files to cloud-based storage
services, we also provide a set of utilities that can help.

### Google Drive

!!! tip "Google Drive storage for Stanford users"

    Google Drive is free for educational institutions. Meaning you can get
    **free** and **unlimited** storage on Google Drive using your @stanford.edu
    account. See the [University IT Google Drive page][url_uit_gdrive] for more
    details.

We provide the `rclone` tool on Sherlock to interact with Google Drive. You'll
just need to load the `rclone` module to be able to use it to move your
files from/to Google Drive:

``` shell
$ module load system rclone
$ rclone --help
```

This [tutorial][url_rclone_tutorial] provides an example of tranferring files between
Google Drive and Oak storage.

The Globus CLI (see above) can also be used to copy files from Sherlock to
Stanford's Google Drive.

### AWS

You can also access AWS storage from the Sherlock command line with the [AWS Command Line Interface][url_aws-cli]:

```shell
$ module load system aws-cli
$ aws help
```

### Other services

If you need to access other cloud storage services, you can use
[rclone][url_rclone]: it can be used to sync files and directories to and from
Google Drive, Amazon S3, Box, Dropbox, Google Cloud Storage, Amazon Drive,
Microsoft OneDrive and many more.

``` shell
$ ml load system rclone
$ rclone -h
```

For more details about how to use `rclone`, please see the [official
documentation][url_rclone].



[comment]: #  (link URLs -----------------------------------------------------)

[url_ssh_clients]:  /docs/getting-started/#ssh-clients
[url_auth_fail]:    /docs/getting-started/connecting/#authentication-failures

[url_winscp]:       //winscp.net/eng/docs/introduction
[url_securefx]:     //uit.stanford.edu/software/scrt_sfx
[url_cyberduck]:    //cyberduck.io/
[url_fetch]:        //fetchsoftworks.com/
[url_fetch_su]:     //uit.stanford.edu/software/fetch
[url_sftp_tuto]:    //www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server
[url_rsync_tuto]:   //www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps
[url_sshfs_linux]:  //fuse.sourceforge.net/sshfs.html
[url_sshfs_macos]:  //osxfuse.github.io/
[url_sshfs_windows]://github.com/billziss-gh/sshfs-win
[url_sshfs_tuto]:   //www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh
[url_globus]:       //www.globus.org
[url_globus_api]:   //docs.globus.org/api/transfer/
[url_globus_doc]:   //www.globus.org/how-it-works
[url_globus_cli]:   //docs.globus.org/cli/
[url_globus_cli_quickstart]:   //docs.globus.org/cli/quickstart/
[url_globus_login]: //app.globus.org/
[url_globus_xfer_mgmt]:   //app.globus.org/endpoints
[url_globus_xfer_start]:  //app.globus.org/file-manager
[url_globus_sherlock]:    //app.globus.org/file-manager?origin_id=6881ae2e-db26-11e5-9772-22000b9da45e
[url_globus_oak]:         //app.globus.org/file-manager?origin_id=8b3a8b64-d4ab-4551-b37e-ca0092f769a7
[url_bbcp]:         //www.slac.stanford.edu/~abh/bbcp
[url_rclone]:       //rclone.org/
[url_rclone_tutorial]:    /docs/software/using/rclone
[url_aws-cli]:      //aws.amazon.com/cli/
[url_uit_gdrive]:   //uit.stanford.edu/service/googleapps/drive
[url_oak]:          //uit.stanford.edu/service/oak-storage

[comment]: #  (footnotes -----------------------------------------------------)

[^ssh]: For more details, see the [SSH clients page][url_ssh_clients].
[^fetch_su]: Fetch is a commercial program, and is available as part of
  the [Essential Stanford Software][url_fetch_su] bundle.


--8<--- "includes/_acronyms.md"
