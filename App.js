import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { COLORS } from "./src/constants/colors";

import ComingSoonScreen from "./src/screens/ComingSoonScreen";
import DonateInstrumentScreen from "./src/screens/DonateInstrumentScreen";
import HomeScreen from "./src/screens/HomeScreen";
import InstrumentDetailScreen from "./src/screens/InstrumentDetailScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MyActivityScreen from "./src/screens/MyActivityScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import ReceiveInstrumentScreen from "./src/screens/ReceiveInstrumentScreen";
import RequestInstrumentScreen from "./src/screens/RequestInstrumentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
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
          name="ComingSoon"
          component={ComingSoonScreen}
          options={{ title: "Coming Soon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}