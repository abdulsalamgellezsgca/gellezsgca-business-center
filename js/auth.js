import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_EMAIL = "asalamalameen@gmail.com";
const ADMIN_PHONE = "07054740844";

document.getElementById("authBtn").onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const phone = phoneInput.value;

  try {
    const login = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "customers", login.user.uid));

    if (snap.data().role === "admin") {
      if (phone !== ADMIN_PHONE) {
        alert("Admin phone verification failed");
        return;
      }
      location.href = "admin.html";
    } else {
      location.href = "dashboard.html";
    }
  } catch {
    const signup = await createUserWithEmailAndPassword(auth, email, password);

    const role = email === ADMIN_EMAIL ? "admin" : "customer";

    await setDoc(doc(db, "customers", signup.user.uid), {
      name: nameInput.value || "Admin",
      email,
      role,
      status: "active",
      createdAt: serverTimestamp()
    });

    location.href = role === "admin" ? "admin.html" : "dashboard.html";
  }
};
