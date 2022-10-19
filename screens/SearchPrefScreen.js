import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import CustomDatePicker from "../components/datePicker";

const SearchPrefScreen = () => {
  const navigation = useNavigation();
  const handleHome = () => {
    console.log("View Home page");
    navigation.navigate("Home");
  };
  const StatusBarHeight = Constants.StatusBarHeight;
  return (
    <KeyboardAvoidingView
      style={[styles.container, { marginTop: StatusBarHeight }]}
      behavior="padding"
    >
      <View style={styles.innerContainer}>
        <View style={styles.innerTitleContainer}>
          <TouchableOpacity onPress={handleHome}>
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Applications</Text>
          <TouchableOpacity>
            <Ionicons name="notifications" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innerDateContainer}>
        <Text style={styles.datetitle}>Start Date:</Text>
        <CustomDatePicker />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchPrefScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    paddingTop: "10%",
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  innerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerDateContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: "3%",
  },
  subtitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    padding: "3%",
  },
  datetitle: {
    width: "50%",
    fontSize: 20,
    fontWeight: "bold",
    padding: "3%",
  },
});
