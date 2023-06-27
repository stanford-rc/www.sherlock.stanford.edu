# Sherlock <small>documentation</small>

<!-- HTML interlude for the main page logo -->
<style>
@media only screen and (max-width: 720px) {
    #logo_head {
        display: none;
    }
}
# logo_head {
    margin-top: -50px;
}
</style>
<img id="logo_head" align="right" width="220px"
     alt="Sherlock" src="/assets/images/logo.png">
<!-- resuming normal Markdown operations -->


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

Sherlock is **free** to use for anyone doing departmental or sponsored research
at Stanford.  Any faculty member can request access for research purposes, and
get an account with a base storage allocation and unlimited compute time on the
global, shared pool of resources.

!!! info "No CPU.hour charge"

    Unlike all Cloud Service Providers and many HPC systems, there is no usage
    charge on Sherlock.

    When you submit your work on Sherlock, you don't need to keep an eye on the
    clock and worry about how much that run will cost you. There is no limit on
    the total amount of computing you can run on the cluster, as long as
    resources are available, and there's no charge to use them, no matter how
    large or small your computations are.


In case those free resources are not sufficient, Stanford Research Computing
offers Faculty members the [opportunity to invest][url_invest] into the
cluster, and get access to additional computing resources for their research
teams. Using a traditional compute cluster condominium model, participating
faculty and their teams get priority access to the resources they purchase.
When they're idle, those resources are available to use by other owners on the
cluster, giving them access to virtually unlimited resources.


## Information sources

!!! tip "Searching the docs"

    If you're looking for information on a specific topic, the Search feature
    of this site will allow you to quickly find the page you're looking for.
    Just press ++s++, ++f++ or ++slash++ to open the Search bar and start
    typing.

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
    cluster. We would like to thank Stanford University and the Stanford
    Research Computing Center for providing computational resources and support
    that contributed to these research results.


## Support

### Email <small>(recommended)</small>

Research Computing support can be reached by sending an email to
{{ support_email }} and **mentioning Sherlock**.


!!! important "How to submit effective support requests"

    To ensure a timely and relevant response, please make sure to include some
    additional details, such as job ids, commands executed and error messages
    received, so we can help you better. For more details, see the
    [Troubleshooting][url_troubleshoot] page.

As a member of the Sherlock community, you're also automatically subscribed to
the [sherlock-announce][url_sha_ml] mailing-list, which is only used by the
SRCC team to send important announcements about Sherlock,

### Onboarding sessions

We offer regular onboarding sessions for new Sherlock users.

!!! info "On-boarding session times"

    On-boarding sessions are offered every first Wednesday of the month,
    1PM-2PM PST, via [Zoom][url_ob_zoom]

These one-hour sessions are a brief introduction to Sherlock's layout, its
scheduler, the different file systems available on the cluster, as well as some
job submission and software installation best practices for new users. They are
a good intro course if you are new to Sherlock or HPC in general.

If you can't attend live on-boarding sessions, you can still take a look at the
:fontawesome-regular-file-pdf: [on-boarding slides][url_ob_slides] as well as
to this :fontawesome-brands-youtube: [session recording][url_ob_record].


### Office hours

Sending a question to {{ support_email }} is always the best first option
for questions. That way you can include detailed descriptions of the problem
or question, valuable output and error messages and any steps you took when you
encountered your error. Also, everyone on our team will see your ticket,
enabling the most appropriate group member to respond.

Office hours are a good place for more generalized questions about Sherlock,
Slurm, Linux usage, data storage, queue structures/scheduling, job optimization
and general capabilities of Sherlock. It's also useful for more technically
nuanced questions that may not be easily answered with our ticketing system. In
office hours some problems can indeed be solved quickly or progress can be made
so that you can then work self-sufficiently towards a solution on your own.

!!! bug "COVID-19 update"

    **We'll be holding remote office hours via [Zoom][url_zoom], for the time
    being.**

!!! info "Office hours times"

    Click here to join the **[Sherlock Office Hours Zoom][url_oh_zoom]**

    * Tuesday 10-11am
    * Thursday 3-4pm

You'll need a [full-service SUNet ID][url_sunet] (basically, a @stanford.edu
email address) in order to [authenticate][url_zoom] and join Office Hours via
Zoom.  If you do not have a full service account, please contact us at {{
support_email }}.

If you can't make any of the Office Hours sessions, you can also make an
**[appointment][url_calendar]** with Sherlock's support team.

#### What to expect

* We cannot accommodate walk-ins: we're unfortunately not staffed to
  accommodate walk-ins, so please make sure that you're planning to stop by
  **during** office hours. We will not be able to help you otherwise.

