## Install R packages locally without root/sudo privileges

If you need to install an R package that is not part of the basic R installation, you can simply make a directory 
in your $HOME (aka ~) or $PI_HOME to add the packages to (in this case $HOME/Rpackages), in this example we add the ggplot2 package:

```$mkdir ~/Rpackages
$ml load R
$R

>install.packages("ggplot2", lib="~/Rpackages/", repos="http://cran.cnr.Berkeley.edu/")
library(ggplot2, lib.loc="~/Rpackages/")
```
Sometimes R packages need gcc compilation, either with C++, C or Fortran, in this case you need to load a compiler.

For C++/C:
```
$ml load gcc
```
for Fortran:
```
$ml load ifort
```
Note that sometimes it can take awhile to install and compile R packages, in some cases up to 30 minutes.
