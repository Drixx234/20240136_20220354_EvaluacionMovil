import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/FireBase';
 
import Login from './src/screens/Login';
import Registro from './src/screens/RegistroDeUsuarios';
import Dashboard from './src/screens/Dashboard';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);
 
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCargando(false);
    });
    return unsub;
  }, []);
 
  if (cargando) return null;
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}