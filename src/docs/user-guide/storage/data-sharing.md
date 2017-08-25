The following sections present and detail options to share data across users
and groups on Sherlock.

## Sharing data locally on Sherlock

### Traditional Unix permissions

Standard [Unix file permissions][url_unix_perms] are supported on Sherlock and
provide **read**, **write** and **execute** permissions for the three distinct
access classes.

The access classes are defined as follows:

* Files and directories are owned by a user. The owner determines the file's
  *user class*. Distinct permissions apply to the owner.
* Files and directories are assigned a group, which define the file's *group
  class*. Distinct permissions apply to members of the file's group. The owner
  may be a member of the file's group.
* Users who are not the owner, nor a member of the group, comprise a file's
  *others class*. Distinct permissions apply to others.

The following permissions apply to each class:

* The `read` permission grants the ability to read a file. When set for a
  directory, this permission grants the ability to read the names of files in
  the directory, but not to find out any further information about them such as
  contents, file type, size, ownership, permissions.
* The `write` permission grants the ability to modify a file. When set for a
  directory, this permission grants the ability to modify entries in the
  directory. This includes creating files, deleting files, and renaming files.
* The `execute` permission grants the ability to execute a file. This
  permission must be set for executable programs, including shell scripts, in
  order to allow the operating system to run them. When set for a directory,
  this permission grants the ability to access file contents and
  meta-information if its name is known, but not list files inside the
  directory, unless read is set also.

!!! note "Shared directories traversal"

    If you need to give access to one of your files to another user, they will
    at least need *execute* permission on each directory within the path to
    that file.

The effective permissions are determined based on the first class the user
falls within in the order of *user*, *group* then *others*. For example, the
user who is the owner of the file will have the permissions given to the user
class regardless of the permissions assigned to the group class or others
class.

While traditional Unix permissions are sufficient in most cases to share files
with all the users within the same group, they are not enough to share files
with a specific subset of users, or with users from other groups. Access
Control Lists (ACLs) can be used for that purpose.

There are two type of ACLs supported on Sherlock depending on the underlying
filesystem:

| Type       |  Filesystems |
| ---------- |  ------------ |
| NFSv4 ACLs |  `$HOME` and `$PI_HOME` |
| POSIX ACLs |  `$SCRATCH`, `$PI_SCRATCH`, `$L_SCRATCH` and `$OAK` |


### POSIX ACLs

POSIX ACLs allows you to grant or deny access to files and directories for
different users (or groups), independently of the file owner or group.

Two types of POSIX ACLs can be defined:

* **Access ACLs**: grant permission for a specific file or directory.
* **Default ACLs**: allow to set a default set of ACLs that will be applied to
  any file or directory without any already defined ACL. Can only be set on
  directories.

ACLs are set with the `setfacl` command, and displayed with `getfacl`. For more
details and examples, please refer to [this documentation][url_rhel_posix_acl].

In the example below, we allow two users to access a restricted directory
located at `$PI_SCRATCH/restricted-dir/`:

```
$ cd $PI_SCRATCH

### Create new directory
$ mkdir restricted-dir

### Remove 'group' and 'other' access
$ chmod g-rwx,o-rwx restricted-dir

### Give user bob read and traversal permissions to the directory
$ setfacl -m u:bob:rX restricted-dir

### Use default ACLs (-d) to give user bob read access to all new
### files and sub-directories that will be created in "restricted-dir"
$ setfacl -d -m u:bob:rX restricted-dir

### Give user alice read, write and traversal permissions for the directory
$ setfacl -m u:alice:rwX restricted-dir

### Use default ACLs (-d) to give user alice read and write access to all
### new files and sub-directories
$ setfacl -d -m u:alice:rwX restricted-dir

### Show ACLs
$ getfacl restricted-dir
# file: restricted-dir/
# owner: joe
# group: grp
# flags: -s-
user::rwx
user:bob:r-x
group::---
mask::r-x
other::---
default:user::rwx
default:user:alice:rwx
default:user:bob:r-x
default:group::---
default:mask::rwx
default:other::---
```

!!! warning "Default permissions on `$PI_SCRATCH` don't allow sharing outside of your group"

    By default, the Unix permissions on the root directory `$PI_SCRATCH` don't
    allow read nor traversal access for *others* (*ie.* any user no part of
    your PI group). If you need to share files with users outside of your own
    group, please [contact us][url_contact] so we can set the appropriate
    permissions on your folder.

For `$SCRATCH`, you're the owner of the directory and so you can change the
permissions yourself.


### NFSv4 ACLs

`$HOME` and `$PI_HOME` also allow setting ACLs, albeit with different
syntax and semantics than POSIX ACLs. The principle is very similar,
though.

An ACL in NFSv4 is a list of rules setting permissions on files or directories.
A permission rule, or Access Control Entry (ACE), is of the form
`type:flags:principle:permissions`.

For complete documentation and examples on using NFSv4 ACLs, please see the
manual page at [nfs4_acl(5)][url_nfs4_acl_man].


## Sharing data outside of Sherlock

--8<--- "_wip.md"

[comment]: #  ( External collaborators, globus)


[comment]: #  (link URLs -----------------------------------------------------)

[url_rhel_posix_acl]:   https://access.redhat.com/documentation/en-US/Red_Hat_Storage/2.0/html/Administration_Guide/ch09s05.html
[url_unix_perms]:       https://en.wikipedia.org/wiki/File_system_permissions
[url_contact]:          srcc-support@stanford.edu
[url_nfs4_acl_man]:     http://linux.die.net/man/5/nfs4_acl


[comment]: #  (footnotes -----------------------------------------------------)

