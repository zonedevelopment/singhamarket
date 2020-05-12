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
 /**
  * End
  */

const Stack = createStackNavigator();
const Reserv = function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='Splash'>
      <Stack.Screen name="Building" component={Reservscreen} />
      <Stack.Screen name="Condition" component={Condition} />
      <Stack.Screen name="Floorzone" component={Floorzone} />
      <Stack.Screen name="Plan" component={Planscreen} />
      <Stack.Screen name="Calendar" component={Calendarscreen} />
      <Stack.Screen name="Booth" component={Boothscreen} />
      <Stack.Screen name="Dayselect" component={Dayselectscreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator()
const tabMain = function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: secondaryColor,
                inactiveTintColor: 'white',
                labelStyle: {
                    fontSize: 16
                },
                style: {
                    justifyContent: 'center',
                    backgroundColor: primaryColor,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Homescreen}
                options={{
                    tabBarLabel: 'หน้าแรก',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="home" color={color} size={18} />
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Reserv"
                component={Reserv}
                options={{
                    tabBarLabel: 'จองพื้นที่',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="store-alt" color={color} size={18} />
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Cart"
                component={Cartscreen}
                options={{
                    tabBarLabel: 'รถเข็น',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="shopping-cart" color={color} size={18} />
                            <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                                <Text style={{ color: 'white', fontSize: 14 }}>{`1`}</Text>
                            </View>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Noti"
                component={Notiscreen}
                options={{
                    tabBarLabel: 'แจ้งเตือน',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="bell" color={color} size={18} />
                            <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                                <Text style={{ color: 'white', fontSize: 14 }}>{`1`}</Text>
                            </View>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profilescreen}
                options={{
                    tabBarLabel: 'บัญชีของฉัน',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="user" color={color} size={18} />
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(tabMain)