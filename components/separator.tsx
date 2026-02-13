import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

export function Separator({ spacing = false }: { spacing?: boolean }) {
  const theme = useTheme();

  if (spacing) {
    return <View style={{ height: 16 }} />;
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.border,
        height: StyleSheet.hairlineWidth,
      }}
    />
  );
}
