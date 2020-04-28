import { createStackNavigator, createAppContainer } from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import LocationSelect from '../screens/LocationSelect';
import DisplayRequest from '../screens/DisplayRequest';
import RequestDelivery from '../screens/RequestDelivery';
import SelectRider from '../screens/SelectRider';
import ConfirmDelivery from '../screens/ConfirmDelivery';
import SetLocationPin from '../screens/SetLocationPin';

export default DeliveryRequestStack =  createStackNavigator({
    Home: Dashboard,
    Destination: LocationSelect,
    DisplayRequest: DisplayRequest,
    RequestRider: RequestDelivery,
    SelectRider : SelectRider,
    ConfirmDelivery : ConfirmDelivery,
    SetDestinationPin : SetLocationPin
},{
    'initialRouteName': 'Home',
    headerMode: 'none'
});