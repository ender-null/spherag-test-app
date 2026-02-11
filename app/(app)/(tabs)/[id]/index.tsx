import { Separator } from "@/components/separator";
import { ThemedText } from "@/components/themed-text";
import { AtlasItem } from "@/components/ui/atlas-item";
import { selectAtlasById } from "@/features/atlasReducer";
import i18n from "@/i18n";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function AtlasListScreen() {
  const { id } = useLocalSearchParams();
  const atlasList = useSelector(selectAtlasById(id.toString()));

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t("atlas.title"),
          headerTransparent: isLiquidGlassAvailable(),
        }}
      />
      <FlatList
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        data={atlasList}
        renderItem={({ item }) => (
          <AtlasItem key={item.id} fincaId={id.toString()} atlas={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ThemedText>{i18n.t("atlas.empty")}</ThemedText>}
        ItemSeparatorComponent={() => <Separator />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
