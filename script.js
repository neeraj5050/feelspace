function submitFeeling() {
  const journalText = document.getElementById("journalBox").value.trim();
  const mood = document.getElementById("mood").value;
  const botResponse = document.getElementById("botResponse");

  if (!journalText) {
    botResponse.innerText = "✋ Please write something before submitting.";
    return;
  }

  // Simulate bot response based on mood
  const responses = {
    "🙂": [
      "That's great to hear! Keep that positivity flowing. 🌞",
      "Even on calm days, expressing your thoughts helps. You’re doing well. 💬",
    ],
    "😞": [
      "I'm really sorry you're feeling this way. You're not alone. 💙",
      "It's okay to feel sad sometimes. I'm here with you. 🌧️",
    ],
    "🥺": [
      "Deep breaths. You are stronger than this moment. 🌈",
      "Anxiety can be overwhelming, but it will pass. You are safe here. 🤗",
    ],
    "😡": [
      "Anger is a valid emotion. Let it out gently here. 🔥",
      "You're heard. You have a right to feel what you're feeling. 💢",
    ],
    "😌": [
      "Peaceful moments are a gift. Let yourself enjoy it. 🕊️",
      "That’s wonderful. Write freely while you’re feeling calm. 🌿",
    ]
  };

  const randomIndex = Math.floor(Math.random() * responses[mood].length);
  const reply = responses[mood][randomIndex];

  botResponse.innerText = `${mood} SoulBot: ${reply}`;
}

function downloadEntry() {
  const journalText = document.getElementById("journalBox").value.trim();
  const mood = document.getElementById("mood").value;

  if (!journalText) {
    alert("✋ Please write something before saving.");
    return;
  }

  const date = new Date();
  const timestamp = date.toLocaleString();
  const filename = `FeelSpace_Entry_${date.toISOString().split('T')[0]}.txt`;

  const entryContent = `Mood: ${mood}\nDate: ${timestamp}\n\nEntry:\n${journalText}`;

  const blob = new Blob([entryContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
  document.getElementById("journalBox").value = ""; // Optional: Clear journal after saving
  document.getElementById("botResponse").innerText = "✅ Your entry was saved successfully!";
}

document.getElementById('saveBtn').addEventListener('click', function () {
  const input = document.getElementById('journalInput').value.trim();
  if (!input) return;

  let entries = JSON.parse(localStorage.getItem('feelspaceEntries')) || [];
  entries.push({ text: input, date: new Date().toLocaleString() });
  localStorage.setItem('feelspaceEntries', JSON.stringify(entries));

  alert("Your entry has been saved!");
  document.getElementById('journalInput').value = ""; // clear after save
});
window.onload = function () {
  const container = document.getElementById('entries-container');
  const entries = JSON.parse(localStorage.getItem('feelspaceEntries')) || [];

  if (entries.length === 0) {
    container.innerHTML = "<p>No entries yet.</p>";
    return;
  }

  entries.reverse().forEach((entry, i) => {
    const div = document.createElement('div');
    div.className = 'entry-box';
    div.innerHTML = `
      <p>${entry.text}</p>
      <small>🗓️ ${entry.date}</small>
      <hr>
    `;
    container.appendChild(div);
  });
};
