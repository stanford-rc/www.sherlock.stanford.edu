## Introduction

Perl is a high-level, general-purpose, interpreted, dynamic programming
language. Originally developed by Larry Wall in 1987 as a general-purpose Unix
scripting language to make report processing easier, it has since
undergone many changes and revisions.

Perl provides a framework allowing users to easily extend the language by
installing new modules in their local environment. The Comprehensive Perl
Archive Network (CPAN[^cpan]) is an archive of over 25,000 distributions of
software written in Perl, as well as documentation for it. It is searchable at
http://metacpan.org or http://search.cpan.org and mirrored in over 270
locations around the world.


### More documentation

The following documentation specifically intended for using Perl on Sherlock.
For more complete documentation about Perl in general, please see the [Perl
documentation][url_perl_docs].


## Perl modules on Sherlock


To install Perl modules from CPAN, we recommend using the (provided)
[`App::cpanminus`][url_cpanminus] module and [`local::lib`][url_locallib]
modules:

* `App::cpanminus` is a popular alternative CPAN client that can be used to
  manage Perl distributions. It has many great features, including uninstalling
  modules.
* `local::lib` allows users to install Perl modules in the directory of their
  choice (typically their home directory) without administrative privileges.


Both are already installed on Sherlock, and are automatically enabled and
configured when you load the `perl` module. You don't need to add anything in
your `~/.bashrc` file, the Sherlock `perl` module will automatically create
everything that is required so you can directly run a command to install Perl
modules locally.

### Installation

!!! tip "Perl modules installation is only necessary once"

    You only need to install Perl modules once on Sherlock. Since fielsystems
    are shared, modules installed on one node will immediately be available on
    all nodes on the cluster.

As an example, to install the `DateTime::TimeZone` module, you can do the
following:

```
$ ml perl
$ cpanm DateTime::TimeZone
```

### Usage

Once installed, you can use the Perl modules directly, no specific options or
syntax is required.

For instance, to check that the `DateTime::TimeZone` module is correctly
installed:

```
$ perl -MDateTime::TimeZone -e 'print $DateTime::TimeZone::VERSION . "\n"';
2.13
```

### Uninstallation

To uninstall a Perl module:

```
$ cpanm -U DateTime::TimeZone
```


[comment]: #  (link URLs -----------------------------------------------------)

[url_perl_docs]:    https://www.perl.org/docs.html
[url_cpan]:         https://www.cpan.org/
[url_cpanminus]:    https://metacpan.org/pod/App::cpanminus
[url_locallib]:     https://metacpan.org/pod/App::cpanminus


[comment]: #  (footnotes -----------------------------------------------------)

[^cpan]: CPAN can denote either the archive network itself, or the Perl program
  that acts as an interface to the network and as an automated software
  installer (somewhat like a package manager). Most software on CPAN is free
  and open source.



