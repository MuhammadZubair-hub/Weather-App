import { View, Text, Image } from 'react-native'
import React from 'react'

const Houreforecastcard = ({text,textimage,temp,time,rain}) => {

  const Chanceofrain = rain;

  return (
    <View className='flex-1 justify-center items-center w-29 p-5 rounded-3xl mt-4 mr-4'
         
         >
          <Text className='text-white '>{time}</Text>
            <Image 
            className='w-10 h-10'
            resizeMode='contain'
            source={textimage} />
          {
            Chanceofrain > 0 ?(
              <Text className='text-white'>{rain} %</Text>
            ):(null)
          }
          
          <Text className='text-white font-semibold text-xl'>{temp}&#176;</Text>
        
        </View>
  )
}

export default Houreforecastcard