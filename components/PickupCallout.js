import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../constants/theme';

class PickupCallout extends Component {
  state = {  }
  render() { 
    return ( 
      <View style={styles.container}>
        <Text style={styles.textStyle} ellipsizeMode="tail" numberOfLines={1}>Tema Station</Text>
        <Icon
          name="ios-arrow-forward"
          type="ionicon"
          color={colors.gray}
          size={15}
        />
      </View>
     );
  }
}
 
export default PickupCallout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 5,
    width: 200,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
  },
  textStyle: {
    fontSize: 15,
    letterSpacing: 1
  }
})