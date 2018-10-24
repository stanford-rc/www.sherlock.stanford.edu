## Introduction

[Python][url_python] is an interpreted high-level programming language for
general-purpose programming. Its design philosophy emphasizes code readability,
notably using significant whitespace. It provides constructs that enable clear
programming on both small and large scales, which makes it both easy to learn
and very well-suited for rapid prototyping.

### More documentation

The following documentation is specifically intended for using Python on
Sherlock. For more complete documentation about Python in general, please see
the [Python documentation][url_python_docs].


## Python on Sherlock

Sherlock features multiple versions of Python (currently `2.7` and `3.6`).

Some applications only work with legacy features of version 2.x, while more
recent code will require specific version 3.x features.  [Modules on
Sherlock][url_modules] may only be available in a single flavor (as denoted by
their suffix: `_py27` or `_py36`, because the application only supports one or
the other.

You can load either version on Sherlock by doing the following commands:

```
$ ml python/2.7.13
```

or

```
$ ml python/3.6.1
```

!!! warning "The Python3 interpreter is `python3`"

    The Python3 executable is named `python3`, not `python`. So, once you have
    the "python/3.6.1" module loaded on Sherlock, you will need to use
    `python3` to invoke the proper interpreter. `python` will still refer to
    the default, older system-level Python installation, and may result in
    errors when trying to run Python3 code.

    This is an upstream decision detailled in [PEP-394][url_pep394], not
    something specific to Sherlock.


### Using Python

Once your environment is configured (ie. when the Python module is loaded),
Python can be started by simply typing `python` at the shell prompt:

```
$ python
Python 2.7.13 (default, Apr 27 2017, 14:19:21)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-11)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```


### Python packages

The capabilities of Python can be extended with packages developed by third
parties. In general, to simplify operations, it is left up to individual users
and groups to install these third-party packages in their own directories.
However, Sherlock provides tools to help you install the third-party packages
that you need.

Among [many others][url_modules], the following common Python packages are
provided on Sherlock:

* [NumPy][url_numpy]
* [SciPy][url_scipy]
* [TensorFlow][url_tensorflow]

Python modules on Sherlock generally follow the naming scheme below:
```
py-<package_name>/version_py<python_version>
```
For instance, NumPy modules are:

* [`py-numpy/1.14.3_py27`][url_module_numpy]
* [`py-numpy/1.14.3_py36`][url_module_numpy]


You can list all available module versions for a package with `ml spider
<package_name>`. For instance:

```
$ ml spider tensorflow
-------------------------------------------------------------------------------
  py-tensorflow:
-------------------------------------------------------------------------------
    Description:
      TensorFlow™ is an open source software library for numerical computation using data flow graphs.

     Versions:
        py-tensorflow/1.6.0_py27
        py-tensorflow/1.6.0_py36
        py-tensorflow/1.7.0_py27
        py-tensorflow/1.9.0_py27
        py-tensorflow/1.9.0_py36
```


!!! tip "Dependencies are handled automatically"

    When you decide to use NumPy on Sherlock, you just need to load the
    `py-numpy` module of your choice, and the correct Python interpreter will
    be loaded automatically. No need to load a `python` module explicitly.


#### Installing packages

If you need to use a Python package that is not already provided as a module on
Sherlock, you can use the [`pip`][url_pip] command. This command takes care of
compiling and installing most of Python packages and their dependencies. All of
`pip`'s commands and options are explained in detail in the [Pip user
guide][url_pip_docs].

A comprehensive index of Python packages can be found at [PyPI][url_pypi].


To install Python packages with `pip`, you'll need to use the `--user` option.
This will make sure that those packages are installed in a user-writable
location (by default, your `$HOME` directory). Since your `$HOME` directory is
shared across nodes on Sherlock, you'll only need to install your Python
packages once, and they'll be ready to be used on every single node in the
cluster.

For example:
```
$ pip install --user <package_name>
```

For Python 3, use `pip3`:
```
$ pip3 install --user <package_name>
```

Python packages will be installed in <code> $HOME/.local/lib/python<<font
color=red>&lt;version&gt;</font>/site-packages</code>, meaning that packages
for Python 2.x and Python 3.x will be kept separate. This both means that they
won't interfere with each other, but also that if you need to use a package
with both Python 2.x and 3.x, you'll need to install it twice, once for each
Python version.

##### List installed packages

You can easily see the list of the Python packages installed in your
environment, and their location, with `pip list`:

```
$ pip list -v
Package    Version Location                                                            Installer
---------- ------- ------------------------------------------------------------------- ---------
pip        18.1    /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip
setuptools 28.8.0  /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip
urllib3    1.24    /home/users/kilian/.local/lib/python2.7/site-packages               pip
virtualenv 15.1.0  /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip

```



