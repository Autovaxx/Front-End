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

const BookingScreen = () => {
  const StatusBarHeight = Constants.StatusBarHeight;
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: StatusBarHeight }]}
        behavior="padding"
      >
        <View style={styles.innerContainer}>
          <View style={styles.innerTitleContainer}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Applications</Text>
            <TouchableOpacity>
              <Ionicons name="notifications" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.innerInputContainer}>
            <Ionicons name="search" size={24} color="#FB2876" />
            <TextInput
              style={styles.input}
              placeholder="Enter a location"
              autoCorrect={false}
              autoCapitalize={false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default BookingScreen;

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
  inputContainer: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  innerInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#3AA2FB",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
    flex: 1,
    color: "white",
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
});
