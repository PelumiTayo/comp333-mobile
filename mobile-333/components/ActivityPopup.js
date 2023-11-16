import React from "react";
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper";

export default function ActivityPopup(props) {
    if (props.show) {
        return (
            <View
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
            }}
            >
                <ActivityIndicator size="large" animating={true} />
            </View>
            );
    }
    else return;
   
}