import React from "react";
import { Text, View } from "react-native";
import { Card, Button } from "react-native-paper";

export default function DeleteDialog(props) {
  if (props.show) {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card mode="elevated" style={{ width: 300 }}>
          <Card.Title title="Delete Rating" subtitle="Confirm Delete" />
          <Card.Content>
            <Text variant="bodyMedium">Are you sure you want to delete this rating?</Text>
          </Card.Content>
          <Card.Actions style={{ margin:10 }}>
            <Button disabled={props.loading} onPress={props.onCancel}>Cancel</Button>
            <Button loading={props.loading} disabled={props.loading} onPress={props.onSubmit}>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
  return;
}
