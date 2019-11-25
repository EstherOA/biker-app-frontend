import { Dimensions, Platform, NativeModules } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const { StatusBarManager } = NativeModules;

const colors = {
    accent: "rgba(255, 0, 0, 0.8)",
    primary: "#1976d2",
    secondary: "#FBC02D",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    primary_rgba: 'rgba(0,91,234,0.3)',
    secondary_rgba: 'rgba(0,198,251, 0.3)'
};
  
const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 30,
    padding: 25,
    formHeight: 50,
    formWidth: WIDTH*0.94,
    screenWidth: WIDTH,
    screenHeight: HEIGHT,
    splashText: HEIGHT*1/3, 
    headerText: HEIGHT*1/6,
    statusHeight: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,


    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 17,
    formText: 16,
    body: 15,
    link: 13,
    caption: 12,

};
  
const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },
    link: {
        fontSize: sizes.link
    },
};
  
const elevationShadowStyle = (elevation) => {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.5,
      shadowRadius: 0.8 * elevation
    };
}

export { colors, sizes, fonts, elevationShadowStyle };