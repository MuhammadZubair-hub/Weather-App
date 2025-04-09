import {  Button, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Dashborad = () => {
   const navigation = useNavigation();
    return (
      <View className='flex-1 items-center justify-center bg-indigo-700 ' >
        <Text className='text-center text-xl bg-slate-100'>This is dashboard Screen</Text>
        <Button title='Go to dashboard' onPress={navigation.goBack()} ></Button>
      </View>
    )
}

export default Dashborad
