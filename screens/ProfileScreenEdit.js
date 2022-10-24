import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export function ProfileDetails() {
  const profileDetails = [
    { id: 1, name: "First Name" },
    { id: 2, name: "Last Name" },
    { id: 3, name: "Gender" },
    { id: 4, name: "Birthdate" },
    { id: 5, name: "Country" },
    { id: 6, name: "Province" },
    { id: 7, name: "City" },
    { id: 8, name: "ZIP Code" },
    { id: 9, name: "Street Name" },
    { id: 10, name: "Street Num." },
    { id: 11, name: "Unit Num." },
  ];

  return profileDetails.map((label, i) => {
    return (
      <View key={i} style={styles.innerContainer}>
        <Text style={styles.text}>{label.name}</Text>
        <TextInput autoCorrect={false} style={styles.textInput} />
      </View>
    );
  });
}

const ProfileScreenEdit = ({ navigation }) => {
  const StatusBarHeight = Constants.StatusBarHeight;

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: StatusBarHeight }]}
        behavior="padding"
      >
        <TouchableOpacity onPress={handleHome}>
          <Ionicons name="arrow-back" size={25} color="#fb3a6a" />
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <View style={[styles.innerTitleContainer, { marginTop: "1%" }]}>
            <Text style={styles.title}>User Profile</Text>
          </View>
        </View>
        <ProfileDetails></ProfileDetails>
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

export default ProfileScreenEdit;

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
    marginBottom: "5%",
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
