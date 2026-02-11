import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)/index" />
      <Stack.Screen name="(tabs)/[id]/index" />
      <Stack.Screen name="(tabs)/[id]/atlas/[imei]" />
    </Stack>
  );
}
