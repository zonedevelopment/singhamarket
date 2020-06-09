import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
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
    redColor
} from '../../utils/contants'


import {
    openIndicator,
    dismissIndicator,
    saveDateSelected
} from '../../actions'

import styles from '../../style/style'

class ConfirmReservScreen extends React.Component {

    state = {
        area_item : 0,
        total_area : 0,
        discount_price : 0,
        total_other_service : 0,
        vat : 0,
        total_final_price : 0,
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

    calculate(){
        console.log('arrCart',this.props.reducer.date_selected)
        this.props.openIndicator()
        let total_area = 0
        let total_service = 0
        let vat = 0
        this.props.reducer.date_selected.map((v,i)=>{
            total_area += parseFloat(total_area) + parseFloat(v.boothSelectPrice)
            v.other_service.map((vs,is)=>{
                total_service += vs.qty * parseFloat(vs.service_price)
            })
        })
        
        if(this.props.reducer.userInfo.partners_type == 1){
            vat = (parseFloat(total_area) + parseFloat(total_service)) * this.props.reducer.personal_vat / 100
        }else{
            vat = (parseFloat(total_area) + parseFloat(total_service)) * this.props.reducer.company_vat / 100
        }
        this.setState({
            total_area : total_area,
            total_other_service : total_service,
            vat : vat,
            total_final_price : parseFloat(total_area) + parseFloat(total_service) + parseFloat(vat)
        })
        this.props.dismissIndicator()
    }


    _renderItem ({ item, index }) {
        return (
            <View>
                <View style={[styles.containerRow]}>
                    <View style={{ flex: 0.15 }}>
                        <View style={[styles.center, { alignItems:'center',width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                            <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{item.boothSelectName}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text16]}>{`วันที่ขาย ` + moment(item.date).format('LL')}}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                            <Text style={[styles.text14]}>{item.boothSelectPrice + ` บาท`}</Text>
                        </View>
                        {
                             item.other_service.map((v,i)=>{
                                return(
                                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[styles.text14, { flex: 0.9 }]}>{v.service_name}</Text>
                                        <Text style={[styles.text14, { flex: 0.15 }]}>{v.qty}</Text>
                                        <Text style={[styles.text14, { flex: 0.5, textAlign: 'right' }]}>{numeral(v.total_price).format('0,0.00') + ` บาท`}</Text>
                                    </View>
                                )})
                        }
                      
                    </View>
                </View>
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
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.reserverion_building_name}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.reserverion_floor_name + ` / ` + this.props.reducer.reserverion_zone_name}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{this.props.reducer.userInfo.product_type.category_name}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`วันที่ทำรายการจอง`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: primaryColor }]}>{`${moment(new Date()).format('LL')}`}</Text>
                                </View>
                            </View>
                            <View style={[styles.hr]}></View>

                            <FlatList
                                data={this.props.reducer.date_selected}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                                renderItem={this._renderItem} 
                            />

                            <View style={[styles.hr]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x ` + this.props.reducer.date_selected.length}</Text>
                                    <Text style={[styles.text16]}>{ numeral(this.state.total_area).format('0,0.00') + ' บาท'}</Text>
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
                                    <Text style={[styles.text16]}>{`นิติบุคคลหัก ณ ที่จ่าย 3 %`}</Text>
                                    <Text style={[styles.text16]}>{numeral(this.state.vat).format('0,0.00') + ` บาท`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16, styles.bold]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                                    <Text style={[styles.text16, styles.bold]}>{numeral(this.state.total_final_price).format('0,0.00') + ` บาท`}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.mainButton, styles.center, { backgroundColor: redColor }]}>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`โปรดชำระเงินก่อน 11.00 น.`}</Text>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View>
                                <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากท่านไม่ชำระเงินในเวลาที่กำหนด การจองพื้นที่\nขายของท่านจะถูกยกเลิกโดยอัตโนมัติ`}</Text>
                            </View>
                            <View>
                                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                        onPress={
                                            () => null
                                        }>
                                        <Text style={[styles.text14, { color: '#FFF' }]}>{`จองพื้นที่อื่นเพิ่ม`}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                        onPress={
                                            () => this.props.navigation.navigate('Paymentchannel')
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
    saveDateSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReservScreen)