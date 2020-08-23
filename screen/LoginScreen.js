import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    FlatList,
    TextInput,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    KEY_LOGIN,
    BASE_URL,
    HEADERFORMDATA,
    RegisterFCMToken,
    LOGIN_URL,
    SYSTEMLOGIN_URL,
    KEY_ROLE,
} from '../utils/contants'
import Hepler from '../utils/Helper'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
} from '../actions'
import StorageServies from '../utils/StorageServies'

import styles from '../style/style'
import ic_user from '../assets/image/icon_user_login.png'
import ic_lock from '../assets/image/icon_password.png'

const DEVICE_WIDTH = Dimensions.get('screen').width
class LoginScreen extends React.Component {

    state = {
        username: '',
        password: '',
        Icon : 'eye-slash',
        showPassword : true,
    }

    _changeIcon = () => {
        this.setState(prevState => ({
            Icon : prevState.Icon === 'eye' ? 'eye-slash' : 'eye',
            showPassword : !prevState.showPassword
        }))
    }

    ComponentLeft = () => {
        return (
            <TouchableOpacity onPress={() => this.handleBack()} style={{ padding: 10 }}>
                <Icon name='chevron-left' size={20} color='white' />
            </TouchableOpacity>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.text16, { color: 'white' }]}>{`เข้าสู่ระบบ`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        console.log('token',this.props.reducer.token)
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    CheckLogin() {
        let userName = this.state.username
        let passWord = this.state.password
        let token = this.props.reducer.token
        if(userName.trim() == '' || passWord.trim() == ''){
            return Alert.alert('กรุณากรอก ชื่อผู้ใช้งาน และ รหัสผ่าน ให้ครบ!')
        }else{
            this.props.openIndicator()
            let formData = new FormData();
            formData.append('USERNAME', userName.trim())
            formData.append('PASSWORD', passWord.trim())
            Hepler.post(BASE_URL + LOGIN_URL,formData,HEADERFORMDATA,(results) => {
                this.props.dismissIndicator()
                if (results.status == 'SUCCESS') {
                    StorageServies.set(KEY_ROLE,'USER')
                    StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                    this.props.saveUserInfo(results.data)

                    /// update token
                    let formData = new FormData();
                    formData.append('token', token)
                    formData.append('partners_id', results.data.partners_id)
                    Hepler.post(BASE_URL + RegisterFCMToken,formData,HEADERFORMDATA,(results) => {
                        console.log('RegisterFCMToken',results)
                    })

                    this.props.navigation.navigate('Main')
                } else {
                    Alert.alert(results.message)
                }
            })
        }
    }

    CheckAuditAdminLogin() {
        let userName = this.state.username
        let passWord = this.state.password
        if(userName.trim() == '' || passWord.trim() == ''){
            return Alert.alert('กรุณากรอก ชื่อผู้ใช้งาน และ รหัสผ่าน ให้ครบ!')
        }else{
            this.props.openIndicator()
            let formData = new FormData();
            formData.append('USERNAME', userName.trim())
            formData.append('PASSWORD', passWord.trim())
            Hepler.post(BASE_URL + SYSTEMLOGIN_URL,formData,HEADERFORMDATA,(results) => {
                console.log('SYSTEMLOGIN_URL',results)
                this.props.dismissIndicator()
                if (results.status == 'SUCCESS') {
                    if(results.data.role == 'AUDIT'){
                        StorageServies.set(KEY_ROLE,results.data.role)
                        StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                        this.props.saveUserInfo(results.data)
                        this.props.navigation.navigate('AuditMain')
                    }else{
                        StorageServies.set(KEY_ROLE,results.data.role)
                        StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                        this.props.saveUserInfo(results.data)
                        this.props.navigation.navigate('AdminMain')
                    }
                   
                } else {
                    Alert.alert(results.message)
                }
            })
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, styles.center]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.panelWhite, styles.shadow]}>
                        <Text style={[styles.text20, { color: primaryColor, alignSelf: 'center' }]}>{`เข้าสู่ระบบ`}</Text>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <Image source={ic_user} style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 5 }} />
                            <TextInput
                                ref={(input) => { this.username = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='ชื่อผู้ใช้งาน'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({ username: text })}
                                onSubmitEditing={() => this.password.focus()} />
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <Image source={ic_lock} style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 5 }} />
                            <TextInput
                                ref={(input) => { this.password = input; }}
                                style={{ width: '80%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='รหัสผ่าน'
                                returnKeyType={'done'}
                                secureTextEntry={this.state.showPassword}
                                blurOnSubmit={false}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                                onSubmitEditing={() => this.CheckLogin()} />
                            <TouchableOpacity style={{right:10}} onPress={() => {this._changeIcon()}}>
                                <Icon name={this.state.Icon} size={20} color={primaryColor} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={[styles.text14, { color: primaryColor, alignSelf: 'center', textDecorationLine: 'underline' }]}>{`ลืมรหัสผ่าน?`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <TouchableOpacity style={[styles.mainButton, styles.center]}
                            onPress={
                                () => this.CheckLogin()
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`เข้าสู่ระบบ`}</Text>
                        </TouchableOpacity>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <TouchableOpacity style={[styles.mainButton2, styles.center, { width: DEVICE_WIDTH - 70 }]}
                            onPress={
                                () => this.CheckAuditAdminLogin()
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`Audit/Admin`}</Text>
                        </TouchableOpacity>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <Text style={[styles.text14, { alignSelf: 'center' }]}>{`ถ้าท่านยังไม่ได้เป็นสมาชิก สมัครสมาชิกได้เลยค่ะ`}</Text>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}
                            onPress={
                                () => this.props.navigation.navigate('Registercondition')
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`สมัครสมาชิก`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)