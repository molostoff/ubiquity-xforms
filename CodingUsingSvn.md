# Developing the code #

If you are contributor then you can add new features and fix bugs. However, there is a process that contributors follow in order to try to keep the trunk as bug-free as possible, and this page will walk you through it.

The detail of how you work will depend on what it is you are trying to do. For example, if you are simply tidying up existing code without making changes to the functionality -- perhaps you are bringing a file or two into line with the CodingStyle -- then you can happily commit your changes directly to the trunk without review.

But if you are making changes that add new features, fix a bug, update the test suite, and so on, then you will need to go through a code review process. That way other people get the chance to accept or reject your changes.

Let's look at the process from a high level, before drilling in to the details. We assume that you have SetUpYouWorkingEnvironment.

# Overview #

  1. get a working copy;
  1. make your changes, but stick to review-size portions;
  1. update from trunk if you need to;
  1. if the changes are only formatting changes, then commit straight to trunk;
  1. if your changes affect functionality, fix a bug, change or add a test case, etc., then request a code-review;
  1. if the code-review is positive then go ahead and check in your code. Note that you can have a positive review that requests changes, so you'll need to include those. If you don't agree with the changes, then don't do a check-in without them -- start a discussion going on the list;
  1. if the code-review is negative then it should include some changes that need to be made. This will generally require starting the process again, and requesting another review.

## Step 1: Get a working copy ##

The first thing you will need is a copy of the latest code from the trunk. This usually involves checking out the code to your computer so that you can begin work on it.

How you check the code out will depend on what software you are using. If you are using SVN from the command-line then you will probably have to first create a directory and then run the SVN `checkout` command.

For example, if we were working on submission in the XForms project, we might create a sub-directory called `refactor-submission` and make it your current working directory:
```
md refactor-submission
cd refactor-submission
```
Then we could check-out the trunk as follows:
```
svn checkout https://ubiquity-xforms.googlecode.com/svn/trunk
```
Of course, you might decide to just have a `ubiquity-xforms` directory, and always make your changes to that; a lot depends on whether you might be working on a number of sets of changes at the same time.


## Step 2: Make changes in review-size portions ##

Once you have the code you can make as many changes as you like without affecting anyone else, since you are dealing with your own local copy. But bear in mind that the more code you change, the more difficult it is for other people to review. This may not only slow down the review process...it may even stall it! This is because reviewers will often only have short bursts of time that they can use for reviews, so if you keep your code changes to small amounts that can be reviewed in one sitting, it is more likely to get that crucial review.

### Changes that only affect formatting ###

You can assist this process greatly by keeping separate those changes that only concern _formatting_ of the code. If you feel the urge to do some spring-cleaning, then go right ahead and tidy up those files. You don't need to get anyone's permission, and as long as you commit those changes on their own, without any functional changes, you don't need a code-review.

### Changes that affect functionality ###

But of course you really want to get stuck in add some features. And by all means do, but to ensure that your code doesn't languish unreviewed, or earn a "-1", follow a few simple guidelines:

First, keep separate changes separate. It might sound obvious, but if you are working on submission in XForms, resist the temptation to fix a bug in the trigger control. If you do spot something, either raise a bug for someone else to fix, or make a note for yourself so that you can come back and fix it after you have worked on submission.

Of course, if you know what you are doing with SVN, then by all means make the change to trigger there and then, and push just that change up for a code-review -- the key point is that whetever you do, try to keep the code being committed for review as focused as possible.

Second, along similar lines, resist the temptation to tidy-up all of the other functions in the same file. If you are not working on them, leave them alone. If you feel like spring-cleaning first, then don't let anyone stop you! But in that case make your changes 'formatting only' changes, and commit your nice tidy code to the trunk before you then work on your new changes.

If there is some factoring to be done that will dramatically change the layout of the file, then you'll win friends if you leave that factoring until after you have the code review. After all, factoring can always be done another day. (We'll explain a technique for pointing these kinds of things out to your reviewers later on, when we discuss the review process.)


