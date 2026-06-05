let lastSubmitTime = 0;

// ===============================
// 1. Disable Right Click
// ===============================
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});


// ===============================
// 2. Block common DevTools shortcuts
// ===============================
document.addEventListener("keydown", function (e) {
  // F12
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }

  // Ctrl+Shift+I, J, C
  if (e.ctrlKey && e.shiftKey) {
    const blocked = ["I", "J", "C"];
    if (blocked.includes(e.key)) {
      e.preventDefault();
      return false;
    }
  }

  // Ctrl+U (view source)
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    return false;
  }

  // Ctrl+S (save page)
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    return false;
  }
});


// ===============================
// 3. Disable copy / cut / paste (optional, annoying for forms)
// ===============================
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
// ⚠️ You may want to REMOVE paste blocking for forms
// document.addEventListener("paste", e => e.preventDefault());


// ===============================
// 4. DevTools "size detection" trick
// ===============================
setInterval(() => {
  const devtoolsOpen =
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160;

  if (devtoolsOpen) {
    document.body.innerHTML =
      "<h1>Access Restricted</h1>";
  }
}, 1000);


// ===============================
// 5. Console tamper attempt (weak deterrent)
// ===============================
(function () {
  const element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      document.body.innerHTML =
        "<h1>DevTools Detected</h1>";
    }
  });

  console.log(element);
})();


// ===============================
// 6. Debugger trap (very weak, can be bypassed)
// ===============================
setInterval(() => {
  (function () {
    try {
      debugger;
    } catch (e) {}
  })();
}, 2000);


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