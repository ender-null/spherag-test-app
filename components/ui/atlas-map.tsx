import darkMap from "@/assets/maps/dark.json";
import lightMap from "@/assets/maps/light.json";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function AtlasMap({ atlas }: { atlas: AtlasDetails }) {
  const theme = useTheme();

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
      customMapStyle={theme.dark ? darkMap : lightMap}
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
