import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
 
export default function Input(props) {
  return <TextInput style={styles.input} placeholderTextColor={COLORS.gray} {...props} />;
}
 
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: COLORS.text,
    backgroundColor: '#FFF',
  },
});