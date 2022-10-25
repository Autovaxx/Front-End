import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const CustomDatePicker = (props) => {
  const [date, setDate] = useState(moment());
  const [display, setDisplay] = useState(false);

  const onIOSChange = (e, selectedDate) => {
    setDisplay(false);
    setDate(moment(selectedDate));
  };

  const onAndroidChange = (e, selectedDate) => {
    setDisplay(false);
    setDate(moment(selectedDate));
    props.onDateChange(selectedDate);
  };

  const renderAndroidDatePicker = () => {
    return (
      <View>
        {display ? (
          <DateTimePicker
            timeZoneOffsetInMinutes={0}
            value={new Date(date)}
            mode="date"
            minimumDate={new Date(moment().format("YYYY-MM-DD"))}
            maximumDate={
              new Date(moment().add(10, "years").format("YYYY-MM-DD"))
            }
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
          timeZoneOffsetInMinutes={0}
          value={new Date(date)}
          mode="date"
          minimumDate={new Date(moment().format("YYYY-MM-DD"))}
          maximumDate={new Date(moment().add(10, "years").format("YYYY-MM-DD"))}
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
          <Text style={styles.androidDateText}>
            {moment(date).format("MMM DD, YYYY")}
          </Text>
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
    width: "50%",
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
