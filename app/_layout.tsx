import { selectAuthToken } from "@/features/authReducer";
import { useColorScheme } from "@/hooks/use-color-scheme";
import i18n from "@/i18n";
import { persistor, store } from "@/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { getLocales } from "expo-localization";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { IconContext } from "phosphor-react-native";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  i18n.locale = getLocales()[0].languageCode ?? "en";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={theme}>
          <IconContext.Provider
            value={{
              color: theme.colors.text,
              size: 28,
              weight: "regular",
            }}
          >
            <RootNavigator />
            <StatusBar style="auto" />
          </IconContext.Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export function RootNavigator() {
  const segments = useSegments();
  const router = useRouter();

  const isLoggedIn = useSelector(selectAuthToken);
  useEffect(() => {
    const inAppGroup = segments[0] === "(app)";

    if (!isLoggedIn && inAppGroup) {
      router.replace("/login");
    }

    if (isLoggedIn && !inAppGroup) {
      router.replace("/(app)/(tabs)");
    }
  }, [router, isLoggedIn, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
