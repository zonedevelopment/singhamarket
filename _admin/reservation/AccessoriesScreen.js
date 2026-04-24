import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    HEADERFORMDATA,
    BASE_URL,
    GET_ACCESSOIRES_URL
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    setAuditReservDate
} from '../../actions'

import styles from '../../style/style'
import Hepler from '../../utils/Helper'
import ic_image from '../../assets/image/icon_photo.png'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class AccessoriesScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        ListAccessoire : []
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { padding: 5, /*height: '',*/ borderWidth: 0.5, borderColor: grayColor, marginLeft: 5, marginRight: 5 }]}>
                <View style={{ flex: 0.6, backgroundColor: 'white', justifyContent: 'center', padding: 2 }}>
                    <Text style={[styles.text14, { color: primaryColor }]}>{`${item.service_name}`}</Text>
                    <Text style={[styles.text12, { color: grayColor }]}>{`(จุดละ ${item.service_price} บาท)`}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: grayColor }}></View>
                <View style={{ flex: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                         onPress={
                            () => {
                                this.DelItem(item.service_id);
                            }
                        }>
                            <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 8, marginRight: 8, textAlignVertical: 'center' }}>{`${item.selected_qty}`}</Text>
                        <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}
                         onPress={
                            () => {
                                this.plusItem(item.service_id);
                            }
                        }>
                            <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: 1, backgroundColor: grayColor }}></View>
                <View style={{ flex: 0.25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={[styles.text14, { color: primaryColor }]}>{`${item.total_price}`}</Text>
                </View>
            </View>
        )
    }

    plusItem = (service_id) => {
        this.props.openIndicator()
        let arr = this.state.ListAccessoire;
        let index = arr.findIndex(k => k.service_id == service_id);
        arr[index].selected_qty = arr[index].selected_qty + 1;
        arr[index].total_price = parseFloat(arr[index].total_price) + parseFloat(arr[index].service_price)
        this.setState({
            ListAccessoire: arr
        });
        this.props.dismissIndicator()
    }

    DelItem = (service_id) => {
        this.props.openIndicator()
        let arr = this.state.ListAccessoire;
        let index = arr.findIndex(k => k.service_id == service_id);
        if (arr[index].selected_qty > 0) {
            arr[index].selected_qty = arr[index].selected_qty - 1;
            arr[index].total_price = parseFloat(arr[index].total_price) - parseFloat(arr[index].service_price)
            this.setState({
                ListAccessoire: arr
            });
        }
        this.props.dismissIndicator()
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
                <Text style={[styles.text18, { color: 'white' }]}>{`อุปกรณ์เสริม`}</Text>
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

    componentDidMount() {
        this.LoadData()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    LoadData = () => {
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_ACCESSOIRES_URL,null,HEADERFORMDATA,(results)=>{
            console.log('GET_ACCESSOIRES_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({ListAccessoire : results.data})
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
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
                    <View>
                        <Text style={[styles.text18, styles.bold, { paddingLeft: 10 }]}>{`อุปกรณ์เสริม`}</Text>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#f3f3f3', borderWidth: 0.5, borderColor: 'gray', borderRadius: 4 }}>
                        <View>
                            <Text style={[styles.text14, { paddingLeft: 10 }]}>{`อุปกรณ์เสริมมาตรฐาน`}</Text>
                            {
                                props.standardAccessories.map((v, i) => {
                                    let no = i + 1
                                    return (
                                        <View key={i} style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, margin: 2 }]}>
                                            <Text style={[styles.text14]}>{`${no}. ${v.name}`}</Text>
                                            {
                                                v.image != '' ?
                                                    <Image source={{ uri: v.image }} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={ic_image} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View>
                        <Text style={[styles.text18, styles.bold, { paddingLeft: 10 }]}>{`บริการเสริม`}</Text>
                    </View>
                    <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                        <View style={{ flex: 0.6, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการ`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`จำนวน/ชุด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text14, { color: 'white' }]}>{`ราคา/บาท`}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.ListAccessoire}
                        keyExtractor={(item) => item.service_id}
                        extraData={this.state}
                        renderItem={this._renderItem} />
                    <View>
                        <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากตรวจพบหน้างาน แล้วไม่ตรงตามที่ท่านระบุไว้\nคิดค่าปรับ 500 บาท + ค่าบริการจริง`}</Text>
                    </View>
                </View>
                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                        onPress={
                            () => {
                                this.props.openIndicator()
                                let arrCart = this.props.reducer.audit_reserv_date
                                arrCart.map((v,i)=>{
                                    let arrAccessorie = []
                                    this.state.ListAccessoire.map((v,i)=>{
                                        arrAccessorie.push({
                                            service_id : v.service_id,
                                            qty : 0,
                                            service_price : v.service_price,
                                            total_price : 0,
                                            service_name : v.service_name
                                        })
                                    })
                                    arrCart[i]['other_service'] = arrAccessorie
                                })
                                this.props.setAuditReservDate( arrCart)
                                this.props.dismissIndicator()
                                this.props.navigation.navigate('ReservSummaryAudit')
                            }
                        }>
                        <Text style={[styles.text14, { color: '#FFF' }]}>{`ไม่รับบริการเสริม`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => {
                                this.props.openIndicator()
                                let arrCart = this.props.reducer.audit_reserv_date
                                arrCart.map((Cart_v,Cart_i)=>{
                                    let arrAccessorie = []
                                    this.state.ListAccessoire.map((v,i)=>{
                                        arrAccessorie.push({
                                            service_id : v.service_id,
                                            qty : v.selected_qty,
                                            service_price : v.service_price,
                                            total_price : v.total_price,
                                            service_name : v.service_name
                                        })
                                    })
                                    arrCart[Cart_i]['other_service'] = arrAccessorie
                                })
                                this.props.setAuditReservDate(arrCart)
                                this.props.dismissIndicator()
                                this.props.navigation.navigate('ReservSummaryAudit')
                            }
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ตกลง`}</Text>
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
    setAuditReservDate
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesScreen)