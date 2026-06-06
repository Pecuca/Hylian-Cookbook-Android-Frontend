import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import HeaderExtension from '../components/HeaderExtension';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

  const handleUpdateProfile = async () => {
    if (!name) return Alert.alert('Error', 'El nombre no puede estar vacío');
    setIsLoading(true);
    try {
      await api.updateProfile(name);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setNameModalVisible(false);
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
      setPasswordModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderExtension title="Mi Perfil" />
      <View style={styles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.label}>Nombre</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{user?.name || name}</Text>
            <TouchableOpacity onPress={() => setNameModalVisible(true)}>
              <Ionicons name="pencil" size={24} color={colors.accentGoldLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={globalStyles.label}>Contraseña</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>••••••••</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setPasswordModalVisible(true)}>
                <Ionicons name="pencil" size={24} color={colors.accentGoldLight} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={[globalStyles.buttonPrimary, { borderColor: colors.danger }]} onPress={logout}>
            <Text style={[globalStyles.buttonText, { color: colors.danger }]}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Cambio de Nombre */}
      <Modal visible={isNameModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[globalStyles.titleText, { textAlign: 'center' }]}>Cambiar Nombre</Text>
            <Text style={globalStyles.label}>Nuevo Nombre</Text>
            <TextInput
              style={globalStyles.input}
              value={name}
              onChangeText={setName}
              maxLength={30}
              placeholderTextColor={colors.textMuted}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setNameModalVisible(false)}>
                <Text style={[globalStyles.buttonText, { color: colors.textMuted }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={handleUpdateProfile} disabled={isLoading}>
                <Text style={[globalStyles.buttonText, { color: colors.accentGoldLight }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Cambio de Contraseña */}
      <Modal visible={isPasswordModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[globalStyles.titleText, { textAlign: 'center' }]}>Cambiar Contraseña</Text>
            
            <Text style={globalStyles.label}>Escribe tu Contraseña actual</Text>
            <View style={styles.inputWithEye}>
              <TextInput
                style={[globalStyles.input, { flex: 1 }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                maxLength={30}
                placeholderTextColor={colors.textMuted}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeBtn}>
                <Ionicons name={showCurrentPassword ? 'eye-off' : 'eye'} size={22} color={colors.accentGoldLight} />
              </TouchableOpacity>
            </View>
            
            <Text style={globalStyles.label}>Nueva contraseña</Text>
            <View style={styles.inputWithEye}>
              <TextInput
                style={[globalStyles.input, { flex: 1 }]}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                maxLength={30}
                placeholderTextColor={colors.textMuted}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeBtn}>
                <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={22} color={colors.accentGoldLight} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setPasswordModalVisible(false)}>
                <Text style={[globalStyles.buttonText, { color: colors.textMuted }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={handleChangePassword} disabled={isLoading}>
                <Text style={[globalStyles.buttonText, { color: colors.accentGoldLight }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  infoText: {
    color: colors.textLight,
    fontSize: 18,
    fontFamily: 'Calamity',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputWithEye: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
