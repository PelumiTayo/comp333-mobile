//imports routing functionality for mobile
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MD3LightTheme as DefaultTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';

//component imports
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Ratings from "./pages/Ratings";

//routing is done using the stack data structure
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  // myOwnProperty:true,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: 'white',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Ratings" component={Ratings} />

        </Stack.Navigator>
        <StatusBar style="auto"/>
      </NavigationContainer>
    </PaperProvider>
  );
}
