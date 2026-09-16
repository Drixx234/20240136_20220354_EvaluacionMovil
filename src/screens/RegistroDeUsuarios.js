import { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Input from '../components/Input';
import Boton from '../components/button';
import { COLORS } from '../theme';
 
export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagen, setImagen] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
 
  const registrar = async () => {
    if (!nombre || !fecha || !carnet || !imagen || !email || !pass) {
      return Alert.alert('Error', 'Completa todos los campos');
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, 'usuarios', res.user.uid), {
        nombre, fechaNacimiento: fecha, carnet, imagenUrl: imagen, email,
      });
      Alert.alert('Éxito', 'Usuario registrado');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <Input placeholder="Nombre completo" value={nombre} onChangeText={setNombre} />
      <Input placeholder="Fecha nacimiento (DD/MM/AAAA)" value={fecha} onChangeText={setFecha} />
      <Input placeholder="Carnet" value={carnet} onChangeText={setCarnet} />
      <Input placeholder="URL de imagen" value={imagen} onChangeText={setImagen} autoCapitalize="none" />
      <Input placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input placeholder="Contraseña" value={pass} onChangeText={setPass} secureTextEntry />
      <Boton title="Registrarme" onPress={registrar} />
      <Boton title="Volver" variant="outline" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60, backgroundColor: COLORS.background, flexGrow: 1 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 20, textAlign: 'center' },
});