// 🌧️ WATERING MECHANICS

function getTodayDateString() {
  return new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
}

function renderGardenState() {
  plots.forEach(plot => {
    const id = plot.dataset.id;
    const state = gardenState[id];

    if (!state) return;

    plot.classList.remove("empty");
    plot.classList.add("planted");
    plot.dataset.seedType = state.seedType;

    // Reset watered status daily
    const today = getTodayDateString();
    const lastWatered = state.lastWatered || null;
    const wateredToday = lastWatered === today;

    plot.classList.toggle("watered", wateredToday);

    // Show correct emoji
    if (state.stage === "sprout") {
      plot.textContent = "🌿";
    } else {
      plot.textContent = "🌱";
    }

    // Add Water button if missing
    if (!plot.querySelector(".water-btn")) {
      const btn = document.createElement("button");
      btn.textContent = "💧 Water";
      btn.classList.add("water-btn");
      btn.style.display = "block";
      btn.style.marginTop = "5px";
      btn.addEventListener("click", () => waterPlot(plot, state));
      plot.appendChild(btn);
    }
  });
}

function waterPlot(plot, state) {
  const today = getTodayDateString();

  if (state.lastWatered === today) {
    alert("⏳ Already watered today!");
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // Track watering streak
  if (state.lastWatered === yesterdayStr) {
    state.waterStreak = (state.waterStreak || 0) + 1;
  } else {
    state.waterStreak = 1;
  }

  state.lastWatered = today;

  // Sprout upgrade
  if (state.waterStreak >= 3 && state.stage === "seed") {
    state.stage = "sprout";
    plot.textContent = "🌿";
  }

  plot.classList.add("watered");

  // Save state
  gardenState[plot.dataset.id] = state;
  localStorage.setItem("gardenState", JSON.stringify(gardenState));

  renderGardenState();
}

// Re-render on page load
window.onload = () => {
  updateCoinDisplay();
  updateSeedDisplay();
  renderGardenState();
};
