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
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements'
import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    redColor,
    BASE_URL,
    PROVINCE_URL,
    DISTRICT_URL,
    SUBDISTRICT_URL,
    UPDATE_PROFILE_COMPANY,
    GET_AGREEMENT_REGISTER,
    HEADERFORMDATA,
    UNSUBSCRIBE_PARTNERS_URL,
    KEY_LOGIN,
    LOGIN_URL
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo,
    saveProductType
} from '../../actions'
import Hepler from '../../utils/Helper'
import StorageServies from '../../utils/StorageServies'
import OpenURLButton from '../../components/OpenURLButton'

class ProfileCompanyScreen extends React.Component {

    state = {
        address : '',
        branch_code : '',
        branch_name : '',
        name : '',
        phone : '',
        email : '',
       
        accountname : '',
        accountphone : '',

        type_id : '',
        type_name : '',
        category_name : '',
        product : [],

        
        ProvinceData : [],
        DistrictData : [],
        SubDistrictData : [],

        Soi : '',
        Road : '',
        ProvinceSelected : null,
        DistrictSelected : null,
        SubDistrictSelected : null,
        Zipcode : '',

        privacy_url : '',

        LoadPV : false,
        LoadDS : false,
        LoadSD : false,
        LoadFrist : false,
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
        this.props.openIndicator()
        const props = this.props.reducer
        this.LoadAgreement(props.userInfo.partners_type)
        this.LoadProvince()
        this.LoadDistrict(typeof props.userInfo === 'undefined' ? null : props.userInfo.province)
        this.LoadSubDistrict(typeof props.userInfo === 'undefined' ? null : props.userInfo.ampure)
        this.props.saveProductType(typeof props.userInfo === 'undefined' ? [] : props.userInfo.product)
        this.setState({
            address : props.userInfo.address,
            branch_code : props.userInfo.branch_code,
            branch_name : props.userInfo.branch_name,
            name : props.userInfo.name,
            phone : props.userInfo.phone,
            email : props.userInfo.email,
            accountname : props.userInfo.accountname,
            accountphone : props.userInfo.accountphone,
            type_id : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_id,
            type_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_name,
            category_name : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.category_name,
           // product : typeof props.userInfo === 'undefined' ? '' : props.userInfo.product,
            Soi : props.userInfo.soi,
            Road : props.userInfo.road,
        }) 

        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    onUpdateProfile () {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('address',this.state.address)
        formData.append('Soi', this.state.Soi)
        formData.append('Road', this.state.Road)
        formData.append('province_id', this.state.ProvinceSelected)
        formData.append('district_id', this.state.DistrictSelected)
        formData.append('subdistrict_id', this.state.SubDistrictSelected)
        formData.append('zipcode', this.state.Zipcode)
        formData.append('branch_code',this.state.branch_code)
        formData.append('branch_name',this.state.branch_name)

        formData.append('name',this.state.name)
        formData.append('phone',this.state.phone)
        formData.append('email',this.state.email)

        formData.append('accountname',this.state.accountname)
        formData.append('accountphone',this.state.accountphone)

        formData.append('product_type', JSON.stringify(this.props.reducer.product_type))

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

    
    LoadProvince () {
        //this.props.openIndicator()
        Hepler.post(BASE_URL + PROVINCE_URL,null,HEADERFORMDATA,(results) => {
            console.log('PROVINCE_URL',results)
            if (results.status == 'SUCCESS') {
                results.data.map((value,index) => {
                    value['label'] = 'จังหวัด : ' + value['label']
                })
                this.setState({
                    ProvinceData: results.data,
                    LoadPV : true,
                    // ProvinceSelected : province_id,
                    // DistrictData : [],
                    // DistrictSelected : null,
                    // SubDistrictData : [],
                    // SubDistrictSelected : null,
                    // Zipcode : '',
                })
            } else {
                this.props.dismissIndicator()
                Alert.alert(results.message)
                this.setState({
                    ProvinceData : [],
                    ProvinceSelected : null,
                    DistrictData : [],
                    DistrictSelected : null,
                    SubDistrictData : [],
                    SubDistrictSelected : null,
                    Zipcode : '',
                })
            }
        })
    }

    
    LoadDistrict (province_id) {
       // this.props.openIndicator()
        let formData = new FormData();
        
        formData.append('province_id', province_id)
        Hepler.post(BASE_URL + DISTRICT_URL,formData,HEADERFORMDATA,(results) => {
            console.log('DISTRICT_URL',results)
           
            if (results.status == 'SUCCESS') {
                results.data.map((value,index) => {
                    value['label'] = 'อำเภอ : ' + value['label']
                })
                this.setState({
                    LoadDS : true,
                    DistrictData: results.data,
                    DistrictSelected : null,
                    SubDistrictData : [],
                    SubDistrictSelected : null,
                    Zipcode : '',
                })
            } else { 
                this.props.dismissIndicator()
                Alert.alert(results.message)
                this.setState({
                    DistrictData : [],
                    DistrictSelected : null,
                    SubDistrictData : [],
                    SubDistrictSelected : null,
                    Zipcode : '',
                })
            }
        })
    }

    
    LoadSubDistrict(district_id){
       // this.props.openIndicator()
        let formData = new FormData();
   
        formData.append('district_id', district_id)
        Hepler.post(BASE_URL + SUBDISTRICT_URL,formData,HEADERFORMDATA,(results) => {
            console.log('SUBDISTRICT_URL',results)
            
            if (results.status == 'SUCCESS') {
                results.data.map((value,index) => {
                    value['label'] = 'ตำบล : ' + value['label']
                })
                this.setState({
                    LoadSD : true,
                    SubDistrictData: results.data,
                    SubDistrictSelected : null,
                })
            } else {
                this.props.dismissIndicator()
                Alert.alert(results.message)
                this.setState({
                    SubDistrictData : [],
                    SubDistrictSelected : null,
                    Zipcode : '',
                })
            }
        })
    }

    render() {
        const props = this.props.reducer
        if(this.state.LoadPV == true && this.state.LoadDS == true && this.state.LoadSD == true && this.state.LoadFrist == false){
            this.setState({
                ProvinceSelected : props.userInfo.province,
                DistrictSelected : props.userInfo.ampure,
                SubDistrictSelected : props.userInfo.district,
                Zipcode : props.userInfo.zipcode,
                LoadFrist : true,
            }) 
            this.props.dismissIndicator()
        }
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start' }]}>{'ที่อยู่ : '}</Text>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start' }]}>{'ซอย : '}</Text>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start' }]}>{'ถนน : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.Road = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.Road}
                                        onChangeText={(text) => this.setState({ Road: text })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>


                            <View style={{ flex:1,flexDirection:'row', alignItems: 'center' }}>
                                <View style={{   flex: 0.95 }}>
                                    <DropDownPicker
                                        zIndex={5000}
                                        searchable={true}
                                        searchablePlaceholder="กรอกชื่อจังหวัดที่ต้องการค้นหา"
                                        searchablePlaceholderTextColor="gray"
                                        seachableStyle={{}}
                                        labelStyle={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        searchableError={() => <Text style={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}>ไม่พบข้อมูล</Text>}
                                        items={this.state.ProvinceData}
                                        defaultValue={this.state.ProvinceSelected}
                                        style={[styles.shadow, styles.dropdownWithIcon, { 
                                            justifyContent: 'space-between',
                                            alignSelf: 'center', 
                                        }]}
                                        dropDownMaxHeight={300}
                                        dropDownStyle={{
                                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                            borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                            elevation: 5,
                                        }}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                            elevation: 5,
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        placeholder="กรุณาเลือกจังหวัด"
                                        onChangeItem={ item => {
                                            this.LoadDistrict(item.value)
                                            this.setState({ProvinceSelected : item.value})
                                        }}
                                    />
                                    
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={{ flex:1,flexDirection:'row', alignItems: 'center' }}>
                                <View style={{   flex: 0.95 }}>
                                    <DropDownPicker
                                        zIndex={5000}
                                        searchable={true}
                                        searchablePlaceholder="กรอกชื่ออำเภอที่ต้องการค้นหา"
                                        searchablePlaceholderTextColor="gray"
                                        seachableStyle={{}}
                                        labelStyle={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        searchableError={() => <Text style={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}>ไม่พบข้อมูล</Text>}
                                        items={this.state.DistrictData}
                                        defaultValue={this.state.DistrictSelected}
                                        style={[styles.shadow, styles.dropdownWithIcon, { 
                                            justifyContent: 'space-between',
                                            alignSelf: 'center', 
                                        }]}
                                        dropDownMaxHeight={300}
                                        dropDownStyle={{
                                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                            borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                            elevation: 5,
                                        }}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                            elevation: 5,
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        placeholder="กรุณาเลือกอำเภอ"
                                        onChangeItem={ item => {
                                            this.LoadSubDistrict(item.value)
                                            this.setState({DistrictSelected : item.value})
                                        }}
                                    />
                                    
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            
                            <View style={{ flex:1,flexDirection:'row', alignItems: 'center' }}>
                                <View style={{   flex: 0.95 }}>
                                    <DropDownPicker
                                        zIndex={5000}
                                        searchable={true}
                                        searchablePlaceholder="กรอกชื่อตำบลที่ต้องการค้นหา"
                                        searchablePlaceholderTextColor="gray"
                                        seachableStyle={{}}
                                        labelStyle={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        searchableError={() => <Text style={{
                                            color: primaryColor,
                                            fontSize:16
                                        }}>ไม่พบข้อมูล</Text>}
                                        items={this.state.SubDistrictData}
                                        defaultValue={this.state.SubDistrictSelected}
                                        style={[styles.shadow, styles.dropdownWithIcon, { 
                                            justifyContent: 'space-between',
                                            alignSelf: 'center', 
                                        }]}
                                        dropDownMaxHeight={300}
                                        dropDownStyle={{
                                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                            borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                            elevation: 5,
                                        }}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                            elevation: 5,
                                            color: primaryColor,
                                            fontSize:16
                                        }}
                                        placeholder="กรุณาเลือกตำบล"
                                        onChangeItem={ item => {
                                            this.setState({ 
                                                SubDistrictSelected : item.value,
                                                Zipcode : item.zipcode
                                            })
                                        }}
                                    />
                                    
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor,textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start' }]}>{'รหัสไปรษณีย์ : '}</Text>
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


                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.phone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.phone}
                                        maxLength={10} 
                                        keyboardType='phone-pad'
                                        onChangeText={(text) => this.setState({ phone: text.replace(/[^0-9\-]+/g, '') })} />
                                </View>
                                <Icon name='edit' size={20} color={primaryColor} />
                            </View>

                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'อีเมล์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.email = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.email}
                                        keyboardType={'email-address'}
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
                            </View>



                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลเจ้าหน้าที่บัญชี`}</Text>
                            <View style={[styles.containerRow, { alignItems: 'center' }]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
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
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', flex: 0.95 }]}>
                                    <Text style={[styles.text16, { color: primaryColor }]}>{'เบอร์โทรศัพท์ : '}</Text>
                                    <TextInput
                                        ref={(input) => { this.accountphone = input; }}
                                        style={[styles.text16, { flex: 1, color: primaryColor, textAlign: 'left' }]}
                                        returnKeyType={'next'}
                                        value={this.state.accountphone}
                                        maxLength={10} 
                                        keyboardType='phone-pad'
                                        onChangeText={(text) => this.setState({ accountphone: text.replace(/[^0-9\-]+/g, '') })} />
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

                            <TouchableOpacity
                                style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('Categoryscreen', {
                                            typeId: this.state.type_id,
                                            RegisType : 'ProfileCompany'
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
                            <Text style={[styles.text12, { color: primaryColor,paddingTop:5, paddingLeft: 20 }]}>{`*หมายเหตุ ถ้าท่านต้องเปลี่ยนประเภทสินค้าที่ต้องการขาย\n กรุณาติดต่อเจ้าหน้าที่`}</Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            {/* <Text style={[styles.text14, {textDecorationLine : 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text> */}
                            <OpenURLButton url={this.state.privacy_url} fontSize={14}>{'ข้อตกลงและเงื่อนไขในการจองตลาด'}</OpenURLButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompanyScreen)