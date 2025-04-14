import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/Home';
import DayForcastScreen from '../screen/DayForcastScreen';
import { StatusBar } from 'react-native';

const Appnaviagtor = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'yellow'} ></StatusBar>
        <Stack.Navigator screenOptions={{headerShown:false}}> 
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='DayForcastScreen' component={DayForcastScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default Appnaviagtor