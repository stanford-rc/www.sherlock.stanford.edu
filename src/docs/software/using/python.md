## Introduction

[Python][url_python] is an interpreted high-level programming language for
general-purpose programming. Its design philosophy emphasizes code readability.
It provides constructs that enable clear programming on both small and large
scales, which makes it both easy to learn and very well-suited for rapid
prototyping.

### More documentation

The following documentation is specifically intended for using Python on
Sherlock. For more complete documentation about Python in general, please see
the [Python documentation][url_python_docs].


## Python on Sherlock

Sherlock features [multiple versions][url_module_python] of Python.

Some applications only work with legacy features of version 2.x, while more
recent code will require specific version 3.x features.  [Modules on
Sherlock][url_modules] may only be available in a single flavor (as denoted by
their suffix: `_py27` or `_py36`, because the application only supports one or
the other.

You can load either version on Sherlock by doing the following commands:

``` none
$ ml python/2.7.13
```

or

``` none
$ ml python/3.6.1
```

!!! warning "The Python3 interpreter is `python3`"

    The Python3 executable is named `python3`, not `python`. So, once you have
    the "python/3.6.1" module loaded on Sherlock, you will need to use
    `python3` to invoke the proper interpreter. `python` will still refer to
    the default, older system-level Python installation, and may result in
    errors when trying to run Python3 code.

    This is an upstream decision detailed in [PEP-394][url_pep394], not
    something specific to Sherlock.


### Using Python

Once your environment is configured (ie. when the Python module is loaded),
Python can be started by simply typing `python` at the shell prompt:

``` none
$ python
Python 2.7.13 (default, Apr 27 2017, 14:19:21)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-11)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>>
```


### Python in batch jobs

!!! info "Python output is buffered by default"

    By default, Python buffers console output. It means that when running
    Python in a batch job through Slurm, you may see output less often than you
    would when running interactively.

When output is being buffered, the `print` statements are aggregated until
there is a enough data to print, and then the messages are all printed at once.
And as a consequence, job output files (as specified with the `--output` and
`--error` job submission options) will be refreshed less often and may give the
impression that the job is not running.

For debugging or checking that a Python script is producing the correct output,
you may want to switch off buffering.

#### Switching  off buffering

For a single python script you can use the `-u` option, as in `python -u
my_script.py`. The `-u` option stands for "unbuffered".

For instance:

```shell
#!/bin/bash
#SBATCH -n 1

python -u my_script.py
```

!!! tip

    You can also use the environment variable `PYTHONUNBUFFERED` to set
    unbuffered I/O for your whole batch script.
    ```shell
    #!/bin/bash
    #SBATCH -n 1

    export PYTHONUNBUFFERED=True
    python my_script.py
    ```

NB: There is some performance penalty for having unbuffered print statements, so
you may want to reduce the number of print statements, or run buffered for
production runs.

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

Python modules on Sherlock generally follow the naming scheme below:

``` shell
py-<package_name>/version_py<python_version>
```

For instance, NumPy modules are:

* [`py-numpy/1.14.3_py27`][url_module_numpy]
* [`py-numpy/1.14.3_py36`][url_module_numpy]


You can list all available module versions for a package with `ml spider
<package_name>`. For instance:

``` shell
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

``` shell
$ pip install --user <package_name>
```

For Python 3, use `pip3`:

``` shell
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

``` shell
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

``` shell
$ mkdir -p $GROUP_HOME/python/
```

Then, we load the Python module we need, and we instruct `pip` to install its
packages in the directory we just created:

``` shell
$ ml python/2.7.13
$ PYTHONUSERBASE=$GROUP_HOME/python pip install --user urllib3
```

We still use the `--user` option, but with `PYTHONUSERBASE` pointing to a
different directory, `pip` will install packages there.

Now, to be able to use that Python module, since it's not been installed in a
default directory, you (and all the members of the group who will want to use
that module) need to set their `PYTHONPATH` to include our new shared
directory[^profile]:

``` shell
$ export PYTHONPATH=$GROUP_HOME/python/lib/python2.7/site-packages:$PYTHONPATH
```

And now, the module should be visible:

``` shell
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
    $ export PATH=$GROUP_HOME/python/bin:$PATH
    ```


##### Installing from GitHub

`pip` also supports installing packages from a variety of sources, including
GitHub repositories.

For instance, to install [HTTPie][url_httpie], you can do:

``` shell
$ pip install --user git+git://github.com/jkbr/httpie.git
```


##### Installing from a requirements file

`pip` allows installing a list of packages listed in a file, which can be
pretty convenient to install several dependencies at once.

In order to do this, create a text file called `requirements.txt` and place
each package you would like to install on its own line:

=== "`requirements.txt`"

    ``` shell
    numpy
    scikit-learn
    keras
    tensorflow
    ```

You can now install your modules like so:

``` shell
$ ml python
$ pip install --user -r requirements.txt
```

#### Upgrading packages

`pip` can update already installed packages with the following command:

``` shell
$ pip install --user --upgrade <package_name>
```

Upgrading packages also works with `requirements.txt` files:

``` shell
$ pip install --user --upgrade -r requirements.txt
```


#### Uninstalling packages

To uninstall a Python package, you can use the `pip uninstall` command (note
that it doesn't take any `--user` option):

``` shell
$ pip uninstall <package_name>
$ pip uninstall -r requirements.txt
```

### Virtual environments

A [virtual environment][url_venv_docs] is a self-contained directory that holds
its own Python interpreter and installed packages, isolated from the
system-wide installation and from other virtual environments. This is useful
when different projects require different (and potentially conflicting) versions
of the same package, or when you want a clean, reproducible set of dependencies
for a specific workflow.

On Sherlock, virtual environments also help keep your `$HOME` directory clean
by concentrating installed packages in a single, easily removable directory
rather than scattering them across `~/.local`.

!!! warning "Use a compute node for environment creation"

    Building virtual environments can be resource-intensive (compiling C
    extensions, resolving dependencies, etc.). This should be done on a compute
    node, for instance using the [`sh_dev`][url_sh_dev] command, rather than on
    a login node.


#### Using `venv`

Python 3 includes the `venv` module in its standard library. This is the
simplest way to create a virtual environment without any additional tools.

To create and activate a virtual environment:

``` none
$ ml python/3.12.1
$ python3 -m venv myenv
$ source myenv/bin/activate
```

Once activated, your shell prompt will be prefixed with the environment name,
and `pip` will install packages into the virtual environment directory rather
than into `~/.local`:

``` none
(myenv) $ pip install numpy pandas
```

To deactivate the environment and return to your normal shell:

``` shell
(myenv) $ deactivate
```

To use a virtual environment in a batch job, simply activate it in your Slurm
script:

``` shell title="job.sh"
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --output=my_job-%j.out
#SBATCH --partition=normal
#SBATCH --cpus-per-task=4
#SBATCH --mem=16GB
#SBATCH --time=02:00:00

ml python/3.12.1
source myenv/bin/activate
python3 my_script.py
```

To remove a virtual environment, simply delete its directory:

``` none
$ rm -rf myenv
```

!!! tip "Where to store virtual environments"

    Virtual environments can contain a large number of files. It is best to
    create them on `$GROUP_HOME` rather than in `$HOME`, to avoid running into
    space quota limits.

!!! warning "Concurrent jobs and virtual environments"

    Please also note that running multiple concurrent jobs using the same
    virtual environment can generate a lot of I/O on file systems not designed
    to handle direct I/O from jobs (like `$HOME`, `$GROUP_HOME`, or `$OAK`). If
    you need to run multiple jobs using the same virtual environment, consider
    installing it on `$SCRATCH` (keeping in mind the [file expiration
    policy][url_file_expiration] there), or copying it to a local scratch
    directory on the compute node (like `$L_SCRATCH`) before activating it.


#### Using `uv`

[uv][url_uv] is a fast Python package and project manager that handles
dependency resolution, virtual environments, and Python version management. It
has gained significant popularity as a modern alternative to `pip` + `venv`
workflows, largely due to its speed and its built-in support for reproducible
project configurations.

For the full `uv` documentation, see the [official docs][url_uv]. For details
on `uv`'s virtual environment support, see [`uv venv`][url_uv_venv].

##### uv on Sherlock

`uv` is available on Sherlock and the corresponding [module][url_modules] can
be loaded with:

``` none
$ ml uv
```

For a list of available versions, you can execute `ml spider uv` at the
Sherlock prompt, or refer to the [Software list page][url_module_uv].

##### Configuration

By default, `uv` will try to download its own Python interpreter. On Sherlock,
it is generally better to use the Python provided by the module system. After
loading a Python module, set `UV_PYTHON` so that `uv` uses it:

``` none
$ ml python/3.12.1
$ export UV_PYTHON=$(which python3)
```

##### Quick start with `uv pip`

This approach is closest to the traditional `pip` + `venv` workflow:

``` none
$ ml python/3.12.1 uv gcc/12.4.0
$ export UV_PYTHON=$(which python3)
$ uv venv
$ source .venv/bin/activate
$ uv pip install numpy pandas matplotlib
```

##### Project-based workflow with `uv init`

For reproducible environments, `uv` can manage a `pyproject.toml` file that
tracks all dependencies and their exact versions. This is the recommended
approach for projects that need to be shared or reproduced.

To initialize a new project:

``` none
$ cd /path/to/projects
$ uv init --package my_project
$ cd my_project
```

This creates a `pyproject.toml`, a `src/my_project/` directory for reusable
modules, and (after adding packages) a `.venv` directory. If your code is not
structured as a package, you can use `uv init my_project` instead (without
`--package`).

To add dependencies:

``` none
$ uv add pandas numpy matplotlib
```

`uv add` both installs the package into `.venv` and records it in
`pyproject.toml`, so the environment can be recreated from the file alone.

For packages hosted on GitHub:

``` none
$ uv add git+https://github.com/user/repo.git@main
```

!!! warning "Avoid modifying the environment manually after activation"

    Changing a `uv`-managed environment using `pip install` directly (after
    activating the `.venv`) can break the alignment between `.venv` and
    `pyproject.toml`. Use `uv add` or `uv pip` instead. When in doubt, check
    `uv --help`.

##### Running scripts with `uv run`

`uv run` executes a command using the project's `.venv` without needing to
activate it first:

``` none
$ uv run --project /path/to/my_project python analysis/my_script.py
```

##### Batch jobs with `uv`

For the quick `uv pip` workflow, batch scripts only need to activate the
`.venv`:

``` shell title="run_script.sh"
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --output=my_job-%j.out
#SBATCH --partition=normal
#SBATCH --cpus-per-task=4
#SBATCH --mem=16GB
#SBATCH --time=02:00:00

source .venv/bin/activate
python3 my_script.py
```

For the project-based workflow, use `uv run` after having loaded the required
modules:

``` shell title="run_project.sh"
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --output=my_job-%j.out
#SBATCH --partition=normal
#SBATCH --cpus-per-task=4
#SBATCH --mem=16GB
#SBATCH --time=02:00:00

module load python/3.12.1
module load gcc/12.4.0
module load uv
export UV_PYTHON=$(which python3)

uv run --project /path/to/my_project python analysis/my_script.py
```

Submit with:

``` none
$ sbatch run_project.sh
```

##### Using with VS Code

To use your `uv` environment in VS Code on Sherlock (via the
[OnDemand code server][url_ood_codeserver]):

1. Make sure your `.venv` is already created before starting the code server.
2. Open your project folder in VS Code, then open any Python file or notebook.
3. When prompted, pick `.venv/bin/python` as the interpreter (or kernel for
   notebooks).

If VS Code doesn't find the `.venv` automatically, restart the code server
session.


[comment]: #  (link URLs -----------------------------------------------------)

[url_python]:           //www.python.org/
[url_python_docs]:      //www.python.org/doc
[url_pip]:              //pip.pypa.io/en/stable/
[url_pip_docs]:         //pip.pypa.io/en/stable/user_guide/
[url_pypi]:             //pypi.python.org/pypi
[url_pep394]:           //www.python.org/dev/peps/pep-0394
[url_venv_docs]:        //docs.python.org/3/library/venv.html

[url_uv]:               //docs.astral.sh/uv/
[url_uv_venv]:          //docs.astral.sh/uv/pip/environments/

[url_numpy]:            //www.numpy.org/
[url_scipy]:            //www.scipy.org/
[url_httpie]:           //httpie.org/

[url_modules]:          ../list.md
[url_module_python]:    ../list.md#python
[url_module_numpy]:     ../list.md#py-numpy
[url_module_scipy]:     ../list.md#py-scipy
[url_module_tensorflow]:../list.md#py-tensorflow
[url_module_uv]:        ../list.md#uv
[url_sh_dev]:           ../../../user-guide/running-jobs#interactive-jobs
[url_file_expiration]:  ../../../storage/filesystems#expiration-policy
[url_ood_codeserver]:   ../../../user-guide/ondemand#vs-code

[comment]: #  (footnotes -----------------------------------------------------)

[^profile]: This line can also be added to a user's `~/.profile` file, for a
  more permanent setting.


--8<--- "includes/_acronyms.md"
