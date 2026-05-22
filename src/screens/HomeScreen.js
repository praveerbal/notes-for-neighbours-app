import React from "react";
import { ScrollView, Text, View } from "react-native";

import CardButton from "../components/CardButton";
import Logo from "../components/Logo";
import { styles } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Logo />

      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.welcomeText}>
          Help make music education more accessible through instrument donations,
          student support, volunteering, and free lessons.
        </Text>
      </View>

      <CardButton
        emoji="🎸"
        title="Donate Musical Instruments"
        subtitle="Submit an instrument donation with photos."
        onPress={() => navigation.navigate("Donate")}
      />

      <CardButton
        emoji="🎻"
        title="Apply to Receive Instruments or Funding"
        subtitle="Browse approved instruments or request support."
        onPress={() => navigation.navigate("Receive")}
      />

      <CardButton
        emoji="📋"
        title="My Donations & Requests"
        subtitle="Track your submitted donations and instrument requests."
        onPress={() => navigation.navigate("MyActivity")}
      />

      <CardButton
        emoji="🙋"
        title="Get Involved / Volunteer"
        subtitle="Volunteer opportunities are coming soon."
        onPress={() => navigation.navigate("ComingSoon", { type: "Volunteer" })}
      />

      <CardButton
        emoji="🎹"
        title="Free Music Lessons"
        subtitle="Beginner lessons and resources are coming soon."
        onPress={() => navigation.navigate("ComingSoon", { type: "Lessons" })}
      />
    </ScrollView>
  );
}