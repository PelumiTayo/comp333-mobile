import React from "react";
import { View, Image, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
  Banner,
} from "react-native-paper";
import image from "../assets/thebandshow.png";
import bandTorso from "../assets/thebandtorso.png";
import apiClient from "../services/apiClient";

export default function Ratings({ navigation }) {
  const theme = useTheme();
  const [totalRatings, setTotalRatings] = React.useState([]);

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
      <View style={{ backgroundColor: theme.colors.background }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", position: "absolute", zIndex: 1, justifyContent: "center" }}>
          Sonic<Text style={{ color: "purple" }}>Score</Text>
        </Text>
        <Card style={{ backgroundColor: "#A6B9FF", position: "fixed" }}>
          <Card.Content>
            <Image source={image} />
          </Card.Content>
        </Card>
        {totalRatings.map((subArray, index) => (
          <View
            key={index}
            style={{ borderWidth: 1, borderColor: "black", margin: 5 }}
          >
            <Banner
              visible={true}
              actions={[
                { label: "View", onPress: () => true },
                { label: "Update", onPress: () => true },
                { label: "Delete", onPress: () => true },
              ]}
              icon={({ size }) => (
                <Image source={bandTorso} style={{ width: 150, height: 150 }} />
              )}
            >
              <Text>ID: {subArray[0]}</Text>
              <Text>User: {subArray[1]}</Text>
              <Text>Artist: {subArray[3]}</Text>
              <Text>Song: {subArray[2]}</Text>
              <Text>Rating: {subArray[4]}</Text>
            </Banner>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
