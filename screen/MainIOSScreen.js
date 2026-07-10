import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import TabIcon from '../components/TabIcon'
import styles from '../style/style'
import { primaryColor, secondaryColor } from '../utils/contants'

import HomeScreen from './tabs/HomeScreen'
import ReservationScreen from './tabs/ReservationScreen'
import IOSAccountScreen from './IOSAccountScreen'
import NewsDetailsScreen from './NewsDetailsScreen'
import FloorZoneScreen from './reservation/FloorZoneScreen'
import PlanScreen from './reservation/PlanScreen'
import BoothScreen from './reservation/BoothScreen'
import DaySelectedScreen from './reservation/DaySelectedScreen'
import AccessoriesScreen from './reservation/AccessoriesScreen'
import SummaryScreen from './reservation/SummaryScreen'
import EditBoothScreen from './reservation/EditBoothScreen'
import ProfilePersonalScreen from './account/ProfilePersonalScreen'
import ProfileCompanyScreen from './account/ProfileCompanyScreen'
import HistoryScreen from './account/HistoryScreen'
import FavoriteScreen from './account/FavoriteScreen'
import SupportScreen from './account/SupportScreen'
import ChangePasswordScreen from './account/ChangePasswordScreen'
import ConditionScreen from './account/ConditionScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const commonScreenOptions = {
    headerStyle: [styles.bottomRightRadius, styles.bottomLeftRadius, { backgroundColor: primaryColor }],
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerBackTitle: '',
    headerBackTitleVisible: false,
}

const HomeStack = () => (
    <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name='IOSHome' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='NewsDetails' component={NewsDetailsScreen} options={{ headerTitle: 'ข่าวสารและโปรโมชั่น' }} />
    </Stack.Navigator>
)

const ReservationStack = () => (
    <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name='IOSBuilding' component={ReservationScreen} options={{ headerTitle: 'จองพื้นที่' }} />
        <Stack.Screen name='Floorzone' component={FloorZoneScreen} options={{ headerTitle: 'จองพื้นที่' }} />
        <Stack.Screen name='Plan' component={PlanScreen} options={{ headerTitle: 'รูปภาพ' }} />
        <Stack.Screen name='Booth' component={BoothScreen} options={{ headerTitle: 'เลือกบูธขายของ' }} />
        <Stack.Screen name='Dayselect' component={DaySelectedScreen} />
        <Stack.Screen name='Accessories' component={AccessoriesScreen} />
        <Stack.Screen name='Summary' component={SummaryScreen} options={{ headerTitle: 'รายละเอียดการจอง' }} />
        <Stack.Screen name='EditBooth' component={EditBoothScreen} options={{ headerTitle: 'เลือกบูธขายของ' }} />
    </Stack.Navigator>
)

const AccountStack = () => (
    <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name='IOSAccount' component={IOSAccountScreen} options={{ headerTitle: 'บัญชี' }} />
        <Stack.Screen name='Personal' component={ProfilePersonalScreen} options={{ headerTitle: 'ข้อมูลส่วนตัว' }} />
        <Stack.Screen name='Company' component={ProfileCompanyScreen} options={{ headerTitle: 'ข้อมูลนิติบุคคล' }} />
        <Stack.Screen name='History' component={HistoryScreen} options={{ headerTitle: 'ประวัติการจอง' }} />
        <Stack.Screen name='Favorite' component={FavoriteScreen} options={{ headerTitle: 'บูธที่สนใจ' }} />
        <Stack.Screen name='Support' component={SupportScreen} options={{ headerTitle: 'แจ้งเรื่องร้องเรียน/ติดต่อเรา' }} />
        <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerTitle: 'เปลี่ยนรหัสผ่าน' }} />
        <Stack.Screen name='ConditionProfile' component={ConditionScreen} options={{ headerTitle: 'ข้อตกลงและเงื่อนไข' }} />
    </Stack.Navigator>
)

const MainIOSScreen = () => (
    <Tab.Navigator
        initialRouteName='HomeIOS'
        tabBarOptions={{
            activeTintColor: secondaryColor,
            inactiveTintColor: 'white',
            labelStyle: { fontSize: 12 },
            style: {
                justifyContent: 'center',
                backgroundColor: primaryColor,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                borderTopWidth: 0,
            },
        }}>
        <Tab.Screen
            name='HomeIOS'
            component={HomeStack}
            options={{
                tabBarLabel: 'หน้าหลัก',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} Controller='Home' Role='User' />,
            }} />
        <Tab.Screen
            name='ReservationIOS'
            component={ReservationStack}
            options={{
                tabBarLabel: 'จองพื้นที่',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} Controller='Reserv' Role='User' />,
            }} />
        <Tab.Screen
            name='AccountIOS'
            component={AccountStack}
            options={{
                unmountOnBlur: true,
                tabBarLabel: 'บัญชี',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} Controller='Profile' Role='User' />,
            }} />
    </Tab.Navigator>
)

export default MainIOSScreen
