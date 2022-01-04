import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';


export default function App() {
  const {loading} = useAuth();
  
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontLoaded || loading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle='light-content' translucent backgroundColor='transparent'/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  )}
