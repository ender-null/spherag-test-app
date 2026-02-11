import { router, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ThemedText } from "../../../../components/themed-text";
import { selectAtlasById } from "../../../../features/atlasReducer";
import i18n from "../../../../i18n";

export default function AtlasListScreen() {
  const { id } = useLocalSearchParams();
  const atlasList = useSelector(selectAtlasById(id.toString()));

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t("atlas.title"),
        }}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={atlasList}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/${id}/atlas/${item.imei}`)}
          >
            <ThemedText>{item.name}</ThemedText>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ThemedText>{i18n.t("atlas.empty")}</ThemedText>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
