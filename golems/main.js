class Golem {
    constructor(name, inc, cost) {
        this.name = name;
        this.inc = inc;
        this.cost = cost;
    }

    getInc = () => inc;
    getCost = () => cost;
}

var clicks = 0;

function increaseClicks() {
    clicks++;
    document.getElementById("clicks").textContent = "clicks: " + clicks
}