import React from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    FlatList,
    TextInput,
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
    GET_AGREEMENT_REGISTER,
    UNSUBSCRIBE_PARTNERS_URL,
    redColor,
    BASE_URL,
    UPDATE_PROFILE_PERSONAL,
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
import OpenURLButton from '../../components/OpenURLButton'
class ProfilePersonalScreen extends React.Component {

    state = {
        phoneNumber: '',
        lineid: '',
        email: '',
        privacyAgree: false,
        type_name : '',
        category_name : '',
        product : [],
        privacy_url : '',
    }
    
    onUpdateProfile() {
        if (this.state.privacyAgree) {
            const props = this.props.reducer
            let formData = new FormData();
            formData.append('phone',this.state.phoneNumber)
            formData.append('lineid',this.state.lineid)
            formData.append('email',this.state.email)
            formData.append('partners_id',props.userInfo.partners_id)
            this.props.openIndicator()
            Hepler.post(BASE_URL + UPDATE_PROFILE_PERSONAL,formData,HEADERFORMDATA,(results)=>{
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
        } else {
            Alert.alert(
                'คำเตือน!',
                'กรุณายอมรับข้อตกลงและเงื่อนไขในการจองตลาด'
            );
        }
    }

    
    UnSubscribe() {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + UNSUBSCRIBE_PARTNERS_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('UNSUBSCRIBE_PARTNERS_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.Logout()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    async Logout (){
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Profile'}],
        });
        await StorageServies.clear()
        await this.props.saveUserInfo([])
        this.props.navigation.navigate('Choice')
    }
    

    async RefreshLogin () {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        LOGIN = JSON.parse(LOGIN)
        let formData = new FormData();
        formData.append('USERNAME', LOGIN.username)
        formData.append('PASSWORD', LOGIN.password_text)
        Hepler.post(BASE_URL + LOGIN_URL,formData,HEADERFORMDATA,(results) => {
            console.log('LOGIN_URL',results)
            if (results.status == 'SUCCESS') {
                StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                this.props.saveUserInfo(results.data)
            } else {
                Alert.alert(results.message)
            }
        })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อมูลส่วนตัว`}</Text>
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

    componentDidMount() {
        const props = this.props.reducer
        this.setState({
            phoneNumber: props.userInfo.phone,
            lineid: props.userInfo.lineid,
            email: props.userInfo.email,
            type_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_name,
            category_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.category_name,
            product : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product,
            privacyAgree : props.userInfo.privacyAgree == 'Y' ? true : false,
        })
        this.LoadAgreement(props.userInfo.partners_type)
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    LoadAgreement (type) {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type_id', type)
        Hepler.post(BASE_URL + GET_AGREEMENT_REGISTER,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    privacy_url : results.data['privacy_url'],
                })
            } else {
                Alert.alert(results.message)
                this.setState({
                    privacy_url : '',
                })
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
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลส่วนตัว`}</Text>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อ-นามสกุล : ' + props.userInfo.name_customer}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'เลขประจำตัวประชาชน : ' + props.userInfo.citizenid}</Text>
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.phone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.phoneNumber}
                                        onChangeText={(text) => this.setState({ phoneNumber: text.replace(/[^0-9\-]+/g, '') })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                                {/* <TouchableOpacity style={[styles.inputWithIcon, { width: '100%', paddingLeft: 0, alignItems: 'center', flex: 0.1 }]}
                                    onPress={() => {

                                    }} >
                                    <Icon name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    {/* <Text style={[styles.text16, {color: primaryColor}]}>{'Line ID : ' + props.userInfo.lineid}</Text> */}
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'Line ID : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.line = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        onChangeText={(text) => this.setState({ lineid: text })}
                                        returnKeyType={'next'}
                                        value={this.state.lineid} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                                {/* <TouchableOpacity style={[styles.inputWithIcon, { width: '100%', paddingLeft: 0, alignItems: 'center', flex: 0.1 }]}
                                    onPress={() => {

                                    }}>
                                    <Icon name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    {/* <Text style={[styles.text16, {color: primaryColor}]}>{'อีเมล : ' + props.userInfo.email}</Text> */}
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'อีเมล : '}</Text>
                                    <TextInput
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        ref={(input) => { this.email = input; }}
                                        value={this.state.email}
                                        onBlur={() => { 
                                            let e = this.state.email
                                            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e) == false) {
                                                Alert.alert('คำเตือน!','Email ไม่ถูกต้อง!',
                                                    [
                                                        { text: 'ตกลง', onPress: () => {
                                                            this.setState({ email : '' })
                                                            this.email.focus()
                                                        } }
                                                    ],
                                                    { cancelable: false }
                                                );
                                            }
                                        }}
                                        onChangeText={(text) => this.setState({ email: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                                {/* <TouchableOpacity style={[styles.inputWithIcon, { width: '100%', paddingLeft: 0, alignItems: 'center', flex: 0.1 }]}
                                    onPress={() => {

                                    }}>
                                    <Icon name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity> */}
                            </View>

                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`รหัสผ่าน`}</Text>
                            <TouchableOpacity style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}
                                onPress={() => {
                                    this.props.navigation.navigate('ChangePassword')
                                }}>
                                <View style={[styles.containerRow]}>
                                    <Text style={[styles.text16, { color: 'white', flex: 0.9 }]}>{'เปลี่ยนรหัสผ่าน'}</Text>
                                    <View style={{ alignItems: 'center', flex: 0.1 }}>
                                        <Icon name='chevron-right' size={20} color='white' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`ประเภทสินค้าที่นำมาขาย`}</Text>
                            <View style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{this.state.type_name + ` : ` + this.state.category_name}</Text>
                            </View>
                            <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                            {
                                this.state.product.map((v, i) => {
                                    return (
                                        <View key={i} style={{ paddingLeft: 40 }}>
                                            <Text style={[styles.text14]}>{`${(i + 1)}. ${v.product_name}`}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text style={[styles.text12, { color: primaryColor, paddingTop: 5, paddingLeft: 20 }]}>{`*หมายเหตุ ถ้าท่านต้องเปลี่ยนประเภทสินค้าที่ต้องการขาย\n กรุณาติดต่อเจ้าหน้าที่`}</Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <OpenURLButton url={this.state.privacy_url} fontSize={14}>{'ข้อตกลงและเงื่อนไขในการจองตลาด'}</OpenURLButton>
                            {/* <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text> */}
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.privacyAgree}
                                    onPress={() => this.setState({ privacyAgree: !this.state.privacyAgree })} />
                                <Text style={[styles.text14, { textDecorationLine: 'underline', flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ให้การยินยอมในการเปิดเผยข้อมูล `}</Text>
                            </View>
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                    onPress={
                                        () => this.handleBack()
                                    }>
                                    <Text style={[styles.text16, { color: '#FFF' }]}>{`ยกเลิก`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                    onPress={
                                        () => {
                                            this.onUpdateProfile()
                                        }
                                    }>
                                    <Text style={[styles.text16, { color: '#FFF' }]}>{`บันทึกการแก้ไข`}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                Alert.alert(
                                    "คำเตือน",
                                    'ยืนยันยกเลิกการสมัครสมาชิก?',
                                    [
                                        {
                                            text: "ยกเลิก",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "ตกลง", 
                                            onPress: () => this.UnSubscribe() 
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}>
                                <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ยกเลิกการสมัครสมาชิก`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePersonalScreen)