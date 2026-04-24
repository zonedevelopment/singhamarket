import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions,
    Alert,
    Platform,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { Picker } from 'native-base'
import { CheckBox } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ImagePicker from 'react-native-image-picker'
import Lightbox from 'react-native-lightbox'
import DropDownPicker from 'react-native-dropdown-picker';
import * as EmailValidator from 'email-validator';
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    REGISTER_COMPANY_URL,
    HEADERFORMDATA,
    CHECK_REGISTER_URL,
    PROVINCE_URL,
    DISTRICT_URL,
    SUBDISTRICT_URL,
    PRODUCT_TYPE_URL,
} from '../utils/contants'
import styles from '../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveProductType
} from '../actions'
import Hepler from '../utils/Helper'
import { validateFormSecurity } from '../utils/inputSecurity'
import { PASSWORD_POLICY_HINT, validatePasswordPolicy } from '../utils/passwordPolicy'
import { value } from 'numeral'
import { color } from 'react-native-reanimated'

const VALIDATION_FIELD = {
    compname: {
        message: 'กรุณากรอกชื่อนิติบุคคล',
        type: 'text'
    },
    compid: {
        message: 'กรุณากรอกเลขประจำตัวผู็เสียภาษีอากร',
        type: 'text'
    },
    compAddr: {
        message: 'กรุณากรอกที่อยู่',
        type: 'text'
    },
    name: {
        message: 'กรุณากรอกชื่อ-นามสกุล',
        type: 'text'
    },
    phone: {
        message: 'กรุณากรอกเบอร์โทรศัพท์',
        type: 'text'
    },
    email: {
        message: 'กรุณากรอก Email',
        type: 'text'
    },
    username: {
        message: 'กรุณากรอกชื่อผู้ใช้งาน',
        type: 'text'
    },
    password: {
        message: 'กรุณากรอกรหัสผ่าน',
        type: 'text'
    },
    productCate: {
        message: 'กรุณาเลือกประเภทสินค้า',
        type: 'radio'
    },

    FileSource: {
        message: 'กรุณาแนบไฟล์ ภ.พ 20',
        type: 'text'
    },

    accountName: {
        message: 'กรุณากรอกชื่อ-นามสกุล เจ้าหน้าที่บัญชี',
        type: 'text'
    },
    accountPhone: {
        message: 'กรุณากรอกเบอร์โทรศัพท์เจ้าหน้าที่บัญชี',
        type: 'text'
    },
}

