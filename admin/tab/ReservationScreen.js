import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    Picker,
    Alert,
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
    setAuditReservPartners,
    setAuditReservBuilding,
    setAuditReservFloor,
    setAuditReservZone
} from '../../actions'
import Hepler from '../../utils/Helper'
import componentRightSignOut from '../../components/ComponentRightSignOut'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ReservationScreen extends React.Component {

    state = {
        floor_selectedValue : '',
        floor_selectedIndex : null,
        zone_selectedValue : '',
        zone_selectedIndex : null,
    }
    
    ComponentLeft = () => {
        return (
            <View style={{ padding: 10,flex:0.2}}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center],{flex:0.6}}>
                <Text style={[styles.text18, { color: 'white',textAlign:'center'}]}>{`จองพื้นที่ตลาด`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10,alignItems:'center',flex:0.2}}>
                <Icon name='sign-out' size={20} color='white' />
                <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
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
        this.props.setAuditReservPartners([])
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    
    onSelectZone(index, value){
        this.props.openIndicator()
        this.props.setAuditReservZone({
            selectedValue : value,
            selectedIndex : index,
            selectedName : this.props.reducer.audit_reserv_building.building_zone[index].zone_name,
        })
        this.props.dismissIndicator()
    }

    onSelectFloor(index, value) {
        this.props.openIndicator()
        this.props.setAuditReservFloor({
            selectedValue : value,
            selectedIndex : index,
            selectedName : this.props.reducer.audit_reserv_building.building_floor[index].floor_name,
        })
        this.props.setAuditReservZone({
            selectedValue : '',
            selectedIndex : null,
            selectedName : '',
        })
        this.props.dismissIndicator()
    }

    render() {
        const props = this.props.reducer
        console.log('audit_reserv_building',props.audit_reserv_building)
        console.log('length',Object.keys(props.audit_reserv_building).length)
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
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}
                            onPress={()=>{
                                this.props.navigation.navigate('ReservListCustomer')
                            }}>
                                <Text style={[styles.text16, { color: 'white' }]}>{
                                    Object.keys(props.audit_reserv_partners).length == 0 ? 'กรุณาเลือกรายชื่อลูกค้า' : props.audit_reserv_partners.name_customer
                                }</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`เลือกตลาดที่ต้องการขายของ`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}
                            onPress={  () => {
                                this.props.navigation.navigate('ReservListBuilding') 
                            }}>
                                <Text style={[styles.text16, { color: 'white' }]}>{
                                Object.keys(props.audit_reserv_building).length == 0 ? 'เลือกตลาด' : props.audit_reserv_building.building_name}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{'เลือกประเภทตลาด'}</Text>
                                <View style={{paddingRight:10}}>
                                    <Icon name='chevron-right' size={16} color='white' />
                                </View>
                            </TouchableOpacity> */}
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกชั้น`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={props.audit_reserv_floor.selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectFloor(index, value)} >
                                    {
                                        Object.keys(props.audit_reserv_building).length > 0 ?
                                            props.audit_reserv_building.building_floor.map((v, i) => {
                                                return (
                                                    <RadioButton
                                                        key={i}
                                                        value={v.floor_id}
                                                        color={primaryColor}
                                                        style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                                        <Text style={[styles.text16, { color: primaryColor }]}>{`${v.floor_name}`}</Text>
                                                    </RadioButton>
                                                )
                                            })
                                        : null
                                    }
                            </RadioGroup>
                            {
                                Object.keys(props.audit_reserv_building).length == 0 ?
                                    <View style={[styles.center]}><Text style={{textAlign:'center'}}>{'กรุณาเลือกตลาด!'}</Text></View>
                                : null
                            }
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกโซน`}</Text>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                selectedIndex={props.audit_reserv_zone.selectedIndex}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectZone(index, value)} >
                                {
                                    Object.keys(props.audit_reserv_building).length > 0 ?
                                        props.audit_reserv_building.building_zone.map((v, i) => {
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
                                    : null
                                }
                            </RadioGroup>
                            {
                                Object.keys(props.audit_reserv_building).length == 0 ?
                                    <View style={[styles.center]}><Text style={{textAlign:'center'}}>{'กรุณาเลือกตลาด!'}</Text></View>
                                : null
                            }
                            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text16, { color: primaryColor }]}>{`กรุณาเลือกวันที่และบูธที่ต้องการขายของ`}</Text>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', backgroundColor: primaryColor }]}
                                onPress={()=>{
                                    if(Object.keys(props.audit_reserv_partners).length == 0){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกลูกค้าที่ต้องการจองพื้นที่!'
                                        );
                                    }else if(Object.keys(props.audit_reserv_building).length == 0){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกตลาดที่ต้องการขายของ!'
                                        );
                                    }else if(props.audit_reserv_floor.selectedValue == ''){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกชั้นที่ท่านต้องการขายของ!'
                                        );
                                    }else if (props.audit_reserv_zone.selectedValue == ''){
                                        Alert.alert(
                                            'คำเตือน!',
                                            'กรุณาเลือกโซนที่ท่านต้องการขายของ!'
                                        );
                                    }else{
                                        this.props.navigation.navigate('ReservCalendarAudit')
                                    }
                                }}
                            >
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
    setAuditReservPartners,
    setAuditReservBuilding,
    setAuditReservFloor,
    setAuditReservZone
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen)