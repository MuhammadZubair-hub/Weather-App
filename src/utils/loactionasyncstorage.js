import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocationData =async (key,value)=>{

    try {
        await AsyncStorage.setItem(key,value)
    } catch (error) {
        console.log('data not stored')
    }

}

export const getLoaction = async(key)=>{
    try {
        const data = await  AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        console.log('data not avialble')
    }
}