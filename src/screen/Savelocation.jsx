import { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { fetchWeatherForcast } from '../api/weatherapi';
import { getSavedLocation, setSavedLocation } from '../utils/savedloactionstorage';
import Saveloacationcard from '../components/Saveloactioncard/Saveloacationcard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackButton from '../components/Button/BackButton';

const Savelocation = () => {
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Use useFocusEffect to refresh data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      syncSavedLocationsToState();
    }, [])
  );

  
  const syncSavedLocationsToState = async () => {
    try {
      setLoading(true);
    
      const saved = await getSavedLocation('savelocations');
      let parsed = [];
      
      try {
        parsed = saved ? JSON.parse(saved) : [];
        console.log('Saved locations loaded:', parsed);
      } catch (parseError) {
        console.error('Error parsing saved locations:', parseError);
        parsed = [];
      }
      
      setLocations(parsed);
      
      if (parsed.length === 0) {
        setWeatherData([]);
        setLoading(false);
        return;
      }
      
      
      const weatherPromises = parsed.map(loc =>
        fetchWeatherForcast({ cityName: loc.name, days: 1 })
          .catch(err => {
            console.error(`Error fetching weather for ${loc.name}:`, err);
            return { data: null };
          })
      );
      
      const weatherResponses = await Promise.all(weatherPromises);
      const weatherResults = weatherResponses
        .map(res => res?.data)
        .filter(Boolean);
      
      console.log(`Fetched weather data for ${weatherResults.length} locations`);
      setWeatherData(weatherResults);
    } catch (error) {
      console.error('Error syncing saved locations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove location with proper state updates
  const removelocation = async (indexToRemove) => {
    try {
      setLoading(true);
      
      
      const saved = await getSavedLocation('savelocations');
      const currentLocations = saved ? JSON.parse(saved) : [];
      
      const updatedLocations = currentLocations.filter((_, index) => index !== indexToRemove);
      
      
      await setSavedLocation(updatedLocations);
      console.log('Location removed, remaining:', updatedLocations.length);
      
      
      setLocations(updatedLocations);
      
      if (updatedLocations.length === 0) {
        setWeatherData([]);
        setLoading(false);
        return;
      }
      
      // Update weather data to match the new locations list
      const updatedWeatherData = weatherData.filter((_, index) => index !== indexToRemove);
      setWeatherData(updatedWeatherData);
    } catch (error) {
      console.error('Error removing location:', error);
      await syncSavedLocationsToState();
    } finally {
      setLoading(false);
    }
  };

  // Weather cards memoized for better performance
  const weatherCards = useMemo(() => {
    return weatherData.map((item, index) => (
      <Saveloacationcard
        key={`${item?.location?.name}-${index}`}
        cityname={item?.location?.name}
        countryname={item?.location?.country}
        temp={item?.current?.temp_c}
        weathercondition={item?.current?.condition?.text}
        deleteonpress={() => removelocation(index)}
      />
    ));
  }, [weatherData]);

  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Image
          blurRadius={40}
          source={require('../assets/images/bg-2.jpg')}
          className="absolute h-full w-full"
        />
        <ActivityIndicator size="large" color="#0077B6" />
      </View>
    );
  }

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={40}
        source={require('../assets/images/bg-2.jpg')}
        className="absolute h-full w-full"
      />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="flex-1 mt-5"
        contentContainerStyle={{ padding: 16 }}
      >
        <View className='justify-center mb-11'>
          <BackButton onpress={()=>{navigation.goBack()}} />
        </View>
        {weatherData.length === 0 ? (
          <View className="items-center mt-12">
            <Text className="text-white text-lg font-medium">
              No saved locations found
            </Text>
          </View>
        ) : (
          weatherCards
        )}
      </ScrollView>
    </View>
  );
};

export default Savelocation;