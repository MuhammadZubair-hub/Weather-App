import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Saveloacationcard = ({temp ,cityname,countryname,weathercondition,deleteonpress}) => {
  return (
            
            <View
               className='bg-coustomwhiteblur rounded-2xl p-5 border-gray-300 border-2 mx-4 my-5 '
                style={{
                  
                 
                  
                  
                  
                }}>
                <View className='flex-row justify-between'>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                    {cityname}, {countryname}
                  </Text>
                  <MaterialCommunityIcons
                   name='delete-outline' 
                   size={25} 
                   color={'red'}
                   onPress={deleteonpress}
                   />
                </View>
                <Text style={{ color: 'white' }}>
                  {temp}°C 
                </Text>
                <Text style={{ color: 'white' }}>
                   {weathercondition}
                </Text>
              </View>
  )
}

export default Saveloacationcard