import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { REPORTS_ENDPOINT } from "src/utils/constants";
import {
  APIResponse,
  Report,
  parkingGarageLatitudes,
  parkingGarageLongitudes,
  parkingGarages,
} from "src/types/types";

export default function FindParkingMap() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const promises = await Promise.all(
        parkingGarages.map((garage) =>
          fetch(`${REPORTS_ENDPOINT}/${garage}?mostRecent=true`)
        )
      );
      const reportsArray = (await Promise.all(
        promises.map((promise) => promise.json())
      )) as APIResponse<Report>[];

      const reports = [];
      for (const report of reportsArray) {
        if (!report.data) continue;
        if (Array.isArray(report.data)) {
          reports.push(...report.data);
        } else {
          reports.push(report.data);
        }
      }

      setReports(reports);
    };

    fetchReports();
  }, []);

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
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: parkingGarageLatitudes[report.parking_garage],
              longitude: parkingGarageLongitudes[report.parking_garage],
            }}
            title={report.parking_garage}
            description={report.reported_range + " spots available"}
          />
        ))}
      </MapView>
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
