import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddTodoScreen from './src/screen/AddTodoScreen';
import ViewTodosScreen from './src/screen/ViewTodosScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initial RouteName = "ViewTodos">
          <Stack.Screen
            name = "AddTodo"
            component = {AddTodoScreen}
            option = {{ title: 'Tambah To-Do' }}
            />
          <Stack.Screen
            name = "ViewTodos"
            component = {ViewTodosScreen}
            option = {{ title: 'Daftar To-Do' }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;