import React from 'react'
import {
    View,
    Text,
    FlatList,
    Alert,
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
    setAuditHomeBuilding
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
        this.props.setAuditHomeBuilding([])
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, styles.backgroundPrimary, { paddingBottom: 60 }]}>
               
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.container,styles.panelWhite, styles.shadow,{alignItems: 'center'}]}>
                        <Text style={[styles.text22, { color: primaryColor }]}>{`เลือกตลาดที่ที่ท่านต้องการตรวจ`}</Text>
                        <Text style={[styles.text16, { color: primaryColor}]}>{`กรุณาเลือกตลาดที่ท่านต้องการตรวจสอบ`}</Text>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                            keyboardShouldPersistTaps="never">
                            <TouchableOpacity
                                style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }]}
                                onPress={
                                    () => {
                                       this.props.navigation.navigate('HomeListBuilding')
                                    }
                                }>
                                <Text style={{ color: 'white' }}>
                                    {
                                        Object.keys(props.audit_home_building).length == 0 ? 'เลือกตลาด' : props.audit_home_building.building_name
                                    }
                                </Text>
                                <Icon name='chevron-right' size={12} color='white' />
                            </TouchableOpacity>
                         
                            <View style={[styles.marginBetweenVertical]}></View>

                            <View>
                                <TouchableOpacity style={[styles.mainButton, {flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: 'center', justifyContent: 'center'}]}
                                    onPress={
                                         () => {
                                            if(Object.keys(props.audit_home_building).length == 0){
                                                Alert.alert(
                                                    'คำเตือน!',
                                                    'กรุณาเลือกตลาดที่ต้องการดูข้อมูล!'
                                                );
                                            }else{
                                                this.props.navigation.navigate('HomeDetails',{
                                                    building_data : props.audit_home_building
                                                })
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
    setAuditHomeBuilding,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)