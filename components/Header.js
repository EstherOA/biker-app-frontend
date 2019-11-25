import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';
import { sizes, colors } from '../constants/theme';

export default class Header extends React.Component {

    renderLeft = () => {
        const { leftElement, onLeftPress } = this.props;

        if (!leftElement) return null;

        return (
            <TouchableOpacity
                style={styles.left}
                onPress={ () => onLeftPress && onLeftPress()}
            >
                {leftElement}
            </TouchableOpacity>
        )
    }

    renderRight = () => {
        const { rightElement, onRightPress } = this.props;

        if (!rightElement) return null;

        return (
            <TouchableOpacity
                style={styles.right}
                onPress={ () => onRightPress && onRightPress()}
            >
                {rightElement}
            </TouchableOpacity>
        )
    }

    render() {
        const { title, shadow } = this.props;

        const headerStyle = [
            styles.container,
            shadow && styles.shadow,
        ];

        return (
            <View style={headerStyle}>
                {this.renderLeft}
                <Text style={styles.title}>{title}</Text>
                {this.renderRight}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: sizes.statusHeight,  
        paddingBottom: 20,
        backgroundColor: colors.white,
    },
    left: {
        alignSelf: 'flex-start'
    },
    title: {
        alignSelf: 'center',
        color: colors.black,
        fontSize: 16
    },
    right: {
        alignSelf: 'flex-end'
    },
    shadow: {
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        borderColor: 'black',
        elevation: 2 ,
    }
})