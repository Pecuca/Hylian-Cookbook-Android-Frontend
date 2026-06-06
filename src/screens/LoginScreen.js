import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener mínimo 8 caracteres');
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      Alert.alert('Acceso Denegado', result.error);
    }
    // Si hay éxito, el AuthContext actualiza el estado y el App.js navega automáticamente
  };

  return (
    <LinearGradient colors={['#0d1f0d', '#1a2e1a']} style={globalStyles.container}>
      <View style={styles.content}>
        <Text style={globalStyles.titleText}>Hylian Cookbook</Text>
        <Text style={styles.subtitle}>Iniciar Sesión</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color={colors.accentGold} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color={colors.accentGold} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={globalStyles.buttonPrimary} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.accentGoldLight} />
          ) : (
            <Text style={globalStyles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkButton}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.textLight,
    paddingVertical: 15,
  },
  eyeIcon: {
    padding: 5,
  },
  linkButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: colors.info,
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});