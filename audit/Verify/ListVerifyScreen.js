import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { Picker } from "native-base"
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    greenColor,
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA,
    alpaGreen
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class ListVerifyScreen extends React.Component {

    state = {
        ListData : [
            {
                date : '27 มีนาคม ',
                totalBooth : 30,
                totalBooking : 30,
                totalEmpty : 0,
                totalWating : 0,
                status : 'gray'
            },
            {
                date : '28 มีนาคม ',
                totalBooth : 30,
                totalBooking : 30,
                totalEmpty : 0,
                totalWating : 0,
                status : 'gray'
            },
            {
                date : '29 มีนาคม ',
                totalBooth : 30,
                totalBooking : 20,
                totalEmpty : 1,
                totalWating : 9,
                status : 'green'
            },
            {
                date : '30 มีนาคม ',
                totalBooth : 30,
                totalBooking : 20,
                totalEmpty : 1,
                totalWating : 9,
                status : 'green'
            },
            {
                date : '31 มีนาคม ',
                totalBooth : 30,
                totalBooking : 30,
                totalEmpty : 0,
                totalWating : 0,
                status : 'gray'
            },
        ],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ตรวจสอบพื้นที่ตลาด`}</Text>
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

    async componentDidMount() {
        // const { data,service } = this.props.route.params
        // await this.setState({ data : data,service:service })
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }



    _renderItem = ({ item, index }) => {
        const props = this.props.reducer
        let bgColor = item.status == 'gray' ? '#eee' : '#dbebed'
        let color = item.status == 'gray' ? grayColor : greenColor
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#eee' , padding: 10 }}>
                <View style={{ marginBottom: 5 ,marginTop: 5 ,padding:10,borderRadius:10,backgroundColor:bgColor }}>
                    <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                        <View style={{flex: 1,flexDirection:'row'}}>
                            <View style={{ width: 20,height: 20,borderRadius:50,backgroundColor: color}}></View>
                            <Text style={{paddingLeft:5,fontWeight:'bold',fontSize:14}}>{item.date}</Text>
                        </View>
                        <View >
                            <Text style={{
                                textAlign: 'right',
                                borderRadius:5,
                                color:'#FFF',
                                padding:2,
                                paddingLeft:5,
                                paddingRight:5,
                                fontSize:14,
                                backgroundColor:color
                                }}>
                                    จำนวนบูธ {item.totalBooth}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1, padding:20,backgroundColor:'#FFF',borderRadius:15,flexDirection: 'row'}}>
                        <View style={{flex: 1,textAlign: 'left'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{item.totalBooking}</Text>
                            <Text style={[styles.TextFlexList]}>จองแล้ว</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'center'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>
                                {item.totalEmpty}
                            </Text>
                            <Text style={[styles.TextFlexList]} >ว่าง</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'right'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{item.totalWating}</Text>
                            <Text style={[styles.TextFlexList]}>รอชำระเงิน</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
              
                        </View>
                        <View style={{flex: 1,marginTop:5}}>
                            <TouchableOpacity 
                                onPress={
                                    () => {
                                        this.props.navigation.push('HomeBoothReport');
                                    }
                                }>
                                <Text style={[styles.text14,{textAlign: 'right'}]}>ดูรายละเอียด</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
               
            </View>
        )
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
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text14, { color: primaryColor }]}>{`วันที่ 27 มีนาคม 2563`}</Text>
                    </View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text18, { color: primaryColor }]}>{`ตลาด Singha Complex 1`}</Text>
                        <Text style={[styles.text18, { color: '#D4AC0D' }]}>{` จำนวน 50 ร้านค้า`}</Text>
                    </View>
                    {/* <View style={{flex: 1, padding:20,backgroundColor:'#FFF',borderRadius:15,flexDirection: 'row'}}>
                        <View style={{flex: 1,textAlign: 'left'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{item.totalBooking}</Text>
                            <Text style={[styles.TextFlexList]}>จองแล้ว</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'center'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>
                                {item.totalEmpty}
                            </Text>
                            <Text style={[styles.TextFlexList]} >ว่าง</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'right'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{item.totalWating}</Text>
                            <Text style={[styles.TextFlexList]}>รอชำระเงิน</Text>
                        </View>
                    </View> */}
                    

                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ListVerifyScreen)