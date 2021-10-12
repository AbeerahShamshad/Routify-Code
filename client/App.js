import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './app/navigation/auth-navigation/AuthNavigation';
import AuthContext from './app/Context/AuthContext';
import axios from 'axios'
import env from './app/environment/environment';
import Dashboard from './app/screens/Dashboard';

export default function App() {
  const [user, setUser] = useState(false);
  const [change, setChange] = useState(false);
  const [forgetEmail, setForgetEmail] = useState('')

  const getProfile = async () => {
    try {
      let res = await axios.get(`${env.baseUrl}/profile`, { withCredentials: true });
      setUser(res.data.profile);
    } catch (err) {
      console.log('err:', err.response.data)
    }
  }

  const logout = async () => {
    await axios.post(`${env.baseUrl}/logout`);
    setUser(false)
  }

  useEffect(() => {
    getProfile();
    // logout();
    // login();
  }, [change]);


  return (

    <AuthContext.Provider value={{ user, setUser, setChange, change, forgetEmail, setForgetEmail }}>
      <NavigationContainer>
        {!user ? <AuthNavigation /> : <Dashboard />}
      </NavigationContainer>
    </AuthContext.Provider>

  );
}


