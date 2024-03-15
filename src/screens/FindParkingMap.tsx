import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function FindParkingMap() {
  const utkCoordinates = {
    latitude: 35.950996196,
    longitude: -83.924662968,
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: utkCoordinates.latitude,
          longitude: utkCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
