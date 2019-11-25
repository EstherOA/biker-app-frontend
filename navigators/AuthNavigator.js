import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

export default AuthStack =  createStackNavigator({
    Login: Login,
    Signup: Signup
},{
    'initialRouteName': 'Login',
    headerMode: 'none'
});