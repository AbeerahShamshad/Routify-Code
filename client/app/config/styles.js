import { Platform, StyleSheet } from "react-native";

import colors from "./Colors";

export default {
    colors,
    text: {
        color: colors.dark,
        fontSize: 16,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
};

const authStyle = StyleSheet.create({
    btnLabel: {
        textAlign: 'center',
        marginBottom: 6,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 4,
        
        
    },
    // formContainer: {
    //     padding: 30,
    //     marginTop: 20,
    //     flex: 1,
    //     justifyContent: 'center',
    // },
    // logo: {
    //     marginTop: 80,
    //     width: 250,
    //     height: 200,
    //     marginLeft: 50
    // },
    // headerContainer: {
    //     marginTop: 50,
    //     marginHorizontal: 10,
    //     backgroundColor: colors.primary,
    // },
    // headerText: {
    //     fontWeight: 'bold',
    //     color: '#333',
    //     textAlign: 'center',
    //     marginTop: 35,
    //     color: 'white',
    // },
    // text: {
    //     color: colors.primary,
    //     fontSize: 14,
    //     fontWeight: "500",
    // },

    registerBtn: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        padding: 50,
        width: '85%',
    },
    btnLabelText: 
    { color: colors.primary, 
        fontWeight: "600" },
})

export {
    authStyle
}