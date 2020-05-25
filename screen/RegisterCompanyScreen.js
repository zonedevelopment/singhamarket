import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Picker,
    Dimensions,
    Alert,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ImagePicker from 'react-native-image-picker'
import Lightbox from 'react-native-lightbox'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    REGISTER_COMPANY_URL,
    HEADERFORMDATA,
    CHECK_REGISTER_URL,
} from '../utils/contants'
import styles from '../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveProductType
} from '../actions'
import Hepler from '../utils/Helper'

const VALIDATION_FIELD = {
    compname : {
        message : 'กรุณากรอกชื่อนิติบุคคล',
        type : 'text'
    },
    compid : {
        message : 'กรุณากรอกเลขประจำตัวผู็เสียภาษีอากร',
        type : 'text'
    },
    compAddr : {
        message : 'กรุณากรอกที่อยู่',
        type : 'text'
    },
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
    },
    receiptName: {
        message : 'กรุณากรอกชื่อนิติบุคคลสำหรับออกใบเสร็จรับเงิน',
        type : 'text'
    },
    receiptPhone : {
        message : 'กรุณากรอกเบอร์โทรศัพท์สำหรับออกใบเสร็จรับเงิน',
        type : 'text'
    },
    FileSource : {
        message : 'กรุณาแนบไฟล์ ภ.พ 20',
        type : 'text'
    },
    receiptOffice : {
        message : 'กรุณากรอกสำนักงาน',
        type : 'text'
    },
    receiptTelephone : {
        message : 'กรุณากรอกเบอร์โทรศัพท์สำนักงาน',
        type : 'text'
    },
    receiptEmail : {
        message : 'กรุณากรอกอีเมล์สำนักงาน',
        type : 'text'
    },
    accountName : {
        message : 'กรุณากรอกชื่อ-นามสกุล เจ้าหน้าที่บัญชี',
        type : 'text'
    },
    accountPhone : {
        message : 'กรุณากรอกเบอร์โทรศัพท์เจ้าหน้าที่บัญชี',
        type : 'text'
    },
}

const DEVICE_HEIGHT = Dimensions.get('screen').height
class RegisterCompanyScreen extends React.Component {

