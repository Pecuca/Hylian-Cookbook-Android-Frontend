import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateRecipeScreen from './src/screens/CreateRecipeScreen';

// Importación de las pantallas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen.js';
import PersonalRecipesScreen from './src/screens/PersonalRecipesScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Crear Cuenta' }} 
        />
        <Stack.Screen 
          name="Home" 
          component={PersonalRecipesScreen} 
          options={{ title: 'Mis Recetas', headerBackVisible: false }} 
        />
        <Stack.Screen 
          name="CreateRecipe" 
          component={CreateRecipeScreen} 
          options={{ title: 'Nueva Receta' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}