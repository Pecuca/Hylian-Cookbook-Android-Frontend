import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import HeaderExtension from '../components/HeaderExtension';

export default function EditRecipeScreen({ route, navigation }) {
  const { recipe } = route.params;

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description || '');
  
  // Format ingredients to match dynamic form if it was old style
  const initialIngredients = recipe.ingredients && recipe.ingredients.length > 0
    ? recipe.ingredients.map(i => ({ name: i.name, quantity: i.quantity || '' }))
    : [{ name: '', quantity: '' }];
    
  const [ingredients, setIngredients] = useState(initialIngredients);
  
  const initialSteps = recipe.steps && recipe.steps.length > 0 ? recipe.steps : [''];
  const [steps, setSteps] = useState(initialSteps);
  
  const [difficulty, setDifficulty] = useState(recipe.difficulty || 1);
  const [isPublic, setIsPublic] = useState(recipe.isPublic || false);
  const [image, setImage] = useState(recipe.image || null);

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

  const handleUpdate = async () => {
    // Basic validation
    const validIngredients = ingredients.filter(i => i.name.trim() !== '' && i.quantity.trim() !== '');
    const validSteps = steps.filter(s => s.trim() !== '');

    if (!title || validIngredients.length === 0 || validSteps.length === 0) {
      Alert.alert('Faltan datos', 'Título, al menos un ingrediente y un paso son obligatorios.');
      return;
    }

    const recipeData = {
      title,
      description,
      ingredients: validIngredients,
      steps: validSteps,
      category: recipe.category || 'Almuerzo',
      difficulty,
      isPublic,
      prepTime: recipe.prepTime || 30,
      image: image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'
    };

    try {
      await api.updateRecipe(recipe._id, recipeData);
      Alert.alert('¡Éxito!', 'Receta actualizada correctamente', [
        { 
          text: 'OK', 
          onPress: () => {
            // Regresamos dos veces para volver a la lista si estábamos viendo el detalle, 
            // O una vez si queremos volver al detalle (depende del flujo)
            // Lo más seguro es reiniciar al inicio o hacer un replace
            navigation.navigate('RecipesList');
          } 
        }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      if (i < difficulty) {
        hearts.push(<Ionicons key={i} name="heart" size={24} color={colors.danger} />);
      } else {
        hearts.push(<Ionicons key={i} name="heart-outline" size={24} color={colors.textMuted} />);
      }
    }
    return <View style={styles.heartsContainer}>{hearts}</View>;
  };

  return (
    <View style={globalStyles.container}>
      <HeaderExtension title="Editar Receta" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={globalStyles.card}>
        
        <Text style={globalStyles.label}>Título de la Receta</Text>
        <View style={globalStyles.section}>
          <TextInput
            style={globalStyles.input}
            placeholder="Ej: Elixir Picante"
            value={title}
            onChangeText={setTitle}
            maxLength={30}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <Text style={globalStyles.label}>Descripción</Text>
        <View style={globalStyles.section}>
          <TextInput
            style={[globalStyles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Cuentanos sobre esta receta..."
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={75}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <Text style={globalStyles.label}>Ingredientes</Text>
        <View style={globalStyles.section}>
          {ingredients.map((ing, index) => (
            <View key={index} style={styles.rowItem}>
              <TextInput
                style={[globalStyles.input, { flex: 3, marginRight: 10 }]}
                placeholder="Ingrediente"
                value={ing.name}
                maxLength={75}
                onChangeText={(val) => {
                  const newIngs = [...ingredients];
                  newIngs[index].name = val;
                  setIngredients(newIngs);
                }}
                placeholderTextColor={colors.textMuted}
              />
              <TextInput
                style={[globalStyles.input, { flex: 1 }]}
                placeholder="Cant."
                value={ing.quantity}
                maxLength={15}
                onChangeText={(val) => {
                  const newIngs = [...ingredients];
                  newIngs[index].quantity = val;
                  setIngredients(newIngs);
                }}
                placeholderTextColor={colors.textMuted}
              />
              {ingredients.length > 1 && (
                <TouchableOpacity onPress={() => {
                  const newIngs = ingredients.filter((_, i) => i !== index);
                  setIngredients(newIngs);
                }} style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                  <Ionicons name="trash-outline" size={24} color={colors.danger} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setIngredients([...ingredients, { name: '', quantity: '' }])}
          >
            <Ionicons name="add-circle-outline" size={20} color={colors.accentGoldLight} />
            <Text style={styles.addBtnText}>Añadir Ingrediente</Text>
          </TouchableOpacity>
        </View>

        <Text style={globalStyles.label}>Pasos</Text>
        <View style={globalStyles.section}>
          {steps.map((step, index) => (
            <View key={index} style={styles.rowItem}>
              <Text style={styles.stepIndex}>{index + 1}.</Text>
              <TextInput
                style={[globalStyles.input, { flex: 1 }]}
                placeholder={`Paso ${index + 1}`}
                value={step}
                maxLength={75}
                onChangeText={(val) => {
                  const newSteps = [...steps];
                  newSteps[index] = val;
                  setSteps(newSteps);
                }}
                multiline
                placeholderTextColor={colors.textMuted}
              />
              {steps.length > 1 && (
                <TouchableOpacity onPress={() => {
                  const newSteps = steps.filter((_, i) => i !== index);
                  setSteps(newSteps);
                }} style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                  <Ionicons name="trash-outline" size={24} color={colors.danger} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setSteps([...steps, ''])}
          >
            <Ionicons name="add-circle-outline" size={20} color={colors.accentGoldLight} />
            <Text style={styles.addBtnText}>Añadir Paso</Text>
          </TouchableOpacity>
        </View>

        <Text style={globalStyles.label}>Dificultad</Text>
        <View style={[globalStyles.section, { alignItems: 'center' }]}>
          {renderHearts()}
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={difficulty}
            onValueChange={setDifficulty}
            minimumTrackTintColor={colors.danger}
            maximumTrackTintColor={colors.textMuted}
            thumbTintColor={colors.accentGoldLight}
          />
        </View>

        <Text style={globalStyles.label}>Imagen de la Receta</Text>
        <View style={globalStyles.section}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <>
                <Ionicons name="camera" size={40} color={colors.textMuted} />
                <Text style={{ color: colors.textMuted, marginTop: 10, fontFamily: 'Calamity' }}>Toque para añadir foto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleUpdate}>
          <Text style={globalStyles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIndex: {
    color: colors.accentGoldLight,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Calamity'
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 5,
  },
  addBtnText: {
    color: colors.accentGoldLight,
    marginLeft: 5,
    fontFamily: 'Calamity',
    fontSize: 14,
  },
  heartsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePicker: {
    height: 150,
    backgroundColor: 'rgba(7,7,7,0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});
