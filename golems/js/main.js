
var lastUpdate = Date.now();
const Golems = new Array();

for (let i = 0; i < 15; i++) {
    Golems[i] = {
        name: `${i < 5 ? "Stone" : i < 10 ? "Metal" : "Gem"} Golem ${i % 5}`,
        amount: 0,
        bought: 0,
        cost: i === 0 ? 10 : 3,
        mult: 2 ** (i % 5)
    };
}


const app = Vue.createApp({
    data() {
        const stoneGolems = Golems.slice(0, 5);
        const metalGolems = Golems.slice(5, 10);
        const gemGolems = Golems.slice(10, 15);
        const golems = [stoneGolems, metalGolems, gemGolems];
        const stones = 10;
        const metals = 0;
        const gems = 0;
        const currency = [stones, metals, gems];
        return {
            lastUpdate,
            player: {
                currency: currency,
                golems: golems,
            },
            totalGolems: [0, 0, 0]
        };
    },
    methods: {
        format(amount) {
            let power = Math.floor(Math.log10(amount));
            let mantissa = amount / Math.pow(10, power);
            if (power < 3) return amount.toFixed(0);
            return mantissa.toFixed(2) + "e" + power;
        },
        buy(i, j) {
            const player = this.player;
            const golem = player.golems;
            if (j == 0) {
                // stone amount check
                if (player.currency[i] >= golem[i][0].cost && this.totalGolems[i] < 20) {
                    golem[i][j].amount++, golem[i][j].bought++;
                    player.currency[i] -= golem[i][j].cost;
                }
            } else {
                // golem amount check
                if (golem[i - 1][j].amount >= golem[i][j].cost) {
                    golem[i][j].amount++;
                    golem[i - 1][j].amount -= golem[i][j].cost;
                }
            }
        },
        getProduction(i) {
            let sum = 0;
            for (let j = 0; j < this.player.golems[i].length; j++) {
                sum += this.player.golems[i][j].amount * this.player.golems[i][j].mult;
            }
            return sum;
        },
        productionLoop(delta) {
            for (let i = 0; i < 3; i++) {
                this.player.currency[i] += this.getProduction(i) * delta;
            }
        },
        automationLoop() {
        },
        updateGUI() {
            this.totalStoneGolems = 0
            for (let i = 0; i < this.player.golems.length; i++) {
                this.totalStoneGolems += this.player.golems[i].amount
            }
        },
        mainLoop() {
            var diff = (Date.now() - lastUpdate) / 1000;
            lastUpdate = Date.now();
            this.productionLoop(diff);
            this.updateGUI();
            this.automationLoop(); // TODO
        }
    },
    created() {
        setInterval(this.mainLoop, 50)
    }
});


app.mount("#full")