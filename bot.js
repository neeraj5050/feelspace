const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  setTimeout(() => {
    const reply = generateReply(message);
    typeMessage("SoulBot", reply);
  }, 500);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function typeMessage(sender, text) {
  let i = 0;
  const typing = setInterval(() => {
    if (i <= text.length) {
      const typingText = text.slice(0, i);
      if (chatBox.lastChild?.id === "typing") {
        chatBox.lastChild.innerHTML = `<strong>${sender}:</strong> ${typingText}`;
      } else {
        const msg = document.createElement("div");
        msg.id = "typing";
        msg.innerHTML = `<strong>${sender}:</strong> ${typingText}`;
        chatBox.appendChild(msg);
      }
      chatBox.scrollTop = chatBox.scrollHeight;
      i++;
    } else {
      clearInterval(typing);
      chatBox.lastChild.removeAttribute("id");
    }
  }, 30);
}

function generateReply(input) {
  const replies = [
    "I'm here with you, always.",
    "Take a deep breath. You are doing your best.",
    "You are not alone in this.",
    "Your emotions matter. Don't hide them.",
    "I'm proud of you for reaching out.",
    "You're stronger than you feel right now.",
    "Healing takes time. Be gentle with yourself."
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Optional: Send message on Enter key
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
