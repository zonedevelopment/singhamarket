import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    BackHandler,
    ScrollView,
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
} from '../../utils/contants'

import styles from '../../style/style'

import ic_profile from '../../assets/image/icon_user_gold2.png'
import ic_company from '../../assets/image/icon_company.png'
import ic_history from '../../assets/image/icon_list.png'
import ic_fav from '../../assets/image/icon_market_gold.png'
import ic_support from '../../assets/image/icon_chat.png'
import ic_logout from '../../assets/image/icon_logout_gold.png'

class ProfileScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`บัญชีของฉัน`}</Text>
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

        const props = this.props.reducer
        const userInfo = props.userInfo[0]

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
                <ScrollView>
                    <View style={[styles.container]}>
                        {
                            userInfo.partners_type == 1 ?
                                <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}>
                                    <Image source={ic_profile} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                                    <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`ข้อมูลส่วนตัว`}</Text>
                                    <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                        <Icon name='chevron-right' size={14} color={primaryColor} />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}>
                                    <Image source={ic_company} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                                    <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`ข้อมูลนิติบุคคล`}</Text>
                                    <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                        <Icon name='chevron-right' size={14} color={primaryColor} />
                                    </View>
                                </TouchableOpacity>
                        }
                        <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}
                            onPress={
                                () => this.props.navigation.navigate('History')
                            }>
                            <Image source={ic_history} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`ประวัติการจอง`}</Text>
                            <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                <Icon name='chevron-right' size={14} color={primaryColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}
                            onPress={
                                () => this.props.navigation.navigate('Favorite')
                            }>
                            <Image source={ic_fav} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`บูธที่สนใจ`}</Text>
                            <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                <Icon name='chevron-right' size={14} color={primaryColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}
                            onPress={
                                () => this.props.navigation.navigate('Support')
                            }>
                            <Image source={ic_support} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`แจ้งเรื่องร้องเรียน / ติดต่อเรา`}</Text>
                            <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                <Icon name='chevron-right' size={14} color={primaryColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 5 }]}
                        onPress={
                            () => this.props.navigation.navigate('Login')
                        }>
                            <Image source={ic_logout} style={{ flex: 0.1, width: 20, height: 20, resizeMode: 'contain' }} />
                            <Text style={[styles.text16, { flex: 0.7, color: primaryColor }]}>{`ออกจากระบบ`}</Text>
                            <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
                                <Icon name='chevron-right' size={14} color={primaryColor} />
                            </View>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)