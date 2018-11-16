## Transfer protocols

A number of methods allow transferring data in/out of Sherlock. For most cases,
we recommend using [SSH-based file transfer commands](#ssh-based protocols),
such as `scp`, `sftp`, or `rsync`.  They will provide the best
performance for data transfers from and to campus.

Most casual data transfers could be done through the login nodes, by pointing
your transfer tool to `login.sherlock.stanford.edu`. But because of resource
limits on the login nodes, larger transfer may not work as expected.

For transferring large amounts of data, Sherlock features a specific [Data
Transfer Node](#dtn), with dedicated bandwidth, as well as a managed [Globus
Online endpoint](#globus), that can be used for scheduled, unattended data
transfers.

We also provide tools on Sherlock to transfer data to various [Cloud
providers](#cloud-backups), such as AWS, Google Drive, Dropbox, Box, etc.


### Prerequisites

Most of the commands detailed below require a terminal and an SSH client[^ssh]
on your local machine to launch commands.

You'll need to start a terminal and type the given example commands at the
prompt, omitting the initial `$` character (it just indicates a command prompt,
and then should not be typed in).


--8<--- "_host_keys.md"


### SSH-based protocols

!!! important "Login name"

    In all the examples below, you'll need to replace `<sunetid>` by your
    actual SUNet ID. If you happen to use the same login name on your local
    machine, you can omit it..

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

    * [WinSCP][url_winscp] :fa-windows:
    * [SecureFX][url_securefx] :fa-windows:,
    * [Fetch][url_fetch][^fetch_su] :fa-apple:
    * [CyberDuck][url_cyberduck] :fa-apple:

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

    SSHFS is available for [Linux][url_sshfs_linux] :fa-linux:,
    [MacOS][url_sshfs_macos] :fa-apple:, and [Windows][url_sshfs_windows]
    :fa-windows:.

    !!! warning "SSHFS on macOS"

        SSHFS on macOS is known to try to automatically reconnect filesystem
        mounts after resuming from sleep or suspend, even without any valid
        credentials.  As a result, it will generate a lot of failed connection
        attempts and likely make your [IP address blacklisted][url_auth_fail]
        on login nodes.

        Make sure to unmount your SSHFS drives before putting your macOS system
        to sleep to avoid this situation.

    !!! info "SSHFS on Windows"

        Most of the open and free implementations of SSHFS on Windows don't
        support 2FA and will fail to mount Sherlock's filesystems. Until
        Microsoft implements a working FUSE driver in WSL, Windows users will
        have to rely on [commercial solutions][url_sshfs_windows], or
        [workarounds][url_sshfs_win_vm].


    For instance, on a Linux machine with SSHFS installed, you could mount your
    Sherlock home directory with the following commands:

    ```
    $ mkdir ~/sherlock_home
    $ sshfs <sunetid>@login.sherlock.stanford.edu:./ ~/sherlock_home
    ```

    And to unmount it:
    ```
    $ fusermount -u ~/sherlock_home
    ```

    For more information about using SSHFS on your local machine, you can
    refer to this [tutorial][url_sshfs_tuto] for more details and examples.



### Globus

Globus improves SSH-based file transfer protocols by providing the following
features:

* automates large data transfers,
* can resume failed transfers,
* simplifies the implementation of high-performance transfers between computing
  centers.

Globus Online is a Software as a Service (SaaS) deployment of the Globus
Toolkit which provides end-users with a browser interface to initiate data
transfers between endpoints registered with the Globus Alliance. Globus Online
allows registered users to "drag and drop" files from one endpoint to another.
Endpoints are terminals for data; they can be laptops or supercomputers, and
anything in between. The servers at Globus.org act as
intermediaries-negotiating, monitoring and optimizing transfers through
firewalls and across network address translation (NAT). Under certain
circumstances with high performance hardware transfer rates exceeding 1 GB/s
are possible. For more information about Globus, please see the [Globus.org's
documentation][url_globus_doc].

#### Authentication

To use Globus Online, you will first need to authenticate at
[Globus.org][url_globus]. You can either sign up for a Globus.org account, or
use your SUNet ID account for authentication to Globus Online (which will be
required to authenticate to the Sherlock endpoint).

To use your SUNet ID, choose "Stanford University" from the drop down menu at
the [Login page][url_globus_login] and follow the instructions from there.

#### Transfer

!!! info "Endpoint name"

    The Globus endpoint name for Sherlock is `SRCC Sherlock` (aka
    `srcc#sherlock`)

You can use Globus Online to transfer data between your local workstation
(e.g., your laptop or desktop) and Sherlock. In this workflow, you
configure your local workstation as a Globus endpoint using Globus Connect.

1. Log in to [Globus.org][url_globus_login]
2. Use the [Manage Endpoints][url_globus_xfer_mgmt] interface to "add Globus
   Connect Personal" as an endpoint (you'll need to install Globus Connect
   Personal on your local machine)
3. [Transfer Files][url_globus_xfer_start], using your new workstation endpoint
   for one side of the transfer, and the Sherlock endpoint (`SRCC Sherlock`) on
   the other side.

You can also transfer data between two remote endpoints, by choosing another
endpoint you have access to instead of your local machine.

#### CLI

Globus also provides a command-line interface as an alternative to its web
interface. This command-line interface is provided over an SSH connection to a
Globus.org server. Please see the [Globus CLI documentation][url_globus_cli] for
more details.


## Data Transfer Node (DTN)

A dedicated Data Transfer Node is available on Sherlock, to provide exclusive
resources for large-scale data transfers.

The main benefit of using it is that
transfer tasks can't be disrupted by other users interactive tasks or
filesystem access and I/O-related workloads on the login nodes.

By using the Sherlock DTN, you'll make sure that your data flows will go
through a computer whose sole purpose is to move data around.

It supports:

* SSH-based protocols (such as the ones [described above](#ssh-based
  protocols))
* [BBCP][url_bbcp]
* [Globus](#globus)


To transfer files via the DTN, simply use `dtn.sherlock.stanford.edu` as a
remote server hostname. For instance:

```
$ scp foo <sunetid>@dtn.sherlock.stanford.edu:~/foo
```

!!! Warning "No shell"

    The DTN doesn't provide any interactive shell, so connecting via SSH
    directly won't work. It will only accept `scp`, `sftp`, `rsync` of `bbcp`
    connections.

One important difference to keep in mind when transferring files through the
Sherlock DTN is that the default destination path for files, unless specified,
is the user `$SCRATCH` directory, not `$HOME`.

That means that the following command:
```
$ scp foo <sunetid>@dtn.sherlock.stanford.edu:
```
will create the `foo` file in  `$SCRATCH/foo`, and not in `$HOME/foo`.

You can transfer file to your `$HOME` directory via the DTN by specifying the
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

We provide the `gdrive` tool on Sherlock to interact with Google Drive. You'll
just need to load the `gdrive` module to be able to use it to move your
files from/to Google Drive:

```
$ module load system gdrive
$ gdrive help
```

For more details about how to use `gdrive`, please see the [official
documentation][url_gdrive].


### Other services

If you need to access other cloud storage services, you can use
[rclone][url_rclone]: it can be used to sync files and directories to and from
Google Drive, Amazon S3, Box, Dropbox, Google Cloud Storage, Amazon Drive,
Microsoft OneDrive and many more.

```
$ ml load system rclone
$ rclone -h
```

For more details about how to use `rclone`, please see the [official
documentation][url_rclone].



[comment]: #  (link URLs -----------------------------------------------------)

[url_ssh_clients]:  /docs/getting-started/prerequisites/#ssh-clients
[url_auth_fail]:    /docs/getting-started/connecting/#authentication-failures

[url_winscp]:       https://winscp.net/eng/docs/introduction
[url_securefx]:     https://uit.stanford.edu/software/scrt_sfx
[url_cyberduck]:    http://cyberduck.io/
[url_fetch]:        http://fetchsoftworks.com/
[url_fetch_su]:     https://uit.stanford.edu/software/fetch
[url_sftp_tuto]:    https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server
[url_rsync_tuto]:   https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps
[url_sshfs_linux]:  http://fuse.sourceforge.net/sshfs.html
[url_sshfs_macos]:  https://osxfuse.github.io/
[url_sshfs_windows]:https://mountainduck.io/
[url_sshfs_win_vm]: https://jtanx.github.io/2017/10/16/an-alternative-approach-to-sshfs-on-windows/
[url_sshfs_tuto]:   https://www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh
[url_globus]:       https://www.globus.org
[url_globus_doc]:   https://www.globus.org/how-it-works
[url_globus_cli]:   https://docs.globus.org/faq/command-line-interface/
[url_globus_login]: https://auth.globus.org/p/login
[url_globus_xfer_mgmt]:   https://www.globus.org/app/endpoints
[url_globus_xfer_start]:  https://www.globus.org/app/transfer
[url_bbcp]:         https://www.slac.stanford.edu/~abh/bbcp
[url_rclone]:       https://rclone.org/
[url_gdrive]:       https://github.com/prasmussen/gdrive
[url_uit_gdrive]:   https://uit.stanford.edu/service/googleapps/drive


[comment]: #  (footnotes -----------------------------------------------------)

[^ssh]: For more details, see the [SSH clients page][url_ssh_clients].
[^fetch_su]: Fetch is a commercial program, and is available as part of
  the [Essential Stanford Software][url_fetch_su] bundle.

