To start using Sherlock, you will need:

- [x] an active [SUNet ID][url_sunet]

    !!! information "SUNet ID [service levels][url_level] and external collaborators"

        Base-level service is sufficient for Sherlock accounts. External
        collaborators, or users without a SUNet ID, can be sponsored by a PI a
        get a sponsored SUNet ID at no cost. Please see the [sponsorship
        page][url_sponsor] for more information.

- [x] a [Sherlock account][url_request]
- [x] a [SSH client][url_ssh][^ssh]
- [x] good understanding of the [concepts][url_concepts] and
  [terms][url_glossary] used throughout that documentation.
- [x] some [familiarity with command-line environments, especially
  UNIX/Linux][url_unix]
- [x] notions of [shell scripting][url_bash]



## How to request an account

To request an account, the sponsoring Stanford faculty member should email
research-computing-support@stanford.edu, specifying the names and SUNet IDs of
his/her research team members needing an account.

Sherlock is open to the Stanford community as a computing resource to support
departmental or sponsored research, thus a faculty member's explicit consent is
required for account requests.

!!! warning "Sherlock is a resource for research"

    Sherlock is not suitable for course work, class assignments or general-use
    training sessions.

There is no fee associated with using Sherlock, and no limit in the amount of
accounts each faculty member can request. We will periodically ensure that all
accounts associated with each PI are still active, and reserve the right to
close any Sherlock account whose SUNet ID is expired.



## SSH clients


### Linux :fa-linux:

Linux distributions usually come with a version of the [OpenSSH][url_openssh]
client already installed. So no additional software installation is required.
If not, please refer to your distribution's documentation to install it.

### MacOS :fa-apple:

MacOS systems usually come with a version of the [OpenSSH][url_openssh] client
already installed. So no additional software installation is required


### Windows :fa-windows:

Microsoft Windows doesn't provide any SSH client by default. To install one,
you have several options, depending on the version of Windows.

* **Preferred option**: Windows 10 provides a feature called the ["Windows
  Subsystem for Linux"][url_wsl] (WSL). Please refer to the [official
  documentation][url_wsl_doc] or [this howto][url_wsl_howto] for installation
  instructions. Once installed, you'll be able to use the `ssh` command from a
  Windows terminal to connect to Sherlock.

* The [Cygwin project][url_cygwin] predates WSL and provides similar features,
  which among other things, allow users to install a command-line SSH client on
  their Windows machines.

The two options above will ensure the best compatibility with the Sherlock
environment. If you'd like to explore other avenues, many [other SSH client
implementations][url_ssh_clients] are available, but have not necessarily been tested
with Sherlock, so your mileage may vary.


## UNIX/Linux resources

A full tutorial on using UNIX/Linux is beyond the scope of this documentation.
However, there are many tutorials for beginning to use UNIX/Linux on the web.

A few tutorials we recommend are:

* [Unix Tutorial for Beginners][url_tuto_1] (University of Surrey, UK)
* [Introduction to Unix][url_tuto_2] (Imperial College, London)
* [The Unix Shell][url_tuto_3] (Software Carpentry)

More specifically about HPC[^hpc]:

* [HPC in a day][url_tuto_4] (Software Carpentry}

## Shell scripting

Compute jobs launched on Sherlock are most often initialized by user-written
shell scripts. Beyond that, many common operations can be simplified and
automated using shell scripts.

For an introduction to shell scripting, you can refer to:

* [BASH Programming - Introduction HOW-TO][url_scripting]


[comment]: #  (link URLs -----------------------------------------------------)

[url_sunet]:        https://uit.stanford.edu/service/accounts/sunetids
[url_level]:        https://uit.stanford.edu/service/accounts/sunetids#services
[url_sponsor]:      https://uit.stanford.edu/service/sponsorship/

[url_openssh]:      https://www.openssh.com/
[url_wsl]:          https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux
[url_wsl_doc]:      https://msdn.microsoft.com/commandline/wsl
[url_wsl_howto]:    https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/
[url_cygwin]:       https://cygwin.com
[url_ssh_clients]:  https://en.wikipedia.org/wiki/Comparison_of_SSH_clients#Platform

[url_request]:      #how-to-request-an-account
[url_ssh]:          #ssh-clients
[url_unix]:         #unix-linux-resources
[url_bash]:         #shell-scripting
[url_concepts]:     /docs/overview/concepts
[url_glossary]:     /docs/overview/glossary

[url_scripting]:    http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html
[url_tuto_1]:       http://www.ee.surrey.ac.uk/Teaching/Unix/
[url_tuto_2]:       http://www.doc.ic.ac.uk/~wjk/UnixIntro/
[url_tuto_3]:       https://swcarpentry.github.io/shell-novice/
[url_tuto_4]:       https://psteinb.github.io/hpc-in-a-day/

[comment]: #  (footnotes -----------------------------------------------------)

[^ssh]: [Secure SHell](https://en.wikipedia.org/wiki/Secure_Shell): a
  cryptographic network protocol for operating network services securely over
  an unsecured network, for instance, remote login to computer systems by users.

[^hpc]: High-Performance Computing
