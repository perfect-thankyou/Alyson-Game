// Load saved coins or start with 100
let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 100;

function updateCoinDisplay() {
  document.getElementById("coin-count").textContent = coins;
  localStorage.setItem("coins", coins); // Save coins to localStorage
}

window.onload = () => {
  updateCoinDisplay();
};

document.getElementById("submit-study").addEventListener("click", () => {
  const hours = parseFloat(document.getElementById("study-hours").value);
  if (!isNaN(hours) && hours >= 1) {
    const earned = Math.floor(hours) * 10;
    coins += earned;
    updateCoinDisplay();
    alert(`You studied ${hours} hour(s) and earned ${earned} coins! 🌟`);
  } else {
    alert("Please enter a number of hours ≥ 1.");
  }

  document.getElementById("study-hours").value = "";
});
