showChapter = 1;
maxChapter = 2;

function prev() {
  showChapter = Math.max(showChapter - 1, 1);
  window.location.href = 'chapter' + showChapter + '.html';
}
function next() {
  showpage = Math.min(showChapter + 1, maxChapter);
  window.location.href = 'chapter' + showChapter + '.html';
}
function recent() {
  window.location.href = 'chapter' + maxChapter + ".html";
}