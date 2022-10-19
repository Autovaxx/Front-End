import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const CustomDatePicker = (props) => {
  const [date, setDate] = useState(moment());
  // const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        minimumDate={new Date(moment().format("YYYY-MM-DD"))}
        maximumDate={new Date(moment().add(10, "years").format("YYYY-MM-DD"))}
        onChange={onChange}
      />
    </View>
  );
};

CustomDatePicker.defaultProps = {
  // textStyle: {},
};
export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    paddingTop: "3%",
  },
});
