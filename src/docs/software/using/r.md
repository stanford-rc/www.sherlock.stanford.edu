## Install R packages locally without root/sudo privileges

If you need to install an R package that is not part of the basic R installation, you can simply make a directory 
in your $HOME (aka ~) or $PI_HOME to add the packages to (in this case $HOME/Rpackages), in this example we add the ggplot2 package:

```$mkdir ~/Rpackages
$ml load R
$R

>install.packages("ggplot2", lib="~/Rpackages/", repos="http://cran.cnr.Berkeley.edu/")
library(ggplot2, lib.loc="~/Rpackages/")
```
Sometimes R packages need compilation, either with C++, C or Fortran, in this case you may need to load a compiler.  The llvm compiler is loaded by default when you ml load R.

For C++/C:
```
$ml load gcc
```
for Fortran:
```
$ml load ifort
```
Note that sometimes it can take awhile to install and compile R packages, in some cases up to 30 minutes.
## R GUIs

It's best to edit and test your R code locally on your laptop/destop and then [scp]/[rsync] your code/data over to Sherlock. If you need to bring up the R GUI, remember to ssh with the -XY options in order to enable X11 forwarding on Sherlock.

```
ssh -XY <sunetid>@login.sherlock.stanford.edu
```

We have rstudio availible.

```
$ml load rstudio

$rstudio &
```

[comment]: #  (link URLs -----------------------------------------------------)

[scp]: https://www.sherlock.stanford.edu/docs/user-guide/storage/data-transfer/#scp-secure-copy
[rsync]: https://www.sherlock.stanford.edu/docs/user-guide/storage/data-transfer/#rsync
