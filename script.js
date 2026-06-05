let lastSubmitTime = 0;

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbWFmOH5nMVNjOi1b8P4DmomXw7d-S1mM",
  authDomain: "maskagentscom.firebaseapp.com",
  projectId: "maskagentscom",
  storageBucket: "maskagentscom.firebasestorage.app",
  messagingSenderId: "153163018096",
  appId: "1:153163018096:web:bdc1a43eb11b24c1f869b5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// smooth scroll
function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

// FORM HANDLER
document.getElementById("waitlistForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ⛔ RATE LIMIT CHECK (MUST BE FIRST)
  const now = Date.now();
  if (now - lastSubmitTime < 8000) {
    document.getElementById("msg").innerText =
      "Please wait a few seconds before submitting again.";
    return;
  }
  lastSubmitTime = now;

  // 🪤 HONEYPOT CHECK (MUST BE INSIDE SUBMIT)
  const botField = document.getElementById("websitebot");
  if (botField && botField.value !== "") {
    console.log("Bot detected (honeypot)");
    return;
  }

  // 📦 COLLECT DATA PROPERLY
  const data = {
    email: document.getElementById("email").value,
    name: document.getElementById("name").value || null,
    phone: document.getElementById("phone").value || null,
    github: document.getElementById("github").value || null,
    intent: document.getElementById("intent").value,
    urgency: document.getElementById("urgency").value,
    role: document.getElementById("role").value,
    pay: document.getElementById("pay").value,
    suggestion: document.getElementById("suggestion").value,
    time: new Date()
  };

  try {
    await db.collection("waitlist").add(data);

    document.getElementById("msg").innerText =
      "You're on the MaskAgents waitlist 🚀";

    e.target.reset();

  } catch (err) {
    console.error(err);
    document.getElementById("msg").innerText =
      "Error submitting. Try again.";
  }
});