---
template: landing.html

title: Sherlock
subtitle: The HPC cluster for all your computing needs
desc: >-
  Need to access computing resources to support your sponsored or departmental
  research at Stanford? You may want to try out the Sherlock cluster! Funded
  and supported by the Provost and Dean of Research, Sherlock is a shared
  computing cluster available for use by all Stanford faculty and their
  research teams.

nav_links:
    - name: sep
    - name: services
      url: '#services'
    - name: info
      url: '#info'
    - name: sep
    - name: status
      url: 'https://status.sherlock.stanford.edu'
      post: >-
        <span id="status-widget"></span>
    - name: news
      url: 'https://news.sherlock.stanford.edu'
      post: >-
        <noticeable-widget id="news-widget"
          access-token="AoaqgE2gEgx8fjXbxETY" project-id="bYyIewUV308AvkMztxix" white-label="true">
        </noticeable-widget>
    - name: docs
      url: '/docs'
      icon: book
    - name: sep
    - name: support
      url: '#'
      icon: question-circle
    - name: slack
      url: 'https://srcc.slack.com'
      icon: brand-slack
    - name: sep

buttons_info: More information
buttons_account: Request an account

services_title: Services
services_subtext: A one-stop shop for all our scientific computing needs
services:
    - title: compute
      icon: server
      text: >-
         All the resources you need in one place: compute nodes, GPUs, large
         memory nodes, blazing fast interconnect, parallel filesystems, and
         more!
    - title: explore
      icon: search
      text: >-
         Sherlock provides all the software tools and storage resources you'll
         need to explore and analyze your research data.
    - title: discover
      icon: flask
      text: >-
         With a whole range of computational tools at your fingertips,
         scientific breakthroughs will just be a batch job away.

info_title: In a nutshell
info_subtext: All about Sherlock

---

### What is Sherlock?

Sherlock is a shared computing cluster available for use by all Stanford
Faculty members and their research teams, for sponsored or departmental faculty
research.  All research teams on Sherlock have access to a base set of managed
computing resources, GPU-based servers, and a multi-petabyte, high-performance
parallel file system for short-term storage.

Faculty can supplement these shared nodes by purchasing additional servers, and
become Sherlock owners. By investing in the cluster, PI groups not only receive
exclusive access to the nodes they purchase, but also get access to all of the
other owner compute nodes when they're not in use, thus giving them access to
the whole breadth of Sherlock resources.


### Why should I use Sherlock?

Using Sherlock for your work provides many advantages over individual
solutions: hosted in an on-premises, state-of-the-art datacenter dedicated to
research computing systems, the Sherlock cluster is powered and cooled by
installations that are optimized for scientific computing.

On Sherlock, simulations and workloads benefit from performance levels that
only large scale HPC systems can offer: high-performance I/O infrastructure,
petabytes of storage, large variety of hardware configurations, GPU
accelerators, centralized system administration and management provided by the
[Stanford Research Computing Center][url_srcc] (SRCC).

Such features are not easily accessible at the departmental level, and often
require both significant initial investments and recurring costs. Joining
Sherlock allows researchers and Faculty members to avoid those costs and
benefit from economies of scale, as well as to access larger, professionally
managed computing resources that what would not be available on an individual
or even departmental basis.


### How much does it cost?

**Sherlock is free to use for anyone doing sponsored research at Stanford.**

Any Faculty member can request access for research purposes, and get an account
with a base storage allocation and unlimited compute time on the global, shared
pool of resources.

Stanford Research Computing provides faculty with the [opportunity to
purchase][url_purchase] from a [catalog a recommended compute node
configurations][url_catalog], for the use of their research teams. Using a
traditional compute cluster condominium model, participating faculty and their
teams get priority access to the resources they purchase. When those resources
are idle, other "owners" can use them, until the purchasing owner wants to use
them. When this happens, those other owners jobs are killed to free up
resources. Participating owner PIs also have shared access to the original base
Sherlock nodes, along with everyone else.


### How big is it?

Quite big! It's actually difficult to give a precise answer, as Sherlock is
constantly evolving with new hardware additions.

As of mid-2020, Sherlock features over 5,000 CPU cores available to all
researchers, and more than 25,000 additional nodes available to Sherlock
owners, faculty who have augmented the cluster with their own purchases.

For more details about Sherlock size and technical specifications, please refer
to the tech specs section of the documentation. But with a computing power over
2.3 Petaflops, Sherlock would have its place in the Top500 list of the 500 most
powerful computer systems in the world.


### OK, I'm sold, how do I start?

You can request an account right now, take a look at the
[documentation](/docs), and drop us an [email](mailto:{{ support_email }}) if
you have any questions.


### I want my own nodes!

If you're interested in becoming an owner on Sherlock, and benefit from all the
advantages associated, please take a look at the [catalog][url_catalog] of
configurations, feel free to use the [ordering form][url_order] to submit
your request, and we'll get back to you.


[comment]: #  (link URLs -----------------------------------------------------)

[url_srcc]:     //srcc.stanford.edu
[url_purchase]: /docs/overview/orders/
[url_catalog]:  /catalog
[url_order]:    /order

