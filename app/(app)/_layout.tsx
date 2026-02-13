import { useTheme } from '@react-navigation/native';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontFamily: 'NunitoSemiBold' },
        headerBackTitleStyle: { fontFamily: 'NunitoSemiBold' },
        headerTransparent: isLiquidGlassAvailable(),
      }}
    >
      <Stack.Screen name="(tabs)/index" />
      <Stack.Screen name="(tabs)/[id]/index" />
      <Stack.Screen name="(tabs)/[id]/atlas/[imei]" />
    </Stack>
  );
}
