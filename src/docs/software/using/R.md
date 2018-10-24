## Introduction

[R][url_r] is a programming language and software environment for statistical
computing and graphics.  It is similar to the [S][url_s] language and
environment developed at Bell Laboratories (formerly AT&T, now Lucent
Technologies). R provides a wide variety of statistical and graphical
techniques and is highly extensible.


### More documentation

The following documentation is specifically intended for using R on Sherlock.
For more complete documentation about R in general, please see the [R
documentation][url_r_docs].


## R on Sherlock

R is available on Sherlock and the corresponding [module][url_modules] can be
loaded with:

```
$ ml R
```

For a list of available versions, you can execute `ml spider R` at the Sherlock
prompt, or refer to the [Software list page][url_software_list].


### Using R

Once your environment is configured (_ie._ when the `R` module is loaded), R
can be started by simply typing R at the shell prompt:

```
$ R

R version 3.5.1 (2018-07-02) -- "Feather Spray"
Copyright (C) 2018 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)
[...]
Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

>
```

For a listing of command line options:

```
$ R --help
```

#### Running a R script

There are several ways to launch an R script on the command line, which will
have different ways of presenting the script's output:

| Method | Output |
| ------ | ------ |
| `Rscript script.R`| displayed on screen, on `stdout`|
| `R CMD BATCH script.R` | redirected to a `script.Rout` file |
| `R --no-save < script.R` | displayed on screen, on `stdout` |



#### Submitting a R job

Here's an example R batch script that can be submitted via `sbatch`. It runs a
simple matrix multiplication example, and demonstrate how to feed R code as a
[HEREDOC][url_heredoc] to R directly, so no intermediate R script is necessary:

```bash tab="R-test.sbatch"
#!/bin/bash

#SBATCH --time=00:10:00
#SBATCH --mem=10G
#SBATCH --output=R-test.log

# load the module
ml R

# run R code
R --no-save << EOF
set.seed (1)
m <- 4000
n <- 4000
A <- matrix (runif (m*n),m,n)
system.time (B <- crossprod(A))
EOF
```

You can save this script as `R-test.sbatch` and submit it to the scheduler with:
```
$ sbatch R-test.sbatch
```

Once the job is done, you should get a `R-test.out` file in the current
directory, with the following contents:

```
R version 3.5.1 (2018-07-02) -- "Feather Spray"
[...]
> set.seed (1)
> m <- 4000
> n <- 4000
> A <- matrix (runif (m*n),m,n)
> system.time (B <- crossprod(A))
   user  system elapsed
  2.649   0.077   2.726
```



### R packages

R comes with a single package library in `$R_HOME/library`, which contains the
standard and most common packages. This is usually in a system location and is
not writable by end-users.

To accommodate individual user's requirements, R provides a way for each user
to install packages in the location of their choice. The default value for a
directory where users can install their own R packages is
`$HOME/R/x86_64-pc-linux-gnu-library/<R_version>` where `<R_version>` depends
on the R version that is used.  For instance, if you have the `R/3.5.1` module
loaded, the default R user library path will be
`$HOME/R/x86_64-pc-linux-gnu-library/3.5`.

This directory doesn't exist by default. The first time a user installs an R
package, R will ask if she wants to use the default location and create the
directory.


#### Installing packages

To install a R package in your personal environment, the first thing to do is
load the R module:

```
$ ml R
```

Then start a R session, and use the `install.packages()` function at the R
prompt. For instance, the following example will install the `doParallel`
package, using the US mirror of the [CRAN repository][url_cran]:

```
$ R

R version 3.5.1 (2018-07-02) -- "Feather Spray"
[...]

> install.packages('doParallel', repos='http://cran.us.r-project.org')
```

It should give the following warning:
```
Warning in install.packages("doParallel", repos = "http://cran.us.r-project.org") :
  'lib = "/share/software/user/open/R/3.5.1/lib64/R/library"' is not writable
Would you like to use a personal library instead? (yes/No/cancel)
Would you like to create a personal library
‘~/R/x86_64-pc-linux-gnu-library/3.5’
to install packages into? (yes/No/cancel) y
```

