import 'react-native-reanimated';

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import TextBox from './components/ui/TextBox';
// import MyButton from './components/ui/MyButton';
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from './screen/Home';
import RootNavigator from './components/RootNavigator';
import { Provider } from 'react-redux';
import store from './storage/store';

  // Create Stack Navigator
  // const Stack = createNativeStackNavigator();
  // function StackNavigator() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
  //       {/* <Stack.Screen name="Profile" component={Profile} /> */}
  //     </Stack.Navigator>
  //   );
  // }

export default function App() {

  return (
    <Provider store={store}>
    <RootNavigator />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
