import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "./firebase";

export async function getMyDonations() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to view your donations.");
  }

  const donationsQuery = query(
    collection(db, "donations"),
    where("userId", "==", currentUser.uid)
  );

  const snapshot = await getDocs(donationsQuery);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      instrumentType: data.instrumentType || "Musical Instrument",
      condition: data.condition || "Condition not listed",
      area: data.area || "Area not listed",
      preference: data.preference || "Preference not listed",
      notes: data.notes || "",
      status: data.status || "pending",
      imageUrl: data.imageUrl || null,
    };
  });
}

export async function getMyRequests() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to view your requests.");
  }

  const requestsQuery = query(
    collection(db, "requests"),
    where("userId", "==", currentUser.uid)
  );

  const snapshot = await getDocs(requestsQuery);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      instrumentName: data.instrumentName || "Requested Instrument",
      instrumentType: data.instrumentType || "Instrument",
      instrumentArea: data.instrumentArea || "Area not listed",
      requesterArea: data.requesterArea || "Area not listed",
      reason: data.reason || "",
      status: data.status || "pending",
    };
  });
}