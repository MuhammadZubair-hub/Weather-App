import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/Home';
import DayForcastScreen from '../screen/DayForcastScreen';
import { StatusBar , View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Drawernaviagtor from './Drawernaviagtor';

const Appnaviagtor = () => {

    const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <View style={{flex:1}}>
          <NavigationContainer>
            <Drawernaviagtor/>
          </NavigationContainer>

        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    
  )
}

export default Appnaviagtor