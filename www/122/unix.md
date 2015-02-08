% Unix Command Line Basics
% By Matt Dee for 15-122

Essential Command Line
=======================
This is meant as a breif introduction to using the unix command line with any
decent shell.  Everything should work on csh and bash, at least, which are the
shells that most 122 students are using.

Commands to Know
----------------
Commands consist of a series of space-delimited arguments.  The first argument
is the name of the program to run, and each of the later ones are arguments that
tell that command what to do.  Below are some of the commands everyone needs to
know.  For more ways to use these commands, or to learn about a command you
don't know, try running `man command_name` to see the manual page,
`command_name-h` to see their help screen, or googling it if nothing else works.

* `ls` : list the contents of your current directory
* `cd DIR_NAME`: move to DIR\_NAME
* `cp FILE1 FILE2` : copy FILE1 to FILE2
* `mv FILE1 FILE2` : move FILE1 to FILE2 (deletes FILE1)
* `rm filename` : Delete file
* `rm -rf dirname` : Delete directory
* `pwd` : Says the name of the current directory
* `cat filename`: prints the contents of filename to the terminal.  Good for
quickly seeing what is in a file.

How to Avoid Typing the Whole Command
-------------------------------------
Often times, it can be annoying to type a whole command each time.  Here are
some shortcuts to make this easier:

* `Up arrow`: you can use the up arrow to select a previous command and edit
or run it.  If you add
[this](https://gist.github.com/mattdee123/5a355925f6a3d12d9c21) to a file called
`~/.inputrc` (the ~ stands for your home directory), then pressing the up arrow
will search for commands starting with whatever you've typed so far

* `Ctrl+r`: This starts reverse search, where it will help you find commands
that start with a certain string (eg., you might want to search for "cc0" to see
the commands you've previously used to compile things.  After typing the search
term, press `Ctrl+r` again to look through all starting with this.

* `Tab`: If you are typing in the name of a file to pass into a command (like
`cc0`), you can type the first few letters of the filename and press Tab to get
it to try to autocomplete the file name.  If it can't tell exactly which file
you want, pressing tab again will show all of the files starting with what
you've typed.

Process Control
---------------
Sometimes you need to interrupt a program while it is running.  Here is how you
do that:

* `Ctrl+c`: kill the currently running program
* `Ctrl+d`: Signals the end of input.  This will quit out of interpreters like
  `coin` and `python`.
* `Ctrl+z`: pauses the current program
* `fg`: resumes the last paused program
* `bg`: resumes the last paused program in the background
* `command &`: Runs the command in the background

Note that a command running in the background means that you can still enter
commands, but it is still running.


Running Multiple Commands
-------------------------
A lot of times, you want to run two or more commands one after the other.
You can do this easily using the syntax `command1 ; command2`.  For example,
you might want to do `cc0 awesomeprogram.c0 ; ./a.out` to compile and run your
code.

Sometimes (like in the example above), you want to run the second command only
if the first command succeeds (no point in running the program if it didn't
compile...).  This can be done with the syntax `command1 && command2`.  You'll
notice that this looks like a boolean expression -- and it is!  There is short
circuit evaluation, so if the first command fails (is false), then we don't
bother running the second one!

Piping Input and Output
-----------------------
Occasionally, you might want to make one program's output be the input to
another program (when I say input/output, I don't mean the command line
arguments; I am talking about things that you type in or things that are printed
).  For that, you can use

    command1 | command2

and command2's input will be command1's output.

You might also want to pass the contents of a file as input to a program.  You
can do this either by using

    cat file | command
    or
    command < file

If you want the output of a command to be written to a file, you can use

    command > file
Which Shell To Use?
-------------------
Although on AFS you start using `csh` by default, a far more popular shell is
called `bash`.  The two don't act very different, and their main differences are
in how you can configure them.  If you're interested in spending some time
configuring your shell, I'd highly reccomend running `chsh -s bash` to change
your default login shell.  If you want to see your current shell, run
`echo $SHELL`

Note that if you do change shells, you will need to add the line

    export PATH=$PATH:/afs/andrew/course/15/122/bin

to your `~/.bashrc` file.

Shell Configuration (bash)
-------------------
If you use bash, your configuration will be done in a file called `~/.bashrc`
Two things that you can do with shell configurations are creating aliases and
changing your prompt.

* To create an alias, add the line

    alias name="other_command"

  For example, if you want to always run `coin` with `rlwrap` (which makes your
  arrow keys work correctly), you can add

    alias coin="rlwrap coin"

* To change your prompt, you need add a line of the form
    `export PS1="something"`, where something is what your new prompt will be.

  There are lots of escape sequences that you can use to make the prompt more
  useful.  A full list is
  [here](http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/bash-prompt-escape-sequences.html),
  but probably the most useful is \w, which shows your current directory.
  The command

    export PS1="\w: "

  will give you a prompt with your current directory (remember to add this to
  your bashrc if you want it to happen every time).

  After you update your `~/.bashrc`, type `source ~/.bashrc` to make the changes
  take effect.

<br><br><br>

This file was generated from markdown using Pandoc. [Markdown file](unix.md)
