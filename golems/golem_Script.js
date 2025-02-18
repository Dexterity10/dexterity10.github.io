import Golem from 'golem.js'


function start() {
    // on load function
    page1 = document.getElementById("page1");
    page2 = document.getElementById("page2");
    page3 = document.getElementById("page3");
    type2 = document.getElementById('type2');
    type3 = document.getElementById('type3');

    currency = document.getElementById('currency');
    // the per second object
    perSecond = {
        id: document.getElementById('perSecond'),
        type1: 0,
        type2: 0
    };
    golemName = ['', 'Pebble', 'Rock', 'Stone', 'Boulder', 'Mountain', 'Raw Iron', 'Iron Nugget', 'Iron Ingot', 'Iron Lump', 'Iron Block'];
    for (i = 1; i < 10; i++) {
        eval("golem" + i) = new Golem(golemName[i], 0);
    }
    pebbles = 0
    golemIsAuto = [, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    golemCap = [0, 21];
    // A max of 21 allows for a max mountain golem count of 13.



    for (i = 1; i < 11; i++) {
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
    perSecond.type1 = 0;
    for (i = 1; i < 6; i++) {
        // calculate pebbles/s once every second
        perSecond.type1 += golemBank[i] * 2 ** (i - 1);
        perSecond.type2 += golemBank[i + 5] * 3 ** (i - 1);
    }
    // check what the current capacity is
    golemCap[0] = 0;
    for (let i = 1; i < 6; i++) {
        golemCap[0] += golemBank[i];
    }
    capacity.innerHTML = golemCap[0] + "/" + golemCap[1] + " Golems";
    perSecond.id.innerHTML = (perSecond.type1 + perSecond.type2) + "/s";
    currency.innerHTML = pebbles + " Pebbles";

    for (i = 1; i < 11; i++) {
        // "change the innerHTML of g1,g2,g3,g4,g5"
        eval('g' + i).innerHTML = golemBank[i] + ' ' + golemName[i] + ' Golem ${golemBank[i] > 1 ? "s" : ""}';
    }

}
function increment(ID) {
    // pebbles per second
    pebbles += perSecond.type1;
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
        if (pebbles >= 30 && golemCap[0] != golemCap[1]) {

            pebbles -= 30;
            golemBank[ID]++;
            golemCap[0]++;
        }
    }
    if (ID == 6) {
        if (golemBank[ID - 1] >= 10) {
            golemBank[ID - 1] -= 10;
            golemBank[ID]++;
        }
    }
    if (ID < 6) {
        if (golemBank[ID - 1] >= 3) {
            golemBank[ID - 1] -= 3;
            golemBank[ID]++;
        }
    }
    if (6 < ID < 11) {
        if (golemBank[ID - 1] >= 5) {
            golemBank[ID - 1] -= 5;
            golemBank[ID]++;
        }
    }


}
function buyAuto(ID) {
    if (ID == 1) {
        if (pebbles >= 300) {
            pebbles -= 30;
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
function buyType(type) {
    if (type == 2) {
        // buy iron golems
        if (pebbles >= 100000 && golemBank[5] >= 10) {
            type2.style.display = "block";
            type2.innerHTML = "Upgraded!";
            pebbles -= 100000;
            golemBank[5] -= 5;

        }
    }
    if (type == 3) {
        // buy next golems
    }
}