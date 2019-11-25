import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Rating, AirbnbRating, Divider, Icon } from 'react-native-elements';
import { colors, elevationShadowStyle } from '../constants/theme';

const driverImg = require('../assets/avatar.jpg');

class DriverInfoCard extends Component {
  state = {  }
  render() { 
    const { driverImg, driverName, arrivalTime, rating} = this.props;
    return ( 
      <View style={styles.container}>
        <View style={styles.driverInfoHeader}>
        <Image source={driverImg} style={styles.driverImageStyle}/>
        <View style={styles.driverInfoContainer}>
          <Text>{driverName}</Text>
          <Rating
            imageSize={20}
            readonly
            startingValue={rating}
            />
          <Text>{arrivalTime} minutes away</Text>
        </View>
        </View>
        <Divider />
        <View style={styles.iconFooter}>
          <Icon 
            name="ios-chatbubbles"
            type="ionicon"
            color={colors.secondary}
            size={20}
          />
          <View style={styles.iconDividerView}/>
          <Icon
            name="ios-call"
            type="ionicon"
            color={colors.primary}
            size={20}
          />
        </View>
      </View>
     );
  }
}
 
export default DriverInfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...elevationShadowStyle(2),
    borderRadius: 20,
  },
  driverImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  driverInfoHeader: {
    flexDirection: 'row',
    padding: 10
  },
  driverInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: '5%'
  },
  iconFooter: {
    flexDirection: 'row',
    padding: '5%',
    justifyContent: 'space-evenly'
  },
  iconDividerView: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray2,
    height: '100%'
  }
});