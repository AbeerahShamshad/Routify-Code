import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Register from '../../screens/Register';
import Login from '../../screens/Login';
import ForgetPassword from '../../screens/ForgetPassword';
import OtpCode from '../../screens/OtpCode';



const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}
                options={{
                    headerShown: false,
                    title: 'Login'
                }}
            />
            <Stack.Screen name='Register' component={Register}
                options={{
                    headerShown: false,
                    title: 'Register'
                }}
            />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword}
                options={{
                    title: 'Forget Password'
                }}
            />
            <Stack.Screen name='ChangePassword' component={OtpCode}
                options={{
                    title: 'Change Password'
                }}
            />
        </Stack.Navigator>
    )

}
export default AuthNavigation;