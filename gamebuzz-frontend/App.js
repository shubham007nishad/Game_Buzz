import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './src/screens/feedscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{
            headerShown: false, // Hides the default header for a clean UI
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
