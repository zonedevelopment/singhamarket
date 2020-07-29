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
import Homescreen from './tab/HomeScreen'
import Homedetailsscreen from './Home/HomeDetailsScreen'
import Homeboothreportscreen from './Home/HomeBoothReportScreen'
import Homeboothreportdetailsscreen from './Home/HomeBoothReportDetailsScreen'


import Reservscreen from './tab/ReservationScreen'
import Customerscreen from './tab/CustomerScreen'
import Customerdetailsscreen from './Customer/CustomerDetailsScreen'
import Customerhistorydetailsscreen from './Customer/CustomerHistoryDetailsScreen'

import Verifyscreen from './tab/VerifyScreen'
import Listverifyscreen from './Verify/ListVerifyScreen'
import Verifyboothscreen from './Verify/VerifyBoothScreen'
import Successscreen from './Verify/SuccessScreen'

import Notificationscreen from './tab/NotificationScreen'

import Calendarscreen from './reservation/CalendarScreen'
import Boothscreen from './reservation/BoothScreen'

/**
 * End
 */


import ic_home_active from '../assets/image/icon_home_gold.png'
import ic_store_active from '../assets/image/icon_market_gold.png'
import ic_cart_active from '../assets/image/icon_cart_gold.png'
import ic_bell_active from '../assets/image/icon_noti_gold.png'
import ic_profile_active from '../assets/image/icon_user_gold.png'

import ic_home_inactive from '../assets/image/icon_home.png'
import ic_store_inactive from '../assets/image/icon_market.png'
import ic_cart_inactive from '../assets/image/icon_cart.png'
import ic_bell_inactive from '../assets/image/icon_noti.png'
import ic_profile_inactive from '../assets/image/icon_user.png'

const Stack = createStackNavigator();


const Home = function AccStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Home'>
            <Stack.Screen name="Home" component={Homescreen} />
            <Stack.Screen name="HomeDetails" component={Homedetailsscreen} />
            <Stack.Screen name="HomeBoothReport" component={Homeboothreportscreen} />
            <Stack.Screen name="HomeBoothReportDetails" component={Homeboothreportdetailsscreen} />
        </Stack.Navigator>
    )
}

const Reserv = function MyStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='ReservHome'>
            <Stack.Screen name="ReservHome" component={Reservscreen} />
            <Stack.Screen name="ReservCalendarAudit" component={Calendarscreen} />
            <Stack.Screen name="ReservBoothAudit" component={Boothscreen} />
        </Stack.Navigator>
    );
}

const Verify = function MyStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Verify'>
            <Stack.Screen name="Verify" component={Verifyscreen} />
            <Stack.Screen name="ListVerify" component={Listverifyscreen} />
            <Stack.Screen name="VerifyBooth" component={Verifyboothscreen} />
            <Stack.Screen name="AuditSuccess" component={Successscreen} />
        </Stack.Navigator>
    );
}



const Customer = function MyStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Building'>
            <Stack.Screen name="MainAuditCustomer" component={Customerscreen} />
            <Stack.Screen name="AuditCustomerDetails" component={Customerdetailsscreen} />
            <Stack.Screen name="AuditHistoryDetails" component={Customerhistorydetailsscreen} />
        </Stack.Navigator>
    );
}

const Notification = function MyStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='AuditNotification'>
            <Stack.Screen name="AuditNotification" component={Notificationscreen} />
        </Stack.Navigator>
    );
}




function IconWithBadge({ badgeCount, focused }) {
    return (
        <View>
            {
                focused ?
                    <Image source={ic_cart_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                    :
                    <Image source={ic_cart_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
            }
            {
                badgeCount > 0 ?
                    <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                        <Text style={{ color: 'white', fontSize: 10 }}>{`${badgeCount}`}</Text>
                    </View>
                    :
                    null
            }
        </View>

    );
}

function CartIconWithBadge(props) {
    return <IconWithBadge {...props} badgeCount={item.length} />;
}

// const props = this.props
const Tab = createBottomTabNavigator()
const tabMain = (countItem) => {
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
                    borderTopRightRadius: 20
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'หน้าแรก',
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {
                                focused ?
                                    <Image source={ic_home_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_home_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
                        </View>
                    ),
                }} />

            <Tab.Screen
                name="Reserv"
                component={Reserv}
                options={{
                    tabBarLabel: 'จองพื้นที่',
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {
                                focused ?
                                    <Image source={ic_store_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_store_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Verify"
                component={Verify}
                options={{
                    tabBarLabel: 'ตรวจสอบล็อค',
                    tabBarIcon: ({ focused, color, screenProps }) => (
                        <View>
                            {/* <CartIconWithBadge focused={focused} /> */}
                            {
                                focused ?
                                    <Image source={ic_cart_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_cart_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
                            <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{`1`}</Text>
                            </View>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Noti"
                component={Notification}
                options={{
                    tabBarLabel: 'แจ้งเตือน',
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {
                                focused ?
                                    <Image source={ic_bell_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_bell_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
                            <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{`1`}</Text>
                            </View>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="AuditCustomer"
                component={Customer}
                options={{
                    tabBarLabel: 'รายชื่อลูกค้า',
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {
                                focused ?
                                    <Image source={ic_profile_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_profile_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
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