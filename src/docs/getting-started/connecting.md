# Connecting <small>to Sherlock </small>

!!! warning "Sherlock account required"

    To be able to connect to Sherlock, you must first obtain a [Sherlock
    account][url_account].


## Credentials

All users must have a [Stanford SUNet ID][url_sunet] and a [Sherlock
account][url_account] to log in to Sherlock. Your Sherlock account uses the
same username/password as your SUnet ID:

    Username: SUNet ID
    Password: SUNet ID password

To request a Sherlock account, please see the [Prerequisites][url_account]
page.

!!! important "Resetting passwords"

    Sherlock does not store your SUNet ID password and we are unable to reset
    your password. If you require password assistance, please see the [SUNet
    Account page][url_suaccounts].

## Login

Access to Sherlock is provided via Secure Shell (SSH) login. Most Unix-like
operating systems provide an SSH client by default that can be accessed by
typing the `ssh` command in a terminal window.

To login to Sherlock, open a terminal and type the following command, where
`<SUNet ID>` should be replaced by your *actual* SUNet ID:

```bash
$ ssh <SUNet ID>@login.sherlock.stanford.edu
```

Upon logging in, you will be connected to one of SHerlock's load-balanced login
node. You should be automatically directed to the least-loaded login node at
the moment of your connection, which should give you the best possible
environment to work.

!!! tip "Connecting to a specific login node"

    If for any reason, you want to directly connect to a specific login node
    and bypass the automatic load-balanced dispatching of new connections
    (which we don't recommend), you can use that login node's hostname
    explicitely. For instance:
    ```
    $ ssh <SUNet ID>@ln0X.sherlock.stanford.edu
    ```

### Host keys

Upon your very first connection to Sherlock, you will be greeted by a warning
such as :

```
The authenticity of host 'login.sherlock.stanford.edu (171.66.97.102)' can't be established.
ECDSA key fingerprint is SHA256:eB0bODKdaCWtPgv0pYozsdC5ckfcBFVOxeMwrNKdkmg.
Are you sure you want to continue connecting (yes/no)?
```


This warning is normal: your SSH client warns you that it is the first time it
sees that new computer. To make sure you are actually connecting to the right
machine, you should compare the ECDSA key fingerprint shown in the message with
one of the fingerprints below:

RSA
: `SHA256:T1q1Tbq8k5XBD5PIxvlCfTxNMi1ORWwKNRPeZPXUfJA`

ECDSA
: `SHA256:eB0bODKdaCWtPgv0pYozsdC5ckfcBFVOxeMwrNKdkmg`

ED25519
: `SHA256:vVk4tXswI9gtDO0FZ+YaZZYFZoG42l2ZD2XVQKoKZms`

If they match, you can proceed and type ‘yes’. Your SSH program will then store
that key and will check it for every subsequent SSH connection, so you'll be sure that the server to
which you connect is indeed Sherlock.



### Authentication

#### Password
#### Kerberos


### Duo


### Tips
#### ControlPersist



[comment]: #  (link URLs -----------------------------------------------------)

[url_prereq]:       /docs/getting-started/prerequisites
[url_account]:      /docs/getting-started/prerequisites#how-to-request-an-account
[url_suaccounts]:   https://accounts.stanford.edu/
[url_sunet]:        https://uit.stanford.edu/service/accounts/sunetids

[comment]: #  (footnotes -----------------------------------------------------)
