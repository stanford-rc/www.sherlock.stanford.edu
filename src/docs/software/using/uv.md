## Introduction

[uv][url_uv] is a Python package and project manager that one may compare to
something like Conda, though it has gained a lot of popularity recently due
to being much faster and more efficient. It offers dependency resolution and
also allows you to customize your Python version on Sherlock. Additionally,
when paired with venv, a workflow for which it has in-built support, you can
also leverage it to create virtual environments for your projects.  

### More documentation

The following documentation shows a specific workflow for installing uv packages
into a Python venv on Sherlock. uv has a ton of other functionality that you can
check out here. You can also go here for more on [uv venv][url_uv_venv].


## uv on Sherlock

uv is available on Sherlock and the corresponding [module][url_modules] can
be loaded with:

``` none
$ ml uv/0.9
```

For a list of available versions, you can execute `ml spider uv` at the
Sherlock prompt, or refer to the [Software list page][url_software_list].


## Using uv

### Requesting a compute session

While the login node you ssh'ed to is fine for small operations, larger things like
environment construction should be done on a compute node. On Sherlock, you can request
one with the custom command below:

``` none
$ sh_dev
```

For more intensive work, you can request a more robust
allocation. For example:

``` none
$ salloc -p dev -c 4 -m 16GB -t 2:00:00
```

should be more than enough to handle any environments you might put together. You can tweak
the allocation as needed.


### Building a uv venv

Once you have a compute session, you can start building a virtual environment with uv acting as
a package manager. As a sample workflow, we'll set up an environment for running LLMs through
`transformers`. 

```bash
ml uv/0.9 gcc/12						# load required Sherlock modules
uv venv --managed-python --python 3.13				# build venv with python 3.13
source .venv/bin/activate					# activate environment
uv pip install diffusers transformers accelerate --upgrade	# pip required packages
```
### Creating uv venv and Running Python Script as Batch Job

Here's an example Slurm script that creates, initiates, and uses the uv venv to 
run a python script. Keep in mind that if you've already created the environment,
you wouldn't want to recreate and pip everything each time; you'd just need to source the environment to access it:

``` bash title="uv_pyscript.sh"
#!/bin/bash
#SBATCH --job-name=uv_setup
#SBATCH --output=uv_setup-%j.out
#SBATCH --error=uv_setup-%j.err
#SBATCH --partition=normal
#SBATCH -c=4
#SBATCH --mem=16GB
#SBATCH --time=02:00:00

ml uv gcc/12
uv venv --managed-python --python 3.13
source .venv/bin/activate
uv pip install diffusers transformers accelerate --upgrade

python3 foo.py

You can submit this script with `sbatch`:

``` none
$ sbatch uv_pyscript.sh
Submitted batch job 6515470
```

The job requests 4 cpus with at least 16GB memory for 2 hours.


[comment]: # (link URLS ---------------------------------------------------)

[url_uv]:               //docs.astral.sh/uv/
[url_uv_venv]:          //docs.astral.sh/uv/pip/environments/

[url_software_list]:        ../list.md
[url_modules]:              ../modules.md
