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
import { WebView } from "react-native-webview";
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
    REQUEST_FORM_URL_2C2P,
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
    backHandlerSubscription = null


    state = {
        booking_id: [],
        amount: 0,
        cardInfo: {},
        cardName: '',
        cardNumber: '',
        cardExpM: '',
        cardExpY: '',
        cardCVC: '',
        loading : false,
        url : '',
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
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
            });
            this.props.navigation.navigate('Main');
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

  


    async componentDidMount() {
        //this.props.openIndicator()
        const { amount, booking_id,TransID ,partners_id} = this.props.route.params

        let url = BASE_URL + REQUEST_FORM_URL_2C2P + "?amount=" + numeral(amount).format('0.00')
            + "&TransID=" + TransID
            + "&partners_id=" + partners_id;
        this.setState({
            url: url
        });
        //this.props.dismissIndicator()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {

        const props = this.props.reducer
        const { amount, booking_id,TransID ,partners_id} = this.props.route.params
       // return <WebView source={{ uri: 'https://benz.ots.co.th/singha/api/FormRequest2C2P' }} />;

        return (
            <View style={[styles.container, { backgroundColor: primaryColor }]}>
          
                   
                 <WebView 
                    source={{ uri: this.state.url }} 
                    // scalesPageToFit
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    // scalesPageToFit={true}
                    scrollEnabled={true}
                    onLoad={() => this.props.openIndicator()}
                    onLoadEnd={() => this.props.dismissIndicator()}
                    onLoadStart={() => this.props.openIndicator()}
                    onResponderStart={() => this.props.openIndicator()} 
                 />
                  {/*   <View style={[styles.panelWhite, styles.shadow, { height: DEVICE_HEIGHT / 1.5 }]}>
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
                        
                    </View> 
                    <View style={[styles.marginBetweenVertical]}></View>*/}
                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                        <Text style={[styles.text16, styles.bold, { flex: 0.6, color: 'white' }]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                        <Text style={[styles.text16, styles.bold, { flex: 0.4, color: 'white', textAlign: 'right' }]}>{numeral(amount).format('0,0.00') + ` บาท`}</Text>
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