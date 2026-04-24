import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    Alert,
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
    redColor,
    BASE_URL,
    GET_FAVERITE_URL,
    HEADERFORMDATA,
    CANCEL_FAVERITE_URL
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

class FavoriteScreen extends React.Component {
    backHandlerSubscription = null



    constructor(props) {
        super(props);
        this.state = {
            ListData : [],
        };
    }

    _renderItem = ({item,index}) => {
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}
                    onPress={
                        () => {}
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{item.boothname}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{item.market_name}</Text>
                            <Text style={[styles.text14]}>{`บูธ ` + item.boothname}</Text>
                            <Text style={[styles.text14]}>{`วันที่ ` + moment(item.booking_detail_date).format('LL')}</Text>
                            {/* <Text style={[styles.text14, { color: redColor}]}>{`เหลือเวลาในการจอง 10:00 นาที`}</Text> */}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 5, right: 5}}>
                    <TouchableOpacity style={[styles.center, { width: 20, height: 20, borderRadius: 15, backgroundColor: grayColor}]}onPress={
                        () => this.onCancel(item)
                    }>
                        <Icon name={'times'} size={15} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                <Text style={[styles.text18, { color: 'white' }]}>{`บูธที่สนใจ`}</Text>
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

    onCancel(item){

        const props = this.props.reducer
        let formData = new FormData();
        formData.append('partners_id',props.userInfo.partners_id)
        formData.append('interested_id',item.interested_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + CANCEL_FAVERITE_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('CANCEL_FAVERITE_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                Alert.alert(  
                    '',  
                    results.message,  
                    [  
                        {text: 'OK', onPress: () => this.LoadData()},  
                    ]  
                ); 
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })

    }

    LoadData () {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_FAVERITE_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_FAVERITE_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 70 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                <Text style={[styles.text22, { color: primaryColor }]}>{`รายการบูธที่สนใจ`}</Text>
                <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                <View style={[styles.marginBetweenVertical]}></View>
                {
                    this.state.ListData.length > 0 ?
                        <FlatList
                        style={{ marginTop: 5, paddingBottom: 60 }}
                        data={this.state.ListData}
                        extraData={this.state}
                        keyExtractor={(item) => item.interested_id}
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen)