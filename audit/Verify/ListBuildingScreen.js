import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    TextInput,
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
    GET_BUILDING_URL,
    BASE_URL,
    HEADERFORMDATA,
    KEY_LOGIN
} from '../../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
    setAuditVerifyBuilding,
  //  setAuditReservFloor,
    setAuditVerifyZone
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ListBuildingScreen extends React.Component {
    backHandlerSubscription = null

    state = {
        ListData: [],
        isFetching: false,
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
            <View style={[styles.center]}>
                <Text style={[styles.text18, { color: 'white'}]}>{`เลือกตลาด`}</Text>
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
            //this.props.navigation.pop();
            this.props.navigation.goBack()
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
        this.LoadData();
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadData () {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('ROLETYPE', 'ADMIN')
        formData.append('ADMIN_ID', this.props.reducer.userInfo.userid)
        Hepler.post(BASE_URL + GET_BUILDING_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_BUILDING_URL',results)
            if(results.status == 'SUCCESS'){
                this.setState({
                    ListData : results.data,
                    isFetching: false
                })
            }else{
                this.setState({
                    ListData : [],
                    isFetching: false
                })
            }
            this.props.dismissIndicator()
        })
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }


    
    _renderListItem = ({ item }) => {
        return (
            <TouchableOpacity style={{width:'90%',alignSelf: 'center' }} 
            onPress={ async()=>{
                this.props.openIndicator()
                // await  this.props.setAuditReservFloor({
                //     selectedValue : '',
                //     selectedIndex : null,
                //     selectedName : '',
                // })
                await this.props.setAuditVerifyZone({
                    selectedValue : '',
                    selectedIndex : null,
                    selectedName : '',
                })
                await this.props.setAuditVerifyBuilding(item)
                this.props.dismissIndicator()
                this.props.navigation.goBack()
            }}>
                <View style={{ flexDirection: 'row',paddingTop:10,paddingBottom:10}}>
                    <View style={{flex: 0.9}} >
                        <Text >{item.building_name}</Text>
                    </View>
                    <View style={{flex: 0.1,alignItems: 'center', justifyContent: 'center'}} >
                        <Icon name='chevron-right' size={15} color={primaryColor} style={{textAlign: 'right'}}/>
                    </View>
                </View>
                <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
            </TouchableOpacity>
        )
    }


    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                {/* <NavigationBar
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
                    }} /> */}
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.containerRow,{width: '90%', marginLeft: 10}]}>
                        <Text style={[styles.text20, { color: primaryColor }]}>{`เลือกตลาดที่ต้องการขาย`}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, width:'90%',alignSelf: 'center',}} /> 
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                keyExtractor={(item) => item.building_id}
                                renderItem={this._renderListItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
                            </View>
                    }
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
    setAuditVerifyBuilding,
   // setAuditReservFloor,
    setAuditVerifyZone
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuildingScreen)