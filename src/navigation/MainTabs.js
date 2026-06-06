import React from 'react';
import { createBottomTabNavigator } from '@react-native-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import PersonalRecipesScreen from '../screens/PersonalRecipesScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';

const Tab = createBottomTabNavigator();
const RecipeStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();

// Stack para las Recetas
function RecipeStackNavigator() {
  return (
    <RecipeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.accentGoldLight,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
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
    </RecipeStack.Navigator>
  );
}

// Stack para las Categorías
function CategoryStackNavigator() {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.accentGoldLight,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <CategoryStack.Screen 
        name="CategoriesList" 
        component={CategoriesScreen} 
        options={{ title: 'Mis Categorías' }} 
      />
      <CategoryStack.Screen 
        name="CategoryDetail" 
        component={CategoryDetailScreen} 
        options={{ title: 'Recetas de la Categoría' }} 
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
