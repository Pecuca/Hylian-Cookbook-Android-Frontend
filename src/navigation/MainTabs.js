import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import PersonalRecipesScreen from '../screens/PersonalRecipesScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const RecipeStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();

// Custom Header for the app
const headerOptions = (navigation) => ({
  headerStyle: { backgroundColor: 'transparent' },
  headerTransparent: true,
  headerTintColor: colors.accentGoldLight,
  headerTitleStyle: { fontFamily: 'HyliaSerif', fontSize: 24 },
  headerLeft: () => (
    <Image 
      source={require('../../assets/images/logo.jpg')} 
      style={{ width: 35, height: 35, resizeMode: 'contain', marginLeft: 15, marginRight: 10 }} 
    />
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
      <Ionicons name="person-circle-outline" size={32} color={colors.accentGoldLight} />
    </TouchableOpacity>
  )
});

// Stack para las Recetas
function RecipeStackNavigator({ navigation }) {
  return (
    <RecipeStack.Navigator
      screenOptions={headerOptions(navigation)}
    >
      <RecipeStack.Screen 
        name="RecipesList" 
        component={PersonalRecipesScreen} 
        options={{ title: 'Hylian Cookbook' }} 
      />
      <RecipeStack.Screen 
        name="CreateRecipe" 
        component={CreateRecipeScreen} 
        options={{ title: 'Nueva Receta' }} 
      />
      <RecipeStack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={{ title: 'Detalle de Receta' }} 
      />
      <RecipeStack.Screen 
        name="EditRecipe" 
        component={EditRecipeScreen} 
        options={{ title: 'Editar Receta' }} 
      />
      <RecipeStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
    </RecipeStack.Navigator>
  );
}

// Stack para las Categorías
function CategoryStackNavigator({ navigation }) {
  return (
    <CategoryStack.Navigator
      screenOptions={headerOptions(navigation)}
    >
      <CategoryStack.Screen 
        name="CategoriesList" 
        component={CategoriesScreen} 
        options={{ title: 'Mis Categorías' }} 
      />
      <CategoryStack.Screen 
        name="CategoryDetail" 
        component={CategoryDetailScreen} 
        options={{ title: 'Recetas' }} 
      />
      <CategoryStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
    </CategoryStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Recetas') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Categorías') {
            iconName = focused ? 'folder' : 'folder-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accentGoldLight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#0d1f0d', // Más oscuro para la barra
          borderTopWidth: 1,
          borderTopColor: colors.borderGold,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Recetas" component={RecipeStackNavigator} />
      <Tab.Screen name="Categorías" component={CategoryStackNavigator} />
    </Tab.Navigator>
  );
}
