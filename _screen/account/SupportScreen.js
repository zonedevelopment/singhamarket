import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Alert,
    Dimensions,
    ScrollView,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    redColor,
    CONTACT_SUPPORT_URL,
    BASE_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'
import { validateFormSecurity } from '../../utils/inputSecurity'

class SupportScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        name : '',
        phone : '',
        email : '',
        detail : '',
    }


    SubmitData () {
        const props = this.props.reducer
        const securityError = validateFormSecurity([
            { label: 'ชื่อผู้ติดต่อ', value: this.state.name, checkSql: false },
            { label: 'เบอร์โทรศัพท์', value: this.state.phone, checkSql: true },
            { label: 'Email', value: this.state.email, checkSql: true },
            { label: 'รายละเอียด', value: this.state.detail, checkSql: false },
        ])

        if (securityError) {
            return Alert.alert(securityError)
        }

        let formData = new FormData();
        formData.append('name',this.state.name)
        formData.append('phone',this.state.phone)
        formData.append('email',this.state.email)
        formData.append('details',this.state.detail)
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + CONTACT_SUPPORT_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('CONTACT_SUPPORT_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.dismissIndicator()
                this.setState({
                    name : '',
                    phone : '',
                    email : '',
                    detail : '',
                })
                Alert.alert(  
                    '',  
                    results.message
                ); 
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`แจ้งเรื่องร้องเรียน / ติดต่อเรา`}</Text>
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="always">
                    <View style={[styles.container, styles.center, { padding: 5 }]}>
                        <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                        <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`คุณสามารถติดต่อเราได้ที่`}</Text>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`SINGHA ESTATE`}</Text>
                        <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`PUBLIC COMPNAY LIMITED`}</Text>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <Text style={[styles.text12, { color: primaryColor, alignSelf: 'center' }]}>{`123 Suntowers Building B, 22nd floor, Vibhavadi-Rangsit Road,`}</Text>
                        <Text style={[styles.text12, { color: primaryColor, alignSelf: 'center' }]}>{`Chom Phon, Chatuchak, Bangkok 10900`}</Text>
                        <Text style={[styles.text14, { color: primaryColor, alignSelf: 'center' }]}>{`โทร.`}</Text>
                        <Text style={[styles.text14, { color: primaryColor, alignSelf: 'center' }]}>{`อีเมล Info@singhaestate.co.th`}</Text>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <Text style={[styles.text18, { color: primaryColor, alignSelf: 'center' }]}>{`สอบถาม/แจ้งเรื่องร้องเรียน`}</Text>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                ref={(input) => { this.name = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='ชื่อ - นามสกุล'
                                returnKeyType={'next'}
                                value={this.state.name}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ name: text })}
                                onSubmitEditing={() => this.phone.focus()} />
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                ref={(input) => { this.phone = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='เบอร์โทรศัพท์'
                                value={this.state.phone}
                                keyboardType={'number-pad'}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ phone: text })}
                                onSubmitEditing={() => this.email.focus()} />
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <TextInput
                                ref={(input) => { this.email = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='อีเมล'
                                returnKeyType={'next'}
                                value={this.state.email}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ email: text })}
                                onSubmitEditing={() => this.detail.focus()} />
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center', height: 120 }]}>
                            <TextInput
                                ref={(input) => { this.detail = input; }}
                                style={{ width: '100%', height: 100, alignSelf: 'flex-start', color: 'black', textAlignVertical: 'top' }}
                                placeholder='รายละเอียด'
                                returnKeyType={'done'}
                                multiline={true}
                                value={this.state.detail}
                                numberOfLines={3}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ detail: text })} />
                        </View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center'}]}>
                            <TouchableOpacity style={[styles.twoButtonRound, styles.center, { alignSelf: 'center', backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                onPress={
                                    () => this.handleBack()
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยกเลิก`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.twoButtonRound, styles.center, { alignSelf: 'center', backgroundColor: secondaryColor }]}
                                onPress={
                                    () => this.SubmitData()
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยัน`}</Text>
                            </TouchableOpacity>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
