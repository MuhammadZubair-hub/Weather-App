import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { weatherImages } from '../constant';
import Houreforecastcard from '../components/Houreforecastcard';
import { formatTo12Hours } from '../utils/timefunction';



const DayForcastScreen = ({route}) => {

    console.log(route.params)
    const {dayData} = route.params;
    //console.log(route.parmas)

    const date = new Date(dayData?.date);
    const options = {weekday:'long'};
    const dayName = date.toLocaleDateString('en-US',options);

    //const [hourforcast,setHourforecast] = useState([]);

    const currentHour = new Date().getHours();
    const storedHourData =[
        ...dayData?.hour?.slice(currentHour),
        ...dayData?.hour?.slice(0,currentHour)
    ]

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
                    
                    <View className='flex-row flex-wrap justify-between mt-4'>
                        <View 
                            className=' self-start mt-4  rounded-2xl p-5'
                            style={{backgroundColor:'rgba(0,0,0,0.2)'}}>

                                    <Text className='text-white text-3xl mb-2'>{dayName}</Text>
                                    <Text className='text-white text-2xl'>{dayData?.day?.condition?.text}</Text>
                                    <Text className='text-white text-1xl'>{dayData?.date}</Text>
                        </View>
                        <View 
                            className='self-start mt-4  rounded-2xl p-5'
                            style={{backgroundColor:'rgba(255,0,0,0.4)'}}>
                                    
                                    <Text className='text-white text-3xl mb-2'>Ultra Voilet Ray</Text>

                                    <View className='flex-row flex-wrap items-center gap-2'>
                                        <Image className='h-12 w-12'
                                        resizeMode='contain' 
                                         source={require('../assets/icons/ultraviolet.png')} />
                                        <Text className='text-white text-1xl'> {dayData?.day?.uv}</Text>
                                    </View>
                        </View>
                    </View>

                   <View 
                        className='flex-row flex-wrap mt-4  p-5  h-100  w-100 relative rounded-2xl '
                        style={{backgroundColor:'rgba(0,0,0,0.2)'}}>

                            
                          
                          <Text className='text-white text-base w-1/2'>Moonrise : {dayData?.astro.moonrise}</Text>
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

                    <View 
                        className='flex-row flex-wrap justify-between items-center mt-4  p-5  h-100 w-100 gap-y-3 rounded-2xl '
                        style={{backgroundColor:'rgba(0,0,0,0.2)'}}>

                            <View className='self-start rounded-3xl p-2'
                            style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                                    <Text className='text-white text-base '>Minimum Temp : {dayData?.day?.mintemp_c}&#176;</Text>
                            </View>
                            <View className='self-start rounded-3xl p-2'
                            style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                                    <Text className='text-white text-base '>Average Temp : {dayData?.day?.avgtemp_c}&#176;</Text>
                            </View>
                            <View className='self-start rounded-3xl p-2'
                            style={{backgroundColor:'rgba(255,214,0,0.8)'}}>
                                    <Text className='text-white text-base '>Maximum Temp : {dayData?.day?.maxtemp_c}&#176;</Text>
                            </View>
                            
                          
                    </View>

                    <View className='flex-row flex-wrap justify-between items-center mt-4  p-5  h-100 w-100 gap-y-3 rounded-2xl ' 
                    style={{backgroundColor:'rgba(0,0,0,0.2)'}}>

                        <View className='flex-col justify-between'>

                            <View className='flex-row flex-wrap justify-between'>

                                <View className='self-start rounded-3xl p-2'style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                                            <Text className='text-white text-base '>Chance of Rain :   {dayData?.day?.daily_chance_of_rain}%</Text>
                                </View>

                                <View className='flex-row flex-wrap gap-4 items-center rounded-3xl p-2'style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
                                            <Image className='h-8 w-8' source={require('../assets/icons/wind.png')} />
                                            <Text className='text-white text-base '>{dayData?.day?.maxwind_kph}kp/h</Text>
                                </View>
                            </View>
                            
                            <ScrollView
                            horizontal
                            >
                            {

                                storedHourData.map((value,index)=>{

                                    return(
                                        <Houreforecastcard
                                        key={index}
                                        text={value?.condition?.text}
                                        textimage={weatherImages[value?.condition?.text]}
                                        rain={value?.chance_of_rain}
                                        time={formatTo12Hours(value?.time?.split(' ')[1])}
                                        temp={value?.temp_c}
                                        
                                        />
                                    )
                                })
                            }
                            </ScrollView>
                        </View>

                    </View>


             </SafeAreaView>

        </View>

    </ScrollView>
  )
}

export default DayForcastScreen