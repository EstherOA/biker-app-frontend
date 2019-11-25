import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, NativeModules, Platform, TouchableOpacity } from 'react-native';
import { Avatar, Header, Rating, Divider } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { colors, elevationShadowStyle, sizes } from '../constants/theme';
import Button from '../components/Button';

const screen = Dimensions.get('window');
const avatarImg = require('../assets/avatar.jpg');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;


export default class ConfirmDelivery extends React.Component {

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

    navigateRiderSelect = () => {
        const { navigate } = this.props.navigation;
        navigate('SelectRider');
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
                leftComponent={{ icon: 'md-arrow-back', size: 20, color : colors.black, onPress: this.navigateRiderSelect, type: 'ionicon' }} 
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
              <View style={styles.confirmInfoStyle}>
                <Text style={styles.infoHeaderTextStyle}>You will arrive at 11:05</Text>
                <Text style={styles.infoHeaderSubtextStyle}>12 min - 6 miles</Text>
                <Divider/>
                <View style={styles.infoContentViewStyle}>
                  <Image source={avatarImg} style={styles.driverImageStyle}/>
                  <Text style={styles.driverNameStyle}>Amos Marley</Text>
                  <Rating
                    imageSize={15}
                    readonly
                    />
                  <View style={styles.buttonContainerView}>
                  <Button rounded color={colors.secondary} customStyle={styles.callButton}>
                      <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
                  </Button>
                  <Button rounded color={colors.white} style={styles.callButtonContainer} customStyle={styles.callButton}>
                      <Text style={styles.callButtonText}>Call</Text>
                  </Button>
                  </View>
                </View>
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
  confirmInfoStyle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    height: '50%',
    flexDirection: 'column'
  },
  confirmButtonText: {
    fontSize: 17,
    color: colors.white
  },
  callButtonText: {
    fontSize: 17,
    color: colors.secondary
  },
  infoHeaderTextStyle: {
    letterSpacing: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  infoHeaderSubtextStyle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray
  },
  infoContentViewStyle: {
    flexDirection: 'column',
    paddingTop: 20,
  },
  driverImageStyle: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginHorizontal: (sizes.screenWidth - 60) / 2,
    marginBottom: 10
  },
  driverNameStyle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 10
  },
  buttonContainerView: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  callButtonContainer: {
    marginTop: 15
  },
  callButton: {
    ...elevationShadowStyle(3)
  }
});