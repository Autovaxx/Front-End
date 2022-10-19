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

export function Bookings() {
  const bookings = [
    { id: 1, name: "Shoppers Drug Mart", address: "address" },
    { id: 2, name: "Rexall", address: "address" },
    { id: 3, name: "Shoppers Drug Mart", address: "address" },
  ];

  return bookings.map((booking, i) => {
    return (
      <View key={i} style={styles.bookingContainer}>
        <View style={styles.innerBookingContainer}>
          <Text style={styles.booking}>{booking.name}</Text>
          <Text>{booking.address}</Text>
        </View>
        <TouchableOpacity style={styles.bookNowBtnContainer}>
          <Text style={styles.bookNowBtn}>Book</Text>
        </TouchableOpacity>
      </View>
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
});
