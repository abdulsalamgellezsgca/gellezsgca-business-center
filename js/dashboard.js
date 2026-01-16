import { auth, db } from "./firebase.js";
import {
  collection, getDocs, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loadServices = async () => {
  services.innerHTML = "";
  const snap = await getDocs(collection(db, "services"));

  snap.forEach(s => {
    const d = s.data();
    const div = document.createElement("div");
    div.className = "service-card";
    div.innerHTML = `
      <h3>${d.name}</h3>
      <p>₦${d.price}</p>
      <button>Pay</button>
    `;

    div.querySelector("button").onclick = async () => {
      const tx = await addDoc(collection(db, "transactions"), {
        customerId: auth.currentUser.uid,
        service: d.name,
        amount: d.price,
        status: "pending",
        createdAt: serverTimestamp()
      });
      alert("Transaction ID: " + tx.id);
    };

    services.appendChild(div);
  });
};
