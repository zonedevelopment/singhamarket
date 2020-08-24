import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    FlatList,
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
    emptyColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    GET_NOTIFICATION_URL,
    HEADERFORMDATA
} from '../../utils/contants'
import Hepler from '../../utils/Helper'

import {
    openIndicator,
    dismissIndicator,
} from '../../actions'

import styles from '../../style/style'

class NotificationScreen extends React.Component {

    state = {
        ListData : []
    }

    _renderItem = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}
                    onPress={
                        () => null
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: item.background_color, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold]}>{item.key_name}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{item.title}</Text>
                            <Text style={[styles.text14, { color: 'red'}]}>{item.body}</Text>
                            <Text style={[styles.text14]}>{moment(item.create_at).format('LLL')}</Text>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={16} color='gray' />
                </TouchableOpacity>
            </View>
        )
    }

    ComponentLeft = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`แจ้งเตือน`}</Text>
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

    LoadData = () => {
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_id',this.props.reducer.userInfo.partners_id)
        Hepler.post(BASE_URL + GET_NOTIFICATION_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_NOTIFICATION_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    ListData : []
                })
                this.props.dismissIndicator()
                //Alert.alert(results.message)
            }
        })

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        this.LoadData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                <View style={[styles.container, { padding: 10 }]}>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                            data={this.state.ListData}
                            extraData={this.state}
                            keyExtractor={(item) => item.notification_id}
                            renderItem={this._renderItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบข้อมูลการแจ้งเตือน`}</Text>
                            </View>
                    }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)