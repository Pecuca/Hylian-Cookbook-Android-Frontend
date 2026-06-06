import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import HeaderExtension from '../components/HeaderExtension';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';

export default function CategoryDetailScreen({ route, navigation }) {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);
  
  // Filters
  const [sortOption, setSortOption] = useState('alpha');
  const [isAscending, setIsAscending] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Necesitamos hacer fetch de nuevo a la categoría para obtener los datos actualizados de las recetas
      // O podemos sacar las recetas pobladas desde el backend
      loadCategoryRecipes();
    }, [])
  );

  const loadCategoryRecipes = async () => {
    try {
      const allCats = await api.getMyCategories();
      const current = allCats.find(c => c._id === category._id);
      if (current) {
        setRecipes(current.recipes);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const sortRecipes = (data) => {
    return [...data].sort((a, b) => {
      let valA, valB;
      if (sortOption === 'alpha') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
        if (valA < valB) return isAscending ? -1 : 1;
        if (valA > valB) return isAscending ? 1 : -1;
        return 0;
      } else if (sortOption === 'difficulty') {
        valA = a.difficulty || 1;
        valB = b.difficulty || 1;
        return isAscending ? valA - valB : valB - valA;
      } else {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
        return isAscending ? valA - valB : valB - valA;
      }
    });
  };

  const handleRemoveRecipe = (recipeId, title) => {
    Alert.alert(
      'Remover Receta',
      `¿Sacar "${title}" de esta carpeta? La receta NO se eliminará de la base de datos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: async () => {
            try {
              await api.removeRecipeFromCategory(category._id, recipeId);
              loadCategoryRecipes();
            } catch (e) {
              Alert.alert('Error', e.message);
            }
          } 
        }
      ]
    );
  };

  const sortedRecipes = sortRecipes(recipes);

  return (
    <View style={globalStyles.container}>
      <HeaderExtension title={category.name} />
      <View style={{ padding: 15, flex: 1 }}>
        
        <View style={styles.header}>
          <Ionicons name="folder-open" size={30} color={colors.accentGoldLight} />
          <Text style={styles.title}>{category.name}</Text>
        </View>

        <FilterBar 
          sortOption={sortOption}
          isAscending={isAscending}
          onSortChange={setSortOption}
          onToggleOrder={() => setIsAscending(!isAscending)}
        />

        {recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Carpeta vacía.</Text>
            <Text style={styles.emptySub}>Añade recetas desde el listado.</Text>
          </View>
        ) : (
          <FlatList
            data={sortedRecipes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View>
                <RecipeCard 
                  recipe={item} 
                  showAuthor={true}
                  onPress={() => navigation.navigate('Recetas', { screen: 'RecipeDetail', params: { recipeId: item._id } })}
                />
                <TouchableOpacity 
                  style={styles.removeBtn}
                  onPress={() => handleRemoveRecipe(item._id, item.title)}
                >
                  <Ionicons name="close-circle" size={24} color={colors.danger} />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  title: {
    color: colors.textLight,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySub: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 5,
  },
  removeBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  }
});
