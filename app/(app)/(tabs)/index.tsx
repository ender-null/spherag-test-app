import { Separator } from "@/components/separator";
import { ThemedText } from "@/components/themed-text";
import { FincaItem } from "@/components/ui/finca-item";
import { resetAtlas } from "@/features/atlasReducer";
import { resetAuth } from "@/features/authReducer";
import { resetFincas, selectFincas } from "@/features/fincasReducer";
import i18n from "@/i18n";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { Button, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
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
          headerTransparent: isLiquidGlassAvailable(),
          headerRight: () => (
            <Button
              title={i18n.t("login.logout")}
              onPress={handleLogout}
              color={
                isLiquidGlassAvailable()
                  ? theme.colors.text
                  : theme.colors.primary
              }
            />
          ),
        }}
      />
      <FlatList
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        data={fincas}
        renderItem={({ item }) => <FincaItem key={item.id} finca={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ThemedText>{i18n.t("fincas.empty")}</ThemedText>}
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
