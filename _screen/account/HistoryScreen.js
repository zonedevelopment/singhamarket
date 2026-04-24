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
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    GET_HISTORY_URL,
    HEADERFORMDATA,
    CHECK_IN_HISTORY_URL
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HistoryScreen extends React.Component {
    backHandlerSubscription = null


    constructor(props) {
        super(props);
        this.state = {
            DateStartSelectValue : moment().format('YYYY-MM-DD'),
            DateStartSelectText : moment().format('ll'),
            DateEndSelectValue : moment().add(30, 'days').format('YYYY-MM-DD'),
            DateEndSelectText : moment().add(30, 'days').format('ll'),
            isDateTimePickerVisible : false,
            ActiveDateType : '',
            ListData : [],
            isFetching : false,
        };
    }

    
    _showDateTimePicker = (Type) => this.setState({ 
        isDateTimePickerVisible: true,
        ActiveDateType : Type
    });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        moment.locale();
        if(this.state.ActiveDateType == 'Start'){
            this.setState({ 
                DateStartSelectValue: moment(date).format('YYYY-MM-DD'),
                DateStartSelectText: moment(date).format('ll') 
            });
        }else{
            this.setState({ 
                DateEndSelectValue: moment(date).format('YYYY-MM-DD'),
                DateEndSelectText: moment(date).format('ll') 
            });
        }
        this._hideDateTimePicker();
    };

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

    componentDidMount() {
        this.SearchData()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    CheckIn(item){
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('booking_detail_id',item.booking_detail_id)
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + CHECK_IN_HISTORY_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_HISTORY_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                Alert.alert(  
                    '',  
                    results.message,  
                    [  
                        {text: 'OK', onPress: () => this.SearchData()},  
                    ]  
                ); 
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })

    }

    SearchData () {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('StartDate',this.state.DateStartSelectValue)
        formData.append('EndDate',this.state.DateEndSelectValue)
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_HISTORY_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_HISTORY_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data,
                    isFetching: false
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    isFetching: false
                })
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.SearchData()
        })
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
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, { color: primaryColor }]}>{`ประวัติการจองพื้นที่ร้านค้า`}</Text>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกช่วงวันที่ แล้วกดค้นหา`}</Text>

                    <View style={[styles.containerRow, {  alignItems: 'center'}]}>
                        <View style={{flex:0.45}}>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, styles.center, { paddingLeft:0, backgroundColor: primaryColor }]}
                                onPress={
                                    () => {
                                        this._showDateTimePicker('Start')
                                    }
                                }>
                                <Text style={[styles.text16, { color: '#FFF' }]}>{this.state.DateStartSelectText}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{flex:0.1,width:'100%',textAlign:'center',alignContent:'center',alignSelf:'center',alignItems:'center'}}>ถึง</Text>
                        <View style={{flex:0.45}}>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, styles.center, {  paddingLeft:0,backgroundColor: primaryColor }]}
                                onPress={
                                    () => {
                                        this._showDateTimePicker('End')
                                    }
                                }>
                                <Text style={[styles.text16, { color: '#FFF' }]}>{this.state.DateEndSelectText}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={[styles.containerRow, {  paddingLeft:10, alignItems: 'center'}]}>
                        <TouchableOpacity style={[styles.mainButtonDisabled, styles.center, { width:'100%', backgroundColor: grayColor }]} 
                            onPress={() => { 
                                this.SearchData();
                            }}>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ค้นหา`}</Text>
                        </TouchableOpacity>
                    </View>

      

                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5, paddingBottom: 60 }}
                            data={this.state.ListData}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            extraData={this.state}
                            keyExtractor={(item) => item.booking_detail_id}
                            renderItem={this._renderItem} />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
                            </View>
                    }
                </View>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)