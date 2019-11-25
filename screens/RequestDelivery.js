import React from 'react';
import { View, StyleSheet, Text, Dimensions, NativeModules, Platform, TouchableOpacity } from 'react-native';
import { Icon, Avatar, Header, Input, Divider } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { colors, elevationShadowStyle, sizes } from '../constants/theme';

const screen = Dimensions.get('window');
const avatarImg = require('../assets/avatar.jpg');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;


export default class RequestDelivery extends React.Component {

    state = {
        mapRegion: null,
        userPermission: false,
        prevlong: null, 
        prevlat: null
    }

    setMapViewRef = (mapView)=>{
        this.mapView  = mapView;
    }

    userLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if ( status !== 'granted' ) {
            Alert.alert('Please enable app permission');
        }

        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true});

        console.log("Location latitude: "+ location.coords.latitude);
        console.log("Location longitude: "+ location.coords.longitude);

        this.setState({
            userPermission : true,
            prevlat : location.coords.latitude,
            prevlong : location.coords.longitude,
            mapRegion:  {
                latitude:       location.coords.latitude,
                longitude:      location.coords.longitude,
                latitudeDelta:  LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        })
    }

    async componentDidMount() {

        await this.userLocation();
    }

    // onRegionChange(region, lastLat, lastLong) {
    //     this.setState({
    //       mapRegion: region,
    //       // If there are no new values set the current ones
    //       prevlat: lastLat || this.state.prevlat,
    //       prevlong: lastLong || this.state.prevlong
    //     });
    // }

    centerMap = ()=> {
        this.userLocation();
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.mapRegion;

        this.mapView.animateToRegion ({
            latitude, longitude, latitudeDelta, longitudeDelta
        })
    }

    addDestinationMarker = () => {

    }

    // navigateDrawer = () => {
    //     const { toggleDrawer } = this.props.navigation;
    //     toggleDrawer();
    // }

    navigateDestinationSelect = () => {
        const { navigate } = this.props.navigation;
        navigate('Destination');
    }

    render() {
        const { mapRegion } = this.state;
        return (
          <View style={styles.container}>
            <MapView
                ref={this.setMapViewRef}
                style={styles.map}
                region={mapRegion}
                showsUserLocation={false}
                showsCompass={false}
                showsBuildings={true}
                showsMyLocationButton={false}
              />
              <Header 
                  leftComponent={{ icon: 'md-arrow-back', size: 20, color : colors.black, onPress: this.navigateDestinationSelect, type: 'ionicon' }} 
                  centerComponent={{ text: 'Find a Driver', style: { color: colors.black, fontWeight: '400', fontSize: 13 } }}
                  rightComponent={
                  <Avatar
                      rounded
                      source={avatarImg}
                      size={25}
                    />
                    } 
                    backgroundColor="white"
                    containerStyle={styles.headerStyle}
                />
            <View style={styles.contentView}>
          <View style={styles.iconView}>
            <Icon 
              name='md-radio-button-on'
              type='ionicon'
              size={15}
              color={colors.secondary}
            />
            <View style={styles.iconBarView}/>
            <Icon 
            name='md-radio-button-off'
            type='ionicon'
            size={15}
            color={colors.secondary}
            />
          </View>
          <View style={styles.inputView}>
          <Input 
            ref={this.inputPickup}
            placeholder="Someplace pickup"
            inputContainerStyle={[styles.inputStyle, { backgroundColor: colors.white } ]}
            />
          <Divider /> 
          <Input 
            ref={this.inputDest}
            inputContainerStyle={[styles.inputStyle, { backgroundColor: colors.white }]}
            placeholder="Someplace destination"
          /> 
          </View>
        </View>
              <View style={styles.requestContainer}>
            <Icon 
                name="ios-information-circle-outline"
                type="ionicon"
                size={24}
                // raised
                color={colors.white}
                // containerStyle={styles.iconContainerStyle}
            />
            <Text style={styles.textStyle}>Requesting Delivery</Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    },
    map : {
        ...StyleSheet.absoluteFillObject,
    },
    headerStyle: {
        paddingTop: 0,
        margin: 0,
        height: 60,
        ...elevationShadowStyle(5),
        backgroundColor: colors.white        
    },
    requestContainer: {
        backgroundColor: colors.secondary,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '20%',
        width: sizes.screenWidth
      },
    textStyle: {
        color: colors.white,
        fontSize: 15,
        letterSpacing: 1,
        textAlign: 'center'
      },
    contentView: {
      marginHorizontal: '5%',
      flexDirection: 'row',
      marginTop: 20,
      backgroundColor: colors.white,
      paddingVertical: 10,
      borderRadius: 10
    },
    iconView: {
      flexDirection: 'column',
      width: '10%',
      height: 70,
      paddingVertical: 5,
      justifyContent: "space-between"
    },
    inputView: {
      flexDirection: 'column',
      width: '80%',
      height: 90,
      justifyContent: 'space-between'
      // paddingHorizontal: '5%'
    },
    iconBarView: {
      width: 1,
      backgroundColor: colors.secondary,
      height: 45,
      marginHorizontal: '49%'
    },
    dividerStyle: {
      backgroundColor: colors.gray,
      height: StyleSheet.hairlineWidth,
      width: '80%'
    },
    inputStyle: {
      borderBottomColor: 'transparent',
      borderRadius: 10,
      paddingHorizontal: 10
    }   
});