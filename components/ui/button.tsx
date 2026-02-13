import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface UIButtonProps extends TouchableOpacityProps {
  title: string;
}

export function UIButton({ title, ...props }: UIButtonProps) {
  const theme = useTheme();
  const backgroundColor = theme.colors.primary;

  return (
    <TouchableOpacity {...props} style={[styles.button, { backgroundColor }]}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    color: "white",
  },
  text: {
    color: "white",
  },
});
