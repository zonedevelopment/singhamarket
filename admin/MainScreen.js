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
import StorageServies from '../utils/StorageServies'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
    darkColor,
    grayColor,
    redColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    saveUserInfo
} from '../actions'

import styles from '../style/style'
import TabIcon from '../components/TabIcon'

/**
 * Main tab
 */
import Homescreen from './tab/HomeScreen'
import Homedetailsscreen from './Home/HomeDetailsScreen'
import Homeboothreportscreen from './Home/HomeBoothReportScreen'
import Homeboothreportdetailsscreen from './Home/HomeBoothReportDetailsScreen'
import Listhomebuilding from './Home/ListBuildingScreen';


import Reservscreen from './tab/ReservationScreen'
import Listcustometscreen from './reservation/ListCustomerScreen'
import Listbuildingscreen from './reservation/ListBuildingScreen';

import Customerscreen from './tab/CustomerScreen'
import Customerdetailsscreen from './Customer/CustomerDetailsScreen'
import Customerhistorydetailsscreen from './Customer/CustomerHistoryDetailsScreen'


import Notificationscreen from './tab/NotificationScreen'

import Calendarscreen from './reservation/CalendarScreen'
import Boothscreen from './reservation/BoothScreen'
import Dayselectedscreen from './reservation/DaySelectedScreen'
import Accessoriesscreen from './reservation/AccessoriesScreen'
import Summaryscreen from './reservation/SummaryScreen'
import Editboothscreen from './reservation/EditBoothScreen'
import Bookingsuccessscreen from './reservation/BookingSuccessScreen'
import Planscreen from '../screen/reservation/PlanScreen'
/**
 * End
 */

import ic_home_active from '../assets/image/icon_home_gold.png'
import ic_store_active from '../assets/image/icon_market_gold.png'
import ic_cart_active from '../assets/image/icon_cart_gold.png'
import ic_plan_active from '../assets/image/icon_plan_gold.png'
import ic_bell_active from '../assets/image/icon_noti_gold.png'
import ic_profile_active from '../assets/image/icon_user_gold.png'

import ic_home_inactive from '../assets/image/icon_home.png'
import ic_store_inactive from '../assets/image/icon_market.png'
import ic_cart_inactive from '../assets/image/icon_cart.png'
import ic_plan_inactive from '../assets/image/icon_plan.png'
import ic_bell_inactive from '../assets/image/icon_noti.png'
import ic_profile_inactive from '../assets/image/icon_user.png'

const Stack = createStackNavigator();


