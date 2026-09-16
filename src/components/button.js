import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
 
export default function Boton({ title, onPress, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor: isPrimary ? COLORS.primary : '#FFF', borderWidth: isPrimary ? 0 : 1, borderColor: COLORS.primary }]}
    >
      <Text style={[styles.txt, { color: isPrimary ? '#FFF' : COLORS.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  btn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  txt: { fontWeight: '600', fontSize: 16 },
});
 