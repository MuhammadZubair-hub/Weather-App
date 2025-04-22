import { Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { MagnifyingGlassIcon,CalendarDaysIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import {debounce} from 'lodash'
import { fetchLocation, fetchWeatherForcast } from '../api/weatherapi'
import { weatherIcon, weatherImages } from '../constant'
import * as Progress from 'react-native-progress';
import Forecastcard from '../components/Forecastcard'
import SomeStats from '../components/SomeStats'
import { getLoaction, setLocationData } from '../utils/loactionasyncstorage'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Drawerheader/Header'
import { saveLocation } from '../utils/savedloactionstorage'
import  Ionicons from 'react-native-vector-icons/Ionicons'

const Home = () => {


  useEffect(()=>{

    fetchMyweatherdata();

  },[]);

  const fetchMyweatherdata = async () => {
    try {
      const savelocation = await getLoaction('location');
      let defaultloaction = 'Lahore';
      if (savelocation) defaultloaction = savelocation;
  
      const response = await fetchWeatherForcast({
        cityName: defaultloaction,
        days: '7'
      });
  
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false); 
    }
  };

  const [showsearchbar, Setshowsearchbar] = useState(false);
  const [loaction, setLoaction] = useState([]);
  const [weather,setWeather]= useState({});
  const [loading,setLoading]= useState(true);
  const navigation = useNavigation();

  const handlePress =value=>{
    // console.log(value);
    setLoaction([]);
    setLoading(true)
    
    fetchWeatherForcast({
      cityName:value.name,
      days:'7',
    }).then(response=>{
      console.log('forcast data',response)
      setWeather(response.data)
      
      //storing loaction in locelstorage
      setLocationData('location',value.name)

      setLoading(false)
      console.log('data in weather arry',weather.forecast)
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
  const {current, location ,forecast} = weather;
  console.log(forecast)


  return (
    <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              style={{flex:1}}>
    <ScrollView 
    contentContainerStyle={{flexGrow:1}}
    keyboardShouldPersistTaps="handled"
     >
      <View className='flex-1 relative'>
        
      <Image 
      blurRadius={40} 
      source={require('../assets/images/bg-2.jpg')}
      className='absolute h-full w-full' />

      {
        loading?(
          <View className='flex-1 flex-row justify-center items-center'>
            <Progress.CircleSnail size={200} thickness={10} color={'#007bff'} />
          </View>
        ):(
          
              <SafeAreaView className='flex-1'>
      
                  <View className='mx-10 flex-row justify-between mt-5'>
                      <Header/>

                      <TouchableOpacity onPress={() => saveLocation({name:location?.name})}>
                        <Ionicons name="bookmark-outline" size={24} color="white" />
                      </TouchableOpacity>
                  </View>
                
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
                <View className={`flex-1 ${showsearchbar && loaction.length > 0 ? 'pt-20' : ''}`}>      
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
</View>

                <SomeStats
                    wind={current?.windchill_c}
                    wind_image={weatherIcon['Wind']}
                    humidity={current?.humidity}
                    humidity_image={weatherIcon['Drop']}
                    time={forecast?.forecastday[0]?.astro.sunrise}
                    time_image={weatherIcon['Sun']}
                ></SomeStats>

                {/* forcast for next days */}
                <View className='mb-2 space-y-3 mx-6'>
                  <View className='flex-row items-center' >
                      <CalendarDaysIcon size={22} color={'white'} ></CalendarDaysIcon>
                      <Text className='text-white text-base ml-2'>Daily Forcast</Text>
                  </View>
                  
                  <ScrollView
                  horizontal
                  //contentContainerStyle={{paddingHorizontal:8}}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  >

                  {
                    forecast?.forecastday?.map((value,index)=>{
                      const date = new Date(value.date);
                      const options = {weekday:'long'};
                      const dayName = date.toLocaleDateString('en-US',options);
                  
                      return(
                        <Forecastcard 
                        key={index} 
                        day={dayName} 
                        date={value?.date}
                        image={weatherImages[value?.day?.condition.text]}
                        temp={value?.day?.maxtemp_c}
                        onPress={() => {
                          navigation.navigate('DayForcastScreen', {
                            dayData: forecast.forecastday[index]
                          });
                        }}
                        ></Forecastcard>
                      )

                    })
                  }

                      
                  </ScrollView>

                </View>
        </SafeAreaView>
      
        )
      }

      
    </View>
    </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default Home
