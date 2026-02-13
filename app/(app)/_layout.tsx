import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'NunitoSemiBold' } }}>
      <Stack.Screen name="(tabs)/index" />
      <Stack.Screen name="(tabs)/[id]/index" />
      <Stack.Screen name="(tabs)/[id]/atlas/[imei]" />
    </Stack>
  );
}
