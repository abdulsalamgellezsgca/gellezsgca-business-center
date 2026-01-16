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

authBtn.onclick = async () => {
  try {
    const login = await signInWithEmailAndPassword(auth, email.value, password.value);
    const snap = await getDoc(doc(db, "customers", login.user.uid));

    if (snap.data().role === "admin") {
      if (phone.value !== ADMIN_PHONE) return alert("Admin phone incorrect");
      location.href = "admin.html";
    } else {
      location.href = "dashboard.html";
    }
  } catch {
    const signup = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const role = email.value === ADMIN_EMAIL ? "admin" : "customer";

    await setDoc(doc(db, "customers", signup.user.uid), {
      name: name.value || "Admin",
      email: email.value,
      role,
      status: "active",
      createdAt: serverTimestamp()
    });

    location.href = role === "admin" ? "admin.html" : "dashboard.html";
  }
};
