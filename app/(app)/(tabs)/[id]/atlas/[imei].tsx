import { AtlasDetails } from "@/components/ui/atlas-details";
import { AtlasMap } from "@/components/ui/atlas-map";
import { EmptyList } from "@/components/ui/empty-list";
import {
  fetchAtlasDetails,
  selectAtlasDetailsById,
  selectAtlasDetailsErrorById,
  selectAtlasDetailsLoadingById,
} from "@/features/atlasSlice";
import i18n from "@/i18n";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function AtlasDetailScreen() {
  const dispatch = useAppDispatch();
  const { id, imei } = useLocalSearchParams();
  const theme = useTheme();
  const fincaId = useMemo(() => Number(id), [id]);
  const imeiString = useMemo(() => imei.toString(), [imei]);
  const atlasDetails = useSelector(selectAtlasDetailsById(imeiString));
  const loadingState = useSelector(selectAtlasDetailsLoadingById(imeiString));
  const error = useSelector(selectAtlasDetailsErrorById(imeiString));

  const title = useMemo(() => {
    return atlasDetails?.name ?? i18n.t("atlas.title");
  }, [atlasDetails]);

  useEffect(() => {
    if (atlasDetails?.imei !== imeiString) {
      dispatch(fetchAtlasDetails({ fincaId, imei: imeiString }));
    }
  }, [dispatch, loadingState, atlasDetails, fincaId, imeiString]);

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerTransparent: isLiquidGlassAvailable(),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.primary}
            refreshing={loadingState === "loading"}
            onRefresh={() =>
              dispatch(fetchAtlasDetails({ fincaId, imei: imeiString }))
            }
          />
        }
      >
        {loadingState === "success" && (
          <View style={styles.container}>
            <AtlasMap atlas={atlasDetails!} />
            <AtlasDetails atlas={atlasDetails!} />
          </View>
        )}
        {loadingState === "error" && (
          <EmptyList text={error ?? i18n.t("atlas.error")} />
        )}
        {loadingState === "loading" && (
          <ActivityIndicator color={theme.colors.primary} />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});
