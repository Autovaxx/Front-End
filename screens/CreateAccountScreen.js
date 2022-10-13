import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getApp } from "firebase/app";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {createUserCollection} from '../firebase/firebase-create-acc-post-data'

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const app = getApp("autovaxx");
  const auth = getAuth(app);

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match",
        [
          {
            text: "OK",
            onPress: () => {
              setConfirmPassword("");
              setPassword("");
            },
          },
        ],
        { cancelable: true }
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created");
        const user = userCredential.user;
        console.log(user);
        createUserCollection(userCredential.user.uid, email)
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", error.message, [{ text: "OK" }], {
          cancelable: true,
        });
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("../assets/background.jpg")}
      >
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
            />
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "md-eye-off" : "md-eye"}
                size={30}
                color={"#9CA3AF"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.innerInputContainer}>
            <Ionicons name="md-lock-closed" size={24} color="#FB2876" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={"white"}
              secureTextEntry={hidePassword}
              autoCorrect={false}
              autoCapitalize={false}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
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
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={goToLogin}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Return to Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: -20,
    borderColor: "#FB2876",
    borderWidth: 2,
  },
});
