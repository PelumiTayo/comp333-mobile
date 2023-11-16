import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Button, Card, Text, useTheme, Banner } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import jwtDecode from "jwt-decode";

import image from "../assets/thebandshow.png";
import bandTorso from "../assets/thebandtorso.png";
import apiClient from "../services/apiClient";

//true if user is on Ratings screem, false if not.
import { useIsFocused } from "@react-navigation/native";

import Update from "./UpdateRating";

export default function Ratings({ navigation }) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [totalRatings, setTotalRatings] = React.useState([]);
  const [showComponent, setShowComponent] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [viewValues, setViewValues] = React.useState({
    id: 0,
    artist: "",
    title: "",
    rating: 0,
  });

  const screenHeight = Dimensions.get("window").height;

  React.useEffect(() => {
    async function fetchRatings() {
      try {
        const jwt_token = await SecureStore.getItemAsync("token");
        const { data } = await apiClient.ratingG({ token: jwt_token });
        setTotalRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }

    async function fetchUsername() {
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
    fetchUsername();
    fetchRatings();
  }, [isFocused === true, showComponent === false]);

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
            padding: 10,
            position: "absolute",
            zIndex: 1,
            justifyContent: "center",
          }}
        >
          Welcome <Text style={{ color: "purple" }}>{username}</Text>
        </Text>
        <Card style={{ backgroundColor: "#A6B9FF", position: "fixed" }}>
          <Card.Content>
            <Image source={image} />
          </Card.Content>
        </Card>
        {showComponent ? (
          <>
        
            {showView && (
              <View style={{ alignItems: "center" }}>
                <Card
                  style={{
                    backgroundColor: "#A6B9FF",
                    margin: 40,
                    width: 300,
                    height: 200,
                    alignItems: "center",
                  }}
                >
                  <Card.Content>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      ID: {viewValues.id}
                    </Text>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      User: {viewValues.username}
                    </Text>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      Artist: {viewValues.artist}
                    </Text>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      Song: {viewValues.title}
                    </Text>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      Rating: {viewValues.rating}
                    </Text>
                  </Card.Content>
                  <Button
                    onPress={() => {
                      setShowComponent(false);
                      setShowView(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Card>
              </View>
            )}
            {showUpdate && <Update viewValues={viewValues} setShowComponent={setShowComponent} setShowUpdate={setShowUpdate} />}
          </>
        ) : (
          <>
          <Button
          style={{
            backgroundColor: "#A6B9FF",
            margin: 10,
            width: "50%",
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("AddRating")}
        >
          Add a Rating!
        </Button>
          {totalRatings
            .slice()
            .reverse()
            .map((subArray, index) => (
              <View
                key={index}
                style={{ borderWidth: 1, borderColor: "black", margin: 5 }}
              >
                <Banner
                  visible={true}
                  actions={
                    username === subArray[1]
                      ? [
                          {
                            label: "View",
                            onPress: () => {
                              setShowComponent(true);
                              setShowView(true);
                              setViewValues((prevState) => ({
                                ...prevState,
                                id: subArray[0],
                                username: subArray[1],
                                artist: subArray[3],
                                title: subArray[2],
                                rating: subArray[4],
                              }));
                            },
                          },
                          {
                            label: "Update",
                            onPress: () => {
                              setShowComponent(true);
                              setShowUpdate(true);
                              setViewValues((prevState) => ({
                                ...prevState,
                                id: subArray[0],
                                username: subArray[1],
                                artist: subArray[3],
                                title: subArray[2],
                                rating: subArray[4],
                              }));
                            },
                          },
                          { label: "Delete", onPress: () => true },
                        ]
                      : [
                          {
                            label: "View",
                            onPress: () => {
                              setShowComponent(true);
                              setViewValues((prevState) => ({
                                ...prevState,
                                id: subArray[0],
                                username: subArray[1],
                                artist: subArray[3],
                                title: subArray[2],
                                rating: subArray[4],
                              }));
                            },
                          },
                        ]
                  }
                  icon={({ size }) => (
                    <Image
                      source={bandTorso}
                      style={{ width: 150, height: 150 }}
                    />
                  )}
                >
                  <Text>ID: {subArray[0]}</Text>
                  {"\n"}
                  <Text>User: {subArray[1]}</Text>
                  {"\n"}

                  <Text>Artist: {subArray[3]}</Text>
                  {"\n"}

                  <Text>Song: {subArray[2]}</Text>
                  {"\n"}

                  <Text>Rating: {subArray[4]}</Text>
                </Banner>
              </View>
            ))}
        </>
        )}
      </View>
    </ScrollView>
  );
}
