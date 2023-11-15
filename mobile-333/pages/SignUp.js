import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { object, string, ref } from "yup";

//image imports
import logo from "../assets/logo.png";
import apiClient from '../services/apiClient'

let userSchema = object({
  username: string()
    .trim()
    .min(8, "username must be at least 8 characters")
    .max(32, "usename cannot exceed 32 characters")
    .label("username"),
  password: string()
    .trim()
    .min(8, "password must be at least 8 characters")
    .matches(
      "[a-zA-Z0-9!@]",
      "password must only contain alphanumerical values with !,@"
    )
    .label("password"),
  confirmpassword: string()
    .oneOf([ref("password")], "passwords must match")
    .label("confirmpassword"),
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
  async function onSubmit() {
    setErrors({});
    try {
      result = await userSchema.validateSync(
        { ...userInfo, confirmpassword: confirmPassword },
        { abortEarly: false }
      );
      const formData = new FormData();

      formData.append("username", userInfo.username);
      formData.append("password", userInfo.password);

      const { data } = await apiClient.register(formData);
      console.log(data, "data in register")
      //successfully inputted into the DB
      if (data) {
        await SecureStore.setItemAsync("token", data);
        navigation.navigate("Ratings");
      }
      else{
        const field = "confirmpassword";
        setErrors((prev) => ({ ...prev, [field]: data }));      }
    } catch (err) {
      for (e of err.inner) {
        let field = e.path;
        let errmsg = e.errors[0];
        setErrors((prev) => ({ ...prev, [field]: errmsg }));
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
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
            Register
          </Text>
          <Text>Please sign up to continue</Text>
        </View>
        <View
          style={{
            width: "80%",
            marginTop: "10%",
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
          {errors.username ? (
            <View
              style={{
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
                {errors.username}
              </Text>
            </View>
          ) : null}
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
          {errors.password ? (
            <View
              style={{
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
                {errors.password}
              </Text>
            </View>
          ) : null}
          <TextInput
            style={{ width: "100%" }}
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
              <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
                {errors.confirmpassword}
              </Text>
            </View>
          ) : null}

          <Button
            style={{ width: "50%", margin: 5, marginTop: 10 }}
            mode="contained"
            onPress={onSubmit}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
