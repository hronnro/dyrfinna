import * as React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";

import { User } from "../FirestoreModels";
import * as firebase from "firebase";

export default function MyProfileScreen({ user }: { user: User }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.userInfoBox}>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfo}>Name: </Text>
          <Text style={styles.userInfo}>{user.name}</Text>
        </View>
        {user.email ? (
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfo}>Email: </Text>
            <Text style={styles.userInfo}>{user.email}</Text>
          </View>
        ) : null}
        {user.phoneNumber ? (
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfo}>Phone number: </Text>
            <Text style={styles.userInfo}>{user.phoneNumber}</Text>
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("logged out");
            })
        }
      >
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfoBox: {
    borderColor: "red",
    padding: 20,
    borderWidth: 2,
  },
  userInfoRow: {
    flexDirection: "row",
  },
  userInfo: {
    fontSize: 14,
  },
  logoutButton: {
    fontSize: 14,
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
