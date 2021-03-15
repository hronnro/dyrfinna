import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ColorSchemeName } from "react-native";

import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { User } from "../FirestoreModels";
import AddPetScreen from "../screens/AddPetScreen";
import Header from "../components/Header";

const Stack = createStackNavigator<RootStackParamList>();
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
  user,
}: {
  colorScheme: ColorSchemeName;
  user: User;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="LoggedOut" component={LoggedOutNavigator} />
        ) : (
          <>
            <Stack.Screen
              name="Root"
              children={() => <BottomTabNavigator user={user} />}
            />
            <Stack.Screen
              name="AddPetScreen"
              children={() => <AddPetScreen user={user} />}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
