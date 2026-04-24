import React from 'react'
import {
    View,
    Text,
    Alert,
    Platform,
    Linking,
    AppState
} from 'react-native'
import { connect } from 'react-redux'
import RNExitApp from 'react-native-exit-app'
import VersionCheck from 'react-native-version-check'

import styles from '../style/style'

import {
    primaryColor,
    secondaryColor,
    KEY_LOGIN,
    BASE_URL,
    LOGIN_URL,
    BANNER_URL,
    NEWS_URL,
    HEADERFORMDATA,
    GET_CART_URL,
    KEY_ROLE,
    KEY_PWD_TXT,
    SYSTEMLOGIN_URL,
    CONSTANTS_URL,
} from '../utils/contants'

import Hepler from '../utils/Helper'
import StorageServies from '../utils/StorageServies'
import {
    setStateBanner,
    saveUserInfo,
    setStateNews,
    setStateMyCart,
    setUserCountCartItem,
    setUserCountNotifyItem,
    setConstants,

} from '../actions'


class SplashScreen extends React.Component {
    appStateSubscription = null

    state = {
        appState: AppState.currentState
    }

    async checkUpdate() {
        let currentVersion = await VersionCheck.getCurrentVersion()
        if (Platform.OS === 'android') {
            await VersionCheck.getLatestVersion({
                provider: 'playStore'
            }).then(latestVersion => {
                if (currentVersion < latestVersion) {
                    Alert.alert(
                        `คำเตือน`,
                        `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
                        [
                            {
                                text: 'ไม่, ขอบคุณ',
                                onPress: () => { RNExitApp.exitApp() },
                                style: 'cancel',
                            },
                            {
                                text: 'อัพเดท', onPress: () => {
                                    Linking.openURL('https://play.google.com/store/apps/details?id=th.co.zoneidea.sunplaza');
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.initailData()
                }
            });
        } else {
            await VersionCheck.getLatestVersion({
                provider: 'appStore'
            }).then(latestVersion => {
                if (currentVersion < latestVersion) {
                    Alert.alert(
                        `คำเตือน`,
                        `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
                        [
                            {
                                text: 'ไม่, ขอบคุณ',
                                onPress: () => { RNExitApp.exitApp() },
                                style: 'cancel',
                            },
                            {
                                text: 'อัพเดท', onPress: () => {
                                    Linking.openURL('https://apps.apple.com/th/app/sun-plaza-market/id1530134350');
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.initailData()
                }
            });
        }
    }




    async initailData() {
        await Hepler.post(BASE_URL + CONSTANTS_URL, null, HEADERFORMDATA, (results) => {
            console.log('CONSTANTS_URL', results)
            if (results.status == 'SUCCESS') {
                this.props.setConstants({
                    ChargeFines: results.data['charge_fines'], //// ค่าปรับเมื่อทำผิดกฏ
                    LimitReservUserOfDay: results.data['LimitReservUserOfDay'], ///// จำนวนการจองสูงสุด ต่อ วัน/ผู้ใช้งาน
                    CartPaymentTimeOut: {
                        Personal: results.data['TimeoutPersonal'],
                        Company: results.data['TimeoutCompany']
                    }, /// ms ระยะเวลาในการชำระเงิน
                    ChargeService2C2P: results.data['2C2P_Charge'], //////// ค่าบริการ 2C2P
                    personal_vat: results.data['Personal_Vat'], // ดึงจาก base
                    company_vat: results.data['Company_Vat'], /// ดึงจาก base
                    url_cancel_onetrust: results.data['URL_CANCEL_ONETRUST'],
                })
            }
        })

        //// check Login
        let LOGIN, ROLE, PWD_TXT
        try {
            LOGIN = await StorageServies.get(KEY_LOGIN)
            ROLE = await StorageServies.get(KEY_ROLE)
            PWD_TXT = await StorageServies.get(KEY_PWD_TXT)
        } catch (error) {
            console.log('KEY_LOGIN', error)
        }

        if (LOGIN != null) {
            LOGIN = JSON.parse(LOGIN)
            if (ROLE == 'USER') {
                let formData = new FormData();
                formData.append('USERNAME', LOGIN.username)
                formData.append('PASSWORD', PWD_TXT)
                Hepler.post(BASE_URL + LOGIN_URL, formData, HEADERFORMDATA, (results) => {
                    console.log('LOGIN_URL', JSON.stringify(results))
                    if (results.status == 'SUCCESS') {
                        StorageServies.set(KEY_LOGIN, JSON.stringify(results.data))
                        this.props.saveUserInfo(results.data)
                        this.GetMyCart(results.data.partners_id)

                    } else {
                        Alert.alert(results.message)
                        StorageServies.clear()
                        this.props.saveUserInfo([])
                        this.props.navigation.navigate('Choice')
                    }
                })
            }
            if (ROLE == 'AUDIT') {
                let formData = new FormData();
                formData.append('USERNAME', LOGIN.username)
                formData.append('PASSWORD', PWD_TXT)
                Hepler.post(BASE_URL + SYSTEMLOGIN_URL, formData, HEADERFORMDATA, (results) => {
                    console.log('SYSTEMLOGIN_URL', results)
                    if (results.status == 'SUCCESS') {
                        StorageServies.set(KEY_LOGIN, JSON.stringify(results.data))
                        this.props.saveUserInfo(results.data)
                        this.props.navigation.replace('AuditMain')
                    } else {
                        Alert.alert(results.message)
                        StorageServies.clear()
                        this.props.saveUserInfo([])
                        this.props.navigation.navigate('Choice')
                    }
                })
            }

            if (ROLE == 'ADMIN') {
                let formData = new FormData();
                formData.append('USERNAME', LOGIN.username)
                formData.append('PASSWORD', PWD_TXT)
                Hepler.post(BASE_URL + SYSTEMLOGIN_URL, formData, HEADERFORMDATA, (results) => {
                    console.log('SYSTEMLOGIN_URL', results)
                    if (results.status == 'SUCCESS') {
                        StorageServies.set(KEY_LOGIN, JSON.stringify(results.data))
                        this.props.saveUserInfo(results.data)
                        this.props.navigation.replace('AdminMain')
                    } else {
                        Alert.alert(results.message)
                        StorageServies.clear()
                        this.props.saveUserInfo([])
                        this.props.navigation.navigate('Choice')
                    }
                })
            }
        } else {
            this.props.navigation.replace('Choice')
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.checkUpdate()
        }
        this.setState({ appState: nextAppState });
    }

    componentWillUnmount() {
        if (this.appStateSubscription) {
            this.appStateSubscription.remove();
            this.appStateSubscription = null;
        }
    }

    async componentDidMount() {
        await this.checkUpdate()
        this.appStateSubscription = AppState.addEventListener("change", this._handleAppStateChange);
    }


    GetMyCart(partners_id) {
        let formData = new FormData();
        formData.append('partners_id', partners_id)
        Hepler.post(BASE_URL + GET_CART_URL, formData, HEADERFORMDATA, (results) => {
            console.log('GET_CART_URL', results)
            if (results.status == 'SUCCESS') {
                this.props.setStateMyCart(results.data.Cart)
                this.props.setUserCountCartItem(results.data.Cart.length + results.data.Charge.length)
                this.props.navigation.replace('Main')
            } else {
                this.props.setStateMyCart([])
                this.props.setUserCountCartItem(0)
                this.props.navigation.replace('Main')
                Alert.alert(results.message)
            }
        })
    }


    render() {
        return (
            <View style={[styles.container, styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 55 }]}>{`SUN PLAZA`}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    setStateBanner,
    setStateNews,
    saveUserInfo,
    setStateMyCart,
    setUserCountCartItem,
    setUserCountNotifyItem,
    setConstants,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
