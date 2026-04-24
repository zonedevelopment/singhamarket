import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Alert,
    ScrollView,
    RefreshControl,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { Picker } from "native-base"
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import PhotoGrid from 'react-native-image-grid';
import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    greenColor,
    BASE_URL,
    pendingColor,
    reservColor,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA,
    alpaGreen,
    redColor,
    alpaYellow,
    AUDIT_GET_VERIFY_MAIN,
    AUDIT_CHECKED_SUBMIT_MAIN
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class ListVerifyScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        listBooth: [],
        HeaderName: '',
        Count: 0,
        description: [],
        StatusSave: false,
        dataImages: [],
        isFetching: false
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            // this.props.navigation.pop();
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
        // const { data,service } = this.props.route.params
        this.props.navigation.addListener('focus', () => {
            this.LoadData()
            //this.countItem()
        });
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadData() {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('marketname_id', this.props.reducer.audit_verify_building.building_id)
        formData.append('zone_id', this.props.reducer.audit_verify_zone.selectedValue)
        Hepler.post(BASE_URL + AUDIT_GET_VERIFY_MAIN, formData, HEADERFORMDATA, (results) => {
            console.log('defaultdate', results.defaultdate)
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    listBooth: results.data.DataTable,
                    HeaderName: results.data.HeaderName,
                    Count: results.data.Count,
                    description: results.data.NumStatus,
                    StatusSave: results.data.SaveStatus,
                    isFetching: false
                })
                //Alert.alert(results.message)
            } else {
                this.setState({
                    isFetching: false
                })
                Alert.alert(results.message)
                // this.setState({ListData : []})
            }
        })
    }

    onRefresh() {
        this.setState({
            isFetching: true
        }, () => {
            this.LoadData()
        })
    }



    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[styles.containerRow, { padding: 5, height: 50, margin: -4 }]}
                onPress={() => {
                    {
                        if (item.audit_status_id == "00") {
                            this.props.navigation.navigate('VerifyBooth', {
                                data: item,
                            })
                        }
                    }
                }}>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.background_color, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, margin: 4, backgroundColor: item.color }}></View>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`${item.zone_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.50, backgroundColor: item.background_color, alignItems: 'center', padding: 5 }]}>
                    <Text style={[styles.text16, { color: primaryColor, alignSelf: 'flex-start' }]}>{`${item.booth_name}: ${item.product_name}`}</Text>
                </View>
                <View style={[styles.containerRow, { flex: 0.25, backgroundColor: item.background_color, justifyContent: 'center', alignItems: 'center', padding: 5 }]}>
                    <Icon name='check-square' size={25} color={item.check_in_status == 'Y' ? greenColor : grayColor} />
                    {
                        item.audit_status_id == "00" ?
                            <Icon style={{ paddingLeft: 10 }} name='chevron-right' size={20} color={grayColor} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
    }


    onSelectedPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchCamera(options, (response) => { /// showImagePicker
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let Images = this.state.dataImages;
                let arr = {};
                arr["src"] = response.uri;
                arr["Base64"] = response.data;
                Images.push(arr);
                this.setState({
                    dataImages: Images,
                });
            }
        });
    }


    renderDesciption(value, index) {

        return (
            <View style={[styles.containerRow, { borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 5 }]}>
                <View style={{ flex: 0.1 }}>
                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: value.color }}></View>
                </View>
                <View style={{ flex: 0.7 }}>
                    <Text>{value.audit_status_name}</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                    <Text>{value.Num}</Text>
                </View>
            </View>
        )
    }

    ValidateSubmit() {
        let arr = this.state.description;
        let NumPendding = arr[arr.findIndex(k => k.audit_status_id == "00")].Num;
        if (NumPendding != 0) {
            Alert.alert('กรุณาตรวจ Booth ให้ครบ!')
        } else {
            Alert.alert(
                "ยืนยัน",
                'ยืนยันการตรวจสอบพื้นที่ตลาด',
                [
                    {
                        text: "ยกเลิก",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "ตกลง",
                        onPress: () => this.onSubmit()
                    }
                ],
                { cancelable: false }
            );
        }

    }

    onSubmit() {
        let arr = this.state.description;
        let NumPendding = arr[arr.findIndex(k => k.audit_status_id == "00")].Num;
        let NumSuccess = arr[arr.findIndex(k => k.audit_status_id == "10")].Num;
        let NumFail = arr[arr.findIndex(k => k.audit_status_id == "20")].Num;
        let NumCuting = arr[arr.findIndex(k => k.audit_status_id == "99")].Num;

        this.props.openIndicator()
        let formData = new FormData();
        formData.append('marketname_id', this.props.reducer.audit_verify_building.building_id)
        formData.append('zone_id', this.props.reducer.audit_verify_zone.selectedValue)
        formData.append('NumSuccess', NumSuccess)
        formData.append('NumFail', NumFail)
        formData.append('NumCuting', NumCuting)
        formData.append('NumPendding', NumPendding)
        formData.append('member_id', this.props.reducer.userInfo.userid)
        formData.append('images', JSON.stringify(this.state.dataImages))
        Hepler.post(BASE_URL + AUDIT_CHECKED_SUBMIT_MAIN, formData, HEADERFORMDATA, (results) => {
            console.log('AUDIT_CHECKED_SUBMIT_MAIN', results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Verify' }],
                });
                this.props.navigation.navigate('AuditSuccess')
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }


    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <ScrollView
                    // refreshControl={
                    //     <RefreshControl refreshing={false} onRefresh={this.LoadData()} />
                    // }
                    style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text14, { color: primaryColor }]}>{`วันที่ ` + moment().format('LL')}</Text>
                    </View>
                    <View style={[styles.containerRow]}>
                        <Text style={[styles.text18, { color: primaryColor }]}>{this.state.HeaderName}</Text>
                        <Text style={[styles.text18, { color: '#D4AC0D' }]}>{` จำนวน ` + this.state.Count + ` ร้านค้า`}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={{ padding: 15, borderColor: '#eee', borderWidth: 1, backgroundColor: '#F4F6F6', borderRadius: 15 }}>
                        {
                            this.state.description.map((value, index) => this.renderDesciption(value, index))
                        }
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.containerRow, { paddingBottom: 5, paddingTop: 5, height: 55 }]}>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`Booth No.`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.50, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`รายละเอียด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text18, { color: 'white' }]}>{`เช็คอิน`}</Text>
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
                            <View style={[styles.containerRow, { padding: 5, height: 55, alignSelf: 'center' }]}>
                                <Text style={[styles.text16, { textAlign: 'center', color: primaryColor }]}>{'ไม่พบข้อมูล'}</Text>
                            </View>
                    }
                    {
                        this.state.listBooth.length > 0 && this.state.StatusSave == false ?
                            <View>
                                <View style={[styles.marginBetweenVertical]}></View>
                                <View style={{}}>
                                    {
                                        this.state.dataImages.length > 0 ?
                                            <FlatList
                                                data={this.state.dataImages}
                                                renderItem={({ item }) => (
                                                    <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
                                                        <FastImage style={{ borderRadius: 5, borderWidth: 1, paddingLeft: 5, paddingRight: 5, height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }}
                                                            resizeMode={FastImage.resizeMode.contain}
                                                            source={{ uri: item.src }} />
                                                    </View>
                                                )}
                                                numColumns={3}
                                                keyExtractor={(item, index) => index.toString()}

                                            /> : <View style={{ alignItems: 'center' }}><Text style={[styles.text16, { color: 'red' }]}>ไม่มีรูปภาพ</Text></View>

                                    }

                                    <TouchableOpacity style={{ borderRadius: 5, margin: 5, borderWidth: 1, borderColor: '#ddd', paddingLeft: 5, paddingRight: 5, height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => {
                                            this.onSelectedPhoto();
                                        }}
                                    >
                                        <Icon name='plus' size={20} color={primaryColor} />
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: primaryColor }}>
                                            {`เพิ่มรูปภาพ`}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.marginBetweenVertical]}></View>
                                <View style={[styles.containerRow, { alignItems: 'center', flex: 1, marginBottom: 20 }]}>
                                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor, flex: 1 }]}
                                        onPress={
                                            () => {
                                                this.ValidateSubmit()
                                            }
                                        }
                                    >
                                        <Text style={[styles.text18, { color: '#FFF' }]}>{`เสร็จสิ้น`}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View></View>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListVerifyScreen)