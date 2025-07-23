class Golem {
    constructor(name, inc, cost) {
        this.name = name
        this.inc = inc
        this.cost = cost
        this.mult = 1
        this.xmult = 1
        this.powmult = 1
    }

    getInc = () => inc;
    getCost = () => cost;
}

var currency = 30
var generators = []
var lastUpdate = Date.now()

let generator = {
    cost: 30, bought: 0, amount: 0, mult: 1
}
generators.push(generator)
for (let i = 1; i < 5; i++) {
    let generator = {
        cost: 3,
        bought: 0,
        amount: 0,
        mult: 2 ** i,
    }
    generators.push(generator)
}

function format(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 3) return amount.toFixed(2);
    return mantissa.toFixed(2) + "e" + power;
}

function buyGenerator(index) {
    let g = generators[index]
    if (index == 0) {
        if (g.cost > currency) return
        currency -= g.cost
        g.amount++
        g.bought++
    }
    else {
        if (g < 3) return
        generators[index + 1].amount -= g.cost
        g.amount++
        g.bought++
    }
}

function updateGUI() {
    document.getElementById("currency").textContent = format(currency) + " Stones";
    for (let i = 0; i < 5; i++) {
        let g = generators[i];
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost);
    }
}

function productionLoop(diff) {
    for (let i = 0; i < 5; i++) {
        currency += generators[i].amount * (generators[i].mult * 2 ** i) * diff;
    }

}

function mainLoop(diff) {
    var diff = (Date.now() - lastUpdate) / 1000;

    productionLoop(diff)
    updateGUI()

    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()