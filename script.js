showChapter = 1;
maxChapter = 2;

// "first" button takes you to chapter 1 regardless of where you are

function prev() { //immediate previous
  showChapter = Math.max(showChapter - 1, 1);
  window.location.href = 'chapter' + showChapter + '.html';
}
function next() { // immediate next
  showChapter = Math.min(showChapter + 1, maxChapter);
  window.location.href = 'chapter' + showChapter + '.html';
}
function recent() { // most recent chapter
  window.location.href = 'chapter' + maxChapter + ".html";
}