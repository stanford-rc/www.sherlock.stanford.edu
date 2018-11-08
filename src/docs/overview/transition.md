# Sherlock 2.0 <small>transition guide</small>

This transition guide is intended for users already familiar with Sherlock, to
help them moving to Sherlock 2.0: differences with the existing, temporary
conditions, etc.

!!! tip "Sherlock 2.0 orders"

    If you are looking to buy into Sherlock 2.0, please see the [Sherlock
    Order][url_orders] page (*SUNet ID required*).


## Why Sherlock 2.0?

Sherlock started in 2014 with 120 general use compute nodes and their
associated networking (high-performance interconnect) and storage (Lustre
scratch filesystem) infrastructure. Those nodes have been consistently heavily
used.  An additional 730+ nodes were purchased by a wide variety of
[Stanford][url_stanford] and [SLAC][url_slac] researchers and added to the
initial base.

However, the Infiniband fabric (the supporting network that interconnects all
of the nodes and storage) eventually reached capacity, effectively putting a
halt to Sherlock's growth. With the help of new recurring funding from the
University, a new, completely separate cluster has been kick-started, with its
own Infiniband fabric, new management servers, and a set of more
capable compute nodes. These new nodes, along with an updated software
environment, forms the basis of Sherlock 2.0.

For the sake of simplicity, we'll refer to the new environment as Sherlock
2.0, and to the existing one as Sherlock 1.0.

### Transition process

!!! info "Storage"

    For the whole duration of the transition process, storage will be shared
    between Sherlock 1.0 and Sherlock 2.0 and will be accessible from both,
    meaning that users will be able to access and work on the the same files
    whatever cluster they connect to.

To allow every user to smoothly transition to the new system, a 3-phase
process will take place.

**Phase 1**: coexistence

: For the duration of the transition period, both Sherlock 1.0 and Sherlock 2.0
will coexist. As two separate clusters, they will use distinct login nodes and
provide access to different hardware and software.

    !!! warning "Two isolated clusters"

        Specific compute nodes will only be accessible from one
        cluster at a time: the new compute nodes from Sherlock 2.0, and the old
        nodes from Sherlock 1.0. It also means that jobs submitted on Sherlock
        1.0 will not visible from Sherlock 2.0, and vice-versa.

**Phase 2**: merge

: After sufficient time for the majority of users to validate and migrate to
the new environment, the original Sherlock nodes will be merged into the new
cluster. We'll work with individual owners to determine the best time frame for
their own nodes migration, and will announce a date for the migration of all
the general nodes from the public partitions.


**Phase 3**: retirement

: As they age out, compute nodes older than 5 years will be retired, to
comply with the data center usage guidelines. When all the remaining Sherlock
1.0 nodes have been merged into Sherlock 2.0, the Sherlock 1.0 and 2.0
distinction will disappear, and Sherlock will be a single system again.

### Timeline

The Sherlock 1.0 to Sherlock 2.0 transition will happen according to the
following timeline:

- [x] 05/08/2018: no new users accounts will be created on Sherlock 1.0
- [x] 05/14/2018: the `gpu` and `bigmem` partitions are migrated to
  Sherlock 2.0
- [x] 06/25/2018: the `normal` partition is migrated to Sherlock 2.0
- [x] 07/02/2018: the login and DTN nodes are migrated to Sherlock 2.0

This will effectively mark the end of the Sherlock 1.0 environment.


## What changes?

Quite a lot!

!!! tldr "Most notable upgrades"

    Additional cores per CPU, increased Infiniband throughput, twice the amount
    of memory per node and higher memory/core ratio, increased power
    redundancy, a new OS and software stack, and mandatory 2FA.


### Documentation

As part of our documentation and communication effort, we're announcing
three new web resources for Sherlock:

* a [changelog][url_changelog] for news and updates, to get a better sense of
  what's happening on Sherlock, beyond general email announces,
* a [status dashboard][url_status], where you'll find up-to-date information
  about the status of the main Sherlock components and services. You could also
  subscribe to receive notification in case of events or outages,
