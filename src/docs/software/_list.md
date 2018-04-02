
## Categories

*As of Monday, April 02 2018, we provide 325 software packages, in 7 categories, covering 45 fields of science:*

* [`biology`](#biology) <small>computational biology, cryo-em, genomics, neurology, phylogenetics</small>
* [`chemistry`](#chemistry) <small>computational chemistry, molecular dynamics, quantum chemistry</small>
* [`devel`](#devel) <small>build, compiler, data, language, libs, mpi, networking, parser</small>
* [`math`](#math) <small>computational geometry, deep learning, linear algebra, machine learning, numerical analysis, numerical library, optimization, scientific computing, statistics, symbolic</small>
* [`physics`](#physics) <small>astronomy, geophysics, gis, photonics</small>
* [`system`](#system) <small>becnhmark, compression, containers, database, file management, file transfer, language, libs, resource monitoring, scm, tools</small>
* [`viz`](#viz) <small>graphs, molecular visualization, plotting, remote display</small>


!!! warning "Licensed software"

    Access to software modules marked with ^<b class="lic"></b>^ in the tables
    below is restricted to properly licensed user groups.

    The SRCC is not funded to provide commercial software on Sherlock and
    researchers are responsible for the costs of purchasing and renewing
    commercial software licenses. For more information, please feel free to
    [contact us](mailto:srcc-support@stanford.edu) and see the [Stanford
    Software Licensing page](https://uit.stanford.edu/service/softwarelic) for
    purchasing information.


<!-- color styles for module properties -->
<style>
.lic  { color: darkred; }
.lic:after {
    content: attr(class);
}
</style>


### Biology
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**computational biology** | `imp` | -&nbsp;`2.8.0` | [Website](https://integrativemodeling.org/) | IMP's broad goal is to contribute to a comprehensive structural characterization of biomolecules ranging in size and complexity from small peptides to large macromolecular assemblies, by integrating data from diverse biochemical and biophysical experiments. 
**computational biology** | `py-biopython` | -&nbsp;`1.70_py27` | [Website](http://biopython.org) | Biopython is a set of freely available tools for biological computation written in Python. 
**computational biology** | `rosetta` | -&nbsp;`3.8` | [Website](https://www.rosettacommons.org) | Rosetta is the premier software suite for modeling macromolecular structures. As a flexible, multi-purpose application, it includes tools for structure prediction, design, and remodeling of proteins and nucleic acids. 
**cryo-em** | `eman2` | -&nbsp;`2.2` | [Website](http://blake.bcm.edu/emanwiki/EMAN2) | EMAN2 is a broadly based greyscale scientific image processing suite with a primary focus on processing data from transmission electron microscopes. 
**cryo-em** | `relion` | -&nbsp;`2.0.3`<br/>-&nbsp;`2.1` | [Website](http://www2.mrc-lmb.cam.ac.uk/relion/index.php/Main_Page) | RELION (for REgularised LIkelihood OptimisatioN, pronounce rely-on) is a stand-alone computer program that employs an empirical Bayesian approach to refinement of (multiple) 3D reconstructions or 2D class averages in electron cryo-microscopy (cryo-EM). 
**genomics** | `angsd` | -&nbsp;`0.919` | [Website](http://www.popgen.dk/angsd/index.php/ANGSD) | ANGSD is a software for analyzing next generation sequencing data. 
**genomics** | `bcftools` | -&nbsp;`1.6` | [Website](https://github.com/samtools/bcftools) | BCFtools is a program for variant calling and manipulating files in the Variant Call Format (VCF) and its binary counterpart BCF. 
**genomics** | `bedtools` | -&nbsp;`2.27.1` | [Website](https://bedtools.readthedocs.io) | The bedtools utilities are a swiss-army knife of tools for a wide-range of genomics analysis tasks. 
**genomics** | `bowtie` | -&nbsp;`1.2.2` | [Website](http://bowtie-bio.sourceforge.net/) | Bowtie is an ultrafast, memory-efficient short read aligner. 
**genomics** | `bowtie2` | -&nbsp;`2.3.4.1` | [Website](http://bowtie-bio.sourceforge.net/bowtie2) | Bowtie 2 is an ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences. 
**genomics** | `bwa` | -&nbsp;`0.7.17` | [Website](http://bio-bwa.sourceforge.net/) | BWA (Burrows-Wheeler Aligner) is a software package for mapping low-divergent sequences against a large reference genome, such as the human genome. 
**genomics** | `cufflinks` | -&nbsp;`2.2.1` | [Website](https://cole-trapnell-lab.github.io/cufflinks/) | Cufflinks assembles transcripts, estimates their abundances, and tests for differential expression and regulation in RNA-Seq samples. 
**genomics** | `fastx_toolkit` | -&nbsp;`0.0.14` | [Website](http://hannonlab.cshl.edu/fastx_toolkit/) | The FASTX-Toolkit is a collection of command line tools for Short-Reads FASTA/FASTQ files preprocessing. 
**genomics** | `hisat2` | -&nbsp;`2.1.0` | [Website](http://ccb.jhu.edu/software/hisat2) | HISAT2 is a fast and sensitive alignment program for mapping next-generation sequencing reads (both DNA and RNA) to a population of human genomes (as well as to a single reference genome). 
**genomics** | `htslib` | -&nbsp;`1.6` | [Website](https://github.com/samtools/htslib) | C library for high-throughput sequencing data formats. 
**genomics** | `ncbi-blast+` | -&nbsp;`2.6.0` | [Website](https://blast.ncbi.nlm.nih.gov/Blast.cgi) | NCBI BLAST+ is a suite of command-line tools to run BLAST (Basic Local Alignment Search Tool), an algorithm for comparing primary biological sequence information. 
**genomics** | `plink` | -&nbsp;`1.07`<br/>-&nbsp;`1.90b5`<br/>-&nbsp;`2.0a1` | [Website](http://zzz.bwh.harvard.edu/plink/) | PLINK is a free, open-source whole genome association analysis toolset, designed to perform a range of basic, large-scale analyses in a computationally efficient manner. 
**genomics** | `py-bx-python` | -&nbsp;`0.8.1_py27` | [Website](https://github.com/bxlab/bx-python) | Tools for manipulating biological data, particularly multiple sequence alignments. 
**genomics** | `py-macs2` | -&nbsp;`2.1.1_py27` | [Website](https://github.com/taoliu/MACS) | MACS (Model-based Analysis of ChIP-Seq) implements a novel ChIP-Seq analysis method. 
**genomics** | `samtools` | -&nbsp;`1.6` | [Website](https://github.com/samtools/samtools) | Tools (written in C using htslib) for manipulating next-generation sequencing data. 
**genomics** | `star` | -&nbsp;`2.5.4b` | [Website](https://github.com/alexdobin/STAR) | STAR: ultrafast universal RNA-seq aligner. 
**genomics** | `tophat` | -&nbsp;`2.1.1` | [Website](http://ccb.jhu.edu/software/tophat/index.shtml) | TopHat is a fast splice junction mapper for RNA-Seq reads. 
**neurology** | `afni` | -&nbsp;`17.2.07`<br/>-&nbsp;`18.0.09` | [Website](https://afni.nimh.nih.gov) | AFNI (Analysis of Functional NeuroImages) is a set of C programs for processing, analyzing, and displaying functional MRI (FMRI) data - a technique for mapping human brain activity. 
**neurology** | `ants` | -&nbsp;`2.1.0` | [Website](https://stnava.github.io/ANTs) | ANTs computes high-dimensional mappings to capture the statistics of brain structure and function. 
**neurology** | `dcm2niix` | -&nbsp;`1.0.20171215` | [Website](https://github.com/rordenlab/dcm2niix) | dcm2niix is a program esigned to convert neuroimaging data from the DICOM format to the NIfTI format. 
**neurology** | `freesurfer` | -&nbsp;`6.0.0` | [Website](https://surfer.nmr.mgh.harvard.edu/) | An open source software suite for processing and analyzing (human) brain MRI images. 
**neurology** | `fsl` | -&nbsp;`5.0.10` | [Website](https://fsl.fmrib.ox.ac.uk/fsl) | FSL is a comprehensive library of analysis tools for FMRI, MRI and DTI brain imaging data. 
**neurology** | `mricron` | -&nbsp;`20160502` | [Website](https://www.nitrc.org/projects/mricron) | MRIcron is a cross-platform NIfTI format image viewer. 
**neurology** | `mrtrix` | -&nbsp;`0.3.16` | [Website](http://www.mrtrix.org) | MRtrix3 provides a set of tools to perform various types of diffusion MRI analyses, from various forms of tractography through to next-generation group-level analyses. 
**neurology** | `py-mdt` | -&nbsp;`0.10.9_py36` | [Website](https://github.com/cbclab/MDT) | The Maastricht Diffusion Toolbox, MDT, is a framework and library for parallelized (GPU and multi-core CPU) diffusion Magnetic Resonance Imaging (MRI) modeling. 
**neurology** | `spm` | -&nbsp;`12` | [Website](http://www.fil.ion.ucl.ac.uk/spm/) | The SPM software package has been designed for the analysis of brain imaging data sequences. The sequences can be a series of images from different cohorts, or time-series from the same subject. 
**phylogenetics** | `py-ete` | -&nbsp;`3.0.0_py27_qt5`<br/>-&nbsp;`3.0.0_py27` | [Website](http://etetoolkit.org/) | A Python framework for the analysis and visualization of trees. 

### Chemistry
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**computational chemistry** | `gaussian`^<b class="lic"></b>^ | -&nbsp;`g16` | [Website](https://www.gaussian.com) | Gaussian is a general purpose computational chemistry software package. 
**computational chemistry** | `libint` | -&nbsp;`1.1.4`<br/>-&nbsp;`2.0.3` | [Website](https://sourceforge.net/p/libint/home/) | Libint computes molecular integrals. 
**computational chemistry** | `libxc` | -&nbsp;`3.0.0` | [Website](http://octopus-code.org/wiki/Libxc) | Libxc is a library of exchange-correlation functionals for density-functional theory. 
**computational chemistry** | `py-ase` | -&nbsp;`3.14.1_py27` | [Website](https://wiki.fysik.dtu.dk/ase/) | The Atomic Simulation Environment (ASE) is a set of tools and Python modules for setting up, manipulating, running, visualizing and analyzing atomistic simulations. 
**computational chemistry** | `schrodinger`^<b class="lic"></b>^ | -&nbsp;`2017-3` | [Website](https://www.schrodinger.com) | Schrödinger Suites (Small-molecule Drug Discovery Suite, Material Science Suite, Biologics Suite) provide a set of molecular modelling software. 
**computational chemistry** | `vasp`^<b class="lic"></b>^ | -&nbsp;`5.4.1` | [Website](https://www.vasp.at) | The Vienna Ab initio Simulation Package (VASP) is a computer program for atomic scale materials modelling, e.g. electronic structure calculations and quantum-mechanical molecular dynamics, from first principles. 
**molecular dynamics** | `gromacs` | -&nbsp;`2016.3`<br/>-&nbsp;`2018` | [Website](http://www.gromacs.org) | GROMACS is a versatile package to perform molecular dynamics, i.e. simulate the Newtonian equations of motion for systems with hundreds to millions of particles. 
**molecular dynamics** | `openmm` | -&nbsp;`7.1.1` | [Website](http://openmm.org) | A high performance toolkit for molecular simulation. 
**molecular dynamics** | `plumed` | -&nbsp;`2.3.2` | [Website](http://www.plumed.org/) | PLUMED is an open source library for free energy calculations in molecular systems. 
**molecular dynamics** | `py-raspa2` | -&nbsp;`2.0.3_py27` | [Website](https://github.com/numat/RASPA2) | RASPA2 is a general purpose classical simulation package that can be used for the simulation of molecules in gases, fluids, zeolites, aluminosilicates, metal-organic frameworks, carbon nanotubes and external fields. 
**molecular dynamics** | `quip` | -&nbsp;`20170901` | [Website](https://github.com/libAtoms/QUIP) | The QUIP package is a collection of software tools to carry out molecular dynamics simulations. 
**quantum chemistry** | `cp2k` | -&nbsp;`4.1` | [Website](http://www.cp2k.org) | CP2K is a quantum chemistry and solid state physics software package that can perform atomistic simulations of solid state, liquid, molecular, periodic, material, crystal, and biological systems. 

### Devel
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**build** | `cmake` | -&nbsp;`3.8.1` | [Website](https://www.cmake.org) | CMake is an extensible, open-source system that manages the build process in an operating system and in a compiler-independent manner. 
**build** | `scons` | -&nbsp;`2.5.1_py36`<br/>-&nbsp;`2.5.1_py27` | [Website](http://www.scons.org) | SCons is an Open Source software construction tool. 
**compiler** | `gcc` | -&nbsp;`7.1.0`<br/>-&nbsp;`7.3.0`<br/>-&nbsp;`6.3.0` | [Website](http://gcc.gnu.org) | The GNU Compiler Collection includes front ends for C, C++, Fortran, Java, and Go, as well as libraries for these languages (libstdc++, libgcj,...). 
**compiler** | `icc` | -&nbsp;`2017.u2`<br/>-&nbsp;`2018.u1`<br/>-&nbsp;`2018` | [Website](https://software.intel.com/en-us/c-compilers) | Intel C++ Compiler, also known as icc or icl, is a group of C and C++ compilers from Intel 
**compiler** | `ifort` | -&nbsp;`2017.u2`<br/>-&nbsp;`2018.u1`<br/>-&nbsp;`2018` | [Website](https://software.intel.com/en-us/fortran-compilers) | Intel Fortran Compiler, also known as ifort, is a group of Fortran compilers from Intel 
**compiler** | `llvm` | -&nbsp;`3.8.1`<br/>-&nbsp;`4.0.0`<br/>-&nbsp;`5.0.0` | [Website](http://llvm.org) | The LLVM Project is a collection of modular and reusable compiler and toolchain technologies. Clang is an LLVM native C/C++/Objective-C compiler, 
**compiler** | `nagfor` | -&nbsp;`npl6a61na` | [Website](https://www.nag.com/nag-compiler) | The NAG Fortran Compiler is a full standard implementation of the ISO Fortran 95 language with the addition of all of Fortran 2003, most of Fortran 2008 and OpenMP 3.0 and 3.1. 
**compiler** | `pgi` | -&nbsp;`17.4` | [Website](http://pgroup.com) | PGI compilers and tools, including Open MPI (Community Edition). 
**compiler** | `smlnj` | -&nbsp;`110.81` | [Website](http://smlnj.org/) | Standard ML of New Jersey (abbreviated SML/NJ) is a compiler for the Standard ML '97 programming language. 
**data** | `h5utils` | -&nbsp;`1.12.1` | [Website](http://ab-initio.mit.edu/wiki/index.php/H5utils) | h5utils is a set of utilities for visualization and conversion of scientific data in the free, portable HDF5 format. 
**data** | `hdf5` | -&nbsp;`1.10.0p1` | [Website](https://www.hdfgroup.org/hdf5) | HDF5 is a data model, library, and file format for storing and managing data. It supports an unlimited variety of datatypes, and is designed for flexible and efficient I/O and for high volume and complex data. 
**data** | `hiredis` | -&nbsp;`0.13.3` | [Website](https://github.com/redis/hiredis) | Hiredis is a minimalistic C client library for the Redis database. 
**data** | `ncl` | -&nbsp;`6.4.0` | [Website](http://www.ncl.ucar.edu/) | NCL is a free interpreted language designed specifically for scientific data processing and visualization. 
**data** | `netcdf` | -&nbsp;`4.4.1.1` | [Website](https://www.unidata.ucar.edu/software/netcdf) | NetCDF is a set of software libraries and self-describing, machine-independent data formats that support the creation, access, and sharing of array-oriented scientific data. 
**data** | `pnetcdf` | -&nbsp;`1.8.1` | [Website](http://cucis.ece.northwestern.edu/projects/PnetCDF/) | Parallel netCDF (PnetCDF) is a parallel I/O library for accessing NetCDF files in CDF-1, 2, and 5 formats. 
**data** | `protobuf` | -&nbsp;`3.4.0` | [Website](https://developers.google.com/protocol-buffers/) | Protocol Buffers (a.k.a., protobuf) are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data. 
**data** | `redis` | -&nbsp;`4.0.1` | [Website](https://redis.io) | Redis is an open source, in-memory data structure store, used as a database, cache and message broker. 
**language** | `cuda` | -&nbsp;`8.0.61`<br/>-&nbsp;`9.0.176`<br/>-&nbsp;`9.1.85` | [Website](https://developer.nvidia.com/cuda-toolkit) | CUDA is a parallel computing platform and application programming interface (API) model created by Nvidia. It allows software developers and software engineers to use a CUDA-enabled graphics processing unit (GPU) for general purpose processing. 
**language** | `go` | -&nbsp;`1.9` | [Website](http://golang.org) | Go is an open source programming language that makes it easy to build simple, reliable, and efficient software. 
**language** | `guile` | -&nbsp;`2.2.2` | [Website](https://www.gnu.org/software/guile/) | GNU Guile is the preferred extension system for the GNU Project, which features an implementation of the Scheme programming language. 
**language** | `java` | -&nbsp;`1.8.0_131` | [Website](http://www.oracle.com/technetwork/java/index.html) | Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented,[14] and specifically designed to have as few implementation dependencies as possible. 
**language** | `julia` | -&nbsp;`0.5.1`<br/>-&nbsp;`0.6` | [Website](https://julialang.org) | Julia is a high-level, high-performance dynamic programming language for numerical computing. 
**language** | `lua` | -&nbsp;`5.3.4` | [Website](https://www.lua.org) | Lua is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description. 
**language** | `luarocks` | -&nbsp;`2.4.3` | [Website](https://luarocks.org/) | LuaRocks is the package manager for Lua modules. 
**language** | `manticore` | -&nbsp;`20180301` | [Website](http://manticore.cs.uchicago.edu/) | Manticore is a high-level parallel programming language aimed at general-purpose applications running on multi-core processors. 
**language** | `nodejs` | -&nbsp;`8.9.4`<br/>-&nbsp;`9.5.0` | [Website](https://nodejs.org/) | Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It provides the npm package manager. 
**language** | `perl` | -&nbsp;`5.26.0` | [Website](https://www.perl.org) | Perl 5 is a highly capable, feature-rich programming language with over 29 years of development. <br/>[Usage on Sherlock](https://www.sherlock.stanford.edu/docs/software/using/perl)
**language** | `py-cython` | -&nbsp;`0.27.3_py36`<br/>-&nbsp;`0.27.3_py27` | [Website](http://cython.org/) | Cython is an optimising static compiler for both the Python programming language and the extended Cython programming language (based on Pyrex). 
**language** | `py-ipython` | -&nbsp;`6.1.0_py36`<br/>-&nbsp;`5.4.1_py27` | [Website](https://ipython.org) | IPython is a command shell for interactive computing in multiple programming languages, originally developed for the Python programming language. 
**language** | `py-jupyter` | -&nbsp;`1.0.0_py36`<br/>-&nbsp;`1.0.0_py27` | [Website](https://jupyter.org) | Jupyter is a browser-based interactive notebook for programming, mathematics, and data science. It supports a number of languages via plugins. 
**language** | `python` | -&nbsp;`3.6.1`<br/>-&nbsp;`2.7.13` | [Website](https://www.python.org) | Python is an interpreted, interactive, object-oriented programming language. 
**language** | `ruby` | -&nbsp;`2.4.1` | [Website](https://www.ruby-lang.org) | A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. 
**libs** | `ant` | -&nbsp;`1.10.1` | [Website](https://ant.apache.org/) | Apache Ant is a Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other. 
**libs** | `boost` | -&nbsp;`1.64.0` | [Website](http://www.boost.org) | Boost is a set of libraries for the C++ programming language that provide support for tasks and structures such as linear algebra, pseudorandom number generation, multithreading, image processing, regular expressions, and unit testing. 
**libs** | `cnmem` | -&nbsp;`1.0.0` | [Website](https://github.com/NVIDIA/ncmem) | CNMeM is a simple library to help the Deep Learning frameworks manage CUDA memory. 
**libs** | `cub` | -&nbsp;`1.7.3` | [Website](https://nvlabs.github.io/cub/) | CUB is a flexible library of cooperative threadblock primitives and other utilities for CUDA kernel programming. 
**libs** | `cutlass` | -&nbsp;`0.1.0` | [Website](https://github.com/NVIDIA/cutlass) | CUTLASS is a collection of CUDA C++ template abstractions for implementing high-performance matrix-multiplication (GEMM) at all levels and scales within CUDA. 
**libs** | `eigen` | -&nbsp;`3.3.3` | [Website](http://eigen.tuxfamily.org) | Eigen is a C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms. 
**libs** | `libctl` | -&nbsp;`3.2.2` | [Website](https://github.com/stevengj/libctl) | libctl is a library for supporting flexible control files in scientific simulations. 
**libs** | `libgpuarray` | -&nbsp;`0.7.5` | [Website](http://deeplearning.net/software/libgpuarray) | Library to manipulate tensors on the GPU. 
**libs** | `nccl` | -&nbsp;`1.3.4`<br/>-&nbsp;`2.0.4`<br/>-&nbsp;`2.1.15` | [Website](https://github.com/NVIDIA/nccl) | NCCL (pronounced 'Nickel') is a stand-alone library of standard collective communication routines, such as all-gather, reduce, broadcast, etc., that have been optimized to achieve high bandwidth over PCIe. 
**libs** | `opencv` | -&nbsp;`3.3.0` | [Website](https://opencv.org) | OpenCV (Open Source Computer Vision Library) is an open source computer vision and machine learning software library. 
**libs** | `py-h5py` | -&nbsp;`2.7.1_py27` | [Website](http://www.h5py.org) | The h5py package is a Pythonic interface to the HDF5 binary data format. 
**libs** | `py-netcdf4` | -&nbsp;`1.3.1_py36`<br/>-&nbsp;`1.3.1_py27` | [Website](https://unidata.github.io/netcdf4-python/) | netcdf4-python is a Python interface to the netCDF C library. 
**libs** | `py-numba` | -&nbsp;`0.35.0_py36`<br/>-&nbsp;`0.35.0_py27` | [Website](http://numba.pydata.org) | Numba is a compiler for Python array and numerical functions that gives you the power to speed up your applications with high performance functions written directly in Python.. 
**libs** | `py-pycuda` | -&nbsp;`2017.1.1_py27` | [Website](https://mathema.tician.de/software/pycuda/) | PyCUDA lets you access Nvidia‘s CUDA parallel computation API from Python. 
**libs** | `py-scikit-image` | -&nbsp;`0.13.0_py27` | [Website](http://scikit-image.org/) | scikit-image is a collection of algorithms for image processing. 
**libs** | `swig` | -&nbsp;`3.0.12` | [Website](http://www.swig.org) | SWIG is an interface compiler that connects programs written in C and C++ with scripting languages such as Perl, Python, Ruby, and Tcl. 
**libs** | `tbb` | -&nbsp;`2017.u2`<br/>-&nbsp;`2018.u1`<br/>-&nbsp;`2018` | [Website](https://software.intel.com/en-us/intel-tbb) | Intel® Threading Building Blocks (Intel® TBB) is a widely used C++ library for shared-memory parallel programming and heterogeneous computing (intra-node distributed memory programming). 
**libs** | `zeromq` | -&nbsp;`4.2.2` | [Website](http://zeromq.org) | ZeroMQ (also spelled ØMQ, 0MQ or ZMQ) is a high-performance asynchronous messaging library, aimed at use in distributed or concurrent applications. 
**mpi** | `impi` | -&nbsp;`2017.u2`<br/>-&nbsp;`2018.u1`<br/>-&nbsp;`2018` | [Website](https://software.intel.com/en-us/intel-mpi-library) | Intel® MPI Library is a multi-fabric message passing library that implements the Message Passing Interface, version 3.1 (MPI-3.1) specification. 
**mpi** | `openmpi` | -&nbsp;`2.0.2`<br/>-&nbsp;`3.0.0`<br/>-&nbsp;`2.1.1` | [Website](https://www.openmpi.org) | The Open MPI Project is an open source Message Passing Interface implementation that is developed and maintained by a consortium of academic, research, and industry partners. 
**networking** | `gasnet` | -&nbsp;`1.30.0` | [Website](https://gasnet.lbl.gov) | GASNet is a language-independent, low-level networking layer that provides network-independent, high-performance communication primitives tailored for implementing parallel global address space SPMD languages and libraries. 
**networking** | `ucx` | -&nbsp;`1.2.1` | [Website](http://www.openucx.org) | UCX is a communication library implementing high-performance messaging for MPI/PGAS frameworks. 
**parser** | `xerces-c` | -&nbsp;`3.2.1` | [Website](https://xerces.apache.org/xerces-c/index.html) | Xerces-C++ is a validating XML parser written in a portable subset of C++. 

### Math
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**computational geometry** | `cgal` | -&nbsp;`4.10` | [Website](http://www.cgal.org) | The Computational Geometry Algorithms Library (CGAL) is a C++ library that aims to provide easy access to efficient and reliable algorithms in computational geometry. 
**computational geometry** | `qhull` | -&nbsp;`2015.2` | [Website](http://www.qhull.org/) | Qhull computes the convex hull, Delaunay triangulation, Voronoi diagram, halfspace intersection about a point, furthest-site Delaunay triangulation, and furthest-site Voronoi diagram. 
**deep learning** | `caffe2` | -&nbsp;`0.8.1` | [Website](https://caffe2.ai) | Caffe2 is a deep learning framework that provides an easy and straightforward way to experiment with deep learning and leverage community contributions of new models and algorithms. 
**deep learning** | `cudnn` | -&nbsp;`5.1`<br/>-&nbsp;`6.0`<br/>-&nbsp;`7.0.1`<br/>-&nbsp;`7.0.4`<br/>-&nbsp;`7.0.5`<br/>-&nbsp;`7.1.1` | [Website](https://developer.nvidia.com/cudnn) | NVIDIA cuDNN is a GPU-accelerated library of primitives for deep neural networks. 
**deep learning** | `py-horovod` | -&nbsp;`0.12.1_py36`<br/>-&nbsp;`0.12.1_py27` | [Website](https://github.com/uber/horovod) | Horovod is a distributed training framework for TensorFlow. The goal of Horovod is to make distributed Deep Learning fast and easy to use. 
**deep learning** | `py-keras` | -&nbsp;`2.0.8_py27`<br/>-&nbsp;`2.1.5_py36`<br/>-&nbsp;`2.1.5_py27` | [Website](http://keras.io) | Keras is a high-level neural networks API, written in Python and capable of running on top of TensorFlow, CNTK, or Theano. 
**deep learning** | `py-onnx` | -&nbsp;`1.0.1_py27` | [Website](https://onnx.ai) | ONNX is a open format to represent deep learning models. 
**deep learning** | `py-pytorch` | -&nbsp;`0.2.0_py27`<br/>-&nbsp;`0.2.0_py36`<br/>-&nbsp;`0.3.0_py36`<br/>-&nbsp;`0.3.0_py27` | [Website](http://pytorch.org) | PyTorch is a deep learning framework that puts Python first. 
**deep learning** | `py-tensorflow` | -&nbsp;`1.2.1`<br/>-&nbsp;`1.3.0_py27`<br/>-&nbsp;`1.3.0_py36`<br/>-&nbsp;`1.4.0_py27`<br/>-&nbsp;`1.5.0_py27`<br/>-&nbsp;`1.5.0_py36`<br/>-&nbsp;`1.6.0_py36`<br/>-&nbsp;`1.7.0_py27`<br/>-&nbsp;`1.6.0_py27` | [Website](https://www.tensorflow.org) | TensorFlow™ is an open source software library for numerical computation using data flow graphs. 
**deep learning** | `py-tensorlayer` | -&nbsp;`1.6.3_py27` | [Website](http://tensorlayer.org) | TensorLayer is a Deep Learning (DL) and Reinforcement Learning (RL) library extended from Google TensorFlow. 
**deep learning** | `py-theano` | -&nbsp;`1.0.1_py27` | [Website](http://deeplearning.net/software/theano) | Theano is a Python library that allows you to define, optimize, and evaluate mathematical expressions involving multi-dimensional arrays efficiently. 
**deep learning** | `tensorrt` | -&nbsp;`3.0.1`<br/>-&nbsp;`3.0.4` | [Website](https://developer.nvidia.com/tensorrt) | NVIDIA TensorRT™ is a high-performance deep learning inference optimizer and runtime that delivers low latency, high-throughput inference for deep learning applications. 
**deep learning** | `torch` | -&nbsp;`20180202` | [Website](http//torch.ch) | Torch is a scientific computing framework with wide support for machine learning algorithms that puts GPUs first. 
**linear algebra** | `armadillo` | -&nbsp;`8.200.1` | [Website](http://arma.sourceforge.net/) | Armadillo is a high quality linear algebra library (matrix maths) for the C++ language, aiming towards a good balance between speed and ease of use. 
**machine learning** | `py-scikit-learn` | -&nbsp;`0.19.1_py27` | [Website](http://scikit-learn.org) | Scikit-learn is a free software machine learning library for the Python programming language. 
**numerical analysis** | `matlab`^<b class="lic"></b>^ | -&nbsp;`R2017a`<br/>-&nbsp;`R2017b` | [Website](https://www.mathworks.com/products/matlab.html) | MATLAB (matrix laboratory) is a multi-paradigm numerical computing environment and fourth-generation programming language. 
**numerical analysis** | `octave` | -&nbsp;`4.2.1` | [Website](https://www.gnu.org/software/octave/) | GNU Octave is a high-level language primarily intended for numerical computations. 
**numerical library** | `arpack` | -&nbsp;`3.5.0` | [Website](https://github.com/opencollab/arpack-ng) | Collection of Fortran77 subroutines designed to solve large scale eigenvalue problems. 
**numerical library** | `fftw` | -&nbsp;`3.3.6` | [Website](http://www.fftw.org/) | The Fastest Fourier Transform in the West (FFTW) is a software library for computing discrete Fourier transforms (DFTs). 
**numerical library** | `glpk` | -&nbsp;`4.63` | [Website](http://www.openblas.net/) | The GLPK (GNU Linear Programming Kit) package is intended for solving large-scale linear programming (LP), mixed integer programming (MIP), and other related problems. 
**numerical library** | `gmp` | -&nbsp;`6.1.2` | [Website](https://gmplib.org) | GMP is a free library for arbitrary precision arithmetic, operating on signed integers, rational numbers, and floating-point numbers. 
**numerical library** | `gsl` | -&nbsp;`1.16`<br/>-&nbsp;`2.3` | [Website](https://www.gnu.org/software/gsl) | The GNU Scientific Library (GSL) is a numerical library for C and C++ programmers. The library provides a wide range of mathematical routines such as random number generators, special functions and least-squares fitting. 
**numerical library** | `harminv` | -&nbsp;`1.4.1` | [Website](https://github.com/stevengj/harminv) | harminv is a program designed to solve the problem of harmonic inversion: given a time series consisting of a sum of sinusoids (modes), extract their frequencies and amplitudes. 
**numerical library** | `imkl` | -&nbsp;`2017.u2`<br/>-&nbsp;`2018.u1`<br/>-&nbsp;`2018` | [Website](https://software.intel.com/en-us/intel-mkl) | Intel Math Kernel Library (Intel MKL) is a library of optimized math routines for science, engineering, and financial applications. Core math functions include BLAS, LAPACK, ScaLAPACK, sparse solvers, fast Fourier transforms, and vector math.[3] The routines in MKL are hand-optimized specifically for Intel processors 
**numerical library** | `libxsmm` | -&nbsp;`1.8.1` | [Website](https://github.com/hfp/libxsmm) | LIBXSMM is a library for small dense and small sparse matrix-matrix multiplications as well as for deep learning primitives such as small convolutions 
**numerical library** | `metis` | -&nbsp;`5.1.0` | [Website](http://glaros.dtc.umn.edu/gkhome/metis/metis/overview) | METIS is a set of serial programs for partitioning graphs, partitioning finite element meshes, and producing fill reducing orderings for sparse matrices. 
**numerical library** | `mpfr` | -&nbsp;`3.1.5` | [Website](https://www.mpfr.org) | The MPFR library is a C library for multiple-precision floating-point computations with correct rounding. 
**numerical library** | `mumps` | -&nbsp;`5.1.2` | [Website](http://mumps.enseeiht.fr/) | A parallel sparse direct solver. 
**numerical library** | `nagcl` | -&nbsp;`cll6i26dcl` | [Website](https://www.nag.com/nag-c-library) | The NAG C Library is the largest and most comprehensive collection of mathematical and statistical algorithms for C and C++. 
**numerical library** | `nagfl` | -&nbsp;`fll6i26dcl` | [Website](https://www.nag.com/nag-fortran-library) | The NAG Fortran Library is the largest and most comprehensive collection of numerical and statistical algorithms in Fortran. 
**numerical library** | `nagfs` | -&nbsp;`fsl6i26dcl` | [Website](https://www.nag.com/nag-library-smp-multicore) | The NAG Library for SMP & Multicore is based on, and includes, the full functionality of the NAG Fortran Library. 
**numerical library** | `nagmb` | -&nbsp;`MBL6I25DNL` | [Website](https://www.nag.com/nag-toolbox-matlab) | The NAG C Library is the largest and most comprehensive collection of mathematical and statistical algorithms for C and C++. 
**numerical library** | `openblas` | -&nbsp;`0.2.19` | [Website](http://www.openblas.net/) | OpenBLAS is an optimized BLAS library 
**numerical library** | `parmetis` | -&nbsp;`4.0.3` | [Website](http://glaros.dtc.umn.edu/gkhome/metis/parmetis/overview) | ParMETIS is an MPI-based parallel library that implements a variety of algorithms for partitioning unstructured graphs, meshes, and for computing fill-reducing orderings of sparse matrices. 
**numerical library** | `py-pyublas` | -&nbsp;`2017.1_py27` | [Website](https://mathema.tician.de/software/pyublas/) | PyUblas provides a seamless glue layer between Numpy and Boost.Ublas for use with Boost.Python. 
**numerical library** | `qrupdate` | -&nbsp;`1.1.2` | [Website](https://sourceforge.net/projects/qrupdate/) | qrupdate is a Fortran library for fast updates of QR and Cholesky decompositions. 
**numerical library** | `scalapack` | -&nbsp;`2.0.2` | [Website](http://www.netlib.org/scalapack/) | ScaLAPACK is a library of high-performance linear algebra routines for parallel distributed memory machines. 
**numerical library** | `scotch` | -&nbsp;`6.0.4` | [Website](http://www.labri.fr/perso/pelegrin/scotch) | Software package and libraries for sequential and parallel graph partitioning, static mapping and clustering, sequential mesh and hypergraph partitioning, and sequential and parallel sparse matrix block ordering. 
**numerical library** | `superlu` | -&nbsp;`5.2.1` | [Website](https://github.com/xiaoyeli/superlu) | SuperLU is a general purpose library for the direct solution of large, sparse, nonsymmetric systems of linear equations. 
**numerical library** | `xblas` | -&nbsp;`1.0.248` | [Website](http://www.netlib.org/xblas) | Extra precise basic linear algebra subroutines. 
**optimization** | `gurobi` | -&nbsp;`7.5.1` | [Website](http://www.gurobi.com) | The Gurobi Optimizer is a commercial optimization solver for mathematical programming. 
**optimization** | `knitro` | -&nbsp;`10.3.0` | [Website](https://www.artelys.com/en/optimization-tools/knitro) | Artelys Knitro is an optimization solver for difficult large-scale nonlinear problems. 
**scientific computing** | `py-scipystack` | -&nbsp;`1.0_py36`<br/>-&nbsp;`1.0_py27` | [Website](https://www.scipy.org) | The SciPy Stack is a collection of open source software for scientific computing in Python. It provides the following packages: numpy, scipy, matplotlib, ipython, jupyter, pandas, sympy and nose. 
**statistics** | `R` | -&nbsp;`3.4.0` | [Website](http://r-project.org) | R is a free software environment for statistical computing and graphics. 
**statistics** | `jags` | -&nbsp;`4.3.0` | [Website](http://mcmc-jags.sourceforge.net/) | Just another Gibbs sampler (JAGS) is a program for simulation from Bayesian hierarchical models using Markov chain Monte Carlo (MCMC). 
**statistics** | `r-rstan` | -&nbsp;`2.17.3` | [Website](http://mc-stan.org/users/interfaces/rstan) | RStan is the R interface to Stan, an open-source software for facilitating statistical inference at the frontiers of applied statistics. 
**statistics** | `rstudio` | -&nbsp;`1.1.423` | [Website](http://www.rstudio.com) | RStudio is an integrated development environment (IDE) for R. It includes a console, syntax-highlighting editor that supports direct code execution, as well as tools for plotting, history, debugging and workspace management. 
**statistics** | `sas`^<b class="lic"></b>^ | -&nbsp;`9.4` | [Website](http://www.sas.com/) | SAS is a software suite developed by SAS Institute for advanced analytics, multivariate analyses, business intelligence, data management, and predictive analytics. 
**statistics** | `stata`^<b class="lic"></b>^ | -&nbsp;`14`<br/>-&nbsp;`15` | [Website](https://www.stata.com) | Stata is a complete, integrated statistical software package that provides everything you need for data analysis, data management, and graphics. 
**symbolic** | `libmatheval` | -&nbsp;`1.1.11` | [Website](https://www.gnu.org/software/libmatheval/) | GNU libmatheval is a library (callable from C and Fortran) to parse and evaluate symbolic expressions input as text. 

### Physics
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**astronomy** | `heasoft` | -&nbsp;`6.22.1` | [Website](https://heasarc.gsfc.nasa.gov/docs/software/lheasoft/) | HEAsoft is a Unified Release of the FTOOLS (General and mission-specific tools to manipulate FITS files) and XANADU (High-level, multi-mission tasks for X-ray astronomical spectral, timing, and imaging data analysis) software packages. 
**geophysics** | `opensees` | -&nbsp;`2.5.0` | [Website](http://opensees.berkeley.edu/) | OpenSees is a software framework for developing applications to simulate the performance of structural and geotechnical systems subjected to earthquakes. 
**gis** | `gdal` | -&nbsp;`2.2.1` | [Website](http://www.gdal.org) | GDAL is a translator library for raster and vector geospatial data formats. 
**gis** | `geos` | -&nbsp;`3.6.2` | [Website](https://trac.osgeo.org/geos) | GEOS (Geometry Engine - Open Source) is a C++ port of Java Topology Suite (JTS). 
**gis** | `proj` | -&nbsp;`4.9.3` | [Website](http://proj4.org) | proj.4 is a standard UNIX filter function which converts geographic longitude and latitude coordinates into cartesian coordinates (and vice versa. 
**photonics** | `meep` | -&nbsp;`1.3` | [Website](https://github.com/stevengj/meep) | Meep is a free finite-difference time-domain (FDTD) simulation software package to model electromagnetic systems. 
**photonics** | `mpb` | -&nbsp;`1.5` | [Website](https://github.com/stevengj/mpb) | MPB is a free software package for computing the band structures, or dispersion relations, and electromagnetic modes of periodic dielectric structures, on both serial and parallel computers. 

### System
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**becnhmark** | `hp2p` | -&nbsp;`3.2` | [Website](https://github.com/cea-hpc/hp2p) | Heavy Peer To Peer: a MPI based benchmark for network diagnostic. 
**compression** | `lz4` | -&nbsp;`1.8.0` | [Website](https://www.lz4.org) | LZ4 is lossless compression algorithm. 
**compression** | `lzo` | -&nbsp;`2.10` | [Website](http://www.oberhumer.com/opensource/lzo) | LZO is a portable lossless data compression library written in ANSI C. 
**compression** | `szip` | -&nbsp;`2.1.1` | [Website](https://support.hdfgroup.org/doc_resource/SZIP) | Szip compression software, providing lossless compression of scientific data, is an implementation of the extended-Rice lossless compression algorithm. 
**compression** | `xz` | -&nbsp;`5.2.3` | [Website](http://tukaani.org/xz/) | XZ Utils is free general-purpose data compression software with a high compression ratio. 
**compression** | `zlib` | -&nbsp;`1.2.11` | [Website](http://zlib.net) | zlib is designed to be a free, general-purpose, legally unencumbered -- that is, not covered by any patents -- lossless data-compression library for use on virtually any computer hardware and operating system. 
**containers** | `singularity` | -&nbsp;`2.4.5` | [Website](http://singularity.lbl.gov) | Singularity is a container framework that enables users to package entire scientific workflows, software and libraries. 
**database** | `bdb` | -&nbsp;`6.2.32` | [Website](http://www.oracle.com/us/products/database/berkeley-db) | Berkeley DB (BDB) is a software library intended to provide a high-performance embedded database for key/value data. 
**database** | `mariadb` | -&nbsp;`10.2.11` | [Website](https://www.mariadb.org) | MariaDB is a community-developed fork of the MySQL relational database management system intended to remain free under the GNU GPL. 
**database** | `sqlite` | -&nbsp;`3.18.0` | [Website](https://www.sqlite.org) | SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. 
**file management** | `fpart` | -&nbsp;`0.9.3` | [Website](https://github.com/martymac/fpart) | fpart sorts files and packs them into partitions. 
**file transfer** | `gdrive` | -&nbsp;`2.1.0` | [Website](https://github.com/prasmussen/gdrive) | gdrive is a command line utility for interacting with Google Drive. 
**file transfer** | `lftp` | -&nbsp;`4.8.1` | [Website](https://lftp.yar.ru/) | LFTP is a sophisticated file transfer program supporting a number of network protocols (ftp, http, sftp, fish, torrent). 
**file transfer** | `mpifileutils` | -&nbsp;`20170210` | [Website](https://github.com/hpc/mpifileutils) | mpiFileUtils is a suite of MPI-based tools to manage large datasets, which may vary from large directory trees to large files. 
**file transfer** | `py-globus-cli` | -&nbsp;`1.2.0` | [Website](https://github.com/globus/globus-cli) | A command line wrapper over the Globus SDK for Python. 
**file transfer** | `rclone` | -&nbsp;`1.39` | [Website](https://rclone.org) | Rclone is a command line program to sync files and directories to and from: Google Drive, Amazon S3, Dropbox, Google Cloud Storage, Amazon Drive, Microsoft One Drive, Hubic, Backblaze B2, Yandex Disk, or the local filesystem. 
**language** | `tcltk` | -&nbsp;`8.6.6` | [Website](https://www.tcl.tk) | Tcl (Tool Command Language) is a dynamic programming language, suitable for web and desktop applications, networking, administration, testing. Tk is a graphical user interface toolkit. 
**libs** | `apr` | -&nbsp;`1.6.3` | [Website](https://apr.apache.org/) | The Apache Portable Runtime is a supporting library for the Apache web server. It provides a set of APIs that map to the underlying operating system. 
**libs** | `apr-util` | -&nbsp;`1.6.1` | [Website](https://apr.apache.org/) | The Apache Portable Runtime is a supporting library for the Apache web server. It provides a set of APIs that map to the underlying operating system. 
**libs** | `atk` | -&nbsp;`2.24.0` | [Website](https://developer.gnome.org/atk) | ATK is the Accessibility Toolkit. It provides a set of generic interfaces allowing accessibility technologies such as screen readers to interact with a graphical user interface. 
**libs** | `benchmark` | -&nbsp;`1.2.0` | [Website](https://github.com/google/benchmark) | A microbenchmark support library 
**libs** | `cairo` | -&nbsp;`1.14.10` | [Website](https://www.cairographics.org/) | Cairo is a 2D graphics library with support for multiple output devices. 
**libs** | `cups` | -&nbsp;`2.2.4` | [Website](https://www.cups.org/) | CUPS is the standards-based, open source printing system. 
**libs** | `dbus` | -&nbsp;`1.10.22` | [Website](https://www.freedesktop.org/wiki/Software/dbus/) | D-Bus is a message bus system, a simple way for applications to talk to one another. 
**libs** | `enchant` | -&nbsp;`1.6.1`<br/>-&nbsp;`2.2.3` | [Website](https://abiword.github.io/enchant/) | Enchant is a library (and command-line program) that wraps a number of different spelling libraries and programs with a consistent interface. 
**libs** | `fltk` | -&nbsp;`1.3.4` | [Website](http://www.fltk.org) | FLTK (pronounced 'fulltick') is a cross-platform C++ GUI toolkit. 
**libs** | `fontconfig` | -&nbsp;`2.12.4` | [Website](https://www.freedesktop.org/wiki/Software/fontconfig) | Fontconfig is a library for configuring and customizing font access. 
**libs** | `freeglut` | -&nbsp;`3.0.0` | [Website](http://freeglut.sourceforge.net/) | FreeGLUT is a free-software/open-source alternative to the OpenGL Utility Toolkit (GLUT) library. 
**libs** | `freetype` | -&nbsp;`2.8` | [Website](http://freetype.org) | FreeType is a software font engine that is designed to be small, efficient, highly customizable, and portable while capable of producing high-quality output (glyph images). 
**libs** | `gc` | -&nbsp;`7.6.0` | [Website](http://www.hboehm.info/gc) | The Boehm-Demers-Weiser conservative garbage collector can be used as a garbage collecting replacement for C malloc or C++ new. 
**libs** | `gconf` | -&nbsp;`2.9.91` | [Website](https://projects.gnome.org/gconf) | GConf is a system for storing application preferences. 
**libs** | `gdk-pixbuf` | -&nbsp;`2.36.8` | [Website](https://git.gnome.org/browse/gdk-pixbuf) | The GdkPixbuf library provides facilities for loading images in a variety of file formats. 
**libs** | `gflags` | -&nbsp;`2.2.1` | [Website](https://gflags.github.io/gflags/) | The gflags package contains a C++ library that implements commandline flags processing. 
**libs** | `giflib` | -&nbsp;`5.1.4` | [Website](http://giflib.sourceforge.net/) | GIFLIB is a package of portable tools and library routines for working with GIF images. 
**libs** | `glib` | -&nbsp;`2.52.3` | [Website](https://wiki.gnome.org/Projects/GLib) | The GLib library provides core non-graphical functionality such as high level data types, Unicode manipulation, and an object and type system to C programs. 
**libs** | `glog` | -&nbsp;`0.3.5` | [Website](https://github.com/google/glog) | C++ implementation of the Google logging module. 
**libs** | `gnutls` | -&nbsp;`3.5.9` | [Website](https://www.gnutls.org) | GnuTLS is a secure communications library implementing the SSL, TLS and DTLS protocols and technologies around them. 
**libs** | `gobject-introspection` | -&nbsp;`1.52.1` | [Website](https://wiki.gnome.org/Projects/GObjectIntrospection) | GObject introspection is a middleware layer between C libraries (using GObject) and language bindings. 
**libs** | `googletest` | -&nbsp;`1.8.0` | [Website](https://github.com/google/googletest) | Google Test is Google's C++ test framework. 
**libs** | `gtk+` | -&nbsp;`2.24.30`<br/>-&nbsp;`3.22.18` | [Website](https://www.gtk.org) | GTK+, or the GIMP Toolkit, is a multi-platform toolkit for creating graphical user interfaces. 
**libs** | `harfbuzz` | -&nbsp;`1.4.8` | [Website](https://www.freedesktop.org/wiki/Software/HarfBuzz) | HarfBuzz is an OpenType text shaping engine. 
**libs** | `hunspell` | -&nbsp;`1.6.2` | [Website](https://hunspell.github.io/) | Hunspell is a spell checker. 
**libs** | `hyphen` | -&nbsp;`2.8.8` | [Website](https://github.com/hunspell/hyphen) | Hyphen is a hyphenation library to use converted TeX hyphenation patterns. 
**libs** | `icu` | -&nbsp;`59.1` | [Website](http://site.icu-project.org) | ICU is a set of C/C++ and Java libraries providing Unicode and Globalization support for software applications. 
**libs** | `libepoxy` | -&nbsp;`1.4.1` | [Website](https://github.com/anholt/libepoxy) | Epoxy is a library for handling OpenGL function pointer management for you. 
**libs** | `libffi` | -&nbsp;`3.2.1` | [Website](http://sourceware.org/libffi) | libffi is a portable Foreign Function Interface library. 
**libs** | `libgcrypt` | -&nbsp;`1.8.2` | [Website](https://www.gnupg.org/software/libgcrypt) | Libgcrypt is a general purpose cryptographic library originally based on code from GnuPG. 
**libs** | `libgd` | -&nbsp;`2.2.5` | [Website](https://libgd.github.io/) | GD is an open source code library for the dynamic creation of images by programmers. 
**libs** | `libgpg-error` | -&nbsp;`1.27` | [Website](https://www.gnupg.org/software/libgpg-error) | Libgpg-error is a small library that originally defined common error values for all GnuPG components. 
**libs** | `libidl` | -&nbsp;`0.8.14` | [Website](https://github.com/GNOME/libIDL) | The libIDL package contains libraries for Interface Definition Language files. This is a specification for defining portable interfaces. 
**libs** | `libjpeg-turbo` | -&nbsp;`1.5.1` | [Website](http://www.libjpeg-turbo.org) | libjpeg-turbo is a JPEG image codec that uses SIMD instructions (MMX, SSE2, AVX2, NEON, AltiVec) to accelerate baseline JPEG compression and decompression on x86, x86-64, ARM, and PowerPC systems 
**libs** | `libmng` | -&nbsp;`2.0.3` | [Website](http://libmng.sourceforge.net) | THE reference library for reading, displaying, writing and examining Multiple-Image Network Graphics. MNG is the animation extension to the popular PNG image-format. 
**libs** | `libpng` | -&nbsp;`1.2.57`<br/>-&nbsp;`1.6.29` | [Website](http://libpng.sourceforge.net) | libpng is the official PNG reference library. It supports almost all PNG features, is extensible, and has been extensively tested for over 20 years. 
**libs** | `libproxy` | -&nbsp;`0.4.15` | [Website](https://libproxy.github.io/libproxy/) | libproxy is a library that provides automatic proxy configuration management. 
**libs** | `libressl` | -&nbsp;`2.5.3` | [Website](https://www.libressl.org) | LibreSSL is a version of the TLS/crypto stack forked from OpenSSL in 2014, with goals of modernizing the codebase, improving security, and applying best practice development processes. 
**libs** | `libsoup` | -&nbsp;`2.61.2` | [Website](https://wiki.gnome.org/LibSoup) | libsoup is an HTTP client/server library for GNOME. 
**libs** | `libtasn1` | -&nbsp;`4.13` | [Website](https://www.gnu.org/software/libtasn1/) | Libtasn1 is the ASN.1 library used by GnuTLS, p11-kit and some other packages. 
**libs** | `libtiff` | -&nbsp;`4.0.8` | [Website](http://simplesystems.org/libtiff/) | libtiff provides support for the Tag Image File Format (TIFF), a widely used format for storing image data. 
**libs** | `libunistring` | -&nbsp;`0.9.7` | [Website](https://www.gnu.org/software/libunistring/) | Libunistring provides functions for manipulating Unicode strings and for manipulating C strings according to the Unicode standard. 
**libs** | `libwebp` | -&nbsp;`0.6.1` | [Website](https://developers.google.com/speed/webp) | WebP is a modern image format that provides superior lossless and lossy compression for images on the web. 
**libs** | `libxml2` | -&nbsp;`2.9.4` | [Website](http://xmlsoft.org/) | Libxml2 is a XML C parser and toolkit. 
**libs** | `libxslt` | -&nbsp;`1.1.32` | [Website](http://xmlsoft.org/libxslt) | Libxslt is the XSLT C library developed for the GNOME project. XSLT itself is a an XML language to define transformation for XML. 
**libs** | `mesa` | -&nbsp;`17.1.6` | [Website](https://www.mesa3d.org) | Mesa is an open-source implementation of the OpenGL, Vulkan and other specifications. 
**libs** | `ncurses` | -&nbsp;`6.0` | [Website](https://www.gnu.org/software/ncurses) | The ncurses (new curses) library is a free software emulation of curses in System V Release 4.0 (SVr4), and more. 
**libs** | `nettle` | -&nbsp;`3.3` | [Website](http://www.lysator.liu.se/~nisse/nettle/) | Nettle is a cryptographic library that is designed to fit easily in more or less any context. 
**libs** | `orbit` | -&nbsp;`2.14.19` | [Website](https://projects.gnome.org/ORBit2) | ORBit2 is a CORBA 2.4-compliant Object Request Broker (ORB) featuring mature C, C++ and Python bindings. 
**libs** | `pango` | -&nbsp;`1.40.10` | [Website](http://www.pango.org) | Pango is a library for laying out and rendering of text, with an emphasis on internationalization. 
**libs** | `pcre` | -&nbsp;`8.40` | [Website](http://www.pcre.org/) | The PCRE library is a set of functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. 
**libs** | `popt` | -&nbsp;`1.16` | [Website](http://rpm5.org/files/popt) | Library for parsing command line options. 
**libs** | `py-lmdb` | -&nbsp;`0.93` | [Website](https://lmdb.readthedocs.io/en/release/) | Universal Python binding for the LMDB 'Lightning' Database. 
**libs** | `py-mako` | -&nbsp;`1.0.7_py36`<br/>-&nbsp;`1.0.7_py27` | [Website](http://www.makotemplates.org/) | Mako is a template library written in Python. It provides a familiar, non-XML syntax which compiles into Python modules for maximum performance. 
**libs** | `py-pyqt5` | -&nbsp;`5.9.1_py36` | [Website](https://www.riverbankcomputing.com/software/pyqt/) | PyQt5 is a comprehensive set of Python bindings for Qt v5. 
**libs** | `readline` | -&nbsp;`7.0` | [Website](https://cnswww.cns.cwru.edu/php/chet/readline/rltop.html) | The GNU Readline library provides a set of functions for use by applications that allow users to edit command lines as they are typed in. 
**libs** | `snappy` | -&nbsp;`1.1.7` | [Website](https://github.com/google/snappy) | A fast compressor/decompressor. 
**resource monitoring** | `remora` | -&nbsp;`1.8.2` | [Website](https://github.com/TACC/remora) | Remora is a tool to monitor runtime resource utilization. 
**scm** | `git` | -&nbsp;`2.12.2` | [Website](http://git-scm.com) | Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. 
**scm** | `subversion` | -&nbsp;`1.9.7` | [Website](https://subversion.apache.org/) | Subversion is an open source version control system. 
**tools** | `curl` | -&nbsp;`7.54.0` | [Website](https://curl.haxx.se/) | curl is an open source command line tool and library for transferring data with URL syntax. 
**tools** | `expat` | -&nbsp;`2.2.3` | [Website](http://libexpat.github.io) | Expat is a stream-oriented XML parser library written in C. 
**tools** | `graphicsmagick` | -&nbsp;`1.3.26` | [Website](http://www.graphicsmagick.org/) | GraphicsMagick is the swiss army knife of image processing. 
**tools** | `imagemagick` | -&nbsp;`7.0.7-2` | [Website](https://www.imagemagick.org) | ImageMagick is a free and open-source software suite for displaying, converting, and editing raster image and vector image files. 
**tools** | `leveldb` | -&nbsp;`1.20` | [Website](https://symas.com/lightning-memory-mapped-database/) | Symas LMDB is an extraordinarily fast, memory-efficient database we developed for the Symas OpenLDAP Project. 
**tools** | `lmdb` | -&nbsp;`0.9.21` | [Website](https://symas.com/lightning-memory-mapped-database/) | Symas LMDB is an extraordinarily fast, memory-efficient database we developed for the Symas OpenLDAP Project. 
**tools** | `motif` | -&nbsp;`2.3.7` | [Website](https://motif.ics.com) | Motif is the toolkit for the Common Desktop Environment. 
**tools** | `parallel` | -&nbsp;`20180122` | [Website](https://www.gnu.org/software/parallel/) | GNU parallel is a shell tool for executing jobs in parallel using one or more computers. 
**tools** | `qt` | -&nbsp;`5.9.1` | [Website](https://www.qt.io) | QT is a cross-platform application framework that is used for developing application software that can be run on various software and hardware platforms. 
**tools** | `rocksdb` | -&nbsp;`5.7.3` | [Website](https://rocksdb.org) | A library that provides an embeddable, persistent key-value store for fast storage. 
**tools** | `x11` | -&nbsp;`7.7` | [Website](https://www.x.org) | The X.Org project provides an open source implementation of the X Window System. 
**tools** | `xkeyboard-config` | -&nbsp;`2.21` | [Website](https://www.freedesktop.org/wiki/Software/XKeyboardConfig/) | The non-arch keyboard configuration database for X Window. 

### Viz
Field  | <img style="float:left;min-width:120px;visibility:hidden">Module&nbsp;name | <img style="float:left;min-width:90px;visibility:hidden">Version(s) | URL  | Description
:----- | :----------- | :------ | :--- | :----------
**graphs** | `graphviz` | -&nbsp;`2.40.1` | [Website](https://www.graphviz.org/) | Graphviz is open source graph visualization software. 
**molecular visualization** | `pymol`^<b class="lic"></b>^ | -&nbsp;`1.8.6.2` | [Website](https://pymol.org) | PyMOL is a Python-enhanced molecular graphics tool. 
**plotting** | `gnuplot` | -&nbsp;`5.2.0` | [Website](http://www.gnuplot.info) | Gnuplot is a portable command-line driven graphing utility for Linux, OS/2, MS Windows, OSX, VMS, and many other platforms. 
**plotting** | `py-matplotlib` | -&nbsp;`2.1.0_py27`<br/>-&nbsp;`2.1.2_py36`<br/>-&nbsp;`2.0.2_py27` | [Website](http://matplotlib.org) | Matplotlib is a Python 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments across platforms. 
**plotting** | `py-plotly` | -&nbsp;`2.4.1_py27` | [Website](https://plot.ly/python/) | Plotly's Python graphing library makes interactive, publication-quality graphs online. 
**remote display** | `virtualgl` | -&nbsp;`2.5.2` | [Website](http://www.virtualgl.org) | VirtualGL is an open source toolkit that gives any Unix or Linux remote display software the ability to run OpenGL applications with full 3D hardware acceleration. 
