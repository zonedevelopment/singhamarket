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
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    pendingColor,
    reservColor,
    alpaGreen,
    alpaYellow,
    alpaRed
} from '../../utils/contants'

import styles from '../../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class BoothScreen extends React.Component {

    _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.containerRow, { padding: 5, height: 50, margin: -4 }]}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booth_status == 1 ? alpaGreen : item.booth_status == 2 ? alpaYellow : alpaRed, justifyContent: 'center', alignItems: 'center', padding: 5 }]}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, margin: 4, backgroundColor: item.booth_status == 1 ? emptyColor : item.booth_status == 2 ? pendingColor : reservColor }}></View>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`${item.booth_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.75, backgroundColor: item.booth_status == 1 ? alpaGreen : item.booth_status == 2 ? alpaYellow : alpaRed, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text16, { flex: 0.75, color: primaryColor, alignSelf: 'flex-start', paddingLeft: 5 }]}>{`รายละเอียด`}</Text>
                    {
                        item.booth_status == 1 ?
                            <TouchableOpacity style={[styles.circleGreen, styles.center, { flex: 0.25 }]}
                                onPress={
                                    () => this.props.navigation.navigate('Accessories')
                                }>
                                <Text style={[styles.text14, { color: primaryColor }]}>{`ว่าง`}</Text>
                            </TouchableOpacity>
                            :
                            item.booth_status == 2 ?
                                <TouchableOpacity style={[styles.circleYellow, styles.center, { flex: 0.25 }]}>
                                    <Text style={[styles.text14, { color: primaryColor }]}>{`แจ้งเตือน`}</Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.circleRed, styles.center, { flex: 0.25 }]}>
                                    <Text style={[styles.text14, { color: primaryColor }]}>{`เต็ม`}</Text>
                                </View>
                    }
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกบูธขายของ`}</Text>
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

        const booth = [
            {
                booth_id: 1,
                booth_name: 'A001',
                booth_status: 1
            },
            {
                booth_id: 2,
                booth_name: 'A002',
                booth_status: 1
            },
            {
                booth_id: 3,
                booth_name: 'A003',
                booth_status: 2
            },
            {
                booth_id: 4,
                booth_name: 'A004',
                booth_status: 3
            },
            {
                booth_id: 5,
                booth_name: 'A005',
                booth_status: 1
            },
            {
                booth_id: 6,
                booth_name: 'A006',
                booth_status: 2
            },
            {
                booth_id: 7,
                booth_name: 'A007',
                booth_status: 3
            },
            {
                booth_id: 8,
                booth_name: 'A008',
                booth_status: 1
            },
        ]

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
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text20, styles.bold, { flex: 0.5, color: primaryColor }]}>{`เลือกบูธที่ต้องการขายของ`}</Text>
                        <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center' }}
                            onPress={
                                () => this.props.navigation.push('Plan')
                            }>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`ดูแปลนพื้นที่ขายของ`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ padding: 10, height: 45, backgroundColor: '#f3f3f3' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.circleGreen]}></View>
                            <Text style={[styles.text16, { marginLeft: 5, marginRight: 40 }]}>{`ว่าง`}</Text>
                            <View style={[styles.circleYellow]}></View>
                            <Text style={[styles.text16, { marginLeft: 5, marginRight: 40 }]}>{`รอชำระเงิน`}</Text>
                            <View style={[styles.circleRed]}></View>
                            <Text style={[styles.text16, { marginLeft: 5 }]}>{`จองแล้ว`}</Text>
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow]}>
                        <View style={[styles.smallStatusButton, styles.center, { backgroundColor: pendingColor }]}>
                            <Text style={[{ fontSize: 10, color: 'white' }]}>{`แจ้งเตือน`}</Text>
                        </View>
                        <Text style={[styles.text14, { color: primaryColor, marginLeft: 4 }]}>{`ท่านสามารถกดแจ้งเตือนที่บูธสีเหลือง เพื่อรับการแจ้งเตือน\nเมื่อบูธนี้ว่าง`}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`Booth No.`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.75, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียด`}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={booth}
                        keyExtractor={(item) => item.booth_id}
                        renderItem={this._renderItem} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BoothScreen)