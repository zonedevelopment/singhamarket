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
import Conditionscreen from './account/ConditionScreen'
/**
 * End
 */

/**
 * Cart stack
 */
import ConfirmReservscreen from './reservation/ConfirmReservScreen'
import PaymentChannelscreen from './PaymentChannelScreen'
import Paymentdirectpayscreen from './PaymentDirectPayScreen'
/**
* End
*/

import NewsDetailsScreen from './NewsDetailsScreen'
const StyleHeader = [{
    backgroundColor: primaryColor,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
}]

const Stack = createStackNavigator();
const Reserv = function MyStack() {
    return (
        <Stack.Navigator
            // headerMode='float'
            headerMode="screen"
            initialRouteName='Building'
            screenOptions={{
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false
            }}>
            <Stack.Screen name="Building" component={Reservscreen}
                options={{
                    cardStyle: { backgroundColor: primaryColor },
                    headerTitle: 'จองพื้นที่',
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
                }} />
            <Stack.Screen name="Floorzone" component={Floorzone}
                options={{
                    headerTitle: 'จองพื้นที่', headerBackTitle: '', headerBackTitleVisible: false
                }} />
            <Stack.Screen name="Plan" component={Planscreen}
                options={{
                    headerTitle: 'รูปภาพ', headerBackTitle: '', headerBackTitleVisible: false
                }} />
            {/* <Stack.Screen name="Calendar" component={Calendarscreen} /> */}
            <Stack.Screen name="Booth" component={Boothscreen}
                options={{
                    headerTitle: 'เลือกบูธขายของ', headerBackTitle: '', headerBackTitleVisible: false
                }} />
            <Stack.Screen name="Dayselect" component={Dayselectscreen} />
            <Stack.Screen name="Accessories" component={Accessoriesscreen} />
            <Stack.Screen name="Summary" component={Summaryscreen}
                options={{
                    cardStyle: { backgroundColor: primaryColor },
                    headerTitle: 'รายละเอียดการจอง',
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
            <Stack.Screen name="EditBooth" component={Editboothscreen}
                options={{
                    headerTitle: 'เลือกบูธขายของ', headerBackTitle: '', headerBackTitleVisible: false
                }} />
        </Stack.Navigator>
    );
}

const Account = function AccStack() {
    return (
        <Stack.Navigator
            // headerMode='none'
            initialRouteName='Profile'
            screenOptions={{
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false
            }}>
            <Stack.Screen name="Profile" component={Profilescreen}
                options={{ headerTitle: 'บัญชีของฉัน' }} />
            <Stack.Screen name="History" component={Historyscreen}
                options={{ headerTitle: 'ประวัติการจอง', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="Favorite" component={Favoritescreen}
                options={{ headerTitle: 'บูธที่สนใจ', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="Support" component={Supportscreen}
                options={{ headerTitle: 'แจ้งเรื่องร้องเรียน/ติดต่อเรา', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="Personal" component={Personalscreen}
                options={{ headerTitle: 'ข้อมูลส่วนตัว', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="Company" component={Companyscreen}
                options={{ headerTitle: 'ข้อมูลบริษัท', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="ChangePassword" component={Changepasswordscreen}
                options={{ headerTitle: 'เปลี่ยนรหัสผ่าน', headerBackTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="ConditionProfile" component={Conditionscreen}
                 options={{
                    headerStyle: [/*styles.bottomRightRadius, styles.bottomLeftRadius0,-*/ {
                        backgroundColor: primaryColor,
                    }],
                    headerTintColor: '#fff',
                    headerTitle: 'ข้อตกลงและเงื่อนไข',
                    headerBackTitle: '',
                    headerBackTitleVisible: false
                }} 
              
            />

        </Stack.Navigator>
    )
}

const Home = function AccStack() {
    return (
        <Stack.Navigator
            // headerMode='none'
            initialRouteName='Home'
            screenOptions={{
                headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                    backgroundColor: primaryColor,
                }],
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerBackTitle: '',
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name="Home" component={Homescreen}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackTitle: '',
                    headerBackTitleVisible: false,
                    headerShown: false,
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen name="NewsDetails" component={NewsDetailsScreen}
                options={{
                    headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                    }],
                    headerTintColor: '#fff',
                    headerTitle: 'ข่าวสารและโปรโมชั่น',
                    headerBackTitle: '',
                    headerBackTitleVisible: false
                }} />
        </Stack.Navigator>
    )
}

const Cart = function AccStack() {
    return (
        <Stack.Navigator
            // headerMode='none'
            initialRouteName='Cart'>
            <Stack.Screen name="Cart" component={Cartscreen}
                options={{
                    title: 'ตะกร้าสินค้า',
                    headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                    }],
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerBackTitle: '',
                    headerBackTitleVisible: false
                }} />
            {/* <Stack.Screen name="ConfirmReserv" component={ConfirmReservscreen} />
            <Stack.Screen name="Paymentchannel" component={PaymentChannelscreen} />
            <Stack.Screen name="PaymentDirect" component={Paymentdirectpayscreen} /> */}
        </Stack.Navigator>
    )
}

const Noti = function NotiStack() {
    return (
        <Stack.Navigator
            // headerMode='none'
            initialRouteName='Noti'>
            <Stack.Screen name="Noti" component={Notiscreen}
                options={{
                    title: 'แจ้งเตือน',
                    headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                    }],
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerBackTitle: '',
                    headerBackTitleVisible: false
                }} />
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
                component={Cart}
                options={{
                    tabBarLabel: 'รถเข็น',
                    tabBarIcon: ({ focused, color, screenProps }) => (
                        <TabIcon focused={focused} Controller={'Cart'} Role={Role} />
                    ),
                }} />
            <Tab.Screen
                name="Noti"
                component={Noti}
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
                    unmountOnBlur : true,
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