import { View, Text, Image } from 'react-native'
import React from 'react'

const SomeStats = ({wind,wind_image,humidity_image,humidity ,time,time_image}) => {
  return (
    <View className='flex-row justify-between mx-3 mb-3'>
      <View className='flex-row items-center'>
        <Image 
         className='h-6 w-6'
         source={wind_image}
         />
        <Text className='text-white font-semibold text-base ml-2'>{wind}km</Text>
      </View>

      <View className='flex-row items-center'>
        <Image 
         className='h-6 w-6'
         source={humidity_image}
         />
        <Text className='text-white font-semibold text-base ml-2'>{humidity}%</Text>
      </View>

      <View className='flex-row items-center'>
        <Image 
         className='h-6 w-6'
         source={time_image}
         />
        <Text className='text-white font-semibold text-base ml-2'>{time}</Text>
      </View>
    </View>
  )
}

export default SomeStats



