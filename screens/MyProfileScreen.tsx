import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { User } from '../FirestoreModels';
import * as firebase from 'firebase';

export default function MyProfileScreen({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut().then(() => {
        console.log("logged out")
      })} >
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    fontSize: 14,
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
