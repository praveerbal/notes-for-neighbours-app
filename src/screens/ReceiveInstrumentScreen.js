import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";
import { getApprovedInstruments } from "../services/instrumentService";
import { styles } from "../styles/globalStyles";

export default function ReceiveInstrumentScreen({ navigation }) {
  const [instruments, setInstruments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadInstruments = async () => {
    try {
      setIsLoading(true);

      const approvedInstruments = await getApprovedInstruments();

      setInstruments(approvedInstruments);
    } catch (error) {
      console.log("Error loading approved instruments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadInstruments();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.screenTitle}>Available Instruments</Text>
      <Text style={styles.screenSubtitle}>
        Browse approved instruments. Exact donor contact details are kept private
        for safety.
      </Text>

      {isLoading && (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>
            Loading instruments...
          </Text>
        </View>
      )}

      {!isLoading && instruments.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No approved instruments yet</Text>
          <Text style={styles.emptyText}>
            Once donations are reviewed and approved, they will appear here.
          </Text>
        </View>
      )}

      {!isLoading &&
        instruments.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.instrumentCard}
            onPress={() => navigation.navigate("InstrumentDetail", { item })}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.instrumentImage} />
            ) : (
              <View style={styles.instrumentImagePlaceholder}>
                <Text style={styles.instrumentImagePlaceholderText}>🎵</Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.instrumentMeta}>
                {item.condition} • {item.area}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}