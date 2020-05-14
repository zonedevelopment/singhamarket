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
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class RegisterPersonScreen extends React.Component {

    onSelectType(index, value) {

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
                <Text style={[styles.text18, { color: 'white' }]}>{`สมัครสมาชิก`}</Text>
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: primaryColor }]}>
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
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <Text style={[styles.text22, { color: primaryColor, alignSelf: 'center' }]}>{`สมัครสมาชิก`}</Text>
                            <View style={[styles.hr]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ลงทะเบียนแบบบุคคลธรรมดา`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.name = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อ - นามสกุล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    onSubmitEditing={() => this.idcard.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.idcard = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เลขบัตรประชาชน'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ idcard: text })}
                                    onSubmitEditing={() => this.phone.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.phone = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='เบอร์โทรศัพท์'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ phone: text })}
                                    onSubmitEditing={() => this.lineid.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.lineid = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='Line ID'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ lineid: text })}
                                    onSubmitEditing={() => this.email.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='อีเมล'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    onSubmitEditing={() => this.password.focus()} />
                            </View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`รหัสผ่าน`}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.username = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='ชื่อผู้ใช้'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    onSubmitEditing={() => this.password.focus()} />
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                                <TextInput
                                    ref={(input) => { this.password = input; }}
                                    style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                    placeholder='รหัสผ่าน'
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    onSubmitEditing={() => this.password.focus()} />
                            </View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`กรุณาประเภทสินค้าที่จะนำมาขาย`}</Text>
                            </View>
                            <RadioGroup
                                size={20}
                                thickness={2}
                                color={primaryColor}
                                style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectType(index, value)} >
                                <RadioButton
                                    value={0}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`อาหาร`}</Text>
                                </RadioButton>
                                <RadioButton
                                    value={1}
                                    color={primaryColor}
                                    style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }} >
                                    <Text style={[styles.text16, { color: primaryColor }]}>{`สินค้าทั่วไป`}</Text>
                                </RadioButton>
                            </RadioGroup>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPersonScreen)