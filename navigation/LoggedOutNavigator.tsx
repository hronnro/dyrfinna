import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import { LoggedOutParamList } from '../types';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createStackNavigator<LoggedOutParamList>();

export default function LoggedOutNavigator({ navigation }) {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" children={() => <OnboardingScreen onPress={() => navigation.navigate("WelcomeScreen")} />} />
            <Stack.Screen name="WelcomeScreen" children={() => <WelcomeScreen onPress={alreadyHasAccount => navigation.navigate(alreadyHasAccount ? "Authentication" : "UserInfo")} />} />
            <Stack.Screen name="UserInfo" children={() => <UserInfoScreen onPress={() => navigation.navigate("Authentication")} />} />
            <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        </Stack.Navigator>
    );
};