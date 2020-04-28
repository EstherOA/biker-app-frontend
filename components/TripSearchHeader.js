import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, StyleSheet, NativeModules, Platform} from 'react-native';
import { Input, Header, Icon, Avatar, Divider } from 'react-native-elements';
import { colors, elevationShadowStyle } from '../constants/theme';
import { getLocation } from '../api/GooglePlaces';

const avatarImg = require('../assets/avatar.jpg');
const { StatusBarManager } = NativeModules;



class TripSearchHeader extends Component {

  constructor(props) {
    super(props);
    this.inputPickup = React.createRef();
    this.inputDest = React.createRef();  }

  state = { 
    destination: '',
    pickup: '',
   }

  setInputBackground = (ref) => {

    return ref.current.isFocused() ? colors.gray : colors.white;
  }

  setDestination = (destination) => {

    const { searchFunction, loadFunction } = this.props;
    // loadFunction();
    this.setState({
      destination
    });
    console.log("Destination: " + destination);
    searchFunction(destination);

  }

  render() { 
    const { backFunction, isLoading, getPickupName } = this.props;
    const { destination } = this.state;
    return (  
      <View style={styles.container}>
        <Header 
            leftComponent={{ icon: 'md-arrow-back', size: 20, color : colors.black, onPress: backFunction, type: 'ionicon' }} 
            centerComponent={{ text: 'Set Destination', style: { color: colors.black, fontWeight: '400', fontSize: 13 } }}
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
        <View style={styles.contentView}>
          <View style={styles.iconView}>
            <Icon 
              name='md-radio-button-on'
              type='ionicon'
              size={15}
              color={colors.secondary}
            />
            <View style={styles.iconBarView}/>
            <Icon 
            name='md-radio-button-off'
            type='ionicon'
            size={15}
            color={colors.secondary}
            />
          </View>
          <View style={styles.inputView}>
          <Input 
            ref={this.inputPickup}
            placeholder="Someplace pickup"
            inputContainerStyle={[styles.inputStyle ]}   
            value={getPickupName()}    
            />
          <Divider /> 
          <Input 
            ref={this.inputDest}
            inputContainerStyle={[styles.inputStyle ]}
            placeholder="Delivery to?"
            value={destination}
            onChangeText={(destination) => this.setDestination(destination)}
          //   { ...isLoading && (rightIcon={
          //     <Icon
          //     name='md-refresh'
          //     type='ionicon'
          //     size={15}
          //     color= {colors.gray}
          //     />
          // })}
          /> 
          </View>
        </View>
      </View>
     );
  }
}
 
export default TripSearchHeader;

const styles = StyleSheet.create({
  container: {
    marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    ...elevationShadowStyle(7),
    backgroundColor: colors.white,
    // flex: 1,
    flexDirection: 'column',
    paddingBottom: 15
    // paddingHorizontal: '5%'
  },
  headerStyle: {
    paddingTop: 0,
    margin: 0,
    height: 60,
    backgroundColor: colors.white,
    borderColor: 'transparent',
    shadowColor: 'white',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
    shadowRadius: 0        
  },
  contentView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconView: {
    flexDirection: 'column',
    width: '10%',
    height: 70,
    paddingVertical: 5,
    justifyContent: "space-between"
  },
  inputView: {
    flexDirection: 'column',
    width: '80%',
    height: 90,
    justifyContent: 'space-between'
    // paddingHorizontal: '5%'
  },
  iconBarView: {
    width: 1,
    backgroundColor: colors.secondary,
    height: 45,
    marginHorizontal: '49%'
  },
  dividerStyle: {
    backgroundColor: colors.gray,
    height: StyleSheet.hairlineWidth,
    width: '80%'
  },
  inputStyle: {
    borderBottomColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 10
  }

});

TripSearchHeader.propTypes = {
  searchFunction: PropTypes.func,
  loadFunction: PropTypes.func
}