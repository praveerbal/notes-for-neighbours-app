import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { createInstrumentRequest } from "../services/requestService";
import { styles } from "../styles/globalStyles";

export default function RequestInstrumentScreen({ route, navigation }) {
  const { item } = route.params;

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    area: "",
    reason: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
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

    if (!form.phone.trim()) {
      Alert.alert("Missing phone number", "Please enter your phone number.");
      return false;
    }

    if (!form.area.trim()) {
      Alert.alert(
        "Missing area",
        "Please enter your general area, such as Calgary NW."
      );
      return false;
    }

    if (!form.reason.trim()) {
      Alert.alert(
        "Missing reason",
        "Please explain why you are requesting this instrument."
      );
      return false;
    }

    return true;
  };

  const submitRequest = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const requestId = await createInstrumentRequest(item, form);

      setForm(emptyForm);

      Alert.alert(
        "Request submitted",
        `Your request has been submitted successfully. Request ID: ${requestId}`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Receive"),
          },
        ]
      );
    } catch (error) {
      console.log("Request submission error:", error);

      Alert.alert(
        "Submission failed",
        `Something went wrong while submitting your request.\n\n${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Request Instrument</Text>

      <Text style={styles.screenSubtitle}>You are requesting: {item.name}</Text>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Parent/guardian notice</Text>
        <Text style={styles.warningText}>
          If you are under 18, please have a parent or guardian complete this form
          on your behalf. Notes for Neighbours will not coordinate pickup,
          drop-off, or delivery directly with minors.
        </Text>
      </View>

      <View style={styles.safetyBox}>
        <Text style={styles.safetyTitle}>Privacy protected</Text>
        <Text style={styles.safetyText}>
          Your request will be reviewed by Notes for Neighbours. Donor contact
          details are not shared directly.
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
        placeholder="General area, e.g. Calgary NE"
        placeholderTextColor={COLORS.gray}
        value={form.area}
        onChangeText={(text) => updateField("area", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Why are you requesting this instrument?"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.reason}
        onChangeText={(text) => updateField("reason", text)}
      />

      {isSubmitting ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Submitting request...
          </Text>
        </View>
      ) : (
        <PrimaryButton title="Submit Request" onPress={submitRequest} />
      )}
    </ScrollView>
  );
}