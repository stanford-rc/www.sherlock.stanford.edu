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
     alt="Sherlock" src="/img/logo.webp">
<!-- resuming normal Markdown operations -->


!!! warning
    This guide is a work in progress and is not complete yet. We are actively
    working on adding more content and information.

## Welcome to Sherlock!

Sherlock is a High-Performance Computing (HPC) cluster, operated by the
[Stanford Research Computing Center][url_srcc] to provide computing resources
to the Stanford community at large. You'll find all the documentation, tips,
FAQs and information about Sherlock among these pages.

!!! note "Sherlock 1.0"

    These pages refer to Sherlock 2.0, the new iteration of the Sherlock
    cluster.  For anything specific to Sherlock 1.0, please see the previous
    [wiki][url_old_wiki].

    The older Sherlock system will remain in production until all of its nodes
    have been merged into Sherlock 2.0.  Until then, the two systems will
    coexist for an extended transition period. The [Sherlock 2.0 transition
    guide][url_transition] includes material intended to help users manage
    their transition between the two systems: differences, temporary
    conditions, etc.

Feel free to explore the different sections. If some information is missing,
please [contact us][url_contact] to suggest additions or modifications.

## Information sources

!!! tip "Searching the docs"

    If you're looking for information on a specific topic, the Search feature
    of this site will allow you to quickly find the page you're looking for.
    Just press ++s++ or ++f++ to open the Search bar and start typing.

To help users take their first steps on Sherlock, we provide documentation and
information through various channels:

| Channel | URL | Purpose |
| ------- | --- | ------- |
| **Documentation** <br/><small>You are here</small>| www.sherlock.stanford.edu/docs | information to help new users start on Sherlock, and more in-depth documentation for users already familiar with the environment. |
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


!!! warning "How to submit successful support requests"

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
    sure that you're planning to stop by **during** office hours. We may not be
    able to help you otherwise.


The SRCC holds office hours twice a week, in [Polya Hall][url_polya], rooms
261-262 (2nd floor):

* Tuesdays, 10-11am
* Thursdays 3-4pm

Please feel free to stop by if you have any question or trouble using Sherlock,
we'll be happy to help you.



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

[url_old_wiki]:     //sherlock.stanford.edu
[url_srcc]:         //srcc.stanford.edu
[url_contact]:      mailto:srcc-support@stanford.edu
[url_docs]:         //www.sherlock.stanford.edu/docs
[url_news]:         //news.sherlock.stanford.edu
[url_status]:       //status.sherlock.stanford.edu

[url_concepts]:   /docs/overview/concepts
[url_glossary]:   /docs/overview/glossary
[url_transition]: /docs/overview/transition
[url_prereq]:     /docs/getting-started/prerequisites
[url_connect]:    /docs/getting-started/connecting
[url_submit]:     /docs/getting-started/submitting
[url_troubleshoot]:/docs/user-guide/troubleshoot/#how-to-submit-a-successful-support-request

[url_shu_ml]:   //mailman.stanford.edu/mailman/listinfo/sherlock-users
[url_sha_ml]:   //mailman.stanford.edu/mailman/listinfo/sherlock-announce
[url_polya]:    //campus-map.stanford.edu/?id=14-160&lat=37.42898333&lng=-122.17752929&zoom=17&srch=polya%20hall


[comment]: #  (footnotes -----------------------------------------------------)

[^shu_ml]: This mailing-list is moderated.

