!!! warning "Containers that start an SSH server"

    Some container images, especially desktop and notebook environments,
    start an SSH server automatically when they run, from their startup
    scripts or entry point. [Running your own SSH server is not allowed on
    Sherlock][url_no_sshd], including inside a container, and such servers
    are automatically terminated.

    Before using an image like this, check what it starts and disable the SSH
    server, or use a different image. To get a shell on the node where your
    container runs, SSH to that node from a login node while your job is
    running.

[url_no_sshd]:  /docs/user-guide/running-jobs.md#connecting-to-nodes
