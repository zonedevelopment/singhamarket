import React from 'react'
import {
    View,
    Text,
    Alert,
    // Image,
    Linking,
    FlatList,
    Platform,
    AppState,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
var RNFS = require('react-native-fs')
import ViewShot from "react-native-view-shot"
import { request, check, PERMISSIONS, RESULTS, checkNotifications, requestNotifications, requestMultiple } from 'react-native-permissions'

import Icon from 'react-native-vector-icons/dist/FontAwesome'
import CameraRoll from "@react-native-community/cameraroll"
import DeviceInfo from 'react-native-device-info'
import Image from 'react-native-fast-image'
var numeral = require('numeral');
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    AUTHORIZE,
    TOKEN,
    OAUTHTOKENHEADER,
    APIKEY,
    APISECRET,
    AUTHORIZEHEADER,
    QRCODECREATE,
    CREATE_TRANSACTION_URL,
    BASE_URL,
    GET_CONFIRMRESERVATION_URL,
    HEADERFORMDATA,
    BILLER_ID,
    REQUESTUID,
    REF3,
    GET_PAYMENT_CHANNEL_URL,
    emptyColor,
    redColor
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    generateOauthToken,
    setTransactionSelected
} from '../actions'

import styles from '../style/style'
import Helper from '../utils/Helper'

const moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
        RNFS.moveFile(filePath, newFilepath)
            .then(() => {
                resolve(true);
            }).catch(error => {
                Alert.alert(
                    'พบข้อผิดพลาด',
                    `${error}`,
                    [
                        { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
                reject(error);
            });
    });
};

