import * as React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function UserInfoScreen({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPress()} >
                <Text>
                    {"Go to Authentication"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center"
    },
});
