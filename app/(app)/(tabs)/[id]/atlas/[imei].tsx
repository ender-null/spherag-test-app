import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import i18n from "../../../../../i18n";

export default function AtlasDetailScreen() {
  const { imei } = useLocalSearchParams();

  const title = useMemo(() => {
    return i18n.t("atlas.details", { name: imei });
  }, [imei]);

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerTransparent: isLiquidGlassAvailable(),
        }}
      />
    </>
  );
}
