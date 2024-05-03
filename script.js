hex = [ //conversion for hexadecimal
  '00', '22', '44', '66', '88', 'aa', 'cc', 'ee', 'ff',
]
color = [
  0,
  0,
  0,
]

function load() {
  document.getElementById('hexcode').innerHTML = '#' + hex[color[0]] + hex[color[1]] + hex[color[2]];
  document.body.style.backgroundColor = '#' + hex[color[0]] + hex[color[1]] + hex[color[2]];
}
function button(id) {
  if (color[id] < 8) {
    color[id] += 1;
  };
  load();
}