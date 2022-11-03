import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { getUserDocument } from "../firebase/firebase-getUserData";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const required = [];
let userData;
let checkFlag = 1;
const app = initializeApp(firebaseConfig, "autovaxx");
const auth = getAuth(app);

export function RequiredStepsView() {
  return required.map((step, i) => {
    return (
      <TouchableOpacity key={i} onPress={step.route}>
        <View style={styles.stepsContainer}>
          {step.flag ? (
            <Ionicons name="checkmark-circle" size={25} color="#2fea6e" />
          ) : (
            <Ionicons name="close-circle" size={25} color="#ff0000" />
          )}
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

  const handleBookAppointment = async () => {
    const dataToSend = {
      UID: auth.currentUser.uid,
    };

    axios({
      method: "POST",
      url: "https://gentle-retreat-95298.herokuapp.com/",
      data: dataToSend,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('handleBookAppointmentClicked')
  };
  // Book Appointment Modals
  const [visibleModalConfirm, setVisibleModalConfirm] = React.useState(false);
  const [visibleModalBook, setVisibleModalBook] = React.useState(false);
  const [visibleRequiredStepsAlert, setVisibleRequiredStepsAlert] =
    React.useState(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  };

  // Functions that update the two modal states. Used with on-click events within modal.
  const showModalConfirm = () => setVisibleModalConfirm(true);
  const hideModalConfirm = () => setVisibleModalConfirm(false);
  const hideModalBook = () => setVisibleModalBook(false);
  const requiredStepsModal = () => setVisibleRequiredStepsAlert(true);
  const hideRequiredStepsModal = () => setVisibleRequiredStepsAlert(false);
  const closeConfirmShowBookModals = () => {
    setVisibleModalConfirm(false);
    setVisibleModalBook(true);
    handleBookAppointment();
  };

  const bookAptEnableDisable = () => {
    if (required[0].flag && required[1].flag && required[2].flag) {
      showModalConfirm();
    } else {
      requiredStepsModal(true);
    }
  };
  //requiredSteps.userProfile ? showModalConfirm:
  const buttons = [
    { id: 1, name: "Book Appointments", route: bookAptEnableDisable },
    { id: 2, name: "View Bookings", route: handleViewBookings },
    { id: 3, name: "Change Search Preferences", route: handleSearchPref },
    { id: 4, name: "Account Settings", route: handleHome },
  ];

  return buttons.map((button, i) => {
    return (
      <ScrollView>
        <View
          key={i}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={button.route} style={styles.button}>
            <Text style={styles.buttonText}>{button.name}</Text>
          </TouchableOpacity>

          <Portal>
            <Modal
              visible={visibleRequiredStepsAlert}
              onDismiss={hideRequiredStepsModal}
              contentContainerStyle={containerStyle}
            >
              <Text>Please complete the required steps!</Text>
              <Button
                icon="account-edit-outline"
                mode="text"
                textColor="black"
                onPress={hideRequiredStepsModal}
              >
                Ok
              </Button>
            </Modal>
            <Modal
              visible={visibleModalConfirm}
              onDismiss={hideModalConfirm}
              contentContainerStyle={containerStyle}
            >
              <Text>
                Please ensure that the required information you provided is
                accurate prior to submitting as it will be cross-checked with
                your provincial records.
              </Text>
              <Button
                icon="check-circle-outline"
                mode="text"
                textColor="green"
                onPress={closeConfirmShowBookModals}
              >
                Yes
              </Button>

              <Button
                icon="close-circle-outline"
                mode="text"
                textColor="red"
                onPress={hideModalConfirm}
              >
                No
              </Button>
            </Modal>

            <Modal
              visible={visibleModalBook}
              onDismiss={hideModalBook}
              contentContainerStyle={containerStyle}
            >
              <Text>
                Your application has been successfully submitted. We will not
                attempt to book you at your desired vaccination clinics that
                matched your desired search filters. You can view all of your
                bookings in the 'View Bookings' section. You will receive a
                confirmation email from a pharmacy once a booking is made for
                you. Sit tight, we'll get the job done shortly!
              </Text>
              <Button
                icon="check-circle-outline"
                mode="text"
                textColor="green"
                onPress={hideModalBook}
              >
                {" "}
                Ok{" "}
              </Button>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
    );
  });
}

const HomeScreen = () => {
  const StatusBarHeight = Constants.StatusBarHeight;

  const navigation = useNavigation();
  const route = useRoute();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleVaccinations = () => {
    navigation.navigate("VaccineInfo");
  };
  const handleSearchPref = () => {
    console.log("Search Preferences page");
    navigation.navigate("SearchPref");
  };

  const userProfileObj = {
    id: 1,
    name: "User profile",
    route: handleEditProfile,
  };
  const vaccinationDetailsObj = {
    id: 2,
    name: "Vaccination details",
    route: handleVaccinations,
  };
  const clinicSearchPrefObj = {
    id: 3,
    name: "Clinic search preferences",
    route: handleSearchPref,
  };

  const [requiredSteps, setRequiredSteps] = useState([]);

  useEffect(() => {
    if (checkFlag <= 1) {
      getUserDocument(auth.currentUser.uid)
        .then((data) => {
          return JSON.parse(data);
        })
        .then((data_json) => {
          setRequiredSteps(data_json["required_steps"]);
          userData = data_json;
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
        .finally(() => {
          console.log(requiredSteps);
          console.log(requiredSteps.userProfile);
          console.log(requiredSteps.vaccinationDetails);
          console.log(requiredSteps.searchPreferences);
          userProfileObj.flag = requiredSteps.userProfile;
          vaccinationDetailsObj.flag = requiredSteps.vaccinationDetails;
          clinicSearchPrefObj.flag = requiredSteps.searchPreferences;

          required.push(userProfileObj);
          required.push(vaccinationDetailsObj);
          required.push(clinicSearchPrefObj);

          // Only route to the Profile display if its completed
          if (requiredSteps.userProfile) {
            userProfileObj.route = handleProfile;
          }

          checkFlag++;
        });
    }
  });

  // Disabling the devices built-in back button for the current home page
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === "Home") {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [route])
  );

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <Provider>
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
          <RequiredStepsView></RequiredStepsView>
          <View style={styles.innerContainer}>
            <Text style={[styles.subtitle, { paddingTop: 30 }]}>
              {" "}
              What would you like to do?{" "}
            </Text>
          </View>
          <View style={styles.parentBtnContainer}>
            <OptionButtons></OptionButtons>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            marginTop: 25,
          }}
        >
          <Button
            icon="account-edit-outline"
            mode="text"
            textColor="black"
            onPress={handleSignOut}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </Provider>
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
    marginTop: "5%",
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
