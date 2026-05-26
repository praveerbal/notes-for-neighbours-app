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
import { createVolunteerApplication } from "../services/volunteerService";
import { styles } from "../styles/globalStyles";

export default function VolunteerScreen() {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    ageOrGrade: "",
    schoolOrOrganization: "",
    areasOfInterest: "",
    availability: "",
    experience: "",
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

    if (!form.areasOfInterest.trim()) {
      Alert.alert(
        "Missing volunteer interests",
        "Please tell us how you would like to help."
      );
      return false;
    }

    if (!form.availability.trim()) {
      Alert.alert(
        "Missing availability",
        "Please tell us when you are generally available."
      );
      return false;
    }

    return true;
  };

  const submitVolunteerApplication = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const volunteerId = await createVolunteerApplication(form);

      setForm(emptyForm);

      Alert.alert(
        "Volunteer application submitted",
        `Thank you! Your volunteer application was submitted successfully. Submission ID: ${volunteerId}`
      );
    } catch (error) {
      console.log("Volunteer submission error:", error);

      Alert.alert(
        "Submission failed",
        `Something went wrong while submitting your volunteer application.\n\n${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Get Involved</Text>

      <Text style={styles.screenSubtitle}>
        Volunteer with Notes for Neighbours to help collect instruments, support
        students, assist with outreach, or contribute to music-access programs.
      </Text>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Parent/guardian notice</Text>
        <Text style={styles.warningText}>
          If you are under 18, please have a parent or guardian help complete
          this form. Notes for Neighbours may require parent/guardian permission
          before assigning volunteer activities.
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
        placeholder="Age or grade, e.g. 18, Grade 12, university student"
        placeholderTextColor={COLORS.gray}
        value={form.ageOrGrade}
        onChangeText={(text) => updateField("ageOrGrade", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="School or organization, optional"
        placeholderTextColor={COLORS.gray}
        value={form.schoolOrOrganization}
        onChangeText={(text) => updateField("schoolOrOrganization", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="How would you like to help? e.g. pickups, instrument sorting, social media, tutoring, outreach"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.areasOfInterest}
        onChangeText={(text) => updateField("areasOfInterest", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="General availability, e.g. weekends, evenings, summer"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.availability}
        onChangeText={(text) => updateField("availability", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Relevant experience, optional"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.experience}
        onChangeText={(text) => updateField("experience", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Why do you want to volunteer with Notes for Neighbours?"
        placeholderTextColor={COLORS.gray}
        multiline
        value={form.reason}
        onChangeText={(text) => updateField("reason", text)}
      />

      {isSubmitting ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Submitting volunteer application...
          </Text>
        </View>
      ) : (
        <PrimaryButton
          title="Submit Volunteer Application"
          onPress={submitVolunteerApplication}
        />
      )}
    </ScrollView>
  );
}