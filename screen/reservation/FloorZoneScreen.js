import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Alert,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'
import {
    openIndicator,
    dismissIndicator,
    setStateBuilding,
    setStateSelectedBuildingID,
    setStateSelectedFloorID,
    setStateSelectedZoneID
} from '../../actions'

import styles from '../../style/style'

import ic_plan from '../../assets/image/icon_plan_gold.png'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class FloorZoneScreen extends React.Component {

    state = {
        building_data : [],
        index : 0,
        building_id : '',
        floor : [],
        zone : [],
        floor_selectedValue : '',
        floor_selectedIndex : null,
        zone_selectedValue : '',
        zone_selectedIndex : null,
    }

    onSelectFloor(index, value) {
        this.props.openIndicator()
        let zone = this.state.zone
        this.state.zone.map((v,i)=>{
            if(zone[i]['floor_id'] == value){
                zone[i]['disabled'] = false
            }else{
                zone[i]['disabled'] = true
            }
        })
        this.setState({
            floor_selectedIndex : index,
            floor_selectedValue : value,
            zone_selectedIndex : null,
            zone_selectedValue : '',
            zone : zone,
        })
        this.props.dismissIndicator()
    }

    onSelectZone(index, value){
        this.props.openIndicator()
        this.setState({
            zone_selectedIndex : index,
            zone_selectedValue : value,
        })
        this.props.dismissIndicator()
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
                <Text style={[styles.text18, { color: 'white' }]}>{`จองพื้นที่ร้านค้า`}</Text>
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

    async componentDidMount() {
        const{ building_data } = this.props.route.params
        let index = this.props.reducer.building.findIndex(p => p.building_id == building_data.building_id)
        await this.setState({
            index : index,
            floor : this.props.reducer.building[index].building_floor,
            zone : this.props.reducer.building[index].building_zone,
            building_id : building_data.building_id
        })
        console.log('floor',this.state.floor)
        // console.log('building_data',building_data);
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
      //  const{ building_data } = this.props.route.params
        const props = this.props.reducer
        //let index = props.building.findIndex(p => p.building_id == building_data.building_id)
        // const floor = props.building[index].building_floor
        // const zone = props.building[index].building_zone
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
                <ScrollView >
                    <View style={[styles.container]}>
                        <Image style={[styles.fullWidth, { height: (DEVICE_HEIGHT / 2) - 150, resizeMode: 'stretch' }]} source={{ uri: props.building[this.state.index].building_img }} />
                        <View style={{ padding: 15 }}>
                            <View style={[styles.containerRow]}>
                                <Text style={[styles.text18, styles.bold, {alignSelf:'flex-start',  flex: 0.6, color: primaryColor }]}>{props.building[this.state.index].building_name}</Text>
                                <TouchableOpacity style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                    onPress={
                                        () => this.props.navigation.push('Plan')
                                    }>
                                    <Image source={ic_plan} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                    <Text style={[styles.text14, { color: primaryColor, marginLeft: 2 }]}>{`ดูแปลนพื้นที่ขายของ`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View >
                                <Text style={[styles.text16]}>{`กรุณาเลือกชั้นที่ท่านต้องการ`}</Text>
                                <RadioGroup
                                    size={20}
                                    thickness={2}
                                    selectedIndex={this.state.floor_selectedIndex}
                                    color={primaryColor}
                                    style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                    highlightColor='transparent'
                                    onSelect={(index, value) => this.onSelectFloor(index, value)} >
                                    {
                                        this.state.floor.map((v, i) => {
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
                                    }
                                </RadioGroup>
                            </View>
                            <View style={[styles.hr]}></View>
                            <View>
                                <Text style={[styles.text16]}>{`กรุณาเลือกโซน`}</Text>
                                <RadioGroup
                                    size={20}
                                    thickness={2}
                                    selectedIndex={this.state.zone_selectedIndex}
                                    color={primaryColor}
                                    style={{ flexDirection: 'row', justifyContent: 'space-around',  flexWrap: 'wrap' }}
                                    highlightColor='transparent'
                                    onSelect={(index, value) => this.onSelectZone(index, value)} >
                                    {
                                        this.state.zone.map((v, i) => {
                                            return (
                                                <RadioButton
                                                    key={i}
                                                    value={v.zone_id}
                                                    disabled={v.disabled}
                                                    color={primaryColor}
                                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                                    <Text style={[styles.text14, { color: primaryColor }]}>{`${v.zone_name}`}</Text>
                                                </RadioButton>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </View>
                            <View style={[styles.hr]}></View>
                            <View>
                                <Text style={[styles.text16]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                <View style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}>
                                    <Text style={[styles.text16, { color: 'white' }]}>{ props.userInfo.product_type.type_name + ` : ` + props.userInfo.product_type.category_name}</Text>
                                </View>
                                <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                                {
                                    props.userInfo.product.map((v, i) => {
                                        return (
                                            <View key={i} style={{ paddingLeft: 40 }}>
                                                <Text style={[styles.text14]}>{`${(i + 1)}. ${v.product_name}`}</Text>
                                            </View>
                                        )
                                    })
                                      
                                }
                                <Text style={[styles.text12, { color: primaryColor,paddingTop:5, paddingLeft: 20 }]}>{`*หมายเหตุ ถ้าท่านต้องเปลี่ยนประเภทสินค้าที่ต้องการขาย\n กรุณาติดต่อเจ้าหน้าที่`}</Text>
                            </View>
                            
                            <View style={[styles.hr]}></View>
                            <View>
                                <Text style={[styles.text16]}>{`กรุณาเลือกวันที่และบูธที่ต้องการขายของ`}</Text>
                                <TouchableOpacity style={[styles.mainButton2, { flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 5 }]}
                                    onPress={
                                        async () => {
                                            if(this.state.floor_selectedValue == '' || this.state.zone_selectedValue == ''){
                                                await Alert.alert(
                                                    'คำเตือน!',
                                                    'กรุณาเลือกโซนที่ท่านต้องการขายของ!'
                                                );
                                            }else{
                                                await this.props.setStateSelectedBuildingID(this.state.building_id)
                                                await this.props.setStateSelectedFloorID(this.state.floor_selectedValue)
                                                await this.props.setStateSelectedZoneID(this.state.zone_selectedValue)
                                                this.props.navigation.navigate('Calendar')
                                            }

                                        }
                                    }>
                                    <Text style={[styles.text16, { color: 'white' }]}>{`กรุณาเลือกวันที่และบูธที่ต้องการขายของ`}</Text>
                                    <Icon name='chevron-right' size={12} color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.hr]}></View>
                            <Text style={[styles.bold, styles.text12, { color: primaryColor, paddingLeft: 10 }]}>{`*หมายเหตุ กรุณาชำระเงินภายใน 30 นาที นับจากการจองสำเร็จ`}</Text>
                        </View>
                    </View>
                </ScrollView>
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
    setStateBuilding,
    setStateSelectedBuildingID,
    setStateSelectedFloorID,
    setStateSelectedZoneID
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorZoneScreen)