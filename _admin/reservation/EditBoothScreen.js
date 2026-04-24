import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Alert,
    Dimensions,
    BackHandler,
    Picker,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    pendingColor,
    reservColor,
    alpaGreen,
    alpaYellow,
    alpaRed,
    HEADERFORMDATA,
    BASE_URL,
    GET_BOOTH_URL,
    CHECK_BOOTH_URL
} from '../../utils/contants'

import styles from '../../style/style'
import ic_plan from '../../assets/image/icon_plan_gold.png'

import {
    openIndicator,
    dismissIndicator,
    setAuditReservDate,
    setStatePreviousScreen
} from '../../actions'
import Hepler from '../../utils/Helper'
const DEVICE_HEIGHT = Dimensions.get('screen').height
class EditBoothScreen extends React.Component {
    backHandlerSubscription = null

 
    state = {
        dayItem: {},
        dateSelected: [],
        ddlSelectedDate : '',
        listBooth : [],
    }

    async onSelectBooth(item) {
        let { day } = this.props.route.params
        let arrDaySelected = this.props.reducer.audit_reserv_date
        arrDaySelected.map((v,i) => {
            if(v.date == day){
                v['boothSelectID'] = item.booth_detail_id
                v['boothSelectName'] = item.booth_name
                v['boothSelectPrice'] = item.booth_amount
            }
        })
        this.props.setStatePreviousScreen('ReservEditBoothAudit')
        this.props.setAuditReservDate(arrDaySelected)
        this.props.navigation.navigate('ReservSummaryAudit')
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { padding: 5,  margin: -4 }]}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, margin: 4, backgroundColor: item.booth_status_id == 1 ? emptyColor : item.booth_status_id == 2 ? pendingColor : reservColor }}></View>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`${item.booth_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.75, backgroundColor: item.booking_status_background_color, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text16, { flex: 0.75, color: primaryColor, alignSelf: 'flex-start', paddingLeft: 5 }]}>{item.product_cate_name}</Text>
                    {
                        item.booth_status_id == "1" ?
                            <TouchableOpacity style={[styles.circleGreen, styles.center, { flex: 0.25 }]}
                                onPress={
                                    () => this.onSelectBooth(item)
                                }>
                                <Text style={[styles.text14, { color: primaryColor }]}>{`ว่าง`}</Text>
                            </TouchableOpacity>
                            :
                            item.booth_status_id == "2" ?
                                <TouchableOpacity style={[styles.circleYellow, styles.center, { flex: 0.25 }]}>
                                    <Text style={[styles.text14, { color: primaryColor }]}>{`แจ้งเตือน`}</Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.circleRed, styles.center, { flex: 0.25 }]}>
                                    <Text style={[styles.text14, { color: primaryColor }]}>{`เต็ม`}</Text>
                                </View>
                    }
                </View>
            </View>
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกบูธขายของ`}</Text>
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
            //this.props.navigation.pop();
            this.props.navigation.goBack()
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
        let { day } = this.props.route.params
        this.setSelectedDate(day)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillReceiveProps(nextProps){
        const { day } = nextProps.route.params
        // if(this.props.reducer.previous_screen == 'DaySelected'){
        //     this.setSelectedDate(day)
        //     this.props.setStatePreviousScreen('Booth')
        // }
    }

    setSelectedDate(itemValue){
        if(itemValue != ''){
            this.setState({ddlSelectedDate : itemValue})
            this.props.openIndicator()
            let formData = new FormData();
            formData.append('building_id',this.props.reducer.audit_reserv_building.building_id)
            formData.append('partners_id',this.props.reducer.audit_reserv_partners.partners_id)
            formData.append('floor_id',this.props.reducer.audit_reserv_floor.selectedValue)
            formData.append('zone_id',this.props.reducer.audit_reserv_zone.selectedValue)
            formData.append('date',itemValue)
            formData.append('product_type_id',this.props.reducer.audit_reserv_partners.product_type.type_id)
            formData.append('product_cate_id',this.props.reducer.audit_reserv_partners.product_type.cate_id)
            Hepler.post(BASE_URL + GET_BOOTH_URL,formData,HEADERFORMDATA,(results) => {
                console.log('GET_BOOTH_URL',results)
                if (results.status == 'SUCCESS') {
                    this.setState({listBooth : results.data})
                    this.props.dismissIndicator()
                } else {
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
            })
        }
    }

    render() {
        const props = this.props.reducer
        let { day } = this.props.route.params
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
                <View style={[styles.container, { padding: 15 }]}>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text18, styles.bold, { flex: 0.6, color: primaryColor }]}>{`เลือกบูธที่ต้องการขายของ`}</Text>
                        {/* <TouchableOpacity style={[styles.containerRow, { flex: 0.4, alignItems: 'center', justifyContent: 'flex-end' }]}
                            onPress={
                                () => this.props.navigation.push('Plan')
                            }>
                            <Image source={ic_plan} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                            <Text style={[styles.text14, { color: primaryColor, marginLeft: 2 }]}>{`ดูแปลนพื้นที่ขายของ`}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>


                    <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                        
                        <Picker
                            enabled={false}
                            selectedValue={day}
                            style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                            //onValueChange={(itemValue, itemIndex) => this.setSelectedDate(itemValue)} 
                            >
                            <Picker.Item label={moment(day).format('LL')} value={day} />
                        </Picker>
                    </View>

                 
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`Booth No.`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.75, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียด`}</Text>
                        </View>
                    </View>
                    {
                        this.state.listBooth.length > 0 ?
                            <FlatList
                                data={this.state.listBooth}
                                extraData={this.state}
                                keyExtractor={(item) => item.booth_detail_id}
                                renderItem={this._renderItem} />
                        :
                            <View style={[styles.containerRow, { padding: 5, height: 55,alignSelf:'center' }]}>
                                <Text style={[styles.text16,{textAlign:'center',color:primaryColor}]}>{'ไม่พบข้อมูล'}</Text>
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
    setAuditReservDate,
    setStatePreviousScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBoothScreen)