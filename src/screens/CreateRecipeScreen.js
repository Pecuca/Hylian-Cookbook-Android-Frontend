import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';

export default function CreateRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title || !ingredients || !steps) {
      Alert.alert('Faltan datos', 'Título, ingredientes y pasos son obligatorios.');
      return;
    }

    // Format ingredients correctly for backend
    const formattedIngredients = ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i)
      .map(name => ({ name, quantity: 'Al gusto' })); // Simplified for now, the UI just took a single string

    const formattedSteps = steps
      .split(',')
      .map(s => s.trim())
      .filter(s => s);

    const recipeData = {
      title,
      description,
      ingredients: formattedIngredients,
      steps: formattedSteps,
      category: 'Almuerzo', // Default for now as backend requires it
      difficulty,
      isPublic,
      prepTime: 30, // Default for now
      image: image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'
    };

    try {
      await api.createRecipe(recipeData);
      Alert.alert('¡Éxito!', 'Receta creada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const renderDifficultySelector = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setDifficulty(i)}>
          <Ionicons 
            name={i <= difficulty ? 'star' : 'star-outline'} 
            size={24} 
            color={colors.accentGold} 
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={{ padding: 15 }} keyboardShouldPersistTaps="handled">
        
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color={colors.accentGold} />
              <Text style={{ color: colors.textMuted }}>Añadir Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={globalStyles.input}
          placeholder="Título de la receta..."
          placeholderTextColor={colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[globalStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Descripción (opcional)..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Dificultad (1-10): {difficulty}</Text>
        {renderDifficultySelector()}

        <TextInput
          style={[globalStyles.input, { height: 80, textAlignVertical: 'top', marginTop: 15 }]}
          placeholder="Ingredientes (separados por comas)..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={ingredients}
          onChangeText={setIngredients}
        />

        <TextInput
          style={[globalStyles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Pasos (separados por comas)..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={steps}
          onChangeText={setSteps}
        />

        <View style={styles.switchRow}>
          <Text style={{ color: colors.textLight, fontSize: 16 }}>
            {isPublic ? '🌍 Hacer Pública' : '🔒 Mantener Privada'}
          </Text>
          <TouchableOpacity 
            style={[styles.switch, isPublic && styles.switchActive]}
            onPress={() => setIsPublic(!isPublic)}
          >
            <View style={[styles.switchThumb, isPublic && styles.switchThumbActive]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleSave}>
          <Text style={globalStyles.buttonText}>Crear Receta</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  label: {
    color: colors.textMuted,
    marginBottom: 5,
    marginLeft: 5,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    marginBottom: 20,
  },
  switch: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 2,
  },
  switchActive: {
    backgroundColor: 'rgba(200, 168, 78, 0.5)',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.textMuted,
  },
  switchThumbActive: {
    backgroundColor: colors.accentGoldLight,
    transform: [{ translateX: 24 }],
  }
});