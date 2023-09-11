## Introduction

If you need to sync files between cloud storage to Sherlock,
[rclone][url_rclone] is a command line program that can help. You can easily
use it to transfer files from a cloud storage provider to Sherlock or Oak, or vice
versa. The following tutorial walks through transferring files between Google Drive and 
Oak storage.

## Setup

Before transferring data for the first time, you will need to configure rclone so
that it can access your Google Drive. This will require use of your browser, so you
will need to connect to Sherlock with **local port forwarding** (`ssh -L`). You
only need to do this when you are configuring rclone for the first time.

When running the rclone config you will be prompted to enter names and values,
indicated by the `>` symbol. To leave it empty, press Enter.

```shell
# Connect to Sherlock with local port fowarding
$ ssh -L localhost:53682:localhost:53682 <SUNetID>@login.sherlock.stanford.edu


# Load the rclone module
$ ml system rclone


# Run the rclone configuration tool
$ rclone config

No remotes found, make a new one?
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n

Enter name for new remote.
name> gdrive

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
       ...
18 / Google Drive
   \ (drive)
       ...
48 / premiumize.me
   \ (premiumizeme)
49 / seafile
   \ (seafile)
Storage> drive

Option client_id.
Google Application Client Id
...
Enter a value. Press Enter to leave empty.
client_id> 

Option client_secret.
OAuth Client Secret.
Leave blank normally.
Enter a value. Press Enter to leave empty.
client_secret> 

Option scope.
Scope that rclone should use when requesting access from drive.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Full access all files, excluding Application Data Folder.
   \ (drive)
...
scope> 1

Option service_account_file.
Service Account Credentials JSON file path.
Leave blank normally.
...
Enter a value. Press Enter to leave empty.
service_account_file> 

Edit advanced config?
y) Yes
n) No (default)
y/n> n

Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine

y) Yes (default)
n) No
y/n> y

2023/09/12 10:51:55 NOTICE: If your browser doesn't open automatically go to the 
following link: http://127.0.0.1:53682/auth?state=#################
2023/09/12 10:51:55 NOTICE: Log in and authorize rclone for access
2023/09/12 10:51:55 NOTICE: Waiting for code...

```
<br>

At this point, you can copy and paste the provided link into your browser. You will
be asked to confirm that you want to allow rclone to access your files. Once you 
have successfully done so, you can complete the configuration in the terminal.

<br>

```shell
Configure this as a Shared Drive (Team Drive)?

y) Yes
n) No (default)
y/n> n

Configuration complete.
Options:
...
Keep this "gdrive" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y

Current remotes:

Name                 Type
====                 ====
gdrive               drive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q

```


## Data Transfer

To transfer data between cloud storage and Sherlock or Oak, you can use the `rclone 
copy` command.

``` shell
# Start an interactive dev session
$ sh_dev 

# Load the rclone module
$ ml system rclone

# List all top-level directories in Google Drive
$ rclone lsd gdrive: --max-depth 1

# List all files in a directory
$ rclone ls gdrive:<folder name>

# List all files on Google Drive (including those in folders)
$ rclone ls gdrive:

# Copy a folder from Google Drive to Oak
$ rclone copy gdrive:<folder name> /oak/stanford/groups/<group_name>/<folder name>

$ Copy a single file from Oak to Google Drive
$ rclone copy /oak/stanford/groups/<group name>/<file name> gdrive:
```




[comment]: #  (link URLs -----------------------------------------------------)

[url_rclone]:           //rclone.org


--8<--- "includes/_acronyms.md"
