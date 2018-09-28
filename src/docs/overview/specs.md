# Technical specifications

!!! note

    Sherlock is driven by contributions from individual PIs and groups, and as
    such, is constantly evolving.  The technical specifications outlined here
    are subject to change, and may not be an accurate representation of the
    current cluster configuration. The numbers provided on this page are as of
    **June 2017**.

## In a nutshell

Sherlock features more than 1,000 compute nodes, 18,000+ CPU cores, 120TB of
total memory, 400+ GPUs, for a total computing power of more than 1 Petaflop.
That would rank it in the Top500 list of the most powerful supercomputers in
the world.

A parallel high-performance filesystem of more than 3 PB, delivering over
20GB/s of sustained I/O bandwidth, provides scratch storage for more than 2,300
users, and 400 PI groups.

## Computing

The Sherlock cluster has been initiated in January 2014 with a base of freely
available computing resources and the accompanying networking and storage
infrastructure. It has since been expanded with additions from multiple PI
groups to reach the capacity of its Infinband network in December 2016.

!!! info "Sherlock 2.0"

    A new Infiniband fabric has been installed in early 2017, as the foundation
    for Sherlock 2.0. The existing nodes will join that new cluster in the
    second half of 2017, at which point both clusters will be merged.

### Sherlock 1.0
| Type           | Qty  | Details |
| ---            | ---: |         |
| login nodes    | 4    | `sherlock.stanford.edu` (load-balanced) |
| [data transfer node][url_dtn] | 1 | dedicated bandwidth for large data transfers |
| compute nodes  | 120  | 16 cores[^2650v2], 64 GB RAM, 100 GB local SSD |
| *bigmem* nodes | 2    | 32 cores[^4640], 1.5 TB RAM, 13TB of local storage |
| [GPU nodes][url_gpus] | 5 | 16 cores[^2650v2], 64 GB RAM, 200 GB local SSD, 8 GPUs<br/>*NVIDIA Tesla K20Xm, K80, or GeForce GTX TITAN Black* |
| owners nodes   | 716  | various CPU/memory configs, *bigmem* and GPU nodes |
| interconnect   |      | 2:1 oversubscribed FDR Infiniband fabric (56 GB/s) |
| operating system |    | CentOS 6.x |

### Sherlock 2.0
| Type           | Qty  | Details |
| ---            | ---: |         |
| login nodes    | 2    | `login.sherlock.stanford.edu` (load-balanced) |
| compute nodes  | 60   | 20 cores[^2640v4], 128 GB RAM, 200 GB local SSD |
| *bigmem* nodes | 2    | 56 cores[^4650v4], 3.0 TB RAM, 200 GB local SSD<br/>32 cores[^2697Av4], 512 GB RAM, 200GB local SSD|
| [GPU nodes][url_gpus] | 2 | 20 cores[^2640v4], 128 GB RAM, 200 GB local SSD, 4 GPUs<br/>*NVIDIA Tesla P100-PCIE-16GB, Tesla P40* |
| owners nodes   | 160  | various CPU/memory configs, *bigmem* and GPU nodes |
| interconnect   |      | 2:1 oversubscribed EDR Infiniband fabric (100 GB/s) |
| operating system |    | CentOS 7.x |


## Storage

!!! info "More information"

    For more information about storage options on Sherlock, please refer to the
    [Storage section][url_storage] of the documentation.

Storage components are common to both clusters, meaning users can find the same
files and directories from both Sherlock 1.0 and Sherlock 2.0 nodes.

* Highly-available NFS filesystem for user and group home directories (with hourly
  snapshots and off-site replication)
* High-performance Lustre scratch filesystem (3 PB, 20+GB/s sustained I/O bandwidth, 18 I/O servers, 1,080 disks)
* Direct access to SRCC's [Oak][url_oak] long-term research data storage system



[comment]: #  (link URLs -----------------------------------------------------)
[url_status]:  https://status.sherlock.stanford.edu
[url_gpus]:    /docs/user-guide/gpu
[url_storage]: /docs/storage
[url_dtn]:     /docs/storage/data-transfer#data-transfer-node-dtn
[url_oak]:     https://oak-storage.stanford.edu
[url_2650v2]:  https://ark.intel.com/products/75269/Intel-Xeon-Processor-E5-2650-v2-20M-Cache-2_60-GHz
[url_2640v4]:  https://ark.intel.com/products/92984/Intel-Xeon-Processor-E5-2640-v4-25M-Cache-2_40-GHz
[url_2697Av4]: https://ark.intel.com/products/91768/Intel-Xeon-Processor-E5-2697A-v4-40M-Cache-2_60-GHz
[url_4640]:    https://ark.intel.com/products/64603/Intel-Xeon-Processor-E5-4640-20M-Cache-2_40-GHz-8_00-GTs-Intel-QPI
[url_4650v4]:  https://ark.intel.com/products/93809/Intel-Xeon-Processor-E5-4650-v4-35M-Cache-2_20-GHz

[comment]: # (footnodes ------------------------------------------------------)
[^2650v2]:  two-socket Intel(r) Xeon(r) [E5-2650v2][url_2650v2] processors (8-core Ivy-Bridge, 2.60 GHz)
[^4640]:    four-socket Intel(r) Xeon(r) [E5-4640][url_4640] processors (8-core Sandy-Bridge, 2.40 GHz)
[^2640v4]:  two-socket Intel(r) Xeon(r) [E5-2640v4][url_2640v4] processors (10-core Broadwell, 2.40 GHz)
[^4650v4]:  four-socket Intel(r) Xeon(r) [E5-4650v4][url_4650v4] processors (14-core Broadwell, 2.20 GHz)
[^2697Av4]: two-socket Intel(r) Xeon(r) [E5-2697Av4][url_2697Av4] processors (16-core Broadwell, 2.60 GHz)

