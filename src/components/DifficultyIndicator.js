import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function DifficultyIndicator({ difficulty }) {
  // difficulty es del 1 al 10
  // Mostramos estrellas o barras (ej. 5 estrellas enteras/medias, o 10 puntos)
  // Vamos a usar corazones/iconos para que sea tipo Zelda
  const maxIcons = 5; // Mostrar 5 iconos en total, cada uno vale 2 puntos
  const fullIcons = Math.floor(difficulty / 2);
  const halfIcon = difficulty % 2 !== 0;

  const icons = [];
  for (let i = 0; i < maxIcons; i++) {
    if (i < fullIcons) {
      icons.push(<Ionicons key={i} name="heart" size={16} color={colors.danger} />);
    } else if (i === fullIcons && halfIcon) {
      icons.push(<Ionicons key={i} name="heart-half" size={16} color={colors.danger} />);
    } else {
      icons.push(<Ionicons key={i} name="heart-outline" size={16} color={colors.textMuted} />);
    }
  }

  return (
    <View style={styles.container}>
      {icons}
      <Text style={styles.text}>{difficulty}/10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.textLight,
    marginLeft: 5,
    fontSize: 12,
  },
});
