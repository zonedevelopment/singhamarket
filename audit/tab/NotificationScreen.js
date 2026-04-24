import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    HEADERFORMDATA,
    AUDIT_NOTIFICATION_URL
} from '../../utils/contants'
import Hepler from '../../utils/Helper'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'

import styles from '../../style/style'

class NotificationScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        ListData : [],
        isFetching: false,
    }


    _renderItem = ({ item }) => {
        return (
            <View style={{ width:'90%',alignSelf: 'center' }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', paddingTop:10,paddingBottom:10,justifyContent: 'space-between' }]}
                    onPress={
                        () => null
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 ,alignSelf:'center'}}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{item.booth_name}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, { color: 'red'}]}>{`Booth `+item.booth_name+` ชำระค่าปรับเรียบร้อยแล้ว`}</Text>
                            <Text style={[styles.text14, { color: 'red'}]}>{'จำนวนเงิน ' + item.audit_charge_total + ' บาท' }</Text>
                            <Text style={[styles.text14]}>{'วันที่ขายของ ' + moment(item.booking_detail_date).format('LL')}</Text>
                            <Text style={[styles.text14]}>{'วันที่ชำระเงิน ' + moment(item.audit_charge_payment_date).format('LLL')}</Text>
                        </View>
                    </View>
                    <Icon  name='chevron-right' size={16} color='gray' />
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
            </View>
        )
    }


    componentWillUnmount() {
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.LoadData()
        });
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }
    
    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }

    
    LoadData = () => {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('member_id',this.props.reducer.userInfo.userid)
        Hepler.post(BASE_URL + AUDIT_NOTIFICATION_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_NOTIFICATION_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data,
                    isFetching: false
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    ListData : [],
                    isFetching: false
                })
                this.props.dismissIndicator()
                //Alert.alert(results.message)
            }
        })

    }


    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.containerRow,{width: '90%', marginLeft: 10}]}>
                        <Text style={[styles.text20, { color: primaryColor }]}>{`รายการแจ้งเตือน`}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, width:'90%',alignSelf: 'center',}} /> 
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                keyExtractor={(item) => item.booking_detail_id}
                                renderItem={this._renderItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบข้อมูลการแจ้งเตือน`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)