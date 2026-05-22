import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import { styles } from "../styles/globalStyles";

export default function OnboardingScreen({ navigation }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Making Music Accessible",
      text: "Notes for Neighbours helps students and families access instruments, funding, and music-learning opportunities.",
      emoji: "🎵",
    },
    {
      title: "Give Instruments a Second Life",
      text: "Unused guitars, keyboards, violins, and other instruments can become the start of someone’s music journey.",
      emoji: "🎸",
    },
    {
      title: "A Safer Matching System",
      text: "We connect donors, students, and volunteers while keeping private contact and pickup details protected.",
      emoji: "🤝",
    },
    {
      title: "Join the Movement",
      text: "Donate, request support, volunteer, or learn through free beginner-friendly music resources.",
      emoji: "🌟",
    },
  ];

  const current = slides[slide];

  return (
    <View style={styles.centerPage}>
      <Logo />

      <View style={styles.heroEmojiCircle}>
        <Text style={styles.heroEmoji}>{current.emoji}</Text>
      </View>

      <Text style={styles.title}>{current.title}</Text>
      <Text style={styles.bodyText}>{current.text}</Text>

      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === slide && styles.activeDot]}
          />
        ))}
      </View>

      <PrimaryButton
        title={slide === slides.length - 1 ? "Get Started" : "Next"}
        onPress={() => {
          if (slide === slides.length - 1) {
            navigation.navigate("Login");
          } else {
            setSlide(slide + 1);
          }
        }}
      />

      {slide > 0 && (
        <TouchableOpacity onPress={() => setSlide(slide - 1)}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}