import React, { useState } from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { object, string } from "yup";

let userSchema = object({
  username:
    string().
    required("username is required").
    label("username"),
  password:
    string().
    required("password is required").
    label("password")
});

export default function Login({ navigation }) {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);

  async function onSubmit () {
    setErrors({});
    try {
      result = await userSchema.validate(userInfo, { abortEarly: false });
      // TODO: send userInfo to backend.
    } catch (err) {
      for (e of err.inner){
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
        <Text style={{ color: "red", textAlign: "right" }}>
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
        <Text style={{ color: "red", textAlign: "right" }}>
          {errors.password ? errors.password : ""}
        </Text>
        <Button style={{ width: "50%" }} mode="contained" onPress={onSubmit}>
          Sign in
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
