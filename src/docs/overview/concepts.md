## Sherlock, a shared resource

Sherlock is a shared compute cluster available for use by all Stanford faculty
members and their research teams to support sponsored research.

!!! warning "Sherlock is a resource for research"

    **Sherlock is not suitable for course work, class assignments or general-use
    training sessions.**

    Users interested in using computing resources in such contexts are
    encouraged to investigate [FarmShare][url_farmshare], Stanford’s community
    computing environment, which is primarily intended for supporting
    coursework.

It is open to the Stanford community as a computing resource to support
departmental or sponsored research, thus a faculty member's sponsorship is
required for all user accounts.

!!! danger "Usage policy"

    Please note that your use of this system falls under the "Computer and
    Network Usage Policy", as described in the [Stanford Administrative
    Guide][url_admin]. In particular, sharing authentication credentials is
    strictly prohibited.  Violation of this policy will result in termination
    of access to Sherlock.


Sherlock has been designed, deployed, and is maintained and operated by the
[Stanford Research Computing Center (SRCC)][url_srcc] staff. The SRCC is a
joint effort of the [Dean of Research][url_dor] and [IT Services][url_uit] to
build and support a comprehensive program to advance computational research at
Stanford.

Sherlock has been initially purchased and supported with seed funding from
Stanford's [Provost][url_provost]. It comprises a set of freely available
compute nodes, a few specific resources such as large-memory machines and GPU
servers, as well as the associated networking equipment and storage.  These
resources can be used to run computational codes and programs, and are managed
through a job scheduler using a [fair-share algorithm][url_fairshare].

### Data risk classification

!!! success "Low and Moderate Risk data"

    Sherlock is approved for computing with Low and Moderate Risk data only.

!!! danger "High Risk data"

    Sherlock is **NOT** approved to store or process [HIPAA][url_HIPAA],
    [PHI][url_PHI], [PII][url_PII] nor any kind of [High Risk][url_datarisk]
    data.  The system is approved for computing with Low and Moderate Risk data
    only, and is **not suitable to process High Risk data**.

    :fontawesome-solid-exclamation-circle: **Users are responsible for ensuring
    the compliance of their own data.**

    For more information about data risk classifications, see the [Information
    Security Risk Classification page][url_risk].


## Investing in Sherlock

For users who need more than casual access to a shared computing environment,
Sherlock also offers Faculty members the possibility to invest in additional,
dedicated computing resources.

Unlike traditional clusters, Sherlock is a collaborative system where the
majority of nodes are purchased and shared by the cluster users. When a user
(typically a PI) purchases one or more nodes, they become an *owner*. Owners
choose from a standard set of server configurations supported by SRCC staff
(known as the Sherlock *catalog*) to add to the cluster.

When they're not in use, PI-purchased compute nodes can be used by other
owners. This model also allows Sherlock owners to benefit from the scale of the
cluster by giving them access to more compute nodes than their individual
purchase, which gives them much greater flexibility than owning a standalone
cluster.

!!! info "The majority of Sherlock nodes are owners nodes"

    The vast majority of Sherlock's compute nodes have been purchased by
    individual PIs and groups, and PI purchases are the main driver behind the
    rapid expansion of the cluster, which went from 120 nodes to more than
    1,000 nodes in less than 3 years.

The resource scheduler configuration works like this:

* owners and their research teams get immediate and exclusive access to the
  resources they purchased,
* when those nodes are idle, other owners can use them,
* when the purchasing owners want to use their resources, jobs from other
  owners that may be running on them are preempted (_ie._ killed and
  re-queued).

This provides a way to get more resources to run less important jobs in the
background, while making sure that an owner always gets immediate access to
his/her own nodes.

Participating owners also have shared access to the public, shared Sherlock
nodes, along with everyone else.

### Benefits

Benefits to owners include:

- [x] **no wait time in queue** with immediate and exclusive access to the
  purchased nodes
