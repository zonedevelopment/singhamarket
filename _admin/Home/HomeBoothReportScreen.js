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
    CHECK_BOOTH_URL,
    SUBMIT_FAVERITE_URL,
    greenColor
} from '../../utils/contants'

import styles from '../../style/style'
import ic_plan from '../../assets/image/icon_plan_gold.png'

import {
    openIndicator,
    dismissIndicator,
    saveDateSelected,
    setStatePreviousScreen
} from '../../actions'
import Hepler from '../../utils/Helper'
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HomeBoothReportScreen extends React.Component {
    backHandlerSubscription = null

 
    state = {
        dayItem: {},
        dateSelected: [],
        ddlSelectedDate : '',
        listBooth : [
            {
                booth_name : 'A001',
                product_cate_name : 'ว่าง',
                checkin : false,
                booth_status_id:1,
                booking_status_background_color : '#f2fff6'
            },
            {
                booth_name : 'A002',
                product_cate_name : 'ว่าง',
                checkin : false,
                booth_status_id:1,
                booking_status_background_color : '#f2fff6'
            },
            {
                booth_name : 'A003',
                product_cate_name : 'ขนมหวาน',
                checkin : true,
                booth_status_id:2,
                booking_status_background_color : '#fffbf0'
            },
            {
                booth_name : 'A004',
                product_cate_name : 'ชานม',
                checkin : true,
                booth_status_id:3,
                booking_status_background_color : '#fff6f5'
            },
            {
                booth_name : 'A005',
                product_cate_name : 'อาหารญี่ปุ่น',
                checkin : true,
                booth_status_id:3,
                booking_status_background_color : '#fff6f5'
            },
            {
                booth_name : 'A006',
                product_cate_name : 'เครื่องดื่มสมุนไพร',
                checkin : false,
                booth_status_id:3,
                booking_status_background_color : '#fff6f5'
            },
            {
                booth_name : 'A007',
                product_cate_name : 'อาหารญี่ปุ่น',
                checkin : false,
                booth_status_id:3,
                booking_status_background_color : '#fff6f5'
            },
        ],
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity  style={[styles.containerRow, { padding: 5, height: 50, margin: -4 }]}
            onPress={()=>{
                {
                    if(item.booth_status_id == 3){
                        this.props.navigation.navigate('HomeBoothReportDetails')
                    }
                }
            }}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, margin: 4, backgroundColor: item.booth_status_id == 1 ? emptyColor : item.booth_status_id == 2 ? pendingColor : reservColor }}></View>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`${item.booth_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.50, backgroundColor: item.booking_status_background_color, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text16, { color: primaryColor, alignSelf: 'flex-start' }]}>{item.product_cate_name}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'center', alignItems: 'center', padding: 5 }]}>
                    <Icon name='check-square' size={25} color={item.checkin == true ? greenColor : grayColor} />
                    {
                        item.booth_status_id == 3 ? 
                        <Icon style={{paddingLeft:10}} name='chevron-right' size={20} color={grayColor} />
                        : 
                        null
                    }
                    
                </View>
            </TouchableOpacity>
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
                <Text style={[styles.text18, { color: 'white' }]}>{`รายงานการจองตลาด`}</Text>
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
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    render() {
        const props = this.props.reducer
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
                        <Text style={[styles.text18, styles.bold, { flex: 0.6, color: primaryColor }]}>{`รายงานการจองพื้นที่ตลาด`}</Text>
                    </View>
                    <View style={[styles.containerRow, {  alignItems: 'center'}]}>
                        <View style={{flex:0.6}}>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, styles.center, { paddingLeft:0, backgroundColor: primaryColor }]}
                                onPress={
                                    () => {
                                        //this._showDateTimePicker('Start')
                                    }
                                }>
                                <Text style={[styles.text16, { color: '#FFF' }]}>{'Singha Complex 1'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.4}}>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon,  { flexDirection:'row', paddingLeft:0,backgroundColor: primaryColor }]}
                                onPress={
                                    () => {
                                        //this._showDateTimePicker('End')
                                    }
                                }>
                                <View style={{alignItems:'flex-start',paddingLeft:10}}>
                                    <Text style={[styles.text16, {color: '#FFF' }]}>{'วันที่'}</Text>
                                </View>
                                <View style={{alignItems:'flex-end',paddingRight:15}}>
                                    <Icon name='calendar' size={20} color='white' />
                                </View>
                                
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View stlye={[styles.containerRow]}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',padding:10 }}>
                            <View style={{flex:0.6}}>
                                <Text style={[styles.text18, { color: primaryColor ,fontWeight:'bold'}]}>{`Singha Complex 1`}</Text>
                            </View>
                            <View style={{flex:0.1,alignItems:'flex-end'}}>
                                <Icon name='calendar' size={12} color={primaryColor} />
                            </View>
                            <View style={{flex:0.4,paddingLeft:5}}>
                                <Text style={[styles.text12, { color: primaryColor }]}>{'วันที่ 27 มีนาคม 2563'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>

                    <View style={[{ padding: 5 ,backgroundColor: '#f8f8f8'}]}>
                        <View style={[styles.containerRow, { height: 40}]}>
                            <View style={{ flex: 0.75, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                                <Text style={[styles.text16, { color: 'white' }]}>{`ร้ายค้าทั้งหมด`}</Text>
                            </View>
                            <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                                <Text style={[styles.text18, { color: 'white' }]}>{` 30 ร้าน`}</Text>
                            </View>
                        </View>
                        <View style={[styles.containerRow, { height: 40,borderColor:'#ddd',borderBottomWidth:1  }]}>
                            <View style={{ flex: 0.75,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5 }}>
                                <View style={[styles.circleGreen]}></View>
                                <Text style={[styles.text16, { paddingLeft:10,color: primaryColor }]}>{`ว่าง`}</Text>
                            </View>
                            <View style={{ flex: 0.25, justifyContent: 'center', padding: 5 }}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{` 2 ร้าน`}</Text>
                            </View>
                        </View>
                        <View style={[styles.containerRow, { height: 40,borderColor:'#ddd',borderBottomWidth:1 }]}>
                            <View style={{ flex: 0.75,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5 }}>
                                <View style={[styles.circleYellow]}></View>
                                <Text style={[styles.text16, { paddingLeft:10,color: primaryColor }]}>{`รอชำระเงิน`}</Text>
                            </View>
                            <View style={{ flex: 0.25, justifyContent: 'center', padding: 5 }}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{` 1 ร้าน`}</Text>
                            </View>
                        </View>
                        <View style={[styles.containerRow, { height: 40 }]}>
                            <View style={{ flex: 0.75,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5 }}>
                                <View style={[styles.circleRed]}></View>
                                <Text style={[styles.text16, { paddingLeft:10,color: primaryColor }]}>{`จองแล้ว`}</Text>
                            </View>
                            <View style={{ flex: 0.25, justifyContent: 'center', padding: 5 }}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{` 27 ร้าน`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
        
                
                    <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`Booth No.`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.50, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`เช็คอิน`}</Text>
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
    saveDateSelected,
    setStatePreviousScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBoothReportScreen)