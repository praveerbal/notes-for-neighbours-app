import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotifications() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("No signed-in user. Skipping push token registration.");
    return null;
  }

  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    return null;
  }

  const existingPermission = await Notifications.getPermissionsAsync();
  let finalStatus = existingPermission.status;

  if (existingPermission.status !== "granted") {
    const requestedPermission = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermission.status;
  }

  if (finalStatus !== "granted") {
    console.log("Push notification permission not granted.");
    return null;
  }

  const projectId =
    Constants.easConfig?.projectId ||
    Constants.expoConfig?.extra?.eas?.projectId;

  if (!projectId) {
    throw new Error("Expo project ID was not found.");
  }

  const tokenResponse = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  const expoPushToken = tokenResponse.data;

  const userRef = doc(db, "users", currentUser.uid);

  await setDoc(
    userRef,
    {
      pushToken: expoPushToken,
      pushTokenUpdatedAt: serverTimestamp(),
      notificationsEnabled: true,
    },
    { merge: true }
  );

  console.log("Expo push token saved:", expoPushToken);

  return expoPushToken;
}