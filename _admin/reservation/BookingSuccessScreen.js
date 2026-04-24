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
    setAuditReservDate,
    setStateBookingSelected,
    setStatePreviousScreen,
    setAuditReservPartners,
    setAuditReservBuilding,
    setAuditReservFloor,
    setAuditReservZone
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class BookingSuccessScreen extends React.Component {
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
                <Text style={[styles.text18, { color: 'white'}]}>{`จองพื้นที่สำเร็จแล้ว`}</Text>
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
            this.props.navigation.navigate('Verify')
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
        this.props.setAuditReservDate([])
        //this.props.setAuditReservPartners([])
        this.props.setAuditReservBuilding([])
        this.props.setAuditReservZone( {
            selectedValue : '',
            selectedIndex : null,
            selectedName : '',
        })
        this.props.setAuditReservFloor( {
            selectedValue : '',
            selectedIndex : null,
            selectedName : '',
        })
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
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.panelWhite, styles.shadow,{alignItems: 'center',paddingBottom:50}]}>
                        <View style={{  alignItems: "center" }}>
                            <View style={{ backgroundColor: secondaryColor ,justifyContent: "center", alignItems: "center",width: 100, height: 100,borderRadius:50}}>
                                <Icon name="check" size={60} color="#FFFFFF"  />
                            </View>
                        </View>
                        <View style={{  alignItems: "center",marginTop:10 }}>
                            <Text style={{fontSize:30,fontWeight:'bold',color:primaryColor}}>{'ดำเนินการสำเร็จ'}</Text>
                        </View>
                        <View style={{ alignItems: "center",marginTop:10 }}>
                            <Text style={{fontSize:20}}>{'รายการพื้นที่ที่จองจะถูกส่งไปยังลูกค้า'}</Text>
                        </View>

                        <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 20 }]}>
                            <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, }]}
                                onPress={
                                    () => this.handleBack()
                                }
                                >
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`กลับสู่หน้าหลัก`}</Text>
                            </TouchableOpacity>
                        </View>
                 
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
    setAuditReservDate,
    setStateBookingSelected,
    setStatePreviousScreen,
    setAuditReservPartners,
    setAuditReservBuilding,
    setAuditReservFloor,
    setAuditReservZone
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSuccessScreen)