import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function FilterBar({ sortOption, isAscending, onSortChange, onToggleOrder }) {
  // sortOption can be: 'alpha', 'date', 'difficulty'
  
  const handleNextSort = () => {
    const options = ['alpha', 'date', 'difficulty'];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    onSortChange(options[nextIndex]);
  };

  const getSortLabel = () => {
    if (sortOption === 'alpha') return 'A - Z';
    if (sortOption === 'date') return 'Fecha';
    return 'Dificultad';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ordenar por:</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleNextSort}>
          <Text style={styles.buttonText}>{getSortLabel()}</Text>
          <Ionicons name="swap-horizontal" size={16} color={colors.accentGold} style={{ marginLeft: 5 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onToggleOrder}>
          <Ionicons 
            name={isAscending ? 'arrow-up' : 'arrow-down'} 
            size={18} 
            color={colors.accentGold} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(200, 168, 78, 0.3)',
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.accentGoldLight,
    fontWeight: 'bold',
  },
});
