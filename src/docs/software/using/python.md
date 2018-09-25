Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Its high-level built in data structures, combined with dynamic typing and dynamic binding, 
make it very attractive for Rapid Application Development, as well as for use as a scripting or 
glue language to connect existing components together. Python's simple, easy to learn syntax 
emphasizes readability and therefore reduces the cost of program maintenance. 


## Python versions
Sherlock features two different versions of Python: 2.7 and 3.6.1. 
The reason for the two versions is that some code, or modules, will only work with old features 
of version 2 while most code with work on version 3. 
The general consensus is to use Python 3 whenever you can, especially for most numerical based modules 
(for example: numpy, scipy, tensorflow, keras, etc).

You can load either version on Sherlock by doing the following:
 
```
$ ml python/3.6.1
```
For Python 3

or
     
```
$ ml python/2.7.13
```

If just load "python" without a version number, it will default to Python 2.7.


## Python modules in your environment
Python supports modules and packages which allows programs to be modularity.

Python provides a utility, called pip, that allows users to easily install modules from its extensive
library.



To install Python modules from CPAN, we recommend using the (provided)
[`App::cpanminus`][url_cpanminus] module and [`local::lib`][url_locallib]
modules:

* `App::cpanminus` is a popular alternative CPAN client that can be used to
  manage Python distributions. It has many great features, including uninstalling
  modules.
* `local::lib` allows users to install Python modules in the directory of their
  choice (typically their home directory) without administrative privileges.


Both are already installed on Sherlock, and are automatically enabled and
configured when you load the `perl` module. You don't need to add anything in
your `~/.bashrc` file, the Sherlock `perl` module will automatically create
everything that is required so you can directly run a command to install Python
modules locally.

### Installation

!!! tip "Python modules installation is only necessary once"

    You only need to install Python modules once on Sherlock. Since fielsystems
    are shared, modules installed on one node will immediately be available on
    all nodes on the cluster.

As an example, to install the `DateTime::TimeZone` module, you can do the
following:

```
$ ml perl
$ cpanm DateTime::TimeZone
```

### Usage

Once installed, you can use the Python modules directly, no specific options or
syntax is required.

For instance, to check that the `DateTime::TimeZone` module is correctly
installed:

```
$ perl -MDateTime::TimeZone -e 'print $DateTime::TimeZone::VERSION . "\n"';
2.13
```

### Uninstallation

To uninstall a Python module:

```
$ cpanm -U DateTime::TimeZone
```


[comment]: #  (link URLs -----------------------------------------------------)

[url_python]:         https://www.python.org/
[url_cpanminus]:    https://metacpan.org/pod/App::cpanminus
[url_locallib]:     https://metacpan.org/pod/App::cpanminus


[comment]: #  (footnotes -----------------------------------------------------)

[^cpan]: CPAN can denote either the archive network itself, or the Python program
  that acts as an interface to the network and as an automated software
  installer (somewhat like a package manager). Most software on CPAN is free
  and open source.



