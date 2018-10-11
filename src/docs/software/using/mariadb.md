## Introduction

[MariaDB][url_mariadb] is a community-developed fork of the [MySQL][url_mysql]
relational database management system. It is completely compatible with MySQL
and could be use as a drop-in replacement in the vast majority of cases.

### More documentation

The following documentation specifically intended for using MariaDB on
Sherlock. For more complete documentation about MariaDB in general, please see
the [MariaDB documentation][url_mariadb_docs].


## MariaDB on Sherlock

We don't provide any centralized database service on Sherlock, but we provide a
centralized installation of MariaDB, and each user is welcome to start their
own instance of the database server to fit their jobs' needs.

The overall process to run an instance of MariaDB on Sherlock would look like
this:

0. configure and initialize your environment so you can start a database
   instance under your user account,
1. start the database server,
2. run SQL queries from the same node (via a local socket), or from other nodes
   and/or jobs (via the network).


### Single-node access

In that example, the database server and client will run within the same job,
on the same [compute node][url_compute_node].

#### Preparation

You first need to let MariaDB know where to store its database, where to log
things, and how to allow connections from clients. The commands below only need
to be executed once.

For this, you'll need to create a `.my.cnf` file in your home directory.
Assuming you'll want to store your database files in a `db/` directory in your
`$SCRATCH` folder, you can run the following commands:

```
$ export DB_DIR=$SCRATCH/db
$ mkdir $DB_DIR

$ cat << EOF > ~/.my.cnf
[mysqld]
datadir=$DB_DIR
socket=$DB_DIR/mariadb.sock
user=$USER
symbolic-links=0
skip-networking

[mysqld_safe]
log-error=$DB_DIR/mariadbd.log
pid-file=$DB_DIR/mariadbd.pid

[mysql]
socket=$DB_DIR/mariadb.sock
EOF
```

!!! warning "`.my.cnf` doesn't support environment variables"

    Please note that if you edit your `~/.my.cnf` file directly in a file
    editor, without using the [HEREDOC][url_heredoc] syntax above,
    environment variables such as `$DB_DIR`, `$HOME` or `$USER` won't work: you
    will need to specify absolute paths explicitely, such as
    `/scratch/users/kilian/db/mariadbd.log`.

    If you use the HEREDOC syntax, you can verify that the resulting `.my.cnf`
    file does actually contain full paths, and not environment variables
    anymore.



Once you have the `.my.cnf` file in place, you need to initialize your database
with some internal data that MariaDB needs. In the same terminal, run the
following commands:

```
$ ml system mariadb
$ $MARIADB_DIR/scripts/mysql_install_db --basedir=$MARIADB_DIR  --datadir=$DB_DIR

```

#### Start the server

You can now start the MariaDB server. For this, first get an allocation on a
compute node, note the hostname of the compute node your job has been
allocated, load the `mariadb` module, and then run the `mysqld_safe` process:

```
$ srun --pty bash
$ echo $SLURM_JOB_NODELIST
sh-01-01
$ ml system mariadb 
$ mysqld_safe
180705 18:14:27 mysqld_safe Logging to '/home/users/kilian/db/mysqld.log'.
180705 18:14:28 mysqld_safe Starting mysqld daemon with databases from /home/users/kilian/db/
```

The `mysqld_safe` will be blocking, meaning it will not give the prompt back
for as long as the MariaDB server runs.

If it does return on its own, it probably means that something went wrong, and
you'll find more information about the issue in the `$DB_DIR/mysqld.log` file
you defined in `~/.my.cnf`.


#### Run queries

You're now ready to run queries against that MariaDB instance, from the same
node your job is running on.

From another terminal on Sherlock, connect to your job's compute node (here,
it's `sh-01-01`, as shown above), load the `mariadb` module, and then run the
`mysql` command: it will open the MariaDB shell, ready to run your SQL queries:

```
$ ssh sh-01-01
$ ml system mariadb
$ mysql
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 8
Server version: 10.2.11-MariaDB Source distribution

Copyright (c) 2000, 2017, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>

```


Once you're done with your MariaDB instance, you can just terminate your job,
and all the processes will be terminated automatically.



### Multi-node access

In case you need to run a more persistent instance of MariaDB, you can for
instance submit a dedicated job to run the server, make it accessible over the
network, and run queries from other jobs and/or nodes.


#### Enable network access

