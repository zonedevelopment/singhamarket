import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Alert,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { CheckBox } from 'react-native-elements'
import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    redColor,
    BASE_URL,
    CHANGE_PASSWORD_URL,
    HEADERFORMDATA,
    KEY_LOGIN,
    LOGIN_URL
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
} from '../../actions'
import Hepler from '../../utils/Helper'
import StorageServies from '../../utils/StorageServies'

class ChangePasswordScreen extends React.Component {

    state = {
        passwordText : '',
        passwordOld : '',
        passwordNew : '',
        passwordNewConfirm : '',
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
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`เปลี่ยนรหัสผ่าน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={[{ padding: 10 }]}>

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

    async componentDidMount() {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        LOGIN = JSON.parse(LOGIN)
        this.setState({
            passwordText :  LOGIN.password_text
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    ChangePassword () {
        if(this.state.passwordOld.trim() == '' || this.state.passwordNew.trim() == '' || this.state.passwordNewConfirm.trim() == ''){
            Alert.alert('กรุณากรอกข้อมูลให้ครบ!')
            return false;
        }else{
            if(this.state.passwordText != this.state.passwordOld.trim()){
                alert(this.state.passwordText)
                Alert.alert('รหัสผ่านเดิมไม่ถูกต้อง!')
                return false;
            }
            if(this.state.passwordNew.trim() != this.state.passwordNewConfirm.trim()){
                Alert.alert('รหัสผ่านใหม่ยืนยันไม่ตรงกัน!')
                return false;
            }
            const props = this.props.reducer
            let formData = new FormData();
            formData.append('password',this.state.passwordNew)
            formData.append('partners_id',props.userInfo.partners_id)
            this.props.openIndicator()
            Hepler.post(BASE_URL + CHANGE_PASSWORD_URL,formData,HEADERFORMDATA,(results)=>{
                console.log('UPDATE_PROFILE_PERSONAL',results)
                if (results.status == 'SUCCESS') {
                    this.props.dismissIndicator()
                    Alert.alert(  
                        '',  
                        results.message,  
                        [  
                            {text: 'OK', onPress: () => this.RefreshLogin()},
                        ]
                    );
                } else {
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
            })
        }

    }

    
    async RefreshLogin () {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        LOGIN = JSON.parse(LOGIN)
        let formData = new FormData();
        formData.append('USERNAME', LOGIN.username)
        formData.append('PASSWORD', this.state.passwordNew)
        Hepler.post(BASE_URL + LOGIN_URL,formData,HEADERFORMDATA,(results) => {
            console.log('LOGIN_URL',results)
            if (results.status == 'SUCCESS') {
                StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                this.props.saveUserInfo(results.data)
                this.handleBack()
            } else {
                Alert.alert(results.message)
            }
        })
    }


    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={[styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }]}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, { padding: 10 }]}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View /* style={[styles.panelWhite]}*/>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`เปลี่ยนรหัสผ่าน`}</Text>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.passwordOld = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่านเดิม'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ passwordOld: text })} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.passwordNew = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่านใหม่'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ passwordNew: text })} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.passwordNewConfirm = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ยืนยันรหัสผ่านใหม่'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ passwordNewConfirm: text })} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <TouchableOpacity 
                            style={[styles.mainButton  , styles.center]}
                                onPress={
                                    () => {
                                        this.ChangePassword()
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`บันทึกการแก้ไข`}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)