* We can rarely help with application-specific or algorithm problems.

* You should plan your projects sufficiently in advance and not come to office
  hours at the last minute before a deadline. Sherlock is a busy resource with
  several thousand users and you should not expect your jobs to complete before
  a given date.

* Not all questions and problems can be answered or solved during office hours,
  especially ones involving hardware, filesystem or network issues. Sherlock
  features several thousand computing, networking and storage components, that
  are constantly being monitored by our team. You can be sure that when
  Sherlock has an issue, we are aware of it and working on it.


## User community

Sherlock is present on the [Stanford Slack Grid][url_su_slack], and you're more
than welcome to join the following channels:

* **[`#sherlock-announce`][url_sl_sha]**, for announcements related to
    Sherlock and its surrounding services,
* **[`#sherlock-users`][url_sl_shu]**, as a place for Sherlock users to
    connect directly with each other. If you have general questions about
    Sherlock, want to reach out to other Sherlock users to share tips, good
    practices, tutorials or other info, please feel free to do so there.

For more details about the SRCC Slack Workspace, and instructions on how to
join this workspace and its channels, please see <https://srcc.stanford.edu/support>.

!!! warning "Slack is not an official support channel"

    Please note that while SRCC staff will monitor these channels, the official
    way to get support is still to email us at {{ support_email }}.


## Quick Start

If you're in a rush[^account], here's a 3-step ultra-quick start:

1. connect to Sherlock

   ``` shell
   $ ssh login.sherlock.stanford.edu
   ```

2. get an interactive session on a compute node

   ``` shell
   [kilian@sh-ln01 login! ~]$ sh_dev
   ```

3. run a command

   ``` shell
   [kilian@sh02-01n58 ~]$ module load python
   [kilian@sh02-01n58 ~]$ python -c "print('Hello Sherlock')"
   Hello Sherlock
   ```

Congrats! You ran your first job on Sherlock!

### Replay

Here's what it looks like in motion:
<script type="text/javascript"
    src="https://asciinema.org/a/bnw8hx26ja9n72q8oy8cxzzcy.js"
    id="asciicast-bnw8hx26ja9n72q8oy8cxzzcy"
    data-preload="true" data-speed="2" data-theme="monokai"
    async>
</script>


[comment]: #  (link URLs -----------------------------------------------------)
[url_srcc]:         //srcc.stanford.edu
[url_docs]:         //www.sherlock.stanford.edu/docs
[url_news]:         //news.sherlock.stanford.edu
[url_status]:       //status.sherlock.stanford.edu

[url_invest]:       /docs/concepts#investing-in-sherlock
[url_concepts]:     /docs/concepts
[url_glossary]:     /docs/glossary
[url_prereq]:       /docs/getting-started/
[url_connect]:      /docs/getting-started/connecting
[url_submit]:       /docs/getting-started/submitting
[url_troubleshoot]: /docs/user-guide/troubleshoot/#how-to-submit-a-successful-support-request

[url_shu_ml]:       //mailman.stanford.edu/mailman/listinfo/sherlock-users
[url_sha_ml]:       //mailman.stanford.edu/mailman/listinfo/sherlock-announce
[url_polya]:        //campus-map.stanford.edu/?id=14-160&lat=37.42898333&lng=-122.17752929&zoom=17&srch=polya%20hall

[url_zoom]:         //stanford.zoom.us
[url_oh_zoom]:      //stanford.zoom.us/j/95962823750?pwd=cFM2U2ZRQ243Zkx0Ry83akdtWU9zUT09
[url_ob_zoom]:      //stanford.zoom.us/j/97524291024?pwd=Q0g3b2wvSHhPaTdtOElGRVZFOCtqdz09
[url_ob_slides]:    //srcc.stanford.edu/workshops/sherlock-boarding-session
[url_ob_record]:    //youtu.be/iqq7GGqMRg8

[url_calendar]:     //calendly.com/srcc-officehours/sherlock

[url_sunet]:        //uit.stanford.edu/service/accounts/sunetids#services
[url_su_slack]:     //uit.stanford.edu/service/slack
[url_sl_sha]:       //srcc.slack.com/archives/C01862L37CN
[url_sl_shu]:       //srcc.slack.com/archives/C0192KNKYSU

[comment]: #  (footnotes -----------------------------------------------------)

[^account]: even in a rush, you'll still need an account on the cluster. See
  the [Prerequisites][url_prereq] page for details.


--8<--- "includes/_acronyms.md"
