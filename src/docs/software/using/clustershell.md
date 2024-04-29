## Introduction

[ClusterShell][url_clush] is a command-line tool and library that helps running
commands in parallel on multiple servers. It allows executing arbitrary
commands across multiple hosts. On Sherlock, it provides an easy way to run
commands on nodes your jobs are running on, and collect back information.  The
two most useful commands provided are `cluset`, which can manipulate lists of
nodenames, and `clush`, which can run commands on multiple nodes at once.


### More documentation

The following documentation specifically intended for using ClusterShell on
Sherlock. For more complete documentation about ClusterShell in general,
please see the [ClusterShell documentation][url_clush_docs].

The ClusterShell library can also be directly be integrated in your Python
scripts, to add a wide range of functionality. See the [ClusterShell Python API
documentation][url_doc_clush_api] for reference.


## ClusterShell on Sherlock

ClusterShell is available on Sherlock and the corresponding
[module][url_modules] can be loaded with:

``` none
$ ml system py-clustershell
```

### `cluset`

The [`cluset`][url_doc_cluset] command can be used to easily manipulate lists
of node names, and to expand, fold, or count them:

``` none
$ cluset --expand sh03-01n[01-06]
sh03-01n01 sh03-01n02 sh03-01n03 sh03-01n04 sh03-01n05 sh03-01n06

$ cluset --count sh03-01n[01-06]
6

$ cluset --fold sh03-01n01 sh03-01n02 sh03-01n03 sh03-01n06
sh03-01n[01-03,06]
```

### `clush`

The [`clush`][url_doc_clush] command uses the same node list syntax to allow
running the same commands simultaneously on those nodes. `clush` uses SSH to
connect to each of these nodes.

!!! warning

    You can only SSH to nodes where your jobs are running, and as a
    consequence, `clush` will only work on those nodes.

For instance, to check the load on multiple compute nodes at once:

``` none
$ clush -w sh03-01n[01-03] cat /proc/loadavg
sh03-01n01: 19.48 14.43 11.76 22/731 22897
sh03-01n02: 13.20 13.29 13.64 14/831 1163
sh03-01n03: 11.60 11.48 11.82 18/893 23945
```

!!! tip "Gathering identical output"

    Using the the `-b` option will regroup similar output lines to make
    large outputs easier to read. By default, the output of each node will be
    presented separately.

    For instance, without `-b`:

    ``` none
    $ clush -w sh03-01n[01-03] echo ok
    sh03-01n02: ok
    sh03-01n03: ok
    sh03-01n01: ok
    ```

    With `-b`:

    ``` none
    $ clush -bw sh03-01n[01-03] echo ok
    ---------------
    sh03-01n[01-03] (3)
    ---------------
    ok
    ```


### Slurm integration

On Sherlock, ClusterShell is also tightly integrated with the job scheduler,
and can directly provide information about a user's jobs and the nodes they're
running on. You can use the following groups to get specific node lists:

| group name | short name | action | example |
| ----- | -------- | ----- | ------- |
| `@user:` | `@u:` | list nodes where user has jobs running | `cluset -f @user:$USER` |
| `@job:`  | `@j:` | list nodes where job is running        | `cluset -f @job:123456` |
| `@nodestate:` | `@node:`,`@n:` | list nodes in given state     | `cluset -f @nodestate:idle` |
| `@partition:` | `@part:`,`@p:` | list nodes in given partition | `cluset -f @partition:gpu`  |

For instance, to get the list of nodes where job `123456` is running:

``` none
$ cluset -f @job:123456`
```


## Examples

### Job information

For instance, if job 1988522 from user `kilian` is running on nodes
`sh02-01n[59-60]`,  `squeue` would display this:

``` none
$ squeue -u kilian
       JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
     1988522    normal interact   kilian  R       1:30      2 sh02-01n[59-60]
     1988523    normal interact   kilian  R       1:28      2 sh02-01n[61-62]