### We're all reviewers! ###

By the way -- we're all reviewers. Don't let any of what's described here make you think that somewhere there is an elite review-squad that you mustn't antagonise by making your code hard to review. _You_ can review code too. So try to think about how much time you might want to spend on a review, and what you would like other people to do with their code in order to make it easier for _you_ to review it.

And then try to do exactly that in your own code.


## Step 3: Update from trunk if you need to ##

In general you probably won't need to update from trunk whilst you're working, because you should be choosing bite-size pieces of functionality that can be implemented very quickly. However, sometimes you might take a couple of days to complete something, or you might want to double-check that changes someone else has just committed to the trunk will work with your new feature.

In this case simply request an update from the trunk using your SVN software. Again, if you are using a GUI-based SVN client then this will be specific to your software, but if you are using the command-line, ensure you are in the correct directory, and then type:
```
svn update
```
Assuming everything works ok, your local copy of the files will contain _both_ your changes, and the latest copy of the trunk.

Pay attention to the log messages though, because you may find that files you have been working on have now been altered with changes that other people made, and sometimes you might even find that there are conflicts -- you and someone else have both changed the same line of code and SVN doesn't know which one to take.

Once you have resolved any conflicts though, you can carry on developing.

## Step 4: Committing to trunk ##

Be careful.

Be _very_ careful.

If the changes you have made are only formatting changes, then you can go right ahead and commit your code. But anything else needs a code review, and we'll describe that in the next step.

Whether you are committing your code immediately, or after a code review, the command is the same:
```
svn commit
```
You should see a message that tells you that your commit was successful...and if so, congratulations! You have just updated the project with your new features.

## Step 5: Requesting a code review ##

For any changes that might affect the functionality of the code you'll need a code review. This gives other people the chance to look at your code and comment on it. This might be something as simple as "looks good to me", or it might be a line-by-line demolition of the code that you stayed up all night to get working; we're all working together trying to create the best code we can, so don't take it too personally if your code doesn't get through first time!

To request a review you'll need to create a _snapshot_ of your code, and then run a 'pre-review' that will tell everyone that there is something to check.

### Code snapshots for review ###

We keep all code for code review in a `changes` directory. Each developer who is able to commit code to the project has their own directory into which they place any code they would like to have reviewed -- a _snapshot_ -- and once the review is complete they remove the code.

#### Creating a personal snapshot directory ####

If you haven't got your own directory already, then it's easy enough to create one. The SVN command to create a new directory is `mkdir`, and it requires a message to describe what you are doing, and a path to the new directory.

So if your Google Code project name was `johndoe`, and you wanted to create a snapshot directory in the XForms project, you would use the following command:
```
svn mkdir -m "Creating directory for code-reviews" https://ubiquity-xforms.googlecode.com/svn/changes/johndoe
```
You only need to do this once, since all of your snapshots will be added and removed from this one directory.

#### Copying your code for review ####

Now we're ready to copy our changes to create the snapshot. If you are using a GUI SVN client then you'll need to find out how to perform a copy from your working copy to the server. From the command-line you would do something like this:
```
svn copy . https://ubiquity-xforms.googlecode.com/svn/changes/johndoe/refactor-submission -m "Created refactor-submission for review."
```
Note that the "." parameter means the command should use the current directory on your local machine, but of course you could use a path. And note that as with most SVN commands you need to add a message.

If you want to save a little time, then remember the revision number that the command returns, because we can use that in the next step.

#### The pre-review review ####

The final step before letting other people loose on your code is to provide some guidelines using your own review. The goal is to add comments that other people might find useful when reviewing, but that don't really warrant a comment in the code. As a rule we prefer not to have comments in our code that will soon become irrelevant, so avoid things like "I removed this because I found a better way", or "This line fixes [issue 32](https://code.google.com/p/ubiquity-xforms/issues/detail?id=32)", because in two months time such comments will not mean anything to anyone, and will merely clutter the code.

A much better way is to add such comments to your own personal code-review, so that they are there for your reviewers to see, but are not part of the code, once the review is over.

To start your review, simply navigate in your browser to the entry for the revision you just created. For example, if the copy command in the previous step gave us the revision number 906, then in your browser go to:
```
http://code.google.com/p/ubiquity-xforms/source/detail?r=906
```
If you didn't remember the number then that's no problem; just go directly to the list of changes:
```
http://code.google.com/p/ubiquity-xforms/source/list
```
From here you should be able to find the revision that corresponds to the snapshot you just made -- in our example we're simply looking for the revision with the message "Created refactor-submission for review."

Once you find it, click on the link to take you through to the detailed version, and on the right you'll see a link that says "Start a code review". Click that, and you are off and running.

Browse through your code, and at any point where you want to add something that would be useful to reviewers, simply double-click on the code itself, and you will be given a small form into which you can add your comments. Once you are done with all your files, click on "Publish your comments", which should appear in the top-right.

When publishing your comments you'll see a form with a summary of your line-by-line comments at the bottom, and with a space to provide some overview comments; in here simply type "CODE REVIEW NEEDED". You shouldn't need to type much more, since you've added detailed line-by-line comments, but if you need to say anything else, add it here.

When you click "Submit", Google Code will send an email to everyone in the project with details of your snapshot; the subject line will look like this:
```
[ubiquity-xforms] johndoe commented on revision 906.
```
and the body of the message will contain the words "CODE REVIEW NEEDED". This will indicate to everyone that your code commit is actually a snapshot for review, and will also provide a string of text that people can use in their email software to direct the email to a particular folder.

The email will also include a link to the revision details, making it very easy for anyone to go straight to the 'detail view' of your code -- which will of course include your line-by-line comments to help the reviewer orient themselves.

Your code review is under way, so all you need to do now is to wait for the praise to come pouring in.

### The review process ###

The process of review is pretty straightforward. The essential principle is that we don't want to let code go into trunk that someone objects to. So even if five people vote in favour of your code, if there is one objection it needs to be addressed.

Voting is carried out using exactly the same Google Code process that you just used to start off your review; a reviewer can add line-by-line comments, and they can add a summary when they publish their comments. However, the main difference is that this time a reviewer can give your code a vote; they could choose "+1" if they are happy to see the code go through, or they could give a "-1" if they think it _shouldn't_ go through.

If someone objects to your code then we'd expect them to say why, helping you to either fix the problem, or to give you something to argue against if you disagree with their view.

To make sure everyone has the chance to look at whatever code they want to look at, we allow 48 hours for a "-1" to appear. However, not getting a "-1" only means that no-one objects to your code, it doesn't yet mean it can go through. To get into the trunk your code needs at least one "+1".

Of course this means that if after 24-36 hours you haven't had _any_ replies, you'll be getting understandably jumpy. In that situation you're perfectly entitled to start mailing the list and asking people to take a look at your code.

There will be times when 48 hours is just 48 hours too long -- for example, you might have just fixed a bug that was affecting a user, or you've added a feature that is needed for tomorrow's demonstration; in that situation you can also send a mail directly to the list, and request a faster review. You might also consider asking for a virtual show of hands of people who are _not_ going to review your code -- perhaps they are on holiday or too busy -- since that can also help to reduce the need to wait the full 48 hours.

### Deleting your snapshot ###

Regardless of the result you obtained, once the code review is complete you should delete the snapshot. If you received a negative response you will probably need to go through another review, which means that you'll need to create a new snapshot. And if you received a positive response you will commit your code -- as described in step 4 -- from your _working copy_ and not from the snapshot.

To delete your snapshot, you would use the `delete` command, like this:
```
svn delete https://ubiquity-xforms.googlecode.com/svn/changes/johndoe/refactor-submission -m "Deleted refactor-submission after review."
```