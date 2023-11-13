import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import LandingImage from "../assets/LandingImage.jpg";
import { Button } from 'react-native-paper';

export default function SignUp({ navigation }) {

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: "95%",
          height: 250,
          borderRadius: 20,
        }}
        source={LandingImage}
      />
      <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
        Welcome to Sonic<Text style={{ color: "#FF5A5A" }}>Score</Text>
      </Text>
      <Text
        style={{
          fontSize: 17,
          textAlign: "center",
          width: "70%",
          marginBottom: 20,
        }}
      >
        SonicScore is a comprehensive music rater application designed to allow
        users to enter, rate, and review their favorite songs.
      </Text>
      <View style={{ flexDirection: "row", width: "80%" }}>
        <Button
          style={{ margin: 5, flex: 1 }}
          mode="contained"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </Button>
        <Button
          style={{ margin: 5, flex: 1 }}
          mode="outlined"
          onPress={() => null}
        >
          <Text style={{ fontWeight: "bold" }}>Login</Text>
        </Button>
      </View>
    </View>
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
});
