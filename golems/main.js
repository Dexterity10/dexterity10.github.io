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

var currency = 90
var generators = []
var lastUpdate = Date.now()
var maxcap = 21
var totalAmount = 0

for (let i = 0; i < 5; i++) {
    let generator = {
        cost: 3,
        bought: 0,
        amount: 0,
        mult: 2 ** i,
    }
    generators.push(generator)
}
generators[0].cost = 30;

function format(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 3) return amount.toFixed(2);
    return mantissa.toFixed(2) + "e" + power;
}

function buyGenerator(index) {
    let g = generators[index]
    if (index == 0) {
        if (g.cost > currency || totalAmount == maxcap) return
        currency -= g.cost
        g.amount++
        g.bought++
    }
    else {
        if (generators[index - 1].amount < 3) return
        generators[index - 1].amount -= g.cost
        g.amount++
        g.bought++
    }

    let sum = 0
    for (let i = 0; i < 5; i++) {
        sum += generators[i].amount
    }
    totalAmount = sum
}

function updateGUI() {
    document.getElementById("firstRow").textContent = format(currency) + " Stones";
    document.getElementById("cap").textContent = totalAmount + "/" + maxcap;
    document.getElementById("perSecond").textContent = getProduction() + " Stone /s";
    for (let i = 0; i < 5; i++) {
        let g = generators[i];
        document.getElementById("gen" + i).innerHTML = "Amount: " + g.amount + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost);
    }
}

function getProduction() {
    let sum = 0
    for (let i = 0; i < 5; i++) {
        sum += generators[i].amount * generators[i].mult
    }
    return sum
}
function productionLoop(diff) {
    for (let i = 0; i < 5; i++) {
        currency += getProduction() * diff;
    }

}
function automationLoop() {
    if (currency >= generators[0].cost) {
        buyGenerator(0)
    }
    for (let i = 1; i < 5; i++) {
        let g = generators[i]
        if (generators[i - 1].amount >= g.cost) {
            buyGenerator(i)
        }
    }
}

function mainLoop(diff) {
    var diff = (Date.now() - lastUpdate) / 1000;

    productionLoop(diff)
    updateGUI()
    automationLoop()

    lastUpdate = Date.now()
}
setInterval(mainLoop, 50)

updateGUI()