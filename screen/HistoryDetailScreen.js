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
} from '../utils/contants'

import styles from '../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../actions'
import Hepler from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HistoryDetailScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        data : [],
        service : [],
        slip : [],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ประวัติการจองพื้นที่ร้านค้า`}</Text>
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    async componentDidMount() {
        const { data,service,slip } = this.props.route.params
        await this.setState({ data : data,service:service,slip:slip })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, { color: primaryColor }]}>{`วันที่ขายของ ` + moment(this.state.data.booking_detail_date).format('LL')}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.hr]}></View>
                    <View style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between', padding: 10 }]}>
                        <View style={[styles.containerRow]}>
                            <View style={{ flex: 0.2 }}>
                                <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                    <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{this.state.data.boothname}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={[styles.text14]}>{`สถานที่ ` + this.state.data.market_name}</Text>
                                <Text style={[styles.text14]}>{`บูธ ` + this.state.data.boothname}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`รายการสินค้าที่ขาย`}</Text>
                        <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- `} 
                        {
                            props.userInfo.product.map((v, i) => {
                                return i < (props.userInfo.product.length - 1) ? (v.product_name + ', ') : v.product_name
                            })
                        }
                        </Text>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`บริการเสริม`}</Text>
                        {
                            this.state.service.map((v, i) => {
                                return (<Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ` + v.service_name}</Text>)
                            })
                        }
                        {/* <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ไฟฟ้าและแสงสว่าง x2`}</Text>
                        <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ไฟฟ้าไม่เกิน 8,000 วัตต์`}</Text> */}
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`ใบเสร็จ`}</Text>
                        <View>
                            {
                                this.state.slip.map((v, i) => {
                                    return (
                                        <View style={[styles.containerRow]}>
                                            <Text style={[styles.text16 , { alignSelf: 'flex-start', flex: 0.6,paddingLeft: 5  }]}>- {v.trans_id}</Text>
                                            <TouchableOpacity style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                                onPress={
                                                    () => {
                                                        if (v.slip_url != '') {
                                                            this.props.navigation.navigate('Slip', {
                                                                slipUrl: v.slip_url
                                                            })
                                                        }
                                                    }
                                                }>
                                                <Text style={[styles.text16, styles.bold, { color: primaryColor, marginLeft: 2 }]}>{`คลิกเพื่อดูใบเสร็จ`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            } 
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center', padding: 10 }}>
                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => this.handleBack()
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailScreen)