import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function UITextInput({ ...props }: TextInputProps) {
  const theme = useTheme();

  const backgroundColor = useMemo(() => {
    if (theme.dark) {
      return theme.colors.card;
    }
    return theme.colors.card;
  }, [theme]);

  return (
    <TextInput
      {...props}
      style={[styles.input, { color: theme.colors.text, backgroundColor }]}
      placeholderTextColor={theme.colors.text}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(128, 128, 128, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
