import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    Picker,
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
    KEY_LOGIN
} from '../../utils/contants'

import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ReservationScreen extends React.Component {

    state = {
        floor_selectedIndex : 0,
        floor: []
    }
    
    ComponentLeft = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.text18, { color: 'white'}]}>{`จองพื้นที่ตลาด`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.navigate('ReservHome')
            return true;
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    onSelectFloor(index, value) {

    }

    render() {
        const props = this.props
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
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`จองพื้นที่ตลาด`}</Text>
                            <View style={[styles.hr,{width:'100%'}]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`เลือกรายชื่อลูกค้าที่ต้องการจองพื้นที่`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'รายชื่อลูกค้า'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`เลือกตลาดที่ต้องการขายของ`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'เลือกตลาด'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'เลือกประเภทตลาด'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกชั้น`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={this.state.floor_selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectFloor(index, value)} >
                                <RadioButton
                                    key={0}
                                    value={1}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Floor 1`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={1}
                                    value={2}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Floor 2`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={3}
                                    value={4}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Floor 3`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={3}
                                    value={4}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Floor 4`}</Text>
                                </RadioButton>
                            </RadioGroup>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกโซน`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={this.state.floor_selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectFloor(index, value)} >
                                <RadioButton
                                    key={0}
                                    value={1}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Zone A`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={1}
                                    value={2}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Zone B`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={3}
                                    value={4}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Zone C`}</Text>
                                </RadioButton>
                                <RadioButton
                                    key={3}
                                    value={4}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`Zone D`}</Text>
                                </RadioButton>
                            </RadioGroup>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกวันที่และบูธที่ต้องการขายของ`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'กรุณาเลือกวันที่และบูธขายของ'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen)