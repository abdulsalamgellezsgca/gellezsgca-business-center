import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authBtn = document.getElementById("authBtn");

authBtn.addEventListener("click", () => {
  const email = prompt("Enter your Email:");
  const password = prompt("Enter your Password:");

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  // ADMIN LOGIN CHECK
  if (
    email === "asalamalameen@gmail.com" &&
    password === "@Abdulsalam0"
  ) {
    alert("Admin login successful");
    window.location.href = "admin.html";
    return;
  }

  // CUSTOMER LOGIN / SIGNUP
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful");
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Signup successful");
          window.location.href = "dashboard.html";
        })
        .catch(error => {
          alert(error.message);
        });
    });
});
