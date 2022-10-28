import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserDocument } from "../firebase/firebase-getUserData";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Card,
  Button,
  List,
  Divider,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import  LoadingIndicator  from "../screen-functionality/LoadingIndicator"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { address } from "../firebase/database-models";


const ProfileScreenMain = () => {
  const [userData, setUserData] = useState([]);
  const [emergencyContactData, setEmergencyContactData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(false)

  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);

  const navigation = useNavigation();

  useEffect(() => {
    getUserDocument(auth.currentUser.uid)
      .then((fetchedUserData) => JSON.parse(fetchedUserData))
      .then((fetchedUserData_json) => {
        setUserData(fetchedUserData_json["user_profile"]);
        setEmergencyContactData(fetchedUserData_json["emergency contact"]);
        setAddressData(fetchedUserData_json.address);
      })
      .catch((error) => console.log(`Could not get apt data: ER ${error}`));
  }, []);

    useEffect( () => {
        setLoading(true)
        getUserDocument(auth.currentUser.uid)
          .then( (fetchedUserData) => JSON.parse(fetchedUserData))
          .then( (fetchedUserData_json) => {
            setUserData(fetchedUserData_json['user_profile'])
            setEmergencyContactData(fetchedUserData_json["emergency contact"])
            setAddressData(fetchedUserData_json.address)
          })
          .catch( (error) => console.log(`Could not get apt data: ER ${error}`))
          .finally( () => setLoading(false) )
      }, [])
      
    if (loading) {
        return <LoadingIndicator></LoadingIndicator>      
    }
    return ( 
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View>
                <Card>
                    <Card.Cover source={{ uri:'https://cdn-icons-png.flaticon.com/512/2960/2960006.png'}}></Card.Cover>
                    <Card.Title title={userData.firstName + " " + userData.lastName} subtitle= {userData.email}></Card.Title>        
                </Card>
            </View>
            <Divider style={{marginTop:5}}/>
            <Text style={styles.dividerTextStyle}>User Details</Text>
            <Divider/>
       
            <List.Item 
                title={addressData.country}
                description={addressData.city + ", " + addressData.provinceState}
                left={props => <List.Icon {...props} icon="map-marker" />}
            />
            <List.Item 
                title={addressData.streetNumber + " " + addressData.streetName + ", " + addressData.postalCode}
                description={"Unit: " + addressData.unitNumber}
                left={props => <List.Icon {...props} icon="home" />}
            />
            <List.Item 
                title={userData.dateOfBirth}
                left={props => <List.Icon {...props} icon="cake-variant" />}
            />
            <List.Item 
                title={userData.phoneNumber}
                left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item 
                title={userData.healthCard}
                left={props => <List.Icon {...props} icon="card-account-details" />}
            />
      
            <Divider/>
            <Text style={styles.dividerTextStyle}>Emergency Contact</Text>
            <Divider/>
            <List.Item 
                title={emergencyContactData.firstName + " " + emergencyContactData.lastName}
                left={props => <List.Icon {...props} icon="account-circle" />}
            />
            <List.Item 
                title={emergencyContactData.phoneNumber}
                left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item 
                title={emergencyContactData.relationship}
                left={props => <List.Icon {...props} icon="family-tree" />}
            />

        </ScrollView>
        
        <Button
            icon="account-edit-outline"
            mode="text"
            textColor="#0000FF"
            onPress={ () => {
                navigation.navigate("EditProfile")
            }}>
                Edit Profile
        </Button>
        </SafeAreaView>
    )
}


export default ProfileScreenMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrap: {
    width: "80%",
    marginTop: "5%",
    justifyContent: "center",
  },
  dividerTextStyle: {
    marginTop: 5,
    fontWeight: "bold",
    backgroundColor: "Red",
    fontSize: 20,
    marginStart: 10,
  },
});
