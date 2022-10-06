import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

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
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Applications</Text>
            <TouchableOpacity>
              <Ionicons name="notifications" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.innerInputContainer}>
            <Ionicons name="search" size={24} color="#FB2876" />
            <TextInput
              style={styles.input}
              placeholder="Enter a location"
              autoCorrect={false}
              autoCapitalize={false}
            />
          </View>
        </View>
        <Bookings></Bookings>
      </KeyboardAvoidingView>
    </ScrollView>
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
  },
  inputContainer: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  innerInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#3AA2FB",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
    flex: 1,
    color: "white",
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
    height: "45%",
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
