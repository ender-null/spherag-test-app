import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { UIButton } from "@/components/ui/button";
import { UITextInput } from "@/components/ui/textinput";
import { setAuth, setAuthError } from "@/features/authReducer";
import i18n from "@/i18n";
import { login } from "@/services/api";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [username, setUsername] = useState("apppruebatecnica@spherag.com");
  const [password, setPassword] = useState("Usuario2026!");

  const handleLogin = async () => {
    const auth = await login(username, password);
    console.log("auth", auth);
    if (auth) {
      dispatch(setAuth(auth));
    } else {
      dispatch(setAuthError("Invalid username or password"));
    }
  };

  const handleLoginMock = async () => {
    dispatch(
      setAuth({
        accessToken: { token: "TODO", expiration: new Date().toISOString() },
        refreshToken: { token: "TODO", expiration: new Date().toISOString() },
      }),
    );
  };

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
        <UIButton title={i18n.t("login.login")} onPress={handleLoginMock} />
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
