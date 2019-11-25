import React from 'react';
import { View, StyleSheet, Text, Dimensions, NativeModules, Platform, TouchableOpacity } from 'react-native';
import { Icon, Avatar, Header, Input, Divider } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { colors, elevationShadowStyle, sizes } from '../constants/theme';
import DriverInfoCard from '../components/DriverInfoCard';
import Carousel from 'react-native-snap-carousel';

const screen = Dimensions.get('window');
const avatarImg = require('../assets/avatar.jpg');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;

const driverList = [
  {
    driverName: 'Amos Marley',
    driverImg: avatarImg,
    rating: 4,
    arrivalTime: 6
  },
  {
    driverName: 'Amos Marley',
    driverImg: avatarImg,
    rating: 4,
    arrivalTime: 6
  },
  {
    driverName: 'Amos Marley',
    driverImg: avatarImg,
    rating: 4,
    arrivalTime: 6
  },
  {
    driverName: 'Amos Marley',
    driverImg: avatarImg,
    rating: 4,
    arrivalTime: 6
  },
  {
    driverName: 'Amos Marley',
    driverImg: avatarImg,
    rating: 4,
    arrivalTime: 6
  }
];

export default class SelectRider extends React.Component {

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

    navigateRequestDelivery = () => {
        const { navigate } = this.props.navigation;
        navigate('RequestRider');
    }

    _renderItem ({item, index}) {
      return (
        <DriverInfoCard 
          arrivalTime={item.arrivalTime} 
          driverImg={item.driverImg}
          driverName={item.driverName}
          rating={item.rating}
        />
      );
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
                    leftComponent={{ icon: 'md-arrow-back', size: 20, color : colors.black, onPress: this.navigateRequestDelivery, type: 'ionicon' }} 
                    centerComponent={{ text: 'Select a Rider', style: { color: colors.black, fontWeight: '400', fontSize: 13 } }}
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
              <View style={styles.carouselView}>
                <Carousel
              // ref={(c) => { this._carousel = c; }}
              layout="default"
              data={driverList}
              renderItem={this._renderItem}
              sliderWidth={sizes.screenWidth}
              itemWidth={sizes.screenWidth * 0.6}
            />                
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
    carouselView: {
      position: 'absolute',
      bottom: '10%'
    }   
});