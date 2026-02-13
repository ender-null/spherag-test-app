/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const primaryColor = 'rgb(145, 223, 247)';
export const secondaryColor = 'rgb(40, 51, 112)';
export const tertiaryColor = 'rgb(0, 191, 255)';

export const Colors = {
  light: {
    background: '#f2f2f6',
    card: '#ffffff',
    text: secondaryColor,
    tint: primaryColor,
    icon: '#687076',
  },
  dark: {
    background: '#1c1c1e',
    card: '#2c2c2e',
    text: '#ECEDEE',
    tint: primaryColor,
    icon: '#9BA1A6',
  },
};

export const ThemedDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.tint,
    text: Colors.light.text,
    background: Colors.light.background,
    card: Colors.light.card,
  },
};

export const ThemedDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.tint,
    text: Colors.dark.text,
    background: Colors.dark.background,
    card: Colors.dark.card,
  },
};
