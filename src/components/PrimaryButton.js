import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/globalStyles";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}