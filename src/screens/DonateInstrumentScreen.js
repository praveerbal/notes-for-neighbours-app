import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { COLORS } from "../constants/colors";
import { createDonation } from "../services/donationService";
import { styles } from "../styles/globalStyles";

export default function DonateInstrumentScreen() {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    instrumentType: "",
    condition: "",
    area: "",
    preference: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert("Photo error", "Something went wrong while picking the photo.");
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return false;
    }

    if (!form.email.trim()) {
      Alert.alert("Missing email", "Please enter your email.");
      return false;
    }

    if (!form.instrumentType.trim()) {
      Alert.alert("Missing instrument type", "Please enter the instrument type.");
      return false;
    }

    if (!form.condition.trim()) {
      Alert.alert("Missing condition", "Please enter the instrument condition.");
      return false;
    }

    if (!form.area.trim()) {
      Alert.alert(
        "Missing area",
        "Please enter your general area, such as Calgary NW."
      );
      return false;
    }

    if (!form.preference.trim()) {
      Alert.alert(
        "Missing pickup/drop-off preference",
        "Please tell us whether you prefer pickup or drop-off."
      );
      return false;
    }

    return true;
  };

  const submitDonation = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const donationId = await createDonation(form, photo);

      setForm(emptyForm);
      setPhoto(null);

      Alert.alert(
        "Donation submitted",
        `Thank you! Your donation was submitted successfully. Submission ID: ${donationId}`
      );
    } catch (error) {
      console.log("Donation submission error:", error);

      Alert.alert(
        "Submission failed",
        `Something went wrong while submitting your donation.\n\n${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Donate an Instrument</Text>
      <Text style={styles.screenSubtitle}>
        Help a student begin or continue their music journey.
      </Text>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Parent/guardian notice</Text>
        <Text style={styles.warningText}>
          If you are under 18, please have a parent or guardian complete this form
          on your behalf. Notes for Neighbours will not coordinate pickup,
          drop-off, or delivery directly with minors.
        </Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Donation safety note</Text>
        <Text style={styles.warningText}>
          For health and safety reasons, Notes for Neighbours does not currently
          accept mouth-blown instruments such as woodwind or brass instruments
          unless specially approved.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your full name"
        placeholderTextColor={COLORS.gray}
        value={form.name}
        onChangeText={(text) => updateField("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.gray}
        value={form.email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => updateField("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor={COLORS.gray}
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => updateField("phone", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Instrument type, e.g. guitar, keyboard, violin"
        placeholderTextColor={COLORS.gray}
        value={form.instrumentType}
        onChangeText={(text) => updateField("instrumentType", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Condition, e.g. good, needs repair"
        placeholderTextColor={COLORS.gray}
        value={form.condition}
        onChangeText={(text) => updateField("condition", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="General area, e.g. Calgary NW"
        placeholderTextColor={COLORS.gray}
        value={form.area}
        onChangeText={(text) => updateField("area", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Pickup or drop-off preference"
        placeholderTextColor={COLORS.gray}
        value={form.preference}
        onChangeText={(text) => updateField("preference", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Extra notes"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.notes}
        onChangeText={(text) => updateField("notes", text)}
      />

      <SecondaryButton title="Upload Instrument Photo" onPress={pickImage} />

      {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}

      {isSubmitting ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Submitting donation...
          </Text>
        </View>
      ) : (
        <PrimaryButton title="Submit Donation" onPress={submitDonation} />
      )}
    </ScrollView>
  );
}