* and of course the very [documentation][url_docs] you're reading right now.


### Login


The most notable changes are visible right from the connection process.

| Main changes            | Sherlock 1.0  | Sherlock 2.0  |
| ---                     | ------------- | ------------- |
| **Login nodes**         | `sherlock.stanford.edu` | `login.sherlock.stanford.edu` |
| **Authentication scheme** | GSSAPI (Kerberos) | SUNet ID password or GSSAPI |
| **Two-step authentication** | no | yes |


**New login hostname**

: Sherlock 2.0 uses a new set of login nodes, under a different load-balanced
  hostname. To connect, you'll need to use:
  ```
  $ ssh <sunet>@login.sherlock.stanford.edu
  ```
  (note the `login` part of the hostname)

    !!! info "New server fingerprint"

        When you connect to the new login nodes for the first time, you'll be
        presented with the new servers' fingerprint (host keys). Please see the
        [Connecting][url_hostkeys] page for more details.

**New authentication scheme**

: GSSAPI (Kerberos) is not required anymore. To make up for the next item, we
  relaxed the requirement on Kerberos authentication for Sherlock 2.0. Meaning
  that you will now be able to connect using your SUNet ID password, without
  having to get a Kerberos ticket via `kinit` first.  We hope this will also
  ease the connection process from clients and OS which don't correctly support
  GSSAPI. And please note that if you still want to use Kerberos for
  authentication, you can.

**Two-step authentication**

: Two-step (or two-factor) authentication (2FA) this is now a requirement in
  the [Minimum Security Standards][url_minsec] mandated by the [Information
  Security Office][url_iso], and that we're implementing on Sherlock. Upon
  connection, you will be prompted for your password (if you're not using
  GSSAPI) and a two-factor prompt like this:
  ```
  Duo two-factor login for johndoe

  Enter a passcode or select one of the following options:

   1. Duo Push to XXX-XXX-4425
   2. Phone call to XXX-XXX-4425
   3. SMS passcodes to XXX-XXX-4425 (next code starts with: 1)

  Passcode or option (1-3):
  ```
    Upon validation of the passcode, you'll be connected to Sherlock's login
    nodes as usual.


For more details about the login procedure, see the [Connecting][url_login]
page.


### Hardware

A number of changes differentiate Sherlock 2.0 from the first generation:
technology has evolved and those changes are reflected in the new hardware
specifications. Here are the main changes on typical compute nodes:

| Main changes      | Sherlock 1.0  | Sherlock 2.0 |
| ---               | ------------- | ------------ |
| **Nodes**         | 1U Dell R630 servers  | 0.5U C6320 servers in a 2U chassis |
| **CPUs**          | 2x 8-core (Ivy-Bridge/Haswell) | 2x 10-core (Broadwell) |
| **Memory**        | 64G (base node)       | 128G (base node) |
| **Local storage** | 200G SSD (+ 500G HDD) | 200G SSD |
| **Interconnect**  | 56G FDR Infiniband    | 100G EDR Infiniband |

**Nodes**

: Base node model moves from the Dell R630 1U server to the Dell C6320
  system. More servers will fit in a single rack, which is essential for us to
  accommodate the ever-increasing demand for servers.  Another change is that
  the new model provides redundant power supplies, in case one fails. Each
  C6320 chassis houses four independent servers in only two rack units of
  space.

**CPUs**

: Upgrade from Intel(r) Xeon(r) E5-2640v3 (8-core, 2.6GHz) to E5-2640v4
  (10-core, 2.4GHz), meaning that each CPU gets two additional cores, and that
  to maintain a 90W power envelope, the clock speed changed from 2.6GHz to
  2.4GHz.

**Memory**

: Because of the 2 additional cores per CPU, a total for 4 more per node,
  having a 64GB minimum RAM requirement was no longer deemed to be a good fit.
  Originally, 64GB for 16 cores gave a ratio of 4GB/core. With the same 64GB
  per node, the memory per core ratio on Sherlock 2.0 would have dropped to
  3.2GB/core.  Usage statistics showed that more RAM per core has been needed
  for a wide range of applications.  So for Sherlock 2.0, the minimum memory
  amount per node has be set to 128GB, or 6.4GB/core, a much more appropriate
  ratio for the typical user needs.

