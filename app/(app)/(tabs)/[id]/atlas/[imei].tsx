import { Stack, useLocalSearchParams } from "expo-router";
import i18n from "../../../../../i18n";

export default function AtlasDetailScreen() {
  const { imei } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t("atlas.details", { name: imei }),
        }}
      />
    </>
  );
}
