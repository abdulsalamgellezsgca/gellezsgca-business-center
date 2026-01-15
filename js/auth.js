import { auth, db } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.showSignup = function () {
    document.getElementById("name").style.display = "block";
    document.getElementById("dob").style.display = "block";
    document.getElementById("address").style.display = "block";
};

window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCred.user.uid;

        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists() && userDoc.data().role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }

    } catch (err) {
        document.getElementById("message").innerText = err.message;
    }
};

window.signup = async function () {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCred.user.uid;

        await setDoc(doc(db, "users", uid), {
            name,
            dob,
            address,
            email,
            role: "customer",
            createdAt: new Date()
        });

        window.location.href = "dashboard.html";

    } catch (err) {
        document.getElementById("message").innerText = err.message;
    }
};

