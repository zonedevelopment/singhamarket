import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    Alert
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
    setAuditVerifyZone
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class VerifyScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        zone_selectedIndex : 0,
        zone: []
    }

     
    onSelectZone(index, value){
        this.props.openIndicator()
        this.props.setAuditVerifyZone({
            selectedValue : value,
            selectedIndex : index,
            selectedName : this.props.reducer.audit_verify_building.building_zone[index].zone_name,
        })
        this.props.dismissIndicator()
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
        const props = this.props.reducer
        return (
            <View style={[styles.container, styles.backgroundPrimary, { paddingBottom: 60 }]}>
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.container,styles.panelWhite, styles.shadow,{alignItems: 'center'}]}>
                        <Text style={[styles.text22, { color: primaryColor,paddingTop:20 }]}>{`เลือกสถานที่ที่ท่านต้องการตรวจ`}</Text>
                        <Text style={[styles.text16, { color: primaryColor}]}>{`กรุณาเลือกตลาดและชั้นที่ท่านต้องการตรวจสอบ`}</Text>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                            keyboardShouldPersistTaps="always">
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('ListBuildingVerify')
                                    }
                                }>
                                <Text style={[styles.text16, { color: 'white' }]}>{
                                    Object.keys(props.audit_verify_building).length == 0 ? 'เลือกตลาด' : props.audit_verify_building.building_name
                                }</Text>
                                <Icon name='chevron-right' size={12} color='white' />
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <View >
                                <Text style={[styles.text18, { color: primaryColor }]}>{`เลือกโซนต้องการ`}</Text>
                                <RadioGroup
                                    size={20}
                                    thickness={2}
                                    selectedIndex={props.audit_verify_zone.selectedIndex}
                                    color={primaryColor}
                                    style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                    highlightColor='transparent'
                                    onSelect={(index, value) => this.onSelectZone(index, value)} >
                                    {
                                        Object.keys(props.audit_verify_building).length > 0 ?
                                            props.audit_verify_building.building_zone.map((v, i) => {
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
                                    Object.keys(props.audit_verify_building).length == 0 ?
                                        <View style={[styles.center]}><Text style={{textAlign:'center'}}>{'กรุณาเลือกตลาด!'}</Text></View>
                                    : null
                                }
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View>
                                <TouchableOpacity style={[styles.mainButton, {flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: 'center', justifyContent: 'center'}]}
                                    onPress={
                                         () => {
                                            if(Object.keys(props.audit_verify_building).length == 0){
                                                Alert.alert(
                                                    'คำเตือน!',
                                                    'กรุณาเลือกตลาดที่ต้องการตรวจสอบ!'
                                                );
                                            }else if (props.audit_verify_zone.selectedValue == ''){
                                                Alert.alert(
                                                    'คำเตือน!',
                                                    'กรุณาเลือกโซนที่ท่านต้องการตรวจสอบ!'
                                                );
                                            }else{
                                                this.props.navigation.navigate('ListVerify')
                                            }
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
    setAuditVerifyZone
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen)