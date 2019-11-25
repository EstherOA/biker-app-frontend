import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import Button from '../components/Button';
import { sizes, fonts, colors } from '../constants/theme';
import Input from '../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends React.Component {

    navigateSignup = () => {
        const { navigation } = this.props;        
        navigation.navigate('Signup');
    }

    navigateDashboard = () => {
        const { navigation } = this.props;        
        navigation.navigate('Drawer');
    } 

    render() {
        
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Login</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyItem}>
                        <Input placeholder='Email' email/>
                    </View>
                    <View style={styles.bodyItem}>
                        <Input placeholder='Password' secure />
                    </View>
                    <View style= {[styles.bodyItem, {paddingTop: 50}]}>
                        <Button rounded color={colors.primary} onPress={this.navigateDashboard}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>
                    </View>
                    <View style={styles.bodyItem}>
                        <Button rounded color={colors.secondary} onPress={this.navigateSignup}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Button>
                    </View>
                    <View style={styles.linkContainer}>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Forgot password?</Text>
                        </TouchableOpacity> 
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
        marginVertical: sizes.headerText - 10,
        marginHorizontal: 40,
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
        alignSelf: 'center'
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
        fontStyle: 'italic',
    }
});
