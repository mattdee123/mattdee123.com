% Vim Basics
% Matt Dee

Essential Vim Commands
======================
This is my attempt at writing down some of the basic vim ideas that everyone
who wants to be efficient with vim should know.  It is NOT meant to be a full
guide to using Vim.  For that, or if you are interested in learning more,
check out the `vimtutor` program that should be installed on any machine with
vim.  15-131 (GPI) also has an excellent
[cheat sheet](https://www.cs.cmu.edu/~15131/labitations/vim-cheatsheet.pdf).

Modes
-----
Vim's model for text editing is based on __modes__, which you switch between
when you want to do a different task.  The three major modes are:

* Normal Mode
    - This mode is what you will use when you are moving your cursor around the
      file and running commands (almost all of the commands below are for
      normal mode)
    - Press `Esc` to leave any other mode and come back to normal mode
* Editing Mode
    - This mode will feel similar to other editors.  You move the cursor around
      with the arrow keys and type words to add them to a file.
    - See __Editing__ to see how to get into this mode.
* Visual Select Mode
    - This mode is where you can select regions of the file to act on.
    - Press `v` to enter visual mode, and move the selection with the normal
      movement keys

Movement
--------
* One character: Arrow Keys or `h,j,k,l`
* Start of line: `0`
* End of line: `$`
* Top of file: `gg`
* Line number 122: `122G` or `:122 ↵`
* End of file: `G`
* Next word: `w`
* Previous word: `b`

Editing Text
-------------
* Insert before current character: `i`
* Insert after current character: `a`
* Insert at end of line: `A`
* Undo: `u`
* Redo: `Ctrl+r`

Copying & Pasting
-----------------
* Copy (yank) selected area: `y`
* Copy (yank) current line: `yy`
* Cut selected area: `d`
* Cut current line: `dd`
* Paste: `p`

File Operations
---------------
* Save: `:w ↵`
* Quit: `:q! ↵`
* Save and quit: `:wq ↵`
* Open a different file or create new file: `:e otherfile.c0 ↵`
  - This can be really helpful if you want to copy text from one file, and then
    open a second file and paste text in there.

Searching & Replacing
---------------------
* Search for the string "something": `/something ↵`
* Go to the next occurrence of search: `n`
* Go to previous occurrence of search: `N`
* Replace "foo" with "bar" in whole file: `:%s/foo/bar/g ↵`
* Replace "foo" with "bar" in current line/visual selection:
    `:s/foo/bar/g ↵`

Command Composition
-------------------
This is a slightly more advanced idea in vim, but it is really one of the things
that sets vim apart from other text editors, and makes it possible to automate
things.  I'll use the `d` (cut) command as an example, but most commands can be
composed.

* **Operators and Movement**: As you know from above, if I select a block of
  text (using visual mode) and press
  `d`, it will delete that area.
    - But what if I want to delete the rest of the line? `d$` will do that.
    - How about delete from my cursor to the beginning of the line? `d0`.
    - See a pattern?  I can follow the command with a movement instruction to do
      that command to the region where I would have moved.  What do you think
      `dG` will do?

* **Repetition**: If you need to do the same thing multiple times, you can start
  a command with a number.  For example, `10dd` will delete 10 lines.  `10j` or
  `10+down_arrow` will move your cursor down 10 lines, etc.
    - Amazingly, this even works with inserting!  type a number, press `i`, type
      text, and then press `Esc` to leave insert mode.  Your insertions will be
      repeated that many times!

Miscellaneous Operations
------------------------
* Correctly indent a section of code: `=`
* Format text into line-wrapped paragraph: `gq`
* Increment next number: `Ctrl+a` (It even works with hex!)
* Decrement next number: `Ctrl+x`
* Delete current character: `x`
* Run terminal command: `:!command &amp;`
    - Example: `:!cc0 -d -x coolfile.c0`
    - Don't leave your editor just to check your code!

.vimrc + plugins
----------------
This is where you go when you feel like spending hours making your vim pretty!
I'll just touch on these lightly, and if you are just getting started with vim,
you can probably ignore all of this.

### .vimrc
* Your `~/.vimrc` file is where all of your vim configuration happens -- like a
  `~/.bashrc` or `~/.cshrc` file, it contains commands to be run every time you
  start up vim.
* You should already have something in this file from the 15-122 setup.  If you
  don't (ie., you don't get syntax highlighting in .c0 files), go to [the setup
  page](http://c0.typesafety.net/tutorial/Setting-up-your-environment.html) and
  do that right now!
* There is a lot of configuring you can do here, and if you are ever annoyed by
  something in Vim, googling for the command to put in your `.vimrc` will work
  90% of the time.  My .vimrc file is
  [here](https://bitbucket.org/mattdee123/dotfiles/raw/22657d7515e84c92684912e383b6894416958f44/default/.vimrc)
* The one command I would highly recommend adding is `set mouse=a`.  This allows
  you to use the scroll-wheel to navigate, click to move the cursor, and click
  and drag to do visual select!

### Plugins
* There are some cool plugins in vim.  These are add-ons that you install by
  downloading their files and putting them into a directory located at `~/.vim`.
* I particularly like
  [NERDCommenter](http://www.vim.org/scripts/script.php?script_id=1218), which
  adds some commands for things like commenting out and uncommenting bits of
  code.

<br><br><br>

This file was generated from markdown using Pandoc. [Markdown file](vim.md)
