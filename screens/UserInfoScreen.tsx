import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Text, View } from "../components/Themed";

export default function UserInfoScreen({ onPress }) {
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{"User Info Screen"}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="username"
        onChangeText={(text) => setUsername(() => text)}
        value={username}
      />
      <TextInput
        style={styles.textInput}
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(() => text)}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Phone number"
        keyboardType="numeric"
        onChangeText={(text) => setPhoneNumber(() => text)}
        value={phoneNumber}
      />
      <TouchableOpacity
        disabled={username === ""}
        onPress={() =>
          onPress({
            id: "",
            name: username,
            email: email,
            phoneNumber: phoneNumber,
          })
        }
      >
        <Text>{"Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    paddingVertical: 20,
  },
  textInput: {
    borderColor: "#000000",
    borderWidth: 2,
    padding: 5,
    margin: 5,
    width: "60%",
  },
});
