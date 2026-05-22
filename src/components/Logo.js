import { Text, View } from "react-native";
import { styles } from "../styles/globalStyles";

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoMain}>N</Text>
        <Text style={styles.logoNote}>♪</Text>
        <Text style={styles.logoMain}>N</Text>
      </View>
      <Text style={styles.logoLabel}>Notes for Neighbours</Text>
    </View>
  );
}