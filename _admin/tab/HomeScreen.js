import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { NavigationBar } from 'navigationbar-react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'
import Image from 'react-native-fast-image'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    KEY_LOGIN
} from '../../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class HomeScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        floor_selectedIndex : 0,
        floor: []
    }

    onSelectFloor(index, value) {

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
                <Text style={[styles.text18, { color: 'white'}]}>{`เลือกตลาดที่ต้องการ`}</Text>
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
            this.props.navigation.navigate('Home')
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
        const props = this.props
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.container,styles.panelWhite, styles.shadow,{alignItems: 'center'}]}>
                        <Text style={[styles.text22, { color: primaryColor,paddingTop:20 }]}>{`เลือกสถานที่ที่ท่านต้องการตรวจ`}</Text>
                        <Text style={[styles.text16, { color: primaryColor}]}>{`กรุณาเลือกตึกและชั้นที่ท่านต้องการตรวจสอบ`}</Text>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                            keyboardShouldPersistTaps="always">
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 20 }]}
                                onPress={
                                    () => {
                                       
                                    }
                                }>
                                <Text style={{ color: 'white' }}>{`กรุณาเลือกตึก`}</Text>
                                <Icon name='chevron-right' size={12} color='white' />
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 20 }]}
                                onPress={
                                    () => {
                                       
                                    }
                                }>
                                <Text style={{ color: 'white' }}>{`กรุณาเลือกประเภทตลาด`}</Text>
                                <Icon name='chevron-right' size={12} color='white' />
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View >
                                <Text style={[styles.text18, { color: primaryColor }]}>{`เลือกชั้นทั้ต้องการ`}</Text>
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
                            </View>
                            <View style={[styles.hr]}></View>
                            <View >
                                <Text style={[styles.text18, { color: primaryColor }]}>{`เลือกโซนต้องการ`}</Text>
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
                            </View>

                            <View>
                                <TouchableOpacity style={[styles.mainButton, {flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: 'center', justifyContent: 'center'}]}
                                    onPress={
                                         () => {
                                            this.props.navigation.navigate('HomeDetails')
                                        }
                                    }>
                                    <Text style={[styles.text16, { textAlign:'center', color: 'white' }]}>{`ยืนยัน`}</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </ScrollView>

                        
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)