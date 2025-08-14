// Load saved coins or start with 100
let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 100;
let seeds = localStorage.getItem("seeds") ? parseInt(localStorage.getItem("seeds")) : 0;

function updateCoinDisplay() {
  document.getElementById("coin-count").textContent = coins;
  localStorage.setItem("coins", coins); // Save coins to localStorage
}

function updateSeedDisplay() {
  document.getElementById("seed-count").textContent = seeds;
  localStorage.setItem("seeds", seeds); // Save seeds
}

window.onload = () => {
  updateCoinDisplay(); updateSeedDisplay();
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
    if (coins >= cost) {
      coins -= cost;
      updateCoinDisplay(); // already handles UI + localStorage
      alert("🌱 You bought a seed!");
      // Future: Add seed to inventory or plant it
    } else {
      alert("🚫 Not enough coins!");
    }
  });
});

