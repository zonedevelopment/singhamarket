import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    ScrollView,
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
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const DEVICE_WIDTH = Dimensions.get('screen').width
class RegisterConditionScreen extends React.Component {

    state = {
        type: 1,
        licenseAgree: false,
        privacyAgree: false,
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onCheckLicense(value) {
        this.setState({ licenseAgree: value })
    }

    onCheckPrivacy(value) {
        this.setState({ privacyAgree: value })
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
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: this.state.type == 1 ? secondaryColor : grayColor }]}
                                    onPress={
                                        () => this.setState({ 
                                            type: 1,
                                            licenseAgree: false,
                                            privacyAgree: false,
                                         })
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`บุคคลธรรมดา`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: this.state.type == 1 ? grayColor : secondaryColor }]}
                                    onPress={
                                        () => this.setState({ 
                                            type: 2 , 
                                            licenseAgree: false,
                                            privacyAgree: false,
                                        })
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`นิติบุคคล`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <HTML html={htmlContent} imagesMaxWidth={DEVICE_WIDTH - 20} />
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
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
                            <TouchableOpacity style={[styles.mainButton, styles.center]}
                                onPress={
                                    () => {
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

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConditionScreen)