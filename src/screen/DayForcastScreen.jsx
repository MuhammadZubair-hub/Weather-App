import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { weatherImages } from '../constant';


const DayForcastScreen = ({route}) => {

    console.log(route.params)
    const {dayData} = route.params;
    //console.log(route.parmas)

    const date = new Date(dayData?.date);
    const options = {weekday:'long'};
    const dayName = date.toLocaleDateString('en-US',options);

  return (
    <ScrollView
        contentContainerStyle={{flexGrow:1}}
        >
        <View className='flex-1 relative' >
            <Image 
                className ='absolute h-full w-full'
                blurRadius={20}
                source={require('../assets/images/bg-2.jpg')} 
             />

             <SafeAreaView 
                className='flex-1 mx-7'>
                    
                    <View 
                        className=' self-start mt-4  rounded-2xl p-5'
                        style={{backgroundColor:'rgba(0,0,0,0.2)'}}>

                                <Text className='text-white text-3xl mb-2'>{dayName}</Text>
                                <Text className='text-white text-2xl'>{dayData?.day?.condition?.text}</Text>
                                <Text className='text-white text-1xl'>{dayData?.date}</Text>
                    </View>

                   <View 
                        className='flex-row flex-wrap items-center mt-4  p-5  h-100  w-100 relative rounded-2xl '
                        style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
                          
                          <Text className='text-white text-base w-1/2 '>Moonrise : {dayData?.astro.moonrise}</Text>
                          <Text className='text-white text-base w-1/2'>Moonset : {dayData?.astro.moonset}</Text>
                          <Text className='text-white text-base w-1/2'>Sunrise : {dayData?.astro.sunrise}</Text>
                          <Text className='text-white text-base w-1/2'>Sunset : {dayData?.astro?.sunset}</Text>
                    </View>

                    <View 
                        className=' justify-center items-center mt-4 h-70  w-70 relative rounded-2xl'
                        style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                          
                            <Image 
                                className='h-60 w-60'
                                source={weatherImages[dayData?.day?.condition?.text]} />
                                
                    </View>


             </SafeAreaView>

        </View>

    </ScrollView>
  )
}

export default DayForcastScreen