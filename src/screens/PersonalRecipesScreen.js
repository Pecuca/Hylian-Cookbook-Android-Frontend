import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { mockRecipes, mockGroups } from '../utils/mockData';

export default function PersonalRecipesScreen({ navigation }) {
  // 1. Simulamos que el usuario logueado es "user_1"
  const currentUserId = "user_1";

  // 2. Filtramos sus carpetas/grupos
  const myGroups = mockGroups.filter(group => group.userId === currentUserId);

  // 3. Filtramos sus recetas y las ordenamos alfabéticamente (Requisito del profe)
  const myRecipes = mockRecipes
    .filter(recipe => recipe.userId === currentUserId)
    .sort((a, b) => a.title.localeCompare(b.title));

  // Componente visual para cada Carpeta/Grupo
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity style={styles.groupCard}>
      <Text style={styles.groupTitle}>📁 {item.name}</Text>
    </TouchableOpacity>
  );

  // Componente visual para cada Receta
  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeVisibility}>
        {item.isPublic ? "🌍 Pública" : "🔒 Privada"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {/* SECCIÓN DE CARPETAS */}
      <Text style={styles.sectionTitle}>Mis Carpetas</Text>
      <FlatList
        data={myGroups}
        keyExtractor={(item) => item.id}
        renderItem={renderGroupItem}
        horizontal={true} // Lista horizontal para las carpetas
        showsHorizontalScrollIndicator={false}
        style={styles.groupsList}
      />

      {/* SECCIÓN DE RECETAS */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 }}>
        <Text style={styles.sectionTitle}>Mis Recetas (A-Z)</Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 8 }}
          onPress={() => navigation.navigate('CreateRecipe')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Nueva</Text>
        </TouchableOpacity>
      </View>

      {/* Botón flotante para ir a la vista general (Recetas de otros) */}
      <TouchableOpacity style={styles.generalViewButton}>
        <Text style={styles.generalViewButtonText}>Ver Recetas Comunitarias 🌐</Text>
      </TouchableOpacity>

    </View>
    
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  groupsList: {
    paddingLeft: 20,
    maxHeight: 60,
    marginBottom: 20,
  },
  groupCard: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
  },
  groupTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recipesList: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Espacio para que el botón flotante no tape la última receta
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  recipeVisibility: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  generalViewButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  generalViewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});