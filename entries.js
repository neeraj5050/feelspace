// Load entries from localStorage
window.onload = () => {
  const entriesList = document.getElementById('entriesList');
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  if (savedEntries.length === 0) {
    entriesList.innerHTML = '<p>No saved feelings yet. Write in your journal!</p>';
    return;
  }

  savedEntries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.classList.add('entry');
    div.innerText = `#${index + 1} - ${entry.date}\n\n${entry.text}`;
    entriesList.appendChild(div);
  });
};

function downloadAll() {
  const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  if (savedEntries.length === 0) return alert("No entries to download.");

  let content = '';
  savedEntries.forEach((entry, i) => {
    content += `Entry #${i + 1} - ${entry.date}\n${entry.text}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'FeelSpace_Entries.txt';
  a.click();
}

function clearEntries() {
  if (confirm("Are you sure you want to delete all entries?")) {
    localStorage.removeItem('journalEntries');
    location.reload();
  }
}
