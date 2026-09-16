 import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/config/FireBase.js';
import Input from '../components/Input';
import Boton from '../components/button';
import { COLORS } from '../theme';
 
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
 
  const ingresar = async () => {
    if (!email || !pass) return Alert.alert('Error', 'Completa todos los campos');
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <Input placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input placeholder="Contraseña" value={pass} onChangeText={setPass} secureTextEntry />
      <Boton title="Ingresar" onPress={ingresar} />
      <Boton title="Crear cuenta" variant="outline" onPress={() => navigation.navigate('Registro')} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: COLORS.background },
  titulo: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, marginBottom: 24, textAlign: 'center' },
});
 