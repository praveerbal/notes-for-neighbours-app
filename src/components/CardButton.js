import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/globalStyles";

export default function CardButton({ title, subtitle, emoji, onPress }) {
  return (
    <TouchableOpacity style={styles.cardButton} onPress={onPress}>
      <View style={styles.cardAccent} />

      <View style={styles.cardIconBox}>
        <Text style={styles.cardEmoji}>{emoji}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}