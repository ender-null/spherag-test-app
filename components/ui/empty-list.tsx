import { ThemedText } from "@/components/themed-text";
import i18n from "@/i18n";
import { StyleSheet, View } from "react-native";

export function EmptyList({ text }: { text?: string }) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.text}>
        {text ?? i18n.t("empty")}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: "rgba(128, 128, 128, 0.5)",
    fontWeight: "400",
  },
});
