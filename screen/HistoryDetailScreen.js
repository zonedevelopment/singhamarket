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

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HistoryDetailScreen extends React.Component {

    _renderItem = () => {
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <View style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold]}>{`C02`}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`วันที่ขาย 27 มี.ค.`}</Text>
                            <Text style={[styles.text14]}>{`SINGHA COMPLEX 1`}</Text>
                            <Text style={[styles.text14]}>{`ขนมไทย,ขนมหวาน`}</Text>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={16} color='gray' />
                </View>
                <View style={{ margin: 5 }}>
                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => null
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`เช็คอินเข้าขายของ`}</Text>
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
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, { color: primaryColor }]}>{`วันที่ขายของ`}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.hr]}></View>
                    <View style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between', padding: 10 }]}>
                        <View style={[styles.containerRow]}>
                            <View style={{ flex: 0.2 }}>
                                <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                    <Text style={[styles.text16, styles.bold]}>{`C02`}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`วันที่ขาย 27 มี.ค.`}</Text>
                                <Text style={[styles.text14]}>{`สถานที่ SINGHA COMPLEX 1`}</Text>
                                <Text style={[styles.text14]}>{`บูธ C02`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`รายการสินค้าที่ขาย`}</Text>
                        <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ขนมไทย, ขนมหวาน`}</Text>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`บริการเสริม`}</Text>
                        <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ไฟฟ้าและแสงสว่าง x2`}</Text>
                        <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ไฟฟ้าไม่เกิน 8,000 วัตต์`}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center', padding: 10 }}>
                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => this.handleBack()
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailScreen)