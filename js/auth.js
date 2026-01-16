import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_EMAIL = "asalamalameen@gmail.com";
const ADMIN_PHONE = "07054740844";

document.getElementById("authBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

  try {
    // TRY LOGIN FIRST
    const login = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "customers", login.user.uid));
    const role = snap.data().role;

    if (role === "admin") {
      if (phone !== ADMIN_PHONE) {
        alert("Admin phone verification failed");
        return;
      }
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } catch {
    // IF LOGIN FAILS → SIGN UP
    const signup = await createUserWithEmailAndPassword(auth, email, password);

    const role = email === ADMIN_EMAIL ? "admin" : "customer";

    await setDoc(doc(db, "customers", signup.user.uid), {
      name: name || "Admin",
      dob: dob || null,
      address: address || null,
      email,
      phone: phone || null,
      role,
      status: "active",
      createdAt: serverTimestamp()
    });

    window.location.href = role === "admin" ? "admin.html" : "dashboard.html";
  }
});
