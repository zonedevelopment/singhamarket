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
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'

class NotificationScreen extends React.Component {

    _renderItem = () => {
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}
                    onPress={
                        () => null
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold]}>{`C02`}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`เลขที่จอง 001082018`}</Text>
                            <Text style={[styles.text14, { color: 'red'}]}>{`ร้านค้าของท่านทำการละเมิดกฎ กรุณาชำระค่าปรับ`}</Text>
                            <Text style={[styles.text14]}>{`14-06-2018 14:00:00`}</Text>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={16} color='gray' />
                </TouchableOpacity>
            </View>
        )
    }

    ComponentLeft = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`แจ้งเตือน`}</Text>
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
                <View style={[styles.container, { padding: 10 }]}>
                    {
                        this._renderItem()
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

}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)