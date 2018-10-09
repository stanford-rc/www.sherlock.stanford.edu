## Introduction

Apache Spark™ is a general engine for large-scale data processing.  This
document gives a quick introduction how to get a first test program in Spark
running on Sherlock.

### More documentation

The following documentation specifically intended for using Spark on Sherlock.
For more complete documentation about Spark in general, please see the [Apache
Spark documentation][url_spark].



## Spark on Sherlock

Running Apache Spark on Sherlock is a bit different from using a traditional
Spark/Hadoop cluster in that it requires some level of integration with the
scheduler.  In a sense, the computing resources (memory and CPU) need to be
allocated twice. First, sufficient resources for the Spark application need to
be allocated via Slurm ; and secondly, `spark-submit` resource allocation flags
need to be properly specified.

In order to use Spark, three steps have to be kept in mind when submitting a
job to the queuing system:

1. a new Spark cluster has to be started on the allocated nodes
2. once the Spark cluster is up and running, Spark jobs have to be submitted to
   the cluster
3. after all Spark jobs have finished running, the cluster has to be shut down

The following scripts show how to implement these three steps, and use the Pi
Monte-Carlo calculation as an example.

### Single-node job

In this example, all the Spark processes run on the same [compute
node][url_compute_node], which makes for a fairly simply sbatch script. The
following example will start a 8-core job on a single node, and run a Spark
task within that allocation:

```bash
#!/bin/bash

#SBATCH --job-name=spark_singlenode
#SBATCH --nodes=1
#SBATCH --cpus-per-task=8
#SBATCH --time=10

module load spark

# This syntax tells spark to use all cpu cores on the node.
export MASTER="local[*]"

# This is a Scala example
run-example SparkPi 1000

# This is a Python example.
spark-submit --master $MASTER $SPARK_HOME/examples/src/main/python/pi.py 1000
```

### Multi-node job

To start a Spark cluster and run a task on multiple nodes, more preliminary
steps are necessary. Here's an example script that will span 2 nodes, start 2
Spark workers on each node, and allow each worker to use 8 cores:

```bash
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --mem-per-cpu=4G
#SBATCH --cpus-per-task=8
#SBATCH --ntasks-per-node=2
#SBATCH --output=sparkjob-%j.out

## --------------------------------------
## 0. Preparation
## --------------------------------------

# load the Spark module
module load spark

# identify the Spark cluster with the Slurm jobid
export SPARK_IDENT_STRING=$SLURM_JOBID

# prepare directories
export SPARK_WORKER_DIR=${SPARK_WORKER_DIR:-$HOME/.spark/worker}
export SPARK_LOG_DIR=${SPARK_LOG_DIR:-$HOME/.spark/logs}
export SPARK_LOCAL_DIRS=${SPARK_LOCAL_DIRS:-/tmp/spark}
mkdir -p $SPARK_LOG_DIR $SPARK_WORKER_DIR

## --------------------------------------
## 1. Start the Spark cluster master
## --------------------------------------

start-master.sh
sleep 1
MASTER_URL=$(grep -Po '(?=spark://).*' \
             $SPARK_LOG_DIR/spark-${SPARK_IDENT_STRING}-org.*master*.out)

## --------------------------------------
## 2. Start the Spark cluster workers
## --------------------------------------

# get the resource details from the Slurm job
export SPARK_WORKER_CORES=${SLURM_CPUS_PER_TASK:-1}
export SPARK_MEM=$(( ${SLURM_MEM_PER_CPU:-4096} * ${SLURM_CPUS_PER_TASK:-1} ))M
export SPARK_DAEMON_MEMORY=$SPARK_MEM
export SPARK_WORKER_MEMORY=$SPARK_MEM
export SPARK_EXECUTOR_MEMORY=$SPARK_MEM

# start the workers on each node allocated to the tjob
export SPARK_NO_DAEMONIZE=1
srun  --output=$SPARK_LOG_DIR/spark-%j-workers.out --label \
      start-slave.sh ${MASTER_URL} &

## --------------------------------------
## 3. Submit a task to the Spark cluster
## --------------------------------------

spark-submit --master ${MASTER_URL} \
             --total-executor-cores $((SLURM_NTASKS * SLURM_CPUS_PER_TASK)) \
             $SPARK_HOME/examples/src/main/python/pi.py 10000

## --------------------------------------
## 4. Clean up
## --------------------------------------

# stop the workers
scancel ${SLURM_JOBID}.0

# stop the master
stop-master.sh
```


[comment]: #  (link URLs -----------------------------------------------------)

[url_compute_node]: /docs/overview/glossary/#node
[url_spark]:        http://spark.apache.org/

