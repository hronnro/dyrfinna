import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { firebase } from "./firebase";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { User } from "./FirestoreModels";
import { StateProvider, useStateContext } from "./globalState";
import { ActionType } from "./reducer";
import { getUser, userListener } from "./api/UserStore";

export default function Core() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const { state, dispatch } = useStateContext();
  const { user } = state;

  function onAuthStateChanged(firebaseUser) {
    console.log("auth state changed");
    if (initializing) setInitializing(false);
    if (firebaseUser != null) {
      /**
       * TODO: fix hack:
       * Using Settimeout cause otherwise firestore.rules failes
       * as it says user was not authenticated.
       */
      setTimeout(() => {
        getUser(firebaseUser.uid).then((user) => {
          if (user != null) {
            dispatch({
              type: ActionType.SIGN_IN,
              payload: user,
            });
          }
        });
      }, 1000);
    } else {
      dispatch({
        type: ActionType.SIGN_OUT,
        payload: null,
      });
    }
  }

  async function loadFonts() {
    let loadedFonts = await Font.loadAsync({
      MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
      MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    });
    return loadedFonts;
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      /**
       * Listen to any changes to the logged in user to make sure
       * we have correct and up-to-date user object throughout the app.
       */
      const db = firebase.firestore();
      const subscriber = db
        .collection("users")
        .doc(user.id)
        .onSnapshot((snapshot) => {
          dispatch({
            type: ActionType.USER_UPDATE,
            payload: snapshot.data(),
          });
        });

      return subscriber;
    }
  }, []);

  if (!isLoadingComplete || initializing || !appIsReady) {
    return (
      <AppLoading
        startAsync={() => loadFonts()}
        onFinish={() => setAppIsReady(true)}
        onError={(err) => console.log("AppLoading failed", err)}
      />
    );
  } else {
    return (
      <SafeAreaProvider>
        <StateProvider>
          <Navigation colorScheme={colorScheme} user={user} />
          <StatusBar />
        </StateProvider>
      </SafeAreaProvider>
    );
  }
}
