## Install R packages locally without root/sudo privileges

If you need to install an R package that is not part of the basic R
installation, you can use the `install.packages` command in R, that will
download, compile and install R packages in your `$HOME` directory.

For instance, to install the `ggplot2` package:

```
$ mkdir ~/Rpackages
$ ml load R
$ R

> install.packages("ggplot2")
> library(ggplot2)
```

Sometimes R packages need compilation, either with C++, C or Fortran, in this
case you may need to load a compiler.  The `llvm` compiler is loaded by default
when you ml load R.  If you still get compilation errors you can try GCC.


For C++/C:Fortran
```
$ ml load gcc
```

Note that sometimes it can take awhile to install and compile R packages, in
some cases up to 30 minutes.


## R GUIs

It's best to edit and test your R code locally on your laptop/desktop and then
[scp][url_scp]/[rsync][url_rsync] your code/data over to Sherlock. If you need
to bring up the R GUI, remember to ssh with the -XY options in order to enable
X11 forwarding on Sherlock.

```
$ ssh -XY <sunetid>@login.sherlock.stanford.edu
```


We have rstudio available:

```
$ ml load rstudio
$ rstudio&
```

[comment]: #  (link URLs -----------------------------------------------------)

[url_scp]:      /docs/user-guide/storage/data-transfer/#scp-secure-copy
[url_rsync]:    /docs/user-guide/storage/data-transfer/#rsync
