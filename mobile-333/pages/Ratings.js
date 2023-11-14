import React from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Button, Card, Text, useTheme, Banner } from "react-native-paper";
import image from "../assets/thebandshow.png";
import bandTorso from "../assets/thebandtorso.png";
import apiClient from "../services/apiClient";

export default function Ratings({ navigation }) {
  const theme = useTheme();
  const [totalRatings, setTotalRatings] = React.useState([]);
  const [visibleView, setVisibleView] = React.useState(false);
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
        const { data } = await apiClient.ratingG();
        setTotalRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }
    fetchRatings();
  }, []);

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
            zIndex: 1,
            justifyContent: "center",
          }}
        >
          Sonic<Text style={{ color: "purple" }}>Score</Text>
        </Text>
        <Card style={{ backgroundColor: "#A6B9FF", position: "fixed" }}>
          <Card.Content>
            <Image source={image} />
          </Card.Content>
        </Card>
        {visibleView ? (
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
                <Text style={{ color: "white", fontSize: 18 }}>ID: {viewValues.id}</Text>
                <Text style={{ color: "white", fontSize: 18 }}>User: {viewValues.username}</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Artist: {viewValues.artist}</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Song: {viewValues.title}</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Rating: {viewValues.rating}</Text>
              </Card.Content>
              <Button onPress={() => setVisibleView(false)}>Cancel</Button>
            </Card>
          </View>
        ) : (
          totalRatings.map((subArray, index) => (
            <View
              key={index}
              style={{ borderWidth: 1, borderColor: "black", margin: 5 }}
            >
              <Banner
                visible={true}
                actions={[
                  {
                    label: "View",
                    onPress: () => {
                      setVisibleView(true);
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
                  { label: "Update", onPress: () => true },
                  { label: "Delete", onPress: () => true },
                ]}
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
          ))
        )}
      </View>
    </ScrollView>
  );
}
