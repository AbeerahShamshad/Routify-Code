import React, { useState, useContext } from 'react'
import {
    View, TouchableWithoutFeedback, KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import AppText from '../components/text/AppText';
import H3 from '../components/text/H2';
import { authStyle } from '../config/styles';
import FormField from '../components/form/FormField';
import Form from '../components/form/Form';
import SubmitButton from '../components/form/SubmitButton';
import * as Yup from "yup";
import axios from 'axios';
import environment from '../environment/environment';
import ErrorMessage from '../components/form/ErrorMessage';
import AuthContext from '../Context/AuthContext';
import Colors from '../config/Colors';
import Logo from '../components/form/Logo';


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required').email().label("Email"),
    password: Yup.string().required('Required').label("Password"),
});


export default function Login({ navigation }) {
    const { user, setChange, change } = useContext(AuthContext);
    const navigateToRegister = () => navigation.navigate('Register')
    const navigateToForget = () => navigation.navigate('ForgetPassword')
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const handleSubmit = async ({ email, password }) => {
        setLoading(true)
        try {
            await axios.post(`${environment.baseUrl}/auth/login`, {
                email: email.toLowerCase(),
                password: password.toLowerCase(),
            });
            setChange(!change)
            setError(false)
        } catch (err) {
            console.log(err.response)
            if (err.response.data.message){
                setError(err.response.data.message)
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={authStyle.container}>
            <View style={authStyle.logo}>
            
                <Logo/>
       
            </View>
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <View style={authStyle.formContainer}>

                
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
                    <AppText style={authStyle.btnLabel}>Don't have an account? <TouchableWithoutFeedback onPress={navigateToRegister}><AppText
                        style={authStyle.btnLabelText} >Register  </AppText>
                    </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={navigateToForget}>
                            <AppText
                                style={{ alignSelf: 'flex-end', marginRight: 30 }}>Forgot password?</AppText>
                        </TouchableWithoutFeedback>
                    </AppText>
                    {!loading ? <SubmitButton title='Login' /> : <ActivityIndicator color={Colors.primary} />}
                </View>
            </Form>
        </KeyboardAvoidingView>
    )
}

