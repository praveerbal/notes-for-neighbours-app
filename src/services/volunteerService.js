import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "./firebase";

export async function createVolunteerApplication(form) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to submit a volunteer application.");
  }

  const volunteerData = {
    userId: currentUser.uid,
    userEmail: currentUser.email || "",

    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    ageOrGrade: form.ageOrGrade.trim(),
    schoolOrOrganization: form.schoolOrOrganization.trim(),
    areasOfInterest: form.areasOfInterest.trim(),
    availability: form.availability.trim(),
    experience: form.experience.trim(),
    reason: form.reason.trim(),

    status: "pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "volunteers"), volunteerData);

  return docRef.id;
}