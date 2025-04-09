
import axios from 'axios';
import { apiKey } from '../constant'

// endpoints 
const forcastEndpoint = parmas=>`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${parmas.cityName}&days=${parmas.days}&aqi=no&alerts=no`;
const locationEndpoint = parmas=>`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${parmas.cityName}`;

const apiCall = async(endpoint)=>{
    const options ={
        methood:'Get',
        url:endpoint
    }

    try {
        const response = await axios.request(options)
        return response
        
    } catch (error) {
        console.log('error',error)
        return null
    }

}

// dynamic methood for caaling api dynmaiclley

export const fetchWeatherForcast = parmas=>{
    const forcastUrl = forcastEndpoint(parmas);
    return apiCall(forcastUrl);
}

export const fetchLocation = parmas=>{
    const locationUrl = locationEndpoint(parmas);
    return apiCall(locationUrl);
}