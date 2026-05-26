import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import CardButton from "../components/CardButton";
import Logo from "../components/Logo";
import SecondaryButton from "../components/SecondaryButton";
import { signOutUser } from "../services/authService";
import { styles } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      await signOutUser();

      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error) {
      console.log("Sign out error:", error);
      Alert.alert("Sign out failed", error.message);
    }
  };

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
        subtitle="Apply to help with outreach, pickups, sorting, lessons, or events."
        onPress={() => navigation.navigate("Volunteer")}
      />

      <CardButton
        emoji="🎹"
        title="Free Music Lessons"
        subtitle="Browse beginner music lessons and resources."
        onPress={() => navigation.navigate("Lessons")}
      />

      <View style={{ marginTop: 12 }}>
        <SecondaryButton title="Sign Out" onPress={handleSignOut} />
      </View>
    </ScrollView>
  );
}