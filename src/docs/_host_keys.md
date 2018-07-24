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


[comment]: #  (link URLs -----------------------------------------------------)

[url_dtn]:	/docs/user-guide/storage/data-transfer/#data-transfer-node-dtn
