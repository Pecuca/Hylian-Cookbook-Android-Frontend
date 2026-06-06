import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!name) return Alert.alert('Error', 'El nombre no puede estar vacío');
    setIsLoading(true);
    try {
      await api.updateProfile(name);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return Alert.alert('Error', 'Debes llenar ambas contraseñas');
    setIsLoading(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.titleText}>Mi Perfil</Text>
          
          <Text style={globalStyles.bodyText}>Nombre</Text>
          <TextInput
            style={globalStyles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleUpdateProfile} disabled={isLoading}>
            <Text style={globalStyles.buttonText}>Actualizar Nombre</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={globalStyles.bodyText}>Cambiar Contraseña</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Contraseña actual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            placeholderTextColor={colors.textMuted}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleChangePassword} disabled={isLoading}>
            <Text style={globalStyles.buttonText}>Actualizar Contraseña</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={[globalStyles.buttonPrimary, { borderColor: colors.danger }]} onPress={logout}>
            <Text style={[globalStyles.buttonText, { color: colors.danger }]}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGold,
    marginVertical: 20,
  }
});
