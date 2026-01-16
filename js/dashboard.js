import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  loadServices();
});

async function loadServices() {
  const servicesContainer = document.getElementById("servicesContainer");
  servicesContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "services"));

  querySnapshot.forEach((docSnap) => {
    const service = docSnap.data();

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <h3>${service.name}</h3>
      <p>₦${service.price}</p>
      <button class="royal-btn">Buy Service</button>
    `;

    const buyBtn = card.querySelector("button");

    buyBtn.addEventListener("click", async () => {
      try {
        await addDoc(collection(db, "transactions"), {
          customerId: auth.currentUser.uid,
          customerEmail: auth.currentUser.email,
          serviceName: service.name,
          price: service.price,
          status: "pending",
          createdAt: serverTimestamp()
        });

        alert("Transaction created successfully. Waiting for admin approval.");
      } catch (error) {
        alert("Error creating transaction");
        console.error(error);
      }
    });

    servicesContainer.appendChild(card);
  });
}
