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
    TouchableOpacity, Alert
} from 'react-native'
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import { Picker } from "native-base"
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    greenColor,
    BASE_URL,
    pendingColor,
    reservColor,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA,
    alpaGreen,
    AUDIT_GET_DETAILS_VERIFY,
    GET_ACCESSOIRES_URL,
    redColor,
    CHECK_IN_HISTORY_URL,
    alpaYellow, AUDIT_CHECKED_SUBMIT_DETAILS,AUDIT_CUTING_SUBMIT
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class VerifyBoothScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        booking_detail_id : '',
        booking_id : '',
        booking_detail_date : '',
        booth_id : '',
        booth_name : '',
        partners_id : '',
        check_in_status : "N",

        CHK_SUCCESS : false,
        CHK_FAIL : false,
        DisabledTxtChkFail : false,
        TxtChkFail : "",
        DisabledRadioboxCharge:false,
        RadioSelected:false,
        dataImages : [],

        AccessoriesCharge  : [],
        tableBodyAccessory : [],
        ExtraService :  [],
        tableBodyProduct :  [],
        Fines : 0,

        ChargePrice : 0,
        TotalPrice : 0
    }

    componentWillUnmount() {
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        const { data} = this.props.route.params
        this.setState({
            booking_detail_id : data.booking_detail_id,
            booking_id :  data.booking_id,
            booking_detail_date :  data.booking_detail_date,
            booth_id :  data.booth_id,
            booth_name :  data.booth_name,
            partners_id : data.partners_id,
            check_in_status : data.check_in_status,
        })
        this.LoadData()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadAccrssoriesCharge () {
     //   this.props.openIndicator()
        Hepler.post(BASE_URL + GET_ACCESSOIRES_URL,null,HEADERFORMDATA,(results)=>{
            console.log('GET_ACCESSOIRES_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({AccessoriesCharge : results.data})
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }


    LoadData(){
        const { data} = this.props.route.params
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('booking_detail_id',data.booking_detail_id)
        formData.append('partners_id',data.partners_id)
        Hepler.post(BASE_URL + AUDIT_GET_DETAILS_VERIFY,formData,HEADERFORMDATA,(results) => {
            //alert(JSON.stringify(results))
            if (results.status == 'SUCCESS') {
                this.setState({
                    tableBodyAccessory : results.data.Accessories,
                    ExtraService : results.data.Accessories,
                    tableBodyProduct : results.data.Product,
                    Fines : results.data.Charge,
                })
                this.LoadAccrssoriesCharge()
              //  this.props.dismissIndicator()
            } else {
                this.props.dismissIndicator()
                Alert.alert(results.message)
            }
        })
    }


    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity  style={[styles.containerRow, { padding: 5, height: 50, margin: -4 }]}
            onPress={()=>{
                {
                    if(item.booth_status_id == 3){
                       // this.props.navigation.navigate('HomeBoothReportDetails')
                    }
                }
            }}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, margin: 4, backgroundColor: item.booth_status_id == 1 ? emptyColor : item.booth_status_id == 2 ? pendingColor : reservColor }}></View>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`${item.booth_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.50, backgroundColor: item.booking_status_background_color, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text16, { color: primaryColor, alignSelf: 'flex-start' }]}>{item.product_cate_name}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'center', alignItems: 'center', padding: 5 }]}>
                    <Icon name='check-square' size={25} color={item.checkin == true ? greenColor : grayColor} />
                    {
                        item.booth_status_id == 3 ? 
                        <Icon style={{paddingLeft:10}} name='chevron-right' size={20} color={grayColor} />
                        : 
                        null
                    }
                    
                </View>
            </TouchableOpacity>
        )
    }

       
    onSelectedPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        
        ImagePicker.launchCamera(options, (response) => { /// showImagePicker
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let Images = this.state.dataImages;
                let arr = {};
                arr["src"] = response.uri;
                arr["Base64"] = response.data;
                Images.push(arr);
                this.setState({
                    dataImages: Images,
                });
            }
        });
    }

    CheckInBooth(){
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('booking_detail_id',this.state.booking_detail_id)
        formData.append('partners_id',this.state.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + CHECK_IN_HISTORY_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_HISTORY_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                Alert.alert(  
                    '',  
                    results.message,  
                    [  
                        {text: 'OK', onPress: () => this.setState({check_in_status : 'Y'}) },  
                    ]  
                ); 
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }


    onSelectCharge(index, value){
        let Total = this.state.TotalPrice;
        if(value == true){
            Total = Total + parseInt(this.state.Fines);
        }else{
            Total = Total - parseInt(this.state.Fines);
        }
        this.setState({
            ChargePrice : value == true ? this.state.Fines : 0,
            RadioSelected : index,
            TotalPrice : Total,
        })
    }

    
    plusItem = (id) => {
        this.props.openIndicator()
        let arr = this.state.AccessoriesCharge;
        let index = arr.findIndex(k => k.service_id == id);
        let acc_price = arr[index].service_price;
        let price = parseInt(arr[index].total_price) + parseInt(acc_price);
        arr[index].selected_qty = parseInt(arr[index].selected_qty) + 1;
        arr[index].total_price = price;
        this.setState({
            AccessoriesCharge: arr,
            TotalPrice : parseInt(this.state.TotalPrice) + parseInt(acc_price),
        });
        this.props.dismissIndicator()
    }

    DelItem = (id) => {
        this.props.openIndicator()
        let arr = this.state.AccessoriesCharge;
        let index = arr.findIndex(k => k.service_id == id);
        if (arr[index].selected_qty > 0) {
            let acc_price = arr[index].service_price;
            let price = parseInt(arr[index].total_price) - parseInt(arr[index].service_price);
            arr[index].selected_qty = parseInt(arr[index].selected_qty) - 1;
            arr[index].total_price = price;
            this.setState({
                AccessoriesCharge: arr,
                TotalPrice : parseInt(this.state.TotalPrice) - parseInt(arr[index].service_price)
            });
        }
        this.props.dismissIndicator()
    }


    ValidateSubmit () {
        if(this.state.CHK_FAIL === false && this.state.CHK_SUCCESS === false){
            Alert.alert('กรุณาเลือกผลการประเมิน!')
        }else{
            Alert.alert(
                "ยืนยัน",
                'ยืนยันการบันทึกการประเมิน',
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
        }
    }

    onSubmit(){
        let resultCode = "";
        if(this.state.CHK_FAIL === true) resultCode = "20";
        if(this.state.CHK_SUCCESS === true) resultCode = "10";
        let Accessories = [];
        this.state.AccessoriesCharge.map((item, index) => {
            if(item.selected_qty > 0)
            {
                Accessories.push({
                    service_id : item.service_id,
                    qty : item.selected_qty,
                    price : item.total_price,
                });
            }
        });

        this.props.openIndicator()
        let formData = new FormData();
        formData.append('booking_detail_id',this.state.booking_detail_id)
        formData.append('partners_id',this.state.partners_id)
        formData.append('resultCode',resultCode)
        formData.append('mistake_note',this.state.TxtChkFail)
        formData.append('charge_price',this.state.ChargePrice)
        formData.append('total_price',this.state.TotalPrice)
        formData.append('accessories',JSON.stringify(Accessories))
        formData.append('member_id',this.props.reducer.userInfo.userid)
        formData.append('images', JSON.stringify(this.state.dataImages))
        Hepler.post(BASE_URL + AUDIT_CHECKED_SUBMIT_DETAILS,formData,HEADERFORMDATA,(results) => {
            console.log('AUDIT_CHECKED_SUBMIT_DETAILS',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.props.navigation.goBack()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    CutingBooth() {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('booking_detail_id',this.state.booking_detail_id)
        formData.append('partners_id',this.state.partners_id)
        formData.append('member_id',this.props.reducer.userInfo.userid)
        formData.append('booking_id', this.state.booking_id)
        Hepler.post(BASE_URL + AUDIT_CUTING_SUBMIT,formData,HEADERFORMDATA,(results) => {
            console.log('AUDIT_CUTING_SUBMIT',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.props.navigation.goBack()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <ScrollView style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow]}>
                        <View style={{flex:0.6}}>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text18, { color: secondaryColor }]}>{`เลขที่จอง ` + this.state.booking_id}</Text>
                            </View>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text14, { color: primaryColor }]}>{`Booth No. ` + this.state.booth_name}</Text>
                            </View>
                        </View>
                        <View style={{flex:0.2}}>
                            <TouchableOpacity style={[{ flex:1,backgroundColor: this.state.check_in_status == 'N' ? greenColor : grayColor, marginRight:5,justifyContent: 'center', alignItems: 'center', padding: 5,borderRadius:5 }]}
                                onPress={()=>{
                                    if(this.state.check_in_status == 'N'){
                                        Alert.alert(
                                            "ยืนยัน",
                                            'ยืนยันเช็คอิน',
                                            [
                                                {
                                                    text: "ยกเลิก",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "ตกลง", 
                                                    onPress: () => this.CheckInBooth()
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }else{
                                        Alert.alert('บูธนี้เช็คอินเรียบร้อยแล้ว')
                                    }
                                }}
                            >
                                <Text style={[styles.text12, {textAlign:'center', color: '#ddd' }]}>{`เช็คอินแทนผู้ขาย`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.2}}>
                            <TouchableOpacity style={[{ flex:1,backgroundColor: redColor, marginRight:5, justifyContent: 'center', alignItems: 'center', padding: 5,borderRadius:5 }]}
                                onPress={()=>{
                                    Alert.alert(
                                        "ยืนยัน",
                                        'ยืนยันการตัดบูธ',
                                        [
                                            {
                                                text: "ยกเลิก",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "ตกลง", 
                                                onPress: () => this.CutingBooth()
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }}
                            >
                                <Text style={[styles.text12, {textAlign:'center', color: '#ddd' }]}>{`ตัดบูธ`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.marginBetweenVertical]}></View>

                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 0.4, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`ประเภทสินค้า`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.6, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการสินค้า`}</Text>
                        </View>
                    </View>
                    {
                        this.state.tableBodyProduct.length > 0 ?
                            this.state.tableBodyProduct.map((data, index) => (
                                <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                                    <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                                        <Text style={[styles.text14, { color: primaryColor }]}>{data.product_cate_name}</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                                    <View style={[styles.containerRow, { flex: 0.6, justifyContent: 'flex-start',alignItems: 'center', padding: 5 }]}>
                                        <Text style={[styles.text14, { color: primaryColor}]}>{data.product_name}</Text>
                                    </View>
                                </View>
                            ))
                        :
                        <View style={[styles.containerRow,{ alignItems: 'center', justifyContent: 'center',borderWidth:0.5,borderColor:'#ddd', height: 50 }]}>
                            <Text>ไม่มีข้อมูลสินค้า</Text>
                        </View>
                    }


                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>

                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text16, { color: primaryColor }]}>{`บริการเสริม`}</Text>
                    </View>
                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 0.4, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการ`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`จำนวน/จุด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`ราคา/บาท`}</Text>
                        </View>
                    </View>

                    {
                        this.state.tableBodyAccessory.length > 0 ?
                            this.state.tableBodyAccessory.map((data, index) => (
                                <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                                    <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                                        <Text style={[styles.text14, { color: primaryColor }]}>{data.AccessoriesName}</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                                    <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                                        <Text style={[styles.text14, { color: primaryColor}]}>{data.Qty}</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                                    <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                                        <Text style={[styles.text14, { color: primaryColor}]}>{data.Price}</Text>
                                    </View>
                                </View>
                            ))
                        :
                        <View style={[styles.containerRow,{ alignItems: 'center', justifyContent: 'center',borderWidth:0.5,borderColor:'#ddd', height: 50 }]}>
                            <Text>ไม่มีบริการเสริม</Text>
                        </View>
                    }


                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 1, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`แบบประเมิน`}</Text>
                        </View>
                    </View>
                    <CheckBox
                        title={'ผ่านการประเมิน'}
                        textStyle={{fontSize:16}}
                        containerStyle={{backgroundColor:'white',borderWidth:0,padding:5,margin:0}}
                        checked={this.state.CHK_SUCCESS}
                        onPress={
                            () => {
                                this.setState({
                                    CHK_SUCCESS : this.state.CHK_SUCCESS == false ? true : false,
                                    CHK_FAIL : false,
                                    DisabledTxtChkFail : false,
                                    TxtChkFail : "",
                                });
                            }
                        }
                    />
                    <CheckBox
                        title={'ทำผิดกฏ'}
                        textStyle={{fontSize:16}}
                        containerStyle={{backgroundColor:'white',borderWidth:0,padding:5,margin:0}}
                        checked={this.state.CHK_FAIL}
                        onPress={
                            () => {
                                this.setState({
                                    CHK_FAIL : this.state.CHK_FAIL == false ? true : false,
                                    CHK_SUCCESS : false,
                                    DisabledTxtChkFail : this.state.CHK_FAIL == false ? true : false,
                                    TxtChkFail : "",
                                });
                            }
                        }
                    />

                    <View style={{ backgroundColor:"whitesmoke",borderColor:"#e3e3e3",borderWidth:1}}>
                        <Text style={{marginTop: 0,fontSize: 16,padding: 10}}>
                            {'บริการเสริม'}
                        </Text>
                        <View style={{padding:10}}>
                            <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                                <View style={{ flex: 0.4, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                                    <Text style={[styles.text16, { color: 'white' }]}>{`รายการ`}</Text>
                                </View>
                                <View style={{ width: 1, backgroundColor: 'white' }}></View>
                                <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                                    <Text style={[styles.text16, { color: 'white' }]}>{`จำนวน/จุด`}</Text>
                                </View>
                                <View style={{ width: 1, backgroundColor: 'white' }}></View>
                                <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                                    <Text style={[styles.text16, { color: 'white' }]}>{`ราคา/บาท`}</Text>
                                </View>
                            </View>
                            {
                                this.state.AccessoriesCharge.length > 0 ?
                                    this.state.AccessoriesCharge.map((data,index) => (
                                        <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd',backgroundColor:'white', height: 50}]}>
                                            <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                                                <Text style={[styles.text14, { color: primaryColor }]}>{data.service_name}</Text>
                                            </View>
                                            <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                                            <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'space-around',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                onPress={
                                                    () => {
                                                        this.DelItem(data.service_id);
                                                    }
                                                }>
                                                    <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                                                </TouchableOpacity>
                                                <Text style={{ marginLeft: 8, marginRight: 8, textAlignVertical: 'center' }}>{data.selected_qty}</Text>
                                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                onPress={
                                                    () => {
                                                        this.plusItem(data.service_id);
                                                    }
                                                }>
                                                    <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                                            <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                                                <Text style={[styles.text14, { color: primaryColor}]}>{data.total_price}</Text>
                                            </View>
                                        </View>
                                    ))
                                :
                                <View  style={[styles.containerRow, { alignItems: 'center', justifyContent: 'center', borderWidth:0.5,borderColor:'#ddd',backgroundColor:'white', height: 50}]}>
                                    <Text>ไม่มีบริการเสริม</Text>
                                </View>
                            }
                        </View>


                        <Text style={{marginTop: 0,fontSize: 16,padding: 10}}>{'ความเสียหาย'}</Text>
                        <View style={{paddingRight:10,paddingLeft:10,paddingBottom:10}}>
                            <TextInput
                            underlineColorAndroid='#FFFFFF'
                            placeholder="กรุณากรอกความเสียหาย"
                            value={this.state.TxtChkFail}
                            onChangeText={(text) => this.setState({TxtChkFail : text})}
                         //   editable={this.state.DisabledTxtChkFail}
                          //  selectTextOnFocus={this.state.DisabledTxtChkFail}
                            multiline={true}
                            numberOfLines={7}
                            style={{ textAlignVertical: 'top',borderColor:"#e3e3e3",borderWidth:1,fontSize:14,backgroundColor:"#FFFFFF",height:100}}/>
                        </View>

                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='gray'
                            style={{display: 'flex', flexDirection: 'row',paddingBottom:10 }}
                            activeColor={primaryColor}
                            selectedIndex={this.state.RadioSelected}
                            onSelect = {(index, value) => this.onSelectCharge(index, value)}
                            >
                                <RadioButton
                                    disabled={this.state.DisabledRadioboxCharge}
                                    value={false}
                                    color={primaryColor} >
                                    <Text>{'ไม่มีค่าใช้จ่าย'}</Text>
                                </RadioButton>
                                <RadioButton
                                    disabled={this.state.DisabledRadioboxCharge}
                                    value={true}
                                    color={primaryColor} >
                                    <Text>{'มีค่าใช้จ่าย'}</Text>
                                </RadioButton>
                            </RadioGroup>

                    </View>

                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ }}>
                        {
                            this.state.dataImages.length > 0 ?
                                <FlatList
                                    data={this.state.dataImages}
                                    renderItem={({ item }) => (
                                        <View style={{ flex: 1,flexDirection: 'column', margin: 5 }}>
                                            <FastImage style={{borderRadius:5,borderWidth:1,paddingLeft:5,paddingRight:5, height: 100,width:100, alignItems: 'center', justifyContent: 'center' }} 
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{ uri: item.src }} /> 
                                        </View>
                                    )}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}

                            /> : <View style={{alignItems:'center'}}><Text style={[styles.text16,{color:'red'}]}>ไม่มีรูปภาพ</Text></View>

                        }
                        <TouchableOpacity style={{borderRadius:5,borderWidth:0.5,borderColor:'#ddd',paddingLeft:5,paddingRight:5, height: 100,width:100, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.onSelectedPhoto();
                            }}
                        >
                            <Icon name='plus' size={20} color={primaryColor}/>
                            <Text style={{fontSize:14,fontWeight:"bold",color:primaryColor}}>
                                {`เพิ่มรูปภาพ`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.hr]}></View>
                    <View style={{ padding: 0, margin: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'flex-start' }}>จำนวนเงินลูกค้าที่ต้องชำระเพิ่ม</Text>
                        {
                            this.state.ChargePrice != 0 ?
                            <View style={{ flexDirection: 'row', margin: 6 }}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, alignSelf: 'flex-start' }}>ค่าปรับ</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, alignSelf: 'flex-end' }}>{this.state.ChargePrice} บ.</Text>
                                </View>
                            </View> : <View></View>
                        }

                   
                        {
                            this.state.AccessoriesCharge.map((item, index) => {
                                if(item.selected_qty > 0)
                                {
                                    return (
                                        <View style={{ flexDirection: 'row', margin: 6 }}>
                                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, alignSelf: 'flex-start' }}>{item.service_name}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, alignSelf: 'flex-end' }}>{item.total_price} บ.</Text>
                                            </View>
                                        </View> 
                                    )
                                }else{
                                    return (
                                        <View></View>
                                    )
                                }
                            })
                        }


                        <View style={{ flexDirection: 'row', margin: 6 }}>
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{  fontWeight: 'bold', fontSize: 18, alignSelf: 'flex-start' }}>ยอดที่ต้องชำระ</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Text style={{  fontWeight: 'bold', fontSize: 18, alignSelf: 'flex-end' }}>{this.state.TotalPrice} บ.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.containerRow,{alignItems: 'center',flex:1,marginBottom:20 }]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor,flex:1 }]}
                            onPress={
                                () => this.ValidateSubmit()
                            }
                            >
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`บันทึกผลการประเมิน`}</Text>
                        </TouchableOpacity>
                    </View>

                    
                </ScrollView>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBoothScreen)