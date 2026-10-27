---
icon: material/server
tags:
    - orders
---

# Ordering nodes <small>on Sherlock</small>


For research groups needing access to additional, dedicated computing resources
on Sherlock, we offer the possibility for faculty members to purchase their own
compute
nodes to add to the cluster.

Operating costs for managing and housing owner-purchased compute nodes are
waived in exchange for letting other users make use of any idle compute cycles
on those nodes. Owners have priority access to the computing resources they
purchase, but can access more nodes for their research if they need to. This
provides owners with much greater flexibility than owning a standalone cluster.


## Conditions

### Service term

!!! warning "Compute nodes are purchased for a duration of 4 years"

    Compute nodes are purchased and maintained based on a 4-year life cycle,
    during which they're covered by equipment warranty and vendor support.

Outside of exceptional circumstances, nodes purchased in Sherlock are not
removed from the cluster before the end of their service term. Sherlock is a
shared system, where node owners benefit from the scale of the infrastructure,
delegated management of their equipment, and access to other owners' idle
resources, in exchange for committing their nodes to the shared platform for a
minimum period of time.

!!! info "Ownership of purchased nodes"

    Grants and awards are typically made to institutions rather than to
    individual faculty members, so the equipment they fund usually belongs to
    the University or the sponsor, not to the faculty member.

    Details can be found in the University's
    [Property Management Manual][url_ora_pmm], which indicates that
    [title to equipment][url_ora_title] does not reside personally with
    faculty or staff. The University delegates day-to-day
    [control of that property][url_rph_property] to the faculty member, who
    remains
    responsible for its proper use, inventory and disposal.

Owners will be notified during the 4th year that their nodes' lifetime is about
to reach its term, at which point they'll be welcome to either:

* renew their investment by purchasing new nodes,
* continue to use the public portion of Sherlock's resources.

At the end of their service term, compute nodes are physically retired from the
cluster, to make room for new equipment. Compute nodes may be kept running for
an additional year at most after the end of their service term, while owners
plan for equipment refresh. Nodes failing during this period may not be repaired,
and failed hardware will be disabled or removed from the system.

!!! important "Retirement of end-of-life nodes"

    Once retired from the cluster, compute nodes are usually declared excess
    and disposed of through the University's
    [property disposition process][url_ora_disposal], rather than handed
    back to their owners.

    Datacenter space, power and cooling capacity are needed to accommodate
    new systems, and cannot generally be allocated to end-of-life equipment.

As part of the service, Stanford Research Computing takes care of the whole
disposition process on behalf of node owners, so they don't need to handle the
[equipment control][url_rph_equip] requirements (tagging, inventory and
disposal of excess equipment) that come with managing their own hardware.

### Shared ownership

!!! warning "Minimum order of one node per group"

    The number of nodes in a shared order must be greater or equal to the
    number of purchasing PI groups.


For operational, administrative as well as usability reasons, we do not support
shared ownership of equipment. Meaning that multiple PI groups cannot purchase
and share a single compute node. Shared orders have a minimum of one node per
purchasing PI group.



## Compute nodes catalog

Stanford Research Computing offers a select number of compute node
configurations that have been tested and validated on Sherlock and that aim to
cover most computing needs.

!!! info "Sherlock catalog"

    Complete details are available in the **[Sherlock compute nodes
    catalog][url_catalog]** :octicons-lock-16:[^sunet]

### Configurations

We try to provide hardware configurations that can cover the needs and
requirements of a wide range of computing applications, in various scientific
fields, and to propose a spectrum of pricing tiers, as shown in the table
below:

| Type | Description | Recommended usage | Price range |
|----- | ----------- | ----------------- | ----------- |
| `CBASE` | Base configuration | General-purpose CPU computing: serial, multi-threaded (OpenMP) and distributed (MPI) applications.<br/> **Most flexible and cost-effective configuration** | ++"$"++ |
| `CPERF` | High-performance cores | Compute and memory-intensive CPU applications requiring high per-core performance | ++"$$"++ |
| `G16EFF` | Throughput GPU configuration | Many independent GPU jobs, each fitting on a single GPU with moderate GPU memory requirements | ++"$$$"++ |
| `G8FP32` | Dense FP32 GPU configuration | Single-precision (FP32) GPU-accelerated applications (MD, CryoEM...) with larger GPU memory requirements | ++"$$$"++ |
| `G8TF64` | Best-in-class GPU configuration | AI, ML/DL and GPU-accelerated HPC codes requiring double-precision (FP64), large amounts of GPU memory, and tightly coupled multi-GPU scaling | ++"$$$$"++ |

??? tip "Choosing the best node configuration for your needs"

    Although some configurations may appear cheaper when looking at the
    dollar/core ratio, this is not the only point to consider when determining
    the best configuration for your workload.

    *Performance per core*

    : There are other factors to take into account, notably core frequency,
    cache size and memory bandwidth per core. `CPERF` nodes have higher core
    frequencies and more memory per core than `CBASE` nodes, which benefits
    compute and memory-intensive applications. But for more diverse workloads,
    `CBASE` nodes offer the most flexibility, and can run a mix of serial,
    multi-threaded and MPI applications equally well.

    *GPU memory and scaling*

    : `G16EFF` nodes provide many GPUs with moderate amounts of memory, for
    workloads made of independent single-GPU jobs. `G8FP32` nodes have fewer
    GPUs with more memory each, for applications that need larger GPU memory.
    `G8TF64` nodes are designed for applications that span multiple GPUs and
    need fast GPU-to-GPU communication.

    *Resources availability*

    : Another important factor to take into account is that less nodes for a
    given number of cores offers less resilience against potential hardware
    failures: if a 128-core node becomes unavailable for some reason, that's
    128 cores that nobody can use while the node is being repaired. But with
    128 cores in 4x 32-core nodes, if a node fails, there are still 96 cores
    that can be used.

    We'll be happy to help you determine the best configuration for your
    computing needs, feel free to [reach out][email] to schedule a
    consultation.

Configuration details for the different compute node types are listed in the
[Sherlock compute nodes catalog][url_catalog] :octicons-lock-16:[^sunet]

### Prices

Prices for the different compute node types are listed in the [Sherlock compute
nodes catalog][url_catalog] :octicons-lock-16:[^sunet]. Catalog nodes have
been purchased in bulk ahead of time, which allows us to offer fixed prices
while supplies last. Prices include tax and shipping fees.

There are two components in the cost of a compute node purchase:

  1. the cost of the **hardware** itself (capital purchase),

  2. a one-time, per-node **infrastructure fee**[^service_fee] that
     will be charged to cover the costs of connecting the nodes to the cluster
     infrastructure (racks, PDUs, networking switches, cables...). This fee is
     based on the number of InfiniBand interfaces on the node.

!!! info "No recurring fees"

    There is currently no recurring fee associated with purchasing compute
    nodes on Sherlock. In particular, there is no CPU.hour charge, purchased
    nodes are available to their owners 100% of the time, at no additional
    cost.

    Currently, there are no user, administrative or management fees associated
    with ongoing system administration of the Sherlock environment. However,
    owners should anticipate the eventuality of modest system administration and
    support fees being  levied within the 4 year lifetime of their compute
    nodes.


## Purchasing process

!!! warning "Minimum purchase"

    Please note that the minimum purchase is one physical server per PI group.
    We cannot accommodate multiple groups pooling funds for a single node.

Catalog nodes are pre-purchased in bulk, and orders are allocated from those
nodes. Purchasing nodes on Sherlock is usually a 4-step process:

  1. the faculty member uses the [order form][url_order_form] to submit an
     order,
  2. Stanford Research Computing contacts the faculty member to confirm the
     order details and availability,
  3. Stanford Research Computing allocates the nodes and charges the provided
     PTAs,
  4. Stanford Research Computing notifies the faculty member that their nodes
     are ready to be used.

Once the pre-purchased nodes are installed in the cluster, ordered nodes are
usually available to their owners within days. Orders placed before that are
fulfilled as soon as installation is complete.


### Required information

To place an order, we'll need the following information:

* The SUNet ID of the faculty member making the purchase request
* A PTA[^PTA] number to charge the hardware (capital) portion of the purchase
* A PTA[^PTA] number to charge the per-node infrastructure fees (non-capital)
    <br/>_It could be the same PTA used for the capital portion of the
    purchase, or a different one_

Hardware costs could be spread over multiple PTAs (with a maximum of 2 PTAs
per order). But please note that the infrastructure fees have to be charged to
a single PTA.

### Placing an order

To start ordering compute nodes for Sherlock:

<style>
.md-button {
    min-width: 8rem;
    text-align: center;
}
.steps {
    width: 50%;
    padding: 10px;
}
@media screen and (max-width: 992px) {
    .steps {
        width: 100%;
        float: none !important;
    }
}
</style>

<div markdown="1" class="steps" style="float:left">
:material-numeric-1-circle: **check the [Sherlock catalog][url_catalog]**
:octicons-lock-16:[^sunet] to review prices and select your configurations

<!-- markdownlint-disable MD013 -->
[Choose :fontawesome-solid-list:][url_catalog]{: .md-button .md-button .md-button--primary }
</div>
<div markdown="1" class="steps" style="float:right">
:material-numeric-2-circle: **fill in the [order form][url_order_form]**
:octicons-lock-16:[^sunet] to submit your request and provide the [required
information](#required-information)

[Order :fontawesome-solid-cart-shopping:][url_order_form]{: .md-button .md-button--primary }
</div>
<div style="clear:both"></div>
<!-- markdownlint-enable MD013 -->

And we'll be in touch shortly!




[comment]: #  (link URLs -----------------------------------------------------)

[url_catalog]:      //www.sherlock.stanford.edu/catalog
[url_order_form]:   //www.sherlock.stanford.edu/order
[url_pta]:          //fingate.stanford.edu/account-structure/request-new-account-pta
[url_ora_pmm]:      //ora.stanford.edu/ora-units/property-management-office/property-management-manual
[url_ora_title]:    //ora.stanford.edu/ora-units/property-management-office/property-management-manual/21-overview
[url_ora_disposal]: //ora.stanford.edu/42-disposition-and-outgoing-transfers
[url_rph_property]: //doresearch.stanford.edu/policies/research-policy-handbook/property-management/control-property
[url_rph_equip]:    //doresearch.stanford.edu/policies/research-policy-handbook/conduct-research/rights-and-responsibilities-conduct-research
[email]:            mailto:{{support_email}}

[^service_fee]:     **infrastructure fees** are considered non-capital for cost
  accounting purposes and may incur indirect cost burdens on cost-reimbursable
  contracts and grants.
[^PTA]: PTA is an acronym used for a [Project-Task-Award][url_pta] combination
  representing an account in the Stanford Financial system.
[^sunet]: **SUNet ID required**, document restricted to `@stanford.edu` accounts.
