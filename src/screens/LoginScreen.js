import * as AppleAuthentication from "expo-apple-authentication";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";

import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import {
    configureGoogleSignIn,
    signInWithApple,
    signInWithGoogle,
} from "../services/authService";
import { styles } from "../styles/globalStyles";

export default function LoginScreen({ navigation }) {
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();

    async function checkAppleAvailability() {
      const available = await AppleAuthentication.isAvailableAsync();
      setIsAppleAvailable(available);
    }

    checkAppleAvailability();
  }, []);

  const handleGoogleSignIn = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigation.replace("Home");
    } catch (error) {
      console.log("Google sign-in error:", error);
      Alert.alert("Google sign-in failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await signInWithApple();
      navigation.replace("Home");
    } catch (error) {
      console.log("Apple sign-in error:", error);
      Alert.alert("Apple sign-in failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.centerPage}>
      <Logo />

      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.bodyText}>
        Sign in to donate instruments, request support, volunteer, or access free
        music lessons.
      </Text>

      <PrimaryButton
        title={isLoading ? "Signing in..." : "Continue with Google"}
        onPress={handleGoogleSignIn}
      />

      {Platform.OS === "ios" && isAppleAvailable ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={14}
          style={{
            width: "100%",
            height: 52,
            marginTop: 12,
          }}
          onPress={handleAppleSignIn}
        />
      ) : (
        <SecondaryButton
          title={isLoading ? "Signing in..." : "Continue with Apple"}
          onPress={handleAppleSignIn}
        />
      )}

      <Text style={styles.smallText}>
        Your account helps us keep donations, requests, and instrument matching
        organized safely.
      </Text>
    </View>
  );
}