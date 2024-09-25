
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

function selectPage(button) {
console.log(button)
    if (button == 1) {
        document.getElementById("page1").style.display = 'block';
        document.getElementById("page2").style.display = 'none';
        document.getElementById("page3").style.display = 'none';
    }
    if (button == 2) {
        page1.style.display = 'none';
        page2.style.display = 'block';
        page3.style.display = 'none';
    }
    if (button == 3) {
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'block';
    }
}