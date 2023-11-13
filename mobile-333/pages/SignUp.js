import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { object, string, ref } from 'yup';

//image imports
import logo from "../assets/logo.png";

let userSchema = object({
  username: 
    string()
    .trim()
    .min(8, "username must be at least 8 characters")
    .max(32, "usename cannot exceed 32 characters")
    .label("username"),
  password: 
    string()
    .trim()
    .min(8, "password must be at least 8 characters")
    .matches("[a-zA-Z0-9!@]", "password must only contain alphanumerical values with !,@")
    .label("password"),
  confirmpassword: 
    string()
    .oneOf([ref('password')], "passwords must match")
    .label("confirmpassword")
});

export default function SignUp({ navigation }) {
  const theme = useTheme();
  //setting the user information
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  //deals with processing information and saving information if valid in the backend/database
  async function onSubmit () {
    setErrors({});
    try {
      result = await userSchema.validateSync({...userInfo, confirmpassword:confirmPassword}, {abortEarly: false});
      // TODO: send userInfo to backend.
    } catch (err) {
      for (e of err.inner) {
        let field = e.path;
        let errmsg = e.errors[0];
        setErrors(prev => ({...prev, [field]:errmsg,}));
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <View style={[styles.container, {backgroundColor: theme.colors.backgroundColor}]}>
        <Image source={logo} style={styles.logoImage} />
        <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20 }}>
          Sign Up
        </Text>
        <TextInput
          style={{ width: "80%" }}
          mode="outlined"
          label="username"
          onChangeText={(text) => setUserInfo(prev => ({...prev, username:text}))}
          value={userInfo.username}
          error={errors.username}
        />
        {errors.username ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {errors.username}
            </Text>
          </View>
        ) : null}
        <TextInput
          style={{ width: "80%" }}
          mode="outlined"
          secureTextEntry={hidePassword}
          label="password"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={(e) => {
                setHidePassword(!hidePassword);
              }}
            />
          }
          onChangeText={(text) => setUserInfo(prev => ({...prev, password:text}))}
          value={userInfo.password}
          error={errors.password}
        />
        {errors.password ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {errors.password}
            </Text>
          </View>
        ) : null}
        <TextInput
          style={{ width: "80%" }}
          mode="outlined"
          secureTextEntry={hidePasswordConfirm}
          label="confirm password"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={(e) => {
                setHidePasswordConfirm(!hidePasswordConfirm);
              }}
            />
          }
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          error={errors.confirmpassword}
        />
        {errors.confirmpassword ? (
          <View
            style={{
              width: "80%",
            }}
          >
            <Text style={{ color: "red", textAlign: "right" }}>
              {errors.confirmpassword}
            </Text>
          </View>
        ) : null}
        <Button style={{ width: "60%", margin: 5, marginTop: 10}} mode="contained" onPress={onSubmit}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // width: "100%",
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // Shadow properties for Android
    // elevation: 5,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
