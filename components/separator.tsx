import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

export function Separator() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.border,
        height: StyleSheet.hairlineWidth,
      }}
    />
  );
}
