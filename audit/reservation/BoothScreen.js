import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Alert,
    Dimensions,
    BackHandler, 
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { Picker,CheckBox } from 'native-base';
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    pendingColor,
    reservColor,
    alpaGreen,
    alpaYellow,
    alpaRed,
    HEADERFORMDATA,
    BASE_URL,
    GET_BOOTH_URL,
    CHECK_BOOTH_URL,
    CHECK_LIMIT_RESERVATION_URL,
    SUBMIT_FAVERITE_URL
} from '../../utils/contants'

import styles from '../../style/style'
import ic_plan from '../../assets/image/icon_plan_gold.png'

import {
    openIndicator,
    dismissIndicator,
    setAuditReservDate,
    setStatePreviousScreen
} from '../../actions'
import Hepler from '../../utils/Helper'
const DEVICE_HEIGHT = Dimensions.get('screen').height
class BoothScreen extends React.Component {
    backHandlerSubscription = null

 
    state = {
        dayItem: {},
        dateSelected: [],
        ddlSelectedDate : '',
        listBooth : [],
        boothChecked : [],
        isFetching: false,
    }

    
    CheckBooth = (item) =>{
        let arr = this.state.listBooth
        let Selected = this.state.boothChecked
        let index = arr.findIndex(obj => obj.booth_detail_id == item.booth_detail_id)
        if(arr[index].checked == true){
            arr[index].checked = false
            var SelectedIndex = Selected.indexOf(obj => obj.booth_id == item.booth_detail_id);
            Selected.splice(SelectedIndex, 1);
            this.setState({
                listBooth : arr,
                boothChecked : Selected,
            })
        }else{

            this.props.openIndicator()
            let formData = new FormData();
            let arrDate = []
            this.props.reducer.audit_reserv_date.map((v,i) => {
                arrDate.push(v.date)
            })
            formData.append('partners_id',this.props.reducer.audit_reserv_partners.partners_id)
            formData.append('date',JSON.stringify(arrDate))
            formData.append('lengthSelected',JSON.stringify(Selected.length))
            Hepler.post(BASE_URL + CHECK_LIMIT_RESERVATION_URL,formData,HEADERFORMDATA,(results)=>{
                console.log('CHECK_LIMIT_RESERVATION_URL',results)
                if (results.status == 'SUCCESS') {
                    if(results.data == true){
                        arr[index].checked = true
                        Selected.push({
                            'booth_id' : item.booth_detail_id,
                            'booth_name' : item.booth_name,
                            'booth_amount' : item.booth_amount
                        })
                        this.setState({
                            listBooth : arr,
                            boothChecked : Selected,
                        })
                    }else{
                        Alert.alert(results.message)
                    }
                    this.props.dismissIndicator()
                } else {
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
            })

            // if(Selected.length < this.props.reducer.LimitReservUserOfDay){
            //     arr[index].checked = true
            //     Selected.push({
            //         'booth_id' : item.booth_detail_id,
            //         'booth_name' : item.booth_name,
            //         'booth_amount' : item.booth_amount
            //     })
            //     this.setState({
            //         listBooth : arr,
            //         boothChecked : Selected,
            //     })
            // }else{
            //     Alert.alert('ไม่สามารถเลือกบูธได้เกิน ' + this.props.reducer.LimitReservUserOfDay + ' บูธต่อวัน')
            // }
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { padding: 5,/* height: 50,*/ margin: -4 }]}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.booking_status_background_color, justifyContent: 'space-around', alignItems: 'center', padding: 5 }]}>
                    {/* <View style={{ width: 15, height: 15, borderRadius: 10, margin: 2, backgroundColor: item.booth_status_id == 1 ? emptyColor : item.booth_status_id == 2 ? pendingColor : reservColor }}></View> */}
                   
                    <CheckBox style={{ paddingLeft:6,paddingTop:3,borderRadius: 20,height:28,width:28}} checked={item.checked}  color={primaryColor} onPress={() =>{
                        {
                            if(item.booth_status_id == "1"){
                                this.CheckBooth(item)
                            }
                        }
                    }} />
                    {/* <Text style={[styles.text14, { color: primaryColor }]}>{`${item.booth_name}`}</Text> */}
                    {
                        item.booth_detail_image != "" ?
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.push('Plan',{
                                    plan_image : item.booth_detail_image
                                })
                            }}>
                                <Icon name='picture-o' size={18} />
                            </TouchableOpacity>
                            :
                            <Icon name='picture-o' size={18} />
                    }
                </View>
                <View style={[styles.containerRow, { flex: 0.75, backgroundColor: item.booking_status_background_color, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text14, { flex: 0.8, color: primaryColor, paddingLeft: 5, alignItems: 'center', justifyContent: 'flex-start' }]}>{item.booth_name + ' : ' + item.product_cate_name}</Text>
                    {
                        item.booth_status_id == "1" ?
                            <TouchableOpacity style={[styles.circleGreen, styles.center, { flex: 0.25 }]}
                                onPress={
                                    () => {}//this.onSelectBooth(item)
                                }>
                                <Text style={[styles.text14, { color: primaryColor }]}>{`ว่าง`}</Text>
                            </TouchableOpacity>
                            :
                            item.booth_status_id == "2" ?
                                <TouchableOpacity style={[ item.interest_status == 'No' ? styles.circleYellow : styles.circleGray, styles.center, { flex: 0.25 }]}onPress={
                                    () => {}//this.onReciveInterested(item)
                                }>
                                    <Text style={[styles.text14, { color:item.interest_status == 'No' ?  primaryColor : '#FFF' }]}>{ `แจ้งเตือน`}</Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.circleRed, styles.center, { flex: 0.25 }]}>
                                    <Text style={[styles.text14, { color: primaryColor }]}>{`เต็ม`}</Text>
                                </View>
                    }
                </View>
            </View>
        )
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกบูธขายของ`}</Text>
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
        let firstdateSelected = '';
        const props = this.props.reducer
        props.audit_reserv_date.map((v,i)=>{
            if (i == 0) {
                firstdateSelected = v.date
                this.setState({ ddlSelectedDate: v.date })
            }
        })
        
        this.setSelectedDate(firstdateSelected)

        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillReceiveProps(nextProps){
        const { day } = nextProps.route.params
        if(this.props.reducer.previous_screen == 'DaySelected'){
            this.setSelectedDate(day)
            this.props.setStatePreviousScreen('Booth')
        }
    }

    onReciveInterested(itemValue){
        // if(itemValue.interest_status == 'No'){
        //     const props = this.props.reducer
        //     let formData = new FormData();
        //     formData.append('booking_detail_id',itemValue.booking_detail_id)
        //     formData.append('partners_id',props.userInfo.partners_id)
        //     this.props.openIndicator()
        //     Hepler.post(BASE_URL + SUBMIT_FAVERITE_URL,formData,HEADERFORMDATA,(results)=>{
        //         console.log('SUBMIT_FAVERITE_URL',results)
        //         if (results.status == 'SUCCESS') {
        //             this.props.dismissIndicator()
        //             Alert.alert(  
        //                 '',  
        //                 results.message,  
        //                 [  
        //                     {text: 'OK', onPress: () => this.setSelectedDate(this.state.ddlSelectedDate)},  
        //                 ]  
        //             ); 
        //         } else {  
        //             Alert.alert(results.message)
        //             this.props.dismissIndicator()
        //         }
        //     })
        // }else{
        //     Alert.alert(`ท่านกดรับการแจ้งเตือนไปแล้ว!`)
        // }

    }

    

    setSelectedDate(itemValue){
        if(itemValue != ''){
            this.setState({ddlSelectedDate : itemValue})
            this.props.openIndicator()
            let formData = new FormData();
            formData.append('building_id',this.props.reducer.audit_reserv_building.building_id)
            formData.append('partners_id',this.props.reducer.audit_reserv_partners.partners_id)
           // formData.append('floor_id',this.props.reducer.audit_reserv_floor.selectedValue)
            formData.append('zone_id',this.props.reducer.audit_reserv_zone.selectedValue)
            formData.append('date',itemValue)
            formData.append('product_type_id', this.props.reducer.audit_reserv_partners.product_type ? this.props.reducer.audit_reserv_partners.product_type.type_id : '')
            formData.append('product_cate_id', this.props.reducer.audit_reserv_partners.product_type ? this.props.reducer.audit_reserv_partners.product_type.cate_id : '')
            Hepler.post(BASE_URL + GET_BOOTH_URL,formData,HEADERFORMDATA,(results) => {
                console.log('GET_BOOTH_URL',results)
                if (results.status == 'SUCCESS') {
                    this.setState({
                        listBooth : results.data,
                        isFetching: false
                    })
                    this.props.dismissIndicator()
                } else {
                    this.setState({
                        listBooth : [],
                        isFetching: false
                    })
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
            })
        }
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.setSelectedDate(this.state.ddlSelectedDate)
        })
    }

    
    Submit = () => {
        let { ActionType } = this.props.route.params
        let arrDaySelected = this.props.reducer.audit_reserv_date
        let arrBoothChecked = this.state.boothChecked
        if(ActionType == 'CHECK_ALL'){
            this.props.openIndicator()
            let arrDate = []
            arrDaySelected.map((v,i) => {
                arrDate.push(v.date)
            })
            let formData = new FormData();
            formData.append('booth_detail_id',JSON.stringify(arrBoothChecked))
            formData.append('date',JSON.stringify(arrDate))
            Hepler.post(BASE_URL + CHECK_BOOTH_URL,formData,HEADERFORMDATA,(results)=>{
                console.log('CHECK_BOOTH_URL',results)
                if (results.status == 'SUCCESS') {
                    results.data.map((vr,ir) => {
                        arrDaySelected.map((vs,is) => {
                            if(vs.date == vr.date){
                                vs['ListBooth'] = vr.value
                            }
                        })
                    })
                    arrDaySelected = arrDaySelected.filter(e => e.ListBooth.length > 0)
                    console.log('arrDaySelected' ,arrDaySelected)
                    this.props.setAuditReservDate(arrDaySelected)
                    this.props.dismissIndicator()
                    this.props.navigation.navigate('ReservSummaryAudit',{
                        previous_screen : 'BoothAudit'
                    })
                } else {
                    Alert.alert(results.message)
                    this.props.dismissIndicator()
                }
            })
        }
    }

    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 50 }]}>
                <ScrollView>
                    <View style={[styles.container, { padding: 15 }]}>
                        <View style={[styles.containerRow]}>
                            <Text style={[styles.text18, styles.bold, { flex: 0.6, color: primaryColor }]}>{`เลือกบูธที่ต้องการขายของ`}</Text>
                        </View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.marginBetweenVertical]}></View>
                            <View style={{ padding: 10, height: 45, backgroundColor: '#f3f3f3' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={[styles.circleGreen]}></View>
                                    <Text style={[styles.text16, { marginLeft: 5, marginRight: 40 }]}>{`ว่าง`}</Text>
                                    <View style={[styles.circleYellow]}></View>
                                    <Text style={[styles.text16, { marginLeft: 5, marginRight: 40 }]}>{`รอชำระเงิน`}</Text>
                                    <View style={[styles.circleRed]}></View>
                                    <Text style={[styles.text16, { marginLeft: 5 }]}>{`จองแล้ว`}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                                <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                    <Text style={[styles.text16, { color: 'white' }]}>{`Booth No.`}</Text>
                                </View>
                                <View style={{ width: 1, backgroundColor: 'white' }}></View>
                                <View style={{ flex: 0.75, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                                    <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียด`}</Text>
                                </View>
                            </View>
                            {
                                this.state.listBooth.length > 0 ?
                                    <FlatList
                                        data={this.state.listBooth}
                                        extraData={this.state}
                                        onRefresh={() => this.onRefresh()}
                                        refreshing={this.state.isFetching}
                                        keyExtractor={(item) => item.booth_detail_id}
                                        renderItem={this._renderItem} />
                                :
                                    <View style={[styles.containerRow, { padding: 5, height: 55,alignSelf:'center' }]}>
                                        <Text style={[styles.text16,{textAlign:'center',color:primaryColor}]}>{'ไม่พบข้อมูลบูธขายของ'}</Text>
                                    </View>
                            }
                    </View>
                    <View style={[styles.center, { padding: 5, bottom: 5, alignSelf: 'center' , bottom: 15}]}>
                        <TouchableOpacity style={[styles.mainButton, styles.center]}
                            onPress={
                                () => {
                                    if(this.state.boothChecked.length > 0){
                                        this.Submit()
                                    
                                    }else{
                                        Alert.alert('กรุณาเลือกบูธขายของอย่างน้อย 1 รายการ')
                                    }
                                }
                            }>
                            <Text style={[styles.text18, { color: 'white' }]}>{`ยืนยัน`}</Text>
                        </TouchableOpacity>
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
    setAuditReservDate,
    setStatePreviousScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(BoothScreen)