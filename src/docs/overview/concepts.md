Sherlock is a shared compute cluster available for use by all Stanford faculty
members and their research teams to support sponsored research.

!!! warning "Sherlock is a resource for research"
	Sherlock is not for course work, class assignments or general-use training
	sessions.

It is open to the Stanford community as a computing resource to support
departmental or sponsored research, thus a faculty member's sponsorship is
required for all user accounts.

!!! danger "Moderate/high risk data"
	Sherlock is **NOT** HIPAA[^HIPAA] compliant and shouldn't be used to
	process PHI[^PHI] nor PII[^PII]. The system is approved for computing with
	low risk data only, not moderate nor high risk data.
	For more information about data risk classifications, see the [Information
	Security Risk Classification page][url_risk].


## Shared resource

Sherlock has been designed, deployed, and is maintained and operated by
[SRCC][url_srcc] staff. The Stanford Research Computing Center (SRCC) is a
joint effort of the [Dean of Research][url_dor] and [IT Services][url_uit] to
build and support a comprehensive program to advance computational research at
Stanford.

Sherlock has been initially purchased and supported with seed funding from
Stanford's [Provost][url_provost]. It comprises a set of freely available
compute nodes, a few specific resources such as large-memory machines and GPU
servers, as well as the associated networking equipment and storage.  These
resources can be used to run computational codes and programs, and are managed
through a job scheduler using a [fair-share algorithm][url_fairshare].


## Condominium

For users who need more than casual access to a shared computing environment,
SRCC also offers faculty members the possibility to purchase additional
dedicated resources to augment Sherlock, by becoming Sherlock *owners*.
Choosing from a standard set of server configurations supported by SRCC
staff (known as the Sherlock *catalog*), principal investigators (PIs) can
purchase their own servers to add to the cluster.

The vast majority of Sherlock's compute nodes are actually owners nodes, and PI
purchases are the main driver behind the rapid expansion of the cluster, which
went from 120 nodes in early 2014, to more than 1,000 nodes mid-2017. An order
of magnitude increase in about 3 years.

This model, often referred to as the **Condo model**, allows Sherlock owners to
benefit from the scale of the cluster and give them access to more compute
nodes than their individual purchase.  This provides owners with much greater
flexibility than owning a standalone cluster.

The resource scheduler configuration works like this:

* owners and their research teams have priority use of the resources they
  purchase,
* when those resources are idle, other owners can use them,
* when the purchasing owner wants to use his/her resources, other jobs will be
  killed

This provides a way to get more resources to run less important jobs in the
background, while making sure that an owner always gets immediate access to
his/her own nodes.

Participating owners also have shared access to the original base Sherlock
nodes, along with everyone else.

### Benefits

Benefits to owners include:

* Data center hosting, including backup power and cooling,
* Access to high-performance, large parallel scratch disk space,
* Priority access to nodes that they own,
* Background access to any owner nodes that are not in use,
* System configuration and administration,
* User support,
* Standard software stack, appropriate for a range of research needs,
* Possibility for users to install additional software applications as needed,


### How to become an owner

For administrative reasons, SRCC offers PIs the possibility to purchase
Sherlock nodes on a quarterly basis. Large orders could be accommodated at any
time, though.

!!! warning
    Please note that the minimum purchase per PI is one physical server. We
	cannot accommodate multiple PIs pooling funds for single nodes.

If you are interested in becoming an owner, you can find the latest information
about ordering Sherlock nodes on the [Sherlock ordering page][url_orders]
(SUNetID login required), and feel free to [contact us][email].


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
reached that stage in late 2016, which prompted the installation of a whole new
fabric, to continue adding nodes to the cluster.

This kind of evolution is the perfect opportunity to upgrade other components
too: management software, ancillary services architecture and
user applications were completely overhauled and a new, completely separate
cluster was kick-started. Sherlock 2.0 is a complete refresh of Sherlock, using
a different set of hardware and software, while conserving the same storage
infrastructure, to ease the transition process.

!!! note

    For users who are already familiar with Sherlock, a [transition
    guide][url_transition] lists all the differences and the important
    information for starting on Sherlock 2.0.

After a transition period, the older Sherlock hardware, compute and login
nodes, will be merged in the new cluster, and from a logical perspective
(connection, job scheduling and computing resources), both will form a single
cluster again.

As Sherlock continues to evolve and grow, the new fabric will certainly get
full again, and the same process will happen again to start the next generation
of Sherlock.



[comment]: #  (link URLs -----------------------------------------------------)
[email]:          mailto:research-computing-support@stanford.edu
[url_provost]: 	  https://provost.stanford.edu/
[url_dor]:     	  https://doresearch.stanford.edu/research-offices/dor-office-vice-provost-and-dean-research
[url_uit]:	   	  https://uit.stanford.edu
[url_srcc]:    	  https://srcc.stanford.edu/
[url_orders]:	  https://srcc.stanford.edu/private/sherlock-qtr-order
[url_risk]:  	  https://uit.stanford.edu/guide/riskclassifications
[url_fairshare]:  /docs/advanced-topics/scheduler#fair-share
[url_transition]: /docs/user-guide/transition


[comment]: # (footnodes ------------------------------------------------------)
[^HIPAA]: [Health Insurance Portability and Accountability Act](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)
[^PHI]:   [Protected Health Information](https://en.wikipedia.org/wiki/Protected_health_information)
[^PII]:   [Personally Identifiable Information](https://en.wikipedia.org/wiki/Personally_identifiable_information)
