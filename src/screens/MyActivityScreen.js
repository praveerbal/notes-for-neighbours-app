import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import {
    getMyDonations,
    getMyRequests,
} from "../services/userActivityService";
import { styles } from "../styles/globalStyles";

function getDonationStatusInfo(status) {
  switch (status) {
    case "pending":
      return {
        label: "Pending Review",
        message:
          "Your donation has been submitted and is waiting for review by Notes for Neighbours.",
      };

    case "approved":
      return {
        label: "Approved",
        message:
          "Your instrument has been approved and is now visible to applicants in the app.",
      };

    case "matched":
      return {
        label: "Matched",
        message:
          "Your instrument has been matched with a recipient. Notes for Neighbours will coordinate the next steps.",
      };

    case "delivered":
      return {
        label: "Delivered",
        message:
          "This donation has been completed. Thank you for helping make music more accessible.",
      };

    case "declined":
      return {
        label: "Declined",
        message:
          "This donation was not approved. This may be due to condition, safety, suitability, or current program needs.",
      };

    default:
      return {
        label: "Pending",
        message:
          "Your donation status is being updated. Please check back later.",
      };
  }
}

function getRequestStatusInfo(status) {
  switch (status) {
    case "pending":
      return {
        label: "Pending Review",
        message:
          "Your request has been submitted and is waiting for review by Notes for Neighbours.",
      };

    case "approved":
      return {
        label: "Approved",
        message:
          "You have been selected for this instrument. Notes for Neighbours will contact you with next steps.",
      };

    case "declined":
      return {
        label: "Declined",
        message:
          "This request was not selected. You may still be eligible for other instruments or future support.",
      };

    default:
      return {
        label: "Pending",
        message:
          "Your request status is being updated. Please check back later.",
      };
  }
}

function StatusBadge({ label }) {
  return (
    <View style={styles.statusPill}>
      <Text style={styles.statusPillText}>{label}</Text>
    </View>
  );
}

function DonationActivityCard({ donation }) {
  const statusInfo = getDonationStatusInfo(donation.status);

  return (
    <View style={styles.activityCard}>
      {donation.imageUrl ? (
        <Image source={{ uri: donation.imageUrl }} style={styles.activityImage} />
      ) : (
        <View style={styles.activityImagePlaceholder}>
          <Text style={styles.activityImagePlaceholderText}>🎵</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View style={styles.activityHeaderRow}>
          <Text style={styles.activityTitle}>{donation.instrumentType}</Text>
          <StatusBadge label={statusInfo.label} />
        </View>

        <Text style={styles.activityMeta}>
          {donation.condition} • {donation.area}
        </Text>

        <Text style={styles.statusMessage}>{statusInfo.message}</Text>

        <Text style={styles.activityText}>
          Preference: {donation.preference}
        </Text>

        {donation.notes ? (
          <Text style={styles.activityText}>Notes: {donation.notes}</Text>
        ) : null}
      </View>
    </View>
  );
}

function RequestActivityCard({ request }) {
  const statusInfo = getRequestStatusInfo(request.status);

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityImagePlaceholder}>
        <Text style={styles.activityImagePlaceholderText}>🎻</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.activityHeaderRow}>
          <Text style={styles.activityTitle}>{request.instrumentName}</Text>
          <StatusBadge label={statusInfo.label} />
        </View>

        <Text style={styles.activityMeta}>
          Instrument area: {request.instrumentArea}
        </Text>

        <Text style={styles.statusMessage}>{statusInfo.message}</Text>

        <Text style={styles.activityText}>
          Your area: {request.requesterArea}
        </Text>

        {request.reason ? (
          <Text style={styles.activityText}>Reason: {request.reason}</Text>
        ) : null}
      </View>
    </View>
  );
}

export default function MyActivityScreen({ navigation }) {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadActivity = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [myDonations, myRequests] = await Promise.all([
        getMyDonations(),
        getMyRequests(),
      ]);

      setDonations(myDonations);
      setRequests(myRequests);
    } catch (error) {
      console.log("My activity loading error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadActivity();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>My Donations & Requests</Text>

      <Text style={styles.screenSubtitle}>
        Track the status of instruments you donated and requests you submitted.
      </Text>

      <PrimaryButton title="Refresh" onPress={loadActivity} />

      {isLoading ? (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Loading your activity...
          </Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Could not load activity</Text>
          <Text style={styles.emptyText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>
              My Donations ({donations.length})
            </Text>

            {donations.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No donations yet</Text>
                <Text style={styles.emptyText}>
                  Instruments you donate will appear here after you submit them.
                </Text>
              </View>
            ) : (
              donations.map((donation) => (
                <DonationActivityCard key={donation.id} donation={donation} />
              ))
            )}
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>
              My Requests ({requests.length})
            </Text>

            {requests.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No requests yet</Text>
                <Text style={styles.emptyText}>
                  Instrument requests you submit will appear here.
                </Text>
              </View>
            ) : (
              requests.map((request) => (
                <RequestActivityCard key={request.id} request={request} />
              ))
            )}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}