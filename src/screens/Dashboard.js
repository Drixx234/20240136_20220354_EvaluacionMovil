import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import Input from '../components/Input';
import Boton from '../components/button';
import { COLORS } from '../theme';
 
export default function Dashboard() {
  const [datos, setDatos] = useState(null);
  const [editando, setEditando] = useState(false);
 
  const uid = auth.currentUser?.uid;
 
  const cargar = async () => {
    const snap = await getDoc(doc(db, 'usuarios', uid));
    if (snap.exists()) setDatos(snap.data());
  };
 
  useEffect(() => { cargar(); }, []);
 
  const guardar = async () => {
    try {
      await updateDoc(doc(db, 'usuarios', uid), datos);
      setEditando(false);
      Alert.alert('Actualizado');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };
 
  if (!datos) return <View style={styles.container}><Text>Cargando...</Text></View>;
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>
      <Image source={{ uri: datos.imagenUrl }} style={styles.img} />
 
      {editando ? (
        <>
          <Input value={datos.nombre} onChangeText={(v) => setDatos({ ...datos, nombre: v })} />
          <Input value={datos.fechaNacimiento} onChangeText={(v) => setDatos({ ...datos, fechaNacimiento: v })} />
          <Input value={datos.carnet} onChangeText={(v) => setDatos({ ...datos, carnet: v })} />
          <Input value={datos.imagenUrl} onChangeText={(v) => setDatos({ ...datos, imagenUrl: v })} />
          <Boton title="Guardar" onPress={guardar} />
          <Boton title="Cancelar" variant="outline" onPress={() => { setEditando(false); cargar(); }} />
        </>
      ) : (
        <>
          <Text style={styles.txt}>Nombre: {datos.nombre}</Text>
          <Text style={styles.txt}>Nacimiento: {datos.fechaNacimiento}</Text>
          <Text style={styles.txt}>Carnet: {datos.carnet}</Text>
          <Text style={styles.txt}>Correo: {datos.email}</Text>
          <Boton title="Editar" onPress={() => setEditando(true)} />
        </>
      )}
 
      <Boton title="Cerrar sesión" variant="outline" onPress={() => signOut(auth)} />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60, backgroundColor: COLORS.background, flexGrow: 1 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 20, textAlign: 'center' },
  img: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20, backgroundColor: '#EEE' },
  txt: { fontSize: 16, color: COLORS.text, marginBottom: 10 },
});