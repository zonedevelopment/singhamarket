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
import { Calendar } from 'react-native-calendars'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import {
    saveDateSelected,
    setStatePreviousScreen
} from '../../actions'

import styles from '../../style/style'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(2, 'years').format(_format)

const DEVICE_HEIGHT = Dimensions.get('screen').height
class CalendarScreen extends React.Component {

    initialState = {
        [_today]: { disabled: false, disableTouchEvent: true }
    }

    state = {
        selectDate: [],
        _markedDates: this.initialState
    }

    onDaySelect = (day) => {
        const _selectedDay = moment(day.dateString).format(_format)
        let strDate = day.dateString
        let selected = true
        if (this.state._markedDates[_selectedDay]) {
            selected = !this.state._markedDates[_selectedDay].selected
        }
        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: { selected, selectedColor: primaryColor } } }
        this.setState({ _markedDates: updatedMarkedDates })
        let selectDate = this.state.selectDate
        if(selected === true){ /// เลือกวัน
            selectDate.push({ date: _selectedDay, boothSelectID: '', boothSelectName: '' });
        }else{////ยกเลิกวัน
            selectDate.filter((v, i) => {
                console.log(v.date + ' === ' + _selectedDay)
                if (v.date === _selectedDay) {
                    selectDate.splice(i, 1);
                }
            })
        }
        let sortDate = selectDate.sort((a, b) =>
            a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
        this.setState({ selectDate: sortDate })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกวันที่`}</Text>
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
            //this.props.navigation.pop();
            this.props.navigation.goBack()
            return true;
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        this.props.saveDateSelected('clear', '')
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                <View style={[styles.container, { padding: 15 }]}>
                    <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{`เลือกวันที่ท่านต้องการขายของ`}</Text>
                    <View style={[styles.panelRectangleGray, styles.center, { alignItems: 'flex-start' }]}>
                        <Text style={{ color: 'white' }}>{`${moment().format('dddd')}, ${moment().format('LL')}`}</Text>
                    </View>
                    <View>
                        <Calendar
                            minDate={_today}
                            maxDate={_maxDate}
                            onDayPress={this.onDaySelect}
                            markedDates={this.state._markedDates} />
                    </View>
                </View>
                <View style={[styles.positionBottom, styles.center, { padding: 10, bottom: 10, alignSelf: 'center' }]}>
                    <TouchableOpacity style={[styles.mainButton, styles.center]}
                        onPress={
                            async () => {
                                if(this.state.selectDate.length == 0){
                                    await Alert.alert(
                                        'คำเตือน!',
                                        'กรุณาเลือกวันที่ท่านต้องการขายของ!'
                                    );
                                }else{
                                    await this.props.saveDateSelected('save', this.state.selectDate)
                                    await this.props.setStatePreviousScreen('Calendar')
                                    this.props.navigation.navigate('Booth',{
                                        ActionType : 'CHECK_ALL',
                                    })
                                }
                            }
                        }>
                        <Text style={[styles.text18, { color: 'white' }]}>{`ยืนยัน`}</Text>
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
    saveDateSelected,
    setStatePreviousScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)