const Home = function AccStack() {
    return (
        <Stack.Navigator
            //headerMode='none'
            initialRouteName='HomeDetails'
            screenOptions={({route, navigation}) => ({
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 10,alignItems:'center'}}
                        onPress={() => {
                            StorageServies.clear()
                         ///   this.props.saveUserInfo([])
                            navigation.navigate('Choice')
                        }}
                    >
                        <Icon name='sign-out' size={20} color='white' />
                        <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="Home" component={Homescreen} 
                options={{
                    cardStyle: { backgroundColor: primaryColor },
                    headerTitle: 'เลือกตลาดที่ต้องการ',
                    headerBackTitle: '',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        },
                    }
                }}
            />
            <Stack.Screen name="HomeDetails" component={Homedetailsscreen} 
                options={{
                    cardStyle: { backgroundColor: primaryColor },
                    headerTitle: 'ข้อมูลการจองตลาด',
                    headerBackTitle: '',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        },
                    }
                }}
            />
            <Stack.Screen name="HomeBoothReport" component={Homeboothreportscreen} 
                options={{
                    headerTitle: 'รายงานการจองตลาด', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen name="HomeBoothReportDetails" component={Homeboothreportdetailsscreen} 
                options={{
                    headerTitle: 'ข้อมูลการจองตลาด', headerBackTitle: '', headerBackTitleVisible: false
                }}
            />
             <Stack.Screen name="HomeListBuilding" component={Listhomebuilding} 
                options={{
                    headerTitle: 'เลือกตลาด', headerBackTitle: '', headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    )
}

const Reserv = function MyStack() {
    return (
        <Stack.Navigator
            //headerMode='none'
            initialRouteName='ReservHome'
            screenOptions={({route, navigation}) => ({
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
            
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 10,alignItems:'center'}}
                        onPress={() => {
                            StorageServies.clear()
                         ///   this.props.saveUserInfo([])
                            navigation.navigate('Choice')
                        }}
                    >
                        <Icon name='sign-out' size={20} color='white' />
                        <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="ReservHome" component={Reservscreen} 
                options={({route, navigation}) => ({
                    headerTitle: 'จองพื้นที่ตลาด', headerBackTitle: '', headerBackTitleVisible: false,
                    headerLeft : () => (
                        <TouchableOpacity
                            style={{ padding: 10,alignItems:'center'}}
                            onPress={() => {
                                navigation.navigate('AuditListBooking')
                            }}
                        >
                            <Icon name='paperclip' size={20} color='white' />
                            <Text style={{fontSize:8,color:'white'}}>{'แจ้งชำระเงิน'}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name="ReservListCustomer" component={Listcustometscreen} 
                options={{
                    headerTitle: 'รายชื่อลูกค้า', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen name="ReservListBuilding" component={Listbuildingscreen} 
                options={{
                    headerTitle: 'เลือกตลาด', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            {/* <Stack.Screen name="ReservCalendarAudit" component={Calendarscreen} /> */}
            <Stack.Screen name="ReservBoothAudit" component={Boothscreen}
                options={{
                    headerTitle: 'เลือกบูธขายของ', headerBackTitle: '', headerBackTitleVisible: false
                }}  
            />
            <Stack.Screen name="Plan" component={Planscreen}
                options={{
                    headerTitle: 'รูปภาพ', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            {/* <Stack.Screen name="ReservDaySelectedAudit" component={Dayselectedscreen} />
            <Stack.Screen name="ReservAccessoriesAudit" component={Accessoriesscreen} /> */}
            <Stack.Screen name="ReservSummaryAudit" component={Summaryscreen} 
                options={{
                    headerTitle: 'รายละเอียดการจอง', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen name="ReservEditBoothAudit" component={Editboothscreen} 
                options={{
                    headerTitle: 'เลือกบูธขายของ', headerBackTitle: '', headerBackTitleVisible: false
                }}
            />
            <Stack.Screen name="ReservSuccessAudit" component={Bookingsuccessscreen} 
                options={{
                    headerTitle: 'จองพื้นที่สำเร็จแล้ว', headerBackTitle: '', headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    );
}

const Customer = function MyStack() {
    return (
        <Stack.Navigator
            //headerMode='none'
            initialRouteName='MainAuditCustomer'
            screenOptions={({route, navigation}) => ({
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 10,alignItems:'center'}}
                        onPress={() => {
                            StorageServies.clear()
                         ///   this.props.saveUserInfo([])
                            navigation.navigate('Choice')
                        }}
                    >
                        <Icon name='sign-out' size={20} color='white' />
                        <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="MainAuditCustomer" component={Customerscreen} 
                options={{
                    headerTitle: 'รายชื่อลูกค้า', headerBackTitle: '', headerBackTitleVisible: false,
                }} 
            />
            <Stack.Screen name="AuditCustomerDetails" component={Customerdetailsscreen} 
                options={{
                    headerTitle: 'รายชื่อลูกค้า', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen name="AuditHistoryDetails" component={Customerhistorydetailsscreen} 
                options={{
                    headerTitle: 'ประวัติการจองพื้นที่ร้านค้า', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    );
}

const Notification = function MyStack() {
    return (
        <Stack.Navigator
            //headerMode='none'
            initialRouteName='AuditNotification'
            screenOptions={({route, navigation}) => ({
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ padding: 10,alignItems:'center'}}
                        onPress={() => {
                            StorageServies.clear()
                         ///   this.props.saveUserInfo([])
                            navigation.navigate('Choice')
                        }}
                    >
                        <Icon name='sign-out' size={20} color='white' />
                        <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
                    </TouchableOpacity>
                ),
            })}>
            <Stack.Screen name="AuditNotification" component={Notificationscreen} 
                options={{
                    headerTitle: 'แจ้งเตือน', headerBackTitle: '', headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    );
}


// const props = this.props
const Tab = createBottomTabNavigator()
const tabMain = (countItem) => {
    let Role = 'Audit'
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: secondaryColor,
                inactiveTintColor: 'white',
                labelStyle: {
                    fontSize: 12
                },
                backgroundColor: primaryColor,
                style: {
                    justifyContent: 'center',
                    backgroundColor: primaryColor,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'หน้าหลัก',
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
                name="Noti"
                component={Notification}
                options={{
                    tabBarLabel: 'แจ้งเตือน',
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            <TabIcon focused={focused} Controller={'Noti'} Role={Role} />
                            {/* {
                                focused ?
                                    <Image source={ic_bell_active} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                                    :
                                    <Image source={ic_bell_inactive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                            }
                            <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{`1`}</Text>
                            </View> */}
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="AdminCustomer"
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