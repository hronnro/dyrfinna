import * as React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function WelcomeScreen({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPress(true)} >
                <Text>
                    {"User already has account"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress(false)} >
                <Text>
                    {"Create new account"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center"
    },
});
