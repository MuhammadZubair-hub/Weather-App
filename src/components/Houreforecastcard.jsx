import { View, Text } from 'react-native'
import React from 'react'

const Houreforecastcard = () => {
  return (
    <View className='flex-1 justify-center items-center w-29 p-5 rounded-3xl mt-4 mr-4'
        style={{backgroundColor:'rgba(5,0,2,0.15)'}} 
         >
            <Image 
            className='w-20 h-20'
            resizeMode='contain'
            source={image} />
          <Text className='text-white'>{day}</Text>
          <Text className='text-white '>{date}</Text>
          <Text className='text-white font-semibold text-xl'>{temp}&#176;</Text>
        </View>
  )
}

export default Houreforecastcard