import darkMap from '@/assets/maps/dark.json';
import lightMap from '@/assets/maps/light.json';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export function AtlasMap({ atlas }: { atlas: AtlasDetails }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Number(atlas?.latitude) ?? 0,
          longitude: Number(atlas?.longitude) ?? 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        scrollEnabled={false}
        customMapStyle={theme.dark ? darkMap : lightMap}
      >
        <Marker
          coordinate={{
            latitude: Number(atlas?.latitude) ?? 0,
            longitude: Number(atlas?.longitude) ?? 0,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderRadius: 32, marginHorizontal: 16, overflow: 'hidden' },
  map: {
    flex: 1,
    height: 200,
  },
});
