import * as React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

export default function WelcomeScreen({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"Welcome Screen"}</Text>
      <TouchableOpacity onPress={() => onPress(true)}>
        <Text>{"Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress(false)}>
        <Text>{"Signup"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    paddingVertical: 20,
  },
});
