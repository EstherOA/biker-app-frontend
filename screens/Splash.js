import React from 'react';
import { View, StyleSheet, ImageBackground, Text, AsyncStorage, Dimensions } from 'react-native';
import { sizes, fonts, colors } from '../constants/theme';

const splashImage = require('../assets/splash_img.png');

export default class Splash extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'Drawer' : 'Auth');
        }, 2000); 
    }

    render() {
        return (
            <ImageBackground source={splashImage} style={styles.imageBackground} imageStyle={{resizeMode: 'contain'}}> 
                <View style={styles.textView}>
                    <Text style={styles.text}>BikerApp</Text>
                </View>
            </ImageBackground>
        );
      }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: sizes.screenWidth,
        height: sizes.screenHeight,        
    },
    text: {
        fontSize: fonts.h1.fontSize,
        fontWeight: '500',
        color: colors.primary
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: sizes.splashText
    }
})