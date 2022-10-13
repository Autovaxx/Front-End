import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/logo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const app = initializeApp(firebaseConfig, "autovaxx");
  const auth = getAuth(app);

  const goToRegister = () => {
    navigation.navigate("CreateAccount");
  };

  const handleSignIn = () => {
    console.log("Sign in pressed");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("singed in");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          error.message,
          [
            {
              text: "OK",
              onPress: () => {
                setEmail("");
                setPassword("");
              },
            },
          ],
          { cancelable: true }
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("../assets/background.jpg")}
      >
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.25 }]}
          resizeMode="contain"
        />
        <View style={styles.inputContainer}>
          <View style={styles.innerInputContainer}>
            <Ionicons name="person" size={24} color="#FB2876" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"white"}
              autoCorrect={false}
              autoCapitalize={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.innerInputContainer}>
            <Ionicons name="md-lock-closed" size={24} color="#FB2876" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry={hidePassword}
              autoCorrect={false}
              autoCapitalize={false}
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "md-eye-off" : "md-eye"}
                size={30}
                color={"#9CA3AF"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={goToRegister}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    height: 200,
    marginBottom: "10%",
  },
  inputContainer: {
    width: "80%",
    marginBottom: "10%",
  },
  innerInputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: -20,
    borderColor: "#FB2876",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FB2876",
    fontWeight: "700",
    fontSize: 16,
  },
});
