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
import { useNavigation } from "@react-navigation/native";

export function RequiredSteps() {
  const navigation = useNavigation();

  const handleContact = () => {
    console.log("Contact Information page");
    navigation.navigate("Contact");
  };
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleVaccinations = () => {
    navigation.navigate("VaccineInfo");
  };

  const requiredSteps = [
    { id: 1, name: "User profile", route: handleProfile },
    { id: 2, name: "Vaccination details", route: handleVaccinations },
    { id: 3, name: "Clinic search preferences", route: handleProfile },
    { id: 4, name: "Contact Information", route: handleContact },
  ];

  return requiredSteps.map((step, i) => {
    return (
      <TouchableOpacity key={i} onPress={step.route}>
        <View style={styles.stepsContainer}>
          <Ionicons name="close-circle" size={25} color="#ff0000" />
          {/*<Ionicons name="checkmark-circle" size={25} color="#2fea6e" />*/}
          <View style={styles.innerStepsContainer}>
            <Text style={styles.steps}>{step.name}</Text>
            <Ionicons name="arrow-forward" size={25} color="#fb3a6a" />
          </View>
        </View>
      </TouchableOpacity>
    );
  });
}

export function OptionButtons() {
  const navigation = useNavigation();
  const handleSearchPref = () => {
    console.log("Search Preferences page");
    navigation.navigate("SearchPref");
  };
  const handleViewBookings = () => {
    console.log("View Bookings page");
    navigation.navigate("ViewBooking");
  };
  const handleHome = () => {
    console.log("View Home page");
    navigation.navigate("Home");
  };
  const buttons = [
    { id: 1, name: "Book Appointments", route: handleHome },
    { id: 2, name: "View Bookings", route: handleViewBookings },
    { id: 3, name: "Change Search Preferences", route: handleSearchPref },
    { id: 4, name: "Account Settings", route: handleHome },
  ];

  return buttons.map((button, i) => {
    return (
      <View key={i} style={styles.buttonContainer}>
        <TouchableOpacity onPress={button.route} style={styles.button}>
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
