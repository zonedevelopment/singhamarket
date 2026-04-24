import React from 'react'
var numeral = require('numeral')
import {
    View,
    Text,
    FlatList,
    Alert,
    Dimensions,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { NavigationBar } from 'navigationbar-react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'
import Image from 'react-native-fast-image'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    KEY_LOGIN,
    BASE_URL,
    HEADERFORMDATA,
    AUDIT_LIST_BOOKING_SLIP
} from '../../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ListAuditBookingScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        ListData: [],
        isFetching: false,
    }

    componentWillUnmount() {
       // if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        this.LoadData()
       // this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadData () {
        this.props.openIndicator()
        let formData = new FormData()
        formData.append('member_id',this.props.reducer.userInfo.userid)
        Hepler.post(BASE_URL + AUDIT_LIST_BOOKING_SLIP,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data,
                    isFetching: false
                })
            } else {
                this.setState({
                    ListData : [],
                    isFetching: false
                })
                Alert.alert(results.message)
                this.setState({ListData : []})
            }
        })
    }

    
    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }

    _renderListItem  = ({ item, index }) => {
        const props = this.props.reducer
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity 
                    onPress={
                        () => this.props.navigation.navigate('AuditSaveSlipPayment',{
                            data : item,
                        })
                    }
                    >
                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center',padding:5 }]}>
                        <View style={{ flex: 0.7 }}>
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{'เลขการจอง : ' + item.booking_id }</Text>
                                {/* <Text style={[styles.text12, { color: 'red' }]}>{`เหลือเวลาในการจองอีก ` + item.Timelate + ` นาที`}</Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <View style={[styles.containerRow, { justifyContent: 'flex-end' }]}>
                                <Icon name='chevron-right' size={16} color='gray' />
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
                </TouchableOpacity>
            </View>
        )
    }
 

    render() {
        const props = this.props.reducer
     
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                keyExtractor={(item) => item.booking_id}
                                renderItem={this._renderListItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAuditBookingScreen)