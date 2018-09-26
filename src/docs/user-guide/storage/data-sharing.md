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
| ---------- |  ----------- |
| [NFSv4 ACLs](#nfsv4-acls) |  `$HOME` and `$GROUP_HOME` |
| [POSIX ACLs](#posix-acls) |  `$SCRATCH`, `$GROUP_SCRATCH`, `$L_SCRATCH` and `$OAK` |


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
located at `$GROUP_SCRATCH/restricted-dir/`:

```
$ cd $GROUP_SCRATCH

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

!!! warning "Default permissions on `$GROUP_SCRATCH` don't allow sharing outside of your group"

    By default, the Unix permissions on the root directory `$GROUP_SCRATCH`
    don't allow read nor traversal access for *others* (*ie.* any user not part
    of your PI group). If you need to share files with users outside of your
    own group, please [contact us][url_contact] so we can set the appropriate
    permissions on your folder.

For `$SCRATCH`, you're the owner of the directory and so you can change the
permissions yourself.


### NFSv4 ACLs

`$HOME` and `$GROUP_HOME` also allow setting ACLs, albeit with different
syntax and semantics than POSIX ACLs. The principle is very similar,
though.

An ACL in NFSv4 is a list of rules setting permissions on files or directories.
A permission rule, or Access Control Entry (ACE), is of the form
`type:flags:principle:permissions`.


Commonly used entries for these fields are:

* **type**: `A` (allow) or `D` (deny)
* **flags**: `g` (group), `d` (directory-inherit), `f` (file-inherit), `n`
  (no-propagate-inherit), or `i` (inherit-only)
* **principle**:  a named user (`user@sherlock`), a group, or one of three
  special principles: `OWNER@`, `GROUP@`, and `EVERYONE@`.
* **permissions**: there are 14 permission characters, as well as the shortcuts
  `R`, `W`, and `X`. Here is a list of possible permissions that can be
  included in the permissions field (options are Case Sensitive)<small>
    * `r` read-data (files) / list-directory (directories)
    * `w` write-data (files) / create-file (directories)
    * `x` execute (files) / change-directory (directories)
    * `a` append-data (files) / create-subdirectory (directories)
    * `t` read-attributes: read the attributes of the file/directory.
    * `T` write-attributes: write the attributes of the file/directory.
    * `n` read-named-attributes: read the named attributes of the
      file/directory.
    * `N` write-named-attributes: write the named attributes of the
      file/directory.
    * `c` read-ACL: read the file/directory NFSv4 ACL.
    * `C` write-ACL: write the file/directory NFSv4 ACL.
    * `o` write-owner: change ownership of the file/directory.
    * `y` synchronize: allow clients to use synchronous I/O with the server.
    * `d` delete: delete the file/directory. Some servers will allow a delete
      to occur if either this permission is set in the file/directory or if the
      delete-child permission is set in its parent direcory.
    * `D` delete-child: remove a file or subdirectory from within the given
      directory (directories only)

   </small>

A comprehensive listing of allowable field strings is given in the manual page
[nfs4_acl(5)][url_nfs4_acl_man]

To see what permissions are set on a particular file, use the `nfs4_getfacl`
command. For example, newly created `file1` may have default permissions listed
by `ls -l` as `-rw-r—r—`. Listing the permissions with `nfs4_getfacl` would
display the following:

```shell
$ nfs4_getfacl file1
A::OWNER@:rwatTnNcCoy
A:g:GROUP@:rtncy
A::EVERYONE@:rtncy
```

To set permissions on a file, use the `nfs4_setfacl` command. For convenience,
NFSv4 provides the shortcuts `R`, `W` and `X` for setting read, write, and
execute permissions. For example, to add write permissions for the current
group on `file1`, use `nfs4_setfacl` with the `-a` switch:

```shell
$ nfs4_setfacl -a A::GROUP@:W file1
```

This command switched the `GROUP@` permission field from `rtncy` to
`rwatTnNcCoy`.  However, be aware that NFSv4 file permission shortcuts have a
different meanings than the traditional Unix `r`, `w`, and `x`. For example
issuing `chmod g+w file1` will set `GROUP@` to `rwatncy`.

Although the shortcut permissions can be handy, often rules need to be more
customized. Use `nfs4_setfacl -e file1`  to open the ACL for `file1` in a text
editor.

Access Control Entries allow more fine grained control over file and directory
permissions than does the `chmod` command. For example, if user `joe` wants to
give read and write permissions to `jack` for her directory `private`, she
would issue:

```shell
$ nfs4_setfacl -R -a A::jack@sherlock:RW private/
```

The `-R` switch recursively applies the rule to the files and directories
within `private/` as well.

To allow `jack` to create files and subdirectories within `private/` with the
permissions as granted above, inheritance rules need to be applied.

```
$ nfs4_setfacl -R -a A:fdi:jack@sherlock:RW private/
```

By default, each permission is in the Deny state and an ACE is required to
explicitly allow a permission. However, be aware that a server may silently
override a users ACE, usually to a less permissive setting.






For complete documentation and examples on using NFSv4 ACLs, please see the
manual page at [nfs4_acl(5)][url_nfs4_acl_man].


## Sharing data outside of Sherlock

--8<--- "_wip.md"

[comment]: #  ( External collaborators, globus)


[comment]: #  (link URLs -----------------------------------------------------)

[url_rhel_posix_acl]:   https://access.redhat.com/documentation/en-US/Red_Hat_Storage/2.0/html/Administration_Guide/ch09s05.html
[url_unix_perms]:       https://en.wikipedia.org/wiki/File_system_permissions
[url_contact]:          mailto:srcc-support@stanford.edu
[url_nfs4_acl_man]:     http://linux.die.net/man/5/nfs4_acl


[comment]: #  (footnotes -----------------------------------------------------)

