import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import RegistrosDeUsuarios from '../screens/RegistroDeUsuarios';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={login} options={{title:'login'}} />
                <Stack.Screen name="Add" component={Dashboard}/>
                <Stack.Screen name="Add" component={RegistrosDeUsuarios} 
                options={{presentation:'modal', title:'Agregar productos'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;