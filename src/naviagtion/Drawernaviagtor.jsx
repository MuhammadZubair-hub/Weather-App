import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Stacknaviagtor from './Stacknaviagtor';
import Savelocation from '../screen/Savelocation';
import CoustomDrawer from './drawer/CoustomDrawer';

const Drawernaviagtor = () => {

    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false}}
        drawerContent={(props)=><CoustomDrawer {...props} />}
        >
        <Drawer.Screen name='drawer' component={Stacknaviagtor} />
        <Drawer.Screen name='save screen' component={Savelocation} />
    </Drawer.Navigator>
  )
}

export default Drawernaviagtor