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
    backHandlerSubscription = null


    state = {
        ListData : [
            {xx:0}
        ]
    }

    _renderItem = (item) => {
        return (
            <View style={{ width:'90%',alignSelf: 'center' }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', paddingTop:10,paddingBottom:10,justifyContent: 'space-between' }]}
                    onPress={
                        () => null
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 ,alignSelf:'center'}}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{`C02`}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, { color: 'red'}]}>{`Booth A001 ชำระค่าปรับเรียบร้อยแล้ว`}</Text>
                            <Text style={[styles.text14]}>{`14-06-2018 14:00:00`}</Text>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={16} color='gray' />
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                    <View style={[styles.containerRow,{width: '90%', marginLeft: 10}]}>
                        <Text style={[styles.text20, { color: primaryColor }]}>{`รายการแจ้งเตือน`}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, width:'90%',alignSelf: 'center',}} /> 
                    <FlatList
                        data={this.state.ListData}
                        extraData={this.state}
                        keyExtractor={(item) => item.Notification_id}
                        renderItem={this._renderItem}
                    />

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