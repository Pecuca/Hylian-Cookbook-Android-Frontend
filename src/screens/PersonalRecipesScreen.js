import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';
import TabSelector from '../components/TabSelector';
import { LinearGradient } from 'expo-linear-gradient';

export default function PersonalRecipesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('mine'); // 'mine' | 'public'
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [sortOption, setSortOption] = useState('alpha'); // 'alpha' | 'date' | 'difficulty'
  const [isAscending, setIsAscending] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [activeTab])
  );

  const loadRecipes = async () => {
    setLoading(true);
    try {
      let data = [];
      if (activeTab === 'mine') {
        data = await api.getMyRecipes();
      } else {
        data = await api.getPublicRecipes();
      }
      setRecipes(data);
    } catch (error) {
      console.log('Error loading recipes', error);
    } finally {
      setLoading(false);
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
      } else { // date
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
        return isAscending ? valA - valB : valB - valA;
      }
    });
  };

  const sortedRecipes = sortRecipes(recipes);

  return (
    <LinearGradient colors={['#0d1f0d', '#1a2e1a']} style={globalStyles.container}>
      <View style={{ padding: 15, flex: 1 }}>
        <TabSelector 
          tabs={[
            { id: 'mine', label: 'Mis Recetas' },
            { id: 'public', label: 'Públicas' }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <FilterBar 
          sortOption={sortOption}
          isAscending={isAscending}
          onSortChange={setSortOption}
          onToggleOrder={() => setIsAscending(!isAscending)}
        />

        {loading ? (
          <ActivityIndicator size="large" color={colors.accentGold} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={sortedRecipes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RecipeCard 
                recipe={item} 
                showAuthor={activeTab === 'public'}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item._id })}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}

        {activeTab === 'mine' && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => navigation.navigate('CreateRecipe')}
          >
            <Ionicons name="add" size={30} color={colors.background} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.accentGoldLight,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.textLight,
  }
});