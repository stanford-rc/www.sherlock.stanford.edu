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

!!! note "Sherlock 1.0"

    These pages refer to Sherlock 2.0, the new iteration of the Sherlock
    cluster.  For anything specific to Sherlock 1.0, please see the previous
    [wiki][url_wiki].

    The older Sherlock system will remain in production until all of its nodes
    have been merged into Sherlock 2.0.  Until then, the two systems will
    coexist for an extended transition period. The [Sherlock 2.0 transition
    guide][url_transition] includes material intended to help users manage
    their transition between the two systems: differences, temporary
    conditions, etc.

Feel free to explore the different sections. If some information is missing,
please [contact us][url_contact] to suggest additions or modifications.

## Getting Started

!!! tip "Searching the docs"

    If you're looking for information on a specific topic, the Search feature
    of this site will allow you to quickly find the page you're looking for.
    Just press ++s++ or ++f++ to open the Search bar and start typing.

You can first take a look at the [concepts][url_concepts] and
[definitions][url_glossary] of terms to get familiar with the terminology used
throughout those pages. You can also take a look at Sherlock's
[changelog][url_news] for news and updates, and at the [status
dashboard][url_status] to see the status of Sherlock's components and services.

Then, the following sections will you get started on Sherlock:

* [Prerequisites][url_prereq]
* [Connecting to the cluster][url_connect]
* [Submitting jobs][url_submit]


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

[url_wiki]:     http://sherlock.stanford.edu
[url_srcc]:     http://srcc.stanford.edu
[url_contact]:  mailto:srcc-support@stanford.edu
[url_news]:     http://news.sherlock.stanford.edu
[url_status]:   http://status.sherlock.stanford.edu

[url_concepts]:   /docs/overview/concepts
[url_glossary]:   /docs/overview/glossary
[url_prereq]:     /docs/getting-started/prerequisites
[url_connect]:    /docs/getting-started/connecting
[url_submit]:     /docs/getting-started/submitting
[url_transition]: /docs/user-guide/transition


