import React,{useCallback } from 'react'
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    Dimensions,
    BackHandler,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { CheckBox } from 'react-native-elements'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    GET_AGREEMENT_REGISTER,
    HEADERFORMDATA
} from '../utils/contants'

import {
    openIndicator,
    dismissIndicator,
    saveProductType
} from '../actions'
import Hepler from '../utils/Helper'

import styles from '../style/style'

import OpenURLButton from '../components/OpenURLButton'

const DEVICE_WIDTH = Dimensions.get('screen').width
class RegisterConditionScreen extends React.Component {

    state = {
        type: 1,
        licenseAgree: false,
        privacyAgree: false,
        htmlContent : '',
        privacy_url : '',
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อตกลงและเงื่อนไข`}</Text>
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
        await this.LoadAgreement(1)
       
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onCheckLicense(value) {
        this.setState({ licenseAgree: value })
    }

    onCheckPrivacy(value) {
        this.setState({ privacyAgree: value })
    }


    LoadAgreement (type) {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type_id', type)
        Hepler.post(BASE_URL + GET_AGREEMENT_REGISTER,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    htmlContent : results.data['agreement'],
                    privacy_url : results.data['privacy_url'],
                    type: type,
                    licenseAgree: false,
                    privacyAgree: false,
                })
            } else {
                Alert.alert(results.message)
                this.setState({
                    htmlContent : '',
                    privacy_url : '',
                    type: type,
                    licenseAgree: false,
                    privacyAgree: false,
                })
            }
        })
    }

    

    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
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
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <ScrollView>
                        <View style={[styles.panelWhite, styles.shadow,{ zIndex:1000}]}>
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: this.state.type == 1 ? secondaryColor : grayColor }]}
                                    onPress={
                                        () =>  this.LoadAgreement(1)
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`บุคคลธรรมดา`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: this.state.type == 1 ? grayColor : secondaryColor }]}
                                    onPress={
                                        () => this.LoadAgreement(2)
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`นิติบุคคล`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <HTML html={this.state.htmlContent} imagesMaxWidth={DEVICE_WIDTH - 20} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                                <OpenURLButton fontSize={20} url={this.state.privacy_url}>{'นโยบายความเป็นส่วนตัว'}</OpenURLButton>
                            {
                                this.state.type == 1 ?
                                    <View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <CheckBox
                                                center
                                                containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                                size={22}
                                                checked={this.state.licenseAgree}
                                                onPress={() => this.onCheckLicense(!this.state.licenseAgree)} />
                                            <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ยอมรับข้อตกลงและเงื่อนไขในการจองตลาด `}</Text>
                                        </View>
                                        <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                                            <CheckBox
                                                center
                                                containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                                size={22}
                                                checked={this.state.privacyAgree}
                                                onPress={() => this.onCheckPrivacy(!this.state.privacyAgree)} />
                                            <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ให้การยินยอมในการเปิดเผยข้อมูล `}</Text>
                                        </View>
                                    </View>
                                :
                                    <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <CheckBox
                                            center
                                            containerStyle={{ flex: 0.05, backgroundColor: 'transparent', borderWidth: 0, margin: 0, alignSelf: 'flex-end', marginRight: -5 }}
                                            size={22}
                                            checked={this.state.licenseAgree}
                                            onPress={() => this.onCheckLicense(!this.state.licenseAgree)} />
                                        <Text style={[styles.text14, { flex: 1, textAlign: 'left', marginLeft: -5 }]}>{`ยอมรับข้อตกลงและเงื่อนไขในการจองตลาด `}</Text>
                                    </View>
                            }

                            <View style={[styles.marginBetweenVertical]}></View>
                            <TouchableOpacity style={[
                                this.state.type == 1 ? (this.state.licenseAgree ? styles.mainButton : styles.mainButtonDisabled) : (this.state.licenseAgree ? styles.mainButton : styles.mainButtonDisabled),
                                styles.center]}
                                disabled={this.state.type == 1 ? (this.state.licenseAgree ? false : true) : (this.state.licenseAgree ? false : true)} 
                                onPress={
                                    () => {
                                        this.props.saveProductType([])
                                        if (this.state.type == 1) {
                                            this.props.navigation.navigate('Registerperson')
                                        } else if (this.state.type == 2) {
                                            this.props.navigation.navigate('Registercompany')
                                        }
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยัน`}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConditionScreen)