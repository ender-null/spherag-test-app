import { Separator } from "@/components/separator";
import { AtlasItem } from "@/components/ui/atlas-item";
import { EmptyList } from "@/components/ui/empty-list";
import {
  fetchAtlas,
  selectAtlasById,
  selectAtlasHasNextPageById,
  selectAtlasLoadingById,
  selectAtlasLoadingMoreById,
} from "@/features/atlasSlice";
import { selectFincaById } from "@/features/fincasSlice";
import i18n from "@/i18n";
import { useAppDispatch } from "@/store";
import { useTheme } from "@react-navigation/native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function AtlasListScreen() {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const fincaId = useMemo(() => Number(id), [id]);
  const atlasList = useSelector(selectAtlasById(fincaId));
  const finca = useSelector(selectFincaById(fincaId));
  const loadingState = useSelector(selectAtlasLoadingById(fincaId));
  const loadingMoreState = useSelector(selectAtlasLoadingMoreById(fincaId));
  const hasNextPage = useSelector(selectAtlasHasNextPageById(fincaId));

  const title = useMemo(() => {
    if (finca) {
      return finca.name;
    }
    return i18n.t("atlas.title");
  }, [finca]);

  const isLoading = useMemo(() => loadingState === "loading", [loadingState]);
  const isLoadingMore = useMemo(
    () => loadingMoreState === "loading",
    [loadingMoreState],
  );
  const [page, setPage] = useState(1);

  const handleLoadMore = useCallback(async () => {
    if (!hasNextPage) return;
    setPage(page + 1);
    dispatch(fetchAtlas({ fincaId: Number(id), init: page + 1 }));
  }, [dispatch, page, id, hasNextPage]);

  useEffect(() => {
    if (!atlasList || loadingState === "pending") {
      dispatch(fetchAtlas({ fincaId: Number(id), init: 1 }));
    }
  }, [atlasList, loadingState, dispatch, id, page]);

  return (
    <>
      <Stack.Screen
        options={{
          title,
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
        ListEmptyComponent={() => <EmptyList text={i18n.t("atlas.empty")} />}
        ItemSeparatorComponent={() => <Separator spacing />}
        refreshing={isLoading}
        onRefresh={() => dispatch(fetchAtlas({ fincaId: Number(id), init: 1 }))}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : null
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
