import React from 'react';
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TextInput, TouchableOpacity }  from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { colors, sizes, elevationShadowStyle } from '../constants/theme';


export default class HomeSearch extends React.Component {

    render() {
        const { onFocus, onRightIconPress } = this.props;
        return (
            <Input
                placeholder='Delivery to?'
                leftIcon={
                    <Icon
                    name='ios-bicycle'
                    type='ionicon'
                    size={17}
                    color= {colors.secondary}
                    />
                }
                rightIcon={
                    <Icon
                    name='md-time'
                    type='ionicon'
                    size={20}
                    color= {colors.gray}
                    onPress={onRightIconPress}
                    />
                }
                rightIconContainerStyle={styles.rightIconContainerStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onFocus={onFocus}
            />
        )
    }
}

const styles = StyleSheet.create({
    
    rightIconContainerStyle: {
        borderColor: colors.gray,
        borderLeftWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
       flexDirection: 'row',
       paddingHorizontal: 7,
    },
    leftIconContainerStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 7,
        marginLeft: 0
    },
    containerStyle: {
        ...elevationShadowStyle(2),
        height: 45,
        backgroundColor: colors.white,
        borderColor: 'transparent',
        width: '90%',
        paddingVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 7
    },
    inputContainerStyle: {
        borderBottomColor: 'transparent',
        paddingLeft: 0, 
        marginLeft: 0,
        height: 35
    }
    
});

HomeSearch.propTypes = {
    onFocus: PropTypes.func,
    onRightIconPress: PropTypes.func,
  };