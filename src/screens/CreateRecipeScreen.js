import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert } from 'react-native';

export default function CreateRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSaveRecipe = () => {
    if (!title || !ingredients || !steps) {
      Alert.alert('Faltan datos', 'Por favor completa todos los campos de la receta.');
      return;
    }

    // SIMULACIÓN: Aquí luego harás un fetch('POST') al backend de tu compañero.
    // Por ahora, solo mostramos en consola lo que se enviaría.
    const newRecipe = {
      title,
      ingredients: ingredients.split(',').map(i => i.trim()), // Convierte el texto en un array
      steps: steps.split(',').map(s => s.trim()),
      isPublic,
      userId: "user_1" // Simulamos que la crea el usuario logueado
    };

    console.log("Guardando nueva receta:", newRecipe);
    
    Alert.alert('¡Éxito!', 'Receta guardada correctamente', [
      { text: 'OK', onPress: () => navigation.goBack() } // Devuelve a la pantalla anterior
    ]);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Nueva Receta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título (Ej. Ramen con Huevo Poché)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ingredientes (separados por comas)"
        multiline
        numberOfLines={3}
        value={ingredients}
        onChangeText={setIngredients}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Pasos a seguir (separados por comas)"
        multiline
        numberOfLines={4}
        value={steps}
        onChangeText={setSteps}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {isPublic ? '🌍 Receta Pública' : '🔒 Receta Privada'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isPublic ? '#007bff' : '#f4f3f4'}
          onValueChange={setIsPublic}
          value={isPublic}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
        <Text style={styles.buttonText}>Guardar Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});