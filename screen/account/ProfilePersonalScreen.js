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
import { Picker } from '@react-native-picker/picker'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { CheckBox } from 'react-native-elements'
import * as EmailValidator from 'email-validator';
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
    KEY_PWD_TXT,
    LOGIN_URL,
    PROVINCE_URL,
    DISTRICT_URL,
    SUBDISTRICT_URL,
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
    saveProductType
} from '../../actions'
import Hepler from '../../utils/Helper'
import { validateFormSecurity } from '../../utils/inputSecurity'
import StorageServies from '../../utils/StorageServies'
import OpenURLButton from '../../components/OpenURLButton'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ProfilePersonalScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        phoneNumber: '',
        lineid: '',
        email: '',
        privacyAgree: false,
        type_id : '',
        type_name : '',
        category_name : '',
        product : [],
        privacy_url : '',
        agreement_url : '',

        ProvinceData: [],
        DistrictData: [],
        SubDistrictData: [],
        address: '',
        Soi: '',
        Road: '',
        ProvinceSelected: null,
        DistrictSelected: null,
        SubDistrictSelected: null,
        Zipcode: '',

    }


    LoadProvince() {
        this.props.openIndicator()
        Hepler.post(BASE_URL + PROVINCE_URL, null, HEADERFORMDATA, (results) => {
            console.log('PROVINCE_URL', results)
            if (results.status == 'SUCCESS') {
                results.data.map((value, index) => {
                    value['label'] = 'จังหวัด : ' + value['label']
                })
                this.setState({
                    ProvinceData: results.data,
                    LoadPV: true,
                    // ProvinceSelected : province_id,
                    DistrictData : [],
                    DistrictSelected : null,
                    SubDistrictData : [],
                    SubDistrictSelected : null,
                    Zipcode : '',
                })
                if(this.state.LoadFrist == true){
                    this.LoadDistrict(typeof this.props.reducer.userInfo === 'undefined' ? null : this.props.reducer.userInfo.province)
                }else{
                    this.props.dismissIndicator()
                }
            } else {
                this.props.dismissIndicator()
                Alert.alert(results.message)
                this.setState({
                    ProvinceData: [],
                    ProvinceSelected: null,
                    DistrictData: [],
                    DistrictSelected: null,
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            }
        })
    }


    LoadDistrict(province_id) {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('province_id', province_id)
        Hepler.post(BASE_URL + DISTRICT_URL, formData, HEADERFORMDATA, (results) => {
            console.log('DISTRICT_URL', results)
            if (results.status == 'SUCCESS') {
                results.data.map((value, index) => {
                    value['label'] = 'อำเภอ : ' + value['label']
                })
                this.setState({
                    LoadDS: true,
                    ProvinceSelected: province_id,
                    DistrictData: results.data,
                    // DistrictSelected: null,
                    SubDistrictData: [],
                    // SubDistrictSelected: null,
                    Zipcode: '',
                })
                if(this.state.LoadFrist == true){
                    this.LoadSubDistrict(typeof this.props.reducer.userInfo === 'undefined' ? null : this.props.reducer.userInfo.ampure)
                }else{
                    this.props.dismissIndicator()
                }
            } else {
                this.props.dismissIndicator()
                //Alert.alert(results.status + ' : ' + province_id)
                this.setState({
                    DistrictData: [],
                    DistrictSelected: null,
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            }
        })
    }


    LoadSubDistrict(district_id) {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('district_id', district_id)
        Hepler.post(BASE_URL + SUBDISTRICT_URL, formData, HEADERFORMDATA, (results) => {
            console.log('SUBDISTRICT_URL', results)
            if (results.status == 'SUCCESS') {
                results.data.map((value, index) => {
                    value['label'] = 'ตำบล : ' + value['label']
                })
                this.setState({
                    LoadSD: true,
                    DistrictSelected: district_id,
                    SubDistrictData: results.data,
                    SubDistrictSelected: null,
                })
                if(this.state.LoadFrist == true){
                    this.setState({
                        LoadFrist : false,
                        Zipcode : this.props.reducer.userInfo.zipcode,
                        SubDistrictSelected: this.props.reducer.userInfo.district,
                    })
                }else{
                    this.setState({
                        LoadFrist : false,
                        SubDistrictSelected: null,
                        Zipcode : '',
                    })
                }
                this.props.dismissIndicator()
            } else {
                this.props.dismissIndicator()
                // Alert.alert(results.message)
                this.setState({
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            }
        })
    }

    
    onUpdateProfile() {
        const props = this.props.reducer
        const securityError = validateFormSecurity([
            { label: 'ที่อยู่', value: this.state.address, checkSql: false },
            { label: 'ซอย', value: this.state.Soi, checkSql: false },
            { label: 'ถนน', value: this.state.Road, checkSql: false },
            { label: 'เบอร์โทรศัพท์', value: this.state.phoneNumber, checkSql: true },
            { label: 'Line ID', value: this.state.lineid, checkSql: false },
            { label: 'Email', value: this.state.email, checkSql: true },
        ])

        if (securityError) {
            return Alert.alert(securityError)
        }

        let formData = new FormData();
        formData.append('address', this.state.address)
        formData.append('Soi', this.state.Soi)
        formData.append('Road', this.state.Road)
        formData.append('province_id', this.state.ProvinceSelected)
        formData.append('district_id', this.state.DistrictSelected)
        formData.append('subdistrict_id', this.state.SubDistrictSelected)
        formData.append('zipcode', this.state.Zipcode)
        
        formData.append('phone',this.state.phoneNumber)
        formData.append('lineid',this.state.lineid)
        formData.append('email',this.state.email)
        formData.append('partners_id',props.userInfo.partners_id)
        formData.append('privacyAgree',this.state.privacyAgree === true ? 'Y' : 'N')
        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))
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
        let PWD_TXT = await StorageServies.get(KEY_PWD_TXT)
        LOGIN = JSON.parse(LOGIN)
        let formData = new FormData();
        formData.append('USERNAME', LOGIN.username)
        formData.append('PASSWORD', PWD_TXT)
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        const props = this.props.reducer
        console.log('userInfo', props.userInfo)
        this.LoadProvince()
        this.props.saveProductType(typeof props.userInfo === 'undefined' ? [] : props.userInfo.product)
        this.setState({
            phoneNumber: props.userInfo.phone,
            lineid: props.userInfo.lineid,
            email: props.userInfo.email,
            type_id : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_id,
            type_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_name,
            category_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.category_name,
            //product : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product,
            privacyAgree : props.userInfo.privacyAgree == 'Y' ? true : false,

            address: props.userInfo.address != 'null' ? props.userInfo.address : '-',
            Soi: props.userInfo.soi != 'null' ? props.userInfo.soi : '-',
            Road: props.userInfo.road != 'null' ? props.userInfo.road : '-',
            LoadFrist : true,
        })
        //this.LoadAgreement(props.userInfo.partners_type)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                    agreement_url : results.data['agreement'],
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
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 70 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View /* style={[styles.panelWhite]}*/>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลส่วนตัว`}</Text>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อ : ' + props.userInfo.name}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'นามสกุล : ' + props.userInfo.lastname}</Text>
                            </View>

                            

                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'เลขประจำตัวประชาชน : ' + props.userInfo.citizenid}</Text>
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.phone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        keyboardType='phone-pad'
                                        maxLength={10} 
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
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
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
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    {/* <Text style={[styles.text16, {color: primaryColor}]}>{'อีเมล : ' + props.userInfo.email}</Text> */}
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'อีเมล : '}</Text>
                                    <TextInput
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        ref={(input) => { this.email = input; }}
                                        value={this.state.email}
                                        onBlur={() => { 
                                            let e = this.state.email
                                            if (!EmailValidator.validate(e)) {
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

                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor}]}>{'ที่อยู่ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.address = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.address}
                                        onChangeText={(text) => this.setState({ address: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'ซอย : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.Soi = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.Soi}
                                        onChangeText={(text) => this.setState({ Soi: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor}]}>{'ถนน : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.Road = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.Road}
                                        onChangeText={(text) => this.setState({ Road: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '85%', paddingRight: 15 }]}>
                                    <Picker
                                        selectedValue={this.state.ProvinceSelected}
                                        style={[{ width: DEVICE_WIDTH - 100, color: primaryColor }]}
                                        onValueChange={(itemValue, itemIndex) => this.LoadDistrict(itemValue)} >
                                        <Picker.Item label='กรุณาเลือกจังหวัด' value={null} />
                                        {
                                            this.state.ProvinceData.map((v, i) => {
                                                return (
                                                    <Picker.Item key={v.value ?? i} label={v.label} value={v.value} />
                                                )
                                            })
                                        }
                                    </Picker>
                                    {
                                        Platform.OS === 'ios' ?
                                            <Icon name={'chevron-down'} size={12} color={'gray'} />
                                            :
                                            null
                                    }
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '85%', paddingRight: 15 }]}>
                                    <Picker
                                        selectedValue={this.state.DistrictSelected}
                                        style={[{ width: DEVICE_WIDTH - 100, color: primaryColor }]}
                                        onValueChange={(itemValue, itemIndex) => this.LoadSubDistrict(itemValue)} >
                                        <Picker.Item label='กรุณาเลือกอำเภอ' value={null} />
                                        {
                                            this.state.DistrictData.map((v, i) => {
                                                return (
                                                    <Picker.Item key={v.value ?? i} label={v.label} value={v.value} />
                                                )
                                            })
                                        }
                                    </Picker>
                                    {
                                        Platform.OS === 'ios' ?
                                            <Icon name={'chevron-down'} size={12} color={'gray'} />
                                            :
                                            null
                                    }
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '85%', paddingRight: 15 }]}>
                                    <Picker
                                        selectedValue={this.state.SubDistrictSelected}
                                        style={[{ width: DEVICE_WIDTH - 100, color: primaryColor }]}
                                        onValueChange={(itemValue, itemIndex) => {
                                            let data = this.state.SubDistrictData.filter((i) => i.value == itemValue)
                                            // console.log(data)
                                            // console.log(data[0].zipcode)
                                            this.setState({
                                                SubDistrictSelected: itemValue,
                                                Zipcode: typeof data[0] === 'undefined' ? '' : data[0].zipcode
                                            })
                                        }}>
                                        <Picker.Item label='กรุณาเลือกตำบล' value={null} />
                                        {
                                            this.state.SubDistrictData.map((v, i) => {
                                                return (
                                                    <Picker.Item key={v.value ?? i} label={v.label} value={v.value} />
                                                )
                                            })
                                        }
                                    </Picker>
                                    {
                                        Platform.OS === 'ios' ?
                                            <Icon name={'chevron-down'} size={12} color={'gray'} />
                                            :
                                            null
                                    }
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                  
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'รหัสไปรษณีย์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.Zipcode = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        editable={false}
                                        value={this.state.Zipcode}
                                        onChangeText={(text) => this.setState({ Zipcode: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
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

                            <TouchableOpacity
                                style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('Categoryscreen', {
                                            typeId: this.state.type_id,
                                            RegisType : 'ProfilePersonal'
                                        })
                                    }
                                }>
                                <View style={[styles.containerRow]}>
                                    <Text style={[styles.text16, {color: 'white',flex:0.9}]}>{this.state.type_name}</Text>
                                    <View style={{alignItems:'center',flex:0.1}}>
                                        <Icon  name='chevron-right' size={20} color='white' />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                            {
                                props.product_type.map((v, i) => {
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
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('ConditionProfile',{
                                    Type : this.props.reducer.userInfo.partners_type,
                                    Field : 'agreement_only'
                                })
                            }}>
                                <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text>
                            </TouchableOpacity>
                            {/* <OpenURLButton url={this.state.privacy_url} fontSize={14}>{'ข้อตกลงและเงื่อนไขในการจองตลาด'}</OpenURLButton> */}
                            {/* <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text> */}
                            <View style={[styles.containerRow, { /*justifyContent: 'space-around', */alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    disabled={true}
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.privacyAgree}
                                    onPress={() => this.setState({ privacyAgree: !this.state.privacyAgree })} />
                                    <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate('ConditionProfile',{
                                            Type : this.props.reducer.userInfo.partners_type,
                                            Field : 'policy_only'
                                        })
                                    }}>
                                        <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ให้การยินยอมในการเปิดเผยข้อมูล`}</Text>
                                    </TouchableOpacity>
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
                                            if(this.state.phoneNumber.length < 9){
                                                Alert.alert('เบอร์โทรศัพท์ไม่ถูกต้อง!')
                                            }else if(!EmailValidator.validate(this.state.email)){
                                                Alert.alert( 'Email ไม่ถูกต้อง!');
                                            }else{
                                                Alert.alert(
                                                    "ยืนยัน",
                                                    'ยืนยันการแก้ไขข้อมูล?',
                                                    [
                                                        {
                                                            text: "ยกเลิก",
                                                            onPress: () => console.log("Cancel Pressed"),
                                                            style: "cancel"
                                                        },
                                                        { text: "ตกลง", 
                                                            onPress: () => this.onUpdateProfile() 
                                                        }
                                                    ],
                                                    { cancelable: false }
                                                );
                                            }
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
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePersonalScreen)
