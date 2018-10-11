## Introduction

[PostgreSQL][url_postgresql] is a powerful, open source object-relational
database system with a strong focus on reliability, feature robustness, and
performance.

### More documentation

The following documentation specifically intended for using PostgreSQL on
Sherlock. For more complete documentation about PostgreSQL in general, please
see the [PostgreSQL documentation][url_postgresql_docs].


## PostgreSQL on Sherlock

We don't provide any centralized database service on Sherlock, but we provide a
centralized installation of PostgreSQL, and each user is welcome to start their
own instance of the database server to fit their jobs' needs.

The overall process to run an instance of PostgreSQL on Sherlock would look
like this:

0. configure and initialize your environment so you can start a database
   instance under your user account,
1. start the database server,
2. run SQL queries from the same node (via a local socket), or from other nodes
   and/or jobs (via the network).


### Single-node access

In that example, the database server and client will run within the same job,
on the same [compute node][url_compute_node].

#### Preparation

You first need to let PostgreSQL know where to store its database. The commands
below only need to be executed once.

Assuming you'll want to store your database files in a `db/` directory in your
`$SCRATCH` folder, you can run the following commands:

```
$ export DB_DIR=$SCRATCH/db
$ mkdir $DB_DIR
```

Once you have your `$DB_DIR` in place, you need to initialize your database
with some internal data that PostgreSQL needs. In the same terminal, run the
following commands:

```
$ ml system postgresql
$ initdb $DB_DIR
```

#### Start the server

You can now start the PostgreSQL server. For this, first get an allocation on a
compute node, note the hostname of the compute node your job has been
allocated, load the `postgresql` module, and then run the `postgresql` server:

```
$ srun --pty bash
$ echo $SLURM_JOB_NODELIST
sh-01-01
$ ml system postgresql 
$ export DB_DIR=$SCRATCH/db
$ postgres -D $DB_DIR
[...]
2018-10-09 17:42:08.094 PDT [3841] LOG:  database system is ready to accept connections

```

The `postgres` process will be blocking, meaning it will not give the prompt
back for as long as the PostgreSQL server runs.



#### Run queries

You're now ready to run queries against that PostgreSQL instance, from the same
node your job is running on.

From another terminal on Sherlock, connect to your job's compute node (here,
it's `sh-01-01`, as shown above), load the `postgresql` module, and then run
the `createdb` command: it will create a database that you can use as a
testbed:

```
$ ssh sh-01-01
$ ml system postgresql
$ createdb test_db
```

Once this is done, from the same shell, you can run the `psql` command, which
will open the PostgreSQL shell, ready to run your SQL queries:

```
$ psql test_db
psql (10.5)
Type "help" for help.

test_db=#
```

Once you're done with your PostgreSQL instance, you can just terminate your
job, and all the processes will be terminated automatically.



### Multi-node access

In case you need to run a more persistent instance of PostgreSQL, you can for
instance submit a dedicated job to run the server, make it accessible over the
network, and run queries from other jobs and/or nodes.


#### Enable network access

