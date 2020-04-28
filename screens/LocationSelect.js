import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Animated } from 'react-native';
import TripSearchHeader from '../components/TripSearchHeader';
import LocationList from '../components/LocationList';
import { Icon, Button } from 'react-native-elements';
import { colors, sizes } from '../constants/theme';
import { getLocation } from '../api/GooglePlaces';
import { getPlaceName } from '../utils/GetNameFromCoordinates';

class LocationSelect extends Component {

  constructor(props) {
    super(props)

    this.slideHeaderAnimation = new Animated.Value(0);
    this.slideListAnimation = new Animated.Value(0);
  }

  
  state = { 
    resultList: [],
    predefinedList: [
      {
        name : 'Saskatchewan, Canada',
        leftIcon: 'md-time',
        rightIcon: 'md-star',
        color: colors.secondary,
        location: {
          latitude : 47.70660900000001,
          longitude : -122.210091
       }
      },
      {
        name : 'Accra, Ghana',
        leftIcon: 'md-time',
        rightIcon: 'md-star',
        color: colors.secondary,
        location: {
          latitude : 47.70660900000001,
          longitude : -122.210091
       }
      },
    ],
    isLoading: false
  }
  
  componentDidMount() {

  Animated.parallel([
    Animated.timing(this.slideHeaderAnimation, {
      toValue: sizes.screenHeight * 0.3,
      duration: 2000,
    }),
    Animated.timing(this.slideListAnimation, {
      toValue: sizes.screenHeight * 0.62,
      duration: 2000,
    })
  ]).start(); 

  }

  navigateHome= () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  findLocation = async (destination) => {
    const {navigation} = this.props;
    
    const currentLong = navigation.getParam('currentLong');
    const currentLat = navigation.getParam('currentLat');


    let results = await getLocation(destination, currentLong, currentLat);
    this.toggleLoad();
    if(results) {
      // let { resultList } = this.state;
      // resultList = results;
      this.setState({
        resultList: results
      });
      console.log(this.state.resultList);
    }
  }

  getPickupName = () => {
    const {navigation} = this.props;
    
    const currentLong = navigation.getParam('currentLong');
    const currentLat = navigation.getParam('currentLat');

    console.log(getPlaceName(47.70660900000001, -122.210091));
    return getPlaceName(currentLat, currentLong);
  }

  toggleLoad = () => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: !isLoading
    })

  }

  formatResults = () => {
    const { predefinedList, resultList } = this.state;

    let list = [];
    if(resultList) {
    list = resultList.map((item, index) => {
        let listItem = {
          name : item.name,
          leftIcon: 'md-pin',
          rightIcon: 'md-star-outline',
          color: 'grey',
          location: {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng
          }
        }
        return listItem;
      });
    }
    console.log('List: ' + list);
    return predefinedList.concat(list);        
}

  getList = () => {
    const { predefinedList, resultList } = this.state;

    return (resultList.length) ? this.formatResults() : predefinedList;
  }

  setDestinationPin = () => {
    
    const { navigate } = this.props.navigation;
    navigate('SetLocationPin');
  }
  
  selectDestination = (item) => {
    
    const { navigation } = this.props;

    navigation.navigate('DisplayRequest', {
      destinationCoords: item.location,
      pickupCoords: {
        latitude: navigation.getParam('currentLat'),
        longitude: navigation.getParam('currentLong')
      }
    });
  }
  
  render() { 
    const {isLoading} = this.state;
    // const TripSearchHeader = Animated.createAnimatedComponent(TripSearchHeader);
    // const LocationList = Animated.createAnimatedComponent(LocationList);
    return ( 
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.View style={{ height: this.slideHeaderAnimation }}>
          <TripSearchHeader 
            backFunction={this.navigateHome} 
            searchFunction={this.findLocation} 
            loadFunction={this.toggleLoad} 
            isLoading={isLoading}
            getPickupName={this.getPickupName} 
            />
        </Animated.View>
         <Animated.View style={{ height: this.slideListAnimation }}>
          <LocationList list={this.getList()} pressFunction={this.selectDestination}/>
        </Animated.View>
        <Button 
          icon={
            <Icon
              name="md-pin"
              type='ionicon'
              size={20}
              color={colors.gray2}          
            />
          }
          raised
          type="solid"            
          title="Choose on map"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.textStyle}
          onPress={() => this.setDestinationPin()}
        />
      </KeyboardAvoidingView>
     );
  }
}
 
export default LocationSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  buttonStyle: {
    backgroundColor: 'white',
    justifyContent: "space-around",
    flexDirection: 'row',
    paddingHorizontal: '30%'
  },
  textStyle: {
    color: colors.gray2
  }
  
})