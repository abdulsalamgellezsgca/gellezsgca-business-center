import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const servicesContainer = document.getElementById("services");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const servicesSnap = await getDocs(collection(db, "services"));

  servicesSnap.forEach((doc) => {
    const service = doc.data();

    const div = document.createElement("div");
    div.className = "service-card";

    div.innerHTML = `
      <h3>${service.name}</h3>
      <p>Price: ${service.price}</p>
      <button>Buy Service</button>
    `;

    div.querySelector("button").onclick = async () => {
      await addDoc(collection(db, "transactions"), {
        customerId: user.uid,
        customerEmail: user.email,
        service: service.name,
        price: service.price,
        status: "pending",
        createdAt: serverTimestamp()
      });

      alert("Transaction created. Waiting for admin approval.");
    };

    servicesContainer.appendChild(div);
  });
});
