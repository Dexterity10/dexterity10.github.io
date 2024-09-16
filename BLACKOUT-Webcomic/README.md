## dexterity10.github.io

this is a readme. It is very important :)

How to update pages/chapters
Step 1: Upload page images into pages folder
Step 2: (recommended) Rename it [chapter]-[page]
Step 3: Go into the chapter html file. If making a new html file, make a copy of an older chapter.
Step 4: copy this -> <img class='page' src="pages/1-1.webp" /> and replace "1-1.webp" with the new name of the file. Paste into the page's "main" div (code should say <div id="main"> at the top) Repeat for every new image added
<!-- note: step 4 is no longer accurate since I started using DaisyUI. I'll update it soon(ish) -->
Step 5: Go into script.js and change the variable "maxChapter" to your new highest chapter number. This should reflect how many html files you have.
Step 6: Go into chapterselect.html and un-comment the read chapter button (click on the line and press cmd+/). If you decided to continue the naming scheme of "chapter#.html" everything is pre-setup for it to work.
6a Note: for volume 2 and onward, I suggest using chapters >5. For instance, vol 2 chapter 1 would be chapter 6, vol3c1 would be chapter 11, etc. This is to keep the html file names simple, and to make your life easier. If you don't like this, that's totally fine. Just make sure to change the "href="chapter5.html" part in the button to what you'd like. If it doesn't work, be sure that your html file is named *exactly* the same and is in the folder.
6b Note: Be sure to change the div text to the chapter title (The default is currently "Coming Soon".)


Quick Help
# I put a file (html,png,etc.) in a sub folder and it's not showing up!
When calling a file, you need to also call the folder it's put into. within the src or href, add [folder name]/ before the file name. For instance, if you have the png "oak" in the folder "trees", you'd call it as src="trees/oak.png" within an img tag.

# I saved the file, but it's not showing up on the website!
If you're still using GitHub, make sure you've saved all changes, hit publish (cmd+p) in GitHub Desktop, and then wait 10-30 seconds for GitHub to think about what it should be doing.

# Shit's still not working!
Just call me lol