The preparation steps are pretty similar to the [single-node
case](#single-node-access), except the PostgreSQL server instance will be
accessed over the network rather than through a local socket.

!!! Danger "Network access must be secured"

    When running an networked instance of PostgreSQL, please keep in mind that
    any user on Sherlock could potentially be able to connect to the TCP ports
    that `postgres` runs on, and that proper configuration must be done to
    prevent unauthrozied access.

Like in the single-node case, you need to start the `postgres` server process,
but with the `-i` option to enable network connections, and define user access
in your `$DB_DIR/pg_hba.conf` file (see below).

#### Secure access

To allow network connections to the database server, a password will need to be
defined for the PostgreSQL user.  That will allow this user to connect to the
PostgreSQL instance from any node.  Please make sure to replace the
`my-secure-password` string below by the actual password of your choice.

!!! Danger "Choose a proper password"

    This password will only be used to access this specific instance of
    PostgreSQL. Note that anybody knowing that password will be allowed to
    connect to your PostgreSQL instances and modify data in the tables.

    * do **NOT** use `my-secure-password`
    * do **NOT** use your SUNet ID password

Once you've chosen your password, you can now start the PostgreSQL server on a
compute, as described in the previous section, initialize the database, and
set the user password:

```
$ srun --pty bash

$ echo $SLURM_JOB_NODELIST
sh-01-01
$ export DB_DIR=$SCRATCH/db
$ mkdir $DB_DIR

$ ml system postgresql
$ initdb $DB_DIR
$ createdb test_db

$ psql -c "ALTER USER $USER PASSWORD 'my-secure-password';" test_db
```

Then, we need to edit the `$DB_DIR/ph_hba.conf` file to allow network access
for user `$USER`:

```
$ cat << EOF > $DB_DIR/pg_hba.conf
local   all             all                                     trust
host    all             all             127.0.0.1/32            trust
host    all             all             ::1/128                 trust
host    all             $USER           samenet                 md5
EOF
```

Once you've done that, you're ready to terminate that interactive job, and
start a dedicated PostgreSQL server job.

```
$ pg_ctl stop -D $DB_DIR
$ logout
```

#### Start PostgreSQL in a job

You can use the following `postgresql.sbatch` job as a template:

```bash
#!/bin/bash

#SBATCH --job-name=postgresql
#SBATCH --time=8:0:0
#SBATCH --dependency=singleton

export DB_DIR=$SCRATCH/db

ml system postgresql

postgres -i -D $DB_DIR
```

and submit it with:

```
$ sbatch postgresql.sbatch
```

!!! warning "Concurrent instances will lead to data corruption"

    An important thing to keep in mind is that having multiple instances of a
    PostgreSQL server running at the same time, using the same database files,
    will certainly lead to catastrophic situations and the corruption of those
    files.

    To prevent this from happening, the `--dependency=singleton` job submission
    option will make sure that only one instance of that job (based on its name
    and user) will run at any given time.


#### Connect to the running instance


Now, from any node on Sherlock, whether from a login node, an interactive job,
or a batch job, using the `mysql` CLI or any application binding in any
language, you should be able to connect to your running PostgreSQL instance,

First, identify the node your job is running on with `squeue`:
```
$ squeue -u $USER -n postgresql
             JOBID PARTITION       NAME     USER ST       TIME  NODES NODELIST(REASON)
          21383445    normal postgresql   kilian  R       0:07      1 sh-01-02
```

and then, point your PostgreSQL client to that node:

```
$ ml system postgresql
$ mpsql -h sh-06-34  test_db
Password:
psql (10.5)
Type "help" for help.

test_db=#
```

That's it! You can now run SQL queries from anywhere on Sherlock to your own
PostgreSQL instance.


### Persistent DB instances

!!! tip "SQL data is persistent"

    All the data you import in your SQL databases will be persistent across
    jobs. Meaning that you can run a PostgreSQL server job for the day, import
    data in its database, stop the job, and resubmit the same PostgreSQL server
    job the next day: all your data will still be there as long as the location
    you've chosen for your database (the `$DB_DIR` defined in the
    [Preparation](#preparation) steps) is on a persistent [storage
    location][url_storage].

If you need database access for more than the maximum runtime of a job, you can
use the instructions provided to define [self-resubmitting recurring
jobs][url_recurring_jobs] and submit long-running database instances.



[comment]: #  (link URLs -----------------------------------------------------)

[url_postgresql]:       https://www.postgresql.org/
[url_postgresql_docs]:  https://postgresql.com/docs/

[url_compute_node]:     /docs/overview/glossary/#node
[url_heredoc]:          https://en.wikipedia.org/wiki/Here_document

[url_storage]:          /docs/storage
[url_recurring_jobs]:   /docs/user-guide/running-jobs/#recurring-jobs
