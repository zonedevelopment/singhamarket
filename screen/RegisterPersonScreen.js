import React from 'react'
import {
    View,
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
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator
} from '../actions'

import styles from '../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
const VALIDATION_FIELD = {
    name : {
        message : 'กรุณากรอกชื่อ-นามสกุล',
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
    // lineid : {
    //     message : 'กรุณากรอกไอดีไลน์',
    //     type : 'text'
    // },
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

    state = {
        productCate: 0,
        licenseAgree: false,
        privacyAgree: false,
        name : '',
        idcard : '',
        phone : '',
        lineid : '',
        email : '',
        username : '',
        password : '',
    }

    onSelectProductCategory(index, value) {
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    validateFields() {
        const fields = this.state;
        const names = Object.keys(fields);
        for (const name of names) {
            const validate = VALIDATION_FIELD[name] || {};
            if(validate != {}){
                if(validate.type === 'text'){
                    if(fields[name] === ''){
                        return alert(validate.message)
                    }
                }
                if(validate.type === 'radio'){
                    if(fields[name] == 0){
                        return alert(validate.message)
                    }
                }
            }
        }
        if(this.props.reducer.product_type.length == 0) {
            return alert('กรุณาเลือกสินค้าที่ต้องการขาย')
        }
       

        //// call api
    }

    onSubmit = () =>{
        this.props.openIndicator()

        this.props.dismissIndicator()
    }

    render() {

        const props = this.props.reducer
        const productSelected = props.product_type

        return (
            <View style={[styles.container, { backgroundColor: primaryColor }]}>
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
                <View style={[styles.container, { alignItems: 'center', paddingBottom: 10 }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`สมัครสมาชิก`}</Text>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ลงทะเบียนแบบบุคคลธรรมดา`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อ - นามสกุล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    onSubmitEditing={() => this.idcard.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.idcard = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เลขบัตรประชาชน'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ idcard: text })}
                                    onSubmitEditing={() => this.phone.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.phone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ phone: text })}
                                    onSubmitEditing={() => this.lineid.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.lineid = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='Line ID'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ lineid: text })}
                                    onSubmitEditing={() => this.email.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='อีเมล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    onSubmitEditing={() => this.username.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`รหัสผ่าน`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.username = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อผู้ใช้'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    onSubmitEditing={() => this.password.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.password = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่าน'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`กรุณาประเภทสินค้าที่จะนำมาขาย`}</Text>
                            </View>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectProductCategory(index, value)}>
                                <RadioButton
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
                                </RadioButton>
                            </RadioGroup>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`เลือกประเภทสินค้าที่ต้องการขาย`}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}
                                onPress={
                                    () => {
                                        if (this.state.productCate > 0) {
                                            this.props.navigation.navigate('Categoryscreen', {
                                                typeId: this.state.productCate
                                            })
                                        }
                                    }
                                }>
                                <Text style={{ color: 'white' }}>{`เลือกประเภท${this.state.productCate == 1 ? 'อาหาร' : 'สินค้า'}ที่ต้องการขาย`}</Text>
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
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                                <CheckBox
                                    center
                                    containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                    size={22}
                                    checked={this.state.privacyAgree}
                                    onPress={() => this.onCheckPrivacy(!this.state.privacyAgree)} />
                                <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ให้การยินยอมในการเปิดเผยข้อมูล `}</Text>
                            </View>
                            <TouchableOpacity disabled={this.state.licenseAgree && this.state.privacyAgree ? false : true} 
                            style={[this.state.licenseAgree && this.state.privacyAgree ? styles.mainButton : styles.mainButtonDisabled , styles.center]}
                                onPress={
                                    () => {
                                        this.validateFields()
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`สมัครสมาชิก`}</Text>
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text14, { alignSelf: 'center' }]}>{`ถ้าท่านเป็นสมาชิกอยู่ กรุณาเข้าสู่ระบบได้เลยค่ะ`}</Text>
                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}>
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
    dismissIndicator
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPersonScreen)