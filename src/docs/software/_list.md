## Categories
* [`biology`](#biology): neurology
* [Chemistry](#chemistry): computational chemistry, molecular dynamics
* [Devel](#devel): build, compiler, data, language, libs, mpi
* [Math](#math): deep-learning, language, numerical anaylsis, numerical library, statistics
* [System](#system): compression, containers, file transfer, libs, scm, tools
* [Viz](#viz): remote display

### Biology
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**neurology** | `fsl` | `5.0.10` | [Link](https://fsl.fmrib.ox.ac.uk/fsl) | FSL is a comprehensive library of analysis tools for FMRI, MRI and DTI brain imaging data.
**neurology** | `spm` | `12` | [Link](http://www.fil.ion.ucl.ac.uk/spm/) | The SPM software package has been designed for the analysis of brain imaging data sequences. The sequences can be a series of images from different cohorts, or time-series from the same subject.
**neurology** | `mrtrix` | `0.3.16` | [Link](http://www.mrtrix.org) | MRtrix3 provides a set of tools to perform various types of diffusion MRI analyses, from various forms of tractography through to next-generation group-level analyses.
**neurology** | `freesurfer` | `6.0.0` | [Link](https://surfer.nmr.mgh.harvard.edu/) | An open source software suite for processing and analyzing (human) brain MRI images.
**neurology** | `ants` | `2.1.0` | [Link](https://stnava.github.io/ANTs) | ANTs computes high-dimensional mappings to capture the statistics of brain structure and function.
**neurology** | `afni` | `17.1.03` | [Link](https://afni.nimh.nih.gov) | AFNI (Analysis of Functional NeuroImages) is a set of C programs for processing, analyzing, and displaying functional MRI (FMRI) data - a technique for mapping human brain activity.

### Chemistry
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**computational chemistry** | `vasp` | `5.4.1` | [Link](https://www.vasp.at) | The Vienna Ab initio Simulation Package (VASP) is a computer program for atomic scale materials modelling, e.g. electronic structure calculations and quantum-mechanical molecular dynamics, from first principles.
**molecular dynamics** | `gromacs` | `2016.3` | [Link](http://www.gromacs.org) | GROMACS is a versatile package to perform molecular dynamics, i.e. simulate the Newtonian equations of motion for systems with hundreds to millions of particles.

### Devel
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**build** | `scons` | `2.5.1_py36`, `2.5.1_py27` | [Link](http://www.scons.org) | SCons is an Open Source software construction tool.
**build** | `cmake` | `3.8.1` | [Link](https://www.cmake.org) | CMake is an extensible, open-source system that manages the build process in an operating system and in a compiler-independent manner.
**compiler** | `gcc` | `7.1.0`, `6.3.0` | [Link](http://gcc.gnu.org) | The GNU Compiler Collection includes front ends for C, C++, Fortran, Java, and Go, as well as libraries for these languages (libstdc++, libgcj,...).
**compiler** | `llvm` | `4.0.0` | [Link](http://llvm.org) | The LLVM Project is a collection of modular and reusable compiler and toolchain technologies. Clang is an LLVM native C/C++/Objective-C compiler,
**compiler** | `ifort` | `2017.u2` | [Link](https://software.intel.com/en-us/fortran-compilers) | Intel Fortran Compiler, also known as ifort, is a group of Fortran compilers from Intel
**compiler** | `icc` | `2017.u2` | [Link](https://software.intel.com/en-us/c-compilers) | Intel C++ Compiler, also known as icc or icl, is a group of C and C++ compilers from Intel
**data** | `h5utils` | `1.12.1` | [Link](http://ab-initio.mit.edu/wiki/index.php/H5utils) | h5utils is a set of utilities for visualization and conversion of scientific data in the free, portable HDF5 format.
**data** | `hdf5` | `1.10.0p1` | [Link](https://www.hdfgroup.org/hdf5) | HDF5 is a data model, library, and file format for storing and managing data. It supports an unlimited variety of datatypes, and is designed for flexible and efficient I/O and for high volume and complex data.
**data** | `sqlite` | `3.18.0` | [Link](https://www.sqlite.org) | SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine.
**language** | `python` | `3.6.1`, `2.7.13` | [Link](https://www.python.org) | Python is an interpreted, interactive, object-oriented programming language.
**language** | `julia` | `0.5.1` | [Link](https://julialang.org) | Julia is a high-level, high-performance dynamic programming language for numerical computing.
**language** | `java` | `1.8.0_131` | [Link](http://www.oracle.com/technetwork/java/index.html) | Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented,[14] and specifically designed to have as few implementation dependencies as possible.
**language** | `cuda` | `8.0.61` | [Link](https://developer.nvidia.com/cuda-toolkit) | CUDA is a parallel computing platform and application programming interface (API) model created by Nvidia. It allows software developers and software engineers to use a CUDA-enabled graphics processing unit (GPU) for general purpose processing.
**language** | `tcltk` | `8.6.6` | [Link](https://www.tcl.tk) | Tcl (Tool Command Language) is a dynamic programming language, suitable for web and desktop applications, networking, administration, testing. Tk is a graphical user interface toolkit.
**libs** | `eigen` | `3.3.3` | [Link](http://eigen.tuxfamily.org) | Eigen is a C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms.
**libs** | `tbb` | `2017.u2` | [Link](https://software.intel.com/en-us/intel-tbb) | Intel® Threading Building Blocks (Intel® TBB) is a widely used C++ library for shared-memory parallel programming and heterogeneous computing (intra-node distributed memory programming).
**libs** | `nccl` | `1.3.4` | [Link](https://github.com/NVIDIA/nccl) | NCCL (pronounced 'Nickel') is a stand-alone library of standard collective communication routines, such as all-gather, reduce, broadcast, etc., that have been optimized to achieve high bandwidth over PCIe.
**libs** | `boost` | `1.64.0` | [Link](http://www.boost.org) | Boost is a set of libraries for the C++ programming language that provide support for tasks and structures such as linear algebra, pseudorandom number generation, multithreading, image processing, regular expressions, and unit testing.
**mpi** | `openmpi` | `2.0.2` | [Link](https://www.openmpi.org) | The Open MPI Project is an open source Message Passing Interface implementation that is developed and maintained by a consortium of academic, research, and industry partners.
**mpi** | `impi` | `2017.u2` | [Link](https://software.intel.com/en-us/intel-mpi-library) | Intel® MPI Library is a multi-fabric message passing library that implements the Message Passing Interface, version 3.1 (MPI-3.1) specification.

### Math
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**deep-learning** | `cudnn` | `5.1`, `6.0` | [Link](https://developer.nvidia.com/cudnn) | NVIDIA cuDNN is a GPU-accelerated library of primitives for deep neural networks.
**language** | `py-scipystack` | `1.0_py36`, `1.0_py27` | [Link](https://www.scipy.org) | The SciPy Stack is a collection of open source software for scientific computing in Python. It provides the following packages: numpy, scipy, matplotlib, ipython, jupyter, pandas, sympy and nose.
**numerical anaylsis** | `matlab` | `R2017a` | [Link](https://www.mathworks.com/products/matlab.html) | MATLAB (matrix laboratory) is a multi-paradigm numerical computing environment and fourth-generation programming language.
**numerical library** | `gsl` | `1.16`, `2.3` | [Link](https://www.gnu.org/software/gsl) | The GNU Scientific Library (GSL) is a numerical library for C and C++ programmers. The library provides a wide range of mathematical routines such as random number generators, special functions and least-squares fitting.
**numerical library** | `imkl` | `2017.u2` | [Link](https://software.intel.com/en-us/intel-mkl) | Intel Math Kernel Library (Intel MKL) is a library of optimized math routines for science, engineering, and financial applications. Core math functions include BLAS, LAPACK, ScaLAPACK, sparse solvers, fast Fourier transforms, and vector math.[3] The routines in MKL are hand-optimized specifically for Intel processors
**numerical library** | `fftw` | `3.3.6` | [Link](http://www.fftw.org/) | The Fastest Fourier Transform in the West (FFTW) is a software library for computing discrete Fourier transforms (DFTs).
**numerical library** | `openblas` | `0.2.19` | [Link](http://www.openblas.net/) | OpenBLAS is an optimized BLAS library
**statistics** | `R` | `3.4.0` | [Link](http://r-project.org) | R is a free software environment for statistical computing and graphics.

### System
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**compression** | `xz` | `5.2.3` | [Link](http://tukaani.org/xz/) | XZ Utils is free general-purpose data compression software with a high compression ratio.
**compression** | `szip` | `2.1.1` | [Link](https://support.hdfgroup.org/doc_resource/SZIP) | Szip compression software, providing lossless compression of scientific data, is an implementation of the extended-Rice lossless compression algorithm.
**compression** | `zlib` | `1.2.11` | [Link](http://zlib.net) | zlib is designed to be a free, general-purpose, legally unencumbered -- that is, not covered by any patents -- lossless data-compression library for use on virtually any computer hardware and operating system.
**containers** | `singularity` | `2.3` | [Link](http://singularity.lbl.gov) | Singularity is a container framework that enables users to package entire scientific workflows, software and libraries.
**file transfer** | `gdrive` | `2.1.0` | [Link](https://github.com/prasmussen/gdrive) | gdrive is a command line utility for interacting with Google Drive.
**file transfer** | `mpifileutils` | `20170210` | [Link](https://github.com/hpc/mpifileutils) | mpiFileUtils is a suite of MPI-based tools to manage large datasets, which may vary from large directory trees to large files.
**file transfer** | `rclone` | `1.36` | [Link](https://rclone.org) | Rclone is a command line program to sync files and directories to and from: Google Drive, Amazon S3, Dropbox, Google Cloud Storage, Amazon Drive, Microsoft One Drive, Hubic, Backblaze B2, Yandex Disk, or the local filesystem.
**libs** | `libressl` | `2.5.3` | [Link](https://www.libressl.org) | LibreSSL is a version of the TLS/crypto stack forked from OpenSSL in 2014, with goals of modernizing the codebase, improving security, and applying best practice development processes.
**libs** | `libxml2` | `2.9.4` | [Link](http://xmlsoft.org/) | Libxml2 is a XML C parser and toolkit.
**libs** | `pcre` | `8.40` | [Link](http://www.pcre.org/) | The PCRE library is a set of functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5.
**libs** | `libjpeg-turbo` | `1.5.1` | [Link](http://www.libjpeg-turbo.org) | libjpeg-turbo is a JPEG image codec that uses SIMD instructions (MMX, SSE2, AVX2, NEON, AltiVec) to accelerate baseline JPEG compression and decompression on x86, x86-64, ARM, and PowerPC systems
**libs** | `libpng` | `1.2.57`, `1.6.29` | [Link](http://libpng.sourceforge.net) | libpng is the official PNG reference library. It supports almost all PNG features, is extensible, and has been extensively tested for over 20 years.
**libs** | `libmng` | `2.0.3` | [Link](http://libmng.sourceforge.net) | THE reference library for reading, displaying, writing and examining Multiple-Image Network Graphics. MNG is the animation extension to the popular PNG image-format.
**scm** | `git` | `2.12.2` | [Link](http://git-scm.com) | Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
**tools** | `curl` | `7.54.0` | [Link](https://curl.haxx.se/) | curl is an open source command line tool and library for transferring data with URL syntax.

### Viz
Category | Module | Version | URL  | Description
:------  | :----- | ------: | :--- | :----------
**remote display** | `virtualgl` | `2.5.2` | [Link](http://www.virtualgl.org) | VirtualGL is an open source toolkit that gives any Unix or Linux remote display software the ability to run OpenGL applications with full 3D hardware acceleration.
