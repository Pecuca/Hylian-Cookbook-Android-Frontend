import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { mockUsers } from '../utils/mockData'; // Importamos la base de datos simulada

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 1. Validar campos vacíos
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    // 2. Buscar al usuario en la base de datos simulada
    const validUser = mockUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    // 3. Validar credenciales
    if (validUser) {
      // Éxito: Limpiamos los campos (opcional) y vamos al Home
      setEmail('');
      setPassword('');
      navigation.replace('Home'); 
    } else {
      // Fracaso: Correo o clave incorrectos
      Alert.alert('Acceso Denegado', 'El correo o la contraseña son incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Recetario</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  }
});