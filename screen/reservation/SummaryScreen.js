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
    secondaryColor,
    emptyColor,
    SUBMIT_BOOKING_URL,
    BASE_URL,
    HEADERFORMDATA,
    CHECK_DISCOUNT_URL,
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    saveDateSelected,
    setStateBookingSelected

} from '../../actions'
import styles from '../../style/style'
import Hepler from '../../utils/Helper'

class SummaryScreen extends React.Component {

    state = {
        area_item: 0,
        total_area: 0,
        discount_price: 0,
        total_other_service: 0,
        vat: 0,
        total_final_price: 0,
        discount_coupon : '',
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
        this.calculate()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    calculate() {
        // console.log('arrCart',this.props.reducer.date_selected)
        const props = this.props
        const reducer = props.reducer
        //props.openIndicator()
        let total_area = 0
        let total_service = 0
        let vat = 0
        reducer.date_selected.map((v, i) => {
            total_area += parseFloat(v.boothSelectPrice)
            v.other_service.map((vs, is) => {
                total_service += vs.qty * parseFloat(vs.service_price)
            })
        })
        // if (reducer.userInfo.partners_type == 1) {
        //     vat = (parseFloat(total_area) + parseFloat(total_service)) * reducer.personal_vat / 100
        // } else {
        //     vat = (parseFloat(total_area) + parseFloat(total_service)) * reducer.company_vat / 100
        // }
        this.setState({
            total_area: total_area,
            total_other_service: total_service,
            //vat: vat,
            total_final_price: parseFloat(total_area) + parseFloat(total_service)// + parseFloat(vat)
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



    Submit = () => {
        this.props.setStateBookingSelected([])
        this.props.openIndicator()
        let total_final_price = parseFloat(this.state.total_area) + parseFloat(this.state.total_other_service)
        let formData = new FormData();
        formData.append('booking_type','USER')
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        formData.append('marketname_id',this.props.reducer.reserverion_building_id)
        formData.append('booking_total',this.state.total_area)
        formData.append('booking_service_total',this.state.total_other_service)
        formData.append('booking_grand_total',total_final_price)
        formData.append('BookingItems',JSON.stringify(this.props.reducer.date_selected))
        Hepler.post(BASE_URL + SUBMIT_BOOKING_URL,formData,HEADERFORMDATA,(results) => {
            console.log('SUBMIT_BOOKING_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.saveDateSelected('save',[])
                this.props.setStateBookingSelected([results.BookingID])
                this.props.dismissIndicator()
                this.props.navigation.navigate('ConfirmReserv')
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <View style={[styles.containerRow]}>
                    <View style={{ flex: 0.15 }}>
                        <View style={[styles.center, { alignItems: 'center', width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                            <Text style={[styles.text16, styles.bold, { textAlign: 'center' }]}>{item.boothSelectName}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text16]}>{`วันที่ขาย ` + moment(item.date).format('LL')}</Text>
                            <View style={[styles.containerRow]}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('EditBooth',{
                                        day: item.date,
                                    })
                                }}>
                                    <Text style={[styles.text16]}>{`แก้ไข`}</Text>
                                </TouchableOpacity>
                                <View style={{ width: 1, backgroundColor: grayColor, margin: 4 }}></View>
                                <TouchableOpacity onPress={()=>{
                                    this.CancelOrder(item.date)
                                }}>
                                    <Text style={[styles.text16]}>{`ลบ`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                            <Text style={[styles.text14]}>{`${numeral(item.boothSelectPrice).format('0,0.00')} บาท`}</Text>
                        </View>
                        {
                            item.other_service.map((v, i) => {
                                return (
                                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[styles.text14, { flex: 1 }]}>{v.service_name}</Text>
                                        <View style={[styles.containerRow, { flex: 0.55, justifyContent: 'space-around', alignItems: 'center' }]}>
                                            <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                onPress={() => {
                                                    this.DelItem(item.date, v.service_id)
                                                }}>
                                                <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 6, marginRight: 6, textAlignVertical: 'center' }}>{v.qty}</Text>
                                            <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                                                onPress={() => {
                                                    this.PlusItem(item.date, v.service_id)
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
                </View>
                <View style={[styles.marginBetweenVertical]}></View>
                <View style={[styles.hr]}></View>
            </View>
        )
    }


    async PlusItem(date, service_id) {
        let arrBooth = this.props.reducer.date_selected
        let indexBooth = arrBooth.findIndex(k => k.date == date)
        let indexService = arrBooth[indexBooth]['other_service'].findIndex(k => k.service_id == service_id)
        arrBooth[indexBooth]['other_service'][indexService].qty = arrBooth[indexBooth]['other_service'][indexService].qty + 1;
        arrBooth[indexBooth]['other_service'][indexService].total_price = parseFloat(arrBooth[indexBooth]['other_service'][indexService].total_price) + parseFloat(arrBooth[indexBooth]['other_service'][indexService].service_price)
        await this.props.saveDateSelected('save', arrBooth)
        await this.calculate()
    }

    async DelItem(date, service_id) {
        let arrBooth = this.props.reducer.date_selected
        let indexBooth = arrBooth.findIndex(k => k.date == date)
        let arrService = arrBooth[indexBooth]['other_service']
        let indexService = arrService.findIndex(k => k.service_id == service_id)
        if (arrBooth[indexBooth]['other_service'][indexService].qty > 0) {
            arrBooth[indexBooth]['other_service'][indexService].qty = arrBooth[indexBooth]['other_service'][indexService].qty - 1;
            arrBooth[indexBooth]['other_service'][indexService].total_price = parseFloat(arrBooth[indexBooth]['other_service'][indexService].total_price) - parseFloat(arrBooth[indexBooth]['other_service'][indexService].service_price)
            await this.props.saveDateSelected('save', arrBooth)
            await this.calculate()
        }
    }

    CheckDiscount () {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        formData.append('booking_grand_total',this.state.total_final_price)
        Hepler.post(BASE_URL + CHECK_DISCOUNT_URL,formData,HEADERFORMDATA,(results) => {
            console.log('CHECK_DISCOUNT_URL',results)
            if (results.status == 'SUCCESS') {

                this.props.dismissIndicator()
            } else {
                this.setState({discount_coupon:''})
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
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
                            <View style={[styles.container, { backgroundColor: secondaryColor, borderRadius: 8, height: 80, justifyContent: 'center', paddingLeft: 10 }]}>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{this.props.reducer.reserverion_building_name}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{this.props.reducer.reserverion_floor_name + ` / ` + this.props.reducer.reserverion_zone_name}</Text>
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
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({discount_coupon : text})}
                                        onSubmitEditing={() => {
                                            this.CheckDiscount()
                                        }} />
                                </View>
                            </View>
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
                                {/* <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{this.props.reducer.userInfo.partners_type == 1 ? 'บุคคลธรรมดาหัก ณ ที่จ่าย ' + this.props.reducer.personal_vat + ' %' : 'นิติบุคคลหัก ณ ที่จ่าย ' + this.props.reducer.company_vat + ' %'}</Text>
                                    <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                </View> */}
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16, styles.bold]}>{`ยอดรวมที่ต้องชำระ`}</Text>
                                    <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View>
                                <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากตรวจพบหน้างาน แล้วไม่ตรงตามที่ท่านระบุไว้\nคิดค่าปรับ 500 บาท + ค่าบริการจริง`}</Text>
                            </View>
                            <View>
                                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                    {/* <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                        onPress={
                                            () => null
                                        }>
                                        <Text style={[styles.text14, { color: '#FFF' }]}>{`จองพื้นที่อื่นเพิ่ม`}</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                                        onPress={
                                            () => this.Submit()
                                        }>
                                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยันการจอง`}</Text>
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
    setStateBookingSelected

}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen)