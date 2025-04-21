import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import  Ionicons from 'react-native-vector-icons/Ionicons'


const Header = () => {

    const navigation = useNavigation();

    const ToggleDrawer = () => {
        navigation.toggleDrawer();
    }

    return (
        <View style={styles.headerConatiner}>
            <TouchableOpacity onPress={ToggleDrawer}>
                {/* <CalendarDaysIcon size={30} color={'red'} /> */}
                <Ionicons name={'menu-outline'} size ={30} color ={'white'}/>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Ionicons name='search-outline' color={Color.iconprimary} size={Size.h * 0.04} />
            </TouchableOpacity> */}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

    headerConatiner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10
    }



})