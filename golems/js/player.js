var player = {
    currency: 10,
    stone: [],
    metal: [],
    gem: [],

}

var golem1 = {
    cost: 30, mult: 1, amount: 0, bought: 0
}
player.stone.push(golem1)
console.log("pushed")
console.log(player.stone + "\n" + player.stone[1])