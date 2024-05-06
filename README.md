## dexterity10.github.io

this is a readme. It is very important :)

How to update pages/chapters
Step 1: Upload page images into pages folder
Step 2: (recommended) Rename it [chapter]-[page]
Step 3: Go into the chapter html file. If making a new html file, make a copy of an older chapter.
Step 4: copy this -> <img class='page' src="pages/1-1.webp" /> and replace "1-1.webp" with the new name of the file. Paste into the page's "main" div (code should say <div id="main"> at the top) Repeat for every new image added
Step 5: Go into script.js and change the variable "maxChapter" to your new highest chapter number. This should reflect how many html files you have, not how many chapters are uploaded to the website (for instance, if you have chapters 5 and 6 on one html page, you only need to increase the maxChapter by 1)