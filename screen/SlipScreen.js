import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    Alert,
    PermissionsAndroid,
    BackHandler,
    TouchableOpacity, TouchableOpacityBase
} from 'react-native'
import moment from 'moment'
import Gallery from 'react-native-image-gallery';
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
    BASE_URL,
    GET_SLIP_PAYMENT_URL,
    HEADERFORMDATA,
    GET_CART_URL,
    KEY_LOGIN
} from '../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../style/style'
import StorageServies from '../utils/StorageServies'
import {
    openIndicator,
    setUserCountCartItem,
    dismissIndicator,
    setTransactionSelected,
} from '../actions'
import Hepler from '../utils/Helper'
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

const DEVICE_WIDTH = Dimensions.get('screen').width
class SlipScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        image_url : '',//'http://sunplaza-dev.singhaestate.co.th/api/download/T2009000001584.png'
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
                <Text style={[styles.text18, { color: 'white'}]}>{`ชำระเงินเรียบร้อย`}</Text>
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
        this.props.setTransactionSelected('')
        if (this.props.navigation.isFocused()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
            });
            this.props.navigation.navigate('Home');
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
        const { slipUrl,ActionType } = this.props.route.params
        if (slipUrl != '') {
            this.setState({ image_url: slipUrl})
        }
        if(ActionType == 'Notification'){
            this.LoadSlipURL()
        }
        this.GetMyCart(this.props.reducer.userInfo.partners_id)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadSlipURL = () => {
        let trans_id = this.props.reducer.trans_id_selected
        let partners_id = this.props.reducer.userInfo.partners_id
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('TRANS_ID',trans_id)
        formData.append('PARTNERS_ID',partners_id)
        Hepler.post(BASE_URL + GET_SLIP_PAYMENT_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('CHECK_BOOTH_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    image_url : results.data.slip_url
                })
                this.props.dismissIndicator()
                this.handleDownload()
            } else {
                //Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
    }

    GetMyCart (partners_id) {
        let formData = new FormData();
        formData.append('partners_id',partners_id)
        Hepler.post(BASE_URL + GET_CART_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_CART_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.setUserCountCartItem(results.data.Cart.length + results.data.Charge.length)
              //  this.props.navigation.replace('Main')
            } else {
                this.props.setUserCountCartItem(0)
               // Alert.alert(results.message)
            }
        })
    }


    getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                'บันทึกใบเสร็จ',
                'Grant Me Permission to save Image',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
            );
        } catch (err) {
            Alert.alert(
                'บันทึกใบเสร็จ',
                'Failed to save Image: ' + err.message,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
            );
        }
    };
    
    handleDownload = async () => {
        // if device is android you have to ensure you have permission
        if (Platform.OS === 'android') {
            const granted = await this.getPermissionAndroid();
            if (!granted) {
                return;
            }
        }
        this.props.openIndicator()
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', this.state.image_url)
            .then(res => {
            CameraRoll.saveToCameraRoll(res.data, 'photo')
                .then(() => {
                    Alert.alert(
                        'บันทึกใบเสร็จ',
                        'บันทึกใบเสร็จสำเร็จแล้ว!',
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                        {cancelable: false},
                    );
                })
                .catch(err => {
                    Alert.alert(
                        'บันทึกใบเสร็จ',
                        'บันทึกใบเสร็จไม่สำเร็จ : ' + err.message,
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                        {cancelable: false},
                    );
                })
                .finally(() => this.props.dismissIndicator());
            })
            .catch(error => {
                this.props.dismissIndicator()
                Alert.alert(
                    'บันทึกใบเสร็จ',
                    'บันทึกใบเสร็จไม่สำเร็จ: ' + error.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                );
            });
    };


    render() {
        const props = this.props
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.panelWhite, styles.shadow,{alignItems: 'center',paddingBottom:10}]}>
                        <View style={{ alignItems: "center",marginTop:10 }}>
                            <Text style={{fontSize:20}}>ท่านได้ทำการชำระเงิน</Text>
                            <Text style={{fontSize:20}}>เรียบร้อยแล้ว</Text>
                        </View>
                        <View style={{ width: DEVICE_WIDTH / 1.2, height: 300,borderWidth:1 }}>
                            <Gallery
                                initialPage={0}
                                images={[
                                    { 
                                        source: { 
                                            uri: this.state.image_url
                                        }}
                                ]}
                            />
                        </View>
                       
                        {/* <Image
                            style={{ width: DEVICE_WIDTH / 1.2, height: 300,borderWidth:1 }}
                            source={{
                                uri: this.state.image_url,
                                headers: { Authorization: 'someAuthToken' },
                                priority: Image.priority.normal,
                            }}
                            resizeMode={Image.resizeMode.contain}
                        /> */}
                        <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 20,marginBottom:0 }]}>
                            <TouchableOpacity style={[styles.mainButton2, styles.center,]}
                                onPress={
                                    () => this.handleDownload()
                                }
                                >
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`บันทึกใบเสร็จ`}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 20 }]}>
                            
                            <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor, }]}
                                onPress={
                                    () => this.handleBack()
                                }
                                >
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`กลับสู่หน้าหลัก`}</Text>
                            </TouchableOpacity>
                       
                        </View>
                 
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
    setUserCountCartItem,
    dismissIndicator,
    setTransactionSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(SlipScreen)