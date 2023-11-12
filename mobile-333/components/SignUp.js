import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

//image imports
import logo from "../assets/logo.png";

export default function SignUp({ navigation }) {
  //setting the user information
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  //updates userInfo with the information the user types in
  function handleInputChange(name, text) {
    setUserInfo({
      ...userInfo,
      [name]: text,
    });
  }

  //deals with processing information and saving information if valid in the backend/database
  const handleButtonPress = () => {
    if (
      userInfo.username &&
      userInfo.password.length >= 8 &&
      userInfo.password === userInfo.confirmpassword
    ) {
      setUserInfo((prevState) => ({
        ...prevState,
        username: "",
        password: "",
        confirmpassword: "",
      }));
      console.log("Input Value:", userInfo);
    } else {
      if (userInfo.username.length === 0) {
        setUserInfo((prevState) => ({
          ...prevState,
          usernameError: "Please enter a valid username.",
        }));
      } else {
        setUserInfo((prevState) => ({
          ...prevState,
          usernameError: "",
        }));
      }
      if (userInfo.password.length < 8) {
        setUserInfo((prevState) => ({
          ...prevState,
          passwordError: "Please enter a valid password.",
        }));
      } else {
        setUserInfo((prevState) => ({
          ...prevState,
          passwordError: "",
        }));
        setUserInfo((prevState) => ({
          ...prevState,
          confirmPasswordError: "Your passwords do not match.",
        }));
      }
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <View style={styles.container}>
        <Image source={logo} style={styles.logoImage} />
        <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20 }}>
          Sign Up
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username *"
          onChangeText={(text) => handleInputChange("username", text)}
          value={userInfo.username}
        />
        {userInfo.usernameError ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {userInfo.usernameError}
            </Text>
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Password *"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
          value={userInfo.password}
        />
        {userInfo.passwordError ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {userInfo.passwordError}
            </Text>
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password *"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("confirmpassword", text)}
          value={userInfo.confirmpassword}
        />
        {userInfo.confirmPasswordError ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {userInfo.confirmPasswordError}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleButtonPress}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <Text>
          Already have an account?
          <Text
            onPress={() => navigation.navigate("SignIn")}
            style={{ textDecorationLine: "none", color: "#FFAC4B" }}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // Shadow properties for Android
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "80%",
  },
  signUpButton: {
    width: "80%",
    height: 40,
    display: "flex",
    backgroundColor: "#FFAC4B",
    color: "blue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
