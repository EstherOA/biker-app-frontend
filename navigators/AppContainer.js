import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStack from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import Splash from '../screens/Splash';

export const AppContainer = createAppContainer( createSwitchNavigator({
    Splash: Splash,
    Auth: AuthStack,
    Drawer: DrawerNavigator
},{
    'initialRouteName': 'Drawer'
} ));