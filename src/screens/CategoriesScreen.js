import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import CreateCategoryModal from '../components/CreateCategoryModal';

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getMyCategories();
      setCategories(data);
    } catch (e) {
      console.log('Error loading categories', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (name) => {
    try {
      await api.createCategory(name);
      setModalVisible(false);
      loadCategories();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const handleDeleteCategory = (id, name) => {
    Alert.alert(
      'Eliminar Carpeta',
      `¿Eliminar "${name}" y todas TUS recetas dentro de ella? Las recetas públicas de otros solo serán removidas de la carpeta.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteCategory(id);
              loadCategories();
            } catch (e) {
              Alert.alert('Error', e.message);
            }
          }
        }
      ]
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.folderCard}
      onPress={() => navigation.navigate('CategoryDetail', { category: item })}
      onLongPress={() => handleDeleteCategory(item._id, item.name)}
      delayLongPress={800}
    >
      <View style={styles.folderIconContainer}>
        <Ionicons name="folder" size={40} color={colors.accentGoldLight} />
        <View style={styles.badgeCount}>
          <Text style={styles.badgeText}>{item.recipes?.length || 0}</Text>
        </View>
      </View>
      <Text style={styles.folderName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={{ padding: 15, flex: 1 }}>
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.accentGold} style={{ marginTop: 50 }} />
        ) : categories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={60} color={colors.borderGold} />
            <Text style={styles.emptyText}>No tienes categorías aún.</Text>
            <Text style={styles.emptySub}>Crea una carpeta para organizar tus recetas.</Text>
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            renderItem={renderCategoryItem}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 80 }}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
          />
        )}

        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color={colors.background} />
        </TouchableOpacity>

        <CreateCategoryModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={handleCreateCategory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  folderCard: {
    width: '30%',
    margin: '1.5%',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  folderIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  badgeCount: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: colors.info,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.background,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: 'bold',
  },
  folderName: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginTop: 15,
  },
  emptySub: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 5,
  },
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
