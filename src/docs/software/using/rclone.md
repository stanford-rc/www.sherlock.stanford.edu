## Introduction

If you need to sync files between cloud storage to Sherlock, [Rclone][url_rclone] 
is a command line program that can help. On Sherlock, you can easily
use it to transfer files from such a provider to Sherlock, or vice versa.
The following tutorial is provided by a member of the Stanford community,
and walks through transferring files from Box to Sherlock on a Mac.

## Getting Started

### 1. Connect to Sherlock

If you haven't done so already, open up a terminal and shell to sherlock:

```bash
$ ssh <sunetid>@login.sherlock.stanford.edu
```

You then will want to go to a location that has enough room to save the files.
Since $HOME has a smaller limit (and you can lock yourself out if it fills up)
let's go to the $SCRATCH space:

```bash
$ cd $SCRATCH
```

### 2. Get an Interactive Node

Since we don't want to run anything computationally intensive on the head node,
let's ask for an interactive node. You can either ask for one with a
particular time and partition on the fly:

```bash
$ srun --partition owners --time 1:00:00 --pty bash
```

or ask for a development node for 1 hour:

```bash
$ sdev
```

or write a quick script that will give you some further customized interactive node.

```bash
#!/bin/bash
#SBATCH --job-name=test
#SBATCH --time=400:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=2G

srun hostname
```

Save this to the filesystem and then run it.

```bash
$ chmod +x ask-for-node.sh
$ ./ask-for-node.sh
srun: job 45681945 queued and waiting for resources
```

### 3. Load Rclone

Where is Rclone? It's actually already installed on Sherlock, but we need
to load it:

```bash
$ ml load system rclone
```

Check to make sure it's on your path!
```bash
$ which rclone
/share/software/user/open/rclone/1.43.1/bin/rclone
``` 

### 4. Configure Rclone

And then we can configure it as follows:

```bash
$ rclone config
```

You'll notice that it's going to store a configuration file in your user $HOME:

```bash
2019/07/09 13:03:56 NOTICE: Config file "/home/users/vsochat/.config/rclone/rclone.conf" not found - using defaults
```

It will first tell you that there are no "remotes" (cloud endpoints that you
connect to) found, and you can press "n" to make a new one:

```bash
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
```

Next, it asks for a meaningful name. It's recommended to use some combination
to remind your future self that the endpoint is intended to be from Sherlock,
and to your cloud provider. For example, I might do:

```bash
$ name> VanessaSherlockToBox
```

The next choice is the cloud endpoint itself. This is where you would select
the cloud provider that has the files that you want to connect to. There are
many to choose from! You would want to select the number that corresponds with
your choice. For example, I'd choose 5 or type "box" to select Box:

```bash
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Alias for a existing remote
   \ "alias"
 2 / Amazon Drive
   \ "amazon cloud drive"
 3 / Amazon S3 Compliant Storage Providers (AWS, Ceph, Dreamhost, IBM COS, Minio)
   \ "s3"
 4 / Backblaze B2
   \ "b2"
 5 / Box
   \ "box"
 6 / Cache a remote
   \ "cache"
 7 / Dropbox
   \ "dropbox"
 8 / Encrypt/Decrypt a remote
   \ "crypt"
 9 / FTP Connection
   \ "ftp"
10 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
11 / Google Drive
   \ "drive"
12 / Hubic
   \ "hubic"
13 / JottaCloud
   \ "jottacloud"
14 / Local Disk
   \ "local"
15 / Mega
   \ "mega"
16 / Microsoft Azure Blob Storage
   \ "azureblob"
17 / Microsoft OneDrive
   \ "onedrive"
18 / OpenDrive
   \ "opendrive"
19 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
20 / Pcloud
   \ "pcloud"
21 / QingCloud Object Storage
   \ "qingstor"
22 / SSH/SFTP Connection
   \ "sftp"
23 / Webdav
   \ "webdav"
24 / Yandex Disk
   \ "yandex"
25 / http Connection
   \ "http"
Storage> 5
```

For client id and client secret, we will leave it blank (press ENTER for each)
to designate that we want to enter it manually when we run it, as opposed to saving
our credentials somewhere.

```bash
Box App Client Id.
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_id> 
Box App Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret> 
```

Finally, it will ask you if you want to edit the Advanced config. You can say no (n).

```bash
Edit advanced config? (y/n)
y) Yes
n) No
y/n> n
```

And finally, since you are working on a remote and headless machine (Sherlock), you should say no to the next answer.

```bash
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n
```

The next part is important, because we need to open a separate terminal (one
where we have a web browser available) to enter result asked for here. If you have 
a Mac, you can select Shell -> New Window -> New Window with Profile. If you have
another flavor of Linux (or Windows) then you will need to [install Rclone][url_install_rclone]
locally and then issue this command:

```bash
$ rclone authorize "box"
```

A website will open for you to log in with your cloud provider (e.g., Box),
and after login, it will tell you to return to your terminal:

```bash
Success!

	
All done. Please go back to rclone.
```

Back in the (second terminal, not the one on Sherlock) you will see a message (that you
might have previously missed) about the browser opening, waiting for a code, and
then you will get the code (replaced below with xxxxxxxx):

```bash
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth
Log in and authorize rclone for access
Waiting for code...
Got code
Paste the following into your remote machine --->
{"access_token":"xxxxxxxxxxxxxx","token_type":"bearer","refresh_token":"xxxxxxxxxx","expiry":"2019-xx-xxxxxxxx"}
(---End paste
```

You need to copy *the entire thing* between the two brackets "{}" back into the first
terminal running on Sherlock, which will be showing this:

```bash
For this to work, you will need rclone available on a machine that has a web browser available.
Execute the following on your machine:
	rclone authorize "box"
Then paste the result below:
result> 
```

After you paste, it will then ask you if it looks ok, and you can say y for yes.

```bash
[VanessaSherlockToBox]
type = box
token = {xxxxxxxxxxxxxxxxxxx}
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
```

And close up with a listing of your current remotes. You can quit (q) after this,
because next we will test our setup.

```bash
Current remotes:

Name                 Type
====                 ====
VanessaSherlockToBox box

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

### 5. Test Rclone

Did it work? Let's test listing files for our remote to see (filenames below
are made up). 

```bash
$ rclone lsd VanessaSherlockToBox: --max-depth 1
          -1 2018-08-09 09:52:01        -1 pancakes
          -1 2019-03-13 23:33:03        -1 miracles
          -1 2019-03-06 09:42:39        -1 alaska
          -1 2018-02-06 02:37:40        -1 share
```

Next, let's copy a file to Sherlock.

```bash
# rclone copy <remote>:<cloud storage path>  <sherlock path>
$ rclone copy VanessaSherlockToBox:pancakes  /scratch/users/vsochat/pancakes
```

There you go! If you want to interactively browser files, you can use 
the [file manager](https://login.sherlock.stanford.edu) provided by OnDemand.


[comment]: #  (link URLs -----------------------------------------------------)

[url_rclone]:    https://github.com/ncw/rclone
[url_install_rclone]:    https://rclone.org/install/
