import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Button, Text, useTheme, TextInput } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

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

export default function Ratings({
  viewValues,
  setShowComponent,
  setShowUpdate,
}) {
  const theme = useTheme();
  const screenHeight = Dimensions.get("window").height;
  const [ratingInfo, setRatingInfo] = React.useState({
    artist: viewValues.artist.toString(),
    title: viewValues.title.toString(),
    rating: viewValues.rating.toString(),
  });
  const [errors, setErrors] = React.useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    try {
      result = RatingSchema.validateSync(
        { ...ratingInfo },
        { abortEarly: false }
      );

      //converts information into formData so it can be sent to the backend.
      const jwt_token = await SecureStore.getItemAsync("token");

      const { data } = await apiClient.ratingPatch({
        id: viewValues.id,
        username: viewValues.username,
        artist: ratingInfo.artist,
        rating: ratingInfo.rating,
        title: ratingInfo.title,
        token: jwt_token,
      });
      //successfully inputted into the DB
      if (data) {
        setShowComponent(false);
        setShowUpdate(false);
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
  }
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
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
            Update a Rating!
          </Text>
          <TextInput
            disabled
            style={{ width: "100%", margin: 10 }}
            mode="outlined"
            label="Username"
            value={viewValues.username}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Button
              onPress={(e) => handleSubmit(e)}
              style={{ width: "45%" }}
              mode="contained"
            >
              Update Rating
            </Button>
            <Button
              onPress={() => {
                setShowComponent(false);
                setShowUpdate(false);
              }}
              style={{ width: "45%" }}
              mode="contained"
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
