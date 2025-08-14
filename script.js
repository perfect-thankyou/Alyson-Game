document.getElementById("submit-study").addEventListener("click", () => {
  const hours = parseFloat(document.getElementById("study-hours").value);
  if (!isNaN(hours) && hours > 0) {
    alert(`You studied ${hours} hours today! 🎉`);
    // future: update coins and garden
  }
});