- [x] **access to more resources** with the possibility to submit jobs to the
  other owners' nodes when they're not in use

Compared to hosting and managing computing resources on your own, purchasing
nodes on Sherlock provides:

- data center hosting, including backup power and cooling
- system configuration, maintenance and administration
- hardware diagnostics and repairs

Those benefits come in addition to the other Sherlock advantages:

- access to high-performance, large parallel scratch storage space
- access to snapshot'ed, replicated, enterprise-class storage space
- optimized software stack, especially tailored for a range of research needs
- tools to build and install additional software applications as needed
- user support

### Limitations

!!! danger "Being an owner on Sherlock is different from traditional server hosting."

In particular, purchasing your own compute nodes on Sherlock will **NOT**
provide:

:fontawesome-solid-times:{: .chk_no :} **root access**: owner nodes on
  Sherlock are still managed by SRCC in accordance with Stanford's [Minimum
Security Standards](url_minsec). Although users are welcome to install (or
request) any software they may need, purchasing compute nodes on Sherlock does
not allow `root` access to the nodes.

:fontawesome-solid-times:{: .chk_no :} **running permanent services**:
  permanent processes such as web servers or databases can only run on owner
nodes through the scheduler, using [recurring](url_recurring) or
[persistent](url_persistent). Purchasing compute nodes on Sherlock does not
provide a way to run anything that couldn't run on publicly-available nodes.

:fontawesome-solid-times:{: .chk_no :} **direct network connectivity** from the
outside world: owners' nodes are connected to the Sherlock's internal network
and are not directly accessible from the outside, which means that they can't
host public services like web or application servers.

:fontawesome-solid-times:{: .chk_no :} **scheduler bypass**: jobs running on
owners' nodes still need to be submitted to the scheduler. Direct shell access
to the nodes is not possible outside of scheduled interactive sessions.

:fontawesome-solid-times:{: .chk_no :} **persistent local storage**: [local
storage space](url_lscratch) provided on the compute nodes is only usable for
the duration of a job and cannot be used to store long-term data.

:fontawesome-solid-times:{: .chk_no :} **additional storage space**: purchasing
compute nodes on Sherlock does not provide additional storage space. Please
note that SRCC does offer the possibility for PIs to purchase their own storage
space on [Oak](url_oak), for their long-term research data needs.


### Purchasing nodes

If you are interested in becoming an owner, you can find the latest information
about ordering Sherlock nodes on the [ordering page][url_orders].
Feel free to [contact us][email] is you have any additional question.



## Cluster generations

The research computing landscape evolves very quickly, and to both accommodate
growth and technological advances, it's necessary to adapt the Sherlock
environment to these evolutions.

Every year or so, a new generation of processors is released, which is why,
over a span of several years, multiple generations of CPUs and GPUs make their
way into Sherlock. This provides users with access to the latest features and
performance enhancements, but it also adds some heterogeneity to the cluster,
which is important to keep in mind when compiling software and requesting
resources to run them.

Another key component of Sherlock is the interconnect network that links all of
Sherlock's compute nodes together and act as a backbone for the whole cluster.
This network fabric is of finite capacity, and based on the individual
networking switches characteristics and the typical research computing
workflows, it can accommodate up to about 850 compute nodes.

As nodes get added to Sherlock, the number of available ports decreases, and at
some point, the fabric gets full and no more nodes can be added. Sherlock
reached that stage for the first time in late 2016, which prompted the
installation of a whole new fabric, to allow for further system expansion.

This kind of evolution is the perfect opportunity to upgrade other components
too: management software, ancillary services architecture and user
applications. In January 2017, those components were completely overhauled and
a new, completely separate cluster was kick-started, using using a different
set of hardware and software, while conserving the same storage infrastructure,
to ease the transition process.

After a transition period, the older Sherlock hardware, compute and login
nodes, have been be merged in the new cluster, and from a logical perspective
(connection, job scheduling and computing resources), nodes attached to each of
the fabrics have been reunited to form a single cluster again.

