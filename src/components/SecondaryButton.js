import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/globalStyles";

export default function SecondaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}