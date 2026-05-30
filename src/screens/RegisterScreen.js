import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { mockUsers } from '../utils/mockData';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // 1. Validar que no haya campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // 2. Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // 3. Validar que el correo no exista ya en la base de datos (simulada)
    const emailExists = mockUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      Alert.alert('Error', 'Ese correo ya está registrado en el sistema. Usa otro o inicia sesión.');
      return;
    }

    // 4. Si todo está bien, simulamos el éxito y lo mandamos al Login
    // En el futuro, aquí harás un fetch('POST') al backend de tu compañero
    Alert.alert(
      '¡Registro Exitoso!', 
      'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
      [
        { text: 'Ir al Login', onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
    backgroundColor: '#28a745', // Un verde para diferenciarlo del login
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});