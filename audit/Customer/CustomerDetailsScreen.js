import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions,
    Alert,
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
    HEADERFORMDATA,
    greenColor,
    AUDIT_CUSTOMER_BOOTH
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class CustomerDetailsScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        ListData : [],
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

    componentDidMount() {
        this.LoadData()
        //const { data,service } = this.props.route.params
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }



    LoadData () {
        const { partners_id,name_customer,phone,lineid } = this.props.route.params
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_id',partners_id)
        Hepler.post(BASE_URL + AUDIT_CUSTOMER_BOOTH,formData,HEADERFORMDATA,(results) => {
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

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={[styles.containerRow, { padding: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }]}
            onPress={
            () => {
                this.props.navigation.push('AuditHistoryDetails',{
                    Details : item
                });
            }}>

                <View style={{ flexDirection: 'row',flex: 0.2, alignItems: 'center', justifyContent: 'center',paddingRight:10 }}>
                    <View  style={[{ backgroundColor: '#009933',padding:15,borderRadius:5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={[{ justifyContent: 'center' ,color:'#FFFFFF', fontWeight: 'bold',fontSize:16 }]}>
                            {item.booth_name}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row',flex: 0.7 , alignItems: 'center', }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.text16,styles.bold,{color:primaryColor}]}>วันที่ขาย :  {moment(item.booking_detail_date).format('ll')}</Text>
                        <Text style={[styles.text14]}>{item.name_market}</Text>
                        <Text style={[styles.text14]}>{item.product_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name='chevron-right' size={15} color={primaryColor} style={{textAlign: 'right',justifyContent: 'center' }}/>
                </View>
            </TouchableOpacity>
        )
    }


    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }


    render() {
        const { partners_id,name_customer,phone,lineid } = this.props.route.params
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{'รายละเอียดลูกค้า'}</Text>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[{padding:10,backgroundColor: '#eee',borderRadius:10}]}>
                        <Text style={[styles.text16, { color: primaryColor }]}>{`ชื่อ : ` + name_customer}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`โทร : ` + phone}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`LineID : ` + lineid}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text18, styles.bold]}>{`รายการจองพื้นที่ร้านค้า `}</Text>
                        <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} />
                    </View>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                keyExtractor={(item) => item.booking_details_id}
                                renderItem={this._renderItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
                            </View>
                    }
                </View>
{/* 
                <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center', padding: 10 }}>
                    <View style={[styles.containerRow,{alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor,flex:1 }]}
                            onPress={
                                () => this.handleBack()
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}


             
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsScreen)