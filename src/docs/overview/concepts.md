## Sherlock

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


## Node ownership

For users who need more than casual access to a shared computing environment,
the SRCC also offers faculty members the possibility to purchase additional
dedicated resources to augment Sherlock, by becoming Sherlock *owners*.
Choosing from a standard set of server configurations supported by the SRCC
staff (known as the Sherlock *catalog*), principal investigators (PIs) can
purchase their own servers to add to the cluster.

The vast majority of Sherlock's compute nodes are actually owners nodes, and PI
purchases are the main driver behind the rapid expansion of the cluster, which
went from 120 nodes in early 2014, to more than 1,000 today.

This model, often refered to as the **Condo model**, allows Sherlock owners to
benefit from the scale of the cluster and give them access to even more nodes
than what they purchased.  This provides owners with much greater flexibility
than owning a standalone cluster.

* participating faculty and their research teams have priority use of the
resources they purchase,
* when those resources are not in use, other owners can use them,
* when the purchasing owner wants to use his/her resources, other jobs will be
killed

This provides a way to get more resources to run less important jobs in the
background, while making sure that an owner always gets immediate access to
his/her own nodes.

Participating owners also have shared access to the original base Sherlock
nodes, along with everyone else.


#### How to become an owner

For administrative reasons, SRCC offers PIs the possibility to purchase
Sherlock nodes on a quarterly basis. Large orders could be accomodated at any
time, though.

!!! warning
    Please note that the minimum purchase per PI is one physical server. We
	cannot accommodate multiple PIs pooling funds for single nodes.

If you are interested in becoming an owner, you can find the latest information
about ordering Sherlock nodes on the [Sherlock ordering page][url_orders]
(SUNetID login required), and feel free to [contact us][email]

[email]: mailto:research-computing-support@stanford.edu





[comment]: #  (link URLs -----------------------------------------------------)

[url_provost]: 	https://provost.stanford.edu/
[url_dor]:     	https://doresearch.stanford.edu/research-offices/dor-office-vice-provost-and-dean-research
[url_uit]:	   	https://uit.stanford.edu
[url_srcc]:    	https://srcc.stanford.edu/
[url_orders]:	https://srcc.stanford.edu/private/sherlock-qtr-order
[url_fairshare]:/docs/advanced-topics/scheduler#fair-share
[url_risk]:  	https://uit.stanford.edu/guide/riskclassifications

[comment]: # (footnodes ------------------------------------------------------)

[^HIPAA]: [Health Insurance Portability and Accountability Act](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act)
[^PHI]:   [Protected Health Information](https://en.wikipedia.org/wiki/Protected_health_information)
[^PII]:   [Personally Identifiable Information](https://en.wikipedia.org/wiki/Personally_identifiable_information)
