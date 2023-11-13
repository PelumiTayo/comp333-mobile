//imports routing functionality for mobile
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//component imports
import SignUp from "./components/SignUp";
import Landing from "./components/Landing";

//routing is done using the stack data structure
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}
