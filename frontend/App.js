import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import Employee from './screens/Employee';
import ImportScreen from './screens/ImportScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen}  />
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="Employee" component={Employee}  />
    </Stack.Navigator>
  
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home Tab" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Import" component={ImportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
