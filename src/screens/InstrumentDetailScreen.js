import { Image, ScrollView, Text, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import { styles } from "../styles/globalStyles";

export default function InstrumentDetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.detailImage} />
      ) : (
        <View style={styles.detailImagePlaceholder}>
          <Text style={styles.detailImagePlaceholderText}>🎵</Text>
        </View>
      )}

      <View style={styles.detailCard}>
        <Text style={styles.screenTitle}>{item.name}</Text>

        <View style={styles.tagRow}>
          <Text style={styles.tag}>{item.type}</Text>
          <Text style={styles.tag}>{item.condition}</Text>
          <Text style={styles.tag}>{item.area}</Text>
        </View>

        <Text style={styles.detailText}>{item.description}</Text>

        {item.preference ? (
          <Text style={styles.detailText}>
            Donor preference: {item.preference}
          </Text>
        ) : null}

        <View style={styles.safetyBox}>
          <Text style={styles.safetyTitle}>Privacy protected</Text>
          <Text style={styles.safetyText}>
            Donor contact details and exact pickup information are not shown
            publicly. Notes for Neighbours coordinates the next steps.
          </Text>
        </View>

        <PrimaryButton
          title="Request This Instrument"
          onPress={() => navigation.navigate("RequestInstrument", { item })}
        />
      </View>
    </ScrollView>
  );
}