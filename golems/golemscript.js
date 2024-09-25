
function start() {
    // on load function
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");
    var currency = document.getElementById('currency');
    perSecond = document.getElementById('perSecond');
    rps = 0;
    golemName = ['', 'Pebble', 'Rock', 'Stone', 'Boulder', 'Mountain'];
    golemBank = [30, 0, 0, 0, 0, 0];
    golemIsAuto = [, 0, 0, 0, 0, 0];
    golemCap = [0, 21];
    // A max of 21 allows for a max mountain golem count of 13.



    for (i = 1; i < 6; i++) {
        // creates the variables g1-g5
        eval('g' + i + '= document.getElementById(' + "'" + 'g' + i + 'stats' + "'" + ');');
        // creates the variables g1auto-g5auto
        eval('g' + i + 'auto= document.getElementById(' + "'" + 'g' + i + 'auto' + "'" + ');')

    }

    // g1 = document.getElementById('g1stats');
    // g2 = document.getElementById('g2stats');
    // g3 = document.getElementById('g3stats');
    // g4 = document.getElementById('g4stats');
    // g5 = document.getElementById('g5stats');
    // g1auto = document.getElementById('g1auto');
    // g2auto = document.getElementById('g2auto');
    // g3auto = document.getElementById('g3auto');
    // g4auto = document.getElementById('g4auto');
    // g5auto = document.getElementById('g5auto');

    capacity = document.getElementById('capacity');



}
function updateScreen() {
    rps = 0;
    for (let i = 1; i < 6; i++) {
        // calculate rps once every second
        rps += golemBank[i] * 2 ** (i - 1);
    }
    // check what the current capacity is
    golemCap[0] = 0;
    for (let i = 1; i < 6; i++) {
        golemCap[0] += golemBank[i];
    }
    capacity.innerHTML = golemCap[0] + "/" + golemCap[1] + " Golems";
    perSecond.innerHTML = rps + "/s";
    currency.innerHTML = golemBank[0] + " Pebbles";

    for (i = 1; i < 6; i++) {
        // "change the innerHTML of g1,g2,g3,g4,g5"
        eval('g' + i).innerHTML = golemBank[i] + " " + golemName[i] + " Golem" + isPlural(i);
    }

}
function increment(ID) {
    // pebbles per second
    golemBank[0] += rps;
    for (i = 1; i < 6; i++) {
        if (golemIsAuto[i] == 1) {
            buyGolem(i);
        }
    }

}
function isPlural(ID) {
    if (golemBank[ID] > 1) {
        return 's';
    }
    else return '';

}

setInterval(updateScreen, 100);
setInterval(increment, 100);

function selectPage(button) {

    page1.style.display = 'none';
    page2.style.display = 'none';
    page3.style.display = 'none';

    if (button == 1) {
        page1.style.display = 'block';
    }
    if (button == 2) {
        page2.style.display = 'block';
    }
    if (button == 3) {
        page3.style.display = 'block';
    }
}

function buyGolem(ID) {
    if (ID == 1) {
        if (golemBank[0] >= 30 && golemCap[0] != golemCap[1]) {

            golemBank[0] -= 30;
            golemBank[ID]++;
            golemCap[0]++;
        }
    }
    else if (golemBank[ID - 1] >= 3) {

        golemBank[ID - 1] -= 3;
        golemBank[ID]++;
    }
}
function buyAuto(ID) {
    if (ID == 1) {
        if (golemBank[0] >= 300) {
            golemBank[0] -= 30;
            golemIsAuto[ID]++;
            g1auto.innerHTML = "Bought!";
        }
    }
    else if (golemBank[ID - 1] >= 10) {
        golemBank[ID - 1] -= 10;
        golemIsAuto[ID]++;
        eval('g' + ID + 'auto').innerHTML = "Bought!";

    }
}