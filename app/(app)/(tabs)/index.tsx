import { Separator } from '@/components/separator';
import { UIButton } from '@/components/ui/button';
import { EmptyList } from '@/components/ui/empty-list';
import { FincaItem } from '@/components/ui/finca-item';
import { resetAtlas } from '@/features/atlasSlice';
import { resetAuth, selectAuthToken } from '@/features/authSlice';
import {
  fetchFincas,
  resetFincas,
  selectFincas,
  selectFincasLoading,
} from '@/features/fincasSlice';
import i18n from '@/i18n';
import { useAppDispatch } from '@/store';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Button, FlatList, Platform, RefreshControl, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fincas = useSelector(selectFincas);
  const loadingState = useSelector(selectFincasLoading);
  const authToken = useSelector(selectAuthToken);

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetFincas());
    dispatch(resetAtlas());
  };

  useEffect(() => {
    if (loadingState === 'pending' && authToken !== null) {
      dispatch(fetchFincas());
    }
  }, [dispatch, loadingState, authToken]);

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t('fincas.title'),
          headerRight: () =>
            Platform.OS === 'ios' ? (
              <Button
                title={i18n.t('login.logout')}
                onPress={handleLogout}
                color={theme.colors.text}
              />
            ) : (
              <UIButton title={i18n.t('login.logout')} onPress={handleLogout} autoSize />
            ),
        }}
      />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        data={fincas}
        renderItem={({ item }) => <FincaItem finca={item} />}
        keyExtractor={(item) => `finca-${item.id}`}
        ListEmptyComponent={() => <EmptyList text={i18n.t('fincas.empty')} />}
        ItemSeparatorComponent={() => <Separator spacing />}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
            progressBackgroundColor={theme.colors.card}
            refreshing={loadingState === 'loading'}
            onRefresh={() => dispatch(fetchFincas())}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
});
