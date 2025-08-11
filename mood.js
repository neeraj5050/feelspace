let selectedMood = '';

function selectMood(mood) {
  selectedMood = mood;
  document.querySelectorAll('.emoji-picker button').forEach(btn => {
    btn.style.border = 'none';
  });
  event.target.style.border = '2px solid #00796b';
}

function saveMood() {
  const note = document.getElementById('moodNote').value.trim();
  if (!selectedMood || !note) {
    alert("Please select a mood and write a note.");
    return;
  }

  const moodEntry = {
    mood: selectedMood,
    note: note,
    time: new Date().toLocaleString()
  };

  let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moodHistory.unshift(moodEntry);
  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

  document.getElementById('moodNote').value = '';
  selectedMood = '';
  displayMoodHistory();
}

function displayMoodHistory() {
  const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const historyDiv = document.getElementById("moodHistory");
  historyDiv.innerHTML = "";

  moodHistory.forEach(entry => {
    const div = document.createElement("div");
    div.className = "history-entry";
    div.innerHTML = `<strong>${entry.mood}</strong> - ${entry.note} <br><small>${entry.time}</small>`;
    historyDiv.appendChild(div);
  });
}

window.onload = displayMoodHistory;
