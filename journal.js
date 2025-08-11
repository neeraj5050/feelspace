function talkToBot() {
  const text = document.getElementById("entry").value.trim();
  if (text === "") {
    alert("Please write something first.");
    return;
  }

  const replies = [
    "I'm here with you. Breathe and let it out.",
    "That sounds tough. You're strong for expressing it.",
    "Your feelings are valid. Keep going, you're doing well.",
    "Sometimes writing it out is the first step to healing.",
    "You're not alone. It's okay to feel this way."
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  document.getElementById("botReply").textContent = "SoulBot: " + randomReply;
}

function saveEntry() {
  const mood = document.getElementById("mood").value;
  const text = document.getElementById("entry").value;
  if (!text.trim()) {
    alert("Write something before saving.");
    return;
  }

  const blob = new Blob(
    [`Mood: ${mood}\n\nJournal Entry:\n${text}`],
    { type: "text/plain;charset=utf-8" }
  );

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "FeelSpace_Entry.txt";
  link.click();
}
const entry = {
  date: new Date().toLocaleString(),
  text: document.getElementById('journalInput').value
};

let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
entries.push(entry);
localStorage.setItem('journalEntries', JSON.stringify(entries));
