import React from 'react';
import { View, StyleSheet, Text, Dimensions, NativeModules, Platform, TouchableOpacity } from 'react-native';
import { Icon, Avatar, Header } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Button from '../components/Button';
import { colors, elevationShadowStyle } from '../constants/theme';
import PickupCallout from '../components/PickupCallout';
import MapViewDirections from 'react-native-maps-directions';
import ENV_VARS from "../Config";

const API_KEY = ENV_VARS.API_KEY;
const screen = Dimensions.get('window');
const avatarImg = require('../assets/avatar.jpg');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;

export default class DisplayRequest extends React.Component {

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

    getDestinationCoords = () => {
      const { navigation } = this.props;

      return navigation.getParam('pickupCoords');
    }

    getPickupCoords = () => {
      const { navigation } = this.props;

      return navigation.getParam('destinationCoords');
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
                  >
                    <MapView.Marker 
                      coordinate={this.getPickupCoords}>
                      <Icon 
                        name='md-pin' 
                        color={colors.primary}
                        size={35}
                        type='ionicon'
                      />
                    </MapView.Marker>  
                    <MapView.Marker 
                      coordinate={this.getDestinationCoords}>
                      <Icon 
                        name='md-pin' 
                        color={colors.secondary}
                        size={35}
                        type='ionicon'
                      />
                    </MapView.Marker>  
                    <MapViewDirections
                      origin={this.getPickupCoords}
                      destination={this.getDestinationCoords}
                      apikey={API_KEY}
                      strokeWidth={3}
                      strokeColor={colors.secondary}
                    />                  
                    </MapView>
                    <Header 
                        leftComponent={{ icon: 'md-arrow-back', size: 20, color : colors.black, onPress: this.navigateDestinationSelect, type: 'ionicon' }} 
                        centerComponent={{ text: 'Request Trip', style: { color: colors.black, fontWeight: '400', fontSize: 13 } }}
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
                    <Icon 
                        name="md-locate"
                        type="ionicon"
                        size={24}
                        // raised
                        color={colors.black}
                        containerStyle={styles.locateViewStyle}
                        onPress={this.centerMap}
                    />
                    <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.paymentCardStyle}>
                      <Text style={styles.paymentCardHeader}>
                          Payment Method
                      </Text>
                      <View style={styles.paymentCardContent}>
                        <Text style={styles.paymentTypeText}>
                          Cash
                        </Text>
                        <Text style={styles.paymentAmountText}>
                          Ghc 12
                        </Text>
                      </View>
                    </TouchableOpacity>
                      <Button rounded color={colors.secondary}>
                              <Text style={styles.buttonText}>Request Delivery</Text>
                      </Button>
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
    locateViewStyle: {
        borderRadius: 5,
        position: 'absolute',
        bottom: '30%',
        right: 10,
        backgroundColor: colors.white,
        padding: 7,
        ...elevationShadowStyle(3),
    },
    buttonText: {
      fontSize: 17,
      color: colors.white
  },
  paymentCardStyle: {
    backgroundColor: colors.white,
    ...elevationShadowStyle(2),
    flexDirection: 'column',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  optionContainer: {
    bottom: '8%',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '3%' 
  },
  paymentCardHeader: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 1,
  },
  paymentCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  paymentTypeText: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1
  },
  paymentAmountText: {
    fontSize: 15,
  } 
});