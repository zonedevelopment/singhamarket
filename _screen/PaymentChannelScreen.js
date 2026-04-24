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
import moment from 'moment'
import { connect } from 'react-redux'
var RNFS = require('react-native-fs')
import ViewShot from "react-native-view-shot"
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import CameraRoll from "@react-native-community/cameraroll"
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
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
    HEADERFORMDATA
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    generateOauthToken
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




const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentChannelScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        qrBase64: '',
        errMessage: '',
        booking_id: [],
        amount: 0,
        permission: '',
        capimage: ''
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

    ScreenFunction = async (value) => {
        // await this.setState({ capimage: value })
        // await CameraRoll.saveToCameraRoll(value, 'photo')
        this.props.openIndicator()
        const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
        const newFilepath = `${RNFS.ExternalStorageDirectoryPath}/${newImageName}`;
        const imageMoved = await moveAttachment(value, newFilepath);
        if (imageMoved) {
            Alert.alert(
                'สำเร็จ',
                'บันทึกภาพแล้ว',
                [
                    { text: 'ตกลง', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
        this.props.dismissIndicator()
    }

    CreateTransactionQRCode = () => {
        this.props.openIndicator()
        let that = this;
        let formData = new FormData();
        formData.append('amount', that.state.amount)
        formData.append('partners_id', that.props.reducer.userInfo.partners_id)
        formData.append('channel', 'qr code')
        formData.append('booking_id', JSON.stringify(that.state.booking_id))
        Helper.post(BASE_URL + CREATE_TRANSACTION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CREATE_TRANSACTION_URL', results)
            if (results.status == 'SUCCESS') {
                let TransID = results.TransID;
                that.generateQRcode({
                    "qrType": "PP",
                    "ppType": "BILLERID",
                    "ppId": "227843582030123",
                    "amount": numeral(that.state.amount).format('0.00'),
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

    CreateTransaction2C2P() {
        this.props.openIndicator()
        let that = this;
        let formData = new FormData();
        formData.append('amount', that.state.amount)
        formData.append('partners_id', that.props.reducer.userInfo.partners_id)
        formData.append('channel', 'qr code')
        formData.append('booking_id', JSON.stringify(that.state.booking_id))
        Helper.post(BASE_URL + CREATE_TRANSACTION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CREATE_TRANSACTION_URL', results)
            if (results.status == 'SUCCESS') {
                let TransID = results.TransID;
                that.props.navigation.navigate('PaymentDirect', {
                    amount: that.state.amount,
                    booking_id: that.state.booking_id,
                    TransID: TransID,
                    partners_id: that.props.reducer.userInfo.partners_id
                })
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

        // let data = {
        //     "qrType": "PP",
        //     "ppType": "BILLERID",
        //     "ppId": "227843582030123",
        //     "amount": total_final_price,
        //     "ref1": "SPM202008000001",
        //     "ref2": "SPM202008000001",
        //     "ref3": "SPM"
        // }
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
        const { total_final_price, booking_id } = this.props.route.params
        await this.setState({
            amount: total_final_price,
            booking_id: booking_id
        })
        await this.props.generateOauthToken()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer
        const channel = props.paymentChannel
        const { total_final_price, booking_id } = this.props.route.params

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
                    <Text style={[styles.text20, { color: 'white' }]}>{`เลือกช่องทางการชำระเงิน`}</Text>
                    <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.5 }]}>
                        {/* <FlatList
                            style={{ marginTop: 5, backgroundColor: 'black' }}
                            data={channel}
                            keyExtractor={(item) => item.channel_id}
                            renderItem={this._renderItem} /> */}
                        {
                            channel.map((v, i) => {
                                return (
                                    <TouchableOpacity key={i} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}
                                        onPress={() => {
                                            if (i == 1) {
                                                this.CreateTransactionQRCode()
                                            } else {
                                                //this.gatewayAuthorize()
                                                this.CreateTransaction2C2P()
                                            }
                                        }
                                        }>
                                        <Image source={v.channel_icon} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                                        <Text style={[styles.text14, { flex: 0.8, color: primaryColor }]}>{`${v.channel_name}`}</Text>
                                        <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                            <Icon name='chevron-right' size={14} color={primaryColor} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {
                            this.state.qrBase64 != '' ?
                                <View style={[styles.container, styles.center]} >
                                    <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1, alignItems: 'center' }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ padding: 10, backgroundColor: 'white' }}>
                                            <Image source={{ uri: `data:image/png;base64,${this.state.qrBase64}` }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                        </View>
                                    </ViewShot>
                                    <View style={{ padding: 10 }}>
                                        <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
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
                        <Text style={[styles.text16, styles.bold, { flex: 0.4, color: 'white', textAlign: 'right' }]}>{numeral(total_final_price).format('0,0.00') + ` บาท`}</Text>
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
    generateOauthToken
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentChannelScreen)