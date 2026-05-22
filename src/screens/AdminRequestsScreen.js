import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    View
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { COLORS } from "../constants/colors";
import {
    approveRequestAndMatchInstrument,
    declineRequest,
    getPendingRequests,
} from "../services/requestService";
import { styles } from "../styles/globalStyles";

export default function AdminRequestsScreen({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const pendingRequests = await getPendingRequests();
      setRequests(pendingRequests);
    } catch (error) {
      console.log("Error loading pending requests:", error);
      Alert.alert(
        "Loading failed",
        `Could not load pending requests.\n\n${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRequests();
    });

    return unsubscribe;
  }, [navigation]);

  const handleApprove = async (requestItem) => {
    Alert.alert(
      "Approve request?",
      `Approve ${requestItem.requesterName}'s request for ${requestItem.instrumentName}? This will mark the instrument as matched and remove it from the public Receive page.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Approve",
          onPress: async () => {
            try {
              setActionLoadingId(requestItem.id);

              await approveRequestAndMatchInstrument(requestItem);

              Alert.alert(
                "Request approved",
                "The request was approved and the instrument was marked as matched."
              );

              loadRequests();
            } catch (error) {
              console.log("Approve request error:", error);
              Alert.alert(
                "Approval failed",
                `Could not approve request.\n\n${error.message}`
              );
            } finally {
              setActionLoadingId(null);
            }
          },
        },
      ]
    );
  };

  const handleDecline = async (requestItem) => {
    Alert.alert(
      "Decline request?",
      `Decline ${requestItem.requesterName}'s request for ${requestItem.instrumentName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Decline",
          style: "destructive",
          onPress: async () => {
            try {
              setActionLoadingId(requestItem.id);

              await declineRequest(requestItem);

              Alert.alert("Request declined", "The request was declined.");

              loadRequests();
            } catch (error) {
              console.log("Decline request error:", error);
              Alert.alert(
                "Decline failed",
                `Could not decline request.\n\n${error.message}`
              );
            } finally {
              setActionLoadingId(null);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Admin Requests</Text>
      <Text style={styles.screenSubtitle}>
        Review pending instrument requests. Approving a request marks the
        instrument as matched and removes it from the public list.
      </Text>

      {isLoading && (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Loading requests...
          </Text>
        </View>
      )}

      {!isLoading && requests.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No pending requests</Text>
          <Text style={styles.emptyText}>
            When someone requests an instrument, it will appear here.
          </Text>
        </View>
      )}

      {!isLoading &&
        requests.map((requestItem) => (
          <View key={requestItem.id} style={styles.adminCard}>
            <Text style={styles.adminCardTitle}>
              {requestItem.instrumentName}
            </Text>

            <Text style={styles.adminCardMeta}>
              Requested by: {requestItem.requesterName}
            </Text>

            <Text style={styles.adminCardText}>
              Email: {requestItem.requesterEmail}
            </Text>

            <Text style={styles.adminCardText}>
              Phone: {requestItem.requesterPhone}
            </Text>

            <Text style={styles.adminCardText}>
              Requester area: {requestItem.requesterArea}
            </Text>

            <Text style={styles.adminCardText}>
              Instrument area: {requestItem.instrumentArea}
            </Text>

            <View style={styles.reasonBox}>
              <Text style={styles.reasonTitle}>Reason</Text>
              <Text style={styles.reasonText}>{requestItem.reason}</Text>
            </View>

            {actionLoadingId === requestItem.id ? (
              <View style={{ marginTop: 16, alignItems: "center" }}>
                <ActivityIndicator size="large" color={COLORS.blue} />
                <Text style={{ marginTop: 8, color: COLORS.gray }}>
                  Updating request...
                </Text>
              </View>
            ) : (
              <>
                <PrimaryButton
                  title="Approve & Match Instrument"
                  onPress={() => handleApprove(requestItem)}
                />

                <SecondaryButton
                  title="Decline Request"
                  onPress={() => handleDecline(requestItem)}
                />
              </>
            )}
          </View>
        ))}
    </ScrollView>
  );
}