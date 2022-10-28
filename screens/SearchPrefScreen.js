import { getUserDocument } from "../firebase/firebase-getUserData";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { updateUserDoc } from "../firebase/firebase-update-doc";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import CustomDatePicker from "../components/datePicker";
import SelectList from "react-native-dropdown-select-list";

const SearchPrefScreen = () => {
  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);

  const navigation = useNavigation();
  const pharmacies = ["Shoppers", "Rexall", "Metro"];
  const vaccinationPrefs = [
    "AstraZenca",
    "Pfizer",
    "Moderna",
    "Johnson & Johnson",
  ];

  const [pharmacy, setPharmacy] = useState("");
  const [vaccinationPref, setVaccinationPref] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleHome = () => {
    console.log("View Home page");
    navigation.navigate("Home");
  };
  const StatusBarHeight = Constants.StatusBarHeight;

  useEffect(() => {
    getUserDocument(auth.currentUser.uid)
      .then((fetchedUserData) => JSON.parse(fetchedUserData))
      .then((fetchedUserData_json) => {
        setPharmacy(fetchedUserData_json["search_preference"]["pharmacy"]);
        setVaccinationPref(
          fetchedUserData_json["search_preference"]["vaccinationPref"]
        );
        setEndDate(fetchedUserData_json["search_preference"]["endDate"]);
        setStartDate(fetchedUserData_json["search_preference"]["startDate"]);
      })
      .catch((error) => console.log(`Could not get apt data: ER ${error}`));
  }, []);

  const updateData = () => {
    try {
      updateUserDoc(auth.currentUser.uid, {
        search_preference: {
          pharmacy: pharmacy,
          vaccinationPref: vaccinationPref,
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
        },
      });
      console.log("updateData function called.");
      console.log("start Date: " + startDate);
      console.log("end Date: " + endDate);
    } catch (error) {
      console.log(error);
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
          <View style={styles.innerDateContainerSub}>
            <CustomDatePicker update={setStartDate} value={startDate} />
            <Ionicons
              name="calendar"
              size={34}
              color="#2699FB"
              style={styles.calendarIcon}
            />
          </View>
        </View>
        <View style={styles.innerDateContainer}>
          <Text style={styles.datetitle}>End Date:</Text>
          <View style={styles.innerDateContainerSub}>
            <CustomDatePicker update={setEndDate} value={endDate} />
            <Ionicons
              name="calendar"
              size={34}
              color="#2699FB"
              style={styles.calendarIcon}
            />
          </View>
        </View>
        <View style={styles.innerTitleContainer}>
          <Text style={styles.subtitle}>Pharmacy</Text>
        </View>
        <View>
          <Text style={styles.subtitleText}>
            Select the pharmacies you'd like to make a booking at.
          </Text>
        </View>
        <View>
          <SelectList
            setSelected={setPharmacy}
            data={pharmacies}
            //placeholder={`${pharmacy}`}
            defaultOption={pharmacy}
            search={false}
            arrowicon={<Ionicons name="arrow-down" size={24} color="#2699FB" />}
            inputStyles={{ marginBottom: "1.5%" }}
            boxStyles={{
              borderColor: "#FB2876",
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: "1.5%",
            }}
          />
        </View>
        <View style={styles.innerTitleContainer}>
          <Text style={styles.subtitle}>Vaccinaiton Preference</Text>
        </View>
        <View>
          <Text style={styles.subtitleText}>
            Select the type of vaccine you wish to recieve.
          </Text>
        </View>
        <View>
          <SelectList
            setSelected={setVaccinationPref}
            data={vaccinationPrefs}
            placeholder="Vaccination Preferences"
            search={false}
            arrowicon={<Ionicons name="arrow-down" size={24} color="#2699FB" />}
            inputStyles={{ marginBottom: "1.5%" }}
            boxStyles={{
              borderColor: "#FB2876",
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: "1.5%",
            }}
          />
        </View>
        <View
          style={[
            styles.innerContainer,
            { width: "50%", alignSelf: "center", marginTop: "15%" },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={updateData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    justifyContent: "space-between",
  },
  innerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerDateContainer: {
    marginTop: "3%",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  innerDateContainerSub: {
    flexDirection: "row",
    alignItems: "center",
    width: "52%",
    marginLeft: "-3%",
    borderColor: "#FB2876",
    borderWidth: 1,
    borderRadius: 8,
  },
  innerInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FB2876",
    borderWidth: 1,
    borderRadius: 8,
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
  subtitleText: {
    padding: "3%",
  },
  calendarIcon: {
    marginLeft: "-4%",
    marginBottom: "3%",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FB2876",
    width: "100%",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
