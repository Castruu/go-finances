import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { NavigationContainer } from '@react-navigation/native'
import theme from './src/global/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {isLoadingUser} = useAuth()

  return (fontsLoaded && !isLoadingUser ?
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style='light'/>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
    :
    <AppLoading />
  );
}