**Local storage**

: The slightly smaller form factor of each node has prompted
  elimination of the 500G spinning hard drive, keeping the 200G SSD.  Sherlock
  statistics showed that the hard drive was rarely used, as users favored use
  of the very fast Lustre /scratch file system available to all nodes.

**Interconnect**

: Substantial network improvement by way of an almost 2x increase in
  Infiniband (IB) speed. Sherlock 1.0 uses the FDR IB speed of 56Gbps, while
  Sherlock 2.0 uses EDR IB at 100Gbps.


### Slurm partitions

The same organization of compute nodes will be used on Sherlock 2.0, with the
same partition nomenclature, although different hardware characteristics:

| Main changes   | Sherlock 1.0 | Sherlock 2.0 |
| -------------  | ------------ | ------------ |
| `normal`       | 116x 16c/64GB nodes | 56x 20c/128GB nodes |
| `dev`          | 2x 16c/64GB nodes   | 2x 20c/128GB nodes |
| `bigmem`       | 2x 32c/1.5TB nodes  | 1x 56c/3.0TB node<br/> 1x 32c/512GB node |
| `gpu`          | 6x 16c/256GB nodes <br/> w/ 8x K20/K80/TITAN Black | 5x 20c/256GB nodes <br/> w/ 4x P40/P100_PCIE/V100_NVLINK |


