import React from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    Linking,
    FlatList,
    Platform,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'
var RNFS = require('react-native-fs')
import moment from 'moment'
import { connect } from 'react-redux'
import ViewShot from "react-native-view-shot"
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import CameraRoll from "@react-native-community/cameraroll"
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
    HEADERFORMDATA
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    generateOauthToken,
    setTransactionSelected
} from '../actions'

import styles from '../style/style'
import Helper from '../utils/Helper'




const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentQRCodeScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        qrBase64: '',
        errMessage: '',
        booking_id: [],
        amount: 0,
        permission: '',
        capimage: '',


        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        total_final_price: 0,
        discount_coupon : '',
        BoothCount : 0,
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


        formData.append('partners_id', that.props.reducer.userInfo.partners_id)
        formData.append('channel', 'QRCODE')
        formData.append('booking_id', JSON.stringify(that.state.booking_id))
        Helper.post(BASE_URL + CREATE_TRANSACTION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CREATE_TRANSACTION_URL', results)
            if (results.status == 'SUCCESS') {
                let TransID = results.TransID;
                this.props.setTransactionSelected(TransID)
                that.generateQRcode({
                    "qrType": "PP",
                    "ppType": "BILLERID",
                    "ppId": "227843582030123",
                    // "amount": numeral(that.state.amount).format('0.00'),
                    "amount": numeral(1).format('0.00'),
                    "ref1": TransID,
                    "ref2": that.props.reducer.userInfo.partners_id,
                    "ref3": "GFD"
                });
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        });
    }

    generateQRcode = (data) => {
        this.props.generateOauthToken()
        console.log(this.props.reducer.oauthtoken)
        let CREATEQRHEADER = {
            'content-type': 'application/json',
            'resourceOwnerId': APIKEY,
            'authorization': 'Bearer ' + this.props.reducer.oauthtoken.accessToken,
            'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
            'accept-language': 'EN'
        }

        console.log(data)
        let that = this;
        Helper.post(QRCODECREATE, JSON.stringify(data), CREATEQRHEADER, (results) => {
            console.log(results)
            let res = results.status
            that.props.dismissIndicator()
            if (res.code == 1000) {
                let data = results.data
                that.setState({ qrBase64: data.qrImage })
            } else {
                Alert.alert(res.description)
                that.setState({ errMessage: res.description })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`คิวอาร์โค่ดพร้อมเพย์/ Mobile Banking`}</Text>
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

    async componentDidMount() {
        const { amount,area_item ,total_other_service,vat,discount_price ,qrBase64} = this.props.route.params
        this.setState({
            amount: amount ,
            area_item : area_item,
            total_other_service : total_other_service,
            vat : vat,
            discount_price : discount_price,
            booking_id: this.props.reducer.booking_selected,
            qrBase64 : qrBase64
        })
        // this.props.generateOauthToken()
        // this.CreateTransactionQRCode()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                        `${this.state.permission}`,
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

    ScreenFunction = (value) => {
        // await this.setState({ capimage: value })
        // await CameraRoll.saveToCameraRoll(value, 'photo')
        this.props.openIndicator()
        const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
       /// const newFilepath = `${RNFS.ExternalStorageDirectoryPath}/${newImageName}`;
        const newFilepath = `${RNFS.DocumentDirectoryPath }/${newImageName}`;
        RNFS.writeFile(newFilepath, value, 'base64').then((success) => {
            Alert.alert(
                'สำเร็จ',
                'บันทึกภาพแล้ว',
                [
                    { text: 'ตกลง', onPress: () => alert(JSON.stringify(success)) },
                ],
                { cancelable: false }
            )
          })
          .catch((err) => {
            console.log(err.message);
            Alert.alert(
                'ไม่สำเร็จ',
                err.message,
                [
                    { text: 'ตกลง', onPress: () => null },
                ],
                { cancelable: false }
            )
          });

        // const imageMoved = await moveAttachment(value, newFilepath);
        // if (imageMoved) {
        //     Alert.alert(
        //         'สำเร็จ',
        //         'บันทึกภาพแล้ว',
        //         [
        //             { text: 'ตกลง', onPress: () => null },
        //         ],
        //         { cancelable: false }
        //     )
        // }
        this.props.dismissIndicator()
    }


    render() {

        const props = this.props.reducer
        const channel = props.paymentChannel

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
                <View style={[{ alignItems: 'center' }]}>
                    <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.5 }]}>
                        {
                            this.state.qrBase64 != '' ?
                                <View style={[styles.container, styles.center]} >
                                    <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1, alignItems: 'center' }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ padding: 10, backgroundColor: 'white' }}>
                                            <Image source={{ uri: `data:image/png;base64,${this.state.qrBase64}` }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                        </View>
                                    </ViewShot>
                                    <View style={{ padding: 10 }}>
                                        <TouchableOpacity style={[styles.mainButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                            onPress={() => this.captureQR()}>
                                            <Text style={[styles.text16, { color: '#FFF' }]}>{`บันทึกคิวอาร์โค้ด`}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                        }

                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: 'red' }}>{
                                this.state.errMessage != '' ? this.state.errMessage : ''
                            }</Text>
                        </View>
                    </View>
                  
                          
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                        <Text style={[styles.text16, styles.bold, { flex: 0.6, color: 'white' }]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                        <Text style={[styles.text16, styles.bold, { flex: 0.4, color: 'white', textAlign: 'right' }]}>{numeral(this.state.amount).format('0,0.00') + ` บาท`}</Text>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentQRCodeScreen)