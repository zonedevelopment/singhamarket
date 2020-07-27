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
class VerifyBoothScreen extends React.Component {

    state = {
        CHK_SUCCESS : false,
        CHK_FAIL : false,
        DisabledTxtChkFail : false,
        TxtChkFail : "",
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ประเมินร้านค้า`}</Text>
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
                    if(item.booth_status_id == 3){
                       // this.props.navigation.navigate('HomeBoothReportDetails')
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
                        <View style={{flex:0.6}}>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text18, { color: secondaryColor }]}>{`เลขที่จอง 0105015015`}</Text>
                            </View>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text14, { color: primaryColor }]}>{`Booth No. C01`}</Text>
                            </View>
                        </View>
                        <View style={{flex:0.2}}>
                            <TouchableOpacity style={[{ flex:1,backgroundColor: grayColor, marginRight:5,justifyContent: 'center', alignItems: 'center', padding: 5,borderRadius:5 }]}>
                                <Text style={[styles.text12, {textAlign:'center', color: '#ddd' }]}>{`เช็คอินแทนผู้ขาย`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.2}}>
                            <TouchableOpacity style={[{ flex:1,backgroundColor: redColor, marginRight:5, justifyContent: 'center', alignItems: 'center', padding: 5,borderRadius:5 }]}>
                                <Text style={[styles.text12, {textAlign:'center', color: '#ddd' }]}>{`ตัดบูธ`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    

                    <View style={[styles.marginBetweenVertical]}></View>
                   

                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 0.4, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`ประเภทสินค้า`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.6, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการสินค้า`}</Text>
                        </View>
                    </View>
                    <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                        <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor }]}>{`อาหาร`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.6, justifyContent: 'flex-start',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'อาหารญี่ปุ่น'}</Text>
                        </View>
                    </View>

                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>

                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text16, { color: primaryColor }]}>{`บริการเสริม`}</Text>
                    </View>
                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 0.4, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการ`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`จำนวน/จุด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`ราคา/บาท`}</Text>
                        </View>
                    </View>
                    <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                        <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor }]}>{`ไฟฟ้าและแสงสว่าง`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1'}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1300'}</Text>
                        </View>
                    </View>
                    <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                        <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor }]}>{`ไฟฟ้าและแสงสว่าง`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1'}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1300'}</Text>
                        </View>
                    </View>
                    <View  style={[styles.containerRow, { borderWidth:0.5,borderColor:'#ddd', height: 50}]}>
                        <View style={[styles.containerRow, { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor }]}>{`ไฟฟ้าและแสงสว่าง`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1'}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: '#ddd' }}></View>
                        <View style={[styles.containerRow, { flex: 0.3, justifyContent: 'flex-start',alignContent:'center',alignItems: 'center', padding: 5 }]}>
                            <Text style={[styles.text14, { color: primaryColor}]}>{'1300'}</Text>
                        </View>
                    </View>

                    
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { paddingTop:5, height: 50 }]}>
                        <View style={{ flex: 1, backgroundColor: primaryColor, justifyContent: 'center',  padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`แบบประเมิน`}</Text>
                        </View>
                    </View>
                    <CheckBox
                        title={'ผ่านการประเมิน'}
                        textStyle={{fontSize:16}}
                        containerStyle={{backgroundColor:'white',borderWidth:0,padding:10,margin:0}}
                        checked={this.state.CHK_SUCCESS}
                        onPress={
                            () => {
                                this.setState({
                                    CHK_SUCCESS : this.state.CHK_SUCCESS == false ? true : false,
                                    CHK_FAIL : false,
                                    DisabledTxtChkFail : false,
                                    TxtChkFail : "",
                                });
                            }
                        }
                    />
                    <CheckBox
                        title={'ทำผิดกฏ'}
                        textStyle={{fontSize:16}}
                        containerStyle={{backgroundColor:'white',borderWidth:0,padding:10,margin:0}}
                        checked={this.state.CHK_FAIL}
                        onPress={
                            () => {
                                this.setState({
                                    CHK_FAIL : this.state.CHK_FAIL == false ? true : false,
                                    CHK_SUCCESS : false,
                                    DisabledTxtChkFail : this.state.CHK_FAIL == false ? true : false,
                                    TxtChkFail : "",
                                });
                            }
                        }
                    />

                    <View style={{ backgroundColor:"whitesmoke",borderColor:"#e3e3e3",borderWidth:1}}>
                        <Text style={{marginTop: 0,fontSize: 16,padding: 10}}>
                            {'บริการเสริม'}
                        </Text>


                        <Text style={{marginTop: 0,fontSize: 16,padding: 10}}>{'ความเสียหาย'}</Text>
                        <View style={{paddingRight:10,paddingLeft:10,paddingBottom:10}}>
                            <TextInput
                            underlineColorAndroid='#FFFFFF'
                            placeholder="กรุณากรอกความเสียหาย"
                            value={this.state.TxtChkFail}
                            onChangeText={(text) => this.setState({TxtChkFail : text})}
                            editable={this.state.DisabledTxtChkFail}
                            selectTextOnFocus={this.state.DisabledTxtChkFail}
                            multiline={true}
                            numberOfLines={7}
                            style={{ textAlignVertical: 'top',borderColor:"#e3e3e3",borderWidth:1,fontSize:14,backgroundColor:"#FFFFFF",height:100}}/>
                        </View>

                    </View>



                    {/* {
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
                    } */}

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
                        <TouchableOpacity style={{borderRadius:5,borderWidth:0.5,borderColor:'#ddd',paddingLeft:5,paddingRight:5, height: 100,width:100, alignItems: 'center', justifyContent: 'center' }}
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
                            // onPress={
                            //     () => this.handleBack()
                            // }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBoothScreen)