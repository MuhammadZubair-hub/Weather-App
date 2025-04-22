import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Stacknaviagtor from './Stacknaviagtor';
// import Savelocation from '../screen/Savelocation';
import CoustomDrawer from './drawer/CoustomDrawer';
import Savelocation from '../screen/Savelocation';

const Drawernaviagtor = () => {

    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
            backgroundColor: 'transparent', 
            width: '75%', 
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        sceneContainerStyle: { backgroundColor: 'transparent' },
    }}
    drawerContent={(props) => <CoustomDrawer {...props} />}
        >
        <Drawer.Screen name='HomeScreen' component={Stacknaviagtor} />
        <Drawer.Screen name='savescreen' component={Savelocation} />
    </Drawer.Navigator>
  )
}

export default Drawernaviagtor