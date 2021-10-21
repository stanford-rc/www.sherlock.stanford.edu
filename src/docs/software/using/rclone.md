## Introduction

If you need to sync files between cloud storage to Sherlock,
[rclone][url_rclone] is a command line program that can help. You can easily
use it to transfer files from a cloud storage provider to Sherlock, or vice
versa.  The following tutorial is provided by a member of the Stanford
community, and walks through transferring files from Box to Sherlock on a Mac.

## Setup

### Connection

If you haven't done so already, open up a terminal and shell to sherlock:

``` shell
$ ssh <sunetid>@login.sherlock.stanford.edu
```

You then will want to go to a location that has enough room to save the files.
Since `$HOME` has a smaller limit (and you can lock yourself out if it fills up)
let's go to the `$SCRATCH` space:

``` shell
$ cd $SCRATCH
```

Since we don't want to run anything computationally intensive on a login node,
let's request an interactive session. You can either ask for one with a
particular time and partition on the fly:

``` shell
$ srun --partition normal --time 1:00:00 --pty bash
```

or ask for a development node for 1 hour:

``` shell
$ sdev
```

### Module

Rclone is readily available on Sherlock, but the corresponding module needs to
be explicitely loaded to be made available in your environment:

``` shell
$ ml load system rclone
```

## Configuration

We can then configure it as follows:

``` shell
$ rclone config
```

You'll notice that it's going to store a configuration file in your `$HOME`
directory:

``` shell
2019/07/09 13:03:56 NOTICE: Config file "/home/users/vsochat/.config/rclone/rclone.conf" not found - using defaults
```

### Remotes

It will first tell you that there are no "remotes" (cloud endpoints that you
connect to) found, and you can press "n" to make a new one:

``` shell
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
```

Next, it asks for a meaningful name. It's recommended to use some combination
to remind your future self that the endpoint is intended to be from Sherlock,
and to your cloud provider. For example, I might do:

``` shell
$ name> VanessaSherlockToBox
```

The next choice is the cloud endpoint itself. This is where you would select
the cloud provider that has the files that you want to connect to. There are
many to choose from! You would want to select the number that corresponds with
your choice. For example, I'd choose 5 or type "box" to select Box:

``` shell
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
to designate that we want to enter it manually when we run it, as opposed to
saving our credentials somewhere.

``` shell
Box App Client Id.
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_id>
Box App Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret>
```

Finally, it will ask you if you want to edit the Advanced config. You can say
no (n).

``` shell
Edit advanced config? (y/n)
y) Yes
n) No
y/n> n
```

And finally, since you are working on a remote and headless machine (Sherlock),
you should say no to the next answer.

``` shell
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n
```

### Authentication

The next part is important, because we need to open a separate terminal (one
where we have a web browser available) to enter result asked for here.

If you have a Mac, you can select _Shell -> New Window -> New Window with
Profile_. If you have another flavor of Linux (or Windows) then you will need to
[install rclone][url_install_rclone] locally and then issue this command:

``` shell
$ rclone authorize "box"
```

A website will open for you to log in with your cloud provider (e.g., Box),
and after login, it will tell you to return to your terminal:

``` shell
Success!


All done. Please go back to rclone.
```

Back in the (second terminal, not the one on Sherlock) you will see a message
(that you might have previously missed) about the browser opening, waiting for
a code, and then you will get the code (replaced below with xxxxxxxx):

``` shell
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

``` shell
For this to work, you will need rclone available on a machine that has a web browser available.
Execute the following on your machine:
 rclone authorize "box"
Then paste the result below:
result>
```

After you paste, it will then ask you if it looks ok, and you can type ++y++
for yes.

``` shell
[VanessaSherlockToBox]
type = box
token = {xxxxxxxxxxxxxxxxxxx}
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
```

And close up with a listing of your current remotes. You can quit ++q++ after
this, because next we will test our setup.

``` shell
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

## Testing

Did it work? Let's test listing files for our remote to see (filenames below
are made up).

``` shell
$ rclone lsd VanessaSherlockToBox: --max-depth 1
          -1 2018-08-09 09:52:01        -1 pancakes
          -1 2019-03-13 23:33:03        -1 miracles
          -1 2019-03-06 09:42:39        -1 alaska
          -1 2018-02-06 02:37:40        -1 share
```

Next, let's copy a file to Sherlock.

``` shell
# rclone copy <remote>:<cloud storage path>  <sherlock path>
$ rclone copy VanessaSherlockToBox:pancakes  /scratch/users/vsochat/pancakes
```

There you go! If you want to interactively browse files, you can use the File
Manager on the [Sherlock OnDemand](url_ondemand) interface.



[comment]: #  (link URLs -----------------------------------------------------)

[url_rclone]:           //github.com/ncw/rclone
[url_install_rclone]:   //rclone.org/install/

[url_ondemand]:         //login.sherlock.stanford.edu


--8<--- "includes/_acronyms.md"
