import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import BookingScreen from "./screens/BookingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VaccineInfoScreen from "./screens/VaccineInfoScreen";
import SearchPrefScreen from "./screens/SearchPrefScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateAccount"
          component={CreateAccountScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Contact"
          component={ContactScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ViewBooking"
          component={BookingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VaccineInfo"
          component={VaccineInfoScreen}
          />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SearchPref"
          component={SearchPrefScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
