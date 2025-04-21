import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screen/Home';
import DayForcastScreen from '../screen/DayForcastScreen';

const Stacknaviagtor = () => {

    const Stack = createNativeStackNavigator();

  return (
    
         <Stack.Navigator screenOptions={{headerShown:false}}> 
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='DayForcastScreen' component={DayForcastScreen} options={{
    header: () => <Header />  // 👈 or headerLeft with custom drawer icon
  }}/>
        </Stack.Navigator> 
    
  )
}

export default Stacknaviagtor