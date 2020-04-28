import React from 'react';
import PropTypes from "prop-types";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { sizes, colors } from '../constants/theme';
import  { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';


export default class Input extends React.Component {

    state = {
        toggleSecure: false,
    }

    renderLabel() {
        const { label, error } = this.props;
    
        return (
          <View>
            {label ? <Text style={{color: error ? accent: colors.gray }}>{label}</Text> : null}
          </View>
        )
    }

    renderToggle() {
        const { secure } = this.props;
        const { toggleSecure } = this.state;
    
        if (!secure) return null;
    
        return (
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => this.setState({ toggleSecure: !toggleSecure })}
          >
            <Ionicons
                color={colors.gray}
                size={22}
                name={!toggleSecure ? "md-eye" : "md-eye-off"}
            />            
          </TouchableOpacity>
        );
    }

    renderRight() {
        const { rightIcon, onRightPress } = this.props;
    
        if (!rightIcon) return null;
    
        return (
            <TouchableOpacity
            style={styles.toggle}
            onPress={() => onRightPress && onRightPress()}
          >
            {rightIcon}
          </TouchableOpacity>
        );
    }

    renderError = () => {

        const { error} = this.props;
    }

    render() {
        const { placeholder, secure, email, phone, error, ...restProps} = this.props;
        const { toggleSecure } = this.state;
        const isSecure = toggleSecure ? false : secure;

        const inputStyles = [
            styles.textInput,
            error && { borderColor: colors.accent },
        ];
      
        const inputType = email ? 'email-address' : phone ? 'phone-pad' : 'default';
      
        return (
            <View style={styles.container}>
                {/* {this.renderLabel()} */}
                <TextInput placeholder={placeholder} placeholderTextColor={colors.gray} secureTextEntry={isSecure} 
                    underlineColorAndroid='transparent' style={inputStyles}
                    secureTextEntry={isSecure} autoComplete="off"
                    autoCapitalize="none" autoCorrect={false}
                    keyboardType={inputType} {...restProps}
                 />
                {this.renderToggle()}
                {/* {this.renderRight()} */}
                {/* {this.renderError()} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: sizes.formHeight,
        width: sizes.formWidth,
        borderColor: colors.black,
        borderWidth: StyleSheet.hairlineWidth,
        paddingLeft: 20,
        borderRadius: sizes.radius,
    },
    textInput: {
        fontSize: sizes.formText,
        color: colors.black,
        flex: 1,
        width: sizes.formWidth - 45,
    },
    toggle: {
        width: 45,
        paddingRight: 15,
        paddingLeft: 10,
        paddingVertical: 12
    }
});

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.bool,
    secure: PropTypes.bool,
    rating: PropTypes.number,
    rightIcon: PropTypes.node,
    onRightPress: PropTypes.func,
    leftIcon: PropTypes.node,
    onLeftPress: PropTypes.func,
    placeholder: PropTypes.string,
    email: PropTypes.bool,
    phone: PropTypes.bool
  };