import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { firebase } from './firebase';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { User } from './FirestoreModels';
import { StateProvider, useStateContext } from './globalState';
import { ActionType } from './reducer';
import { getUser } from './api/UserStore';

export default function Core() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [initializing, setInitializing] = useState(true);
    const { state, dispatch } = useStateContext();
    const { user } = state;

    function onAuthStateChanged(firebaseUser) {
        if (initializing) setInitializing(false);
        if (firebaseUser != null) {
            getUser(firebaseUser.uid).then(user => {
                dispatch({
                    type: ActionType.SIGN_IN,
                    payload: user
                })
            });
        } else {
            dispatch({
                type: ActionType.SIGN_OUT,
                payload: null
            })
        }
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
                <StateProvider>
                    <Navigation colorScheme={colorScheme} user={user} />
                    <StatusBar />
                </StateProvider>
            </SafeAreaProvider>
        );
    }
}
