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
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HomeBoothReportDetailsScreen extends React.Component {

    state = {
        data : [],
        service : [],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อมูลการจองตลาด`}</Text>
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
        const { data,service } = this.props.route.params
        await this.setState({ data : data,service:service })
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[{padding:10,backgroundColor: '#eee',borderRadius:10}]}>
                        <Text style={[styles.text20, { color: primaryColor }]}>{`Singha Complex 1`}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`วันที่ขายของ : ` + moment(this.state.data.booking_detail_date).format('LL')}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`บูธ : C03`}</Text>
                        <View style={[styles.containerRow,{paddingTop:5}]}>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`สถานะ : รอชำระเงิน`}</Text>
                            <Text style={[styles.text16, { color: 'red' }]}>{` เหลือเวลาในการจอง 9:12 นาที`}</Text>
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>

                
                    <View style={{ flexDirection:'row',padding: 5 }}>
                        <Text style={[styles.text18, styles.bold]}>{`รายการสินค้าที่ขาย : `}</Text>
                        <Text style={[styles.text18, { paddingLeft: 5 }]}>{`อาหารญี่ปุ่น`} 
                        {
                            // props.userInfo.product.map((v, i) => {
                            //     return i < (props.userInfo.product.length - 1) ? (v.product_name + ', ') : v.product_name
                            // })
                        }
                        </Text>
                    </View>
                    <View style={[styles.hr]}></View>

                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text18, styles.bold]}>{`ข้อมูลลูกค้า `}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`ชื่อ : ชื่อลูกค้าจ้าา`}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`โทร : 084505405`}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`LineID : LineID`}</Text>
                    </View>
                </View>



                <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center', padding: 10 }}>
                    <View style={[styles.containerRow,{ justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.mainButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                            // onPress={
                            //     () => this.props.navigation.navigate('Registercondition')
                            // }
                            >
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`เช็คอินแทนผู้ขาย`}</Text>
                        </TouchableOpacity>
                        <View style={{width:10}}></View>
                        <TouchableOpacity style={[styles.mainButtonRound, styles.center, { backgroundColor: '#a90000' }]}
                            // onPress={
                            //     () => this.props.navigation.navigate('Login')
                            // }
                            >
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`ตัดบูธ`}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.text16,{padding:5}]}>{`ยังไม่ได้เช็คอิน`}</Text>
                    <View style={[styles.containerRow,{alignItems: 'center',flex:1 }]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor,flex:1 }]}
                            onPress={
                                () => this.handleBack()
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
                        </TouchableOpacity>
                    </View>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBoothReportDetailsScreen)