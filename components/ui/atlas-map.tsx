import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function AtlasMap({ atlas }: { atlas: AtlasDetails }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: Number(atlas?.latitude) ?? 0,
        longitude: Number(atlas?.longitude) ?? 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      scrollEnabled={false}
    >
      <Marker
        coordinate={{
          latitude: Number(atlas?.latitude) ?? 0,
          longitude: Number(atlas?.longitude) ?? 0,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 200,
    borderRadius: 32,
    marginHorizontal: 16,
  },
});