const DEVICE_HEIGHT = Dimensions.get('screen').height
const DEVICE_WIDTH = Dimensions.get('screen').width
class RegisterCompanyScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        productCate: 0,
        licenseAgree: false,
        FileSource: '',
        FileSourceBase64: '',
        compname: '',
        compid: '',

        branch_code: '',
        branch_name: '',
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',

        accountName: '',
        accountPhone: '',


        ProvinceData: [],
        DistrictData: [],
        SubDistrictData: [],
        compAddr: '',
        compSoi: '',
        compRoad: '',
        ProvinceSelected: null,
        DistrictSelected: null,
        SubDistrictSelected: null,
        Zipcode: '',
        ProductType: [],

        validate_username : false,
        validate_compid : false,
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

    onSelectProductCategory(index, value) {
        this.props.saveProductType([])
        this.setState({ productCate: value })
    }

    onCheckLicense(value) {
        this.setState({ licenseAgree: value })
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
        this.LoadProductType()
        const { apptype, licenseAgree } = this.props.route.params //รับค่า UAT เพื่อซ่อนช่องเลขบัตรประชาชน เพราะไม่ผ่าน ios

        this.setState({
            apptype: apptype,
            licenseAgree: licenseAgree,
        })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadProductType = () => {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type', 2)
        Hepler.post(BASE_URL + PRODUCT_TYPE_URL, formData, HEADERFORMDATA, (results) => {
            if (results.status == 'SUCCESS') {
                this.setState({
                    ProductType: results.data
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    ProductType: []
                })
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    SelectFiles() {
        const options = {
            mediaType : 'photo',
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
                this.setState({
                    FileSource: response.uri,
                    FileSourceBase64: response.data
                });
            }
        });
    }


    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateFields() {
        const fields = this.state;
        const names = Object.keys(fields);
        for (const name of names) {
            const validate = VALIDATION_FIELD[name] || {};
            if (validate != {}) {
                if (this.state.apptype == 'UAT' && name == 'compid') {
                    /// ไม่ให้ตรวจสอบเลขบัตรประชาชน เพราะไม่ผ่าน ios
                } else {
                    if (validate.type === 'text') {
                        if (fields[name] === '') {
                            return Alert.alert(validate.message)
                        }
                    }
                }
                if (validate.type === 'radio') {
                    if (fields[name] == 0) {
                        return Alert.alert(validate.message)
                    }
                }
            }
        }

        if(this.state.validate_compid == false){
            this.setState({compid : ''})
            return Alert.alert('เลขประจำตัวผู้เสียภาษีอากรไม่ถูกต้อง!')
        }

        if(this.state.validate_username == false){
            this.setState({username : ''})
            return Alert.alert('UserName นี้มีผู้อื่นใช้ไปแล้ว!')
        }

        const securityError = validateFormSecurity([
            { label: 'ชื่อนิติบุคคล', value: fields.compname, checkSql: false },
            { label: 'ที่อยู่', value: fields.compAddr, checkSql: false },
            { label: 'ซอย', value: fields.compSoi, checkSql: false },
            { label: 'ถนน', value: fields.compRoad, checkSql: false },
            { label: 'รหัสสาขา', value: fields.branch_code, checkSql: true },
            { label: 'ชื่อสาขา', value: fields.branch_name, checkSql: false },
            { label: 'ชื่อผู้ติดต่อ', value: fields.name, checkSql: false },
            { label: 'เบอร์โทรศัพท์ผู้ติดต่อ', value: fields.phone, checkSql: true },
            { label: 'Email', value: fields.email, checkSql: true },
            { label: 'ชื่อเจ้าหน้าที่บัญชี', value: fields.accountName, checkSql: false },
            { label: 'เบอร์โทรศัพท์เจ้าหน้าที่บัญชี', value: fields.accountPhone, checkSql: true },
            { label: 'ชื่อผู้ใช้งาน', value: fields.username, checkSql: true },
            { label: 'รหัสผ่าน', value: fields.password, checkSql: false },
        ])

        if (securityError) {
            return Alert.alert(securityError)
        }

        const passwordPolicyError = validatePasswordPolicy({
            password: fields.password,
            username: fields.username,
            compid: fields.compid,
        })

        if (passwordPolicyError) {
            return Alert.alert(passwordPolicyError)
        }

        

        if (fields.phone.length < 9 || fields.phone.length > 10) {
            return Alert.alert('จำนวนเบอร์โทรศัพท์ผู้มาติดต่อไม่ถูกต้อง!')
        }

        if (fields.accountPhone.length < 9 || fields.accountPhone.length > 10) {
            return Alert.alert('จำนวนเบอร์โทรศัพท์เจ้าหน้าที่บัญชีไม่ถูกต้อง!')
        }


        if (!EmailValidator.validate(fields.email)) {
            return Alert.alert('Email ข้อมูลผู้มาติดต่อไม่ถูกต้อง!')
        }


        if (this.props.reducer.product_type.length == 0) {
            return Alert.alert('กรุณาเลือกสินค้าที่ต้องการขาย')//alert('กรุณาเลือกสินค้าที่ต้องการขาย')
        }

        if (this.state.ProvinceSelected == null || this.state.DistrictSelected == null || this.state.SubDistrictSelected == null) {
            return Alert.alert('กรุณาเลือกจังหวัด อำเภอ ตำบล!')
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
                {
                    text: "ตกลง",
                    onPress: () => this.onSubmit()
                }
            ],
            { cancelable: false }
        );

        /// insert api
    }

    onSubmit = () => {
        this.props.openIndicator()
        let formData = new FormData();
        /// ข้อมูลนิติบุคคล
        formData.append('compname', this.state.compname)
        formData.append('compid', this.state.compid)
        formData.append('compAddr', this.state.compAddr)
        formData.append('branch_code', this.state.branch_code)
        formData.append('branch_name', this.state.branch_name)

        formData.append('compSoi', this.state.compSoi)
        formData.append('compRoad', this.state.compRoad)
        formData.append('province_id', this.state.ProvinceSelected)
        formData.append('district_id', this.state.DistrictSelected)
        formData.append('subdistrict_id', this.state.SubDistrictSelected)
        formData.append('zipcode', this.state.Zipcode)

        ///ข้อมูลผู้มาติดต่อ
        formData.append('name', this.state.name)
        formData.append('phone', this.state.phone)
        formData.append('email', this.state.email)
        ///ข้อมูลออกใบเสร็จรับเงิน
        formData.append('FileSourceBase64', this.state.FileSourceBase64)
        ///ข้อมูลเจ้าหน้าที่บัญชี
        formData.append('accountName', this.state.accountName)
        formData.append('accountPhone', this.state.accountPhone)
        /// ผู้ใช้งาน
        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        ///ประเภทสินค้า
        formData.append('productCate', this.state.productCate)
        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))

        formData.append('licenseAgree', this.state.licenseAgree === true ? 'Y' : 'N')
        //formData.append('privacyAgree', this.state.privacyAgree)
        Hepler.post(BASE_URL + REGISTER_COMPANY_URL, formData, HEADERFORMDATA, (results) => {
            console.log('REGISTER_COMPANY_URL',results)
            if (results.status == 'SUCCESS') {
                Alert.alert(
                    'บันทึกสำเร็จ!',
                    'สมัครสมาชิกเรียบร้อย อยู่ระหว่างรอการอนุมัติค่ะ',
                    [
                        { text: 'ตกลง', onPress: () => this.props.navigation.navigate('Login') }
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



    CheckUserName = () => {
        let username = this.state.username

        const securityError = validateFormSecurity([
            { label: 'ชื่อผู้ใช้งาน', value: username, checkSql: true },
        ])

        if (securityError) {
            this.setState({ username: '', validate_username:false })
            return Alert.alert(securityError)
        }

        this.props.openIndicator()
        let formData = new FormData();
        formData.append('TYPE', 'USERNAME')
        formData.append('VALUE', username.trim())
        Hepler.post(BASE_URL + CHECK_REGISTER_URL, formData, HEADERFORMDATA, (results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                //Alert.alert(results.message)
                this.setState({validate_username:true})
            } else {
                Alert.alert(results.message)
                this.setState({ username: '',validate_username:false })
            }
        })
    }

    
    CheckIDCard = () => {
        let compid = this.state.compid
        this.props.openIndicator()
        if(compid.trim().length == 0){
            Alert.alert('กรุณากรอกเลขประจำตัวผู้เสียภาษีอากร!')
            this.setState({
                compid : '',
                validate_compid : false,
            })
            this.props.dismissIndicator()
        }else{
            let formData = new FormData();
            formData.append('TYPE', 'TAXID')
            formData.append('VALUE', compid.trim())
            Hepler.post(BASE_URL + CHECK_REGISTER_URL,formData,HEADERFORMDATA,(results) => {
                this.props.dismissIndicator()
                if (results.status == 'SUCCESS') {
                    this.setState({
                        validate_compid : true,
                    })
                } else {
                    Alert.alert(results.message)
                    this.setState({
                        compid : '',
                        validate_compid : false,
                    })
                }
            })
        }
        
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
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps='handled'>
                        <View style={{ paddingBottom: 20 }}>
                            <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`สมัครสมาชิก`}</Text>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ลงทะเบียนแบบนิติบุคคล`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compname = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ชื่อนิติบุคคล'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ compname: text })}
                                    onSubmitEditing={() => this.compid.focus()} />
                            </View>
                            {
                                this.state.apptype == 'UAT' ?
                                    null
                                    :
                                    <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                        <TextInput
                                            ref={(input) => { this.compid = input; }}
                                            style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                            placeholder='เลขประจำตัวผู้เสียภาษีอากร'
                                            returnKeyType={'next'}
                                            autoCapitalize={false}
                                            keyboardType='numeric'
                                            blurOnSubmit={false}
                                            value={this.state.compid}
                                            onBlur={(e) => this.CheckIDCard()}
                                            placeholderTextColor={'#7C7B7B'}
                                            onChangeText={(text) => this.setState({ compid: text })}
                                            onSubmitEditing={() => this.compAddr.focus()} />
                                    </View>
                            }

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

                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.branch_code = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='รหัสสาขา'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ branch_code: text })}
                                    onSubmitEditing={() => this.branch_name.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.branch_name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ชื่อสาขา'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ branch_name: text })}
                                    onSubmitEditing={() => this.name.focus()} />
                            </View>
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`แนบไฟล์ ภ.พ. 20`}</Text>
                                <TouchableOpacity style={[styles.twoButton, styles.center, { width: 100, backgroundColor: grayColor }]}
                                    onPress={() => {
                                        this.SelectFiles()
                                    }}
                                >
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`Choose file`}</Text>
                                </TouchableOpacity>
                            </View>

                            {
                                this.state.FileSource != '' ?
                                    <Lightbox activeProps={{
                                        resizeMode: 'contain',
                                        flex: 1,
                                        width: null,
                                    }} underlayColor="white" style={{ padding: 15 }}>
                                        <Image style={{ width: '100%', height: 180, resizeMode: 'contain' }} source={{ uri: this.state.FileSource }} />
                                    </Lightbox>
                                    :
                                    <View></View>
                            }
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ข้อมูลผู้มาติดต่อ`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ชื่อ - นามสกุล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    onSubmitEditing={() => this.phone.focus()} />
                            </View>

                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.phone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='เบอร์โทรศัพท์'
                                    value={this.state.phone}
                                    returnKeyType={'next'}
                                    maxLength={10}
                                    keyboardType='phone-pad'
                                    blurOnSubmit={false}
                                    autoCapitalize={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ phone: text.replace(/[^0-9\-]+/g, '') })}
                                    onSubmitEditing={() => this.email.focus()} />
                            </View>

                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='อีเมล'
                                    autoCapitalize={false}
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    keyboardType={'email-address'}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    onSubmitEditing={() => this.accountName.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>

                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ข้อมูลเจ้าหน้าที่บัญชี`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.accountName = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='ชื่อ - นามสกุล'
                                    returnKeyType={'next'}
                                    autoCapitalize={false}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ accountName: text })}
                                    onSubmitEditing={() => this.accountPhone.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.accountPhone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    keyboardType='phone-pad'
                                    value={this.state.accountPhone}
                                    autoCapitalize={false}
                                    maxLength={10}
                                    blurOnSubmit={false}
                                    placeholderTextColor={'#7C7B7B'}
                                    onChangeText={(text) => this.setState({ accountPhone: text.replace(/[^0-9\-]+/g, '') })}
                                    onSubmitEditing={() => this.username.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ชื่อผู้ใช้งานและรหัสผ่าน`}</Text>
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.username = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='Username'
                                    autoCapitalize={false}
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    value={this.state.username}
                                    placeholderTextColor={'#7C7B7B'}
                                    onBlur={(e) => this.CheckUserName()}
                                    onChangeText={(text) => {
                                        if (/^[a-zA-Z0-9.]+$/.test(text) || text == '') {
                                            this.setState({ username: text })
                                        }
                                    }}
                                    onSubmitEditing={() => this.password.focus()} />
                            </View>
                            <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.password = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                                    placeholder='Password'
                                    autoCapitalize={false}
                                    returnKeyType={'done'}
                                    placeholderTextColor={'#7C7B7B'}
                                    blurOnSubmit={false}
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
                                            this.state.ProductType.map((v, i) => {
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
                                        {/* <RadioButton
                                            value={1}
                                            color={primaryColor}
                                            style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                            <Text style={[styles.text16, { color: primaryColor }]}>{`อาหาร`}</Text>
                                        </RadioButton>
                                        <RadioButton
                                            value={2}
                                            color={primaryColor}
                                            style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                            <Text style={[styles.text16, { color: primaryColor }]}>{`สินค้าทั่วไป`}</Text>
                                        </RadioButton> */}
                                    </RadioGroup>
                                    :
                                    <View style={[styles.center, { justifyContent: 'center', alignSelf: 'center' }]}>
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
                                                RegisType: 'Company'
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
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.licenseAgree}
                                    onPress={() => this.onCheckLicense(!this.state.licenseAgree)} />
                                <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ยอมรับข้อตกลงและเงื่อนไขในการจองตลาด `}</Text>
                            </View>
                            <TouchableOpacity
                                disabled={this.state.licenseAgree/* && this.state.privacyAgree*/ ? false : true}
                                style={[this.state.licenseAgree/* && this.state.privacyAgree*/ ? styles.mainButton : styles.mainButtonDisabled, styles.center]}
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
                                onPress={
                                    () => this.props.navigation.navigate('Login')
                                }>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompanyScreen)
