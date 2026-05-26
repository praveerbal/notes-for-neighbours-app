import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { COLORS } from "./src/constants/colors";
import { auth } from "./src/services/firebase";
import { registerForPushNotifications } from "./src/services/notificationService";
import { styles } from "./src/styles/globalStyles";

import ComingSoonScreen from "./src/screens/ComingSoonScreen";
import DonateInstrumentScreen from "./src/screens/DonateInstrumentScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InstrumentDetailScreen from "./src/screens/InstrumentDetailScreen";
import LessonsScreen from "./src/screens/LessonsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MyActivityScreen from "./src/screens/MyActivityScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import ReceiveInstrumentScreen from "./src/screens/ReceiveInstrumentScreen";
import RequestInstrumentScreen from "./src/screens/RequestInstrumentScreen";
import VolunteerScreen from "./src/screens/VolunteerScreen";

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={styles.centerPage}>
      <ActivityIndicator size="large" color={COLORS.blue} />
      <Text style={{ marginTop: 14, color: COLORS.gray, fontWeight: "700" }}>
        Loading Notes for Neighbours...
      </Text>
    </View>
  );
}

export default function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsSignedIn(!!user);
      setIsCheckingAuth(false);

      if (user) {
        try {
          await registerForPushNotifications();
        } catch (error) {
          console.log("Push notification registration error:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedIn ? "Home" : "Onboarding"}
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.cream },
          headerShadowVisible: false,
          headerTintColor: COLORS.navy,
          headerTitleStyle: {
            fontWeight: "800",
            color: COLORS.navy,
          },
          contentStyle: { backgroundColor: COLORS.cream },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Notes for Neighbours" }}
        />

        <Stack.Screen
          name="Donate"
          component={DonateInstrumentScreen}
          options={{ title: "Donate Instrument" }}
        />

        <Stack.Screen
          name="Receive"
          component={ReceiveInstrumentScreen}
          options={{ title: "Receive Support" }}
        />

        <Stack.Screen
          name="InstrumentDetail"
          component={InstrumentDetailScreen}
          options={{ title: "Instrument Details" }}
        />

        <Stack.Screen
          name="RequestInstrument"
          component={RequestInstrumentScreen}
          options={{ title: "Request Instrument" }}
        />

        <Stack.Screen
          name="MyActivity"
          component={MyActivityScreen}
          options={{ title: "My Activity" }}
        />

        <Stack.Screen
          name="Volunteer"
          component={VolunteerScreen}
          options={{ title: "Get Involved" }}
        />

        <Stack.Screen
          name="Lessons"
          component={LessonsScreen}
          options={{ title: "Free Music Lessons" }}
        />

        <Stack.Screen
          name="ComingSoon"
          component={ComingSoonScreen}
          options={{ title: "Coming Soon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}