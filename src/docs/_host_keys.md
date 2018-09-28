### Host keys

Upon your very first connection to Sherlock, you will be greeted by a warning
such as :

    The authenticity of host 'login.sherlock.stanford.edu' can't be established.
    ECDSA key fingerprint is SHA256:eB0bODKdaCWtPgv0pYozsdC5ckfcBFVOxeMwrNKdkmg.
    Are you sure you want to continue connecting (yes/no)?

The same warning will be displayed if your try to connect to one of the [Data
Transfer Node (DTN)][url_dtn]:

    The authenticity of host 'dtn.sherlock.stanford.edu' can't be established.
    ECDSA key fingerprint is SHA256:eB0bODKdaCWtPgv0pYozsdC5ckfcBFVOxeMwrNKdkmg.
    Are you sure you want to continue connecting (yes/no)?


This warning is normal: your SSH client warns you that it is the first time it
sees that new computer. To make sure you are actually connecting to the right
machine, you should compare the ECDSA key fingerprint shown in the message with
one of the fingerprints below:

Key type | Key Fingerprint
---------|----------------
RSA      | `SHA256:T1q1Tbq8k5XBD5PIxvlCfTxNMi1ORWwKNRPeZPXUfJA`<br/><small>legacy format: `f5:8f:01:46:d1:f9:66:5d:33:58:b4:82:d8:4a:34:41`</small>
ECDSA    | `SHA256:eB0bODKdaCWtPgv0pYozsdC5ckfcBFVOxeMwrNKdkmg`<br/><small>legacy format: `70:4c:76:ea:ae:b2:0f:81:4b:9c:c6:5a:52:4c:7f:64`</small>


If they match, you can proceed and type ‘yes’. Your SSH program will then store
that key and will verify it for every subsequent SSH connection, to make sure
that the server you're connecting to is indeed Sherlock.


#### Host keys warning

If you've connected to Sherlock 1.0 before, there's a good chance the
Sherlock 1.0 keys were stored by your local SSH client. In that case, when
connecting to Sherlock 2.0 using the `sherlock.stanford.edu` alias, you
will be presented with the following message:

    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @ WARNING: POSSIBLE DNS SPOOFING DETECTED! @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    The RSA host key for sherlock.stanford.edu has changed, and the key for
    the corresponding IP address 171.66.97.101 is unknown. This could
    either mean that DNS SPOOFING is happening or the IP address for the
    host and its host key have changed at the same time.
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
    Someone could be eavesdropping on you right now (man-in-the-middle
    attack)!  It is also possible that a host key has just been changed.
    The fingerprint for the RSA key sent by the remote host is
    SHA256:T1q1Tbq8k5XBD5PIxvlCfTxNMi1ORWwKNRPeZPXUfJA.
    Please contact your system administrator.

You can just check that the SHA256 key listed in that warning message
correctly matches the one listed in the table above, and if that's the
case, you can safely remove the `sherlock.stanford.edu` entry from your
`~/.ssh/known_hosts` file with the following command on your local machine:

    $ ssh-keygen -R sherlock.stanford.edu

and then connect again. You'll see the first-connection prompt [mentioned
above](#host-keys), and your SSH client will store the new keys for future
connections.



[comment]: #  (link URLs -----------------------------------------------------)

[url_dtn]:	/docs/storage/data-transfer/#data-transfer-node-dtn
