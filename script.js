// Load saved coins or start with 100
let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 100;
let seedInventory = {
  rose: parseInt(localStorage.getItem("seed_rose") || 0),
  tulip: parseInt(localStorage.getItem("seed_tulip") || 0),
  clematis: parseInt(localStorage.getItem("seed_clematis") || 0),
  sunflower: parseInt(localStorage.getItem("seed_sunflower") || 0),
};

let gardenState = JSON.parse(localStorage.getItem("gardenState")) || {};

function updateCoinDisplay() {
  document.getElementById("coin-count").textContent = coins;
  localStorage.setItem("coins", coins); // Save coins to localStorage
}

function updateSeedDisplay() {
  for (const type in seedInventory) {
    document.getElementById(`seed-${type}`).textContent = seedInventory[type];
    localStorage.setItem(`seed_${type}`, seedInventory[type]);
  }
}

const plots = document.querySelectorAll(".plant-plot");

plots.forEach(plot => {
  plot.addEventListener("click", () => {
    if (!plot.classList.contains("empty")) {
      alert("🌿 This plot already has a plant!");
      return;
    }

    // Get available seed types
    const availableSeeds = Object.entries(seedInventory).filter(([type, count]) => count > 0);

    if (availableSeeds.length === 0) {
      alert("🚫 You don't have any seeds to plant!");
      return;
      
      gardenState[plot.dataset.id] = {
  seedType: selectedSeed,
  stage: "seed"  // for now, everything starts as a seed
};
localStorage.setItem("gardenState", JSON.stringify(gardenState));

    }

    // Build selection prompt
    let promptMessage = "Which seed would you like to plant?\n";
    availableSeeds.forEach(([type, count], index) => {
      promptMessage += `${index + 1}. ${capitalize(type)} (${count} available)\n`;
    });

    const choice = prompt(promptMessage);
    const index = parseInt(choice) - 1;

    if (isNaN(index) || index < 0 || index >= availableSeeds.length) {
      alert("Invalid selection.");
      return;
    }

    const selectedSeed = availableSeeds[index][0];

    // Plant the seed
    plot.classList.remove("empty");
    plot.classList.add("planted");
    plot.textContent = "🌱"; // generic seedling emoji
plot.dataset.seedType = selectedSeed; // store seed type for future growth
    seedInventory[selectedSeed]--;
    updateSeedDisplay();
  });
});

// Helper to get emoji based on seed type
function getEmojiForSeed(type) {
  const emojiMap = {
    rose: "🌹",
    tulip: "🌷",
    clematis: "🌸",
    sunflower: "🌻"
  };
  return emojiMap[type] || "🌱";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


window.onload = () => {
  updateCoinDisplay(); updateSeedDisplay(); plots.forEach(plot => {
  const id = plot.dataset.id;
  if (gardenState[id]) {
    plot.classList.remove("empty");
    plot.classList.add("planted");
    plot.dataset.seedType = gardenState[id].seedType;

    // Display stage — just show 🌱 for now
    plot.textContent = "🌱";
  }
});
};

document.getElementById("submit-study").addEventListener("click", () => {
  const hours = parseFloat(document.getElementById("study-hours").value);
  if (!isNaN(hours) && hours >= 1) {
    const earned = Math.floor(hours * 2) * 5;
    coins += earned;
    updateCoinDisplay();
    alert(`You studied ${hours} hour(s) and earned ${earned} coins! 🌟`);
  } else {
    alert("Please enter a number of hours ≥ 1.");
  }

  document.getElementById("study-hours").value = "";
});

// Elements
const shopPanel = document.getElementById("shop-panel");
const openShopBtn = document.getElementById("open-shop");
const closeShopBtn = document.getElementById("close-shop");
const buyButtons = document.querySelectorAll(".buy-seed");

let wateringCans = 3; // start with a few
document.getElementById("watering-count").textContent = wateringCans;

// Open shop
openShopBtn.addEventListener("click", () => {
  shopPanel.classList.remove("hidden");
});

// Close shop
closeShopBtn.addEventListener("click", () => {
  shopPanel.classList.add("hidden");
});

// Buy seed
buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost, 10);
    const seedType = button.dataset.type;

    if (coins >= cost) {
      coins -= cost;
      updateCoinDisplay();
      seedInventory[seedType] += 1;
      updateSeedDisplay();
      alert(`🌱 You bought a ${seedType} seed!`);
    } else {
      alert("🚫 Not enough coins!");
    }
  });
});