Answering `y` twice will make R create a `~/R/x86_64-pc-linux-gnu-library/3.5`
directory and instruct it to install future R packages there.

The installation will then proceed:
```
trying URL 'http://cran.us.r-project.org/src/contrib/doParallel_1.0.14.tar.gz'
Content type 'application/x-gzip' length 173607 bytes (169 KB)
==================================================
downloaded 169 KB

* installing *source* package ‘doParallel’ ...
** package ‘doParallel’ successfully unpacked and MD5 sums checked
** R
** demo
** inst
** byte-compile and prepare package for lazy loading
** help
*** installing help indices
** building package indices
** installing vignettes
** testing if installed package can be loaded
* DONE (doParallel)

The downloaded source packages are in
        ‘/tmp/Rtmp0RHrMZ/downloaded_packages’
>
```
and when it's done, you should be able to load the package within R with:
```R
> library(doParallel)
Loading required package: foreach
Loading required package: iterators
Loading required package: parallel
>
```

##### Alternative installation path

To install R packages in a different location, you'll need to create that
directory, and instruct R to install the packages there:

```
$ mkdir ~/R_libs/
$ R
[...]
> install.packages('doParallel', repos='http://cran.us.r-project.org', lib="~/R_libs")
```

The installation will proceed normally and the `doParallel` package will be
installed in `$HOME/R_libs/`.


Specifying the full destination path for each package installation could
quickly become tiresome, so to avoid this, you can create a `.Renviron`
file in your `$HOME` directory, and define your `R_libs` path there:

```
$ cat << EOF > $HOME/.Renviron
R_LIBS=~/R_libs
EOF
```

With this, whenever R is started, the `$HOME/R_libs/` directory will be
added to the list of places R will look for packages, and you won't need to
specify this installation path when using `install.packages()` anymore.


!!! info "Where does R look for packages?"

    To see the directories where R searches for packages and libraries, you can
    use the following command in R:

    ```R
    > .libPaths()
    ```

!!! tip "Sharing R packages"

    If you'd like to share R packages within your group, you can simply define
    `$R_LIBS` to point to a shared directory, such as `$GROUP_HOME/R_libs` and
    have each user in the group use the instructions below to define it in
    their own environment.


##### Setting the repository

When installing a package, R needs to know from which repository the package
should be downloaded. If it's not specified, it will prompt for it and display
a list of available CRAN mirrors.

To avoid setting the CRAN mirror each time you run install.packages you can
permanently set the mirror by creating a `.Rprofile` file in your `$HOME`
directory, which R will execute each time it starts.

For instance, adding the following contents to your `~/.Rprofile` will make
sure that every `install.packages()` invocation will use the closest CRAN
mirror:

```R
## local creates a new, empty environment
## This avoids polluting the global environment with
## the object r
local({
  r = getOption("repos")
  r["CRAN"] = "https://cloud.r-project.org/"
  options(repos = r)
})
```

Once this is set, you only need to specify the name of the package to install,
and R will use the mirror you defined automatically:

```R
> install.packages("doParallel")
[...]
trying URL 'https://cloud.r-project.org/src/contrib/doParallel_1.0.14.tar.gz'
Content type 'application/x-gzip' length 173607 bytes (169 KB)
==================================================
downloaded 169 KB
```

##### Installing packages from GitHub

R packages can be directly installed from GitHub using the `devtools` package.
`devtools` needs to be installed first, with:

```R
> install.packages("devtools")
```

And then, you can then install a R package directly from its GitHub repository.
For instance, to install `dplyr` from [url_dplyr]:

```R
> library(devtools)
> install_github("tidyverse/dplyr")
```


#### Updating Packages

To upgrade R packages, you can use the `update.packages()` function within a R
session.

For instance, to update the `doParallel` package:
```R
> update.packages('doParallel')
```

When the package name is omitted, `update.pacakges()` will try to update all
the packages that are installed. Which is the most efficient way to ensure that
all the packages in your local R library are up to date.

!!! Warning "Centrally installed packages can not be updated"

    Note that attempting to update centrally installed packages will fail. You
    will have to use `install.packages()` to install your own version of the
    packages in your `$HOME` directory instead.