```

With ClusterShell, you could get:

* the list of node names where user `kilian` has jobs running:

    ``` none
    $ cluset -f @user:kilian
    sh02-01n[59-62]
    ```

* the nodes where job 1988522 is running, in an expanded form:

    ``` none
    $ cluset -e @job:1988522
    sh02-01n59 sh02-01n60
    ```

### Node states

You can also use those binding to get lists of nodes in a particular state, in
a given partition. For instance, to list the nodes that are in "mixed" state in
the `dev` partition, you can request the intersection between the
`@state:mixed` and `@partition:dev` node lists:

``` none
$ cluset -f @nodestate:mixed -i @partition:dev
sh02-01n[57-58]
```

### Local storage

To get a list of files in [`$L_SCRATCH`][url_lscratch] on all the nodes that
are part of job `1988522`:

``` none
$ $ clush -w@j:1988522 tree $L_SCRATCH
sh02-01n59: /lscratch/kilian
sh02-01n59: ├── 1988522
sh02-01n59: │   └── foo
sh02-01n59: │       └── bar
sh02-01n59: └── 1993608
sh02-01n59:
sh02-01n59: 3 directories, 1 file
sh02-01n60: /lscratch/kilian
sh02-01n60: └── 1988522
sh02-01n60:
sh02-01n60: 1 directory, 0 files
```

### Process tree

To display your process tree across all the nodes your jobs are running on:

``` none
$ clush -w @u:$USER pstree -au $USER
sh02-09n71: mpiBench
sh02-09n71:   `-3*[{mpiBench}]
sh02-09n71: mpiBench
sh02-09n71:   `-3*[{mpiBench}]
sh02-09n71: mpiBench
sh02-09n71:   `-3*[{mpiBench}]
sh02-09n71: mpiBench
sh02-09n71:   `-3*[{mpiBench}]
sh02-10n01: mpiBench
sh02-10n01:   `-3*[{mpiBench}]
sh02-10n01: mpiBench
sh02-10n01:   `-3*[{mpiBench}]
sh02-10n01: mpiBench
sh02-10n01:   `-3*[{mpiBench}]
sh02-10n01: mpiBench
sh02-10n01:   `-3*[{mpiBench}]
```

### CPU usage

To get the CPU and memory usage of your processes in job `2003264`:

``` none
$ clush -w @j:2003264 ps -u$USER -o%cpu,rss,cmd
sh03-07n12: %CPU   RSS CMD
sh03-07n12:  0.0  4780 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-07n12:  0.0  4784 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-07n12:  0.0  4784 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-07n12:  0.0  4780 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n06: %CPU   RSS CMD
sh03-06n06:  0.0 59596 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n06:  0.0 59576 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n06:  0.0 59580 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n06:  0.0 59588 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n05: %CPU   RSS CMD
sh03-06n05:  0.0  7360 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n05:  0.0  7328 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n05:  0.0  7344 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n05:  0.0  7340 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n11: %CPU   RSS CMD
sh03-06n11: 17.0 59604 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n11: 17.0 59588 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n11: 17.0 59592 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
sh03-06n11: 17.0 59580 /home/users/kilian/benchs/MPI/mpiBench/mpiBench -i 1000000
```

### GPU usage

To show what's running on all the GPUs on the nodes associated with job `123456`:

``` none
$ clush -bw @job:123456 nvidia-smi --format=csv --query-compute-apps=process_name,utilization.memory
sh03-12n01: /share/software/user/open/python/3.6.1/bin/python3.6, 15832 MiB
sh02-12n04: /share/software/user/open/python/3.6.1/bin/python3.6, 15943 MiB
```




[comment]: #  (link URLs -----------------------------------------------------)

[url_clush]:        //cea-hpc.github.io/clustershell/
[url_clush_docs]:   //clustershell.readthedocs.io/
[url_doc_cluset]:   //clustershell.readthedocs.io/en/latest/tools/cluset.html
[url_doc_clush]:    //clustershell.readthedocs.io/en/latest/tools/clush.html
[url_doc_clush_api]://clustershell.readthedocs.io/en/latest/api/NodeSet.html#usage-example


[url_modules]:      ../modules.md
[url_lscratch]:     ../../storage/filesystems.md#l_scratch

[comment]: #  (footnotes -----------------------------------------------------)


--8<--- "includes/_acronyms.md"
