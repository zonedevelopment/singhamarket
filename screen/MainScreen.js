import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabIcon from '../components/TabIcon'

import {
    darkColor,
    grayColor,
    redColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

/**
 * Main tab
 */
import Homescreen from './tabs/HomeScreen'
import Reservscreen from './tabs/ReservationScreen'
import Cartscreen from './tabs/CartScreen'
import Notiscreen from './tabs/NotificationScreen'
import Profilescreen from './tabs/ProfileScreen'
/**
 * End
 */

/**
 * Reservation stack
 */
import Condition from './reservation/BuildingConditionScreen'
import Floorzone from './reservation/FloorZoneScreen'
import Planscreen from './reservation/PlanScreen'
import Calendarscreen from './reservation/CalendarScreen'
import Boothscreen from './reservation/BoothScreen'
import Dayselectscreen from './reservation/DaySelectedScreen'
import Accessoriesscreen from './reservation/AccessoriesScreen'
import Summaryscreen from './reservation/SummaryScreen'
import ConfirmReservscreen from './reservation/ConfirmReservScreen'
import Editboothscreen from './reservation/EditBoothScreen'
/**
 * End
 */

/**
 * Account stack
 */
import Companyscreen from './account/ProfileCompanyScreen'
import Personalscreen from './account/ProfilePersonalScreen'
import Historyscreen from './account/HistoryScreen'
import Favoritescreen from './account/FavoriteScreen'
import Supportscreen from './account/SupportScreen'
import Changepasswordscreen from './account/ChangePasswordScreen'
/**
 * End
 */

import NewsDetailsScreen from './NewsDetailsScreen'

const Stack = createStackNavigator();
const Reserv = function MyStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Building'>
            <Stack.Screen name="Building" component={Reservscreen} />
            {/* <Stack.Screen name="Condition" component={Condition} /> */}
            <Stack.Screen name="Floorzone" component={Floorzone} />
            <Stack.Screen name="Plan" component={Planscreen} />
            <Stack.Screen name="Calendar" component={Calendarscreen} />
            <Stack.Screen name="Booth" component={Boothscreen} />
            <Stack.Screen name="Dayselect" component={Dayselectscreen} />
            <Stack.Screen name="Accessories" component={Accessoriesscreen} />
            <Stack.Screen name="Summary" component={Summaryscreen} />
            {/* <Stack.Screen name="ConfirmReserv" component={ConfirmReservscreen} /> */}
            <Stack.Screen name="EditBooth" component={Editboothscreen} />
        </Stack.Navigator>
    );
}

const Account = function AccStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profilescreen} />
            <Stack.Screen name="History" component={Historyscreen} />
            <Stack.Screen name="Favorite" component={Favoritescreen} />
            <Stack.Screen name="Support" component={Supportscreen} />
            <Stack.Screen name="Personal" component={Personalscreen} />
            <Stack.Screen name="Company" component={Companyscreen} />
            <Stack.Screen name="ChangePassword" component={Changepasswordscreen} />
        </Stack.Navigator>
    )
}


const Home = function AccStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Home'>
            <Stack.Screen name="Home" component={Homescreen} />
            <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()
const tabMain = () => {
    let Role = 'User'
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: secondaryColor,
                inactiveTintColor: 'white',
                labelStyle: {
                    fontSize: 12
                },
                style: {
                    justifyContent: 'center',
                    backgroundColor: primaryColor,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'หน้าแรก',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} Controller={'Home'} Role={Role} />
                    ),
                }} />
            <Tab.Screen
                name="Reserv"
                component={Reserv}
                options={{
                    tabBarLabel: 'จองพื้นที่',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} Controller={'Reserv'} Role={Role} />
                    ),  
                }} />
            <Tab.Screen
                name="Cart"
                component={Cartscreen}
                options={{
                    tabBarLabel: 'รถเข็น',
                    tabBarIcon: ({ focused, color, screenProps }) => (
                        <TabIcon focused={focused} Controller={'Cart'} Role={Role} />
                    ),
                }} />
            <Tab.Screen
                name="Noti"
                component={Notiscreen}
                options={{
                    tabBarLabel: 'แจ้งเตือน',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} Controller={'Noti'} Role={Role} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Account}
                options={{
                    tabBarLabel: 'บัญชีของฉัน',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused} Controller={'Profile'} Role={Role} />
                    ),
                }} />
        </Tab.Navigator>
    )
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(tabMain)