import { Separator } from "@/components/separator";
import { EmptyList } from "@/components/ui/empty-list";
import { FincaItem } from "@/components/ui/finca-item";
import { resetAtlas } from "@/features/atlasSlice";
import { resetAuth, selectAuthToken } from "@/features/authSlice";
import {
  fetchFincas,
  resetFincas,
  selectFincas,
  selectFincasLoading,
} from "@/features/fincasSlice";
import i18n from "@/i18n";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { useEffect, useMemo } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fincas = useSelector(selectFincas);
  const loadingState = useSelector(selectFincasLoading);
  const loading = useMemo(() => loadingState === "loading", [loadingState]);
  const authToken = useSelector(selectAuthToken);

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetFincas());
    dispatch(resetAtlas());
  };

  useEffect(() => {
    if (loadingState === "pending" && authToken !== null) {
      dispatch(fetchFincas());
    }
  }, [dispatch, loadingState, authToken]);

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
        ListEmptyComponent={() => <EmptyList text={i18n.t("fincas.empty")} />}
        ItemSeparatorComponent={() => <Separator spacing />}
        refreshing={loading}
        onRefresh={() => dispatch(fetchFincas())}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
