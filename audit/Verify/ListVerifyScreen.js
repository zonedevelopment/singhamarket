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
    pendingColor,
    reservColor,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA,
    alpaGreen,
    redColor,
    alpaYellow
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
        return (
            <TouchableOpacity  style={[styles.containerRow, { padding: 5, height: 50, margin: -4 }]}
            onPress={()=>{
                {
                    this.props.navigation.navigate('VerifyBooth')
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
                <ScrollView style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text14, { color: primaryColor }]}>{`วันที่ 27 มีนาคม 2563`}</Text>
                    </View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text18, { color: primaryColor }]}>{`ตลาด Singha Complex 1`}</Text>
                        <Text style={[styles.text18, { color: '#D4AC0D' }]}>{` จำนวน 50 ร้านค้า`}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{padding:15,borderColor:'#eee',borderWidth:1,backgroundColor:'#F4F6F6',borderRadius:15}}>
                        <View style={[styles.containerRow]}>
                            <View style={{flex:0.1}}>
                                <View style={{ width: 20,height: 20,borderRadius:50,backgroundColor: greenColor}}></View>
                            </View>
                            <View style={{flex:0.7}}>
                                <Text>{'ผ่านการประเมิน'}</Text>
                            </View>
                            <View style={{flex:0.2,alignItems:'flex-end'}}>
                                <Text>{'20'}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#ddd',marginBottom:5}}></View>
                        <View style={[styles.containerRow]}>
                            <View style={{flex:0.1}}>
                                <View style={{ width: 20,height: 20,borderRadius:50,backgroundColor: secondaryColor}}></View>
                            </View>
                            <View style={{flex:0.7}}>
                                <Text>{'รอตรวจ'}</Text>
                            </View>
                            <View style={{flex:0.2,alignItems:'flex-end'}}>
                                <Text>{'20'}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth:1,borderColor:'#ddd',marginBottom:5}}></View>
                        <View style={[styles.containerRow]}>
                            <View style={{flex:0.1}}>
                                <View style={{ width: 20,height: 20,borderRadius:50,backgroundColor: redColor}}></View>
                            </View>
                            <View style={{flex:0.7}}>
                                <Text>{'ฝ่าผืนกฏ'}</Text>
                            </View>
                            <View style={{flex:0.2,alignItems:'flex-end'}}>
                                <Text>{'20'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>

                    <View style={[styles.containerRow, { paddingBottom:5,paddingTop:5, height: 55 }]}>
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

                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ }}>
                        {/* {
                            this.state.dataImages.length > 0 ?
                            <PhotoGrid
                                data={this.state.dataImages}
                                itemsPerRow={3}
                                itemMargin={1}
                                itemPaddingHorizontal={1}
                                renderItem={this.renderImages} 
                            /> : <Text>ไม่มีรูปภาพ</Text>

                        }
                         */}
                        <TouchableOpacity style={{borderRadius:5,borderWidth:1,borderColor:'#ddd',paddingLeft:5,paddingRight:5, height: 100,width:100, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                //this.onSelectedPhoto();
                            }}
                        >
                            <Icon name='plus' size={20} color={primaryColor}/>
                            <Text style={{fontSize:14,fontWeight:"bold",color:primaryColor}}>
                                {`เพิ่มรูปภาพ`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow,{alignItems: 'center',flex:1,marginBottom:20 }]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor,flex:1 }]}
                            onPress={
                                () => this.props.navigation.navigate('AuditSuccess')
                            }
                            >
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`เสร็จสิ้น`}</Text>
                        </TouchableOpacity>
                    </View>

                    
                </ScrollView>
            
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