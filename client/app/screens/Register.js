import React, { useState, useContext } from 'react'
import {
    View, TouchableWithoutFeedback, KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native'
import AppText from '../components/text/AppText';
import H3 from '../components/text/H2';
import { authStyle } from '../config/styles';
import FormField from '../components/form/FormField';
import Form from '../components/form/Form';
import EventButton from '../components/form/EventButton';
import * as Yup from "yup";
import axios from 'axios';
import environment from '../environment/environment';
import ErrorMessage from '../components/form/ErrorMessage';
import Colors from '../config/Colors';
import Logo from '../components/form/Logo';


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required').label("username"),
    email: Yup.string().required('Required').email().label("Email"),
    password: Yup.string().required('Required').min(6).label("Password"),
});


export default function Register({ navigation }) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const navigateToLogin = () => navigation.navigate('Login')


    const handleSubmit = async ({ username, email, password }) => {
        setLoading(true);
        try {
            let res = await axios.post(`${environment.baseUrl}/auth/signup`, {
                email: email.toLowerCase(),
                password,
                name: username
            })
            setError(false);
            Alert.alert('Successfully Registered', `Welcome ${username}`, [
                { text: 'Go Back To Login', onPress: () => navigation.navigate('Login') },
            ])
        } catch (err) {
            // if (err.response.data.message) {
            //     setError(err.response.data.message);
            // }
        } finally {
            setLoading(false);
        }
    }



    return (
        <KeyboardAvoidingView style={authStyle.container}>
            <View style={authStyle.headerContainer}>
                <Logo/>
            </View>
            <Form
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <View style={authStyle.formContainer}>
                  
                    <FormField
                        placeholder='Enter your username'
                        inputContainerStyle={authStyle.input}
                        name='username'
                    />
                    
                    <FormField
                        placeholder='Enter your email'
                        inputContainerStyle={[authStyle.input, { marginBottom: 5 }]}
                        name='email'
                    />
                   
                    <FormField
                        placeholder='Enter your password'
                        inputContainerStyle={authStyle.input}
                        secureTextEntry
                        name='password'
                    />
                    <ErrorMessage visible={error} error={error} />
                </View>

                <View style={authStyle.registerBtn}>
                    <AppText style={authStyle.btnLabel}>Already Have an account? <TouchableWithoutFeedback onPress={navigateToLogin}>
                        <AppText
                            style={authStyle.btnLabelText}
                        >
                            Login
                        </AppText>
                    </TouchableWithoutFeedback>
                    </AppText>
                    {!loading ? <EventButton title='Register' /> : <ActivityIndicator color={Colors.primary} />}
                </View>
            </Form>
        </KeyboardAvoidingView>
    )
}

