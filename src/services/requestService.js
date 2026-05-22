import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function createInstrumentRequest(instrument, form) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to request an instrument.");
  }

  const requestData = {
    userId: currentUser.uid,
    userEmail: currentUser.email || "",

    instrumentId: instrument.id,
    instrumentName: instrument.name,
    instrumentType: instrument.type,
    instrumentArea: instrument.area,

    requesterName: form.name.trim(),
    requesterEmail: form.email.trim().toLowerCase(),
    requesterPhone: form.phone.trim(),
    requesterArea: form.area.trim(),
    reason: form.reason.trim(),

    status: "pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "requests"), requestData);

  return docRef.id;
}

export async function getPendingRequests() {
  const requestsQuery = query(
    collection(db, "requests"),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(requestsQuery);

  const requests = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      instrumentId: data.instrumentId,
      instrumentName: data.instrumentName || "Instrument",
      instrumentType: data.instrumentType || "Instrument",
      instrumentArea: data.instrumentArea || "Area not listed",

      requesterName: data.requesterName || "",
      requesterEmail: data.requesterEmail || "",
      requesterPhone: data.requesterPhone || "",
      requesterArea: data.requesterArea || "",
      reason: data.reason || "",

      userId: data.userId || "",
      userEmail: data.userEmail || "",

      status: data.status || "pending",
    };
  });

  return requests;
}

export async function approveRequestAndMatchInstrument(requestItem) {
  const requestRef = doc(db, "requests", requestItem.id);
  const donationRef = doc(db, "donations", requestItem.instrumentId);

  await updateDoc(requestRef, {
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  await updateDoc(donationRef, {
    status: "matched",
    matchedRequestId: requestItem.id,
    matchedRequesterName: requestItem.requesterName,
    matchedRequesterEmail: requestItem.requesterEmail,
    matchedAt: serverTimestamp(),
  });
}

export async function declineRequest(requestItem) {
  const requestRef = doc(db, "requests", requestItem.id);

  await updateDoc(requestRef, {
    status: "declined",
    declinedAt: serverTimestamp(),
  });
}