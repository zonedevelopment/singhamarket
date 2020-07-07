import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    Alert,
    TextInput,
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
    UPDATE_PROFILE_COMPANY,
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


class ProfileCompanyScreen extends React.Component {

    state = {
        address : '',
        branch_code : '',
        branch_name : '',
        name : '',
        citizenid : '',
        phone : '',
        lineid : '',
        email : '',
        receiptname : '',
        receiptphone : '',
        receiptofficename : '',
        receiptofficephone : '',
        receiptemail : '',
        accountname : '',
        accountphone : '',
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อมูลนิติบุคคล`}</Text>
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
            address : props.userInfo.address,
            branch_code : props.userInfo.branch_code,
            branch_name : props.userInfo.branch_name,
            name : props.userInfo.name,
            citizenid : props.userInfo.citizenid,
            phone : props.userInfo.phone,
            lineid : props.userInfo.lineid,
            email : props.userInfo.email,
            receiptname : props.userInfo.receiptname,
            receiptphone : props.userInfo.receiptphone,
            receiptofficename : props.userInfo.receiptofficename,
            receiptofficephone : props.userInfo.receiptofficephone,
            receiptemail : props.userInfo.receiptemail,
            accountname : props.userInfo.accountname,
            accountphone : props.userInfo.accountphone,

        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onUpdateProfile () {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('address',this.state.address)
        formData.append('branch_code',this.state.branch_code)
        formData.append('branch_name',this.state.branch_name)
        formData.append('name',this.state.name)
        formData.append('citizenid',this.state.citizenid)
        formData.append('phone',this.state.phone)
        formData.append('lineid',this.state.lineid)
        formData.append('email',this.state.email)
        formData.append('receiptname',this.state.receiptname)
        formData.append('receiptphone',this.state.receiptphone)
        formData.append('receiptofficename',this.state.receiptofficename)
        formData.append('receiptofficephone',this.state.receiptofficephone)
        formData.append('receiptemail',this.state.receiptemail)
        formData.append('accountname',this.state.accountname)
        formData.append('accountphone',this.state.accountphone)

        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + UPDATE_PROFILE_COMPANY,formData,HEADERFORMDATA,(results)=>{
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
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลนิติบุคคล`}</Text>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' ,backgroundColor:'#eee'}]}>
                                <Text style={[styles.text16, {color: primaryColor}]}>{'ชื่อนิติบุคคล : ' + props.userInfo.name_customer}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' ,backgroundColor:'#eee'}]}>
                                <Text style={[styles.text16, {color: primaryColor}]}>{'เลขประจำตัวเสียภาษีอากร : ' + props.userInfo.numbertax}</Text>
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.TextAreaWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start' }]}>{'ที่อยู่ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.address = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' ,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start'}]}
                                        returnKeyType={'done'}
                                        numberOfLines={3}
                                        multiline={true}
                                        value={this.state.address}
                                        onChangeText={(text) => this.setState({ address: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                               
                                {/* <View style={[styles.shadow, styles.TextAreaWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor,width: '100%', height: '100%',textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start'}]}>
                                        {'ที่อยู่ : ' + props.userInfo.address}
                                    </Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1,justifyContent: "center",alignSelf: 'center'}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'รหัสสาขา : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.branch_code = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.branch_code}
                                        onChangeText={(text) => this.setState({ branch_code: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อสาขา : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.branch_name = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.branch_name}
                                        onChangeText={(text) => this.setState({ branch_name: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลผู้มาติดต่อ`}</Text>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อ-นามสกุล : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.name = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เลขบัตรประชาชน : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.citizenid = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.citizenid}
                                        onChangeText={(text) => this.setState({ citizenid: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.phone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.phone}
                                        onChangeText={(text) => this.setState({ phone: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'Line ID : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.lineid = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.lineid}
                                        onChangeText={(text) => this.setState({ lineid: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'อีเมล์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.email = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>




                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลเพื่อออกใบเสร็จรับเงิน`}</Text>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{''}</Text>
                                    <TextInput
                                        ref={(input) => { this.receiptname = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.receiptname}
                                        onChangeText={(text) => this.setState({ receiptname: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์'}</Text>
                                    <TextInput
                                        ref={(input) => { this.receiptphone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.receiptphone}
                                        onChangeText={(text) => this.setState({ receiptphone: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'สำนักงาน : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.receiptofficename = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.receiptofficename}
                                        onChangeText={(text) => this.setState({ receiptofficename: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.receiptofficephone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.receiptofficephone}
                                        onChangeText={(text) => this.setState({ receiptofficephone: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'อีเมล์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.receiptemail = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.receiptemail}
                                        onChangeText={(text) => this.setState({ receiptemail: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>




                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลเจ้าหน้าที่บัญชี`}</Text>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'ชื่อ-นามสกุล : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.accountname = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.accountname}
                                        onChangeText={(text) => this.setState({ accountname: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>
                            
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.9 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.accountphone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.accountphone}
                                        onChangeText={(text) => this.setState({ accountphone: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            

                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`รหัสผ่าน`}</Text>
                            <TouchableOpacity style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}
                            onPress={()=>{
                                this.props.navigation.navigate('ChangePassword')
                            }}
                            >
                                <View style={[styles.containerRow]}>
                                    <Text style={[styles.text16, {color: 'white',flex:0.9}]}>{'เปลี่ยนรหัสผ่าน'}</Text>
                                    <View style={{alignItems:'center',flex:0.1}}>
                                        <Icon  name='chevron-right' size={20} color='white' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`ประเภทสินค้าที่นำมาขาย`}</Text>
                            <View style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{ props.userInfo.product_type.type_name + ` : ` + props.userInfo.product_type.category_name}</Text>
                            </View>
                            <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                            {
                                props.userInfo.product.map((v, i) => {
                                    return (
                                        <View key={i} style={{ paddingLeft: 40 }}>
                                            <Text style={[styles.text14]}>{`${(i + 1)}. ${v.product_name}`}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text style={[styles.text12, { color: primaryColor,paddingTop:5, paddingLeft: 20 }]}>{`*หมายเหตุ ถ้าท่านต้องเปลี่ยนประเภทสินค้าที่ต้องการขาย\n กรุณาติดต่อเจ้าหน้าที่`}</Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <Text style={[styles.text14, {textDecorationLine : 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text>
                       
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
                            <Text style={[styles.text14, {textDecorationLine : 'underline', color: primaryColor }]}>{`ยกเลิกการสมัครสมาชิก`}</Text>
                           
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompanyScreen)