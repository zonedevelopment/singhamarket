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
    generateOauthToken
} from '../actions'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentChannelScreen extends React.Component {

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

    getOauthToken = async () => {
        // let data = {
        //     "applicationKey" : APIKEY,
        //     "applicationSecret" : APISECRET
        // }

        // Helper.post(TOKEN, JSON.stringify(data), OAUTHTOKENHEADER, (results) => {
        //     console.log(results)
        // })
        await this.props.generateOauthToken()
        console.log(this.props.reducer.oauthtoken)

        let CREATEQRHEADER = {
            'content-type': 'application/json',
            'resourceOwnerId': APIKEY,
            'authorization': 'Bearer ' + this.props.reducer.oauthtoken.accessToken,
            'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
            'accept-language': 'TH'
        }

        console.log(CREATEQRHEADER)

        let data = {
            "qrType": "PP",
            "ppType": "227843582030123",
            "ppId": "227843582030123",
            "amount": 1.00,
            "ref1": "REFERENCE1",
            "ref2": "REFERENCE2",
            "ref3": "SPM"
        }

        await Helper.post(QRCODECREATE, JSON.stringify(data), CREATEQRHEADER, (results) => {
            console.log(results)
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}
                onPress={() => {
                    this.getOauthToken()
                        // if (index == 1) {
                        //     this.getOauthToken()
                        // } else {
                        //     this.gatewayAuthorize()
                        // }
                    }
                }>
                <Image source={item.channel_icon} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`${item.channel_name}`}</Text>
                <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                    <Icon name='chevron-right' size={14} color={primaryColor} />
                </View>
            </TouchableOpacity>
        )
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer
        const chennal = props.paymentChannel

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
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.text20, { color: 'white' }]}>{`เลือกช่องทางการชำระเงิน`}</Text>
                    <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.5 }]}>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={chennal}
                            keyExtractor={(item) => item.channel_id}
                            renderItem={this._renderItem} />
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
    generateOauthToken
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentChannelScreen)