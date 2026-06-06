import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function DifficultyIndicator({ difficulty }) {
  const maxIcons = 10;
  
  const icons = [];
  for (let i = 0; i < maxIcons; i++) {
    if (i < difficulty) {
      icons.push(<Ionicons key={i} name="heart" size={14} color={colors.danger} />);
    } else {
      icons.push(<Ionicons key={i} name="heart-outline" size={14} color={colors.textMuted} />);
    }
  }

  return (
    <View style={styles.container}>
      {icons}
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
