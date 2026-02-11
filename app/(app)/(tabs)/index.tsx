import { router, Stack } from "expo-router";
import { Button, FlatList, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ThemedText } from "../../../components/themed-text";
import { resetAtlas } from "../../../features/atlasReducer";
import { resetAuth } from "../../../features/authReducer";
import { resetFincas, selectFincas } from "../../../features/fincasReducer";
import i18n from "../../../i18n";
import { useAppDispatch } from "../../../store";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const fincas = useSelector(selectFincas);

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetFincas());
    dispatch(resetAtlas());
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t("fincas.title"),
          headerRight: () => (
            <Button title={i18n.t("login.logout")} onPress={handleLogout} />
          ),
        }}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={fincas}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => router.push(`/${item.id}`)}>
            <ThemedText>{item.name}</ThemedText>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ThemedText>{i18n.t("fincas.empty")}</ThemedText>}
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
