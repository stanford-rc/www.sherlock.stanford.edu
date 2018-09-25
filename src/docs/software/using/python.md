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


## Installing Python modules in your environment
Python supports modules and packages which allows programs to be modularity.

Python provides a utility, called `pip`, that allows users to easily install modules 
from its extensive library.

To install Python modules from with `pip`, we recommend using the `--user` option 
when installing so that it installs inside of your environment. 

For example: 
```
$ pip install <module name> --user
```

For Python 3, use `pip3`:

```
$ pip3 install <module name> --user
```


### Install a list of modules using a requirement file

Python's `pip` utility also allows you to install a list of modules by using a file called `requirements.txt`. 

In order to do this, create a text file called `requirements.txt` and place the module you would like to install on its own line like so:
```
numpy
scikit-learn
keras
tensorflow
```

You can now install your modules like so:
```
$ pip3 install -r requirements.txt --user
```

### Upgrading packages

`Pip` can update a package by:

```
$ pip3 install <module name> --upgrade --user

```

It even easier with a `requirements.txt` file:

```
$ pip3 install -r requirements.txt --upgrade --user

```

### Anaconda

`Anaconda` can be used in Sherlock by loading the module:
```
$ ml anaconda/5.0.0-py36

```

Although for installing modules we prefer using the `pip` utility on Sherlock. 


### Uninstallation

To uninstall a Python module:

```
$ pip3 uninstall <module name> --upgrade --user

```

With a `requirements.txt` file:

```
$ pip3 uninstall -r requirements.txt --upgrade --user

```


[comment]: #  (link URLs -----------------------------------------------------)

[url_python]:         https://www.python.org/
[url_pip]:            https://pip.pypa.io/en/stable/