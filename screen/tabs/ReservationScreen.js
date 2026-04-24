import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Image from 'react-native-fast-image'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    GET_BUILDING_URL,
    GET_CART_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    setStateBuilding,
    setUserCountCartItem
} from '../../actions'
import Hepler from '../../utils/Helper'
import styles from '../../style/style'
import { ScrollView } from 'react-native-gesture-handler'

class ReservationScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        isFetching : false,
        ChargeStatus : "Pass",
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={item.building_id} style={[styles.container, styles.panelWhite, { /*height: 170,*/ margin: 5 }]}>
                <View style={[styles.containerRow, { marginBottom: 5 }]}>
                    <Image source={{ uri: item.building_img }}  style={{ flex: 0.5, width: 120, height: 100,borderRadius:10 }} />
                    <View style={{ flex: 0.8, padding: 10 ,paddingTop:0}}>
                        <Text style={[styles.bold, styles.text18, { color: primaryColor }]}>{`${item.building_name}`}</Text>
                        <Text style={[styles.text14, { flexWrap: 'wrap' }]}>{`${item.building_address}`}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.mainButton, styles.center]}
                    onPress={
                        () => this.props.navigation.navigate('Floorzone',{
                            building_data : item
                        })
                    }>
                    <Text style={[styles.text18, { color: '#FFF' }]}>{`จองพื้นที่ร้านค้า`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    ComponentLeft = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.text18, { color: 'white'}]}>{`จองพื้นที่`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            // this.props.navigation.navigate('Home')
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
        this.props.navigation.addListener('focus', () => {
            this.LoadData()
            this.GetMyCart()
        });
    }

    GetMyCart () {
        let formData = new FormData();
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        Hepler.post(BASE_URL + GET_CART_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_CART_URL',results)
            if (results.status == 'SUCCESS') {
                //this.props.setStateMyCart(results.data.Cart)
                this.props.setUserCountCartItem(results.data.Cart.length + results.data.Charge.length)
            } else {
                //this.props.setStateMyCart([])
                this.props.setUserCountCartItem(0)
                Alert.alert(results.message)
            }
        })
    }

    LoadData() {
        this.props.openIndicator()
        let formData = new FormData()
        formData.append('partners_id', this.props.reducer.userInfo.partners_id)
        Hepler.post(BASE_URL + GET_BUILDING_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_BUILDING_URL',results)
            if(results.status == 'SUCCESS'){
                this.props.setStateBuilding(results.data)
                this.setState({
                    ChargeStatus : results.Charge,
                    isFetching: false
                })
            }else{
                this.props.setStateBuilding([])
                this.setState({
                    isFetching: false
                })
            }
            this.props.dismissIndicator()
        })
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }


    render() {

        const props = this.props.reducer
        const building = props.building

        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.container, styles.backgroundPrimary, { alignItems: 'center', paddingBottom: 70, flex: 1 }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <Text style={[styles.text26, { color: 'white' }]}>{`เลือกสถานที่ที่ท่านต้องการ`}</Text>
                    <Text style={[styles.text22, { color: 'white'}]}>{`กรุณาเลือกตึกที่ท่านต้องการไปขายของ`}</Text>
                    <View style={[styles.container]}>
                        
                    {
                        this.state.ChargeStatus != "Pass" ?
                            <View style={{paddingTop:50}}>
                                <View style={{ height: 15 }}></View>
                                <Text style={[styles.text22,{ color: 'white',alignSelf: 'center', justifyContent: 'center' }]}>
                                    ไม่สามารถจองพื้นทีร้านค้าได้
                            </Text>
                                <Text style={[styles.text22,{ color: 'white',alignSelf: 'center', justifyContent: 'center' }]}>
                                    กรุณาชำระค่าปรับให้เรียบร้อยก่อนค่ะ!
                            </Text>
                            </View>
                            :
                            <FlatList
                                style={{ marginTop: 5 }}
                                data={building}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                keyExtractor={(item) => item.building_id}
                                renderItem={this._renderItem} />
                    }
                        
                    </View>
                    {/* </View> */}
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
    setStateBuilding,
    setUserCountCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen)