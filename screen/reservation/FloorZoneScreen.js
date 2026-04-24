import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Alert,
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
import { Calendar } from 'react-native-calendars'
import {
    darkColor,
    grayColor,
    primaryColor,
    redColor,
    secondaryColor,
    CHECK_BOOTH_HOLIDAY_URL,
    CHECK_BLOCK_ZONE_URL,
    BASE_URL,
    GET_CONDITION_CALENDAR_URL,
    HEADERFORMDATA
} from '../../utils/contants'
import {
    openIndicator,
    dismissIndicator,
    setStateBuilding,
    setStateSelectedBuildingID,
    setStateSelectedFloorID,
    setStateSelectedZoneID,
    setStateSelectedBuildingName,
    setStateSelectedFloorName,
    setStateSelectedZoneName,
    setStateSelectedProduct,
    setStatePreviousScreen,
    saveDateSelected
} from '../../actions'
import Hepler from '../../utils/Helper'
import styles from '../../style/style'

import ic_plan from '../../assets/image/icon_plan_gold.png'
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(2, 'years').format(_format)
const DEVICE_HEIGHT = Dimensions.get('screen').height
class FloorZoneScreen extends React.Component {
    backHandlerSubscription = null


    initialState = {
        [_today]: { disabled: false, disableTouchEvent: false }
    }

    state = {
        dayNamesShort: [
            {
                dayname : 'Sun',
                dayid : 0,
                selected : false,
            },{
                dayname : 'Mon',
                dayid : 1,
                selected : false,
            },{
                dayname : 'Tue',
                dayid : 2,
                selected : false,
            },{
                dayname : 'Wed',
                dayid : 3,
                selected : false,
            },{
                dayname : 'Thu',
                dayid : 4,
                selected : false,
            },{
                dayname : 'Fri',
                dayid : 5,
                selected : false,
            },{
                dayname : 'Sat',
                dayid : 6,
                selected : false,
            }
        ],
        selectDate: [],
        _markedDates: this.initialState,

        building_data: [],
        index: 0,
        building_id: '',
        building_name: '',
        plan_image: '',
        // floor : [],
        zone: [],
        // floor_selectedValue : '',
        // floor_selectedIndex : null,
        zone_selectedValue: '',
        zone_selectedIndex: null,
        calendar_month : moment().format('MM'),
        calendar_year : moment().format('YYYY'),
        ChooseCalendar : 'EVERYDAY', /// EVERYWEEK
    }


    CheckAllDayName  (item) {
        let arrDate = this.getDateOfMonth(item.dayid)
        arrDate.map( async (vDate,iDate) => {
            await this.onDaySelect({
                dateString : vDate
            }) 
        })
    }


