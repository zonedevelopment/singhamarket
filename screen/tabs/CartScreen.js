import React from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    StatusBar,
    FlatList,
    TextInput,
    Alert,
    Dimensions,
    BackHandler,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

var numeral = require('numeral')
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    BASE_URL,
    GET_CART_URL,
    CANCEL_BOOKING_URL,
    HEADERFORMDATA, redColor
} from '../../utils/contants'


import Hepler from '../../utils/Helper'

import {
    openIndicator,
    dismissIndicator,
    setStateBookingSelected,
    setUserCountCartItem,
    setStateMyCart,
    setStateChargeSelected
} from '../../actions'
import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
class CartScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        arrBooking: [],
        selectBooking: [],
        arrCharge: [],
        selectCharge: [],
        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        item_count: 0,
        total_final_price: 0,
        isFetching : false,
        charge_total : 0,

        
    }


    LoadData = () => {
        this.props.openIndicator()
        //this.props.setStateMyCart([])
        let formData = new FormData();
        formData.append('partners_id', this.props.reducer.userInfo.partners_id)
        Hepler.post(BASE_URL + GET_CART_URL, formData, HEADERFORMDATA, (results) => {
            console.log('GET_CART_URL', results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    arrBooking: results.data.Cart,
                    selectBooking: [],
                    arrCharge: results.data.Charge,
                    selectCharge: [],
                    area_item: 0,
                    item_count : 0,
                    total_area: 0,
                    discount_price: 0,
                    total_other_service: 0,
                    vat: 0,
                    total_final_price: 0,
                    isFetching: false,
                    charge_total:0,
                })
                this.props.setStateMyCart(results.data.Cart)
                this.props.setUserCountCartItem(results.data.Cart.length + results.data.Charge.length)
                if (results.data.Cart.length > 0) {
                    results.data.Cart.map( async (item, index) => {
                        await this.onChecked(item, false)
                    })
                }
                if (results.data.Charge.length > 0) {
                    results.data.Charge.map( async (item, index) => {
                        await this.onCheckedCharge(item, false)
                    })
                }
                this.props.dismissIndicator()
            } else {
                this.setState({ 
                    arrBooking: [],
                    selectBooking: [],
                    arrCharge : [],
                    selectCharge: [],
                    area_item: 0,
                    item_count : 0,
                    total_area: 0,
                    discount_price: 0,
                    total_other_service: 0,
                    vat: 0,
                    total_final_price: 0,
                    isFetching: false,
                    charge_total:0,
                 })
                this.props.setStateMyCart([])
                this.props.setUserCountCartItem(0)
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    CancelBooking = (item) => {
        this.props.openIndicator()
        //this.props.setStateMyCart([])
        let formData = new FormData();
        formData.append('partners_id', this.props.reducer.userInfo.partners_id)
        formData.append('booking_id', item.booking_id)
        Hepler.post(BASE_URL + CANCEL_BOOKING_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CANCEL_BOOKING_URL', results)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.LoadData();
            } else {
                Alert.alert(results.message)
            }
        })
    }

    _renderItemCharge  = ({ item, index }) => {
        return (
            <View key={index}>
                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flex: 0.7 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <CheckBox
                                title={`เลือก`}
                                checked={item.checked}
                                textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', margin: -8, marginRight: -10, marginLeft: -10 }}
                                onPress={
                                    () => {
                                       this.onCheckedCharge(item, item.checked);
                                    }
                                } />
                         <Text style={[styles.text14, { color: 'red' ,fontFamily: 'SinghaEstate-Regular'}]}>{`ประเภทรายการ : ค่าปรับ`}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.35 }}>
                        <View style={[styles.containerRow, { justifyContent: 'flex-end' }]}>
                           
                        </View>
                    </View>
                </View>
                <View style={[styles.containerRow]}>
                    <View style={{ flex: 0.17 }}>
                        <View style={[styles.center, { width: 50, height: 50, backgroundColor: redColor, borderRadius: 10 }]}>
                            <Text style={[styles.text12, { color:'white',textAlign: 'center', flexWrap: 'wrap' }]}>{item.booth_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.83 }}>
                       
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text16]}>{`เลขที่การจอง ` + item.booking_id}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text16]}>{`วันที่ขาย ` + moment(item.booking_detail_date).format('LL')}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14]}>{`ราคาค่าปรับ`}</Text>
                            <Text style={[styles.text14]}>{numeral(item.audit_charge_total).format('0,0.00') + ` บาท`}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.hr]}></View>
            </View>

        )
    }


    _renderItemBooking = ({ item, index }) => { 
        return (
            <View key={index}>
                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flex: 0.7 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <CheckBox
                                title={`เลือก`}
                                checked={item.checked}
                                textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', margin: -8, marginRight: -10, marginLeft: -10 }}
                                onPress={
                                    () => {
                                        this.onChecked(item, item.checked);
                                    }
                                } />
                            <Text style={[styles.text12, { color: 'red' }]}>{`เหลือเวลาในการชำระเงิน` + moment(item.Timelate, "YYYY-MM-DD HH:mm").fromNow()}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.35 }}>
                        <View style={[styles.containerRow, { justifyContent: 'flex-end' }]}>
                            <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', padding: 2 }]} onPress={() => {
                                Alert.alert(
                                    "ยืนยัน",
                                    'ยืนยันการยกเลิกการจอง?',
                                    [
                                        {
                                            text: "ยกเลิก",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "ตกลง",
                                            onPress: () => this.CancelBooking(item)
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}>
                                <Icon name="times" color="red" size={16} /><Text style={[styles.text14]}>{` ยกเลิก`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    item.Booking_Details.map((valueDetails, indexDetails) => {
                        return (
                            <View>
                                {
                                    indexDetails == 0 ?
                                        <View style={[styles.container, { backgroundColor: secondaryColor, borderRadius: 8, justifyContent: 'center', paddingLeft: 10 }]}>
                                            <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.name_market}</Text>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{/*valueDetails.floor_name + ` / ` + */valueDetails.zone_name}</Text>
                                            </View>
                                            {
                                                valueDetails.booth_detail_id != 0 ?
                                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.product_type_name}</Text>
                                                </View>
                                                :
                                                null
                                            }
                                            
                                        </View>
                                        :
                                        null
                                }

                                <View style={[styles.marginBetweenVertical]}></View>
                                <View style={[styles.containerRow]}>
                                    <View style={{ flex: 0.17 }}>
                                        <View style={[styles.center, { width: 50, height: 50, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                            <Text style={[styles.text12, { textAlign: 'center', flexWrap: 'wrap' }]}>{valueDetails.boothname}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.83 }}>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <Text style={[styles.text16]}>
                                            {
                                                valueDetails.booth_detail_id != 0 ?
                                                `วันที่ขาย ` + moment(valueDetails.booking_detail_date).format('LL')
                                                : 'บูธเรียกเก็บพิเศษ'
                                            }
                                            </Text>
                                        </View>
                                        {
                                            valueDetails.booth_detail_id != 0 ?
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                                                <Text style={[styles.text14]}>{numeral(valueDetails.boothprice).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            : <View></View>
                                        }
                                     
                                        {
                                            valueDetails.Service.map((vService, iService) => {
                                                return (
                                                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                        <Text style={[styles.text14]}>{vService.service_name + ' x' + vService.qty}</Text>
                                                        <Text style={[styles.text14]}>{numeral(parseFloat(vService.service_item_price) * parseFloat(vService.qty)).format('0,0.00') + ` บาท`}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={[styles.marginBetweenVertical]}></View>
                            </View>
                        )
                    })
                }

                <View style={[styles.hr]}></View>
            </View>
        )
    }

  

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            // this.props.navigation.pop();
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
            this.props.setStateBookingSelected([])
            this.props.setStateChargeSelected([])
            this.LoadData()
        });

        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onCheckedCharge(item, checked){
        let arr = this.state.arrCharge;
        let index = arr.findIndex(k => k.booking_detail_id == item.booking_detail_id);
        arr[index].checked = checked == true ? false : true;
        this.setState({ arrCharge: arr });
        let { total_final_price,charge_total } = this.state
        if (checked == false) {
            this.setState({
                charge_total:  parseFloat(charge_total) +  parseFloat(item.audit_charge_total),
                total_final_price : parseFloat(total_final_price) + parseFloat(item.audit_charge_total),
                selectCharge: this.state.selectCharge.concat([item.booking_detail_id])
            })
        } else {
            this.setState({
                charge_total:  parseFloat(charge_total) -  parseFloat(item.audit_charge_total),
                total_final_price : parseFloat(total_final_price) - parseFloat(item.audit_charge_total),
                selectCharge: this.state.selectCharge.filter(function (values) {
                    return values !== item.booking_detail_id
                })
            });
        }
    }

    onChecked(item, checked) {

        const props = this.props
        const reducer = props.reducer
        let arr = this.state.arrBooking;
        let booking_id = item.booking_id;
        let index = arr.findIndex(k => k.booking_id == booking_id);
        arr[index].checked = checked == true ? false : true;
        // console.log('booking_id',booking_id)
        console.log('item check',item)
        // console.log('checked',checked)
        // console.log('index',index)

        ///// calculate money
        let { total_area, area_item, total_other_service, discount_price,charge_total } = this.state
        let vat = 0;
        let vat_cut = 0;
        let total_final_price = 0;
        let count = this.state.item_count
        if (checked == false) {
            total_area = parseFloat(total_area) + parseFloat(item.booking_total)
            discount_price = parseFloat(discount_price) + parseFloat(item.booking_coupon)

            if(item.booking_total ==  0){ /// booking เรียกเก็บพิเศษค่าปรับล่าช้า
                charge_total = parseFloat(charge_total) +  parseFloat(item.booking_service_total)
            }else{ ////// booking เรียกเก็บปกติทั่วไป
                total_other_service = parseFloat(total_other_service) + parseFloat(item.booking_service_total) 
            }

            count += item.Booking_Details.length
        } else {
            total_area = parseFloat(total_area) - parseFloat(item.booking_total)
            discount_price = parseFloat(discount_price) - parseFloat(item.booking_coupon)
 
            if(item.booking_total ==  0){ /// booking เรียกเก็บพิเศษค่าปรับล่าช้า
                charge_total = parseFloat(charge_total) -  parseFloat(item.booking_service_total)
            }else{ ////// booking เรียกเก็บปกติทั่วไป
                total_other_service = parseFloat(total_other_service) - parseFloat(item.booking_service_total) 
            }

            count -= item.Booking_Details.length
        }


        if (reducer.userInfo.partners_type == 1) { /// บุคคลธรรมดา
            vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.personal_vat / 100
            total_final_price = parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)
        } else { /// นิติบุคคล
            vat_cut = parseFloat(total_area) - ((parseFloat(total_area) * 7) / 107)
            vat = ((parseFloat(vat_cut) - parseFloat(discount_price)) * reducer.company_vat) / 100
            total_final_price = (parseFloat(total_area) - parseFloat(vat)) + parseFloat(total_other_service) - parseFloat(discount_price)
        }

        total_final_price = total_final_price + charge_total
        // total_final_price = parseFloat(total_area) + parseFloat(total_other_service) + parseFloat(vat) - parseFloat(discount_price)

        this.setState({
            arrBooking: arr,
            total_area: total_area,//(total_area - (total_area * 7) / 107),
            area_item: area_item,
            total_other_service: total_other_service,
            discount_price: discount_price,
            vat: vat,
            item_count: count,
            total_final_price: total_final_price,
            charge_total:  parseFloat(charge_total) 
        })

        if (checked == false) {
            this.setState({
                selectBooking: this.state.selectBooking.concat([booking_id])
            })
        } else {
            this.setState({
                selectBooking: this.state.selectBooking.filter(function (values) {
                    return values !== booking_id
                })
            });
        }
    }


    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }

    render() {
        return (
            <View style={[styles.container, { paddingBottom: 50 }]}>
                <View style={[styles.container, { alignItems: 'center', backgroundColor: 'white' }]}>
                    {
                        this.state.arrBooking.length == 0 && this.state.arrCharge.length == 0 ?
                            <View style={[styles.container, styles.center]}>
                                <Text style={[styles.text16, styles.bold, { textAlign: 'center', color: styles.primaryColor }]}>{`ไม่มีรายการสินค้าหรือค่าปรับ!`}</Text>
                            </View>
                            :
                            <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={false} onRefresh={this.LoadData} />
                            }>
                                <View style={{ width: DEVICE_WIDTH - 20, padding: 10 }}>
                                    <FlatList
                                        data={this.state.arrBooking}
                                        keyExtractor={(item) => item.booking_id}
                                        extraData={this.state}
                                        onRefresh={() => this.onRefresh()}
                                        refreshing={this.state.isFetching}
                                        renderItem={this._renderItemBooking} />

                                    <FlatList
                                        data={this.state.arrCharge}
                                        keyExtractor={(item) => item.booking_detail_id}
                                        extraData={this.state}
                                        onRefresh={() => this.onRefresh()}
                                        refreshing={this.state.isFetching}
                                        renderItem={this._renderItemCharge} />

                                    <View style={[styles.hr]}></View>
                                    <View style={[styles.container]}>
                                        <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            {/* <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + this.props.reducer.date_selected.length}</Text> */}
                                            <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ${this.state.item_count}`}</Text>
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
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{`ค่าปรับ`}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.charge_total).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        
                                        {
                                            this.props.reducer.userInfo.partners_type == 2 ?
                                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                                    <Text style={[styles.text16]}>{'นิติบุคคลหัก ณ ที่จ่าย ' + this.props.reducer.company_vat + ' %'}</Text>
                                                    <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                                </View>
                                                :
                                                <View></View>
                                        }

                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16, styles.bold]}>{`ยอดรวมที่ต้องชำระ`}</Text>
                                            <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.container]}>
                                        <View style={[styles.container, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                                                onPress={
                                                    async () => {
                                                        if (this.state.selectBooking.length == 0 && this.state.selectCharge.length == 0) {
                                                            alert('กรุณาเลือกรายการมากกว่า 1 รายการ!')
                                                        } else {
                                                            await this.props.setStateBookingSelected(this.state.selectBooking)
                                                            await this.props.setStateChargeSelected(this.state.selectCharge)
                                                            
                                                            this.props.navigation.navigate('Paymentchannel')
                                                        }
                                                    }
                                                }>
                                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ดำเนินการต่อ`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        
                    }
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
    setStateBookingSelected,
    setStateMyCart,
    setUserCountCartItem,
    setStateChargeSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)