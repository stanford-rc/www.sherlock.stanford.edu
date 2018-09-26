# Sherlock <small>documentation</small>

<!-- HTML interlude for the main page logo -->
<style>
@media only screen and (max-width: 720px) {
    #logo_head {
        display: none;
    }
}
#logo_head {
    margin-top: -50px;
}
</style>
<img id="logo_head" align="right" width="220px"
     alt="Sherlock" src="/img/logo.png">
<!-- resuming normal Markdown operations -->


!!! warning
    This guide is a work in progress and is not complete yet. We are actively
    working on adding more content and information.

## Welcome to Sherlock!

Sherlock is a High-Performance Computing (HPC) cluster, operated by the
[Stanford Research Computing Center][url_srcc] to provide computing resources
to the Stanford community at large. You'll find all the documentation, tips,
FAQs and information about Sherlock among these pages.

### Why use Sherlock?

Using Sherlock for your work provides many advantages over individual
solutions: hosted in an on-premises, state-of-the-art datacenter, the Sherlock
cluster is powered and cooled by installations that are optimized for
scientific computing.

On Sherlock, simulations and workloads benefit from performance levels that
only large scale HPC systems can offer: high-performance I/O infrastructure,
petabytes of storage, large variety of hardware configurations, GPU
accelerators, centralized system administration and management provided by the
[Stanford Research Computing Center][url_srcc] (SRCC).

Such features are not easily accessible at the departmental level, and often
require both significant initial investments and recurring costs. Joining
Sherlock allows researchers and faculty members to avoid those costs and
benefit from economies of scale, as well as to access larger, professionally
managed computing resources that what would not be available on an individual
or even departmental basis.

### How much does it cost?

Sherlock is free to use for anyone doing sponsored research at Stanford. Any
faculty member can request access for research purposes, and get an account
with a base storage allocation and unlimited compute time on the global, shared
pool of resources.

In case those free resources are not sufficient, Stanford Research Computing
provides faculty with the [opportunity to purchase][url_condo] from a [catalog
a recommended configurations][url_catalog], for the use of their research
teams. Using a traditional compute cluster condominium model, participating
faculty and their teams get priority access to the resources they purchase.
When they're idle, those resources are available to use by other owners on the
cluster, giving them access to virtually unlimited resources.


## Information sources

!!! tip "Searching the docs"

    If you're looking for information on a specific topic, the Search feature
    of this site will allow you to quickly find the page you're looking for.
    Just press ++s++ or ++f++ to open the Search bar and start typing.

To help users take their first steps on Sherlock, we provide documentation and
information through various channels:

| Channel | URL | Purpose |
| ------- | --- | ------- |
| **Documentation** <br/><small>You are here</small>| [www.sherlock.stanford.edu/docs][url_docs] | information to help new users start on Sherlock, and more in-depth documentation for users already familiar with the environment. |
| **Changelog** | [news.sherlock.stanford.edu][url_news] | announces, news and updates about Sherlock. |
| **Dashboard** | [status.sherlock.stanford.edu][url_status] | status of Sherlock's main components and services, outages, maintenances. |

To get started, you can take a look at the [concepts][url_concepts] and
[glossary][url_glossary] pages to get familiar with the terminology used
throughout the documentation pages. Then, we recommend going through the
following sections:

* [Prerequisites][url_prereq]
* [Connecting to the cluster][url_connect]
* [Submitting jobs][url_submit]

## Acknowledgment / citation

It is important and expected that publications resulting from computations
performed on Sherlock acknowledge this. The following wording is suggested:

!!! cite "Acknowledgment"

    Some of the computing for this project was performed on the Sherlock
    cluster.  We would like to thank Stanford University and the Stanford
    Research Computing Center for providing computational resources and support
    that contributed to these research results.


## Support

### Email <small>(recommended)</small>

Research Computing support can be reached by sending an email to
srcc-support@stanford.edu and **mentioning Sherlock**.


!!! important "How to submit effective support requests"

    To ensure a timely and relevant response, please make sure to include some
    additional details, such as job ids, commands executed and error messages
    received, so we can help you better.  For more details, see the
    [Troubleshooting][url_troubleshoot] page.

As a member of the Sherlock community, you're also automatically subscribed to:

