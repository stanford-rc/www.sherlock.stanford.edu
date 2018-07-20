Install R locally with out root/sudo privileges

If you need to install and R package that's not part of the basic R installation, you can would simply make a directory 
in your /home or $PI_HOME to add the packages to (in this case /data/Rpackages) add this to your code:

mkdir ~/Rpackages
ml load R
R

install.packages("ggplot2", lib="~/Rpackages/", repos="http://cran.cnr.Berkeley.edu/")
library(ggplot2, lib.loc="~/data/Rpackages/")
