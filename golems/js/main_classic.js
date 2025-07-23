var currency = 30
var generators = []
var automators = []
var lastUpdate = Date.now()
var maxGenerators = 21
var totalGenerators = 0

for (let i = 0; i < 5; i++) {
    let generator = {
        cost: 3,
        bought: 0,
        amount: 0,
        mult: 2 ** i,
    }
    generators.push(generator)
    let automator = {
        isOn: false,
        isBought: false,
        cost: 10
    }
    automators.push(automator)
}
generators[0].cost = 30;

function format(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 3) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}

function buyGenerator(index) {
    let g = generators[index]
    if (index == 0) {
        if (g.cost > currency || totalGenerators == maxGenerators) return
        if (automators[index].isOn) {
            let toAdd = Math.min(Math.floor(currency / 30), maxGenerators - totalGenerators)
            currency %= 30
        } else {
            currency -= g.cost
            toAdd = 1
        }
        g.amount += toAdd
        g.bought += toAdd
    }
    else {
        if (generators[index - 1].amount < 3) return false
        generators[index - 1].amount -= g.cost
        g.amount++
        g.bought++
    }
    let sum = 0
    for (let i = 0; i < 5; i++) {
        sum += generators[i].amount
    }
    totalGenerators = sum
    return true
}

function updateGUI() {
    var visibleCurrency = Math.floor(currency)
    console.log(visibleCurrency)
    document.getElementById("firstRow").textContent = format(visibleCurrency) + " Stones";
    document.getElementById("cap").textContent = totalGenerators + "/" + maxGenerators;
    document.getElementById("perSecond").textContent = getProduction() + " Stone /s";
    for (let i = 0; i < 5; i++) {
        let g = generators[i];
        document.getElementById("gen" + i).innerHTML = "Amount: " + g.amount + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost);
        if (!automators[i].isBought) {
            document.getElementById("auto" + i).innerHTML = "Autobuy<br>Requires: " + automators[i].cost
        } else {
            if (automators[i].isOn) {
                document.getElementById("auto" + i).textContent = "Autobuy: On"
                document.getElementById("auto" + i).classList.add('active');
                document.getElementById("auto" + i).classList.remove('inactive');
            } else {
                document.getElementById("auto" + i).textContent = "Autobuy: Off"
                document.getElementById("auto" + i).classList.add('inactive');
                document.getElementById("auto" + i).classList.remove('active');
            }
        }
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
    for (let i = 0; i < 5; i++) {
        if (automators[i].isOn) {
            buyGenerator(i)
        }
    }
}

function toggleAuto(index) {
    a = automators[index]
    if (a.isBought) {
        a.isOn = !a.isOn

    } else {
        if (a.cost > generators[index].amount) return
        a.isOn = !a.isOn
        a.isBought = true
        document.getElementById("auto" + index).textContent = "Golem " + (index + 1) + " automator: On"
    }
}

function mainLoop(diff) {
    var diff = (Date.now() - lastUpdate) / 1000;

    productionLoop(diff)
    automationLoop()
    updateGUI()

    lastUpdate = Date.now()
}
setInterval(mainLoop, 50)

updateGUI()