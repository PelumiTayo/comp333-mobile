//imports routing functionality for mobile
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

//component imports
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Ratings from "./pages/Ratings";
import AddRating from "./pages/AddRating";
import ViewRating from "./pages/ViewRating";
import UpdateRating from "./pages/UpdateRating";

//routing is done using the stack data structure
const Stack = createNativeStackNavigator();
const ViewRatingStack = createNativeStackNavigator();
const UpdateRatingStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  // myOwnProperty:true,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "white",
  },
};

function RatingsViewStackNav() {
  return (
    <ViewRatingStack.Navigator initialRouteName="Main">
      <ViewRatingStack.Screen name="Main" component={Ratings}/>
      <ViewRatingStack.Screen name="View" component={ViewRating}/>
      <ViewRatingStack.Screen name="Update" component={UpdateRating}/>
    </ViewRatingStack.Navigator>
  );
}

function RatingsTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // if (route.name === "Home") {
          //   iconName = focused
          //     ? "ios-information-circle"
          //     : "ios-information-circle-outline";
          // } else if (route.name === "Settings") {
          //   iconName = focused ? "ios-list" : "ios-list-outline";
          // }
          switch(route.name) {
            case "Home":
              iconName="home-outline"
              break;
            case "Add Rating":
              iconName="add-outline"
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={RatingsViewStackNav} options={{headerShown:false}}/>
      <Tab.Screen name="Add Rating" component={AddRating} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Ratings"
            component={RatingsTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
