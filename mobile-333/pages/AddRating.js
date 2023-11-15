import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Button, Card, Text, useTheme, TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

//used to decode the payload in token
import jwtDecode from "jwt-decode";

import bandviolin from "../assets/bandviolin.png";
import { object, string, number } from "yup";
import apiClient from "../services/apiClient";

const RatingSchema = object({
  artist: string()
    .trim()
    .required("Artist is required")
    .min(1, "Artist must not be empty")
    .max(32, "Artist cannot exceed 32 characters")
    .label("Artist"),
  title: string()
    .trim()
    .required("Song is required")
    .min(1, "Song must not be empty")
    .max(64, "Song cannot exceed 64 characters")
    .label("Song"),
  rating: number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .label("Rating"),
});

export default function Ratings({ navigation }) {
  const theme = useTheme();
  const [username, setUsername] = React.useState("");
  const screenHeight = Dimensions.get("window").height;
  const [ratingInfo, setRatingInfo] = React.useState({
    artist: "",
    title: "",
    rating: "1",
  });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    async function fetchToken() {
      try {
        const jwt_token = await SecureStore.getItemAsync("token");
        if (jwt_token) {
          const decodedToken = jwtDecode(jwt_token);
          setUsername(decodedToken.username);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    fetchToken();
  }, []);
  console.log(ratingInfo);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    try {
      result = RatingSchema.validateSync(
        { ...ratingInfo },
        { abortEarly: false }
      );

      //converts information into formData so it can be sent to the backend.
      const formData = new FormData();
      const jwt_token = await SecureStore.getItemAsync("token");

      formData.append("username", username);
      formData.append("artist", ratingInfo.artist);
      formData.append("rating", ratingInfo.rating);
      formData.append("title", ratingInfo.title);
      formData.append("token", jwt_token);

      const { data } = await apiClient.ratingP(formData);
      //successfully inputted into the DB
      if (data) {
        navigation.navigate('Ratings');
      } else {
        const field = "rating";
        setErrors((prev) => ({ ...prev, [field]: data }));
      }
    } catch (err) {
      for (e of err.inner) {
        let field = e.path;
        let errmsg = e.errors[0];
        setErrors((prev) => ({ ...prev, [field]: errmsg }));
      }
    }

    //error handling
  }
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.background,
          minHeight: screenHeight,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            padding: 10,
            zIndex: 1,
            justifyContent: "center",
          }}
        >
          Sonic<Text style={{ color: "purple" }}>Score</Text>
        </Text>
        <Card style={{ backgroundColor: "#FFAC4B", position: "fixed" }}>
          <Card.Content style={{ alignSelf: "center" }}>
            <Image source={bandviolin} />
          </Card.Content>
        </Card>
        <View
          style={{
            width: "80%",
            marginTop: "10%",
            alignSelf: "center",
            marginBottom: "10%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Add a Rating!
          </Text>
          <TextInput
            disabled
            style={{ width: "100%", margin: 10 }}
            mode="outlined"
            label="Username"
            value={username}
          />

          <TextInput
            mode="outlined"
            label="Artist"
            style={{ width: "100%", margin: 10 }}
            value={ratingInfo.artist}
            onChangeText={(text) =>
              setRatingInfo((prev) => ({ ...prev, artist: text }))
            }
          />
          <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
            {errors.artist}
          </Text>
          <TextInput
            mode="outlined"
            label="Song"
            value={ratingInfo.title}
            onChangeText={(text) =>
              setRatingInfo((prev) => ({ ...prev, title: text }))
            }
            style={{ width: "100%", margin: 10 }}
          />
          <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
            {errors.title}
          </Text>
          <TextInput
            mode="outlined"
            defaultValue={ratingInfo.rating.toString()} // Convert to string if ratingInfo.rating is a number
            label="Rating"
            value={ratingInfo.rating}
            onChangeText={(text) =>
              setRatingInfo((prev) => ({ ...prev, rating: text }))
            }
            maxLength={2}
            keyboardType="numeric"
            returnKeyType="done" // You might want to use "done" for the return key
            style={{ width: "100%", margin: 10 }}
          />
          <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
            {errors.rating}
          </Text>
          <Button
            onPress={(e) => handleSubmit(e)}
            style={{ width: "50%" }}
            mode="contained"
          >
            Add Rating
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
