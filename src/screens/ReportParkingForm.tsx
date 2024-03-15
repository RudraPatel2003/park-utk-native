import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";
import {
  APIResponse,
  ParkingGarage,
  Range,
  parkingGarages,
  ranges,
} from "src/types/types";

const REPORTS_ENDPOINT =
  "https://park-utk-native-api-reqfnuoy4a-ue.a.run.app/reports";

export default function ReportParkingForm() {
  const [range, setRange] = useState<Range>("0 - 5");
  const [parkingGarage, setParkingGarage] =
    useState<ParkingGarage>("11th Street (G13)");

  const [showRangeDropDown, setShowRangeDropDown] = useState(false);
  const [showParkingGarageDropDown, setShowParkingGarageDropDown] =
    useState(false);

  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(REPORTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parking_garage: parkingGarage,
          reported_range: range,
        }),
      });

      const data = (await response.json()) as APIResponse<Report>;

      if (!data.success) {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.formHeader}>Report Parking Form</Text>
        <View style={styles.dropDowns}>
          <DropDown
            label={"Parking Garage"}
            mode={"outlined"}
            visible={showParkingGarageDropDown}
            showDropDown={() => setShowParkingGarageDropDown(true)}
            onDismiss={() => setShowParkingGarageDropDown(false)}
            value={parkingGarage}
            setValue={setParkingGarage}
            list={toObjectList(parkingGarages)}
          />
          <DropDown
            label={"Number of Parking Spots"}
            mode={"outlined"}
            visible={showRangeDropDown}
            showDropDown={() => setShowRangeDropDown(true)}
            onDismiss={() => setShowRangeDropDown(false)}
            value={range}
            setValue={setRange}
            list={toObjectList(ranges)}
          />
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Report
        </Button>
      </View>
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        action={{
          label: "Close",
          onPress: () => {
            setShowError(false);
          },
        }}
      >
        There was an error handling your request.
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  formHeader: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  dropDowns: {
    gap: 16,
    marginBottom: 16,
  },
});

function toObjectList(array: readonly string[]) {
  const returnList = [];
  for (const item of array) {
    returnList.push({ label: item, value: item });
  }
  return returnList;
}
