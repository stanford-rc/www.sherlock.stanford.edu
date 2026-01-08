# Seurat

[Seurat](url_seurat) is a commonly used R package for QC, analysis, and exploration of single-cell RNA-seq data. It can also be a bit hard to install on Sherlock because one of its dependencies, Matrix, doesn't install cleanly
from [CRAN](url_cran). However, with the help of a few helper modules on Linux and some special syntax for installing Matrix in R, Seurat can be a breeze to install in many of our [R module
versions](url_software_list).

First, you'll want to get a compute session and purge your current environment:

```bash
sh_dev -c 4
ml purge
```
You may have to wait a bit for an allocation, but once you do, you can load R and some helper modules and then launch R.

```bash
ml R/4.2
ml glpk gmp
R
```
We've tested this on 4.2 and 4.3, but you can try it on other versions as well.

Once you're in R, first install Matrix manually from a tarball:

```bash
install.packages("https://cran.r-project.org/src/contrib/Archive/Matrix/Matrix_1.6-5.tar.gz", repos=NULL, type="source", Ncpus=4)
```

and finally, install and launch Seurat:

```bash
install.packages("Seurat", repos="http://cran.us.r-project.org", Ncpus=4)
library(Seurat)
```

If you run into any issues, feel free to reach out at mailto:srcc@stanford.edu.

[comment]: # (link URLS ---------------------------------------------------)

[url_seurat]:               //https://satijalab.org/seurat/
[url_cran]:          //https://cran.r-project.org/

[url_software_list]:        ../list.md
[url_modules]:              ../modules.md
[url_code-server]:          ../../user-guide/ondemand.md#vs-code