import ic_credit_card from '../assets/image/icon_creditcard.png'
import ic_banking from '../assets/image/icon_paymeny.png'
const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentChannelScreen extends React.Component {
    backHandlerSubscription = null
    appStateSubscription = null


    state = {
        qrBase64: '',
        errMessage: '',
        booking_id: [],
        charge_id: [],
        amount: 0,
        permission: '',
        capimage: '',


        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        total_final_price: 0,
        discount_coupon: '',
        BoothCount: 0,
        charge_total : 0,

        appState: '',

        paymentChannel : [],

        ListBooking :[],
        ListCharge : [],

        qrExpire : '',
    }

    captureQR = async () => {
        if (Platform.OS === "android") {
            if (Platform.Version >= 23) {
                this.onCapture();
            } else {
                this.refs.viewShot.capture().then(uri => {
                    this.ScreenFunction(uri)
                });
            }
        } else {
            this.refs.viewShot.capture().then(uri => {
                this.ScreenFunction(uri)
            });
        }
    }

    onCapture = async () => {
        try {
            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
                if (result == 'granted') {
                    this.refs.viewShot.capture().then(uri => {
                        this.ScreenFunction(uri)
                    });
                } else {
                    Alert.alert(
                        'คำเตือน',
                        `กรุณาให้สิทธ์การเข้าถึง เพื่อบันทึกภาพ`,
                        [
                            {
                                text: 'ตกลง', onPress: () => {

                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
            });
        } catch (err) {
            Alert.alert(
                'พบข้อผิดพลาด',
                `${err}`,
                [
                    { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    }

    LoadPaymentChannel = () => {
        this.props.openIndicator()
        Helper.post(BASE_URL + GET_PAYMENT_CHANNEL_URL, null, HEADERFORMDATA, (results) => {
            console.log('GET_PAYMENT_CHANNEL_URL', results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    paymentChannel : results.data
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        });
    }

    ScreenFunction = async (value) => {
        // await this.setState({ capimage: value })
        await CameraRoll.saveToCameraRoll(value, 'photo')
        // this.props.openIndicator()
        // const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
        // const newFilepath = `${RNFS.ExternalStorageDirectoryPath}/${newImageName}`;
        // const imageMoved = await moveAttachment(value, newFilepath);
        // if (imageMoved) {
        await Alert.alert(
            'สำเร็จ',
            'บันทึกภาพแล้ว',
            [
                { text: 'ตกลง', onPress: () => null },
            ],
            { cancelable: false }
        )
        // }
        // this.props.dismissIndicator()
    }

    CreateTransactionQRCode = () => {
        this.props.setTransactionSelected('')
        this.props.openIndicator()
        let that = this;
        let formData = new FormData();
        formData.append('amount', that.state.amount)
        formData.append('service_charge', 0)

        formData.append('amount_area', this.state.area_item)
        formData.append('amount_accessoire', this.state.total_other_service)
        formData.append('vat_company', this.state.vat)
        formData.append('amount_discount', this.state.discount_price)

        formData.append('access_token', this.props.reducer.oauthtoken.accessToken)

        formData.append('partners_id', that.props.reducer.userInfo.partners_id)
        formData.append('channel', 'QRCODE')
        formData.append('booking_id', JSON.stringify(that.state.booking_id))
        formData.append('charge_id', JSON.stringify(that.state.charge_id))
        Helper.post(BASE_URL + CREATE_TRANSACTION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CREATE_TRANSACTION_URL', results)
            if (results.status == 'SUCCESS') {
                let TransID = results.TransID;
                this.props.setTransactionSelected(TransID)
                that.generateQRcode({
                    "qrType": "PP",
                    "ppType": "BILLERID",
                    "ppId": BILLER_ID,
                    "amount": numeral(that.state.amount).format('0.00'),
                    "ref1": TransID,
                    "ref2": that.props.reducer.userInfo.partners_id,
                    "ref3": REF3,
                    "numberOfTime":1,
                    "expiryDate": results.expiryDate,
                });
                that.setState({
                    qrExpire : results.expiryDate,
                })
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
                this.setState({
                    qrExpire : '',
                })
                this.props.navigation.goBack()
            }
        });
    }

    CreateTransaction2C2P() {
        this.props.setTransactionSelected('')
        this.props.openIndicator()
        let that = this;
        let amount_service = parseFloat(that.state.amount) * (parseFloat(that.props.reducer.ChargeService2C2P) / 100)
        let amount_total = parseFloat(that.state.amount) + parseFloat(amount_service)
        let formData = new FormData();
        formData.append('amount', that.state.amount)
        formData.append('service_charge', amount_service)

        formData.append('amount_area', this.state.area_item)
        formData.append('amount_accessoire', this.state.total_other_service)
        formData.append('vat_company', this.state.vat)
        formData.append('amount_discount', this.state.discount_price)

        formData.append('access_token', '')

        formData.append('partners_id', that.props.reducer.userInfo.partners_id)
        formData.append('channel', '2C2P')
        formData.append('booking_id', JSON.stringify(that.state.booking_id))
        formData.append('charge_id', JSON.stringify(that.state.charge_id))
        Helper.post(BASE_URL + CREATE_TRANSACTION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CREATE_TRANSACTION_URL', results)
            if (results.status == 'SUCCESS') {
                let TransID = results.TransID;
                this.props.setTransactionSelected(TransID)
                this.props.dismissIndicator()
                that.props.navigation.navigate('PaymentDirect', {
                    amount: amount_total,
                    booking_id: that.state.booking_id,
                    TransID: TransID,
                    partners_id: that.props.reducer.userInfo.partners_id
                })
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
                this.props.navigation.goBack()
            }
        });
    }

    generateQRcode = async (data) => {
        await this.props.generateOauthToken()
        let CREATEQRHEADER = {
            'content-type': 'application/json',
            'resourceOwnerId': APIKEY,
            'authorization': 'Bearer ' + this.props.reducer.oauthtoken.accessToken,
            'requestUId': REQUESTUID,
            'accept-language': 'EN'
        }
        Helper.post(QRCODECREATE, JSON.stringify(data), CREATEQRHEADER, (results) => {
            console.log('QRCODECREATE', results)
            let res = results.status
            if (res.code == 1000) {
                this.setState({ qrBase64: results.data.qrImage })
            } else {
                Alert.alert(res.description)
                this.setState({ errMessage: res.description })
            }
            this.props.dismissIndicator()
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ช่องทางการชำระเงิน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.LoadSummary()
        }
        console.log(nextAppState)
        this.setState({ appState: nextAppState })
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    };

    componentWillUnmount() {
        if (this.appStateSubscription) {
            this.appStateSubscription.remove();
            this.appStateSubscription = null;
        }
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    async componentDidMount() {
        await this.props.generateOauthToken()
        await this.setState({
            booking_id: this.props.reducer.booking_selected,
            charge_id: this.props.reducer.charge_selected
        })
        await this.LoadSummary()
        await this.LoadPaymentChannel()
        this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadSummary = () => {
        let BookingID = this.props.reducer.booking_selected
        let ChargeID = this.props.reducer.charge_selected
        const props = this.props
        const reducer = props.reducer
        let formData = new FormData();
        formData.append('partners_id', this.props.reducer.userInfo.partners_id)
        formData.append('booking_id', JSON.stringify(BookingID))
        formData.append('charge_id', JSON.stringify(ChargeID))
        this.props.openIndicator()
        Helper.post(BASE_URL + GET_CONFIRMRESERVATION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('GET_CONFIRMRESERVATION_URL', results)
            if (results.status == 'SUCCESS') {
                let total_area = 0
                let area_item = 0
                let total_other_service = 0
                let discount_price = 0
                let vat = 0
                let vat_cut = 0;
                let total_final_price = 0
                let total_Charge = 0
                let arrBooking = []
                ///// ค่าจอง
                results.data.Cart.map((vBooking, iBooking) => {
              //      console.log('vBooking', vBooking)
                    total_area += parseFloat(vBooking.booking_total)
                    area_item += vBooking.Booking_Details.length
                    discount_price += parseFloat(vBooking.booking_coupon)

                    if(vBooking.booking_total == 0){ /// ค่าปรับล่าช้า
                        total_Charge += parseFloat(vBooking.booking_service_total)
                    }else{ // อุปกรณ์เสริมปกติ
                        total_other_service += parseFloat(vBooking.booking_service_total)
                    }
                    
                    vBooking.Booking_Details.map((v,i)=>{
                        arrBooking.push(v)
                    })
                })
                if (reducer.userInfo.partners_type == 1) {/// บุคคลธรรมดา
                    // vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.personal_vat / 100
                    total_final_price = parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)
                } else { /// นิติบุคคล
                    // vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.company_vat / 100
                    vat_cut = (parseFloat(total_area) - (parseFloat(total_area) * 7) / 107)
                    vat = (parseFloat(vat_cut) - parseFloat(discount_price)) * reducer.company_vat / 100
                    total_final_price = (parseFloat(total_area) - parseFloat(vat)) + parseFloat(total_other_service) - parseFloat(discount_price)
                }
                total_final_price = total_final_price + total_Charge


                //// ค่าปรับ
                results.data.Charge.map((vCharge, iCharge) => {
                    console.log('Charge',vCharge)
                    total_Charge += parseFloat(vCharge.audit_charge_total)
                    total_final_price += parseFloat(vCharge.audit_charge_total)
                })

                this.setState({
                    ListBooking : arrBooking,
                    ListCharge : results.data.Charge,
                    charge_total : total_Charge,
                    total_area: total_area,// - ((total_area * 7) / 107),
                    area_item: area_item,
                    total_other_service: total_other_service,
                    discount_price: discount_price,
                    vat: vat,
                    total_final_price: total_final_price,
                    amount: total_final_price,
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    render() {

        const props = this.props.reducer
        const channel = this.state.paymentChannel//props.paymentChannel

        return (
            <View style={[styles.container, { backgroundColor: primaryColor }]}>

                <View style={[{ alignItems: 'center' }]}>
                    <Text style={[styles.text20, { color: 'white' }]}>{`เลือกช่องทางการชำระเงิน`}</Text>
                    <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.3 }]}>
                        {
                            channel.map((v, i) => {
                                return (
                                        <TouchableOpacity key={i} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}
                                            onPress={() => {
                                                if (v.channel_code == "QRCODE") {
                                                    this.CreateTransactionQRCode()
                                                } else {
                                                    this.CreateTransaction2C2P()
                                                }
                                            }
                                            }>
                                            <Image source={i == 1 ? ic_credit_card : ic_banking } style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                                            <Text style={[styles.text14, { flex: 0.8, color: primaryColor }]}>{`${v.channel_name}`}</Text>
                                            <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                                <Icon name='chevron-right' size={14} color={primaryColor} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                            })
                        }


                        <ScrollView>
                            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1 /*, alignItems: 'center'*/ }} style={{ padding:2,flex: 1,backgroundColor:'#FFFFFF'}} >
                                <View style={[styles.marginBetweenVertical]}></View>
                                {
                                    this.state.ListBooking.map((valueBooking, i) => {
                                        return (
                                            <View>
                                                <View style={[styles.containerRow,{paddingLeft:10,paddingRight:10}]}>
                                                    <View style={{ flex: 0.17 }}>
                                                        <View style={[styles.center, { width: 45, height: 45, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                                            <Text style={[styles.text12, { textAlign: 'center', flexWrap: 'wrap' }]}>{valueBooking.boothname}</Text>
                                                        </View>
                                                    </View>
                                                    {
                                                        valueBooking.booth_detail_id != 0 ?
                                                        <View style={{ flex: 0.83 , justifyContent: 'center'}}>
                                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                                <Text style={[styles.text14]}>{`วันที่ขาย ` + moment(valueBooking.booking_detail_date).format('LL')}</Text>
                                                            </View>
                                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                                <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                                                                <Text style={[styles.text14]}>{numeral(valueBooking.boothprice).format('0,0.00') + ` บาท`}</Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={{ flex: 0.83 , justifyContent: 'center'}}>
                                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                                <Text style={[styles.text14]}>{`บูธเรียกเก็บพิเศษ`}</Text>
                                                            </View>
                                                            {
                                                                valueBooking.Service.map((vService, iService) => {
                                                                    return (
                                                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                                            <Text style={[styles.text14]}>{vService.service_name + ' x' + vService.qty}</Text>
                                                                            <Text style={[styles.text14]}>{numeral(parseFloat(vService.service_item_price) * parseFloat(vService.qty)).format('0,0.00') + ` บาท`}</Text>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    }
                                                    
                                                </View>
                                                <View style={[styles.marginBetweenVertical]}></View>
                                            </View>
                                        )
                                    })
                                }

                                {
                                    this.state.ListCharge.map((vCharge, i) => {
                                        return ( 
                                            <View>
                                                <View style={[styles.containerRow,{paddingLeft:10,paddingRight:10}]}>
                                                    <View style={{ flex: 0.17 }}>
                                                        <View style={[styles.center, { width: 45, height: 45, backgroundColor: redColor, borderRadius: 10 }]}>
                                                            <Text style={[styles.text12, { color:'white',textAlign: 'center', flexWrap: 'wrap' }]}>{vCharge.booth_name}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 0.83 }}>
                                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                            <Text style={[styles.text14]}>{`วันที่ขาย ` + moment(vCharge.booking_detail_date).format('LL')}</Text>
                                                        </View>
                                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                            <Text style={[styles.text14]}>{`ราคาค่าปรับ`}</Text>
                                                            <Text style={[styles.text14]}>{numeral(vCharge.audit_charge_total).format('0,0.00') + ` บาท`}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[styles.marginBetweenVertical]}></View>
                                            </View>
                                        )
                                    })
                                }
                                            
                                {
                                    this.state.qrBase64 != '' ?
                                        <View style={[styles.container, styles.center]} >
                                            {/* <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1, alignItems: 'center' }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
                                                <View style={{ padding: 10, backgroundColor: 'white' }}>
                                                    <Image source={{ uri: `data:image/png;base64,${this.state.qrBase64}` }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                                </View>
                                            {/* </ViewShot> */}
                                        </View>
                                        :
                                        <View style={{ height: 160 }}></View>
                                }
                              
                                {
                                    this.props.reducer.userInfo.partners_type == 1 ? //// บุคคลธรรมดา
                                        <View style={[{flex:1,paddingLeft:10,paddingRight:10}]}>
                                            <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + this.state.area_item}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.total_area).format('0,0.00') + ' บาท'}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`โค้ดส่วนลด`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.discount_price).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าบริการเสริม`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.total_other_service).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าปรับ`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.charge_total).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16, styles.bold]}>{`ยอดที่ต้องชำระ(รวม Vat ` + this.props.reducer.personal_vat + `%)`}</Text>
                                                <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            
                                        </View>
                                        : //// นิติบุคคล
                                        <View style={[styles.container,{paddingLeft:10,paddingRight:10}]}>
                                            <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + this.state.area_item}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.total_area).format('0,0.00') + ' บาท'}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`โค้ดส่วนลด`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.discount_price).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าบริการเสริม`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.total_other_service).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            {/* <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                                <Text style={[styles.text16]}>{`ยอดรวม Vat ` + this.props.reducer.personal_vat + `%`}</Text>
                                                <Text style={[styles.text16]}>{numeral(parseFloat(this.state.total_final_price) + parseFloat(this.state.vat)).format('0,0.00') + ` บาท`}</Text>
                                            </View> */}
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`ค่าปรับ`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.charge_total).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`นิติบุคคลหักภาษี ณ ที่จ่าย ` + this.props.reducer.company_vat + `%`}</Text>
                                                <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16, styles.bold]}>{`ยอดที่ต้องชำระ`}</Text>
                                                <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            
                                        </View>
                                        
                                }
                                {
                                    this.state.qrBase64 != '' ?
                                        <View style={[styles.containerRow,{paddingLeft:10,paddingRight:10}]}>
                                            <Text style={[styles.text14,{color:'red'}]}>{`*กรุณาทำรายการภายในระยะเวลา ` + moment(this.state.qrExpire).format('LT') + ` น.`}</Text>
                                        </View>
                                    :
                                        <View></View>
                                }
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'red' }}>{
                                        this.state.errMessage != '' ? this.state.errMessage : ''
                                    }</Text>
                                </View>
                            </ViewShot>

                            {
                                this.state.qrBase64 != '' ?
                                    <View style={[styles.container, styles.center]} >
                                        <View style={{ padding: 10 }}>
                                            <TouchableOpacity style={[styles.mainButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                                onPress={() => this.captureQR()}>
                                                <Text style={[styles.text16, { color: '#FFF' }]}>{`บันทึกคิวอาร์โค้ด`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <View></View>
                            }



                        </ScrollView>

                    </View>


                    {/* <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                        <Text style={[styles.text16, styles.bold, { flex: 0.6, color: 'white' }]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                        <Text style={[styles.text16, styles.bold, { flex: 0.4, color: 'white', textAlign: 'right' }]}>{numeral(this.state.amount).format('0,0.00') + ` บาท`}</Text>
                    </View> */}
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
    generateOauthToken,
    setTransactionSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentChannelScreen)
