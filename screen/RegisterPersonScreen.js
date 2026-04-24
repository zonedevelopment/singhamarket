import React from 'react'
import {
    View,
    Alert,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { Picker } from 'native-base'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    REGISTER_PERSONAL_URL,
    HEADERFORMDATA,
    CHECK_REGISTER_URL,
    PRODUCT_TYPE_URL,
    PROVINCE_URL,
    DISTRICT_URL,
    SUBDISTRICT_URL,
} from '../utils/contants'
import * as EmailValidator from 'email-validator';


import {
    openIndicator,
    dismissIndicator,
    saveProductType
} from '../actions'
import Hepler from '../utils/Helper'
import { validateFormSecurity } from '../utils/inputSecurity'
import { PASSWORD_POLICY_HINT, validatePasswordPolicy } from '../utils/passwordPolicy'

import styles from '../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
const DEVICE_WIDTH = Dimensions.get('screen').width
const VALIDATION_FIELD = {
    name : {
        message : 'กรุณากรอกชื่อ',
        type : 'text'
    },
    lastname : {
        message : 'กรุณากรอกนามสกุล',
        type : 'text'
    },
    idcard : {
        message : 'กรุณากรอกเลขบัตรประชาชน',
        type : 'text'
    },
    phone : {
        message : 'กรุณากรอกเบอร์โทรศัพท์',
        type : 'text'
    },
    email : {
        message : 'กรุณากรอก Email',
        type : 'text'
    },
    username : {
        message : 'กรุณากรอกชื่อผู้ใช้งาน',
        type : 'text'
    },
    password : {
        message : 'กรุณากรอกรหัสผ่าน',
        type : 'text'
    },
    productCate : {
        message : 'กรุณาเลือกประเภทสินค้า',
        type : 'radio'
    }
}

class RegisterPersonScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        productCate: 0,
        licenseAgree: false,
        privacyAgree: false,
        name : 'Teerayut',
        lastname : 'Test',
        idcard : '1101700203450',
        phone : '0812345678',
        lineid : 'teerayut.k',
        email : 'teerayut.k@test.com',
        username : 'teerayut.k',
        password : 'Zi@170430',
        apptype: '',
        ProductType : [],
        validate_username : false,
        validate_idcard : false,


        ProvinceData: [],
        DistrictData: [],
        SubDistrictData: [],
        compAddr: '99/9',
        compSoi: 'Soi Test',
        compRoad: 'Test Road',
        ProvinceSelected: null,
        DistrictSelected: null,
        SubDistrictSelected: null,
        Zipcode: '',

    }



    
    LoadProvince() {
        this.props.openIndicator()
        Hepler.post(BASE_URL + PROVINCE_URL, null, HEADERFORMDATA, (results) => {
            console.log('PROVINCE_URL', results)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    ProvinceData: results.data,
                    ProvinceSelected: null,
                    DistrictData: [],
                    DistrictSelected: null,
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            } else {
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
        this.setState({ ProvinceSelected: province_id })
        formData.append('province_id', province_id)
        Hepler.post(BASE_URL + DISTRICT_URL, formData, HEADERFORMDATA, (results) => {
            console.log('DISTRICT_URL', results)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    DistrictData: results.data,
                    DistrictSelected: null,
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            } else {
                Alert.alert(results.message)
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
        this.setState({ DistrictSelected: district_id })
        formData.append('district_id', district_id)
        Hepler.post(BASE_URL + SUBDISTRICT_URL, formData, HEADERFORMDATA, (results) => {
            console.log('SUBDISTRICT_URL', results)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    SubDistrictData: results.data,
                    SubDistrictSelected: null,
                })
            } else {
                Alert.alert(results.message)
                this.setState({
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
            }
        })
    }


    async onSelectProductCategory(index, value) {
        await this.props.saveProductType([])
        this.setState({ productCate: value })
    }

    onCheckLicense(value) {
        this.setState({ licenseAgree: value })
    }

    onCheckPrivacy(value) {
        this.setState({ privacyAgree: value })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`สมัครสมาชิก`}</Text>
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
        this.LoadProvince()
        const { apptype,licenseAgree,privacyAgree } = this.props.route.params //รับค่า UAT เพื่อซ่อนช่องเลขบัตรประชาชน เพราะไม่ผ่าน ios
        this.setState({ 
            apptype: apptype,
            licenseAgree: licenseAgree,
            privacyAgree: privacyAgree,
         })
        this.LoadProductType()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    LoadProductType = () => {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type', 1)
        Hepler.post(BASE_URL + PRODUCT_TYPE_URL,formData,HEADERFORMDATA,(results) => {
            if (results.status == 'SUCCESS') {
                this.setState({
                    ProductType : results.data
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    ProductType : []
                })
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }
  
    validateFields() {
        const fields = this.state;
        const names = Object.keys(fields);

        for (const name of names) {
            const validate = VALIDATION_FIELD[name] || {};
            if(validate != {}){
                if (this.state.apptype == 'UAT' && name == 'idcard') {
                    /// ไม่ให้ตรวจสอบเลขบัตรประชาชน เพราะไม่ผ่าน ios
                } else {
                    if(validate.type === 'text'){
                        if(fields[name] === ''){
                            return Alert.alert(validate.message)
                        }
                    }
                }
                
                if(validate.type === 'radio'){
                    if(fields[name] == 0){
                        return Alert.alert(validate.message)
                    }
                }
            }
        }

        if (this.state.apptype != 'UAT') {
            const normalizedIdCard = String(fields.idcard || '').replace(/[^0-9]/g, '')

            if (normalizedIdCard.length != 13 || this.chkDigitPid(normalizedIdCard) == false) {
                this.setState({ validate_idcard : false })
                return Alert.alert('เลขบัตรประชาชนไม่ถูกต้อง!')
            }

            if (this.state.validate_idcard == false || this.state.idcard !== normalizedIdCard) {
                this.setState({
                    idcard : normalizedIdCard,
                    validate_idcard : true,
                })
            }
        }

        if(this.state.validate_username == false){
            this.setState({username : ''})
            return Alert.alert('UserName นี้มีผู้อื่นใช้ไปแล้ว!')
        }

        const securityError = validateFormSecurity([
            { label: 'ชื่อ', value: fields.name, checkSql: false },
            { label: 'นามสกุล', value: fields.lastname, checkSql: false },
            { label: 'เบอร์โทรศัพท์', value: fields.phone, checkSql: true },
            { label: 'Line ID', value: fields.lineid, checkSql: false },
            { label: 'Email', value: fields.email, checkSql: true },
            { label: 'ชื่อผู้ใช้งาน', value: fields.username, checkSql: true },
            { label: 'รหัสผ่าน', value: fields.password, checkSql: false },
            { label: 'ที่อยู่', value: fields.compAddr, checkSql: false },
            { label: 'ซอย', value: fields.compSoi, checkSql: false },
            { label: 'ถนน', value: fields.compRoad, checkSql: false },
        ])

        if (securityError) {
            return Alert.alert(securityError)
        }

        const passwordPolicyError = validatePasswordPolicy({
            password: fields.password,
            username: fields.username,
            idcard: fields.idcard,
        })

        if (passwordPolicyError) {
            return Alert.alert(passwordPolicyError)
        }

        if (fields.phone.length != 10){
            return Alert.alert('จำนวนเบอร์โทรศัพท์ไม่ถูกต้อง!')
        }


        if (!EmailValidator.validate(fields.email)){
            return Alert.alert('Email ไม่ถูกต้อง!')
        }
      
        if(this.props.reducer.product_type.length == 0) {
            return Alert.alert('กรุณาเลือกสินค้าที่ต้องการขาย')//alert('กรุณาเลือกสินค้าที่ต้องการขาย')
        }


        Alert.alert(
            "ยืนยัน",
            'ยืนยันสมัครสมาชิก?',
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "ตกลง", 
                    onPress: () => this.onSubmit() 
                }
            ],
            { cancelable: false }
        );

        //// call api
    }

    onSubmit = () =>{
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('lastname', this.state.lastname)
        formData.append('idcard', this.state.idcard)
        formData.append('phone', this.state.phone)
        formData.append('lineid', this.state.lineid)
        formData.append('email', this.state.email)
        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        formData.append('productCate', this.state.productCate)
        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))
        formData.append('licenseAgree', this.state.licenseAgree === true ? 'Y' : 'N')
        formData.append('privacyAgree', this.state.privacyAgree === true ? 'Y' : 'N')

        formData.append('compAddr', this.state.compAddr)
        formData.append('compSoi', this.state.compSoi)
        formData.append('compRoad', this.state.compRoad)
        formData.append('province_id', this.state.ProvinceSelected)
        formData.append('district_id', this.state.DistrictSelected)
        formData.append('subdistrict_id', this.state.SubDistrictSelected)
        formData.append('zipcode', this.state.Zipcode)

        console.log('formData', formData)

        Hepler.post(BASE_URL + REGISTER_PERSONAL_URL,formData,HEADERFORMDATA,(results) => {
            console.log('REGISTER_PERSONAL_URL', results)
            if (results.status == 'SUCCESS') {
                Alert.alert(
                    'บันทึกสำเร็จ!',
                    'สมัครสมาชิกเรียบร้อย อยู่ระหว่างรอการอนุมัติค่ะ',
                    [
                        { text: 'ตกลง', onPress: () => {
                            // this.props.navigation.reset({
                            //     index: 0,
                            //     routes: [{name: 'Login'}],
                            // });
                            this.props.navigation.navigate('Login')
                        } }
                    ],
                    { cancelable: false }
                );
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    getThaiIdCardLastDigit = (idcard) => {
        const sanitizedIdCard = String(idcard || '').replace(/[^0-9]/g, '')

        if (sanitizedIdCard.length < 12) {
            return null
        }

        let total = 0

        for (let index = 0; index < 12; index++) {
            total += parseInt(sanitizedIdCard.charAt(index), 10) * (13 - index)
        }

        const remainder = total % 11
        const rawCheckDigit = 11 - remainder
        let calculatedDigit = rawCheckDigit

        if (rawCheckDigit === 10) {
            calculatedDigit = 0
        } else if (rawCheckDigit === 11) {
            calculatedDigit = 1
        }

        return calculatedDigit
    }

    chkDigitPid = (idcard) => {
        const sanitizedIdCard = String(idcard || '').replace(/[^0-9]/g, '')

        if (sanitizedIdCard.length !== 13) {
            return false
        }

        const lastDigit = parseInt(sanitizedIdCard.charAt(12), 10)
        const calculatedLastDigit = this.getThaiIdCardLastDigit(sanitizedIdCard)

        return calculatedLastDigit !== null && calculatedLastDigit === lastDigit
    }

    CheckIDCard = () => {
        let idcard = String(this.state.idcard || '').replace(/[^0-9]/g, '')
        if(idcard.length != 13 || this.chkDigitPid(idcard) == false){
            Alert.alert('เลขบัตรประชาชนไม่ถูกต้อง!')
            this.setState({
                validate_idcard : false,
            })
        }else{
            this.setState({
                idcard : idcard,
                validate_idcard : true,
            })
        }
    }

    CheckUserName = () => {
        let username = this.state.username

        const securityError = validateFormSecurity([
            { label: 'ชื่อผู้ใช้งาน', value: username, checkSql: true },
        ])

        if (securityError) {
            this.setState({username : '', validate_username : false})
            return Alert.alert(securityError)
        }

        this.props.openIndicator()
        let formData = new FormData();
        formData.append('TYPE', 'USERNAME')
        formData.append('VALUE', username.trim())
        Hepler.post(BASE_URL + CHECK_REGISTER_URL,formData,HEADERFORMDATA,(results) => {
            console.log('CHECK_REGISTER_URL', results) 
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({validate_username : true})
                //Alert.alert(results.message)
                this.password.focus()
            } else {
                Alert.alert(results.message)
                this.setState({username : '',validate_username : false})
            }
        })
    }



    render() {

        const props = this.props.reducer
        const productSelected = props.product_type

        return (
            <View style={[styles.container, { backgroundColor: primaryColor, paddingBottom: 40 }]}>
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <ScrollView
                        style={[styles.panelWhite, styles.registerPanelShadow]}
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps='handled'>
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`สมัครสมาชิก`}</Text>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ลงทะเบียนแบบบุคคลธรรมดา`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อ'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    onSubmitEditing={() => this.lastname.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.lastname = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='นามสกุล'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ lastname: text })}
                                    onSubmitEditing={() => this.idcard.focus()} />
                            </View>
                            {
                                this.state.apptype == 'UAT' ?
                                    null
                                    :
                                    <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                        <TextInput
                                            ref={(input) => { this.idcard = input; }}
                                            style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                            placeholder='เลขบัตรประชาชน'
                                            maxLength={13} 
                                            keyboardType='numeric'
                                            returnKeyType={'next'}
                                            //blurOnSubmit={true}
                                            value={this.state.idcard}
                                            placeholderTextColor={'#7C7B7B'}
                                            onBlur={(e) => this.CheckIDCard()}
                                            onChangeText={(text) => this.setState({ idcard: text.replace(/[^0-9]/g, ''), validate_idcard : false })}
                                            onSubmitEditing={() => this.phone.focus()} 
                                            />
                                    </View>
                            }
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.phone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    maxLength={10} 
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    keyboardType='phone-pad'
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    value={this.state.phone}
                                    onChangeText={(text) => {
                                        this.setState({ phone: text.replace(/[^0-9\-]+/g, '') });
                                    }}
                                    onSubmitEditing={() => this.lineid.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.lineid = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='Line ID'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ lineid: text })}
                                    onSubmitEditing={() => this.email.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='อีเมล'
                                    keyboardType={'email-address'}
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    // onBlur={() => { 
                                    //     let e = this.state.email
                                    //     if (!EmailValidator.validate(e)) {
                                    //         Alert.alert('คำเตือน!','Email ไม่ถูกต้อง!',
                                    //             [
                                    //                 { text: 'ตกลง', onPress: () => {
                                    //                     this.setState({ email : '' })
                                    //                     this.email.focus()
                                    //                 } }
                                    //             ],
                                    //             { cancelable: false }
                                    //         );
                                    //     }else{
                                    //         this.username.focus()
                                    //     } 
                                    // }}
                                    value={this.state.email}
                                    onChangeText={(text) => { this.setState({ email: text}) }}
                                    onSubmitEditing={() => this.username.focus()} 
                                    />
                            </View>



                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ชื่อผู้ใช้งานและรหัสผ่าน`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.username = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='Username'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    //keyboardType={'email-address'}
                                    blurOnSubmit={false}
                                    value={this.state.username}
                                    placeholderTextColor={'#7C7B7B'}
                                    onBlur={(e) => this.CheckUserName()}
                                    onChangeText={(text) => {
                                        if(/^[a-zA-Z0-9_.\-@]+$/.test(text) || text == ''){
                                            this.setState({ username: text })
                                        }
                                    }}
                                    onSubmitEditing={() => this.CheckUserName()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.password = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='Password'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                            <Text style={[styles.text12, styles.regular, { width: '95%', alignSelf: 'center', color: '#7C7B7B', paddingHorizontal: 15 }]}>
                                {PASSWORD_POLICY_HINT}
                            </Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`กรุณาประเภทสินค้าที่จะนำมาขาย`}</Text>
                            </View>
                            

                            {
                                this.state.ProductType.length > 0 ? 
                                    <RadioGroup
                                        size={20}
                                        thickness={2}
                                        color={primaryColor}
                                        style={{ flexDirection: 'row',/* justifyContent: 'space-around',*/ flexWrap: 'wrap' }}
                                        highlightColor='transparent'
                                        onSelect={(index, value) => this.onSelectProductCategory(index, value)}>
                                        {
                                            this.state.ProductType.map((v,i) => {
                                                return (
                                                    <RadioButton
                                                        key={v.TypeID || `product-type-${i}`}
                                                        value={v.TypeID}
                                                        color={primaryColor}
                                                        style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                                        <Text style={[styles.text16, { color: primaryColor }]}>{v.TypeName}</Text>
                                                    </RadioButton>
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                :
                                     <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
                                        <Text style={[styles.text16, { color: primaryColor }]}>{`ไม่พบข้อมูลประเภทสินค้า!`}</Text>
                                    </View>
                            }
                            
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`เลือกหมวดหมู่สินค้าที่ต้องการขาย`}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}
                                onPress={
                                    () => {
                                        if (this.state.productCate > 0) {
                                            this.props.navigation.navigate('Categoryscreen', {
                                                typeId: this.state.productCate,
                                                RegisType : 'Personal'
                                            })
                                        }
                                    }
                                }>
                                <Text style={{ color: 'white' }}>{`เลือกหมวดหมู่สินค้าที่ต้องการขาย`}</Text>
                                <Icon name='chevron-right' size={12} color='white' />
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                            {
                                productSelected.length > 0 ?
                                    productSelected.map((v, i) => {
                                        return (
                                            <View key={i} style={{ paddingLeft: 40 }}>
                                                <Text style={[styles.text14]}>{`${(i + 1)}. ${v.product_name}`}</Text>
                                            </View>
                                        )
                                    })
                                    :
                                    <View style={{ paddingLeft: 40 }}>
                                        <Text style={[styles.text14]}>{`-`}</Text>
                                    </View>
                            }
                            <View style={[styles.marginBetweenVertical]}></View>

                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ที่อยู่`}</Text>
                            </View>

                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compAddr = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ที่อยู่'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ compAddr: text })}
                                    onSubmitEditing={() => this.compSoi.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compSoi = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ซอย'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ compSoi: text })}
                                    onSubmitEditing={() => this.compRoad.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compRoad = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ถนน'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ compRoad: text })}
                                    onSubmitEditing={() => {/*this.branch_name.focus()*/ }} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '95%', paddingRight: 15 }]}>
                                <Picker
                                    placeholder='กรุณาเลือกจังหวัด'
                                    placeholderIconColor={'black'}
                                    placeholderStyle={[styles.regular, styles.text18, { color: '#7C7B7B' }]}
                                    selectedValue={this.state.ProvinceSelected}
                                    style={[styles.regular, { flex: 1, height: '100%', color: primaryColor }]}
                                    textStyle={[styles.regular, { color: primaryColor }]}
                                    pickerStyle={[styles.regular, { color: primaryColor }]}
                                    onValueChange={(itemValue, itemIndex) => this.LoadDistrict(itemValue)} >
                                    {
                                        this.state.ProvinceData.map((v, i) => {
                                            return (
                                                <Picker.Item key={v.value || v.label || `province-${i}`} label={v.label} value={v.value} />
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
                            <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '95%', paddingRight: 15 }]}>
                                <Picker
                                    placeholder='กรุณาเลือกอำเภอ'
                                    placeholderIconColor={'black'}
                                    placeholderStyle={[styles.regular, styles.text18, { color: '#7C7B7B' }]}
                                    selectedValue={this.state.DistrictSelected}
                                    style={[styles.regular, { flex: 1, height: '100%', color: primaryColor }]}
                                    textStyle={[styles.regular, { color: primaryColor }]}
                                    onValueChange={(itemValue, itemIndex) => this.LoadSubDistrict(itemValue)} >
                                    {
                                        this.state.DistrictData.map((v, i) => {
                                            return (
                                                <Picker.Item key={v.value || v.label || `district-${i}`} label={v.label} value={v.value} />
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
                            <View style={[styles.registerFieldShadow, styles.pickerStyle, { alignSelf: 'center', width: '95%', paddingRight: 15 }]}>
                                <Picker
                                    placeholder='กรุณาเลือกตำบล'
                                    placeholderIconColor={'black'}
                                    placeholderStyle={[styles.regular, styles.text18, { color: '#7C7B7B' }]}
                                    selectedValue={this.state.SubDistrictSelected}
                                    style={[styles.regular, { flex: 1, height: '100%', color: primaryColor }]}
                                    textStyle={[styles.regular, { color: primaryColor }]}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let data = this.state.SubDistrictData.filter((i) => i.value == itemValue) 
                                        this.setState({
                                            SubDistrictSelected: itemValue,
                                            Zipcode: typeof data[0] === 'undefined' ? '' : data[0].zipcode
                                        })
                                    }}>
                                    {
                                        this.state.SubDistrictData.map((v, i) => {
                                            return (
                                                <Picker.Item key={v.value || v.label || `subdistrict-${i}`} label={v.label} value={v.value} />
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
                          
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.zipcode = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='รหัสไปรษณีย์'
                                    editable={false}
                                    returnKeyType={'next'}
                                    value={this.state.Zipcode}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ zipcode: text })}
                                    onSubmitEditing={() => this.branch_code.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.licenseAgree}
                                    onPress={() => this.onCheckLicense(!this.state.licenseAgree)} />
                                <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ยอมรับข้อตกลงและเงื่อนไขในการจองตลาด `}</Text>
                            </View>
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.privacyAgree}
                                    onPress={() => this.onCheckPrivacy(!this.state.privacyAgree)} />
                                <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ให้การยินยอมในการเปิดเผยข้อมูล `}</Text>
                            </View>
                            <TouchableOpacity 
                            disabled={this.state.licenseAgree/* && this.state.privacyAgree*/ ? false : true} 
                            style={[this.state.licenseAgree/* && this.state.privacyAgree*/ ? styles.mainButton : styles.mainButtonDisabled , styles.center]}
                                onPress={
                                    () => {
                                        this.validateFields()
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยัน`}</Text>
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text14, { alignSelf: 'center' }]}>{`ถ้าท่านเป็นสมาชิกอยู่ กรุณาเข้าสู่ระบบได้เลยค่ะ`}</Text>
                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}
                            onPress={()=>{
                                this.props.navigation.navigate('Login')
                            }}>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`เข้าสู่ระบบ`}</Text>
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
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPersonScreen)
