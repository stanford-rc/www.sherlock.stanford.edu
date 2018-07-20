Install R locally without root/sudo privileges

If you need to install an R package that's not part of the basic R installation, you can would simply make a directory 
in your /home or $PI_HOME to add the packages to (in this case /data/Rpackages), in this example we add the ggplot2 package:

mkdir ~/Rpackages
ml load R
R

install.packages("ggplot2", lib="~/Rpackages/", repos="http://cran.cnr.Berkeley.edu/")
library(ggplot2, lib.loc="~/data/Rpackages/")

Sometimes an R package will need compilation, either wil C++, C or Fortran, in this case you need to load a compiler-
For C++/C-

ml load gcc

for Fortran
ml load ifort
