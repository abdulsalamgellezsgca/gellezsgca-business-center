import { db } from "./firebase.js";
import {
  collection, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const snap = await getDocs(collection(db, "transactions"));

snap.forEach(t => {
  const d = t.data();
  const div = document.createElement("div");
  div.innerHTML = `
    ${d.service} - ₦${d.amount} - ${d.status}
    <button>Approve</button>
  `;
  div.querySelector("button").onclick = async () => {
    await updateDoc(doc(db, "transactions", t.id), { status: "approved" });
    location.reload();
  };
  txList.appendChild(div);
});
