import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
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
    greenColor,
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA,
    AUDIT_HOME_DASHBOARD,
    alpaGreen
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class HomeDetailsScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        Building_ID : '',
        Building_Name : '',
        ListData : [],
        isFetching: false,
    }


    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
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
        // const { building_data } = this.props.route.params
        this.props.navigation.addListener('focus', () => {
            let props = this.props.reducer
            if(Object.keys(props.audit_home_building).length != 0){
                this.setState({
                    Building_ID : props.audit_home_building.building_id,
                    Building_Name : props.audit_home_building.building_name
                })
                this.LoadData(props.audit_home_building.building_id);
            }else{
                this.setState({
                    ListData : [],
                    isFetching: false
                })
            }
        });

        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }


    LoadData (BuildingID) {
        console.log('LoadData BuildingID : ',BuildingID)
     //   const { building_data } = this.props.route.params
        this.props.openIndicator()
        let formData = new FormData();
        //formData.append('marketname_id',building_data.building_id)
        formData.append('marketname_id',BuildingID)
        Hepler.post(BASE_URL + AUDIT_HOME_DASHBOARD,formData,HEADERFORMDATA,(results) => {
            console.log('AUDIT_HOME_DASHBOARD',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data,
                    isFetching: false,
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.setState({
                    ListData : [],
                    isFetching: false,
                })
                this.props.dismissIndicator()
            }
        })
    }


    onRefresh() {
        let props = this.props.reducer
        this.setState({
            isFetching: true
        },() => {
            if(Object.keys(props.audit_home_building).length != 0){
                this.LoadData(props.audit_home_building.building_id);
            }else{
                this.setState({
                    ListData : [],
                    isFetching: false
                })
            }
        })
    }

    _renderItem = ({ item, index }) => {
        const props = this.props.reducer
        let bgColor = item.status == 'gray' ? '#eee' : '#dbebed'
        let color = item.status == 'gray' ? grayColor : greenColor


        let NumAll = 0;
        let NumSuccess = 0;
        let NumWaiting = 0;
        let NumEmpty = 0;
        item.values.map(function(value,index){
            switch(value.StatusID) {
                case "1":
                    NumEmpty += parseInt(value.Num);
                    break;
                case "2":
                    NumWaiting += parseInt(value.Num);
                    break;
                case "3":
                    NumSuccess += parseInt(value.Num);
                    break;
            }
        });
        NumAll = parseInt(NumEmpty) + parseInt(NumWaiting) + parseInt(NumSuccess);

        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#eee' , padding: 10 }}>
                <View style={{ marginBottom: 5 ,marginTop: 5 ,padding:10,borderRadius:10,backgroundColor:bgColor }}>
                    <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                        <View style={{flex: 1,flexDirection:'row'}}>
                            <View style={{ width: 20,height: 20,borderRadius:50,backgroundColor: color}}></View>
                            <Text style={{paddingLeft:5,fontWeight:'bold',fontSize:14}}>{moment(item.BookingDate).format('LL')}</Text>
                        </View>
                        <View >
                            <Text style={{
                                textAlign: 'right',
                                borderRadius:5,
                                color:'#FFF',
                                padding:2,
                                paddingLeft:5,
                                paddingRight:5,
                                fontSize:14,
                                backgroundColor:color
                                }}>
                                    จำนวนบูธ {NumAll}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1, padding:20,backgroundColor:'#FFF',borderRadius:15,flexDirection: 'row'}}>
                        <View style={{flex: 1,textAlign: 'left'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{NumSuccess}</Text>
                            <Text style={[styles.TextFlexList]}>จองแล้ว</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'center'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>
                                {NumEmpty}
                            </Text>
                            <Text style={[styles.TextFlexList]} >ว่าง</Text>
                        </View>
                        <View style={{flex: 1,textAlign: 'right'}}>
                            <Text style={[styles.TextFlexList,{color:color}]}>{NumWaiting}</Text>
                            <Text style={[styles.TextFlexList]}>รอชำระเงิน</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
              
                        </View>
                        <View style={{flex: 1,marginTop:5}}>
                            <TouchableOpacity 
                                onPress={
                                    () => {
                                        this.props.navigation.push('HomeBoothReport',{
                                            BookingDate : item.BookingDate,
                                            BuildingID : this.state.Building_ID,
                                            BuildingName : this.state.Building_Name,
                                            Details : {
                                                NumAll : NumAll,
                                                NumSuccess : NumSuccess,
                                                NumWaiting : NumWaiting,
                                                NumEmpty : NumEmpty,
                                            },
                                        });
                                    }
                                }>
                                <Text style={[styles.text14,{textAlign: 'right'}]}>ดูรายละเอียด</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    {/* <View style={[styles.mainButton2 ,styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }]}>
                         <Text style={[styles.text16, { color: '#FFF' }]}>{this.state.Building_Name}</Text>  
                    </View> */}

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
                    <Text style={[styles.text20, { color: primaryColor }]}>{Object.keys(props.audit_home_building).length == 0 ? 'เลือกตลาด' : props.audit_home_building.building_name}</Text>

                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5, paddingBottom: 60 }}
                            data={this.state.ListData}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            extraData={this.state}
                            keyExtractor={(item) => item.BookingDate}
                            renderItem={this._renderItem} />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetailsScreen)