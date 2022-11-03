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
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../firebase/firebase-getUserData";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { Title, Card, Button, DataTable } from "react-native-paper";
import LoadingIndicator from "../screen-functionality/LoadingIndicator";

export function Bookings() {
  // Keeps track of the appointment data
  const [aptData, setAptData] = useState([]);
  const [loading, setLoading] = useState(false);

  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);

  useEffect(() => {
    getUserDocument(auth.currentUser.uid)
      .then((apt_data) => JSON.parse(apt_data))
      .then((apt_data_json) => setAptData(apt_data_json.appointment))
      .catch((error) => console.log("Could not get apt data"))
      .finally(() => {
        setLoading(false);
        //console.log(aptData[0].booked)
      });
  }, []);

  if (loading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return aptData.map((data, i) => {
    return (
      <ScrollView>
        <View key={i}>
          {aptData[0].booked ? (
            <Card>
              <Card.Content>
                <Title style={{ marginBottom: 20 }}>{data.vaccine}</Title>
                <DataTable>
                  <DataTable.Row>
                    <Text>{data.pharmacy}</Text>
                  </DataTable.Row>
                  <DataTable.Row>
                    <Text style={{ marginTop: 8 }}>
                      {data.pharmacy_address}
                    </Text>
                  </DataTable.Row>
                  <DataTable.Row>
                    <Text style={{ marginTop: 13 }}>
                      {data.pharmacy_address_pcode_city}
                    </Text>
                  </DataTable.Row>
                  <DataTable.Row>
                    <Text style={{ marginTop: 13 }}>{data.dateTime}</Text>
                  </DataTable.Row>
                </DataTable>
                <Button>{data.booked ? "Booked" : "Waitlisted"}</Button>
              </Card.Content>
            </Card>
          ) : (
            <View style={styles.noBookingContainer}>
              <Text> You have no booked appointments </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  });
}

const BookingScreen = () => {
  const navigation = useNavigation();
  const handleHome = () => {
    console.log("View Home page");
    navigation.navigate("Home");
  };
  const StatusBarHeight = Constants.StatusBarHeight;
  return (
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

      <ScrollView>
        <Bookings></Bookings>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: "20%",
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
  bookingContainer: {
    marginLeft: 10,
    width: "90%",
    marginLeft: "5%",
    marginBottom: "3%",
    height: "70%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9cc9f1",
  },
  innerBookingContainer: {
    width: "70%",
    height: "100%",
    flexDirection: "column",
    padding: "5%",
  },
  booking: {
    fontWeight: "bold",
  },
  bookNowBtnContainer: {
    height: "100%",
    width: "30%",
    position: "relative",
  },
  bookNowBtn: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    color: "#3a74fb",
    fontSize: 14,
    fontWeight: "bold",
  },
  noBookingContainer: {
    marginTop: "50%",
    marginBottom: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  vAlignText: {
    container: {
      justifyContent: "center", //Centered horizontally
      alignItems: "center", //Centered vertically
      flex: 1,
    },
  },
});

// Used to store our appointments
// let appointments = []

// getUserDocument(auth.currentUser.uid).then( (user_data) => {
//   appointments = JSON.parse(user_data)

//   appointments.appointment.forEach( (apt) => {
//     bookings.push({
//       id: 2,
//       pharmacy: apt.pharmacy,
//       address: apt.pharmacy_address,
//       date: apt.date,
//       time: apt.time,
//       vaccine: apt.vaccine
//     })
//   })

//   console.log(bookings)
// });
