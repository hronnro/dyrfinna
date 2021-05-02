import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ActiveSearchesScreen from "../screens/ActiveSearchesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import {
  BottomTabParamList,
  ActiveSearchesParamList,
  MyProfileParamList,
} from "../types";
import { User } from "../FirestoreModels";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ user }: { user: User }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ActiveSearches"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="ActiveSearches"
        component={ActiveSearchesNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
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
const ActiveSearchesStack = createStackNavigator<ActiveSearchesParamList>();

function ActiveSearchesNavigator() {
  return (
    <ActiveSearchesStack.Navigator>
      <ActiveSearchesStack.Screen
        name="ActiveSearchesScreen"
        component={ActiveSearchesScreen}
        options={{ headerShown: false }}
      />
    </ActiveSearchesStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator<MyProfileParamList>();

function MyProfileNavigator({ user }: { user: User }) {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="MyProfileScreen"
        children={() => <MyProfileScreen user={user} />}
        options={{ headerShown: false }}
      />
    </MyProfileStack.Navigator>
  );
}
