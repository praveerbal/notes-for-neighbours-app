import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "./firebase";

export async function getApprovedInstruments() {
  const instrumentsQuery = query(
    collection(db, "donations"),
    where("status", "==", "approved")
  );

  const snapshot = await getDocs(instrumentsQuery);

  const instruments = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.instrumentType || "Musical Instrument",
      type: data.instrumentType || "Instrument",
      condition: data.condition || "Condition not listed",
      area: data.area || "Area not listed",
      description: data.notes || "No extra description provided.",
      image: data.imageUrl || null,
      donorName: data.donorName || "",
      preference: data.preference || "",
      status: data.status || "pending",
    };
  });

  return instruments;
}