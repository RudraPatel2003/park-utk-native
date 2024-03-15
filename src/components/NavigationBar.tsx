import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { FindParkingMap, ReportParkingForm } from "src/screens";

export default function NavigationBar() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "findParking",
      title: "Find Parking",
      focusedIcon: "map-marker",
      unfocusedIcon: "map-marker-outline",
    },
    {
      key: "reportParking",
      title: "Report Parking Spots",
      focusedIcon: "eye",
      unfocusedIcon: "eye-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    findParking: FindParkingMap,
    reportParking: ReportParkingForm,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}     
    />
  );
}

