showpage = 0; // works on a base 4 system. 0 = 1-4, 1 = 5-8, etc.
page = [
  "1-4",
  "5-8",
  "9-12"
];
const last = page[show.length - 1];

function prev() {
  showpage = Math.max(showpage - 1, 0);
  window.location.href = page[showpage] + '.html';
}
function next() {
  showpage = Math.min(showpage + 1, show.length);
  window.location.href = page[showpage] + '.html';
}
function recent() {
  window.location.href = last + ".html";
}