As Sherlock continues to evolve and grow, the new fabric will also approach
capacity again, and the same process will happen again to start the next
generation of Sherlock.


## Maintenances and upgrades

The SRCC institutes a monthly scheduled maintenance window on Sherlock, to
ensure optimal operation, avoid potential issues and prepare for future
expansions. This window will be used to make hardware repairs, software and
firmware updates, and perform general manufacturer recommended maintenance on
our environment.

As often as possible, maintenance tasks are performed in a rolling,
non-disruptive fashion, but downtimes are sometimes an unfortunate necessity to
allow disruptive operations that can't be conducted while users are working on
the system.


!!! info "Maintenance schedule"

    As often as possible, maintenances will take place on the **first Tuesday
    of every month, from 08:00 to 12:00 Pacific time** (noon), and will be
    announced 2 weeks in advance, through the usual communication channels.

In case an exceptional amount of work is required, the maintenance window could
be extended to 10 hours (from 08:00 to 18:00).

During these times, access to Sherlock will be unavailable, login will be
disabled and jobs won't run. A reservation will be placed in the scheduler so
running jobs can finish before the maintenance, and jobs that wouldn't finish
by the maintenance window would be pushed after it.


### Common questions

**Q: Why doing maintenances at all?**

**A**: Due to the scale of our computing environment and the increasing
complexity of the systems we deploy, it is prudent to arrange for a
regular time when we can comfortably and without pressure fix problems or
update facilities with minimal impact to our customers. Most, if not all, major
HPC centers have regular maintenance schedules.  We also need to enforce the
[Minimum Security][url_minsec] rules instituted by the Stanford Information
Security Office, which mandate deployment of security patches in a timely
manner.

**Q: Why Tuesdays 08:00-12:00? Why not do this late at night?**

**A:** We have observed that the least busy time for our services is at the
beginning of the week in the morning hours. Using this time period should not
interrupt most of our users. If the remote possibility of a problem that
extends past the scheduled downtime occurs, we would have our full staff fresh
and available to assist in repairs and quickly restore service.

**Q: I have jobs running, what will happen to them?**

**A:** For long-running jobs, we strongly recommend checkpointing your results
on a periodic basis. Besides, we will place a reservation in the scheduler for
each maintenance that would prevent jobs to run past it. This means that the
scheduler will only allow jobs to run if they can finish by the time the
maintenance starts. If you submit a long job soon before the maintenance, it
will be delayed until after the maintenance. That will ensure that no work is
lost when the maintenance starts.



[comment]: #  (link URLs -----------------------------------------------------)

[email]:          mailto:{{ support_email }}
[url_provost]:    //provost.stanford.edu/
[url_dor]:        //doresearch.stanford.edu/research-offices/dor-office-vice-provost-and-dean-research
[url_uit]:        //uit.stanford.edu
[url_srcc]:       //srcc.stanford.edu/
[url_risk]:       //uit.stanford.edu/guide/riskclassifications
[url_datarisk]:   //uit.stanford.edu/guide/riskclassifications#data-classification-examples
[url_minsec]:     //uit.stanford.edu/guide/securitystandards
[url_admin]:      //adminguide.stanford.edu
[url_farmshare]:  //uit.stanford.edu/service/sharedcomputing
[url_fairshare]:  //slurm.schedmd.com/fair_tree.html
[url_orders]:     /docs/overview/orders
[url_recurring]:  /docs/user-guide/running-jobs/#recurring-jobs
[url_persistent]: /docs/user-guide/running-jobs/#persistent-jobs
[url_lscratch]:   /docs/storage/filesystems/#l_scratch
[url_oak]:        //uit.stanford.edu/service/oak-storage

[url_HIPAA]: //en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act
[url_PHI]:   //en.wikipedia.org/wiki/Protected_health_information
[url_PII]:   //en.wikipedia.org/wiki/Personally_identifiable_information


--8<--- "includes/_acronyms.md"
