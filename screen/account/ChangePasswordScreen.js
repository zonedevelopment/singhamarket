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
    Platform,
    ScrollView,
    SafeAreaView,
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
    LOGIN_URL,
    KEY_PWD_TXT,
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
} from '../../actions'
import Hepler from '../../utils/Helper'
import { validateFormSecurity } from '../../utils/inputSecurity'
import StorageServies from '../../utils/StorageServies'
import IOSBackButtonOverlay from '../../components/IOSBackButtonOverlay'

class ChangePasswordScreen extends React.Component {
    backHandlerSubscription = null


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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    async componentDidMount() {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        let PWD_TXT = await StorageServies.get(KEY_PWD_TXT)
        LOGIN = JSON.parse(LOGIN)
        this.setState({
            passwordText :  PWD_TXT
        })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    ChangePassword () {
        if(this.state.passwordOld.trim() == '' || this.state.passwordNew.trim() == '' || this.state.passwordNewConfirm.trim() == ''){
            Alert.alert('กรุณากรอกข้อมูลให้ครบ!')
            return false;
        }else{
            const securityError = validateFormSecurity([
                { label: 'รหัสผ่านเดิม', value: this.state.passwordOld, checkSql: false },
                { label: 'รหัสผ่านใหม่', value: this.state.passwordNew, checkSql: false },
                { label: 'ยืนยันรหัสผ่านใหม่', value: this.state.passwordNewConfirm, checkSql: false },
            ])

            if (securityError) {
                return Alert.alert(securityError)
            }

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
            formData.append('token',props.userInfo.token)
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
            <SafeAreaView style={[styles.container, Platform.OS === 'ios' ? styles.formPageBackground : { backgroundColor: 'white' }]}>
                <IOSBackButtonOverlay onPress={this.handleBack} />
                <View style={[styles.container, Platform.OS === 'ios' ? { alignItems: 'center', paddingTop: 12 } : { padding: 10 }]}>
                    {Platform.OS === 'ios' ? (
                        <View style={styles.formHeaderBlock}>
                            <Text style={styles.formHeaderTitle}>{`เปลี่ยนรหัสผ่าน`}</Text>
                            <Text style={styles.formHeaderBrand}>{`SUN PLAZA`}</Text>
                        </View>
                    ) : null}
                    <ScrollView
                        style={Platform.OS === 'ios' ? [styles.panelWhite, styles.registerPanelShadow] : null}
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View /* style={[styles.panelWhite]}*/>
                            {Platform.OS === 'ios' ? null : <Text style={[styles.text22, { color: primaryColor }]}>{`เปลี่ยนรหัสผ่าน`}</Text>}
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}> 
                                <TextInput
                                    ref={(input) => { this.passwordOld = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่านเดิม'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ passwordOld: text })} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}> 
                                <TextInput
                                    ref={(input) => { this.passwordNew = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่านใหม่'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ passwordNew: text })} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}> 
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
            </SafeAreaView>
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
