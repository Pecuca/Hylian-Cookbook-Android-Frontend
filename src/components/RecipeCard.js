import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import DifficultyIndicator from './DifficultyIndicator';

export default function RecipeCard({ recipe, onPress, showAuthor = false }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
        
        {showAuthor && recipe.author && (
          <Text style={styles.author}>Por: {recipe.author.name}</Text>
        )}

        <View style={styles.row}>
          <DifficultyIndicator difficulty={recipe.difficulty || 1} />
          
          {!showAuthor && (
            <View style={[styles.badge, recipe.isPublic ? styles.badgePublic : styles.badgePrivate]}>
              <Ionicons 
                name={recipe.isPublic ? 'earth' : 'lock-closed'} 
                size={12} 
                color={colors.textLight} 
              />
              <Text style={styles.badgeText}>
                {recipe.isPublic ? ' Pública' : ' Privada'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    color: colors.accentGoldLight,
    fontSize: 14,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePublic: {
    backgroundColor: colors.info,
  },
  badgePrivate: {
    backgroundColor: colors.textMuted,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
