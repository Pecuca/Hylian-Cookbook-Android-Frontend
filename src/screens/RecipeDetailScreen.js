import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import DifficultyIndicator from '../components/DifficultyIndicator';
import AddToCategoryModal from '../components/AddToCategoryModal';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {
      // Como no tenemos un getById en api.js, podemos sacarlo del listado o crear la función
      // Haremos un fetch directo aquí por simplicidad ya que no lo agregué a api.js
      const res = await fetch(`http://10.0.2.2:5000/api/recipes/${recipeId}`);
      const data = await res.json();
      setRecipe(data.recipe);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar la receta');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Eliminar Receta', '¿Estás seguro de que deseas eliminar esta receta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            await api.deleteRecipe(recipeId);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', e.message);
          }
        } 
      }
    ]);
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.accentGold} />
      </View>
    );
  }

  if (!recipe) return null;

  const isOwner = recipe.author && recipe.author._id === user._id;

  return (
    <LinearGradient colors={['#0d1f0d', '#1a2e1a']} style={globalStyles.container}>
      <ScrollView>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Ionicons name={recipe.isPublic ? "earth" : "lock-closed"} size={14} color={colors.background} />
              <Text style={styles.badgeText}>{recipe.isPublic ? 'Pública' : 'Privada'}</Text>
            </View>
            <DifficultyIndicator difficulty={recipe.difficulty || 1} />
          </View>

          {recipe.author && (
            <Text style={styles.author}>Autor: {recipe.author.name}</Text>
          )}

          {recipe.description ? (
            <Text style={styles.description}>{recipe.description}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {recipe.ingredients.map((ing, i) => (
            <Text key={i} style={styles.listItem}>• {ing.name} ({ing.quantity})</Text>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Pasos</Text>
          {recipe.steps.map((step, i) => (
            <Text key={i} style={styles.listItem}>{i + 1}. {step}</Text>
          ))}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Barra de Acciones Fija Abajo */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="folder-open" size={24} color={colors.accentGoldLight} />
          <Text style={styles.actionText}>Guardar</Text>
        </TouchableOpacity>

        {isOwner && (
          <>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('EditRecipe', { recipe })}>
              <Ionicons name="create" size={24} color={colors.info} />
              <Text style={[styles.actionText, { color: colors.info }]}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
              <Ionicons name="trash" size={24} color={colors.danger} />
              <Text style={[styles.actionText, { color: colors.danger }]}>Eliminar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <AddToCategoryModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        recipeId={recipeId} 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    color: colors.textLight,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentGoldLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 15,
  },
  badgeText: {
    color: colors.background,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
  },
  author: {
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  description: {
    color: colors.textLight,
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderColor: colors.accentGold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGold,
    marginVertical: 20,
  },
  sectionTitle: {
    color: colors.accentGold,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listItem: {
    color: colors.textLight,
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0d1f0d',
    borderTopWidth: 1,
    borderColor: colors.borderGold,
    paddingVertical: 10,
    paddingBottom: 20, // Para safe area
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionText: {
    color: colors.accentGoldLight,
    marginTop: 5,
    fontSize: 12,
  }
});
