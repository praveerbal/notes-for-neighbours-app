import { Text, View } from "react-native";

import Logo from "../components/Logo";
import { styles } from "../styles/globalStyles";

export default function ComingSoonScreen({ route }) {
  const type = route.params?.type || "This feature";

  return (
    <View style={styles.centerPage}>
      <Logo />

      <View style={styles.heroEmojiCircle}>
        <Text style={styles.heroEmoji}>🚧</Text>
      </View>

      <Text style={styles.title}>{type} Coming Soon</Text>
      <Text style={styles.bodyText}>
        We are currently building this part of Notes for Neighbours. Please check
        back soon.
      </Text>
    </View>
  );
}