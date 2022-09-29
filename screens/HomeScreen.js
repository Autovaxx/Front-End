import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native";
import Constants from "expo-constants";

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const StatusBarHeight = Constants.StatusBarHeight;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
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
        <View style={styles.stepsContainer}>
          <Ionicons name="folder" size={25} color="#3AA2FB" />
          <View style={styles.innerStepsContainer}>
            <Text style={styles.steps}>User profile</Text>
            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={25} color="#fb3a6a" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stepsContainer}>
          <Ionicons name="folder" size={25} color="#3AA2FB" />
          <View style={styles.innerStepsContainer}>
            <Text style={styles.steps}>Vaccination details</Text>
            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={25} color="#fb3a6a" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stepsContainer}>
          <Ionicons name="folder" size={25} color="#3AA2FB" />
          <View style={styles.innerStepsContainer}>
            <Text style={styles.steps}>Clinic Search preferences</Text>
            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={25} color="#fb3a6a" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>Completed</Text>
        </View>
        <View style={styles.stepsContainer}>
          <Ionicons name="checkmark-circle" size={25} color="#2fea6e" />
          <View style={styles.innerStepsContainer}>
            <Text style={styles.steps}>Clinic Search preferences</Text>
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={[styles.subtitle, { paddingTop: 30 }]}>
            What would you like to do?
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
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
    padding: 10,
  },
  subtitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
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
    padding: 12,
  },
});