After the first coexistence phase of the [transition](#transition-process),
Sherlock 1.0 nodes will be merged in Sherlock 2.0 partitions, and the resulting
general partitions will be the combination of both. For instance, the `normal`
partition will feature 172 nodes.

#### Job submission parameters

QOS and limits are slightly different too, because of the different
characteristics of Sherlock 2.0, and the new version of Slurm (cf. below).

The main change will be that your jobs won't generally need to specify any QOS,
except for the *long* one. or in other words, `--qos=long` is the only QOS
option you will need to specify in your jobs. The `bigmem` and `gpu` QOSes are
not used anymore for job submission, and will lead to errors if used. The goal
is to simplify job submission for new users and limit the number of parameters
to specify when submitting jobs.

### Software

!!! attention "Changes required"

    Sherlock 2.0 runs a newer version of the Linux Operating System (OS) and as
    a result, most the software available on Sherlock 1.0 needs to be
    recompiled and reinstalled to work optimally in the new environment.

Sherlock 2.0 runs an updated software stack, from kernel to user-space
applications, including management software. Most user-facing applications
are new version of the same software, while the management stack has been
completely overhauled and redesigned from scratch.

Changes include:

| Main changes            | Sherlock 1.0  | Sherlock 2.0  |
| ---                     | ------------- | ------------- |
| **OS**                  | CentOS 6.x    | CentOS 7.x    |
| **Scheduler**           | Slurm 16.05.x | Slurm 17.02.x |



## What stays the same?

We're well aware that transitioning to a new system takes time and effort away
from research, and we wanted to minimize disruption. So we've focused our
attention on revamping and improving the required elements, but we didn't
change it all: we kept the best parts as they are.

### Storage

All the storage systems (including `$HOME`, `$GROUP_HOME`, `$SCRATCH`, `$GROUP_SCRATCH`
and `$OAK`) are shared between Sherlock 1.0 and Sherlock 2.0. So all the
files and folders available on Sherlock 1.0 will be available on Sherlock 2.0.

!!! caution "Path changes"

    Be advised that the paths of the `/home` and `/share/PI` directories have
    changed on Sherlock 2.0.  They are now respectively `/home/users` and
    `/home/groups`.

    We strongly recommend referring to them through the `$HOME` and `$GROUP_HOME`
    environment variables instead of using the full paths.

### File transfers

To transfer files, you can continue to use the existing data-transfer node
(DTN): since all the filesystems are shared between the two clusters, files
uploaded through the DTN will be immediately available on Sherlock 2.0.

For more information, see the [Data transfer][url_transfer] page.

### Scheduler

In terms of scheduling, the same principles users are already familiar
with on Sherlock 1.0 are conserved:

* a set of general partitions, available to all users: `normal`, `bigmem`,
  `gpu`, `dev`,
* owner-specific partitions, regrouping nodes bought by PI groups,
* a global `owners` partition, to allow other owners to use idle nodes,
* same backfilling and fair share scheduling rules,
* similar limits on most partitions,

!!! warning "Owners' partition on Sherlock 2.0"

    While the two clusters operate as separate entities (phase 1 of the
    [transition process](#transition-process)), owners on Sherlock 1.0 and
    Sherlock 2.0 will be considered two distinct groups. Meaning that Sherlock
    1.0 owners won't be able to use the `owners` partition on Sherlock 2.0, and
    vice-versa.

    As we move through [Phase 2](#transition-process), and as Sherlock 1.0
    owners nodes are folded into Sherlock 2.0, Sherlock 1.0 owners will gain
    access to the `owners` partition on Sherlock 2.0.


For more details about the scheduler, see the [Running Jobs][url_jobs] page.


### Software modules

Part of the current Sherlock user software stack has been ported over to
Sherlock 2.0, with a refreshed but similar [modules][url_modules] system.

That software stack on Sherlock is an ongoing effort, and we'll be continuing
to add new applications over the coming days and weeks.


## How to differentiate clusters?

!!! info "Determine the Sherlock version"

    To check which cluster environment you're running on, check the value of
    the `$SHERLOCK` environment variable.

To ease transition to the new software environment, and to make re-using the
same scripts more convenient, we provide a way to check which cluster your
jobs are running on. By checking the value of the `$SHERLOCK` environment
variable, you'll be able to determine which environment your scripts should be
expecting.

| Command                 | Output on Sherlock 1.0  | Output on Sherlock 2.0  |
| ---                     | ------------: | ------------: |
| `echo $SHERLOCK`        | `1`           | `2`           |

So, for instance, the following batch script will check that environment
variable to determine where it's running, and load the appropriate Python
module:

```bash
#!/bin/bash
#
#SBATCH --job-name=test
#SBATCH --time 10:00
#

if [[ "$SHERLOCK" == "1" ]]; then
    echo "Running on Sherlock 1.0"
    module load python/2.7.5

elif [[ "$SHERLOCK" == "2" ]]; then
    echo "Running on Sherlock 2.0"
    module load python/2.7.13

else
    echo "Uh-oh, not sure where we are..."
    exit 1
fi

python -c "print 'Hello Sherlock'"
```

That script could be submitted with `sbatch` on either cluster, and will
produce the exact same output.

The `$SHERLOCK` environment variable will remain available throughout all the
[transition phases](#transition-process), and will stay defined even after the
two clusters have been merged.


## Feedback and support

Your feedback is very important to us, especially in the early stages of a new
system. So please tell us about any issues you run into and successes you have.
Feel free to contact us by email at srcc-support@stanford.edu.





[comment]: #  (link URLs -----------------------------------------------------)

[url_orders]:       https://srcc.stanford.edu/private/sherlock-qtr-order
[url_stanford]:     https://stanford.edu
[url_slac]:         https://slac.stanford.edu
[url_minsec]:       https://uit.stanford.edu/guide/securitystandards
[url_iso]:          https://uit.stanford.edu/security
[url_status]:       https://status.sherlock.stanford.edu
[url_changelog]:    https://news.sherlock.stanford.edu

[url_docs]:         /docs
[url_modules]:      /docs/software/modules
[url_jobs]:         /docs/user-guide/running
[url_login]:        /docs/getting-started/connecting
[url_transfer]:     /docs/storage/data-transfer
[url_hostkeys]:     /docs/getting-started/connecting/#host-keys

[comment]: # (footnodes ------------------------------------------------------)