    state = {
        productCate: 0,
        licenseAgree: false,
        FileSource : '',
        FileSourceBase64 : '',
        compname : '',
        compid : '',
        compAddr : '',
        branch_code : '',
        branch_name : '',
        name : '',
        idcard : '',
        phone : '',
        lineid : '',
        email : '',
        username : '',
        password : '',
        receiptName : '',
        receiptTelephone : '',
        receiptOffice : '',
        receiptPhone : '',
        receiptEmail : '',
        accountName : '',
        accountPhone : '',
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    SelectFiles() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    FileSource: response.uri,
                    FileSourceBase64: response.data
                });
            }
        });
    }

    validateFields() {
        const fields = this.state;
        const names = Object.keys(fields);
        for (const name of names) {
            const validate = VALIDATION_FIELD[name] || {};
            if(validate != {}){
                if(validate.type === 'text'){
                    if(fields[name] === ''){
                        return Alert.alert(validate.message)
                    }
                }
                if(validate.type === 'radio'){
                    if(fields[name] == 0){
                        return Alert.alert(validate.message)
                    }
                }
            }
        }
        if(this.props.reducer.product_type.length == 0) {
            return Alert.alert('กรุณาเลือกสินค้าที่ต้องการขาย')//alert('กรุณาเลือกสินค้าที่ต้องการขาย')
        }

        this.onSubmit()
        /// insert api
    }

    onSubmit = () =>{
        this.props.openIndicator()
        let formData = new FormData();
        /// ข้อมูลนิติบุคคล
        formData.append('compname', this.state.compname)
        formData.append('compid', this.state.compid)
        formData.append('compAddr', this.state.compAddr)
        formData.append('branch_code', this.state.branch_code)
        formData.append('branch_name', this.state.branch_name)
        ///ข้อมูลผู้มาติดต่อ
        formData.append('name', this.state.name)
        formData.append('idcard', this.state.idcard)
        formData.append('phone', this.state.phone)
        formData.append('lineid', this.state.lineid)
        formData.append('email', this.state.email)
        ///ข้อมูลออกใบเสร็จรับเงิน
        formData.append('receiptName', this.state.receiptName)
        formData.append('receiptPhone', this.state.receiptPhone)
        formData.append('FileSourceBase64', this.state.FileSourceBase64)
        formData.append('receiptOffice', this.state.receiptOffice)
        formData.append('receiptTelephone', this.state.receiptTelephone)
        formData.append('receiptEmail', this.state.receiptEmail)
        ///ข้อมูลเจ้าหน้าที่บัญชี
        formData.append('accountName', this.state.accountName)
        formData.append('accountPhone', this.state.accountPhone)
        /// ผู้ใช้งาน
        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        ///ประเภทสินค้า
        formData.append('productCate', this.state.productCate)
        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))
        Hepler.post(BASE_URL + REGISTER_COMPANY_URL,formData,HEADERFORMDATA,(results) => {
            //console.log('REGISTER_COMPANY_URL',results)
            if (results.status == 'SUCCESS') {
                Alert.alert(
                    'บันทึกสำเร็จ!',
                    'สมัครสมาชิกเรียบร้อย',
                    [
                        { text: 'ตกลง', onPress: () => this.props.navigation.pop() }
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
        this.props.openIndicator()
        let username = this.state.username
        let formData = new FormData();
        formData.append('TYPE', 'USERNAME')
        formData.append('VALUE', username.trim())
        Hepler.post(BASE_URL + CHECK_REGISTER_URL,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                //Alert.alert(results.message)
            } else {
                Alert.alert(results.message)
                this.setState({username : ''})
            }
        })
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
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ลงทะเบียนแบบนิติบุคคล`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compname = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อนิติบุคคล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ compname: text })}
                                    onSubmitEditing={() => this.compid.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compid = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เลขประจำตัวผู้เสียภาษีอากร'
                                    returnKeyType={'next'}
                                    keyboardType='numeric'
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ compid: text })}
                                    onSubmitEditing={() => this.compAddr.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.TextAreaWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.compAddr = input; }}
                                    style={{ width: '100%', height: '100%',textAlignVertical: 'top', justifyContent: "flex-start",alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ที่อยู่'
                                    multiline={true}
                                    numberOfLines={4}
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ compAddr: text })}
                                    onSubmitEditing={() => this.branch_code.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.branch_code = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสสาขา'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ branch_code: text })}
                                    onSubmitEditing={() => this.branch_name.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.branch_name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อสาขา'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ branch_name: text })}
                                    onSubmitEditing={() => this.name.focus()} /> 
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ข้อมูลผู้มาติดต่อ`}</Text>
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
                                    maxLength={13} 
                                    keyboardType='numeric'
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
                                    keyboardType='numeric'
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
                                    onSubmitEditing={() => this.receiptName.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ข้อมูลเพื่อออกใบเสร็จรับเงิน`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.receiptName = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อนิติบุคคล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ receiptName: text })}
                                    onSubmitEditing={() => this.receiptPhone.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.receiptPhone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    keyboardType='numeric'
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ receiptPhone: text })}
                                    onSubmitEditing={() => this.receiptOffice.focus()} />
                            </View>
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`แนบไฟล์ ภ.พ. 20`}</Text>
                                <TouchableOpacity style={[styles.twoButton, styles.center, { width: 100, backgroundColor: grayColor }]}
                                onPress={()=>{
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
                                      }} underlayColor="white" style={{padding: 15}}>
                                        <Image style={{ width: '100%', height: 180, resizeMode: 'contain'}} source={{ uri: this.state.FileSource }} />   
                                    </Lightbox>
                                :
                                    <View></View>
                            }

                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.receiptOffice = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='สำนักงาน'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ receiptOffice: text })}
                                    onSubmitEditing={() => this.receiptTelephone.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.receiptTelephone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    keyboardType='numeric'
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ receiptTelephone: text })}
                                    onSubmitEditing={() => this.receiptEmail.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.receiptEmail = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='อีเมล'
                                    returnKeyType={'done'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ receiptEmail: text })} 
                                    onSubmitEditing={() => this.accountName.focus()} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ข้อมูลเจ้าหน้าที่บัญชี`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.accountName = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อ - นามสกุล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ accountName: text })}
                                    onSubmitEditing={() => this.accountPhone.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.accountPhone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    keyboardType='numeric'
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ accountPhone: text })}
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
                                    value={this.state.username}
                                    onBlur={(e) => this.CheckUserName()}
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
                                                typeId: this.state.productCate,
                                                RegisType : 'Company'
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
                            <TouchableOpacity disabled={this.state.licenseAgree ? false : true}
                            style={[this.state.licenseAgree ? styles.mainButton : styles.mainButtonDisabled, styles.center]}
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
    dismissIndicator,
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompanyScreen)