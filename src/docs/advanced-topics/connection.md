# Advanced connection options

:construction:


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

    $ ssh <sunetid>@ln01.sherlock.stanford.edu


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

### GSSAPI




## SSH options


### ControlMaster

### Network


### Ciphers



[comment]: #  (link URLs -----------------------------------------------------)

[url_screen]: https://www.gnu.org/software/screen
[url_tmux]:   https://github.com/tmux/tmux/wiki

[comment]: #  (footnotes -----------------------------------------------------)

