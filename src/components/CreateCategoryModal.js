import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

export default function CreateCategoryModal({ visible, onClose, onCreate }) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Nueva Categoría</Text>
          
          <TextInput
            style={globalStyles.input}
            placeholder="Nombre de la categoría..."
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreate}>
              <Text style={styles.createText}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    color: colors.accentGoldLight,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cancelText: {
    color: colors.textMuted,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: 'rgba(200, 168, 78, 0.2)',
    borderWidth: 1,
    borderColor: colors.accentGold,
  },
  createText: {
    color: colors.accentGoldLight,
    fontWeight: 'bold',
  },
});
