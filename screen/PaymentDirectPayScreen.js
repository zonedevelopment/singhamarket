import React from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    Linking,
    FlatList,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
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
    HEADERFORMDATA,
    PRIVATEKEY,
    MERCHANTID,
    SECRETKEY,
    PRODUCTIONMODE
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    generateOauthToken
} from '../actions'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class PaymentDirectPayScreen extends React.Component {

    state = {
        booking_id: [],
        amount: 0,
        cardInfo: {},
        cardName: '',
        cardNumber: '',
        cardExpM: '',
        cardExpY: '',
        cardCVC: '',
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ชำระเงิน บัตรเครดิต/เดบิต`}</Text>
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

    _onChange = form => {
        //alert(JSON.stringify(form.values.expiry.substring(0, 2)))
        //alert(JSON.stringify(form.values.cvc))
        this.setState({
            cardNumber: form.values.number,
            cardExpM: form.values.expiry.substring(0, 2),
            cardExpY: form.values.expiry.substring(3, 5),
            cardCVC: form.values.cvc
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        const { total_final_price, booking_id } = this.props.route.params
        await this.setState({
            amount: total_final_price,
            booking_id: booking_id
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer
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
                    <Text style={[styles.text20, { color: 'white' }]}>{`กรุณากรอกข้อมูลบัตร`}</Text>
                    {/* <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.5 }]}>
                        <ScrollView style={{flex:0.7}} >
                            <KeyboardAvoidingView behavior="padding" >
                                <CreditCardInput autoFocus={true} onChange={this._onChange} />
                            </KeyboardAvoidingView>
                        </ScrollView>
                        <View style={[styles.center, {  alignSelf: 'center' }]}>
                            <TouchableOpacity style={[styles.mainButton, styles.center]}
                                onPress={
                                    async () => {
                                        alert('xx')
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยัน`}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDirectPayScreen)