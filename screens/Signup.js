import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { sizes, fonts, colors } from '../constants/theme';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';

export default class Signup extends React.Component {

    navigateBack = () => {
        const { navigation } = this.props;        
        navigation.navigate('Login');
    }

    render() {
        
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableOpacity onPress={this.navigateBack} style={styles.iconContainer}>
                    <Ionicons name='ios-arrow-round-back' size={35} color={colors.black}/>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sign Up</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyItem}>
                        <Input placeholder='First Name' email/>
                    </View>
                    <View style={styles.bodyItem}>
                        <Input placeholder='Last Name' email/>
                    </View>
                    <View style={styles.bodyItem}>
                        <Input placeholder='Email' email/>
                    </View>
                    <View style={styles.bodyItem}>
                        <Input placeholder='Password' secure />
                    </View>
                    <View style={[styles.bodyItem, {paddingTop: 50}]}>
                        <Button rounded color={colors.secondary}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Button>
                    </View>            
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        justifyContent: 'center',
        marginTop: sizes.headerText - 10,
        marginBottom: 60,
        marginHorizontal: 20,
    },
    headerText: {
        fontSize: fonts.h1.fontSize,
        color: colors.black,
        // fontWeight: '500'
    },
    body: {
        paddingHorizontal: 20,
    },
    input: {
        fontSize: fonts.body.fontSize
    },
    inputContainer: {
        borderColor: colors.primary,
        borderWidth: StyleSheet.hairlineWidth
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    bodyItem: {
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 17,
        color: colors.white
    },
    linkText: {
        color: colors.secondary,
        fontSize: fonts.link.fontSize,
        fontStyle: 'italic'
    }, 
    iconContainer: {
        position: 'absolute',
        top: 50,
        bottom: 20,
        left: 20,
    }
});
