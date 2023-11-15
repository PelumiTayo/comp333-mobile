import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { object, string } from "yup";

import logo from "../assets/logo.png";
import apiClient from '../services/apiClient'
let userSchema = object({
  username: string().required("username is required").label("username"),
  password: string().required("password is required").label("password"),
});

export default function Login({ navigation }) {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);

  async function onSubmit() {
    setErrors({});
    try {
      result = await userSchema.validate(userInfo, { abortEarly: false });
      const formData = new FormData();

      formData.append("username", userInfo.username);
      formData.append("password", userInfo.password);
      const { data } = await apiClient.login(formData);
      //successfully inputted into the DB
      if (data === 1) {
        navigation.navigate("Ratings");
      }
      else{
        const field = "password";
        setErrors((prev) => ({ ...prev, [field]: "Incorrect Username/Password" }));
      }
    } catch (err) {
      for (e of err.inner) {
        let field = e.path;
        let errmsg = e.errors[0];
        setErrors((prev) => ({ ...prev, [field]: errmsg }));
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      behavior="height"
      enabled
    >
      <Image source={logo} style={styles.logoImage} />
      <View style={{ width: "80%" }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          Login
        </Text>
        <Text>Please Sign in to continue</Text>
      </View>
      <View
        style={{
          width: "80%",
          marginTop: "10%",
          marginBottom: "10%",
          alignItems: "flex-end",
        }}
      >
        <TextInput
          style={{ width: "100%" }}
          mode="outlined"
          label="username"
          onChangeText={(text) =>
            setUserInfo((prev) => ({ ...prev, username: text }))
          }
          value={userInfo.username}
          error={errors.username}
        />
        <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
          {errors.username ? errors.username : ""}
        </Text>
        <TextInput
          style={{ width: "100%" }}
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
          onChangeText={(text) =>
            setUserInfo((prev) => ({ ...prev, password: text }))
          }
          value={userInfo.password}
          error={errors.password}
        />
        <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
          {errors.password ? errors.password : ""}
        </Text>
        <Button style={{ width: "50%" }} mode="contained" onPress={onSubmit}>
          Sign in
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
