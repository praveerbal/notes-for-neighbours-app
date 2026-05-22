import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "./firebase";

export async function uploadDonationPhoto(photoUri) {
  if (!photoUri) {
    return null;
  }

  const response = await fetch(photoUri);
  const blob = await response.blob();

  const fileName = `donation-photos/${Date.now()}.jpg`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, blob);

  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}

export async function createDonation(form, photoUri) {
  const imageUrl = await uploadDonationPhoto(photoUri);

  const donationData = {
    donorName: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    instrumentType: form.instrumentType.trim(),
    condition: form.condition.trim(),
    area: form.area.trim(),
    preference: form.preference.trim(),
    notes: form.notes.trim(),
    imageUrl,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "donations"), donationData);

  return docRef.id;
}