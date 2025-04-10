import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/Home';
import DayForcastScreen from '../screen/DayForcastScreen';

const Appnaviagtor = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='DayForcastScreen' component={DayForcastScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default Appnaviagtor