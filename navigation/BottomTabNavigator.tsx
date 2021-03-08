import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  MyProfileParamList,
} from "../types";
import { User } from "../FirestoreModels";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ user }: { user: User }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="My Profile"
        children={() => <MyProfileNavigator user={user} />}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator<MyProfileParamList>();

function MyProfileNavigator({ user }: { user: User }) {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="MyProfileScreen"
        children={() => <MyProfileScreen user={user} />}
        options={{ headerTitle: "My Profile", foo: "foo" }}
      />
    </MyProfileStack.Navigator>
  );
}
