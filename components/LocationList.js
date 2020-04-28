import React, { Component } from 'react';
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colors } from '../constants/theme';

// const list = [

//   {
//     name : 'Saskatchewan',
//     country: 'Canada',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Accra',
//     country: 'Ghana',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star',
//     color: colors.secondary
//   },
//   {
//     name : 'Lagos',
//     country: 'Nigeria',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Malibu',
//     country: 'California',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Saskatchewan',
//     country: 'Canada',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Accra',
//     country: 'Ghana',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star',
//     color: colors.secondary
//   },
//   {
//     name : 'Lagos',
//     country: 'Nigeria',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Malibu',
//     country: 'California',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   },
//   {
//     name : 'Lagos',
//     country: 'Nigeria',
//     leftIcon: 'md-pin',
//     rightIcon: 'md-star-outline',
//     color: 'grey'
//   }
// ];



class LocationList extends Component {
  state = {  }
  render() { 
    const { list, pressFunction } = this.props;
    return ( 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftIcon={{ name: l.leftIcon, type: 'ionicon', size: 20, color: 'grey'}}
              title={l.name}
              bottomDivider
              rightIcon={{ name: l.rightIcon, type: 'ionicon', size: 20, color: l.color}}
              onPress = {() => pressFunction(l.location) }
            />
          ))
        }
      </ScrollView>
     );
  }
}
 
export default LocationList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // paddingBottom: 30
  }
});

LocationList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  pressFunction: PropTypes.func
}