##### Alternative installation path

!!! warning "Python paths"

    While theoretically possible, installing Python packages in alternate
    locations can be tricky, so we recommend trying to stick to the `pip
    install --user` way as often as possible. But in case you absolutely need
    it, we provide some guidelines below.


One common case of needing to install Python packages in alternate locations is
to share those packages with a group of users. Here's an example that will show
how to install the `urllib3` Python package in a group-shared location and let
users from the group use it without having to install it themselves.

First, you need to create a directory to store those packages. We'll put it in
`$GROUP_HOME`:
```
$ mkdir -p $GROUP_HOME/python/
```
Then, we load the Python module we need, and we instruct `pip` to install its
packages in the directory we just created:
```
$ ml python/2.7.13
$ PYTHONUSERBASE=$GROUP_HOME/python pip install --user urllib3
```
We still use the `--user` option, but with `PYTHONUSERBASE` pointing to a
different directory, `pip` will install packages there.

Now, to be able to use that Python module, since it's not been installed in a
default directory, you (and all the members of the group who will want to use
that module) need to set their `PYTHONPATH` to include our new shared
directory[^pythonpath]:
```
$ export PYTHONPATH=$GROUP_HOME/python/lib/python2.7/site-packages:$PYTHONPATH
```
And now, the module should be visible:
```
$ pip list -v
Package    Version Location                                                            Installer
---------- ------- ------------------------------------------------------------------- ---------
pip        18.1    /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip
setuptools 28.8.0  /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip
urllib3    1.24    /home/groups/ruthm/python/lib/python2.7/site-packages               pip
virtualenv 15.1.0  /share/software/user/open/python/2.7.13/lib/python2.7/site-packages pip
```

!!! tip "`$PYTHONPATH` depends on the Python version"

    The `$PYTHONPATH` environment variable is dependent on the Python version
    you're using, so for Python 3.6, it should include
    `$GROUP_HOME/python/lib/python3.6/site-packages`

!!! info "`$PATH` may also need to be updated"

    Some Python package sometimes also install executable scripts. To
    make them easily accessible in your environment, you may also want to
    modify your `$PATH` to include their installation directory.

    For instance, if you installed Python packages in `$GROUP_HOME/python`:
    ```
    $ export PATH=$GROUP_HOME/python/bin
    ```


##### Installing packages from GitHub

`pip` also supports installing packages from a variety of sources, including
GitHub repositories.

For instance, to install [HTTPie][url_httpie], you can do:
```
$ pip install --user git+git://github.com/jkbr/httpie.git
```


##### Installing a list of modules using a requirement file

`pip` allows installing a list of packages listed in a file, which can be
pretty convenient to install several dependencies at once.

In order to do this, create a text file called `requirements.txt` and place
each package you would like to install on its own line:

```tab="requirements.txt"
numpy
scikit-learn
keras
tensorflow
```

You can now install your modules like so:
```
$ ml python
$ pip install--user -r requirements.txt
```

#### Upgrading packages

`pip` can update already installed packages with the following command:

```
$ pip install --user --upgrade <package_name>

```

Upgrading packages also works with `requirements.txt` files:

```
$ pip install --user --upgrade -r requirements.txt

```


#### Uninstalling packages

To uninstall a Python package, you can use the `pip uninstall` command (note
that it doesn't take any `--user` option):

```
$ pip uninstall <package_name>
$ pip uninstall -r requirements.txt

```


[comment]: #  (link URLs -----------------------------------------------------)

[url_python]:         https://www.python.org/
[url_python_docs]:    https://www.python.org/doc
[url_pip]:            https://pip.pypa.io/en/stable/
[url_pip_docs]:       https://pip.pypa.io/en/stable/user_guide/
[url_pypi]:           https://pypi.python.org/pypi
[url_pep394]:         https://www.python.org/dev/peps/pep-0394

[url_numpy]:          http://www.numpy.org/
[url_scipy]:          https://www.scipy.org/
[url_tensorflow]:     https://www.tensorflow.org
[url_httpie]:         https://httpie.org/

[url_modules]:        /docs/software/list
[url_module_numpy]:   /docs/software/list/#py-numpy
[url_module_scipy]:   /docs/software/list/#py-scipy
[url_module_tensorflow]:  /docs/software/list/#py-tensorflow

[comment]: #  (footnotes -----------------------------------------------------)

[^pythonpath]: This line can also be added to a user's `~/.profile` file, for a
  more permanent setting.
