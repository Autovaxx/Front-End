import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export function ContactDetails() {
  const contactDetails = [
    { id: 1, name: "Email" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Type" },
  ];

  return contactDetails.map((label, i) => {
    return (
      <View key={i} style={styles.innerContainer}>
        <Text style={styles.text}>{label.name}</Text>
        <TextInput autoCorrect={false} style={styles.textInput} />
      </View>
    );
  });
}

export function EmergencyDetails() {
  const emergencyDetails = [
    { id: 1, name: "Full Name" },
    { id: 2, name: "Relationship" },
    { id: 3, name: "Phone" },
  ];

  return emergencyDetails.map((label, i) => {
    return (
      <View key={i} style={styles.innerContainer}>
        <Text style={styles.text}>{label.name}</Text>
        <TextInput autoCorrect={false} style={styles.textInput} />
      </View>
    );
  });
}

const ContactScreen = () => {
  const StatusBarHeight = Constants.StatusBarHeight;
  const navigation = useNavigation();
  const handleHome = () => {
    console.log("View Home page");
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: StatusBarHeight }]}
        behavior="padding"
      >
        <TouchableOpacity>
          <Ionicons
            onPress={handleHome}
            name="arrow-back"
            size={25}
            color="#fb3a6a"
          />
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <View style={[styles.innerTitleContainer, { marginTop: "1%" }]}>
            <Text style={styles.title}>Contact Information</Text>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={[styles.subtitle, { marginTop: "5%" }]}>
            Contact Details
          </Text>
        </View>
        <ContactDetails></ContactDetails>
        <View style={styles.innerContainer}>
          <Text style={[styles.subtitle, { marginTop: "5%" }]}>
            Emergency Contact
          </Text>
        </View>
        <EmergencyDetails></EmergencyDetails>
        <View style={styles.innerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ContactScreen;

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
  text: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    fontWeight: "bold",
    color: "white",
    padding: 15,
    textAlign: "center",
    backgroundColor: "#fb3a6a",
    borderColor: "#fb3a6a",
  },
  textInput: {
    flex: 2,
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "white",
    borderColor: "#3AA2FB",
  },
  buttonContainer: {
    width: "80%",
    marginTop: "15%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FB2876",
    width: "100%",
    padding: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
