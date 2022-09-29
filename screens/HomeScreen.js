import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

export function RequiredSteps() {
  const requiredSteps = [
    { id: 1, name: "User profile" },
    { id: 2, name: "Vaccination details" },
    { id: 3, name: "Clinic search preferences" },
  ];

  return requiredSteps.map((step) => {
    return (
      <View style={styles.stepsContainer}>
        <Ionicons name="folder" size={25} color="#3AA2FB" />
        <View style={styles.innerStepsContainer}>
          <Text style={styles.steps}>{step.name}</Text>
          <TouchableOpacity>
            <Ionicons name="arrow-forward" size={25} color="#fb3a6a" />
          </TouchableOpacity>
        </View>
      </View>
    );
  });
}

export function CompletedSteps() {
  const completedSteps = [{ id: 1, name: "Clinic Search preferences" }];

  return completedSteps.map((step) => {
    return (
      <View style={styles.stepsContainer}>
        <Ionicons name="checkmark-circle" size={25} color="#2fea6e" />
        <View style={styles.innerStepsContainer}>
          <Text style={styles.steps}>{step.name}</Text>
        </View>
      </View>
    );
  });
}

export function OptionButtons() {
  const buttons = [
    { id: 1, name: "Book Appointments" },
    { id: 2, name: "View Bookings" },
    { id: 3, name: "Change Search Preferences" },
    { id: 4, name: "Account Settings" },
  ];

  return buttons.map((button) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>{button.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });
}

const HomeScreen = () => {
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
              <Ionicons name="menu-outline" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity>
              <Ionicons name="notifications" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>Required Steps</Text>
        </View>
        <View>
          <Text style={{ paddingLeft: 10, fontSize: 12 }}>
            Here's what you need to do to set up your account.
          </Text>
        </View>
        <RequiredSteps></RequiredSteps>
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>Completed</Text>
        </View>
        <CompletedSteps></CompletedSteps>
        <View style={styles.innerContainer}>
          <Text style={[styles.subtitle, { paddingTop: 30 }]}>
            What would you like to do?
          </Text>
        </View>
        <View style={styles.parentBtnContainer}>
          <OptionButtons></OptionButtons>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default HomeScreen;

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
  stepsContainer: {
    marginLeft: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#3AA2FB",
  },
  innerStepsContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  steps: {
    fontSize: 14,
    color: "#3AA2FB",
    padding: "4%",
  },
  parentBtnContainer: {
    marginTop: "5%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "45%",
  },
  button: {
    width: 140,
    height: 140,
    backgroundColor: "#9cc9f1",
    justifyContent: "center",
    borderRadius: 10,
    margin: 4,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
});