* the [sherlock-announce][url_sha_ml] mailing-list, which is only used by the
  SRCC team to send   important announcements about Sherlock,
* the [sherlock-users][url_shu_ml] mailing list[^shu_ml], which is used to
  connect Sherlock users together. If you have a general
  question about software used on Sherlock, want to reach out to the other
  Sherlock users to share tips and good practices, tutorials or other info,
  please feel free to do so through this mailing-list.



### Office hours

!!! warning "We can't accommodate walk-ins"

    We're unfortunately not staffed to accommodate walk-ins, so please make
    sure that you're planning to stop by **during** office hours. We will not be
    able to help you otherwise.

Sending a question to srcc-support@stanford.edu is always the best first option
for questions.  That way you can include detailed descriptions of the problem
or question, valuable output and error messages and any steps you took when you
encountered your error.  Also, everyone on our team will see your ticket,
enabling the most appropriate group member to respond.

Office hours are a good place for more generalized questions about Sherlock,
Slurm, Linux usage, data storage, queue structures/scheduling, job
optimization and general capabilities of Sherlock.  It's also useful for more
technically nuanced questions that may not be easily answered with our
ticketing system.  In office hours some problems can indeed be solved quickly
or progress can be made so that you can then work self-sufficiently towards a
solution on your own.

!!! tip "What to expect from office hours"

    * We can rarely help with application-specific or algorithm problems.

    * You should plan your projects sufficiently in advance and not come to
      office hours at the last minute before a deadline. Sherlock is a busy
      resource with over 3,500 users and you should not expect your jobs to
      complete before a given date.

    * Not all questions and problems can be solved or answered during office
      hours, especially ones involving hardware, filesystem or network issues.
      Sherlock features several thousand computing, networking and storage
      components, that are constantly being monitored by our team. You can be
      sure that when Sherlock has an issue, we are aware of it and working on
      it.


Office hours are held twice a week, in [Polya Hall][url_polya], room 255
(2nd floor):

* Tuesdays, from 10am to 11am
* Thursdays from 3pm to 4pm




## Quick Start

If you're in a rush, here's a 3-step ultra-quick start:

1. connect to Sherlock
   ```
   $ ssh login.sherlock.stanford.edu
   ```

2. get an interactive session on a compute node
   ```
   [kilian@sh-ln01 login! ~]$ sdev
   ```

3. run a command
   ```
   [kilian@sh-101-58 ~]$ module load python
   [kilian@sh-101-58 ~]$ python -c "print('Hello Sherlock')"
   Hello Sherlock
   ```

Congrats! You ran your first job on Sherlock!


Here's what it looks like in motion:
<script type="text/javascript"
    src="https://asciinema.org/a/bnw8hx26ja9n72q8oy8cxzzcy.js"
    id="asciicast-bnw8hx26ja9n72q8oy8cxzzcy"
    data-preload="true" data-speed="2" data-theme="monokai"
    async>
</script>

[comment]: #  (link URLs -----------------------------------------------------)

[url_srcc]:         //srcc.stanford.edu
[url_contact]:      mailto:srcc-support@stanford.edu
[url_docs]:         //www.sherlock.stanford.edu/docs
[url_news]:         //news.sherlock.stanford.edu
[url_status]:       //status.sherlock.stanford.edu
[url_catalog]:      //srcc.stanford.edu/private/sherlock-qtr-order

[url_condo]:        /docs/overview/concepts#the-condominium-model
[url_concepts]:     /docs/overview/concepts
[url_glossary]:     /docs/overview/glossary
[url_transition]:   /docs/overview/transition
[url_prereq]:       /docs/getting-started/
[url_connect]:      /docs/getting-started/connecting
[url_submit]:       /docs/getting-started/submitting
[url_troubleshoot]: /docs/user-guide/troubleshoot/#how-to-submit-a-successful-support-request

[url_shu_ml]:       //mailman.stanford.edu/mailman/listinfo/sherlock-users
[url_sha_ml]:       //mailman.stanford.edu/mailman/listinfo/sherlock-announce
[url_polya]:        //campus-map.stanford.edu/?id=14-160&lat=37.42898333&lng=-122.17752929&zoom=17&srch=polya%20hall


[comment]: #  (footnotes -----------------------------------------------------)

[^shu_ml]: This mailing-list is moderated.

