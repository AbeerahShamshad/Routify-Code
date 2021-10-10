import React from 'react'
import {
    View, StyleSheet, Text, ImageBackground
} from 'react-native'
import Screen from '../components/Screen';
import Logo from '../components/form/Logo';

export default function Welcome(props) {
    return (
        <Screen style={styles.container}>
            <ImageBackground>
<Logo/>

            </ImageBackground>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {},
})