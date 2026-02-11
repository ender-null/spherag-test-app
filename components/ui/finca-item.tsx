import { ThemedText } from "@/components/themed-text";
import { formatDate } from "@/utils/format";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { FarmIcon, StarIcon } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function FincaItem({ finca }: { finca: Finca }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${finca.id}`)}
      style={styles.item}
    >
      <FarmIcon size={42} weight="light" color={theme.colors.primary} />
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold">{finca.name}</ThemedText>
        <ThemedText>{formatDate(finca.createdDate)}</ThemedText>
      </View>
      <StarIcon weight={finca.favourite ? "fill" : "regular"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
