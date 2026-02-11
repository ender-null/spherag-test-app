import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { setAuth } from "../features/authReducer";
import i18n from "../i18n";
import { useAppDispatch } from "../store";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(
      setAuth({
        accessToken: { token: "TODO", expiration: new Date().toISOString() },
        refreshToken: { token: "TODO", expiration: new Date().toISOString() },
      }),
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <ThemedText>{i18n.t("login.username")}</ThemedText>
      <TextInput
        placeholder={i18n.t("login.username")}
        value={username}
        onChangeText={setUsername}
      />
      <ThemedText>{i18n.t("login.password")}</ThemedText>
      <TextInput
        placeholder={i18n.t("login.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={i18n.t("login.login")} onPress={handleLogin} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
