import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';
import { Divider, ListItem } from 'react-native-elements';

class RecentPlaces extends Component {
  state = {  }
  render() { 
    return ( 
      <View style={styles.container}>
        <ListItem
        key={1}
        leftIcon={{ name: "md-time" , type: 'ionicon', size: 20, color: 'grey'}}
        title="Dansoman , Accra"
        bottomDivider
        />
        <ListItem
        key={2}
        leftIcon={{ name: "md-time", type: 'ionicon', size: 20, color: 'grey'}}
        title="London , UK"
        />
      </View>
     );
  }
}
 
export default RecentPlaces;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // paddingVertical: '5%',
    paddingHorizontal: '5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
});