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

function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("waitlistForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: email.value,
    name: name.value || null,
    phone: phone.value || null,
    github: github.value || null,
    intent: intent.value,
    urgency: urgency.value,
    role: role.value,
    pay: pay.value,
    suggestion: suggestion.value,
    time: new Date()
  };

  try {
    await db.collection("waitlist").add(data);
    msg.innerText = "You're on the waitlist 🚀";
    e.target.reset();
  } catch (err) {
    msg.innerText = "Error submitting";
  }
});