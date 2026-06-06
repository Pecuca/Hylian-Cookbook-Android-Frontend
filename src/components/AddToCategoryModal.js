import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { api } from '../services/api';

export default function AddToCategoryModal({ visible, onClose, recipeId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      loadCategories();
    }
  }, [visible]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const cats = await api.getMyCategories();
      setCategories(cats);
    } catch (e) {
      console.log('Error loading categories', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (categoryId) => {
    try {
      await api.addRecipeToCategory(categoryId, recipeId);
      onClose(); // Cerrar el modal al terminar con éxito
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Guardar en...</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.accentGold} style={{ margin: 20 }} />
          ) : categories.length === 0 ? (
            <Text style={styles.empty}>No tienes categorías creadas.</Text>
          ) : (
            <FlatList
              data={categories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryRow} onPress={() => handleSelect(item._id)}>
                  <Ionicons name="folder" size={20} color={colors.accentGold} />
                  <Text style={styles.categoryName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 2,
    borderColor: colors.borderGold,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.accentGoldLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryName: {
    color: colors.textLight,
    fontSize: 16,
    marginLeft: 15,
  },
});
