import React from 'react';
import { View, StyleSheet, Text, Dimensions, NativeModules, Platform } from 'react-native';
import { Icon, Avatar, Header } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { colors, elevationShadowStyle } from '../constants/theme';
import HomeSearch from '../components/HomeSearch';
import RecentPlaces from '../components/RecentPlaces';

const screen = Dimensions.get('window');
const avatarImg = require('../assets/avatar.jpg');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;


export default class Dashboard extends React.Component {

    state = {
        mapRegion: null,
        userPermission: false,
        prevlong: null, 
        prevlat: null,
        showRecent: false,
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

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          prevlat: lastLat || this.state.prevlat,
          prevlong: lastLong || this.state.prevlong
        });
    }

    centerMap = ()=> {
        this.userLocation();
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.mapRegion;

        this.mapView.animateToRegion ({
            latitude, longitude, latitudeDelta, longitudeDelta
        })
    }

    navigateDrawer = () => {
        const { toggleDrawer } = this.props.navigation;
        toggleDrawer();
    }

    navigateDestinationSelect = () => {
        const { navigate } = this.props.navigation;
        const { mapRegion } = this.state;

        navigate('Destination', {
            currentLong: mapRegion.longitude,
            currentLat: mapRegion.latitude
        });
    }

    toggleRecent = () => {
        const { showRecent } = this.state;

        this.setState({
            showRecent: !showRecent
        })
    }

    render() {
        const { mapRegion, showRecent } = this.state;
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
                    // onPanDrag={this.onPanDrag}
                    >
                    <Marker coordinate={{ latitude: 37.4219995, longitude: -122.0840002}}>
                        <Icon 
                            name='md-pin' 
                            color={colors.secondary}
                            size={35}
                            type='ionicon'
                        />
                    </Marker>
                    </MapView>
                    <Header 
                        leftComponent={{ icon: 'menu', size: 20, color : colors.black, onPress: this.navigateDrawer }} 
                        centerComponent={{ text: 'Home', style: { color: colors.black, fontWeight: '400', fontSize: 13 } }}
                        rightComponent={<Avatar
                            rounded
                            source={avatarImg}
                            size={25}
                          />
                          } 
                          backgroundColor="white"
                          containerStyle={styles.headerStyle}
                    />
                    <View style={styles.searchView}>
                        <HomeSearch onFocus={this.navigateDestinationSelect} onRightIconPress={this.toggleRecent} /> 
                    </View>
                         {showRecent && 
                         (<View style={styles.recentView}>
                            <RecentPlaces/>
                         </View>)
                         }
                    {/* <View style={styles.locateViewStyle}> */}
                        <Icon 
                            name="md-locate"
                            type="ionicon"
                            size={24}
                            // raised
                            color={colors.black}
                            containerStyle={styles.locateViewStyle}
                            onPress={this.centerMap}
                        />
                    {/* </View> */}
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
        ...elevationShadowStyle(3),
        backgroundColor: colors.white        
    },
    searchView: {
        marginTop: 17,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    recentView: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    locateViewStyle: {
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.white,
        padding: 7,
        ...elevationShadowStyle(3),
        // height: 30,
        // width: 30
    }
});