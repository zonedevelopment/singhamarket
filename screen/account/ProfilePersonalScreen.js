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
    Platform,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { CheckBox } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
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
import IOSBackButtonOverlay from '../../components/IOSBackButtonOverlay'
import IOSSelectField from '../../components/IOSSelectField'

const DEVICE_WIDTH = Dimensions.get('screen').width
const IS_IOS = Platform.OS === 'ios'
class ProfilePersonalScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        firstName: '',
        lastName: '',
        citizenId: '',
        firstNameLocked: false,
        lastNameLocked: false,
        citizenIdLocked: false,
        phoneNumber: '',
        lineid: '',
        email: '',
        privacyAgree: false,
        type_id: '',
        type_name: '',
        category_name: '',
        product: [],
        privacy_url: '',
        agreement_url: '',

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
        provinceOpen: false,
        districtOpen: false,
        subDistrictOpen: false,
        isTextInputFocused: false,

    }

    getRootNavigation = () => {
        let navigation = this.props.navigation
        while (navigation.getParent && navigation.getParent()) {
            navigation = navigation.getParent()
        }
        return navigation
    }

    closeAllDropdowns = () => {
        this.setState({
            provinceOpen: false,
            districtOpen: false,
            subDistrictOpen: false,
        })
    }

    handleInputFocus = (onFocus) => {
        this.setState({ isTextInputFocused: true })
        this.closeAllDropdowns()
        if (onFocus) {
            onFocus()
        }
    }

    handleInputBlur = (onBlur) => {
        this.setState({ isTextInputFocused: false })
        if (onBlur) {
            onBlur()
        }
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
                    DistrictData: [],
                    DistrictSelected: null,
                    SubDistrictData: [],
                    SubDistrictSelected: null,
                    Zipcode: '',
                })
                if (this.state.LoadFrist == true) {
                    this.LoadDistrict(typeof this.props.reducer.userInfo === 'undefined' ? null : this.props.reducer.userInfo.province)
                } else {
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
        if (IS_IOS) {
            this.setState({
                ProvinceSelected: province_id,
                DistrictData: [],
                DistrictSelected: null,
                SubDistrictData: [],
                SubDistrictSelected: null,
                Zipcode: '',
                provinceOpen: false,
                districtOpen: false,
                subDistrictOpen: false,
            })
        }
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
                if (this.state.LoadFrist == true) {
                    this.LoadSubDistrict(typeof this.props.reducer.userInfo === 'undefined' ? null : this.props.reducer.userInfo.ampure)
                } else {
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
        if (IS_IOS) {
            this.setState({
                DistrictSelected: district_id,
                SubDistrictData: [],
                SubDistrictSelected: null,
                Zipcode: '',
                provinceOpen: false,
                districtOpen: false,
                subDistrictOpen: false,
            })
        }
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
                if (this.state.LoadFrist == true) {
                    this.setState({
                        LoadFrist: false,
                        Zipcode: this.props.reducer.userInfo.zipcode,
                        SubDistrictSelected: this.props.reducer.userInfo.district,
                    })
                } else {
                    this.setState({
                        LoadFrist: false,
                        SubDistrictSelected: null,
                        Zipcode: '',
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
            ...(IS_IOS ? [
                { label: 'ชื่อ', value: this.state.firstName, checkSql: false },
                { label: 'นามสกุล', value: this.state.lastName, checkSql: false },
                { label: 'เลขประจำตัวประชาชน', value: this.state.citizenId, checkSql: true },
            ] : []),
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

        if (IS_IOS && (!this.state.firstName || !this.state.lastName || this.state.citizenId.length !== 13)) {
            return Alert.alert('กรุณากรอกชื่อ นามสกุล และเลขประจำตัวประชาชน 13 หลักให้ครบ')
        }

        let formData = new FormData();
        if (IS_IOS) {
            formData.append('name', this.state.firstName)
            formData.append('lastname', this.state.lastName)
            formData.append('idcard', this.state.citizenId)
        }
        formData.append('address', this.state.address)
        formData.append('Soi', this.state.Soi)
        formData.append('Road', this.state.Road)
        formData.append('province_id', this.state.ProvinceSelected)
        formData.append('district_id', this.state.DistrictSelected)
        formData.append('subdistrict_id', this.state.SubDistrictSelected)
        formData.append('zipcode', this.state.Zipcode)

        formData.append('phone', this.state.phoneNumber)
        formData.append('lineid', this.state.lineid)
        formData.append('email', this.state.email)
        formData.append('partners_id', props.userInfo.partners_id)
        formData.append('privacyAgree', this.state.privacyAgree === true ? 'Y' : 'N')
        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))
        this.props.openIndicator()
        Hepler.post(BASE_URL + UPDATE_PROFILE_PERSONAL, formData, HEADERFORMDATA, (results) => {
            console.log('UPDATE_PROFILE_PERSONAL', results)
            if (results.status == 'SUCCESS') {
                if (IS_IOS) {
                    this.setState({
                        firstNameLocked: true,
                        lastNameLocked: true,
                        citizenIdLocked: true,
                    })
                }
                this.props.dismissIndicator()
                Alert.alert(
                    'อัพเดทข้อมูลสำเร็จ',
                    'กรุณาเข้าสู่ระบบใหม่อีกครั้ง เพื่อปรับปรุงข้อมูล',
                    [
                        { text: 'ยกเลิก', style: 'cancel' },
                        { text: 'ออกจากระบบ', style: 'destructive', onPress: () => this.Logout() },
                    ],
                    { cancelable: false }
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
        formData.append('partners_id', props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + UNSUBSCRIBE_PARTNERS_URL, formData, HEADERFORMDATA, (results) => {
            console.log('UNSUBSCRIBE_PARTNERS_URL', results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.Logout()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    async Logout() {
        await StorageServies.clear()
        await this.props.saveUserInfo([])
        this.getRootNavigation().dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Choice' }],
            })
        )
    }


    async RefreshLogin() {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        let PWD_TXT = await StorageServies.get(KEY_PWD_TXT)
        LOGIN = JSON.parse(LOGIN)
        let formData = new FormData();
        formData.append('USERNAME', LOGIN.username)
        formData.append('PASSWORD', PWD_TXT)
        Hepler.post(BASE_URL + LOGIN_URL, formData, HEADERFORMDATA, (results) => {
            console.log('LOGIN_URL', results)
            if (results.status == 'SUCCESS') {
                StorageServies.set(KEY_LOGIN, JSON.stringify(results.data))
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
            firstName: props.userInfo.name || '',
            lastName: props.userInfo.lastname || '',
            citizenId: props.userInfo.citizenid || props.userInfo.idcard || '',
            firstNameLocked: Boolean(props.userInfo.name),
            lastNameLocked: Boolean(props.userInfo.lastname),
            citizenIdLocked: Boolean(props.userInfo.citizenid || props.userInfo.idcard),
            phoneNumber: props.userInfo.phone,
            lineid: props.userInfo.lineid,
            email: props.userInfo.email,
            type_id: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_id,
            type_name: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_name,
            category_name: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.category_name,
            //product : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product,
            privacyAgree: props.userInfo.privacyAgree == 'Y' ? true : false,

            address: props.userInfo.address != 'null' ? props.userInfo.address : '-',
            Soi: props.userInfo.soi != 'null' ? props.userInfo.soi : '-',
            Road: props.userInfo.road != 'null' ? props.userInfo.road : '-',
            LoadFrist: true,
        })
        //this.LoadAgreement(props.userInfo.partners_type)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    LoadAgreement(type) {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type_id', type)
        Hepler.post(BASE_URL + GET_AGREEMENT_REGISTER, formData, HEADERFORMDATA, (results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    privacy_url: results.data['privacy_url'],
                    agreement_url: results.data['agreement'],
                })
            } else {
                Alert.alert(results.message)
                this.setState({
                    privacy_url: '',
                })
            }
        })
    }

    renderInputField(label, value, onChangeText, options = {}) {
        const {
            inputRef,
            keyboardType,
            maxLength,
            editable = true,
            onBlur,
            onFocus,
            returnKeyType = 'next',
            placeholder = label,
            showLabel = !IS_IOS,
        } = options

        return (
            <View>
                {showLabel ? <Text style={[styles.text18, { color: primaryColor }]}>{label}</Text> : null}
                <View style={[
                    styles.registerFieldShadow,
                    styles.inputWithIcon,
                    { alignSelf: 'center' },
                    IS_IOS && !editable ? { backgroundColor: '#eee' } : null,
                ]}>
                    <TextInput
                        ref={inputRef}
                        style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: primaryColor }}
                        returnKeyType={returnKeyType}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        editable={editable}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={'#7C7B7B'}
                        onBlur={() => this.handleInputBlur(onBlur)}
                        onFocus={() => this.handleInputFocus(onFocus)}
                        onChangeText={onChangeText}
                    />
                </View>
            </View>
        )
    }

    renderDropdownField({
        label,
        open,
        value,
        items,
        setOpen,
        onChangeValue,
        placeholder,
        zIndex,
        disabled = false,
        showLabel = !IS_IOS,
    }) {
        if (IS_IOS) {
            return (
                <IOSSelectField
                    options={items.map((item) => ({ key: `${item.value}`, value: item.label }))}
                    placeholder={placeholder}
                    selectedValue={value}
                    isOpen={open}
                    disabled={disabled}
                    onToggle={(next) => {
                        this.setState({
                            provinceOpen: label === 'จังหวัด' && !!next,
                            districtOpen: label === 'อำเภอ' && !!next,
                            subDistrictOpen: label === 'ตำบล' && !!next,
                        })
                    }}
                    onValueChange={onChangeValue}
                    zIndex={zIndex}
                />
            )
        }

        return (
            <View style={{ zIndex }}>
                {showLabel ? <Text style={[styles.text18, { color: primaryColor }]}>{label}</Text> : null}
                <DropDownPicker
                    open={IS_IOS && this.state.isTextInputFocused ? false : open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    disabled={disabled}
                    placeholder={placeholder}
                    listMode='SCROLLVIEW'
                    closeAfterSelecting
                    onChangeValue={onChangeValue}
                    onOpen={() => {
                        this.setState({
                            provinceOpen: label === 'จังหวัด',
                            districtOpen: label === 'อำเภอ',
                            subDistrictOpen: label === 'ตำบล',
                        })
                    }}
                    onClose={this.closeAllDropdowns}
                    style={[styles.registerFieldShadow, dropdownStyles.field, disabled ? dropdownStyles.disabledField : null, { borderRadius: 50 }]}
                    dropDownContainerStyle={[dropdownStyles.dropdown, { zIndex }]}
                    textStyle={[styles.regular, { color: primaryColor, fontSize: 18 }]}
                    placeholderStyle={[styles.regular, { color: '#7C7B7B', fontSize: 18 }]}
                    ArrowDownIconComponent={() => <Icon name='chevron-down' size={12} color='gray' />}
                    ArrowUpIconComponent={() => <Icon name='chevron-up' size={12} color='gray' />}
                />
            </View>
        )
    }

    render() {
        const props = this.props.reducer
        return (
            <SafeAreaView style={[styles.container, IS_IOS ? styles.formPageBackground : { backgroundColor: 'white', paddingBottom: 70 }]}>
                {/* {IS_IOS ? <IOSBackButtonOverlay onPress={this.handleBack} /> : null} */}
                <View style={[styles.container, IS_IOS ? { alignItems: 'center', paddingTop: 12 } : { padding: 10 }]}>
                    {IS_IOS ? (
                        <View style={styles.formHeaderBlock}>
                            {/* <Text style={styles.formHeaderTitle}>{`ข้อมูลส่วนตัว`}</Text> */}
                            <Text style={styles.formHeaderBrand}>{`SUN PLAZA`}</Text>
                        </View>
                    ) : null}
                    <ScrollView
                        style={IS_IOS ? [styles.panelWhite, styles.registerPanelShadow] : null}
                        contentContainerStyle={{ flexGrow: 1, padding: 8, paddingBottom: IS_IOS ? 130 : 8 }}
                        keyboardShouldPersistTaps="always"
                        scrollEnabled={!IS_IOS || !(this.state.provinceOpen || this.state.districtOpen || this.state.subDistrictOpen)}
                        onTouchStart={this.closeAllDropdowns}>
                        <TouchableWithoutFeedback onPress={this.closeAllDropdowns}>
                            <View /* style={[styles.panelWhite]}*/>
                                {IS_IOS ? null : <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลส่วนตัว`}</Text>}
                                {IS_IOS ? this.renderInputField('ชื่อ', this.state.firstName, (firstName) => this.setState({ firstName }), {
                                    placeholder: 'ชื่อ (จำเป็น)',
                                    editable: !this.state.firstNameLocked,
                                }) : <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อ : ' + props.userInfo.name}</Text>
                                </View>}
                                {IS_IOS ? this.renderInputField('นามสกุล', this.state.lastName, (lastName) => this.setState({ lastName }), {
                                    placeholder: 'นามสกุล (จำเป็น)',
                                    editable: !this.state.lastNameLocked,
                                }) : <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'นามสกุล : ' + props.userInfo.lastname}</Text>
                                </View>}



                                {IS_IOS ? this.renderInputField('เลขประจำตัวประชาชน', this.state.citizenId, (citizenId) => this.setState({ citizenId: citizenId.replace(/[^0-9]/g, '') }), {
                                    keyboardType: 'number-pad',
                                    maxLength: 13,
                                    placeholder: 'เลขประจำตัวประชาชน (จำเป็น)',
                                    editable: !this.state.citizenIdLocked,
                                }) : <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: '#eee' }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เลขประจำตัวประชาชน : ' + props.userInfo.citizenid}</Text>
                                </View>}
                                {this.renderInputField('เบอร์โทรศัพท์', this.state.phoneNumber, (text) => this.setState({ phoneNumber: text.replace(/[^0-9\-]+/g, '') }), {
                                    inputRef: (input) => { this.phone = input },
                                    keyboardType: 'phone-pad',
                                    maxLength: 10,
                                    placeholder: IS_IOS ? 'เบอร์โทรศัพท์ (จำเป็น)' : 'เบอร์โทรศัพท์',
                                })}
                                {this.renderInputField('Line ID', this.state.lineid, (text) => this.setState({ lineid: text }), {
                                    inputRef: (input) => { this.line = input },
                                })}
                                {this.renderInputField('อีเมล', this.state.email, (text) => this.setState({ email: text }), {
                                    inputRef: (input) => { this.email = input },
                                    placeholder: IS_IOS ? 'อีเมล (จำเป็น)' : 'อีเมล',
                                    onBlur: () => {
                                        let e = this.state.email
                                        if (!EmailValidator.validate(e)) {
                                            Alert.alert('คำเตือน!', 'Email ไม่ถูกต้อง!',
                                                [
                                                    {
                                                        text: 'ตกลง', onPress: () => {
                                                            this.setState({ email: '' })
                                                            this.email.focus()
                                                        }
                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }
                                    }
                                })}
                                {this.renderInputField('ที่อยู่', this.state.address, (text) => this.setState({ address: text }), {
                                    inputRef: (input) => { this.address = input },
                                    placeholder: IS_IOS ? 'ที่อยู่ (จำเป็น)' : 'ที่อยู่',
                                })}
                                {this.renderInputField('ซอย', this.state.Soi, (text) => this.setState({ Soi: text }), {
                                    inputRef: (input) => { this.Soi = input },
                                })}
                                {this.renderInputField('ถนน', this.state.Road, (text) => this.setState({ Road: text }), {
                                    inputRef: (input) => { this.Road = input },
                                })}
                                {this.renderDropdownField({
                                    label: 'จังหวัด',
                                    open: this.state.provinceOpen,
                                    value: this.state.ProvinceSelected,
                                    items: this.state.ProvinceData,
                                    placeholder: IS_IOS ? 'กรุณาเลือกจังหวัด (จำเป็น)' : 'กรุณาเลือกจังหวัด',
                                    zIndex: 3000,
                                    setOpen: (provinceOpen) => this.setState({ provinceOpen }),
                                    onChangeValue: (provinceId) => this.LoadDistrict(provinceId),
                                })}
                                {this.renderDropdownField({
                                    label: 'อำเภอ',
                                    open: this.state.districtOpen,
                                    value: this.state.DistrictSelected,
                                    items: this.state.DistrictData,
                                    placeholder: IS_IOS ? 'กรุณาเลือกอำเภอ (จำเป็น)' : 'กรุณาเลือกอำเภอ',
                                    zIndex: 2000,
                                    disabled: this.state.DistrictData.length === 0,
                                    setOpen: (districtOpen) => this.setState({ districtOpen }),
                                    onChangeValue: (districtId) => this.LoadSubDistrict(districtId),
                                })}
                                {this.renderDropdownField({
                                    label: 'ตำบล',
                                    open: this.state.subDistrictOpen,
                                    value: this.state.SubDistrictSelected,
                                    items: this.state.SubDistrictData,
                                    placeholder: IS_IOS ? 'กรุณาเลือกตำบล (จำเป็น)' : 'กรุณาเลือกตำบล',
                                    zIndex: 1000,
                                    disabled: this.state.SubDistrictData.length === 0,
                                    setOpen: (subDistrictOpen) => this.setState({ subDistrictOpen }),
                                    onChangeValue: (subDistrictId) => {
                                        let data = this.state.SubDistrictData.filter((i) => i.value == subDistrictId)
                                        this.setState({
                                            SubDistrictSelected: subDistrictId,
                                            Zipcode: typeof data[0] === 'undefined' ? '' : data[0].zipcode
                                        })
                                    },
                                })}
                                {this.renderInputField('รหัสไปรษณีย์', this.state.Zipcode, (text) => this.setState({ Zipcode: text }), {
                                    inputRef: (input) => { this.Zipcode = input },
                                    editable: false,
                                    placeholder: IS_IOS ? 'รหัสไปรษณีย์ (จำเป็น)' : 'รหัสไปรษณีย์',
                                })}

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
                                                RegisType: 'ProfilePersonal'
                                            })
                                        }
                                    }>
                                    <View style={[styles.containerRow]}>
                                        <Text style={[styles.text16, { color: 'white', flex: 0.9 }]}>{this.state.type_name}</Text>
                                        <View style={{ alignItems: 'center', flex: 0.1 }}>
                                            <Icon name='chevron-right' size={20} color='white' />
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
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('ConditionProfile', {
                                        Type: this.props.reducer.userInfo.partners_type,
                                        Field: 'agreement_only'
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
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('ConditionProfile', {
                                            Type: this.props.reducer.userInfo.partners_type,
                                            Field: 'policy_only'
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
                                                if (this.state.phoneNumber.length < 9) {
                                                    Alert.alert('เบอร์โทรศัพท์ไม่ถูกต้อง!')
                                                } else if (this.state.ProvinceSelected == null || this.state.DistrictSelected == null || this.state.SubDistrictSelected == null) {
                                                    Alert.alert('กรุณาเลือกจังหวัด อำเภอ ตำบล!')
                                                } else if (!EmailValidator.validate(this.state.email)) {
                                                    Alert.alert('Email ไม่ถูกต้อง!');
                                                } else {
                                                    Alert.alert(
                                                        "ยืนยัน",
                                                        'ยืนยันการแก้ไขข้อมูล?',
                                                        [
                                                            {
                                                                text: "ยกเลิก",
                                                                onPress: () => console.log("Cancel Pressed"),
                                                                style: "cancel"
                                                            },
                                                            {
                                                                text: "ตกลง",
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
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        "คำเตือน",
                                        'ยืนยันยกเลิกการสมัครสมาชิก?',
                                        [
                                            {
                                                text: "ยกเลิก",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            {
                                                text: "ตกลง",
                                                onPress: () => this.UnSubscribe()
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }}>
                                    <Text style={[styles.text14, { textDecorationLine: 'underline', color: primaryColor }]}>{`ยกเลิกการสมัครสมาชิก`}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const dropdownStyles = {
    field: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderRadius: 28,
        margin: 10,
        minHeight: 50,
        paddingHorizontal: 15,
    },
    disabledField: {
        backgroundColor: '#F3F3F3',
    },
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#E5E5E5',
        borderRadius: 24,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
}

const mapDispatchToProps = {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePersonalScreen)
