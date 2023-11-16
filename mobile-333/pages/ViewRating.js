import React from "react";
import { View, Text, Image } from "react-native";
import { Button, useTheme } from "react-native-paper";

import logo from '../assets/logo.png';

export default function ViewRating ({ route,navigation }) {
    const theme = useTheme();
    const {data} = route.params;

    return (
        <View style={{flex:1, backgroundColor:theme.colors.backgroundColor, justifyContent:"center", alignItems:"center"}}>
            <Image source={logo}/>
            <Text>ID: {data[0]}</Text>
            <Text>username: {data[1]}</Text>
            <Text>artist: {data[2]}</Text>
            <Text>title: {data[3]}</Text>
            <Text>rating: {data[4]}</Text>
            <Button style={{marginTop:30, width:"50%"}}mode="contained" onPress={()=>navigation.navigate("Main")}>Back</Button>
        </View>
    );
}