#### Removing packages

To remove a package from your local R library, you can use the
`remove.packages()` function. For instance:

```R
> remove.packages('doParallel')
```

### Examples

#### Single node

R has a couple of powerful and easy to use tools for parallelizing your R jobs.
[`doParallel`][url_doparallel] is one of them. If the `doParallel` package is
not installed in your environment yet, you can [install it in a few easy
step](#installing).

Here is a quick `doParallel` example that uses one node and 16 cores on
Sherlock (more nodes or CPU cores can be requested, as needed).


Save the two scripts below in a directory on Sherlock:

```R tab="doParallel_test.R"
# Example doParallel script

if(!require(doParallel)) install.packages("doParallel")
library(doParallel)

# use the environment variable SLURM_NTASKS_PER_NODE to set
# the number of cores to use
registerDoParallel(cores=(Sys.getenv("SLURM_NTASKS_PER_NODE")))

# bootstrap iteration example
x <- iris[which(iris[,5] != "setosa"), c(1,5)]
iterations <- 10000# Number of iterations to run

# parallel loop
# note the '%dopar%' instruction
parallel_time <- system.time({
  r <- foreach(icount(iterations), .combine=cbind) %dopar% {
    ind <- sample(100, 100, replace=TRUE)
    result1 <- glm(x[ind,2]~x[ind,1], family=binomial(logit))
    coefficients(result1)
  }
})[3]

# show the number of parallel workers to be used
getDoParWorkers()

# execute the function
parallel_time
```

```bash tab="doParallel_test.sbatch"
#!/bin/bash

#SBATCH --nodes=1
#SBATCH --ntasks-per-node=16
#SBATCH --output=doParallel_test.log

# --ntasks-per-node will be used in doParallel_test.R to specify the number
# of cores to use on the machine.

# load modules
ml R/3.5.1

# execute script
Rscript doParallel_test.R
```

And then submit the job with:
```
$ sbatch doParallel_test.sbatch
```

Once the job has completed, the output file should contain something like this:
```
$ cat doParallel_test.out
[1] "16"
elapsed
  3.551
```

**Bonus points**: observe the scalability of the `doParallel` loop by
submitting the same script using a varying number of CPU cores:

```
$ for i in 2 4 8 16; do
	sbatch --out=doP_${i}.out --ntasks-per-node=$i doParallel_test.sbatch
done
```

When the jobs are done:
```
$ for i in 2 4 8 16; do
	printf "%2i cores: %4.1fs\n" $i $(tail -n1 doP_$i.out)
done
 2 cores: 13.6s
 4 cores:  7.8s
 8 cores:  4.9s
16 cores:  3.6s
```


#### Multiple nodes

To distribute parallel R tasks on multiple nodes, you can use the
[`Rmpi`][url_rmpi] package, which provides MPI bindings for R.

To install the `Rmpi` package, a module providing MPI library must first be
loaded. For instance:
```
$ ml openmpi R
$ R
> install.packages("Rmpi")
```

Once the package is installed, the following scripts demonstrate a very basic
`Rmpi` example.


```R tab="Rmpi-test.R"
# Example Rmpi script

if (!require("Rmpi")) install.packages("Rmpi")
library(Rmpi)

# initialize an Rmpi environment
ns <- mpi.universe.size() - 1
mpi.spawn.Rslaves(nslaves=ns, needlog=TRUE)

# send these commands to the slaves
mpi.bcast.cmd( id <- mpi.comm.rank() )
mpi.bcast.cmd( ns <- mpi.comm.size() )
mpi.bcast.cmd( host <- mpi.get.processor.name() )

# all slaves execute this command
mpi.remote.exec(paste("I am", id, "of", ns, "running on", host))

# close down the Rmpi environment
mpi.close.Rslaves(dellog = FALSE)
mpi.exit()
```

```bash tab="Rmpi-test.sbatch"
#!/bin/bash

#SBATCH --nodes=2
#SBATCH --ntasks=4
#SBATCH --output=Rmpi-test.log

## load modules
# openmpi is not loaded by default with R, so it must be loaded explicitely
ml R openmpi

## run script
# we use '-np 1' since Rmpi does its own task management
mpirun -np 1 Rscript Rmpi-test.R
```

You can save those scripts as `Rmpi-test.R` and
`Rmpi-test.sbatch` and then submit your job with:
```
$ sbatch Rmpi-test.sbatch
```

When the job is done, its output should look like this:
```
$ cat Rmpi-test.log
        3 slaves are spawned successfully. 0 failed.
master (rank 0, comm 1) of size 4 is running on: sh-06-33
slave1 (rank 1, comm 1) of size 4 is running on: sh-06-33
slave2 (rank 2, comm 1) of size 4 is running on: sh-06-33
slave3 (rank 3, comm 1) of size 4 is running on: sh-06-34
$slave1
[1] "I am 1 of 4 running on sh-06-33"

$slave2
[1] "I am 2 of 4 running on sh-06-33"

$slave3
[1] "I am 3 of 4 running on sh-06-34"

[1] 1
[1] "Detaching Rmpi. Rmpi cannot be used unless relaunching R."
```

#### GPUs

Here's a quick example that compares running a matrix multiplication on a CPU
and on a GPU using R. It requires [submitting a job to a GPU node][url_gpu] and
the [`gpuR`][url_gpuR] R package.

```R tab='gpuR-test.R'
# Example gpuR script

if (!require("gpuR")) install.packages("gpuR")
library(gpuR)

print("CPU times")
for(i in seq(1:7)) {
    ORDER = 64*(2^i)
    A = matrix(rnorm(ORDER^2), nrow=ORDER)
    B = matrix(rnorm(ORDER^2), nrow=ORDER)
    print(paste(i, sprintf("%5.2f", system.time({C = A %*% B})[3])))
}

print("GPU times")
for(i in seq(1:7)) {
    ORDER = 64*(2^i)
    A = matrix(rnorm(ORDER^2), nrow=ORDER)
    B = matrix(rnorm(ORDER^2), nrow=ORDER)
    gpuA = gpuMatrix(A, type="double")
    gpuB = gpuMatrix(B, type="double")
    print(paste(i, sprintf("%5.2f", system.time({gpuC = gpuA %*% gpuB})[3])))
}
```

```bash tab='gpuR-test.sbatch'
#!/bin/bash

#SBATCH --partition gpu
#SBATCH --mem 8GB
#SBATCH --gres gpu:1
#SBATCH --output=gpuR-test.log

## load modules
# cuda is not loaded by default with R, so it must be loaded explicitely
ml R cuda

Rscript gpuR-test.R
```

After submitting the job with `sbatch gpuR-test.sbatch`, the output file should
contain something like this:
```
[1] "CPU times"
[1] "1  0.00"
[1] "2  0.00"
[1] "3  0.02"
[1] "4  0.13"
[1] "5  0.97"
[1] "6  7.56"
[1] "7 60.47"

[1] "GPU times"
[1] "1  0.10"
[1] "2  0.04"
[1] "3  0.02"
[1] "4  0.07"
[1] "5  0.39"
[1] "6  2.04"
[1] "7 11.59"
```

which shows a decent speedup for running on a GPU for the largest matrix sizes.



[comment]: #  (link URLs -----------------------------------------------------)

[url_r]:       	https://www.r-project.org/
[url_r_docs]:  	https://stat.ethz.ch/R-manual/
[url_s]: 		http://ect.bell-labs.com/sl/S/
[url_heredoc]:	https://en.wikipedia.org/wiki/Here_document
[url_doparallel]: https://cran.r-project.org/web/packages/doParallel/index.html
[url_cran]:  	https://cran.r-project.org/
[url_dplyr]:    https://github.com/tidyverse/dplyr
[url_rmpi]:     https://cran.r-project.org/web/packages/Rmpi
[url_gpur]:     https://cran.r-project.org/web/packages/gpuR

[url_modules]:          /docs/software/modules
[url_software_list]:    /docs/software/list
[url_storage]:          /docs/storage
[url_gpu]:              /docs/user-guide/gpu
