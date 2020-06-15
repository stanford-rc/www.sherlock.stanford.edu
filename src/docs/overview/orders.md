# Ordering Sherlock nodes


## Overview

For research groups needing access to additional, dedicated computing resources
on Sherlock, we offer the possibility for PIs to purchase their own compute
nodes to add to the cluster.

Operating costs for managing and housing PI-purchased compute nodes are waived
in exchange for letting other users make use of any idle compute cycles on the
PI-owned nodes. Owners have priority access to the computing resources they
purchase, but can access more nodes for their research if they need to. This
provides the PI with much greater flexibility than owning a standalone cluster.


## Service term

!!! warning "Compute nodes are purchased for a duration of 4 years"

    Compute nodes are purchased and maintained based on a 4-year lifecycle,
    which is the duration of the equipment warranty and vendor support.

Owners will be notified during the 4th year that their nodes' lifetime is about
to reach its term, at which point they'll be welcome to either:

  * renew their investment by purchasing new nodes,
  * continue to use the public portion of Sherlock's resources.

At the end of their service term, compute nodes are physically retired from the
cluster, to make room for new equipment. Compute nodes may be kept running for
an additional year at most after the end of their service term, while PIs plan
for equipment refresh. Nodes failing during this period may not be repaired,
and failed hardware will be disabled or removed from the system.



## Compute nodes catalog

SRCC offers a select number of compute node configurations that have been
tested and validated on Sherlock and that aim to cover most computing needs.

!!! info "Sherlock catalog"

    Complete details are available in the **[Sherlock compute nodes
    catalog][url_catalog]** (_SUNet ID required_)

### Configurations

We try to provide hardware configurations that can cover the needs and
requirements of a wide range of computing applications, in various scientific
fields, and to propose a spectrum of pricing tiers, as shown in the table
below:

| Type | Description | Recommended usage | Price range |
|----- | ----------- | ----------------- | ----------- |
| `CBASE` | Base configuration | Best per-core performance for serial applications, multi-threaded (OpenMP) and distributed (MPI) applications.<br/> **Most flexible and cost-effective configuration** | ++"$"++ |
| `CPERF` | High-end configuration | Multi-threaded applications requiring higher numbers of CPU cores | ++"$$"++ |
| `CBIGMEM` | Large-memory configuration | Serial or multi-threaded applications requiring terabytes of memory (genome assembly, etc...) | ++"$$$$"++ |
| `G4FP32` | Base GPU configuration | Single-precision (FP32) GPU-accelerated applications (CryoEM, MD...) with low GPU memory requirements | ++"$$"++ |
| `G4FP64` | High-end GPU configuration | AI, ML/DL and GPU-accelerated HPC codes requiring double-precision (FP64) and larger amounts of GPU memory | ++"$$$"++ |

Configuration details for the different compute node types are listed in the
[Sherlock compute nodes catalog][url_catalog] (_SUNet ID required_).

### Prices

Prices for the different compute node types are listed in the [Sherlock compute
nodes catalog][url_catalog] (_SUNet ID required_). They include tax and
shipping fees, and are subject to change when quoted: they tend to follow the
market-wide variations induced by global political and economical events, which
are way outside of our control. Prices are provided there as a guideline for
expectations.

There are two components in the cost of a compute node purchase:

  1. the cost of the **hardware** itself (capital purchase),

  2. a one-time, per-node **infrastructure fee**[^service_fee] that
     will be charged to cover the costs of connecting the nodes to the cluster
     infrastructure (racks, PDUs, networking switches, cables...)

!!! info "No recurring fees"

    There is currently no recurring fee associated with purchasing compute
    nodes on Sherlock.

    Currently, there are no user, administrative or management fees associated
    with ongoing system administration of the Sherlock environment. However,
    PIs should anticipate the eventuality of modest system administration and
    support fees being  levied within the 4 year lifetime of their compute
    nodes.


## Purchasing process

Purchasing nodes on Sherlock is usually a 5-step process:

* [ ] PI determines the number and types of nodes they'd like to purchase and
  contacts SRCC to provide financial information,
* [ ] SRCC requests a formal quote from the vendors to finalize pricing and
communicate it back to the PI for approval,
* [ ] SRCC submits a Stanford PO to the vendor,
* [ ] SRCC takes delivery of the hardware and proceeds to its installation
* [ ] SRCC notifies the PI that their nodes are ready to be used.

The typical delay between a PO submission to the vendor and the availability of
the compute nodes to the PIs is usually between 4 and 8 weeks (global
pandemic-related supply-chain disruptions notwithstanding).


!!! warning "Minimum purchase"

    Please note that the minimum purchase is one physical server per PI group.
    We cannot accommodate multiple PIs pooling funds for a single node.

!!! info "Single-node orders may incur additional delays"

    Some node configurations need to be ordered from the vendor by sets of 4
    nodes (see the [Sherlock catalog][url_catalog] for details). So orders for
    quantities non-multiples of 4 need will to be grouped with other PI's
    orders, which may incur additional delays.

### Required information

To place an order, we'll of the following bits of information:

  * The SUNet ID of the PI making the purchase request
  * A PTA[^PTA] number to charge the hardware (capital) portion of the purchase
  * A PTA[^PTA] number to charge the per-node infrastructure fees (non-capital)
    <br/>_It could be the same PTA used for the capital portion of the
    purchase, or a different one_

### Placing an order

To start ordering compute nodes for Sherlock, please:

1. **check the [Sherlock compute nodes catalog][url_catalog]** (_SUNet ID
   required_) to review configurations and prices

2. **use the [order form][url_order_form]** (_SUNet ID required_) to submit
   your request and provide the [required information](#required-information)

And we'll be in touch shortly!




[comment]: #  (link URLs -----------------------------------------------------)

[url_order_form]:   //forms.gle/Vds7RrK2aEBcpU978
[url_catalog]:      //docs.google.com/spreadsheets/d/11CqpWe0XLoEbJEDAac6ag5nbrctkkZSJgRtG4hKh34w/view#gid=1718466470
[url_pta]:          //web.stanford.edu/group/fms/fingate/staff/acctstructure/PTA_req_process.html

[^service_fee]:     **infrastructure fees** are considered non-capital for cost
  accounting purposes and may incur indirect cost burdens on cost-reimbursable
  contracts and grants.
[^PTA]: PTA is an acronym used for a [Project-Task-Award][url_pta] combination
  representing an account in the Stanford Financial system.


