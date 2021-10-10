import React from 'react'
import {
    View, StyleSheet
} from 'react-native'
import Logo from '../components/form/Logo'
import Text from '../components/text/AppText'

export default function Dashboard(props) {
    return (
        <View style={styles.container}>
            <Logo/>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})