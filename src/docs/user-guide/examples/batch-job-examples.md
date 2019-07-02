The following are several examples for batch jobs to run on the Sherlock cluster.
If you would like to contribute an example, please [share it here](https://www.github.com/stanford-rc/www.sherlock.stanford.edu/issues).

> _This post is a living post, meaning that it will be updated with more examples_

## Basic
The job below asks for 16GB and can run up to 48 hours.
```bash
#!/bin/bash
#SBATCH --job-name=allthesmallthings
#SBATCH --time=48:00:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=20
#SBATCH --mem=16GB
```

## Using GPUs
To modify your sbatch script for a GPU, you need to add both `--gres` and `--partition`

```bash
#!/bin/bash
#SBATCH --job-name=cron
##SBATCH --begin=now+7days
##SBATCH --dependency=singleton
#SBATCH --time=00:02:00
#SBATCH --mail-type=FAIL
#SBATCH -p gpu
#SBATCH -c 1
#SBATCH --gres gpu:1

# Load modules here
ml load gromacs/2016.3

# Run your script
/bin/bash /scratch/users/pancakes/runMe.sh
```
For more information, see the [gpu](https://www.sherlock.stanford.edu/docs/user-guide/gpu/) and [running jobs](https://www.sherlock.stanford.edu/docs/user-guide/running-jobs/) documentation.

## Long Running Jobs
Let's say you have a long running job with low memory, and the memory grows over time. Here is an example that would make sure that the job goes for 3 days. The QOS (quality of service) directive tells the job manager that the job will be running longer than a day.
```
#!/bin/bash
#SBATCH --job-name=normaljob
#SBATCH -p normal
#SBATCH --qos=long
#SBATCH --time=3-00:00:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=32
#SBATCH --mem=300000
ml load system devel
srun /bin/bash /scratch/users/minniemouse/myJob.sh
```

## Without a Job File
You can submit a job directly (on the command line) without a job file.  The same SBATCH directives at the top become the parameter.

```bash
sbatch --job-name=$job_name -o $job_name.%j.out -e $job_name.%j.err /scratch/users/smiley/scripts/makeSmiles.sh ${file1} ${file2}
```
## Google Drive Sync

```bash
#!/bin/bash 
#SBATCH --job-name=gdrive
#SBATCH --output=/home/users/julienc/logs/gdrive.out
#SBATCH -p agitler
#SBATCH --time=7-0      ## To be used with --qos=long
#SBATCH --cpus-per-task=1
#SBATCH --begin=now+48hour
#SBATCH --dependency=singleton

module load system gdrive
date

# Example of delete, where the string at the end is the file id on Google Drive
gdrive sync upload --keep-local --delete-extraneous $OAK/Shared/Potatoes/ sdhfshds3u39ur93rioneksfser
```
