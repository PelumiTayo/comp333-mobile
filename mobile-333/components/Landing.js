import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import LandingImage from "../assets/LandingImage.jpg";

export default function SignUp({ navigation }) {

  return (
      <View style={styles.container}>
        <Image source={LandingImage} style={styles.logoImage} />
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
          SonicScore is a comprehensive music rater application designed to
          allow users to enter, rate, and review their favorite songs.
        </Text>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 40,
            display: "flex",
            backgroundColor: "#FFAC4B",
            color: "blue",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 40,
            display: "flex",
            backgroundColor: "#FF5A5A",
            color: "blue",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "80%",
  },
  logoImage: {
    width: "95%",
    height: 250,
    borderRadius: 20,
  },
});
