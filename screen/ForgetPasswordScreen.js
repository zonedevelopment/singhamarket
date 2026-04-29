import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    KeyboardAvoidingView 
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    HEADERFORMDATA,
    FORGET_PASSWORD_URL,
} from '../utils/contants'
import Hepler from '../utils/Helper'
import {
    openIndicator,
    dismissIndicator,
} from '../actions'
import StorageServies from '../utils/StorageServies'
import * as EmailValidator from 'email-validator';
import { validateFormSecurity } from '../utils/inputSecurity'
import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ForgetPasswordScreen extends React.Component {
    backHandlerSubscription = null

    state = {
        email : '',
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

    componentDidMount() {
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    ResetPassword = () => {
        if(this.state.email.trim() == ""){
            return Alert.alert('กรุณากรอก Email ที่ใช้ในการสมัคร!')
        }
        if (!EmailValidator.validate(this.state.email)){

            return Alert.alert('Email ไม่ถูกต้อง! ' + this.state.email)
        }
        const securityError = validateFormSecurity([
            { label: 'Email', value: this.state.email, checkSql: true },
        ])

        if (securityError) {
            return Alert.alert(securityError)
        }
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('EMAIL', this.state.email.trim())
        Hepler.post(BASE_URL + FORGET_PASSWORD_URL,formData,HEADERFORMDATA,(results) => {
            console.log('FORGET_PASSWORD_URL',results)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                Alert.alert(results.message)
            } else {
                Alert.alert(results.message)
            }
        })
    }

    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <View style={[styles.container, styles.center]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <ScrollView style={{ flex: 1}} keyboardShouldPersistTaps="never">
                        <KeyboardAvoidingView behavior="padding">
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <Text style={[styles.text20, { color: primaryColor, alignSelf: 'center' }]}>{`ลืมรหัสผ่าน`}</Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                                <View style={[styles.loginInputShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black', paddingLeft: 5 }}
                                    placeholder='กรุณากรอก Email ที่ใช้สมัคร'
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                        this.setState({ email: text })
                                    }}
                                    onSubmitEditing={() => this.ResetPassword()}  />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}
                                onPress={
                                    () => { this.ResetPassword()} 
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ส่งรหัสผ่านไปยัง Email`}</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen)
