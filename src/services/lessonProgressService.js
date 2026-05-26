import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function getMyCompletedLessonIds() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to view lesson progress.");
  }

  const progressQuery = query(
    collection(db, "lessonProgress"),
    where("userId", "==", currentUser.uid),
    where("completed", "==", true)
  );

  const snapshot = await getDocs(progressQuery);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return data.lessonId;
  });
}

export async function markLessonComplete(lesson) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in to mark lessons complete.");
  }

  const progressId = `${currentUser.uid}_${lesson.id}`;
  const progressRef = doc(db, "lessonProgress", progressId);

  await setDoc(
    progressRef,
    {
      userId: currentUser.uid,
      userEmail: currentUser.email || "",
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      instrument: lesson.instrument,
      completed: true,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}