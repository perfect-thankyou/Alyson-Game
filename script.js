// Initial coin count
let coins = 100;

// Update coin display
function updateCoinDisplay() {
  document.getElementById("coin-count").textContent = coins;
}

// Run on page load
window.onload = () => {
  updateCoinDisplay();
};

document.getElementById("submit-study").addEventListener("click", () => {
  const hours = parseInt(document.getElementById("study-hours").value, 10);

  if (!isNaN(hours) && hours >= 1) {
    const earned = hours * 10;
    coins += earned;
    updateCoinDisplay();
    alert(`Great job! You earned ${earned} coins for studying ${hours} hour(s).`);
  } else {
    alert("Please enter at least 1 hour of study time.");
  }

  // Clear input field
  document.getElementById("study-hours").value = "";
});
