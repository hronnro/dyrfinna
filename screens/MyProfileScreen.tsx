import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { User } from '../FirestoreModels';

import { firebase } from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();
const testFirestore = (user) => {
  console.log("user myprofile", user);
  db.collection("users").doc(user.uid).set({
    phoneNumber: user.phoneNumber,
  });
}

export default function MyProfileScreen({ user }) {
  console.log("user in profilescreen", user);
  testFirestore(user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
