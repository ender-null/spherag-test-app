import { ConfigContext, ExpoConfig } from "expo/config";
import "tsx/cjs";
import { supportedLocales } from "./i18n";

export default ({ config }: ConfigContext): ExpoConfig => {
  config.plugins = [
    ...(config.plugins || []),
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: supportedLocales,
          android: supportedLocales,
        },
      },
    ],
  ];
  const localeAssets: Record<string, string> = supportedLocales.reduce(
    (acc, lang) => {
      acc[lang] = `./assets/languages/${lang}-meta.json`;
      return acc;
    },
    {} as Record<string, string>,
  );

  config.locales = {
    ...config.locales,
    ...localeAssets,
  };

  config.extra = {
    ...config.extra,
    API_ENDPOINT: process.env.EXPO_PUBLIC_API_ENDPOINT,
    API_LOGIN_ENDPOINT: process.env.EXPO_PUBLIC_API_LOGIN_ENDPOINT,
  };
  return config as ExpoConfig;
};
