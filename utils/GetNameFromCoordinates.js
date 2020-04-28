import Geocoder from 'react-native-geocoding';
import ENV_VARS from "../Config";
const API_KEY = ENV_VARS.API_KEY;

Geocoder.init(API_KEY);


export const getPlaceName = (latitude, longitude) => {
  Geocoder.from(latitude, longitude)
		.then(json => {
      var addressComponent = json.results[0].address_components[0].short_name;
      console.log(addressComponent);
      return addressComponent;
		})
    .catch(
      error => { 
        console.warn(error);
        return null;
      });
  }