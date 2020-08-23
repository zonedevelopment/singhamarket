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
    HEADERFORMDATA,
    greenColor
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class CustomerDetailsScreen extends React.Component {

    state = {
        ListData : [
            {BoothName : 'C03',BoothDate : '2020-03-27',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C04',BoothDate : '2020-03-28',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C05',BoothDate : '2020-03-29',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C06',BoothDate : '2020-03-30',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C07',BoothDate : '2020-04-01',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C07',BoothDate : '2020-04-01',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
            {BoothName : 'C07',BoothDate : '2020-04-01',BuildingName : 'SINGHA COMPLEX 1',Product : 'ขนมไทย,ขนมหวาน'},
        ],
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
                <Text style={[styles.text18, { color: 'white' }]}>{`รายชื่อลูกค้า`}</Text>
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
        //const { data,service } = this.props.route.params
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }



    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={[styles.containerRow, { padding: 5, borderBottomColor: '#ddd', borderBottomWidth: 1, }]}
            onPress={
            () => {
                this.props.navigation.push('AuditHistoryDetails');
            }}>

                <View style={{ flexDirection: 'row',flex: 0.2, alignItems: 'center', justifyContent: 'center',paddingRight:10 }}>
                    <View  style={[{ backgroundColor: '#009933',padding:15,borderRadius:5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={[{ justifyContent: 'center' ,color:'#FFFFFF', fontWeight: 'bold',fontSize:16 }]}>
                            {item.BoothName}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row',flex: 0.7 , alignItems: 'center', }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.text16,styles.bold,{color:primaryColor}]}>วันที่ขาย :  {moment(item.BoothDate).format('ll')}</Text>
                        <Text style={[styles.text14]}>{item.BuildingName}</Text>
                        <Text style={[styles.text14]}>{item.Product}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row',flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name='chevron-right' size={15} color={primaryColor} style={{textAlign: 'right',justifyContent: 'center' }}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const props = this.props.reducer
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
                    <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{'รายละเอียดลูกค้า'}</Text>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[{padding:10,backgroundColor: '#eee',borderRadius:10}]}>
                        <Text style={[styles.text16, { color: primaryColor }]}>{`ชื่อ : ลลิตา พิบูรณ์คณารักษ์`}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`โทร : 09123123123`}</Text>
                        <Text style={[styles.text16, {paddingTop:5, color: primaryColor }]}>{`LineID : LineID`}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text18, styles.bold]}>{`รายการจองพื้นที่ร้านค้า `}</Text>
                        <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} />
                    </View>
                    <FlatList
                        data={this.state.ListData}
                        extraData={this.state}
                        keyExtractor={(item) => item.booth_id}
                        renderItem={this._renderItem}
                    />
                    
                </View>
{/* 
                <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center', padding: 10 }}>
                    <View style={[styles.containerRow,{alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor,flex:1 }]}
                            onPress={
                                () => this.handleBack()
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}


             
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsScreen)