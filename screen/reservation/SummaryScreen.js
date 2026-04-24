import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Alert,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
var numeral = require('numeral')
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    grayColor,
    primaryColor,
    redColor,
    reservColor,
    secondaryColor,
    emptyColor,
    SUBMIT_BOOKING_URL,
    GET_CART_URL,
    BASE_URL,
    HEADERFORMDATA,
    CHECK_DISCOUNT_URL,
    GET_TIMEOUT_SUMMARY_URL,
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    saveDateSelected,
    setStateBookingSelected,
    setStateMyCart,
    setUserCountCartItem,
} from '../../actions'
import styles from '../../style/style'
import Hepler from '../../utils/Helper'

class SummaryScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        Timeout : new Date(),
        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        total_final_price: 0,
        discount_coupon : '',
        coupon_id : '',
        arrDate : [],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียดการจอง`}</Text>
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

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.calculate()
            this.LoadTimeoutSummart()
        });
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadTimeoutSummart (){
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        formData.append('partners_type',this.props.reducer.userInfo.partners_type)
        Hepler.post(BASE_URL + GET_TIMEOUT_SUMMARY_URL ,formData,HEADERFORMDATA,(results) => {
            console.log('GET_TIMEOUT_SUMMARY_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    Timeout : results.data
                })
                this.props.dismissIndicator()
            } else {
                this.setState({discount_coupon:''})
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    calculate() {
        // console.log('arrCart',this.props.reducer.date_selected)
        const props = this.props
        const reducer = props.reducer
        //props.openIndicator()
        let total_area = 0
        let total_service = 0
        let vat3 = 0
        let total_price = 0
        let {discount_price} = this.state
        let arrDate = []
        reducer.date_selected.map((vDate, iDate) => {
            vDate.ListBooth.map((valueBooth, indexBooth) => {
                if(valueBooth.status == true){
                    total_area += parseFloat(valueBooth.amount)
                    valueBooth.other_service.map((vs, is) => {
                        total_service += vs.qty * parseFloat(vs.service_price)
                    })
                }
            })
            arrDate.push(vDate.date)
        })
        if (reducer.userInfo.partners_type == 1) {
            vat3 = (parseFloat(total_area) + parseFloat(total_service)) * reducer.personal_vat / 100
            total_price = parseFloat(total_area) + parseFloat(total_service) - parseFloat(discount_price)
        } else {
            vat_cut = parseFloat(total_area) - ((parseFloat(total_area) * parseFloat(reducer.personal_vat)) / (100 + parseFloat(reducer.personal_vat)))
            vat3 = ((parseFloat(vat_cut) - parseFloat(discount_price)) * reducer.company_vat) / 100

            total_price = (parseFloat(total_area) - parseFloat(vat3)) + parseFloat(total_service)
        }
        this.setState({
            total_area: total_area,
            total_other_service: total_service,
            vat: vat3,
            total_final_price: total_price,
            arrDate : arrDate,
        })
        //props.dismissIndicator()
    }

    async CancelOrder(date){
        let arrBooth = this.props.reducer.date_selected
        if(arrBooth.length > 1){
            arrBooth = arrBooth.filter(k => k.date !== date)
            await this.props.saveDateSelected('save',arrBooth)
            await this.calculate()
        }else{
            Alert.alert('ไม่สามารถยกเลิกวันจองน้อยกว่า 1 วันได้')
        }
    }



    _renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center',paddingTop:5,paddingBottom:5 }]}>
                    <Text style={[styles.text16,{fontWeight:'bold',color: primaryColor}]}>{`วันที่ขาย ` + moment(item.date).format('LL')}</Text>
               
                </View>
                {
                    item.ListBooth.map((valueBooth, indexBooth) => {
                        return (
                            <View style={[styles.containerRow,{marginBottom:5}]}>
                                <View style={{ flex: 0.15 }}>
                                    <View style={[styles.center, { alignItems: 'center', width: 50, height: 50, backgroundColor: valueBooth.status == false ? reservColor : emptyColor, borderRadius: 10 }]}>
                                        <Text style={[styles.text12, { textAlign: 'center', flexWrap: 'wrap' }]}>{valueBooth.booth_name}</Text>
                                    </View>
                                </View>
                                {
                                    valueBooth.status == false ?
                                    <View style={[styles.containerRow, { flex: 0.9, alignItems: 'center', justifyContent: 'space-between' }]}>
                                        <Text style={[styles.text18, { color: 'red' }]}>{`บูธที่ท่านเลือกไม่ว่าง!`}</Text>
                                        <TouchableOpacity onPress={()=>{
                                                this.DeleteBooth(item.date,valueBooth.booth_id)
                                            }}>
                                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`ลบบูธ`}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flex: 0.9 }}>
                                        <View style={[styles.containerRow, { justifyContent: 'flex-end', alignItems: 'flex-end'/*,borderBottomColor: '#ddd', borderBottomWidth: 0.5 */}]}>
                                            {/* <TouchableOpacity onPress={()=>{
                                                this.DeleteBooth(item.date,valueBooth.booth_id)
                                            }}>
                                                <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`ลบบูธ`}</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center'/*,borderBottomColor: '#ddd', borderBottomWidth: 0.5 */}]}>
                                            <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                                            <Text style={[styles.text14]}>{`${numeral(valueBooth.amount).format('0,0.00')} บาท`}</Text>
                                        </View>
                                        {
                                            valueBooth.other_service.map((v, i) => {
                                                return (
                                                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center'/*,borderBottomColor: '#ddd', borderBottomWidth: 0.5*/}]}>
                                                        <Text style={[styles.text14, { flex: 1 }]}>{v.service_name}</Text>
                                                        <View style={[styles.containerRow, { flex: 0.55, justifyContent: 'space-around', alignItems: 'center' }]}>
                                                            <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                                onPress={() => {
                                                                    this.DelItem(item.date,valueBooth.booth_id, v.service_id)
                                                                }}>
                                                                <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                                                            </TouchableOpacity>
                                                            <Text style={{ marginLeft: 6, marginRight: 6, textAlignVertical: 'center' }}>{v.qty}</Text>
                                                            <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                                onPress={() => {
                                                                    this.PlusItem(item.date,valueBooth.booth_id, v.service_id)
                                                                }}>
                                                                <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <Text style={[styles.text14, { flex: 0.5, textAlign: 'right' }]}>{numeral(v.total_price).format('0,0.00')}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                }
                            </View>
                        )
                    })
                }

                <View style={[styles.marginBetweenVertical]}></View>
                <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} />
            </View>
        )
    }

    async DeleteBooth(date,booth_id) {
        let arrBooth = this.props.reducer.date_selected
        let indexBooth = arrBooth.findIndex(k => k.date == date)
        if(arrBooth[indexBooth]['ListBooth'].length > 1){
            arrBooth[indexBooth]['ListBooth'] = arrBooth[indexBooth]['ListBooth'].filter(k => k.booth_id != booth_id)
            await this.props.saveDateSelected('save',arrBooth)
            await this.calculate()
        }else{
            // Alert.alert('ไม่สามารถยกเลิกวันจองน้อยกว่า 1 วันได้')
            this.CancelOrder(date)
        }
    }


    async PlusItem(date,booth_id, service_id) {
        let arrBooth = this.props.reducer.date_selected
        let indexBooth = arrBooth.findIndex(k => k.date == date)
        let indexBoothSelected = arrBooth[indexBooth]['ListBooth'].findIndex(k => k.booth_id == booth_id)
        let indexService = arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'].findIndex(k => k.service_id == service_id)
        arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].qty = arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].qty + 1;
        arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].total_price = parseFloat(arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].total_price) + parseFloat(arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].service_price)
        await this.props.saveDateSelected('save', arrBooth)
        await this.calculate()
    }

    async DelItem(date,booth_id, service_id) {
        let arrBooth = this.props.reducer.date_selected
        let indexBooth = arrBooth.findIndex(k => k.date == date)
        let indexBoothSelected = arrBooth[indexBooth]['ListBooth'].findIndex(k => k.booth_id == booth_id)
        let arrService = arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service']
        let indexService = arrService.findIndex(k => k.service_id == service_id)
        if (arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].qty > 0) {
            arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].qty = arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].qty - 1;
            arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].total_price = parseFloat(arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].total_price) - parseFloat(arrBooth[indexBooth]['ListBooth'][indexBoothSelected]['other_service'][indexService].service_price)
            await this.props.saveDateSelected('save', arrBooth)
            await this.calculate()
        }
    }

    CheckDiscount () {
        if(this.state.discount_coupon.trim() == ''){
            Alert.alert('กรุณากรอกส่วนลด!')
        }else{
            this.props.openIndicator()
            let formData = new FormData();
            formData.append('partners_id',this.props.reducer.userInfo.partners_id)
            formData.append('discount_coupon_code',this.state.discount_coupon)
            formData.append('date',JSON.stringify(this.state.arrDate))
            formData.append('marketname_id',this.props.reducer.reserverion_building_id)
            Hepler.post(BASE_URL + CHECK_DISCOUNT_URL,formData,HEADERFORMDATA,(results) => {
                console.log('CHECK_DISCOUNT_URL',results)
                if (results.status == 'SUCCESS') {
                    this.setState({
                        discount_price : results.data,
                        coupon_id : results.coupon_id
                    })
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                } else {
                    this.setState({
                        discount_price : 0,
                        discount_coupon:'',
                        coupon_id : ''
                    })
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
                this.calculate()
            })
        }
    }


    Reservation = () => {
        this.props.setStateBookingSelected([])
        this.props.openIndicator()
        let total_final_price = parseFloat(this.state.total_area) + parseFloat(this.state.total_other_service)
        let formData = new FormData();
        formData.append('booking_type','USER')
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        formData.append('partners_type',this.props.reducer.userInfo.partners_type)
        formData.append('member_id',null)
        formData.append('marketname_id',this.props.reducer.reserverion_building_id)
        formData.append('coupon_id',this.state.coupon_id)
        formData.append('coupon_code',this.state.discount_coupon)
        formData.append('coupon_price',this.state.discount_price)
        formData.append('booking_total',this.state.total_area)
        formData.append('booking_service_total',this.state.total_other_service)
        formData.append('booking_vat_company',this.state.vat)
        formData.append('booking_grand_total',total_final_price)
        formData.append('BookingItems',JSON.stringify(this.props.reducer.date_selected))
        Hepler.post(BASE_URL + SUBMIT_BOOKING_URL,formData,HEADERFORMDATA,(results) => {
            console.log('SUBMIT_BOOKING_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.saveDateSelected('save',[])
                this.props.setStateBookingSelected([results.BookingID])
                //// count item cart
                let formData1 = new FormData();
                formData1.append('partners_id', this.props.reducer.userInfo.partners_id)
                Hepler.post(BASE_URL + GET_CART_URL, formData1,HEADERFORMDATA,(results1 ) => {
                    console.log('GET_CART_URL',results1)
                    if (results1.status == 'SUCCESS') {
                        this.props.setStateMyCart(results1.data)
                        this.props.setUserCountCartItem(results1.data.length)
                        this.props.dismissIndicator()
                        // / navigation
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'Building'}],
                        });
                        this.props.navigation.navigate('Paymentchannel')
                        // if(results1.data.length > 1) {
                        //     this.props.navigation.navigate('Cart')
                        // }else{
                        //     this.props.navigation.navigate('ConfirmReserv')
                        // }
                    
                    } else {
                        this.props.setStateMyCart([])
                        this.props.setUserCountCartItem(0)
                        Alert.alert(results.message)
                        this.props.dismissIndicator()
                    }
                })
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }



    render() {
        let BoothCount = 0
        this.props.reducer.date_selected.map((vDate, iDate) => {
            BoothCount += vDate.ListBooth.length
        })
        return (
            <View style={[styles.container, styles.backgroundPrimary, { paddingBottom: 50 }]}>
              
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.text20, { color: 'white' }]}>{`สรุปรายละเอียดการจองพื้นที่`}</Text>
                    <ScrollView>
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <View style={[styles.container, { backgroundColor: secondaryColor, borderRadius: 8, height: 80, justifyContent: 'center', paddingLeft: 10 }]}>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{this.props.reducer.reserverion_building_name}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{ this.props.reducer.reserverion_zone_name}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{this.props.reducer.userInfo.product_type.category_name}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <FlatList
                                data={this.props.reducer.date_selected}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                                renderItem={this._renderItem} />
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[styles.text16, { textAlign: 'center' }]}>{`โค้ดส่วนลด`}</Text>
                                <View style={[styles.shadow, styles.inputWithIcon, { width: '70%' }]}>
                                    <TextInput
                                        ref={(input) => { this.discount_coupon = input; }}
                                        style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                        placeholder='Enter code..'
                                        returnKeyType={'next'}
                                        value={this.state.discount_coupon}
                                        blurOnSubmit={false}
                                        onBlur={() => {
                                            this.CheckDiscount()
                                        }}
                                        onChangeText={(text) => this.setState({discount_coupon : text})}
                                        onSubmitEditing={() => {
                                            this.CheckDiscount()
                                        }} />
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            {
                                    this.props.reducer.userInfo.partners_type == 1 ? //// บุคคลธรรมดา
                                    <View style={[styles.container]}>
                                        <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + BoothCount}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.total_area).format('0,0.00') + ' บาท'}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`โค้ดส่วนลด`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.discount_price).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ค่าบริการเสริม`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.total_other_service).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        {/* <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{this.props.reducer.userInfo.partners_type == 1 ? 'บุคคลธรรมดาหัก ณ ที่จ่าย ' + this.props.reducer.personal_vat + ' %' : 'นิติบุคคลหัก ณ ที่จ่าย ' + this.props.reducer.company_vat + ' %'}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                        </View> */}
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16, styles.bold]}>{`ยอดที่ต้องชำระ (รวม Vat ` + this.props.reducer.personal_vat + `%)`}</Text>
                                            <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                    </View>
                                    : //// นิติบุคคล
                                    <View style={[styles.container]}>
                                        <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + BoothCount}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.total_area).format('0,0.00') + ' บาท'}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`โค้ดส่วนลด`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.discount_price).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ค่าบริการเสริม`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.total_other_service).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        {/* <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ยอดรวม Vat ` + this.props.reducer.personal_vat + `%`}</Text>
                                            <Text style={[styles.text16]}>{numeral(parseFloat(this.state.total_final_price) + parseFloat(this.state.vat)).format('0,0.00') + ` บาท`}</Text>
                                        </View> */}
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`นิติบุคคลหักภาษี ณ ที่จ่าย ` + this.props.reducer.company_vat + `%`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16, styles.bold]}>{`ยอดที่ต้องชำระ`}</Text>
                                            <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                    </View>

                            }
                          
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            {/* <View style={[styles.mainButton, styles.center, { backgroundColor: redColor }]}>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`โปรดชำระเงินก่อน ` + moment().add(this.props.reducer.CartPaymentTimeOut, 'minutes').format('LT') + ` น.`}</Text>
                            </View> */}
                            <View style={[styles.mainButton, styles.center, { backgroundColor: redColor }]}>
                                <Text style={[styles.text16, { color: '#FFF' }]}>{`โปรดชำระเงินก่อน `}</Text>
                                <Text style={[styles.text16, { color: '#FFF' }]}>{ moment(this.state.Timeout).format('LLL') + ` น.`}</Text>
                                {/* <Text style={[styles.text16, { color: '#FFF' }]}>{ moment().add(this.props.reducer.userInfo.partners_type == 1 ? 
                                this.props.reducer.CartPaymentTimeOut.Personal : 
                                this.props.reducer.CartPaymentTimeOut.Company, 'minutes').format('LLL') + ` น.`}</Text> */}
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View>
                                <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากตรวจพบหน้างาน แล้วไม่ตรงตามที่ท่านระบุไว้\nคิดค่าปรับ ` + this.props.reducer.ChargeFines + ` บาท + ค่าบริการจริง`}</Text>
                            </View>
                            <View>
                                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                                        onPress={
                                            () => 
                                            Alert.alert(
                                                "ยืนยัน",
                                                'ยืนยันการการจอง?',
                                                [
                                                    {
                                                        text: "ยกเลิก",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "ตกลง",
                                                        onPress: () => this.Reservation()
                                                    }
                                                ],
                                                { cancelable: false }
                                            )
                                        }>
                                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ชำระเงิน`}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
    saveDateSelected,
    setStateBookingSelected,
    setStateMyCart,
    setUserCountCartItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen)