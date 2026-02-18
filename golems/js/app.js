const { createApp, ref, reactive, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const activeTab = ref("stone");

    const tabs = [
      { id: "stone", label: "Stone", icon: "🪨", currSymbol: "🪨" },
      { id: "metal", label: "Metal", icon: "⚙️", currSymbol: "⚙️" },
      { id: "gem", label: "Gem", icon: "💎", currSymbol: "💎" },
    ];

    const currency = reactive({ stone: 50, metal: 50, gem: 50 });

    const golemIcons = {
      stone: ["🗿", "🏔️", "🪨"],
      metal: ["⚙️", "🔩", "🤖"],
      gem: ["💎", "🔮", "✨"],
    };

    function makeGolems(material) {
      return [1, 2, 3].map((num, i) => ({
        id: `${material}-${num}`,
        name: `${capitalize(material)} Golem ${num}`,
        icon: golemIcons[material][i],
        bought: 0,
        cost: [15, 120, 750][i],
        multiplier: Math.pow(2, i + 1), // ×2, ×4, ×8
        income: [1, 5, 25][i],
      }));
    }

    const golems = reactive({
      stone: makeGolems("stone"),
      metal: makeGolems("metal"),
      gem: makeGolems("gem"),
    });

    function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function formatNum(n) {
      if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
      if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
      if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
      return Math.floor(n).toString();
    }

    function progressColor(tabId) {
      return { stone: "#a8956a", metal: "#7ab3c8", gem: "#9b6fbf" }[tabId];
    }

    function buyGolem(tabId, idx, event) {
      const golem = golems[tabId][idx];
      if (currency[tabId] < golem.cost) return;
      currency[tabId] -= golem.cost;
      golem.bought += 1;
      // Scale cost by 1.15 each purchase
      golem.cost = Math.ceil(golem.cost * 1.15);

      // Floating particle
      spawnParticle(event, golem.icon);
    }

    function spawnParticle(event, icon) {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      const particle = document.createElement("div");
      particle.className = "float-particle";
      particle.textContent = icon;
      particle.style.left = rect.left + rect.width / 2 - 12 + "px";
      particle.style.top = rect.top - 10 + "px";
      particle.style.position = "fixed";
      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove());
    }

    function totalIncome(tabId) {
      return golems[tabId].reduce((sum, g) => sum + g.income * g.bought, 0);
    }

    // Tick: collect income each second
    let ticker;
    onMounted(() => {
      ticker = setInterval(() => {
        ["stone", "metal", "gem"].forEach((mat) => {
          currency[mat] += totalIncome(mat);
        });
      }, 1000);
    });
    onUnmounted(() => clearInterval(ticker));

    return {
      activeTab,
      tabs,
      currency,
      golems,
      formatNum,
      buyGolem,
      totalIncome,
      progressColor,
    };
  },
}).mount("#app");
