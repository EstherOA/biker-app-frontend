import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import TripSearchHeader from '../components/TripSearchHeader';
import LocationList from '../components/LocationList';
import { Icon, Button } from 'react-native-elements';
import { colors } from '../constants/theme';
import { getLocation } from '../api/GooglePlaces';

class LocationSelect extends Component {
  state = { 
    resultList: [],
    predefinedList: [
      {
        name : 'Saskatchewan, Canada',
        leftIcon: 'md-time',
        rightIcon: 'md-star',
        color: colors.secondary
      },
      {
        name : 'Accra, Ghana',
        leftIcon: 'md-time',
        rightIcon: 'md-star',
        color: colors.secondary
      },
    ]
   }

  navigateHome= () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  findLocation = async (destination) => {

    const currentLong = navigation.getParam('currentLong');
    const currentLat = navigation.getParam('currentLat');

    let results = await getLocation(destination, currentLong, currentLat);
    if(results) {
      // let { resultList } = this.state;
      // resultList = results;
      this.setState({
        resultList: results
      });
    }
  }

  formatResults = () => {
    const { predefinedList, resultList } = this.state;

    if(resultList) {
      let list = [];
      list = resultList.map((item, index) => (
          return ({
            name : item.name,
            leftIcon: 'md-pin',
            rightIcon: 'md-star-outline',
            color: 'grey'
          });
      ));
    } else list = predefinedList;
    return list;        
  }

  getList = () => {
    const { predefinedList, resultList } = this.state;

    return resultList ? this.formatResults : predefinedList;
  }

  render() { 
    return ( 
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TripSearchHeader backFunction={this.navigateHome} searchFunction={this.findLocation} />
          <LocationList list={this.getList}/>
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