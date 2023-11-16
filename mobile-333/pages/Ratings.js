import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Button, Card, Text, useTheme, Banner, Portal } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import jwtDecode from "jwt-decode";

import image from "../assets/thebandshow.png";
import bandTorso from "../assets/thebandtorso.png";
import apiClient from "../services/apiClient";
import DeleteDialog from "../components/DeleteDialog";

export default function Ratings({ navigation }) {
  const theme = useTheme();
  const [totalRatings, setTotalRatings] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const token = await SecureStore.getItemAsync("token");
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    };
    fetchUserData();
  }, []);

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

    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      fetchRatings();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const fetchRatings = async () => {
      try {
        const jwt_token = await SecureStore.getItemAsync("token");
        const { data } = await apiClient.ratingG({ token: jwt_token });
        setTotalRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [visible])

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const jwt_token = await SecureStore.getItemAsync("token");
      const { data } = await apiClient.ratingD({ token: jwt_token, id:deleteIndex});
      setVisible(false);
    } catch (error) {
      console.error("An error occured while trying to delete rating", error);
    }
    setIsLoading(false);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundColor }}
    >
      <Portal>
        <DeleteDialog show={visible} onCancel={() => setVisible(false)} onSubmit={onSubmit} loading={isLoading}/>
      </Portal>
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
      <Button
        style={{
          backgroundColor: "#A6B9FF",
          margin: 10,
          width: "50%",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Add Rating")}
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
                          navigation.navigate("View", { data: subArray });
                        },
                      },
                      {
                        label: "Update",
                        onPress: () => {
                          navigation.navigate("Update", { data: subArray });
                        },
                      },
                      { label: "Delete", onPress: () => {
                        setDeleteIndex(subArray[0]);
                        setVisible(true);
                      } },
                    ]
                  : [
                      {
                        label: "View",
                        onPress: () => {
                          navigation.navigate("View", { data: subArray });
                        },
                      },
                    ]
              }
              icon={({ size }) => (
                <Image source={bandTorso} style={{ width: 150, height: 150 }} />
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
    </ScrollView>
  );
}