    onDaySelect = async  (day) => {
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
            formData.append('MarketID', this.state.building_id)
            formData.append('Day', strDate)
            Hepler.post(BASE_URL + CHECK_BOOTH_HOLIDAY_URL, formData, HEADERFORMDATA, (results) => {
                console.log('CHECK_BOOTH_URL', results)
                if (results.status == 'SUCCESS') {
                    if (results.data == false) {
                        Alert.alert('คำเตือน', results.message)
                    } else {
                        let updatedMarkedDates = {...this.state._markedDates,
                            [_selectedDay]: {
                                selected: true,
                                selectedColor: primaryColor}}
                        selectDate.push({
                            date: _selectedDay,
                            ListBooth: []
                        });
                        let sortDate = selectDate.sort((a, b) =>
                            a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
                        this.setState({ 
                            selectDate: sortDate,
                            _markedDates: updatedMarkedDates 
                        })
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

        }

    }



    onSelectZone(index, value) {
        this.props.openIndicator()
        console.log('zone_id', value);
        console.log('partners_type_id', this.props.reducer.userInfo.partners_type);
        let formData = new FormData();
        formData.append('zone_id', value)
        formData.append('partners_type_id', this.props.reducer.userInfo.partners_type)
        Hepler.post(BASE_URL + CHECK_BLOCK_ZONE_URL, formData, HEADERFORMDATA, (results) => {
            console.log('CHECK_BLOCK_ZONE_URL', results)
            if (results.status == 'SUCCESS') {
                if (results.data == false) {
                    Alert.alert('คำเตือน', results.message)
                    this.setState({
                        zone_selectedIndex: null,
                        zone_selectedValue: '',
                    }) 
                } else {
                    this.setState({
                        zone_selectedIndex: index,
                        zone_selectedValue: value,
                    })
                }
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`จองพื้นที่ร้านค้า`}</Text>
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
        
        // if (this.props.reducer.building[index].building_floor.length == 1) {
        //     this.onSelectFloor(0, this.props.reducer.building[index].building_floor[0].floor_id)
        // }
        this.props.navigation.addListener('focus', () => {
            const { building_data } = this.props.route.params
            // let index = this.props.reducer.building.findIndex(p => p.building_id == building_data.building_id)
            const props = this.props.reducer
            this.props.setStateSelectedProduct({
                cate_id: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.cate_id,
                cate_name: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.category_name,
                type_id: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_id,
                type_name: typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_name,
                product: typeof props.userInfo === 'undefined' ? [] : props.userInfo.product
            })
            this.LoadConditionCalendar(typeof props.userInfo === 'undefined' ? '' : props.userInfo.product_type.type_id)
            this.setState({
                // index: index,
                //floor : this.props.reducer.building[index].building_floor,
                zone: building_data.building_zone,
                building_id: building_data.building_id,
                building_name: building_data.building_name,
                _markedDates: this.initialState,
                plan_image : building_data.building_diagram,
                selectDate : []
            })

            this.props.setStateSelectedBuildingID('')
            this.props.setStateSelectedZoneID('')
            this.props.setStateSelectedBuildingName('')
            this.props.setStateSelectedZoneName('')
            this.props.saveDateSelected('save',[])

        });
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        
    }

    LoadConditionCalendar = (type_id) => {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('type_id',type_id)
        Hepler.post(BASE_URL + GET_CONDITION_CALENDAR_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_CONDITION_CALENDAR_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ChooseCalendar : results.data.ChooseCalendar
                })
                this.props.dismissIndicator()
            } else {
                //Alert.alert(results.message)
                this.props.dismissIndicator()
            }
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
        const { building_data } = this.props.route.params
        //let setDateCalendar =  {...this.state._markedDates}//Object.assign({}, this.state._markedDates) //JSON.parse(JSON.stringify(this.state._markedDates))
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 55 }]}>
                <ScrollView >
                    <View style={[styles.container]}>
                        <Image style={[styles.fullWidth, { height: (DEVICE_HEIGHT / 2) - 150, resizeMode: 'stretch' }]} source={{ uri: building_data.building_img }} />
                        <View style={{ padding: 15 }}>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text18, styles.bold, { alignSelf: 'flex-start', flex: 0.6, color: primaryColor }]}>{building_data.building_name}</Text>
                                <TouchableOpacity style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                    onPress={
                                        () => {
                                            if (this.state.plan_image != '') {
                                                this.props.navigation.push('Plan', {
                                                    plan_image: this.state.plan_image
                                                })
                                            }
                                        }
                                    }>
                                    <Image source={ic_plan} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                    <Text style={[styles.text14, { color: primaryColor, marginLeft: 2 }]}>{`ดูแปลนพื้นที่ขายของ`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                           
                            <View>
                                <Text style={[styles.text16]}>{`กรุณาเลือกโซน`}</Text>
                                {
                                    this.state.zone.length > 0 ?
                                        <RadioGroup
                                            size={20}
                                            thickness={2}
                                            selectedIndex={this.state.zone_selectedIndex}
                                            color={primaryColor}
                                            style={{ flexDirection: 'row'/*,justifyContent: 'space-around'*/, flexWrap: 'wrap' }}
                                            highlightColor='transparent'
                                            onSelect={(index, value) => this.onSelectZone(index, value)} >
                                            {
                                                this.state.zone.map((v, i) => {
                                                    return (
                                                        <RadioButton
                                                            key={i}
                                                            value={v.zone_id}
                                                            //disabled={v.disabled}
                                                            color={primaryColor}
                                                            style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                                            <Text style={[styles.text14, { color: primaryColor }]}>{`${v.zone_name}`}</Text>
                                                        </RadioButton>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                        :
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 16, color: primaryColor }}>{'ไม่พบข้อมูลโซน!'}</Text>
                                        </View>
                                }

                            </View>
                            <View style={[styles.hr]}></View>
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
                                            <TouchableOpacity key={day.dayid ?? idx} style={{}} onPress={() => {
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
                                    onDayPress={(day)=>{
                                        if(this.state.ChooseCalendar == 'EVERYDAY'){
                                            this.onDaySelect(day)
                                        }
                                    }}
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
                                () => {
                                    if (this.state.zone_selectedValue == '') {
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกโซนที่ท่านต้องการขายของ!'
                                        );
                                    } else if (this.state.selectDate.length == 0) {
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกวันที่ท่านต้องการขายของ!'
                                        );
                                    } else {
                                        this.props.openIndicator()
                                        this.props.setStateSelectedBuildingID(this.state.building_id)
                                        //this.props.setStateSelectedFloorID(this.state.floor_selectedValue)
                                        this.props.setStateSelectedZoneID(this.state.zone_selectedValue)
                                        this.props.setStateSelectedBuildingName(this.state.building_name)
                                        //this.props.setStateSelectedFloorName(this.state.floor[this.state.floor_selectedIndex].floor_name)
                                        this.props.setStateSelectedZoneName(this.state.zone[this.state.zone_selectedIndex].zone_name)
                                        this.props.saveDateSelected('save', this.state.selectDate)

                                        this.props.dismissIndicator()
                                        this.props.setStatePreviousScreen('Calendar')
                                        this.props.navigation.navigate('Booth', {
                                            ActionType: 'CHECK_ALL',
                                            planUrl: this.state.plan_image
                                        })
                                        //this.props.navigation.navigate('Calendar')
                                    }
                                }
                            }>
                            <Text style={[styles.text18, { color: 'white' }]}>{`ขั้นตอนต่อไป`}</Text>
                        </TouchableOpacity>




                        </View>
                    </View>
                </ScrollView>
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
    setStateSelectedBuildingID,
    setStateSelectedFloorID,
    setStateSelectedZoneID,
    setStateSelectedBuildingName,
    setStateSelectedFloorName,
    setStateSelectedZoneName,
    setStateSelectedProduct,
    setStatePreviousScreen,
    saveDateSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorZoneScreen)