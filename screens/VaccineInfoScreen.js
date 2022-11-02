import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { getFirestore, updateDoc, doc } from "@firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../firebase/firebase-getUserData";
import { updateUserDoc } from "../firebase/firebase-update-doc";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectList from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

const VaccineInfoScreen = ({ navigation }) => {
  const StatusBarHeight = Constants.StatusBarHeight;

  // State variables for form data
  const [modalVisible, setModalVisible] = useState(true);

  const [numVaccines, setNumVaccines] = useState(0);

  const [vaccine1Brand, setVaccine1Brand] = useState("");
  const [vaccine1Date, setVaccine1Date] = useState(new Date());
  const [vaccine1Location, setVaccine1Location] = useState("");

  const [vaccine2Brand, setVaccine2Brand] = useState("");
  const [vaccine2Date, setVaccine2Date] = useState(new Date());
  const [vaccine2Location, setVaccine2Location] = useState("");

  const [vaccine3Brand, setVaccine3Brand] = useState("");
  const [vaccine3Date, setVaccine3Date] = useState(new Date());
  const [vaccine3Location, setVaccine3Location] = useState("");

  const [datePicker1, setDatePicker1] = useState(false);
  const [datePicker2, setDatePicker2] = useState(false);
  const [datePicker3, setDatePicker3] = useState(false);

  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    getUserDocument(auth.currentUser.uid)
      .then((fetchedUserData) => JSON.parse(fetchedUserData))
      .catch((e) => console.log(`Error fetching data: ${e}`));
  }, []);

  const dropDownData = [
    { key: "0", value: "0" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
  ];

  const brands = ["Pfizer", "Moderna", "Johnson", "AstraZeneca"];

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const changeDatePicker1 = () => {
    setDatePicker1(!datePicker1);
  };

  const changeDatePicker2 = () => {
    setDatePicker2(!datePicker2);
  };

  const changeDatePicker3 = () => {
    setDatePicker3(!datePicker3);
  };

  const updateData = async () => {
    try {
      updateUserDoc(auth.currentUser.uid, {
        ["previous vaccines"]: {
          vaccines: [
            numVaccines > 0 && {
              brand: vaccine1Brand,
              dateOfVaccine:
                vaccine1Date.getFullYear() +
                "-" +
                (vaccine1Date.getMonth() + 1) +
                "-" +
                vaccine1Date.getDate(),
              location: vaccine1Location,
            },
            numVaccines > 1 && {
              brand: vaccine2Brand,
              dateOfVaccine:
                vaccine2Date.getFullYear() +
                "-" +
                (vaccine2Date.getMonth() + 1) +
                "-" +
                vaccine2Date.getDate(),
              location: vaccine2Location,
            },
            numVaccines > 2 && {
              brand: vaccine3Brand,
              dateOfVaccine:
                vaccine3Date.getFullYear() +
                "-" +
                (vaccine3Date.getMonth() + 1) +
                "-" +
                vaccine3Date.getDate(),
              location: vaccine3Location,
            },
          ],
        },
      });
      const userDocRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userDocRef, {
        "required_steps.vaccinationDetails": true,
      });
      navigation.navigate("Home");
    } catch (e) {
      console.log(`Error updating db: ${e}`);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: StatusBarHeight }]}
        behavior="padding"
      >
        <View style={styles.innerContainer}>
          <View style={styles.innerTitleContainer}>
            <TouchableOpacity onPress={handleHome}>
              <Ionicons name="arrow-back" size={25} color="#fb3a6a" />
            </TouchableOpacity>
            <Text style={styles.title}>Vaccination Details</Text>
            <TouchableOpacity>
              <Ionicons name="notifications" size={25} color="transparent" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtext}>
          Please fill out your vaccination details below
        </Text>

        {numVaccines > 0 && (
          <View>
            <Text style={styles.subtitle}>Covid-19 Dose 1 Information</Text>
            <View style={styles.innerContainer}>
              <SelectList
                setSelected={setVaccine1Brand}
                data={brands}
                placeholder="Brand"
                search={false}
                arrowicon={
                  <Ionicons name="arrow-down" size={24} color="#2699FB" />
                }
                inputStyles={{ marginBottom: "1.5%" }}
                boxStyles={{
                  borderColor: "#FB2876",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: "1.5%",
                }}
              />
              <TouchableOpacity
                style={{
                  minWidth: "50%",
                  paddingLeft: "3%",
                  flexGrow: 1.0,
                }}
                onPress={changeDatePicker1}
              >
                <View style={styles.innerInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Date of Vaccine"
                    placeholderTextColor={"black"}
                    autoCorrect={false}
                    autoCapitalize={false}
                    value={vaccine1Date.toLocaleDateString()}
                  />
                  <Ionicons
                    name="calendar"
                    size={24}
                    color="#2699FB"
                    style={{ marginRight: "6%" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {datePicker1 && (
              <DateTimePicker
                value={vaccine1Date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={(event, selectedDate) =>
                  setVaccine1Date(selectedDate)
                }
              />
            )}
            <TextInput
              style={[
                styles.innerInputContainer,
                styles.input,
                { marginTop: "4%" },
              ]}
              placeholder="City, Province"
              placeholderTextColor={"black"}
              autoCorrect={false}
              autoCapitalize={false}
              value={vaccine1Location}
              onChangeText={(text) => setVaccine1Location(text)}
            ></TextInput>
          </View>
        )}

        {numVaccines > 1 && (
          <View style={{ paddingTop: "3%" }}>
            <Text style={styles.subtitle}>Covid-19 Dose 2 Information</Text>
            <View style={styles.innerContainer}>
              <SelectList
                style={{ alignSelf: "stretch" }}
                setSelected={setVaccine2Brand}
                data={brands}
                placeholder="Brand"
                search={false}
                arrowicon={
                  <Ionicons name="arrow-down" size={24} color="#2699FB" />
                }
                inputStyles={{ marginBottom: "1.5%" }}
                boxStyles={{
                  borderColor: "#FB2876",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: "1.5%",
                }}
              />
              <TouchableOpacity
                onPress={changeDatePicker2}
                style={{
                  minWidth: "50%",
                  paddingLeft: "3%",
                  flexGrow: 1.0,
                }}
              >
                <View style={styles.innerInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Date of Vaccine"
                    placeholderTextColor={"black"}
                    autoCorrect={false}
                    autoCapitalize={false}
                    value={vaccine2Date.toLocaleDateString()}
                  />
                  <Ionicons
                    name="calendar"
                    size={24}
                    color="#2699FB"
                    style={{ marginRight: "6%" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {datePicker2 && (
              <DateTimePicker
                value={vaccine2Date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={(event, selectedDate) =>
                  setVaccine2Date(selectedDate)
                }
              />
            )}
            <TextInput
              style={[
                styles.innerInputContainer,
                styles.input,
                { marginTop: "4%" },
              ]}
              placeholder="City, Province"
              placeholderTextColor={"black"}
              autoCorrect={false}
              autoCapitalize={false}
              value={vaccine2Location}
              onChangeText={(text) => setVaccine2Location(text)}
            ></TextInput>
          </View>
        )}

        {numVaccines > 2 && (
          <View style={{ paddingTop: "3%" }}>
            <Text style={styles.subtitle}>Covid-19 Dose 3 Information</Text>
            <View style={styles.innerContainer}>
              <SelectList
                style={{ alignSelf: "stretch" }}
                setSelected={setVaccine3Brand}
                data={brands}
                placeholder="Brand"
                search={false}
                arrowicon={
                  <Ionicons name="arrow-down" size={24} color="#2699FB" />
                }
                inputStyles={{ marginBottom: "1.5%" }}
                boxStyles={{
                  borderColor: "#FB2876",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: "1.5%",
                }}
              />
              <TouchableOpacity
                onPress={changeDatePicker3}
                style={{
                  minWidth: "50%",
                  paddingLeft: "3%",
                  flexGrow: 1.0,
                }}
              >
                <View style={styles.innerInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Date of Vaccine"
                    placeholderTextColor={"black"}
                    autoCorrect={false}
                    autoCapitalize={false}
                    value={vaccine3Date.toLocaleDateString()}
                  />
                  <Ionicons
                    name="calendar"
                    size={24}
                    color="#2699FB"
                    style={{ marginRight: "6%" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {datePicker3 && (
              <DateTimePicker
                value={vaccine3Date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={(event, selectedDate) =>
                  setVaccine3Date(selectedDate)
                }
              />
            )}
            <TextInput
              style={[
                styles.innerInputContainer,
                styles.input,
                { marginTop: "4%" },
              ]}
              placeholder="City, Province"
              placeholderTextColor={"black"}
              autoCorrect={false}
              autoCapitalize={false}
              value={vaccine3Location}
              onChangeText={(text) => setVaccine3Location(text)}
            ></TextInput>
          </View>
        )}

        <TouchableOpacity onPress={updateData} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Modal to prompt user for number of received vaccines */}
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          statusBarTranslucent={true}
          onRequestClose={() => {
            Alert.alert(
              "Sorry!",
              "Please tell us how many Covid-19 vaccines you have received"
            );
            setModalVisible(true);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.subtext}>
              Select the number of Covid-19 vaccinations that you have received
            </Text>
            <View style={styles.innerModalContainer}>
              <SelectList
                setSelected={setNumVaccines}
                data={dropDownData}
                search={false}
                arrowicon={
                  <Ionicons name="arrow-down" size={22} color="#2699FB" />
                }
                defaultOption={dropDownData[0]}
                inputStyles={{ width: "70%" }}
                boxStyles={{
                  borderColor: "#FB2876",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
              <TouchableOpacity
                style={{ width: "30%", marginLeft: "5%" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={"50%"}
                  color="#FB2876"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default VaccineInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: "5%",
    paddingTop: "10%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: "70%",
  },
  modalContainer: {
    flex: 1,
    padding: "5%",
    paddingTop: "10%",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "50%",
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "stretch",
  },
  innerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerModalContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: "8%",
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
    marginBottom: "3%",
    marginTop: "5%",
  },
  subtext: {
    fontSize: 16,
    marginTop: "5%",
    marginBottom: "3%",
    textAlign: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 5,
    flex: 1,
  },
  innerInputContainer: {
    flexDirection: "row",
    borderColor: "#3AA2FB",
    alignItems: "center",
    borderColor: "#FB2876",
    borderWidth: 1,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#FB2876",
    width: "100%",
    padding: 12,
    borderRadius: 25,
    marginBottom: "5%",
    marginTop: "10%",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
