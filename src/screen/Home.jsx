import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { MagnifyingGlassIcon,CalendarDaysIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import {debounce} from 'lodash'
import { fetchLocation, fetchWeatherForcast } from '../api/weatherapi'
import { weatherImages } from '../constant'

const Home = () => {

  const [showsearchbar, Setshowsearchbar] = useState(false);
  const [loaction, setLoaction] = useState([]);
  const [weather,setWeather]= useState({});

  const handlePress =value=>{
    console.log(value);
    setLoaction([]);
    
    fetchWeatherForcast({
      cityName:value.name,
      days:'7',
    }).then(response=>{
      console.log('forcast data',response)
      setWeather(response.data)
    })
  }

  const handleSearch = value=>{ 
  fetchLocation({cityName:value}).then(response=>{
        setLoaction(response.data)
        console.log(response);
        console.log('data on array',loaction)
        
    })
  }

  const handleTextdebounce = useCallback(debounce(handleSearch,1200),[]);

  //destructing the curent and loaction object from weather array 
  const {current, location} = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar barStyle={'dark-content'} backgroundColor={'rgba(5,0,2,0.1)'} />
      <Image blurRadius={70} source={require('../assets/images/bg.png')} className='absolute h-full w-full' />
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className='flex-1'>
        <SafeAreaView className='flex-1'>
            {/* search bar view */}
          <View className='mx-4 relative z-50 pt-10'>
            {/* Search Bar */}
            <View className='flex-row h-14 justify-end items-center rounded-full px-4 overflow-hidden'
              style={{ backgroundColor: showsearchbar ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
              {
                showsearchbar ? (
                  <TextInput
                    onChangeText={handleTextdebounce}
                    placeholder='Search City'
                    placeholderTextColor={'lightgray'}
                    className='h-10 flex-1 text-white text-base pr-2'
                  />
                ) : null
              }

              <TouchableOpacity
                className='rounded-full p-3 ml-2'
                style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                onPress={() => Setshowsearchbar(!showsearchbar)} >
                <MagnifyingGlassIcon size={24} color={'lightgray'} />
              </TouchableOpacity>
            </View>

            {/* Location List */}
            {
              showsearchbar && loaction.length > 0 && (
                <View className='mt-2 rounded-3xl w-full p-2' style={{backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  {
                    loaction.map((value,index) => {

                        const showborder = index+1 !=loaction.length;
                        const border = showborder?'border-b border-gray-400':''

                        return(
                        <TouchableOpacity
                            key={index}
                            onPress={()=>handlePress(value)}
                            className={'flex-row items-center p-2 '+border}>
                            <MapPinIcon size={16} color={'gray'} />
                            <Text className='ml-4 text-white'>{value?.name}, {value?.country}</Text>
                      </TouchableOpacity>
                        )
                    })
                  }
                </View>
              )
            }

          </View>

          {/* forecast section */}
          <View className='mx-4 flex flex-1 mb-3 justify-around'>
            {/* loaction detials */}

            <Text 
            className='text-white font-semibold text-center text-2xl'
             >{location?.name},
             <Text 
            className='text-gray-400 font-semibold  text-large'
             >{location?.country}</Text>
             </Text>
             {/* waether image */}
             <View className='flex-row justify-center'>
                <Image
                className='w-80 h-80'
                 source={weatherImages[current?.condition.text]} ></Image>
             </View>

             {/* Teamprature */}
             <View className='space-y-2'>
                <Text className='text-white font-bold text-center text-6xl'>
                    {current?.temp_c}&#176;
                </Text>
                <Text className='text-white font-bold text-center text-xl'>
                    {current?.condition.text}
                </Text>
             </View>

          </View>
          {/* other stats */}
          <View className='flex-row justify-between mx-4 mb-3' >
            <View className='flex-row items-center'>
                <Image className='h-6 w-6' source={require('../assets/icons/wind.png')} ></Image>
                <Text className='text-white font-semibold text-base ml-2' >{current?.windchill_c}km</Text>
            </View>
            <View className='flex-row  items-center'>
                <Image className='h-6 w-6' source={require('../assets/icons/drop.png')} ></Image>
                <Text className='text-white font-semibold text-base ml-2' >{current?.humidity}%</Text>
            </View>
            <View className='flex-row  items-center'>
                <Image className='h-6 w-6' source={require('../assets/icons/sun.png')} ></Image>
                <Text className='text-white font-semibold text-base ml-2' >5:40 PM</Text>
            </View>
          </View>

          {/* forcast for next days */}
          <View className='mb-2 space-y-3'>
            <View className='flex-row items-center mx-2' >
                <CalendarDaysIcon size={22} color={'white'} ></CalendarDaysIcon>
                <Text className='text-white text-base ml-2'>Daily Forcast</Text>
            </View>
            
            <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal:30}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >

            {
              weather?.forecast.forecastday.map((value,index)=>{
                
                return(
                  <View 
                key={index}
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Monday</Text>
                    <Text className='text-white font-semibold text-xl' >{value?.day?.maxtemp_c}&#176;</Text>
                </View>
                )

              })
            }

                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Monday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>

                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/moderaterain.png')}/>
                    <Text className='text-white' >Tuesday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/partlycloudy.png')}/>
                    <Text className='text-white' >Wednesday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Thursday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Friday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Saturday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
                <View 
                className='flex justify-center items-center w-28 py-5 rounded-3xl mr-4 mt-4'
                style={{backgroundColor:'rgba(5,0,2,0.15)'}}
                >
                    <Image 
                    className='h-20 w-20'
                    resizeMode='contain'
                    source={require('../assets/images/heavyrain.png')}/>
                    <Text className='text-white' >Sunday</Text>
                    <Text className='text-white font-semibold text-xl' >23&#176;</Text>
                </View>
            </ScrollView>

          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Home
