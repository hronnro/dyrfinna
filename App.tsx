import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import * as firebase from 'firebase';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const firebaseConfig = {
  apiKey: "AIzaSyAVwVbJ1gYKjJdk7lQoDgmqM7R2FlFmlIs",
  authDomain: "dyrfinna-b75f9.firebaseapp.com",
  databaseURL: "https://dyrfinna-b75f9-default-rtdb.firebaseio.com",
  projectId: "dyrfinna-b75f9",
  storageBucket: "dyrfinna-b75f9.appspot.com",
  messagingSenderId: "235219625672",
  appId: "1:235219625672:web:ad9444c2eed405743b67fd",
  measurementId: "G-M6K0361F0R"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    console.log('onAuthStateChange user', user);
    if (initializing) setInitializing(false);
    if (user != null) setUser(user);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!isLoadingComplete || initializing) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} user={user} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
