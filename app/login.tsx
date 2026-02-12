import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { UIButton } from "@/components/ui/button";
import { UITextInput } from "@/components/ui/textinput";
import {
  fetchAuth,
  selectAuthError,
  selectAuthLoadingState,
} from "@/features/authReducer";
import i18n from "@/i18n";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const loadingState = useSelector(selectAuthLoadingState);
  const error = useSelector(selectAuthError);

  const [username, setUsername] = useState("apppruebatecnica@spherag.com");
  const [password, setPassword] = useState("Usuario2026!");

  const handleLogin = async () => {
    dispatch(fetchAuth({ username, password }));
  };

  useEffect(() => {
    if (loadingState === "error" && error) {
      Alert.alert(i18n.t("login.error"), error);
    }
  }, [loadingState, error]);

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedView
        style={[styles.content, { backgroundColor: theme.colors.card }]}
      >
        <ThemedText type="title">Login</ThemedText>
        <UITextInput
          placeholder={i18n.t("login.username")}
          value={username}
          onChangeText={setUsername}
        />
        <UITextInput
          placeholder={i18n.t("login.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <UIButton
          title={i18n.t("login.login")}
          onPress={handleLogin}
          disabled={loadingState === "loading"}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 24,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
    borderRadius: 42,
  },
});
