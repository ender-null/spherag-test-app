import { ThemedDarkTheme, ThemedDefaultTheme } from '@/constants/theme';
import { selectAuthLoadingState, selectAuthToken } from '@/features/authSlice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import i18n from '@/i18n';
import { persistor, store } from '@/store';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { getLocales } from 'expo-localization';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconContext } from 'phosphor-react-native';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? ThemedDarkTheme : ThemedDefaultTheme;
  i18n.locale = getLocales()[0].languageCode ?? 'en';

  const [loaded, error] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoMedium: require('../assets/fonts/Nunito-Medium.ttf'),
    NunitoSemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
    NunitoLight: require('../assets/fonts/Nunito-Light.ttf'),
    NunitoItalic: require('../assets/fonts/Nunito-Italic.ttf'),
  });

  if (loaded || error) {
    SplashScreen.hideAsync();
  }

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={theme}>
          <IconContext.Provider
            value={{
              color: theme.colors.text,
              size: 28,
              weight: 'regular',
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

  const authToken = useSelector(selectAuthToken);
  const loadingState = useSelector(selectAuthLoadingState);

  const isLoggedIn = useMemo(
    () => authToken !== null && loadingState === 'success',
    [authToken, loadingState]
  );

  useEffect(() => {
    const inAppGroup = segments[0] === '(app)';

    if (!isLoggedIn && inAppGroup) {
      router.replace('/login');
    }

    if (isLoggedIn && !inAppGroup) {
      router.replace('/(app)/(tabs)');
    }
  }, [router, isLoggedIn, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
