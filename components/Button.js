import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { sizes, colors } from '../constants/theme';

const Button = ({
    children,
    rounded,
    outlined, 
    customStyle,
    color,
    ...restProps
  }) => {
  
    let inlineStyle = [{ backgroundColor: color},]
  
    inlineStyle = inlineStyle.concat(style.defaultStyle)
  
    if (rounded) {
      inlineStyle = inlineStyle.concat(style.roundBorder)
    }
  
    if (outlined) {
      inlineStyle = inlineStyle.concat(style.outlined)
    }
  
    if (customStyle) {
        inlineStyle = inlineStyle.concat(customStyle)
    }

    return (
      <TouchableOpacity {...restProps}>
          <View style={inlineStyle}>
           {children}
          </View>
      </TouchableOpacity>
    )
  }
  
const style = StyleSheet.create({
    defaultStyle: {
        height: sizes.formHeight,
        width: sizes.formWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,  
    },
    roundBorder: {
        borderRadius: 30
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1
    },
    
})
  
  export default Button
