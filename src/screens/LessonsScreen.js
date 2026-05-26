import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { COLORS } from "../constants/colors";
import {
    getMyCompletedLessonIds,
    markLessonComplete,
} from "../services/lessonProgressService";
import { getPublishedLessons } from "../services/lessonService";
import { styles } from "../styles/globalStyles";

function LessonCard({ lesson, isCompleted, onMarkComplete }) {
  const openLesson = async () => {
    if (!lesson.videoUrl) {
      Alert.alert("No video link", "This lesson does not have a video link yet.");
      return;
    }

    const canOpen = await Linking.canOpenURL(lesson.videoUrl);

    if (canOpen) {
      await Linking.openURL(lesson.videoUrl);
    } else {
      Alert.alert("Could not open link", "This video link could not be opened.");
    }
  };

  return (
    <View style={styles.lessonCard}>
      <View style={styles.lessonIconBox}>
        <Text style={styles.lessonIcon}>{isCompleted ? "✅" : "🎵"}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.lessonHeaderRow}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>

          {isCompleted ? (
            <View style={styles.completedPill}>
              <Text style={styles.completedPillText}>Completed</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.lessonMeta}>
          {lesson.instrument} • {lesson.level}
        </Text>

        {lesson.description ? (
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        ) : null}

        <TouchableOpacity onPress={openLesson}>
          <Text style={styles.lessonLinkText}>Open lesson video</Text>
        </TouchableOpacity>

        {isCompleted ? (
          <Text style={styles.lessonCompletedText}>
            Nice work — this lesson is marked complete.
          </Text>
        ) : (
          <SecondaryButton
            title="Mark Complete"
            onPress={() => onMarkComplete(lesson)}
          />
        )}
      </View>
    </View>
  );
}

export default function LessonsScreen({ navigation }) {
  const [lessons, setLessons] = useState([]);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markingLessonId, setMarkingLessonId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [publishedLessons, completedIds] = await Promise.all([
        getPublishedLessons(),
        getMyCompletedLessonIds(),
      ]);

      setLessons(publishedLessons);
      setCompletedLessonIds(completedIds);
    } catch (error) {
      console.log("Lessons loading error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (lesson) => {
    try {
      setMarkingLessonId(lesson.id);

      await markLessonComplete(lesson);

      setCompletedLessonIds((previousIds) => {
        if (previousIds.includes(lesson.id)) {
          return previousIds;
        }

        return [...previousIds, lesson.id];
      });

      Alert.alert("Lesson completed", "Great work! Your progress was saved.");
    } catch (error) {
      console.log("Mark lesson complete error:", error);

      Alert.alert(
        "Could not save progress",
        `Something went wrong while saving your lesson progress.\n\n${error.message}`
      );
    } finally {
      setMarkingLessonId(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadLessons();
    });

    return unsubscribe;
  }, [navigation]);

  const completedCount = lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Free Music Lessons</Text>

      <Text style={styles.screenSubtitle}>
        Beginner-friendly lessons and resources to help students start learning
        music, even before they receive an instrument.
      </Text>

      <View style={styles.progressBox}>
        <Text style={styles.progressTitle}>Your Lesson Progress</Text>
        <Text style={styles.progressText}>
          {completedCount} of {lessons.length} lessons completed
        </Text>
      </View>

      <PrimaryButton title="Refresh Lessons" onPress={loadLessons} />

      {isLoading ? (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Loading lessons...
          </Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Could not load lessons</Text>
          <Text style={styles.emptyText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && lessons.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No lessons published yet</Text>
          <Text style={styles.emptyText}>
            Lessons will appear here once they are added in Firebase.
          </Text>
        </View>
      ) : null}

      {!isLoading &&
        !errorMessage &&
        lessons.map((lesson) => (
          <View key={lesson.id}>
            {markingLessonId === lesson.id ? (
              <View style={styles.lessonCard}>
                <View style={styles.lessonIconBox}>
                  <ActivityIndicator size="small" color={COLORS.blue} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>
                    Saving progress...
                  </Text>
                </View>
              </View>
            ) : (
              <LessonCard
                lesson={lesson}
                isCompleted={completedLessonIds.includes(lesson.id)}
                onMarkComplete={handleMarkComplete}
              />
            )}
          </View>
        ))}
    </ScrollView>
  );
}