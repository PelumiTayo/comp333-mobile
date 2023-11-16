import React from "react";
import { View, Text } from "react-native";
import { Button, TextInput, useTheme, Portal } from "react-native-paper";
import { object, string, number } from "yup";
import * as SecureStore from "expo-secure-store";

import apiClient from "../services/apiClient";
import ActivityPopup from "../components/ActivityPopup";

const UpdateSchema = object({
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

export default function UpdateRating({ route, navigation }) {
  const { data } = route.params;
  const theme = useTheme();
  const [ratingInfo, setRatingInfo] = React.useState({
    id: data[0],
    username: data[1],
    artist: data[2],
    title: data[3],
    rating: data[4],
  });
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async () => {
    setErrors({});
    setIsLoading(true);
    try {
      result = UpdateSchema.validateSync(
        { ...ratingInfo },
        { abortEarly: false }
      );

      //converts information into formData so it can be sent to the backend.
      const jwt_token = await SecureStore.getItemAsync("token");

      const { data } = await apiClient.ratingPatch({
        id: ratingInfo.id,
        username: ratingInfo.username,
        artist: ratingInfo.artist,
        rating: ratingInfo.rating,
        title: ratingInfo.title,
        token: jwt_token,
      });
      //successfully inputted into the DB
      if (data) {
        navigation.navigate("Main");
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
    setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Portal>
        <ActivityPopup show={isLoading} />
      </Portal>
      <View style={{ width: "80%" }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Update a Rating!
        </Text>
        <TextInput disabled mode="outlined" label="Username" value={data[1]} />
        <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}></Text>
        <TextInput
          mode="outlined"
          label="Artist"
          value={ratingInfo.artist}
          error={errors.artist}
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
          error={errors.title}
          onChangeText={(text) =>
            setRatingInfo((prev) => ({ ...prev, title: text }))
          }
        />
        <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
          {errors.title}
        </Text>
        <TextInput
          mode="outlined"
          defaultValue={ratingInfo.rating.toString()} // Convert to string if ratingInfo.rating is a number
          label="Rating"
          error={errors.rating}
          //   value={ratingInfo.rating}
          onChangeText={(text) =>
            setRatingInfo((prev) => ({ ...prev, rating: text }))
          }
          maxLength={2}
          keyboardType="numeric"
          returnKeyType="done" // You might want to use "done" for the return key
        />
        <Text style={{ fontSize: 13, color: "red", textAlign: "right" }}>
          {errors.rating}
        </Text>
        <View style={{flexDirection:"row"}}>
            <Button
              disabled={isLoading}
              onPress={() => navigation.navigate("Main")}
              style={{ margin:5, flex:1 }}
              mode="outlined"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              onPress={onSubmit}
              style={{ margin:5, flex:1 }}
              mode="contained"
            >
              Update Rating
            </Button>
        </View>
      </View>
    </View>
  );
}
