import AsyncStorage from '@react-native-async-storage/async-storage';

// export const saveLocation = async (location) => {

//   try {
//     const existing = await AsyncStorage.getItem('savedLocations');
//     const locations = existing ? JSON.parse(existing) : [];

//     // Check if location already exists
//     const alreadySaved = locations.some(loc => loc.name === location.name);
//     if (alreadySaved) return;

//     locations.push(location);
//     await AsyncStorage.setItem('savedLocations', JSON.stringify(locations));
//     console.log('Location Saved!');
//   } catch (error) {
//     console.log('Error saving location:', error);
//   }
// };

export const saveLocation = async (location) =>{
    try {
        const exiting =await  getSavedLocation('savelocations');
        const locations= exiting ?JSON.parse(exiting):[];

        locations.push(location);
        setSavedLocation(locations);
        console.log('Location Saved!');
        
    } catch (error) {
        console.log('Error saving location:', error);
    }
}


export const setSavedLocation = async (savelocation)=>{

    try {
        await AsyncStorage.setItem('savelocations',JSON.stringify(savelocation))
    } catch (e) {
        console.log('data not stored',e);
    }
};

export const getSavedLocation = async(key)=>{
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        
    }
}