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
var numeral = require('numeral')
import moment from 'moment'
import { connect } from 'react-redux'
import Image from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker'
import Lightbox from 'react-native-lightbox'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor,
    KEY_LOGIN,
    BASE_URL,
    HEADERFORMDATA,
    AUDIT_SUBMIT_UPLOAD_SLIP
} from '../../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class AuditSaveSlipPaymentScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        ListData: [],
        isFetching: false,
        FileSource: '',
        FileSourceBase64: '',
    }

    componentWillUnmount() {
       // if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
       // this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    Submit () {
        const { data} = this.props.route.params
        this.props.openIndicator()
        let formData = new FormData()
        formData.append('member_id',this.props.reducer.userInfo.userid)
        formData.append('FileSourceBase64', this.state.FileSourceBase64)
        formData.append('booking_id', data.booking_id)
        Hepler.post(BASE_URL + AUDIT_SUBMIT_UPLOAD_SLIP,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data,
                })
                
            } else {
                this.setState({
                    ListData : [],
                })
                Alert.alert(results.message)
                this.setState({ListData : []})
            }
        })
    }

    
    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }

    
    SelectFiles() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    FileSource: response.uri,
                    FileSourceBase64: response.data
                });
            }
        });
    }


    render() {
        const props = this.props.reducer
        const { data} = this.props.route.params

        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <ScrollView style={[styles.container, { padding: 10 }]}>

                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center',padding:5 }]}>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[styles.text16, { color: primaryColor ,fontWeight:'bold' }]}>{'เลขการจอง : ' + data.booking_id }</Text>
                                {/* <Text style={[styles.text12, { color: 'red' }]}>{`เหลือเวลาในการจองอีก ` + item.Timelate + ` นาที`}</Text> */}
                            </View>
                        </View>
                       
                    </View>
                    {
                        data.Booking_Details.map((valueDetails, indexDetails) => {
                            return (
                                <View>
                                    {
                                        indexDetails == 0 ?
                                            <View style={[styles.container, { backgroundColor: secondaryColor, borderRadius: 8, justifyContent: 'center', paddingLeft: 10 }]}>
                                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.name_market}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.floor_name + ` / ` + valueDetails.zone_name}</Text>
                                                </View>
                                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{valueDetails.product_type_name}</Text>
                                                </View>
                                            </View>
                                            :
                                            null
                                    }

                                    <View style={[styles.marginBetweenVertical]}></View>
                                    <View style={[styles.containerRow]}>
                                        <View style={{ flex: 0.15 }}>
                                            <View style={[styles.center, { width: 42, height: 42, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                                <Text style={[styles.text14, styles.bold, { textAlign: 'center' }]}>{valueDetails.boothname}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.9 }}>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text16]}>{`วันที่ขาย ` + moment(valueDetails.booking_detail_date).format('LL')}</Text>
                                            </View>
                                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                                                <Text style={[styles.text14]}>{numeral(valueDetails.boothprice).format('0,0.00') + ` บาท`}</Text>
                                            </View>
                                            {
                                                valueDetails.Service.map((vService, iService) => {
                                                    return (
                                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                            <Text style={[styles.text14]}>{vService.service_name + ' x' + vService.qty}</Text>
                                                            <Text style={[styles.text14]}>{numeral(parseFloat(vService.service_item_price) * parseFloat(vService.qty)).format('0,0.00') + ` บาท`}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.marginBetweenVertical]}></View>
                                </View>
                            )
                        })
                    }
                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}/>


                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 15 }]}>
                        <Text style={[styles.text18, { color: primaryColor }]}>{`แนบไฟล์หลักฐานการชำระเงิน`}</Text>
                        <TouchableOpacity style={[styles.twoButton, styles.center, { width: 100, backgroundColor: grayColor }]}
                            onPress={() => {
                                this.SelectFiles()
                            }}
                        >
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`Choose file`}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.FileSource != '' ?
                            <Lightbox activeProps={{
                                resizeMode: 'contain',
                                flex: 1,
                                width: null,
                            }} underlayColor="white" style={{ padding: 15 }}>
                                <Image style={{ width: '100%', height: 180, resizeMode: 'contain' }} source={{ uri: this.state.FileSource }} />
                            </Lightbox>
                            :
                            <View></View>
                    }
                     <TouchableOpacity
                        style={[styles.mainButton, styles.center]}
                        onPress={
                            () => {
                              Alert.alert(
                                    "ยืนยัน",
                                    'ยืนยันการบันทึก',
                                    [
                                        {
                                            text: "ยกเลิก",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "ตกลง",
                                            onPress: () => this.Submit()
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`บันทึก`}</Text>
                    </TouchableOpacity>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AuditSaveSlipPaymentScreen)