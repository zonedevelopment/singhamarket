import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Alert,
    TextInput,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
var numeral = require('numeral');
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    GET_CART_URL,
    redColor,
    BASE_URL,
    GET_CONFIRMRESERVATION_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import Hepler from '../../utils/Helper'

import {
    openIndicator,
    dismissIndicator,
    saveDateSelected,
    setStateBookingSelected,
    setStateMyCart,
    setUserCountCartItem,
} from '../../actions'

import styles from '../../style/style'

class ConfirmReservScreen extends React.Component {

    state = {
        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        total_final_price: 0,
        arrBooking: [],
        Timeout: '',
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        //this.calculate()
        console.log('bookingID', this.props.reducer.booking_selected)
        this.GetData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    GetData() {
        let BookingID = this.props.reducer.booking_selected
        const props = this.props
        const reducer = props.reducer
        let formData = new FormData();
        formData.append('partners_id', this.props.reducer.userInfo.partners_id)
        formData.append('booking_id', JSON.stringify(BookingID))
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_CONFIRMRESERVATION_URL, formData, HEADERFORMDATA, (results) => {
            console.log('GET_CONFIRMRESERVATION_URL', results)
            if (results.status == 'SUCCESS') {
                let total_area = 0
                let area_item = 0
                let total_other_service = 0
                let discount_price = 0
                let vat = 0
                let vat_cut = 0;
                let total_final_price = 0
                results.data.map((vBooking, iBooking) => {
                    console.log('vBooking', vBooking)
                    total_area += parseFloat(vBooking.booking_total)
                    area_item += vBooking.Booking_Details.length
                    discount_price += parseFloat(vBooking.booking_coupon)
                    total_other_service += parseFloat(vBooking.booking_service_total)

                    console.log('total_area', total_area)
                    console.log('area_item', area_item)
                    console.log('discount_price', discount_price)
                    console.log('total_other_service', total_other_service)
                })
                if (reducer.userInfo.partners_type == 1) {/// บุคคลธรรมดา
                    vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.personal_vat / 100
                    total_final_price = parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)
                } else { /// นิติบุคคล
                    // vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.company_vat / 100
                    vat_cut = (parseFloat(total_area) - (parseFloat(total_area) * 7) / 107)
                    vat = (parseFloat(vat_cut) - parseFloat(discount_price)) * reducer.company_vat / 100
                    total_final_price = parseFloat(total_area) + parseFloat(total_other_service) + parseFloat(vat) - parseFloat(discount_price)
                }

                // total_final_price = parseFloat(total_area) + parseFloat(total_other_service) + parseFloat(vat) - parseFloat(discount_price)

                this.setState({
                    total_area: total_area - ((total_area * 7) / 107),
                    area_item: area_item,
                    total_other_service: total_other_service,
                    discount_price: discount_price,
                    vat: vat,
                    total_final_price: total_final_price,
                    arrBooking: results.data,
                    Timeout: results.Timeout
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }




    _renderItem = ({ item, index }) => {
        return (
            <View>
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
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.floor_name + ` / ` + valueDetails.zone_name}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                                <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.product_type_name}</Text>
                                            </View>
                                        </View>
                                        :
                                        null
                                }

                                <View style={[styles.marginBetweenVertical]}></View>
                                <View style={[styles.containerRow]}>
                                    <View style={{ flex: 0.15 }}>
                                        <View style={[styles.center, { width: 42, height: 42, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                            <Text style={[styles.text14, styles.bold, { textAlign: 'center' }]}>{valueDetails.boothname}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.9 }}>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <Text style={[styles.text16]}>{`วันที่ขาย ` + moment(valueDetails.booking_detail_date).format('LL')}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                                            <Text style={[styles.text14]}>{numeral(valueDetails.boothprice).format('0,0.00') + ` บาท`}</Text>
                                        </View>
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



    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
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
                    <Text style={[styles.text20, { color: 'white' }]}>{`สรุปรายละเอียดการจองพื้นที่`}</Text>
                    <ScrollView>
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <View style={[styles.container]}>
                                {/* <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.reserverion_building_name}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.reserverion_floor_name + ` / ` + this.props.reducer.reserverion_zone_name}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.userInfo.product_type.category_name}</Text>
                                </View> */}
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`วันที่ทำรายการจอง`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`${moment(new Date()).format('LL')}`}</Text>
                                </View>
                            </View>
                            <View style={[styles.hr]}></View>

                            <FlatList
                                data={this.state.arrBooking}
                                keyExtractor={(item) => item.booking_id}
                                extraData={this.state}
                                renderItem={this._renderItem}
                            />

                            <View style={[styles.hr]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + this.props.reducer.date_selected.length}</Text>
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

                                {
                                    this.props.reducer.userInfo.partners_type == 2 ?
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                            <Text style={[styles.text16]}>{this.props.reducer.userInfo.partners_type == 1 ? 'บุคคลธรรมดาหัก ณ ที่จ่าย ' + this.props.reducer.personal_vat + ' %' : 'นิติบุคคลหัก ณ ที่จ่าย ' + this.props.reducer.company_vat + ' %'}</Text>
                                            <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                        </View>
                                        :
                                        <View></View>
                                }
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16, styles.bold]}>{`ยอดรวมที่ต้องชำระ `}</Text>
                                    <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.mainButton, styles.center, { backgroundColor: redColor }]}>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`โปรดชำระเงินก่อน ` + this.state.Timeout + ` น.`}</Text>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View>
                                <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากท่านไม่ชำระเงินในเวลาที่กำหนด การจองพื้นที่\nขายของท่านจะถูกยกเลิกโดยอัตโนมัติ`}</Text>
                            </View>
                            <View>
                                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                        onPress={
                                            () => {

                                                this.props.navigation.reset({
                                                    index: 0,
                                                    routes: [{ name: 'Building' }],
                                                });
                                                this.props.navigation.navigate('Reserv')


                                            }
                                        }>
                                        <Text style={[styles.text14, { color: '#FFF' }]}>{`จองพื้นที่อื่นเพิ่ม`}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                        onPress={
                                            () => this.props.navigation.navigate('Paymentchannel', {
                                                total_final_price: this.state.total_final_price,
                                                booking_id: this.props.reducer.booking_selected,
                                            })
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReservScreen)