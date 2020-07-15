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
class HomeDetailsScreen extends React.Component {

    state = {
        ListData : [],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`Singha Complex 1`}</Text>
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
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}
                    onPress={
                        () => this.props.navigation.navigate('Historydetail',{
                            data : item,
                            service : item.Service
                        })
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                        <View style={[styles.center, { alignItems: 'center', width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                            <Text style={[styles.text16, styles.bold, { textAlign: 'center' }]}>{item.boothname}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`วันที่ขาย ` + moment(item.booking_detail_date).format('LL')}</Text>
                            <Text style={[styles.text14]}>{item.market_name}</Text>
                            <Text style={[styles.text14]}>{
                                props.userInfo.product.map((v, i) => {
                                    return i < (props.userInfo.product.length - 1) ? (v.product_name + ', ') : v.product_name
                                })
                            }</Text>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={16} color='gray' />
                </TouchableOpacity>
                {
                    item.check_in_status == 'N' ? 
                        <View style={{ margin: 5 }}>
                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                                onPress={
                                    () => this.CheckIn(item)
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`เช็คอินเข้าขายของ`}</Text>
                            </TouchableOpacity>
                        </View>
                    : null
                }
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
                    <View style={[styles.mainButton2 ,styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 20 }]}>
                        <Text style={[styles.text16, { color: '#FFF' }]}>{'Singha Complex 1'}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, { color: primaryColor }]}>{`Singha Complex 1`}</Text>

                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5, paddingBottom: 60 }}
                            data={this.state.ListData}
                            extraData={this.state}
                            keyExtractor={(item) => item.booking_detail_id}
                            renderItem={this._renderItem} />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetailsScreen)