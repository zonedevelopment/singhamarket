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
import { Calendar } from 'react-native-calendars'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

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
        _markedDates: this.initialState
    }

    onDaySelect = (day) => {

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
                <Text style={[{ color: 'white', fontSize: 24 }]}>{`เลือกวันที่`}</Text>
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

    componentDidMount() {
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
                    <Text style={[styles.text22, styles.bold, { color: primaryColor }]}>{`เลือกวันที่ท่านต้องการขายของ`}</Text>
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
                            () => this.props.navigation.push('Dayselect')
                        }>
                        <Text style={[styles.text20, { color: 'white' }]}>{`ยืนยัน`}</Text>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)