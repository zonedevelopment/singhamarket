import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Dimensions,
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
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'
import ic_user from '../assets/image/icon_user_login.png'
import ic_lock from '../assets/image/icon_password.png'

const DEVICE_WIDTH = Dimensions.get('screen').width
class LoginScreen extends React.Component {

    state = {
        username: '',
        password: ''
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
                <Text style={[styles.text16, { color: 'white' }]}>{`เข้าสู่ระบบ`}</Text>
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
            <View style={[styles.container, styles.backgroundPrimary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, styles.center]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <View style={[styles.panelWhite, styles.shadow]}>
                        <Text style={[styles.text20, { color: primaryColor, alignSelf: 'center' }]}>{`เข้าสู่ระบบ`}</Text>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <Image source={ic_user} style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 5 }} />
                            <TextInput
                                ref={(input) => { this.username = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='ชื่อผู้ใช้งาน'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({ username: text })}
                                onSubmitEditing={() => this.password.focus()} />
                        </View>
                        <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' }]}>
                            <Image source={ic_lock} style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 5 }} />
                            <TextInput
                                ref={(input) => { this.username = input; }}
                                style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                placeholder='รหัสผ่าน'
                                returnKeyType={'done'}
                                secureTextEntry={true}
                                blurOnSubmit={false}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                                onSubmitEditing={() => null} />
                        </View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={[styles.text14, { color: primaryColor, alignSelf: 'center', textDecorationLine: 'underline' }]}>{`ลืมรหัสผ่าน?`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <TouchableOpacity style={[styles.mainButton, styles.center]}
                            onPress={
                                () => this.props.navigation.navigate('Main')
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`เข้าสู่ระบบ`}</Text>
                        </TouchableOpacity>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <View style={[styles.marginBetweenVertical]}></View>
                        <Text style={[styles.text14, { alignSelf: 'center' }]}>{`ถ้าท่านยังไม่ได้เป็นสมาชิก สมัครสมาชิกได้เลยค่ะ`}</Text>
                        <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}
                            onPress={
                                () => this.props.navigation.navigate('Registercondition')
                            }>
                            <Text style={[styles.text18, { color: '#FFF' }]}>{`สมัครสมาชิก`}</Text>
                        </TouchableOpacity>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)