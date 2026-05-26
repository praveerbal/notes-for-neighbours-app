import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "./firebase";

export async function getPublishedLessons() {
  const lessonsQuery = query(
    collection(db, "lessons"),
    where("status", "==", "published")
  );

  const snapshot = await getDocs(lessonsQuery);

  const lessons = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: data.title || "Untitled Lesson",
      instrument: data.instrument || "General",
      level: data.level || "Beginner",
      videoUrl: data.videoUrl || "",
      description: data.description || "",
      order: data.order || 999,
    };
  });

  return lessons.sort((a, b) => a.order - b.order);
}