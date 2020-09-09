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
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
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
    HEADERFORMDATA
} from '../../utils/contants'


import Hepler from '../../utils/Helper'

import {
    openIndicator,
    dismissIndicator,
    setStateBookingSelected,
    setUserCountCartItem,
    setStateMyCart
} from '../../actions'
import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
class CartScreen extends React.Component {

    state = {
        arrBooking: [],
        selectBooking: [],
        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        item_count: 0,
        total_final_price: 0,
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
                    arrBooking: results.data,
                    selectBooking: [],
                    area_item: 0,
                    total_area: 0,
                    discount_price: 0,
                    total_other_service: 0,
                    vat: 0,
                    total_final_price: 0,
                })
                this.props.setStateMyCart(results.data)
                this.props.setUserCountCartItem(results.data.length)
                if (results.data.length > 0) {
                    results.data.map((item, index) => {
                        this.onChecked(item, false)
                    })
                }
                this.props.dismissIndicator()
            } else {
                this.setState({ arrBooking: [] })
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


    _renderItem = ({ item, index }) => {
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
                            <Text style={[styles.text12, { color: 'red' }]}>{`เหลือเวลาในการจองอีก ` + item.Timelate + ` นาที`}</Text>
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

    ComponentLeft = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`ตะกร้าสินค้า`}</Text>
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
        this.props.navigation.addListener('focus', () => {
            this.props.setStateBookingSelected([])
            this.LoadData()
            this.countItem()
        });

        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onChecked(item, checked) {
        const props = this.props
        const reducer = props.reducer
        let arr = this.state.arrBooking;
        let booking_id = item.booking_id;
        let index = arr.findIndex(k => k.booking_id == booking_id);
        arr[index].checked = checked == true ? false : true;

        ///// calculate money
        let { total_area, area_item, total_other_service, discount_price } = this.state
        let vat = 0;
        let vat_cut = 0;
        let total_final_price = 0;
        if (checked == false) {
            total_area = parseFloat(total_area) + parseFloat(item.booking_total)
            discount_price = parseFloat(discount_price) + parseFloat(item.booking_coupon)
            total_other_service = parseFloat(total_other_service) + parseFloat(item.booking_service_total)
            //total_final_price = parseFloat(total_final_price) + parseFloat(item.booking_grand_total)
            // count += item.Booking_Details.length
        } else {
            total_area = parseFloat(total_area) - parseFloat(item.booking_total)
            discount_price = parseFloat(discount_price) - parseFloat(item.booking_coupon)
            total_other_service = parseFloat(total_other_service) - parseFloat(item.booking_service_total)
            //total_final_price = parseFloat(total_final_price) - parseFloat(item.booking_grand_total)
            // count -= item.Booking_Details.length
        }


        if (reducer.userInfo.partners_type == 1) { /// บุคคลธรรมดา
            vat = (parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)) * reducer.personal_vat / 100
            total_final_price = parseFloat(total_area) + parseFloat(total_other_service) - parseFloat(discount_price)
        } else { /// นิติบุคคล
            vat_cut = parseFloat(total_area) - ((parseFloat(total_area) * 7) / 107)
            vat = ((parseFloat(vat_cut) - parseFloat(discount_price)) * reducer.company_vat) / 100
            total_final_price = (parseFloat(total_area) - parseFloat(vat)) + parseFloat(total_other_service) - parseFloat(discount_price)
        }
        // total_final_price = parseFloat(total_area) + parseFloat(total_other_service) + parseFloat(vat) - parseFloat(discount_price)

        this.setState({
            arrBooking: arr,
            total_area: (total_area - (total_area * 7) / 107),
            area_item: area_item,
            total_other_service: total_other_service,
            discount_price: discount_price,
            vat: vat,
            // item_count: count,
            total_final_price: total_final_price
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

    countItem() {
        let arr = this.state.arrBooking;
        let count = 0;
        arr.map((v, i) => {
            count += v.Booking_Details.length
        })

        this.setState({ item_count: count })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
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
                <StatusBar backgroundColor={primaryColor} />
                <View style={[styles.container, { alignItems: 'center' }]}>
                    {
                        this.state.arrBooking.length > 0 ?
                            <ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={false} onRefresh={this.LoadData} />
                                }>
                                <View style={{ width: DEVICE_WIDTH - 20, padding: 10 }}>
                                    <FlatList
                                        data={this.state.arrBooking}
                                        keyExtractor={(item) => item.booking_id}
                                        extraData={this.state}
                                        renderItem={this._renderItem} />
                                    <View style={[styles.hr]}></View>
                                    <View style={[styles.marginBetweenVertical]}></View>
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
                                                        if (this.state.selectBooking.length == 0) {
                                                            alert('กรุณาเลือกรายการมากกว่า 1 รายการ!')
                                                        } else {
                                                            await this.props.setStateBookingSelected(this.state.selectBooking)
                                                            this.props.navigation.navigate('ConfirmReserv')
                                                        }
                                                    }
                                                }>
                                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ดำเนินการต่อ`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                            :
                            <View style={[styles.container, styles.center]}>
                                <Text style={[styles.text16, styles.bold, { textAlign: 'center', color: styles.primaryColor }]}>{`ไม่มีรายการในตะกร้าสินค้า!`}</Text>
                            </View>
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
    setUserCountCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)