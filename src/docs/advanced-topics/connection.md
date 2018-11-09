# Advanced connection options

## Login nodes

Sherlock login nodes are regrouped behind a single DNS alias:
`login.sherlock.stanford.edu`.

This alias provides a load-balanced login environment, and the assurance that
you will be connected to the least loaded login node when you connect to
Sherlock.

If for any reason, you want to directly connect to a specific login node
and bypass the automatic load-balanced dispatching of new connections
(which we don't recommend), you can use that login node's hostname
explicitly. For instance:

```
$ ssh <sunetid>@ln01.sherlock.stanford.edu
```

This can be useful if you run long-standing processes on the login nodes, such
as [screen][url_screen] or [tmux][url_tmux] sessions. To find them back when you
reconnect to Sherlock, you will indeed need to login to the same login node you
started them on.

The drawback is that by connecting to a specific login node, you will forfeit
the load-balancing benefits, which could result in a crowded environment, or
even in login errors in case that specific login node is unavailable.



## Authentication methods

!!! warning "Public-key authentication"

    SSH public-key authentication is **not** supported on Sherlock.

### Password <small>(recommended)</small>

The recommended way to authenticate to Sherlock is to simply use your SUNet ID
and password, as described in the [Connecting][url_connecting] page.

Passwords are not stored on Sherlock. Sherlock login nodes will delegate
password authentication to the [University central Kerberos
service][url_kerberos].

### GSSAPI

For compatibility with previous generations of Sherlock, GSSAPI[^gssapi]
authentication is still allowed, and could be considered a more convenient
option, as this mechanism doesn't require entering your password for each
connection.

GSSAPI authentication relies on a token system, where users obtain Kerberos
ticket-granting tickets, transmit them via SSH to the server they want to
connect to, which will, in turn, verify their validity. That way, passwords are
never stored locally, and never transit over the network. That's why Kerberos
is usually considered the most secure method to authenticate.

To connect using GSSAPI on Sherlock, you'll need to go through a few
steps[^os_support]:

1. make sure the Kerberos user tools are installed on your local machine.
   You'll need the `kinit` (and optionally `klist` and `kdestroy`) utilities.
   Please refer to your OS documentation to install them if required.

2. download and install the Stanford `krb5.conf` file, which contains
   information about the Stanford Kerberos environment:

    ```
    $ sudo curl -o /etc/krb5.conf https://web.stanford.edu/dept/its/support/kerberos/dist/krb5.conf
    ```

3. configure your SSH client, by modifying (or creating if it doesn't
   exist already) the `.ssh/config` file in your home directory on your local
   machine. Using a text editor, you can add the following lines to your
   `~/.ssh/config` file (indentation is important):

    ```
    Host login.sherlock.stanford.edu
        GSSAPIDelegateCredentials yes
        GSSAPIAuthentication yes
    ```

Once everything is in place (you only need to do this once), you'll be able to
test that your Kerberos installation works by running `kinit
<sunetid>@stanford.edu`. You should get a password prompt, and upon success,
you'll be able to list your Kerberos credentials with the `klist` command:

```
$ kinit kilian@stanford.edu
Password for kilian@stanford.edu:
$ klist
Ticket cache: FILE:/tmp/krb5cc_215845_n4S4I6KgyM
Default principal: kilian@stanford.edu

Valid starting     Expires            Service principal
07/28/17 17:33:54  07/29/17 18:33:32  krbtgt/stanford.edu@stanford.edu
        renew until 08/04/17 17:33:32
```

!!! important "Kerberos ticket expiration"

    Kerberos tickets have a 25-hour lifetime. So you'll need to run the `kinit`
    command pretty much once a day to continue being able to authenticate to
    Sherlock.

Please note that when your Kerberos ticket expire, existing Sherlock
connections will *not* be interrupted. So you'll be able to keep connections
open to Sherlock for several days without any issue.

You're now ready to connect to Sherlock using GSSAPI. Simply SSH as usual:

```
$ ssh <sunetid>@login.sherlock.stanford.edu
```

and if everything goes well, you should directly see the two-factor (Duo)
prompt, without having to enter your password.


If you want to destroy your Kerberos ticket before its expiration, you can use
the `kdestroy` command.


## SSH options

OpenSSH offers a variety of configuration options that you can use in
`~/.ssh/config` on your local computer. The following section describe some of
the options you can use with Sherlock that may make connecting and transferring
files more convenient.

### Avoiding multiple Duo prompts

In order to avoid getting a second-factor (Duo) prompt every time you want to
open a new connection to Sherlock, you can take advantage of the multiplexing
features provided by OpenSSH.

Simply add the following lines to your `~/.ssh/config` file on your local
machine to activate the `ControlMaster` option. If you already have a `Host
login.sherlock.stanford.edu` block in your configuration file, simply add the
`Control*` option lines in the same block.

```
Host login.sherlock.stanford.edu
    ControlMaster auto
    ControlPersist yes
    ControlPath ~/.ssh/%l%r@%h:%p
```



It will allow SSH to re-use an existing connection to Sherlock each time you
open a new session (create a new SSH connection), thus avoiding subsequent 2FA
prompts once the initial connection is established.

The slight disadvantage of this approach is that once you have a connection
open to one of Sherlock's login nodes, all your subsequent connections will be
using the same login node. This will somewhat defeat the purpose of the load-balancing mechanism
used by the login nodes.


!!! tip "Connection failure with `unix_listener` error"

    If your connection fails with the following error message:
    ```
    unix_listener: "..." too long for Unix domain socket
    ```
    you're being hit by a macOS limitation, and you should replace the
    `ControlPath` line above by:
    ```
    ControlPath ~/.ssh/%C
    ```



[comment]: #  ( TODO: Network, Ciphers )



## Connecting from abroad

!!! tip "VPN"

    As a good security practice, we always recommend to use the [Stanford
    VPN][url_vpn] when connecting from untrusted networks.

Access to Sherlock is not restricted to campus, meaning that you can connect to
Sherlock from pretty much anywhere, including when traveling abroad.  We don't
restrict inbound SSH connections to any specific IP address range or
geographical location, so you shouldn't have any issue to reach the login nodes
from anywhere.

Regarding two-step authentication, University IT provides [alternate
authentication options][url_alt2fa] when phone service or Duo Mobile push
notifications are not available.




[comment]: #  (link URLs -----------------------------------------------------)

[url_screen]:       https://www.gnu.org/software/screen
[url_tmux]:         https://github.com/tmux/tmux/wiki
[url_connecting]:   /docs/getting-started/connecting/#authentication
[url_kerberos]:     https://uit.stanford.edu/service/kerberos
[url_prereq]:       /docs/getting-started/prerequisites/#windows
[url_vpn]:          https://uit.stanford.edu/service/vpn
[url_alt2fa]:       https://uit.stanford.edu/service/webauth/twostep

[comment]: #  (footnotes -----------------------------------------------------)

[^gssapi]: The Generic Security Service Application Program Interface (GSSAPI,
  also GSS-API) is an application programming interface for programs to access
  security services. It allows program to interact with security services such
  as Kerberos for user authentication.

[^os_support]: Those instructions should work on Linux :fa-linux: and MacOs
  :fa-apple: computers. For Windows :fa-windows:, we recommend using the WSL,
  as described in the [Prerequisites][url_prereq] page.
