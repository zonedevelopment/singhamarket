import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    Picker,
    Alert,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import moment from 'moment'
import { NavigationBar } from 'navigationbar-react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import Image from 'react-native-fast-image'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    CHECK_BOOTH_HOLIDAY_URL,
    CHECK_BLOCK_ZONE_URL,
    BASE_URL,
    HEADERFORMDATA,
    KEY_LOGIN
} from '../../utils/contants'
import { Calendar } from 'react-native-calendars'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
    setAuditReservPartners,
    setAuditReservBuilding,
  //  setAuditReservFloor,
    setAuditReservZone,
    setAuditReservDate,
    setStatePreviousScreen,
} from '../../actions'
import Hepler from '../../utils/Helper'
import componentRightSignOut from '../../components/ComponentRightSignOut'
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(2, 'years').format(_format)
const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class ReservationScreen extends React.Component {
    backHandlerSubscription = null

    initialState = {
        [_today]: { disabled: false, disableTouchEvent: false }
    }

    state = {
        dayNamesShort: [
            {
                dayname : 'Sun',
                dayid : 0
            },{
                dayname : 'Mon',
                dayid : 1
            },{
                dayname : 'Tue',
                dayid : 2
            },{
                dayname : 'Wed',
                dayid : 3
            },{
                dayname : 'Thu',
                dayid : 4
            },{
                dayname : 'Fri',
                dayid : 5
            },{
                dayname : 'Sat',
                dayid : 6
            }],
        selectDate: [],
        _markedDates: this.initialState,
        calendar_month : moment().format('MM'),
        calendar_year : moment().format('YYYY'),
     
        zone_selectedValue : '',
        zone_selectedIndex : null,
    }
    
    ComponentLeft = () => {
        return (
            <View style={{ padding: 10,flex:0.2}}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center],{flex:0.6}}>
                <Text style={[styles.text18, { color: 'white',textAlign:'center'}]}>{`จองพื้นที่ตลาด`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10,alignItems:'center',flex:0.2}}>
                <Icon name='sign-out' size={20} color='white' />
                <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.navigate('ReservHome')
            return true;
        }
    };


    onDaySelect = (day) => {
        if(Object.keys(this.props.reducer.audit_reserv_building).length == 0){
            Alert.alert('คำเตือน', 'กรุณาเลือกตลาดที่ต้องการขายของ')
        }else{
            const _selectedDay = moment(day.dateString).format(_format)
            let strDate = day.dateString
            let selected = true
            if (this.state._markedDates[_selectedDay]) {
                selected = !this.state._markedDates[_selectedDay].selected
            }
            let selectDate = this.state.selectDate
            if (selected === true) { /// เลือกวัน
                this.props.openIndicator()
                let formData = new FormData();
                formData.append('MarketID', this.props.reducer.audit_reserv_building.building_id)
                formData.append('Day', strDate)
                Hepler.post(BASE_URL + CHECK_BOOTH_HOLIDAY_URL, formData, HEADERFORMDATA, (results) => {
                    console.log('CHECK_BOOTH_URL', results)
                    if (results.status == 'SUCCESS') {
                        if (results.data == false) {
                            Alert.alert('คำเตือน', results.message)
                        } else {
                            let updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: { selected, selectedColor: primaryColor } } }
                            this.setState({ _markedDates: updatedMarkedDates })
                            selectDate.push({
                                date: _selectedDay,
                                ListBooth: []
                            });
                            let sortDate = selectDate.sort((a, b) =>
                                a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
                            this.setState({ selectDate: sortDate })
                        }
    
                        this.props.dismissIndicator()
                    } else {
                        Alert.alert(results.message)
                        this.props.dismissIndicator()
                    }
                })
    
            } else {////ยกเลิกวัน


                this.props.openIndicator()
                let that = this
                setTimeout(function(){
                    let updatedMarkedDates = {...that.state._markedDates,
                    [_selectedDay]: {
                        ...that.state._markedDates[_selectedDay],
                        selected: false,
                        selectedColor: primaryColor}}
                    selectDate.filter((v, i) => {
                        if (v.date == _selectedDay) {
                            selectDate.splice(i, 1);
                        }
                    })
                    let sortDate = selectDate.sort((a, b) =>{
                        a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join())
                    });
    
                    that.setState({ 
                        selectDate: sortDate ,
                        _markedDates : updatedMarkedDates
                    })
                }, 200);
                this.props.dismissIndicator()

                // let updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: { selected, selectedColor: primaryColor } } }
                // this.setState({ _markedDates: updatedMarkedDates })
                // selectDate.filter((v, i) => {
                //     console.log(v.date + ' === ' + _selectedDay)
                //     if (v.date === _selectedDay) {
                //         selectDate.splice(i, 1);
                //     }
                // })
                // let sortDate = selectDate.sort((a, b) =>
                //     a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
                // this.setState({ selectDate: sortDate })
            }
        }
    }


    componentWillUnmount() {
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        this.props.setAuditReservPartners([])
        this.setState({
            _markedDates: this.initialState,
        })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    onSelectZone(index, value){
        // this.props.openIndicator()
        // this.props.setAuditReservZone({
        //     selectedValue : value,
        //     selectedIndex : index,
        //     selectedName : this.props.reducer.audit_reserv_building.building_zone[index].zone_name,
        // })
        // this.props.dismissIndicator()
        let temp_building = this.props.reducer.audit_reserv_building
        this.props.openIndicator()
        console.log('zone_id', value);
        console.log('partners_type_id', this.props.reducer.audit_reserv_partners.partners_type);
        let formData = new FormData();
        formData.append('zone_id', value)
        formData.append('partners_type_id', this.props.reducer.audit_reserv_partners.partners_type)
        Hepler.post(BASE_URL + CHECK_BLOCK_ZONE_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CHECK_BLOCK_ZONE_URL', results)
            if (results.status == 'SUCCESS') {
                if (results.data == false) {
                    Alert.alert('คำเตือน', results.message)
                    this.props.setAuditReservZone({
                        selectedValue : '',
                        selectedIndex : null,
                        selectedName : '',
                    })
                } else {
                    this.props.setAuditReservZone({
                        selectedValue : value,
                        selectedIndex : index,
                        selectedName : temp_building.building_zone[index].zone_name,
                    })
                }
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    // onSelectFloor(index, value) {
    //     this.props.openIndicator()
    //     this.props.setAuditReservFloor({
    //         selectedValue : value,
    //         selectedIndex : index,
    //         selectedName : this.props.reducer.audit_reserv_building.building_floor[index].floor_name,
    //     })
    //     this.props.setAuditReservZone({
    //         selectedValue : '',
    //         selectedIndex : null,
    //         selectedName : '',
    //     })
    //     this.props.dismissIndicator()
    // }

    
    CheckAllDayName (item) {
        let arrDate = this.getDateOfMonth(item.dayid)
        arrDate.map((v,i)=>{
            this.onDaySelect({
                dateString : v
            }) 
        })
    }

    getDateOfMonth(dayid) {
        var d = new Date(),
            month = this.state.calendar_month - 1,
            mondays = [];
        d.setFullYear(this.state.calendar_year,this.state.calendar_month - 1,1);
        // Get the first Monday in the month
        while (d.getDay() !== dayid) {
            d.setDate(d.getDate() + 1);
        }
        // Get all the other Mondays in the month
        while (d.getMonth() === month/* this.state.calendar_month && d.getFullYear() == this.state.calendar_year*/) {
            if(moment(new Date(d.getTime())).format(_format) > _today){
                mondays.push(moment(new Date(d.getTime())).format(_format));
            }
            d.setDate(d.getDate() + 7);
        }
        return mondays;
    }

    render() {
        const props = this.props.reducer
        console.log('audit_reserv_building',props.audit_reserv_building)
        console.log('length',Object.keys(props.audit_reserv_building).length)
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                {/* <NavigationBar
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
                    }} /> */}
                <View style={[styles.container, { padding: 10 }]}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`จองพื้นที่ตลาด`}</Text>
                            <View style={[styles.hr,{width:'100%'}]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`เลือกรายชื่อลูกค้าที่ต้องการจองพื้นที่`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}
                            onPress={()=>{
                                this.props.navigation.navigate('ReservListCustomer')
                            }}>
                                <Text style={[styles.text16, { color: 'white' }]}>{
                                    Object.keys(props.audit_reserv_partners).length == 0 ? 'กรุณาเลือกรายชื่อลูกค้า' : props.audit_reserv_partners.name_customer
                                }</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`เลือกตลาดที่ต้องการขายของ`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}
                            onPress={  () => {
                                this.props.navigation.navigate('ReservListBuilding') 
                            }}>
                                <Text style={[styles.text16, { color: 'white' }]}>
                                    {
                                        Object.keys(props.audit_reserv_building).length == 0 ? 'เลือกตลาด' : props.audit_reserv_building.building_name
                                    }
                                </Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'เลือกประเภทตลาด'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity> */}
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            {/* <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกชั้น`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={props.audit_reserv_floor.selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectFloor(index, value)} >
                                    {
                                        Object.keys(props.audit_reserv_building).length > 0 ?
                                            props.audit_reserv_building.building_floor.map((v, i) => {
                                                return (
                                                    <RadioButton
                                                        key={i}
                                                        value={v.floor_id}
                                                        color={primaryColor}
                                                        style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                                        <Text style={[styles.text16, { color: primaryColor }]}>{`${v.floor_name}`}</Text>
                                                    </RadioButton>
                                                )
                                            })
                                        : null
                                    }
                            </RadioGroup>
                            {
                                Object.keys(props.audit_reserv_building).length == 0 ?
                                    <View style={[styles.center]}><Text style={{textAlign:'center'}}>{'กรุณาเลือกตลาด!'}</Text></View>
                                : null
                            }
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View> */}
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกโซน`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={props.audit_reserv_zone.selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectZone(index, value)} >
                                {
                                    Object.keys(props.audit_reserv_building).length > 0 ?
                                        props.audit_reserv_building.building_zone.map((v, i) => {
                                            return (
                                                <RadioButton
                                                    key={i}
                                                    value={v.zone_id}
                                                    //disabled={v.disabled}
                                                    color={primaryColor}
                                                    style={{ alignItems: 'flex-start', flex: 0.5, marginRight: 25 }} >
                                                    <Text style={[styles.text14, { color: primaryColor }]}>{`${v.zone_name}`}</Text>
                                                </RadioButton>
                                            )
                                        })
                                    : null
                                }
                            </RadioGroup>
                            {
                                Object.keys(props.audit_reserv_building).length == 0 ?
                                    <View style={[styles.center]}><Text style={{textAlign:'center'}}>{'กรุณาเลือกตลาด!'}</Text></View>
                                : null
                            }
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{`เลือกวันที่ท่านต้องการขายของ`}</Text>
                            <View style={[styles.panelRectangleGray, styles.center, { alignItems: 'flex-start' }]}>
                                <Text style={{ color: 'white' }}>{`${moment().format('dddd')}, ${moment().format('LL')}`}</Text>
                            </View>
                            <View style={{ marginBottom: 30 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginTop: 6,
                                    alignItems: 'center'
                                    }}>
                                    {
                                        this.state.dayNamesShort.map((day, idx) => (
                                            <TouchableOpacity style={{}} onPress={() => {
                                                this.CheckAllDayName(day)
                                            }}>
                                                <Text allowFontScaling={false}
                                                    style={{marginTop: 2,
                                                        marginBottom: 7,
                                                        width: 32,
                                                        textAlign: 'center',
                                                        fontSize: 14,
                                                        fontWeight: '200',
                                                        color: primaryColor}}
                                                    numberOfLines={1}
                                                    accessibilityLabel={''}
                                                >
                                                    {day.dayname}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                                <Calendar
                                    minDate={_today}
                                    maxDate={_maxDate}
                                    onDayPress={this.onDaySelect}
                                    markedDates={this.state._markedDates}
                                    hideDayNames={true}
                                    onMonthChange={(month) => {this.setState({
                                        calendar_month : month.month,
                                        calendar_year : month.year
                                    })}}
                                />                  
                            </View>


                            <TouchableOpacity style={[styles.mainButton, { marginTop: 5, marginBottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 5 }]}
                            onPress={
                                async () => {
                                    if(Object.keys(props.audit_reserv_partners).length == 0){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกลูกค้าที่ต้องการจองพื้นที่!'
                                        );
                                    }else if(Object.keys(props.audit_reserv_building).length == 0){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกตลาดที่ต้องการขายของ!'
                                        );
                                    }else if (props.audit_reserv_zone.selectedValue == ''){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกโซนที่ท่านต้องการขายของ!'
                                        );
                                    } else if (this.state.selectDate.length == 0) {
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกวันที่ท่านต้องการขายของ!'
                                        );
                                    } else{
                                        await this.props.setAuditReservDate(this.state.selectDate)
                                        await this.props.setStatePreviousScreen('CalendarAudit')
                                        this.props.navigation.navigate('ReservBoothAudit',{
                                            ActionType : 'CHECK_ALL',
                                        })
                                       // this.props.navigation.navigate('ReservCalendarAudit')
                                    }
                                }
                            }>
                            <Text style={[styles.text18, { color: 'white' }]}>{`ขั้นตอนต่อไป`}</Text>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    setAuditReservPartners,
    setAuditReservBuilding,
   // setAuditReservFloor,
    setAuditReservZone,
    setAuditReservDate,
    setStatePreviousScreen,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen)