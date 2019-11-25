import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import { colors, elevationShadowStyle } from '../constants/theme';
import DeliveryRequestStack from './DeliveryRequestStack';
import MenuProfileComponent from '../components/MenuProfileComponent';
 
const CustomDrawerComponent = (props) => {

    closeDrawer = () => {

    }

    return (
        <ScrollView>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never'}}>
                <View>
                <Text>Menu</Text>
                <Icon 
                        name="md-close"
                        type="ionicon"
                        size={24}
                        color={colors.black}
                        containerStyle={styles.locateViewStyle}
                        onPress={this.closeDrawer}
                    />
                </View>
                <MenuProfileComponent />
            </SafeAreaView>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    locateViewStyle: {
        borderRadius: 5,
        position: 'absolute',
        top: '10%',
        right: 10,
        backgroundColor: colors.white,
        padding: 7,
        ...elevationShadowStyle(2),
    }
})

export default DrawerNavigator = createDrawerNavigator({
    Home: DeliveryRequestStack,
    },{
        initialRouteName : 'Home', 
        contentOptions : {
                              activeTintColor : colors.primary,
                              inactiveTintColor : colors.black,
                              activeBackgroundColor: 'white'
                           },
    }
); 