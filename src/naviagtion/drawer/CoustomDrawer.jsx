import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon,CalendarDaysIcon ,} from 'react-native-heroicons/outline'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import  Ionicons from 'react-native-vector-icons/Ionicons'

const CoustomDrawer = (props) => {

    const ToggleDrawer =()=>{
        props.navigation.toggleDrawer();
    }

  return (
    <DrawerContentScrollView style={styles.container}>
            <View style={styles.drawerheadercontainer}>
                <TouchableOpacity onPress={ToggleDrawer}>
                    <Ionicons name={'close-outline'} size={40} color={'#003049'} />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <MagnifyingGlassIcon size={24} color={'red'} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.draweritemcontainer}>
                <DrawerItem
                    label={'Home'}
                    labelStyle={styles.label}
                    style={styles.draweritem}
                    icon={() => (
                        <Ionicons name={'home-outline'} size={24} color={'#264653'} />
                    )}
                />
                <View className='h-0.5 m-5 mx-4 bg-customblue'/>

                <DrawerItem
                    label={'Save Locations'}
                    labelStyle={styles.label}
                    style={styles.draweritem}
                    onPress={() => { props.navigation.navigate('savescreen') }}
                    icon={() => (
                        <Ionicons name={'bookmark-outline'} size={24} color={'#264653'} />
                    )}
                />
                <View className='h-0.5 m-5 mx-4 bg-customblue'/>

                <DrawerItem
                    label={'Setting'}
                    labelStyle={styles.label}
                    style={styles.draweritem}
                    icon={() => (
                        <MagnifyingGlassIcon size={24} color={'#264653'} />
                    )}
                />
            </View>

        </DrawerContentScrollView>
  )
}

export default CoustomDrawer


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)', 
        padding: 9,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      },
      drawerheadercontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginBottom: 10,
      },
      draweritemcontainer: {
        marginVertical: 20,
      },
      draweritem: {
        
        marginVertical: 15,
        borderRadius: 10,
      },
      label: {
        color: '#003049', 
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10,
      },
      
})