The preparation steps are pretty similar to the [single-node
case](#single-node-access), except the MariaDB server instance will be accessed
over the network rather than through a local socket.

!!! Danger "Network access must be secured"

    When running an networked instance of MariaDB, please keep in mind that any
    user on Sherlock will be able to connect to the TCP ports that `mysqld`
    runs on, and that proper configuration must be done to prevent unauthrozied
    access.

Like in the single-node case, you need to create a `~/.my.cnf` file, but
without the `skip-networking` directive.

```
$ export DB_DIR=$SCRATCH/db
$ mkdir $DB_DIR

$ cat << EOF > ~/.my.cnf
[mysqld]
datadir=$DB_DIR
socket=$DB_DIR/mariadb.sock
user=$USER
symbolic-links=0

[mysqld_safe]
log-error=$DB_DIR/mariadbd.log
pid-file=$DB_DIR/mariadbd.pid

[mysql]
socket=$DB_DIR/mariadb.sock
EOF
```

And then initiate the database:

```
$ ml system mariadb
$ $MARIADB_DIR/scripts/mysql_install_db --basedir=$MARIADB_DIR  --datadir=$DB_DIR
```

#### Secure access

We will now set a password for the MariaDB `root` user to a random string,
just for the purpose of preventing unauthorized access, since we won't need it for
anything.

We will actually create a MariaDB user with all privileges on the databases,
that will be able to connect to this instance from any node. This user will
need a real password, though. So please make sure to replace the
`my-secure-password` string below by the actual password of your choice.

!!! Danger "Choose a proper password"

    This password will only be used to access this specific instance of
    MariaDB. Note that anybody knowing that password will be allowed to connect
    to your MariaDB instances and modify data in the tables.

    * do **NOT** use `my-secure-password`
    * do **NOT** use your SUNet ID password

Once you've chosen your password, you can start the `mysqld` process on a
compute node, like before:

```
$ srun --pty bash
$ echo $SLURM_JOB_NODELIST
sh-01-01
$ ml system mariadb
$ mysqld_safe
```

And then, from another terminal, run the following commands to secure access to
your MariaDB database.

```
$ ssh sh-01-01
$ mysql -u root << EOF
UPDATE mysql.user SET Password=PASSWORD(RAND()) WHERE User='root';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.db WHERE Db='test' OR Db='test_%';
GRANT ALL PRIVILEGES ON *.* TO '$USER'@'%' IDENTIFIED BY 'my-secure-password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF
```

Once you've done that, you're ready to terminate that interactive job, and
start a dedicated MariaDB server job.

#### Start MariaDB in a job

You can use the following `mariadb.sbatch` job as a template:

```bash
#!/bin/bash

#SBATCH --job-name=mariadb
#SBATCH --time=8:0:0
#SBATCH --dependency=singleton

ml system mariadb
mysqld_safe
```

and submit it with:

```
$ sbatch mariadb.sbatch
```

!!! warning "Concurrent instances will lead to data corruption"

    An important thing to keep in mind is that having multiple instances of a
    MariaDB server running at the same time, using the same database files,
    will certainly lead to catastrophic situations and the corruption of those
    files.

    To prevent this from happening, the `--dependency=singleton` job submission
    option will make sure that only one instance of that job (based on its name
    and user) will run at any given time.


#### Connect to the running instance


Now, from any node on Sherlock, whether from a login node, an interactive job,
or a batch job, using the `mysql` CLI or any application binding in any
language, you should be able to connect to your running MariaDB instance,

First, identify the node your job is running on with `squeue`:
```
$ squeue -u $USER -n mariadb
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          21383445    normal  mariadb   kilian  R       0:07      1 sh-01-02
```

and then, point your MariaDB client to that node:

```
$ ml system mariadb
$ mysql -h sh-01-02 -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 15
Server version: 10.2.11-MariaDB Source distribution

Copyright (c) 2000, 2017, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
```

That's it! You can now run SQL queries from anywhere on Sherlock to your own
MariaDB instance.



!!! tip "SQL data is persistent"

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

[url_mysql]:        https://www.mysql.com/
[url_mariadb]:      https://www.mariadb.com/
[url_mariadb_docs]: https://mariadb.com/kb/en/library/documentation/

[url_compute_node]: /docs/overview/glossary/#node
[url_heredoc]:      https://en.wikipedia.org/wiki/Here_document

[url_storage]:      /docs/storage
[url_recurring_jobs]:   /docs/user-guide/running-jobs/#recurring-jobs
