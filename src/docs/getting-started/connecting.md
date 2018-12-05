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

    Sherlock does **not** store your SUNet ID password. As a consequence, we
    are unable to reset your password. If you require password assistance,
    please see the [SUNet Account page][url_suaccounts].

## Connection

Access to Sherlock is provided via Secure Shell (SSH) login. Most Unix-like
operating systems provide an SSH client by default that can be accessed by
typing the `ssh` command in a terminal window.

To login to Sherlock, open a terminal and type the following command, where
`<sunetid>` should be replaced by your *actual* SUNet ID:

```bash
$ ssh <sunetid>@login.sherlock.stanford.edu
```

Upon logging in, you will be connected to one of Sherlock's load-balanced login
node. You should be automatically directed to the least-loaded login node at
the moment of your connection, which should give you the best possible
environment to work.

--8<--- "_host_keys.md"


### Authentication

#### Password

To ease access and increase compatibility[^krb_legacy] with different
platforms, Sherlock allows a simple password-based authentication mechanism for
SSH.[^auth_methods].

Upon connection, you will be asked for your SUNet ID password with the
following prompt:

```
<sunetid>@login.sherlock.stanford.edu's password:
```

Enter your password, and if it's correct, you should see the following line:

```
Authenticated with partial success.
```

#### Second factor (2FA)

Sherlock implements Stanford's [Minimum Security Standards][url_minsec]
policies which mandate two-step authentication to access the cluster.

Two-step authentication protects your personal information and credentials by
combining something only you *know* (your password) with something only you
*have* (your phone, tablet or token). This prevents an attacker who would steal
your password to actually use it to impersonate you. For more details about
two-step authentication at Stanford, please refer to the [University IT
two-step][url_twostep] page.


After successfully entering your password, you'll be prompted for your second
authentication factor with a message like this:

```
Duo two-factor login for <sunetid>

Enter a passcode or select one of the following options:

 1. Duo Push to XXX-XXX-9999
 2. Phone call to XXX-XXX-9999
 3. SMS passcodes to XXX-XXX-9999 (next code starts with: 9)

Passcode or option (1-3):
```

!!! tip "Avoiding two-factor prompt on each connection"

    If you routinely open multiple sessions to Sherlock, having to confirm each
    one of them with a second authentication factor could rapidely become
    cumbersome. To work around this, the OpenSSH client allows multiplexing
    channels and re-using existing authenticated for opening new sessions.
    Please see the [Advanced Connection Options][url_avoid_duo] page for more
    details.

If your second factor is accepted, you'll see the following message:

    Success. Logging you in...

### Authentication failures

!!! danger "Excessive authentication failures"

    Entering an invalid password multiple times will result in a (temporary)
    ban of your IP address.

To prevent brute-force password guessing attacks on Sherlock login nodes, we
automatically block IP addresses that generate too many authentication failures
in a given time span. This results in a temporary ban of the infringing IP
address, and the impossibility for the user to connect to Sherlock from that
IP address.

When this happens, your SSH connection attempts will result in the following
error:

    ssh: connect to host login.sherlock.stanford.edu port 22: Connection refused

IP blocked by this mechanism will automatically be authorized again after some
time.

!!! warning "SSHFS on macOS"

    SSHFS on macOS is known to try to [automatically reconnect][url_sshfs]
    filesystem mounts after resuming from sleep or uspend, even without any
    valid credentials.  As a result, it will generate a lot of failed
    connection attempts and likely make your IP address blacklisted on login
    nodes.

    Make sure to unmount your SSHFS drives before putting your macOS system
    to sleep to avoid this situation.




!!! info "VPN"

    If your IP got blocked and you have an urgent need to connect, before the
    automatic blacklist expiration, we recommend trying to connect through
    [Stanford's VPN][url_vpn]: your computer will then use a different IP
    address and will not be affected by the ban on your regular IP address.



## Login

Congratulations! You've successfully connected to Sherlock. You'll be greeted
by the following *message of the day*:

```

             --*-*- Stanford Research Computing Center -*-*--
                ____  _               _            _
               / ___|| |__   ___ _ __| | ___   ___| | __
               \___ \| '_ \ / _ \ '__| |/ _ \ / __| |/ /
                ___) | | | |  __/ |  | | (_) | (__|   <
               |____/|_| |_|\___|_|  |_|\___/ \___|_|\_\ 2.0

-----------------------------------------------------------------------------
  This system is for authorized users only and you are expected to comply
  with all Stanford computing, network and research policies.
  For more info, see https://acomp.stanford.edu/about/policy and
  https://doresearch.stanford.edu/policies/research-policy-handbook
-----------------------------------------------------------------------------
  This system is *NOT* HIPAA compliant and shouldn't be used to process PHI
  See https://privacy.stanford.edu/faqs/hipaa-faqs for more information.
-----------------------------------------------------------------------------

  Support           email: srcc-support@stanford.edu
  ========   office hours: Tuesdays 10-11am, Thursdays 3-4pm,
                           room 255 @ Polya Hall

  Web                 www: https://www.sherlock.stanford.edu
  ========           news: https://news.sherlock.stanford.edu
                   status: https://status.sherlock.stanford.edu

-----------------------------------------------------------------------------
```

Once authenticated to Sherlock, you'll see the following prompt:

<!-- manual coloring -->
<pre style="padding: 10.5px 12px">
[<font color=lawngreen>&lt;sunetid&gt;</font>@sh-ln01 <font color=red>login!</font> ~]$
</pre>

It indicates the name of the login node you've been connected to, and a
reminder that you're actually connected to a [login node][url_login], not a
compute node.

!!! danger "Login nodes are not for computing"

    Login nodes are shared among many users and therefore must not be used to
    run computationally intensive tasks. Those should be submitted to the
    scheduler which will dispatch them on compute nodes.

By contrast, the shell prompt on a login node looks like this:

<!-- manual coloring -->
<pre style="padding: 10.5px 12px">
[<font color=lawngreen>&lt;sunetid&gt;</font>@sh-101-01 ~]$
</pre>


## Start computing

To start computing, there's still a extra step required, which is requesting
resources to run your application. It's all described in the [next
section][url_submit].

[comment]: #  (link URLs -----------------------------------------------------)

[url_prereq]:       /docs/getting-started/prerequisites
[url_account]:      /docs/getting-started/prerequisites#how-to-request-an-account
[url_avoid_duo]:    /docs/advanced-topics/connection#avoiding-multiple-duo-prompts
[url_other_auth]:   /docs/advanced-topics/connection#authentication-methods
[url_suaccounts]:   https://accounts.stanford.edu/
[url_sunet]:        https://uit.stanford.edu/service/accounts/sunetids
[url_minsec]:       https://uit.stanford.edu/guide/securitystandards
[url_twostep]:      https://uit.stanford.edu/service/webauth/twostep
[url_login]:        /docs/overview/glossary/#login-nodes
[url_submit]:       /docs/getting-started/submitting
[url_contact]:      mailto:srcc-support@stanford.edu
[url_sshfs]:        /docs/storage/data-transfer#sshfs
[url_vpn]:          https://uit.stanford.edu/service/vpn

[comment]: #  (footnotes -----------------------------------------------------)

[^krb_legacy]: On Sherlock 1.0, GSSAPI tokens (based on Kerberos tickets)
were the only allowed authentication method, which could cause some
interoperability with third-party SSH clients.

[^auth_methods]: For other methods of authentication, see the [Advanced
 Connection Options][url_other_auth] page.


