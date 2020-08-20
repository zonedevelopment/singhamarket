import React from 'react'
import {
    View,
    Text,
    Image,
    Linking,
    FlatList,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

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
    QRCODECREATE
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    generateOauthToken
} from '../actions'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentChannelScreen extends React.Component {

    state = {
        qrBase64: '',
        errMessage: ''
    }

    gatewayAuthorize = () => {
        Helper.getSCBApi(AUTHORIZE, {headers: AUTHORIZEHEADER}, (results) => {
            console.log(results)
            let status = results.status
            let data   = results.data
            let callbackUrl = ""
            if (status.code == 1000) {
                // callbackUrl = data.callbackUrl
                Linking.openURL(data.callbackUrl);
            }
        })
    }

    generateQRcode = async () => {
        await this.props.openIndicator()
        await this.props.generateOauthToken()
        console.log(this.props.reducer.oauthtoken)

        let CREATEQRHEADER = {
            'content-type': 'application/json',
            'resourceOwnerId': APIKEY,
            'authorization': 'Bearer ' + this.props.reducer.oauthtoken.accessToken,
            'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
            'accept-language': 'TH'
        }

        let data = {
            "qrType": "PP",
            "ppType": "BILLERID",
            "ppId": "227843582030123",
            "amount": 1.00,
            "ref1": "SPM202008000001",
            "ref2": "SPM202008000001",
            "ref3": "SPM"
        }

        await Helper.post(QRCODECREATE, JSON.stringify(data), CREATEQRHEADER, (results) => {
            console.log(results)
            let res = results.status
            this.props.dismissIndicator()
            if (res.code == 1000) {
                let data = results.data
                this.setState({ qrBase64: data.qrImage })
            } else {
                this.setState({ errMessage: res.description })
            }
        })
    }

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <TouchableOpacity key={index} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}
    //             onPress={() => {
    //                     if (index == 1) {
    //                         this.generateQRcode()
    //                     } else {
    //                         this.gatewayAuthorize()
    //                     }
    //                 }
    //             }>
    //             <Image source={item.channel_icon} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
    //             <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`${item.channel_name}`}</Text>
    //             <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
    //                 <Icon name='chevron-right' size={14} color={primaryColor} />
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                                                    this.generateQRcode()
                                                } else {
                                                    this.gatewayAuthorize()
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
                                    <View style={{ padding: 10 }}>
                                        <Image source={{uri: `data:image/png;base64,${this.state.qrBase64}`}} style={{width: 200, height: 200, resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ padding: 10 }}>
                                        <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}>
                                            <Text style={[styles.text16, { color: '#FFF' }]}>{`บันทึกคิวอาร์โค้ด`}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                        }
                        
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                        <Text style={[styles.text16, styles.bold, { flex: 0.6, color: 'white' }]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                        <Text style={[styles.text16, styles.bold, { flex: 0.4, color: 'white', textAlign: 'right' }]}>{`5,500 บาท`}</Text>
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