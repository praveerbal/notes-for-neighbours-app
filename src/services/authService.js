import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import {
    GoogleAuthProvider,
    OAuthProvider,
    signInWithCredential,
    signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

const GOOGLE_WEB_CLIENT_ID = "803119547239-u5cfecn4l260b1696j3sh7b4geiv5nmm.apps.googleusercontent.com";

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
}

async function saveUserProfile(user, provider) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const existingUser = await getDoc(userRef);

  const userData = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    provider,
    lastLoginAt: serverTimestamp(),
  };

  if (existingUser.exists()) {
    await setDoc(userRef, userData, { merge: true });
  } else {
    await setDoc(
      userRef,
      {
        ...userData,
        role: "user",
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
}

export async function signInWithGoogle() {
  configureGoogleSignIn();

  const result = await GoogleSignin.signIn();

  const idToken = result.data?.idToken || result.idToken;

  if (!idToken) {
    throw new Error("Google sign-in did not return an ID token.");
  }

  const credential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(auth, credential);

  await saveUserProfile(userCredential.user, "google");

  return userCredential.user;
}

export async function signInWithApple() {
  const rawNonce = Math.random().toString(36).substring(2, 10);
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    rawNonce
  );

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  if (!appleCredential.identityToken) {
    throw new Error("Apple sign-in did not return an identity token.");
  }

  const provider = new OAuthProvider("apple.com");
  const credential = provider.credential({
    idToken: appleCredential.identityToken,
    rawNonce,
  });

  const userCredential = await signInWithCredential(auth, credential);

  await saveUserProfile(userCredential.user, "apple");

  return userCredential.user;
}

export async function signOutUser() {
  try {
    await GoogleSignin.signOut();
  } catch {}

  await signOut(auth);
}