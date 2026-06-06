import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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

// Logo + Title header component
const LogoTitle = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image 
      source={require('../../assets/images/logo-transparent.png')} 
      style={{ 
        width: 35, 
        height: 35, 
        resizeMode: 'contain', 
        marginRight: 10,
      }} 
    />
    <Text style={{ fontFamily: 'HyliaSerif', fontSize: 24, color: colors.tabIcon }}>
      Hylian Cookbook
    </Text>
  </View>
);

// Custom Header for the app
const headerOptions = (navigation) => ({
  headerStyle: { backgroundColor: colors.accentGold },
  headerTintColor: colors.tabIcon,
  headerBackVisible: false,
  headerLeft: () => null,
  headerTitle: () => <LogoTitle />,
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
      <Ionicons name="person-circle-outline" size={32} color={colors.tabIcon} />
    </TouchableOpacity>
  )
});

// Stack para las Recetas
function RecipeStackNavigator() {
  return (
    <RecipeStack.Navigator
      screenOptions={({ navigation }) => headerOptions(navigation)}
    >
      <RecipeStack.Screen 
        name="RecipesList" 
        component={PersonalRecipesScreen} 
        options={{ title: '' }} 
      />
      <RecipeStack.Screen 
        name="CreateRecipe" 
        component={CreateRecipeScreen} 
        options={{ title: 'Nueva Receta', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
      />
      <RecipeStack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={{ title: 'Detalle de Receta', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
      />
      <RecipeStack.Screen 
        name="EditRecipe" 
        component={EditRecipeScreen} 
        options={{ title: 'Editar Receta', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
      />
      <RecipeStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Mi Perfil', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
      />
    </RecipeStack.Navigator>
  );
}

// Stack para las Categorías
function CategoryStackNavigator() {
  return (
    <CategoryStack.Navigator
      screenOptions={({ navigation }) => headerOptions(navigation)}
    >
      <CategoryStack.Screen 
        name="CategoriesList" 
        component={CategoriesScreen} 
        options={{ title: '' }} 
      />
      <CategoryStack.Screen 
        name="CategoryDetail" 
        component={CategoryDetailScreen} 
        options={{ title: 'Recetas', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
      />
      <CategoryStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Mi Perfil', headerTitleStyle: { fontFamily: 'Calamity', fontSize: 20 } }} 
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
        tabBarActiveTintColor: colors.tabIcon,
        tabBarInactiveTintColor: 'rgba(27, 34, 41, 0.5)', // Muted version of tabIcon
        tabBarStyle: {
          backgroundColor: colors.accentGold, // Color principal
          borderTopWidth: 1,
          borderTopColor: colors.borderGold,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Recetas" 
        component={RecipeStackNavigator} 
        options={{ unmountOnBlur: true }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Recetas', { screen: 'RecipesList' });
          },
        })}
      />
      <Tab.Screen 
        name="Categorías" 
        component={CategoryStackNavigator} 
        options={{ unmountOnBlur: true }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Categorías', { screen: 'CategoriesList' });
          },
        })}
      />
    </Tab.Navigator>
  );
}
