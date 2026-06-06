import React, { useContext, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { colors } from './src/theme/colors';
import BackgroundVideo from './src/components/BackgroundVideo';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainTabs from './src/navigation/MainTabs';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.accentGold} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackgroundVideo />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Usuario autenticado, mostrar la app principal
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          // Usuario no autenticado, mostrar login/register
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'HyliaSerif': require('./assets/fonts/HyliaSerifBeta-Regular.otf'),
    'Calamity': require('./assets/fonts/Calamity-Regular.otf'),
  });

  if (!fontsLoaded) {
    return null; // Or a splash screen
  }

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}