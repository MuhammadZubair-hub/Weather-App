import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import  Ionicons from 'react-native-vector-icons/Ionicons'

const BackButton = ({onpress}) => {

  return (
    <View className='justify-center items-center
        h-12 w-12 
        rounded-full
        absolute top-0
        bottom-0
        right-0
        left-5 bg-coustomwhiteblur' >
        <Ionicons name = 'arrow-back'
         size = {30} 
         
         color = {'white'}  onPress={onpress} />
    </View>
  )
}

export default BackButton

