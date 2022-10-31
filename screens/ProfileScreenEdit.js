// TODO
// --> UPDATE FLAGS

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, Divider, Button, RadioButton } from "react-native-paper";
import {
  getFirestore,
  collection,
  updateDoc,
  doc,
} from "@firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const ProfileScreenEdit = ({ navigation }) => {
  const StatusBarHeight = Constants.StatusBarHeight;

  // Database imports
  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);
  const db = getFirestore(app);

  // User Details State
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(new Date());
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [healthCard, setHealthcard] = React.useState("");
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Location Details State
  const [country, setCountry] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [streetName, setStreetName] = React.useState("");
  const [streetNumber, setStreetNumber] = React.useState("");
  const [unitNumber, setUnitNumber] = React.useState("");

  // Emergency Contact State
  const [firstNameEC, setFirstNameEC] = React.useState("");
  const [lastNameEC, setLastNameEC] = React.useState("");
  const [phoneEC, setPhoneEC] = React.useState("");
  const [relationshipEC, setRelationshipEC] = React.useState("");

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handlePostData = async () => {
    console.log(auth.currentUser.uid);

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userDocRef, {
      "user_profile.firstName": firstName,
      "user_profile.lastName": lastName,
      "user_profile.gender": gender,
      "user_profile.dateOfBirth": birthDate,
      "user_profile.phoneNumber": phoneNumber,
      "user_profile.healthCard": healthCard,

      "address.city": city,
      "address.country": country,
      "address.postalCode": zipCode,
      "address.provinceState": province,
      "address.streetName": streetName,
      "address.streetNumber": streetNumber,
      "address.unitNumber": unitNumber,

      "emergency contact.firstName": firstNameEC,
      "emergency contact.lastName": lastNameEC,
      "emergency contact.phoneNumber": phoneEC,
      "emergency contact.relationship": relationshipEC,

      "required_steps.userProfile": true,
    });

    navigation.navigate("Profile");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container, { marginTop: StatusBarHeight }]}
      >
        <TouchableOpacity onPress={handleHome}>
          <Ionicons name="arrow-back" size={25} color="#fb3a6a" />
        </TouchableOpacity>

        <View style={styles.innerContainer}>
          <View style={[styles.innerTitleContainer, { marginTop: "1%" }]}>
            <Text style={styles.title}>User Profile</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.dividerTextStyle}>User Details</Text>
          <Divider style={{ marginBottom: 2 }} />

          {/* Profile Information Inputs */}
          <TextInput
            label={"First Name"}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          <TextInput
            label={"Last Name"}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />
          <TextInput
            label={"Gender"}
            value={gender}
            onChangeText={(text) => {
              setGender(text);
            }}
          />
          <TextInput
            label={"Birth Date"}
            value={birthDate}
            onChangeText={(text) => {
              setBirthDate(text);
            }}
          />
          <TextInput
            label={"Phone Number"}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
          />
          <TextInput
            label={"Health Card"}
            value={healthCard}
            onChangeText={(text) => {
              setHealthcard(text);
            }}
          />
          {/* Style this after */}
          {/* <Text>Gender</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setGender(newValue)}
            value={gender}
          >
            <View style={{flexDirection: "row"}}>
              <Text>Male</Text>
              <RadioButton value="Male" />
              <Text>Female</Text>
              <RadioButton value="Female" />
            </View>
          </RadioButton.Group>
            
          <Text>Select your birth date:</Text>
          <RNDateTimePicker 
          mode='date'
          value={new Date(2022, 10, 1)}
          onChange={ (event, value) => {
            console.log(value)
          }}/> */}
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.dividerTextStyle}>Location</Text>
          <Divider style={{ marginBottom: 2 }} />

          {/* Location Information Inputs */}
          <TextInput
            label={"Country"}
            value={country}
            onChangeText={(text) => {
              setCountry(text);
            }}
          />
          <TextInput
            label={"Province"}
            value={province}
            onChangeText={(text) => {
              setProvince(text);
            }}
          />
          <TextInput
            label={"City"}
            value={city}
            onChangeText={(text) => {
              setCity(text);
            }}
          />
          <TextInput
            label={"Zip Code"}
            value={zipCode}
            onChangeText={(text) => {
              setZipCode(text);
            }}
          />
          <TextInput
            label={"Street Name"}
            value={streetName}
            onChangeText={(text) => {
              setStreetName(text);
            }}
          />
          <TextInput
            label={"Street Number"}
            value={streetNumber}
            onChangeText={(text) => {
              setStreetNumber(text);
            }}
          />
          <TextInput
            label={"Unit Number"}
            value={unitNumber}
            onChangeText={(text) => {
              setUnitNumber(text);
            }}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.dividerTextStyle}>Emergency Contact</Text>
          <Divider style={{ marginBottom: 2 }} />

          {/* Emergency Contact Inputs */}
          <TextInput
            label={"First Name"}
            value={firstNameEC}
            onChangeText={(text) => {
              setFirstNameEC(text);
            }}
          />
          <TextInput
            label={"Last Name"}
            value={lastNameEC}
            onChangeText={(text) => {
              setLastNameEC(text);
            }}
          />

          <TextInput
            label={"Phone Number"}
            value={phoneEC}
            onChangeText={(text) => {
              setPhoneEC(text);
            }}
          />
          <TextInput
            label={"Relationship"}
            value={relationshipEC}
            onChangeText={(text) => {
              setRelationshipEC(text);
            }}
          />
        </View>

        <Button
          icon="account-edit-outline"
          mode="text"
          textColor="#0000FF"
          onPress={handlePostData}
        >
          Submit
        </Button>
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
  dividerTextStyle: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    backgroundColor: "#007FFF",
    padding: 5,
    borderRadius: 2,
    color: "white",
  },
});
