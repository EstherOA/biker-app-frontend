import ENV_VARS from "../Config";
const API_KEY = ENV_VARS.API_KEY;


export const getLocation = async (place,currentLong, currentLat) => {

  try{
    let response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`+
                              `input=`+place+`&inputtype=textquery&fields=geometry/location,name&`+
                              `locationbias=circle:10000@`+currentLat+`,`+currentLong+`&key=`+ `${API_KEY}`);
    let responseJson = await response.json();
    if(response.ok) {
      let searchResults = responseJson.candidates;
      if(searchResults.length > 10)
      searchResults.length = 10;
      // console.log(searchResults);
      return searchResults;
    }
    return null;
  }catch (error) {
    console.log(error);
    return null;
  }
}