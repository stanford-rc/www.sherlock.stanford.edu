# Sherlock on the web
> This repository contains the source files for the Sherlock website and
> documentation at https://www.sherlock.stanford.edu

[![Build Status][img_docs_buildstatus]][url_travis_branches]

The [Sherlock documentation][url_docs] is generated from
[MarkDown][url_markdown] documents hosted in this repository.

![screenshot](https://user-images.githubusercontent.com/186807/38383523-97c021fc-38c1-11e8-8bc5-a77255a3f9d7.png)

For more details about the internal structure of the website and building
process, please see [INTERNALS.md](INTERNALS.md)


## How to contribute

We're following the fork, commit, pull-request classical GitHub workflow, as
described in the [Forking projects][url_gh_guide] GitHub guide:

1. [Fork the repository on GitHub][url_fork]
2. Make your changes, commit and push them to your repository
3. Create a new Pull Request


### Step by step instructions

There are two ways for editing documentation contents:
*  [editing on GitHub](#editing-in-github), which is very easy, but
   does not allow previewing the changes before publication,
*  [editing locally](#editing-locally) by cloning the repository on your local
   machine, which allows previewing changes, but is a bit more complicated to
   set up.

We recommend editing on GitHub for quick, typo-like edits, and local edition
more important modifications (adding new pages, rewriting whole sections...).
Both approaches follow the same fork, commit, pull-request workflow described
above.


#### Editing on GitHub

Once you've [forked the repo][url_fork], Markdown pages can be edited directly
within the GitHub web interface, or from the Sherlock documentation pages
themselves. Each page features a pencil icon on the top-right corner.

Clicking on that icon will automatically fork the repository and bring up the
GitHub editor interface. You can then modify the file with your changes. Once
done, in the "Commit changes" section at the bottom of the page, add a short
description for the changes, click on the green "Commit changes" button, and
voilà, done.

You can also get to the page source on GitHub directly by forking the
repository, going to the [`src/docs`][url_docs_src] directory, and then editing
files there.

After you've committed your changes to your forked repository, you can submit
them for review by [creating a Pull Request][url_gh_pr]. Once your PR is
accepted and merged, the website will be automatically rebuilt and deployed at
https://www.sherlock.stanford.edu



#### Editing locally

The general idea is to fork this repository, then clone your fork on your local
machine, do the modifications and preview the changes, then commit and push
back to your repository on GitHub.

> _For more details about forking the repo, cloning it, maintaining it
> in sync with upstream modifications, cleaning up your changes before
> submitting them for review, please see this [GitHub Standard Fork & Pull
> Request Workflow][url_workflow] description._



1. **create a fork**

    Head over to the [GitHub repo page][url_repo] and click the "Fork" button.
    Once you've done that, you can use your favorite git client to clone your
    repo or just head straight to the command line:

    ```shell
    $ git clone git@github.com:USERNAME/FORKED-PROJECT.git sherlock_docs/
    $ cd sherlock_docs/
    ```

2. **create a branch for your modifications**

    ```sh
    $ git checkout -b my_edits
    ```

3. **install the required dependencies**

    ```sh
    $ pip install --user -r requirements.txt
    ```

4. **start the development server**

    ```sh
    $ mkdocs serve
    ```

    This will start a development server at http://127.0.0.1:8000

5. **edit the documentation files**

    See the official [MkDocs documentation][url_mkdocs] for more details).

    All the Markdown files live in `src/docs` and the MkDocs configuration
    (structure, plugins, site settings...) are in `mkdocs.yml`. Updates will
    automatically appear at http://127.0.0.1:8000 each time a file is saved.

7. **commit the changes**

    When you're done with the modifications:
    ```sh
    $ git add .
    $ git commit -m "my commit message"
    ```

8. **push the commit back to your forked repository**

    ```sh
    $ git push origin my_edits
    ```

9. **submit a pull request**

    After you've committed your changes to your forked repository, you can
    submit them for review by [creating a Pull Request][url_gh_pr]. Once your
    PR is accepted and merged, the website will be automatically rebuilt and
    deployed at https://www.sherlock.stanford.edu





#
<img align="left" height="35px"  src="https://cloud.githubusercontent.com/assets/186807/23107559/02ea22bc-f6b4-11e6-8a0a-48601bd7465e.png">

**Sherlock cluster**<br/>
[Website](http://www.sherlock.stanford.edu) | [Documentation](http://www.sherlock.stanford.edu/docs) | [Status page](https://status.sherlock.stanford.edu) | [Changelog](http://news.sherlock.stanford.edu)




[comment]: #  (link URLs -----------------------------------------------------)

[url_mkdocs]:           http://mkdocs.org
[url_markdown]:         https://en.wikipedia.org/wiki/Markdown
[url_gh_guide]:         https://guides.github.com/activities/forking/
[url_gh_pr]:            https://help.github.com/articles/creating-a-pull-request-from-a-fork/
[url_workflow]:         https://gist.github.com/Chaser324/ce0505fbed06b947d962

[url_travis_branches]:  https://travis-ci.org/stanford-rc/www.sherlock.stanford.edu/branches
[img_docs_buildstatus]: https://travis-ci.org/stanford-rc/www.sherlock.stanford.edu.svg?branch=docs

[url_srcc]:             https://srcc.stanford.edu
[url_docs]:             https://www.sherlock.stanford.edu/docs
[url_repo]:             https://github.com/stanford-rc/www.sherlock.stanford.edu
[url_fork]:             https://github.com/stanford-rc/www.sherlock.stanford.edu/fork
[url_docs_src]:         https://github.com/stanford-rc/www.sherlock.stanford.edu/tree/docs/src/docs
