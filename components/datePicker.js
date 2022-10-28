import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = (props) => {
  const [display, setDisplay] = useState(false);

  const onIOSChange = (e, selectedDate) => {
    setDisplay(false);
    props.update(selectedDate);
  };

  const onAndroidChange = (e, selectedDate) => {
    setDisplay(false);
    props.onDateChange(selectedDate);
    props.update(selectedDate);
  };

  const renderAndroidDatePicker = () => {
    return (
      <View>
        {display ? (
          <DateTimePicker
            value={new Date(props.value)}
            mode="date"
            minimumDate={new Date()}
            onChange={onAndroidChange}
          />
        ) : null}
      </View>
    );
  };

  const renderIOSDatePicker = () => {
    return (
      <View>
        <DateTimePicker
          value={new Date(props.value)}
          mode="date"
          minimumDate={new Date()}
          onChange={onIOSChange}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "ios" ? "3%" : "2%",
        },
      ]}
    >
      {Platform.OS === "ios" ? null : (
        <TouchableOpacity
          style={styles.androidDate}
          onPress={() => setDisplay(true)}
        >
          <Text
            style={styles.androidDateText}
            value={date.toLocaleDateString()}
          />
        </TouchableOpacity>
      )}
      {Platform.OS === "ios"
        ? renderIOSDatePicker()
        : renderAndroidDatePicker()}
    </View>
  );
};

CustomDatePicker.defaultProps = {};
export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: "5%",
    fontSize: 12,
  },
  androidDate: {
    width: "90%",
    backgroundColor: "#dddddd",
    borderColor: "red",
    padding: "2%",
    borderRadius: 8,
  },
  androidDateText: {
    fontSize: 20,
  },
});
