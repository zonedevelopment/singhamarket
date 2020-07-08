import React from 'react'
import {
    View,
    Text,
    Image,
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
    redColor,
    BASE_URL,
    GET_FAVERITE_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

class FavoriteScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            ListData : [],
        };
    }

    _renderItem = ({item,index}) => {
        return (
            <View style={{ borderBottomWidth: 0.3, borderBottomColor: grayColor, padding: 10 }}>
                <TouchableOpacity style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between' }]}
                    onPress={
                        () => null
                    }>
                    <View style={[styles.containerRow]}>
                        <View style={{ flex: 0.15 }}>
                            <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                <Text style={[styles.text16, styles.bold]}>{`C02`}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text style={[styles.text16, styles.bold, { color: primaryColor }]}>{`SINGHA COMPLEX 1`}</Text>
                            <Text style={[styles.text14]}>{`บูธ C02`}</Text>
                            <Text style={[styles.text14]}>{`วันที่ 31 มีนาคม`}</Text>
                            <Text style={[styles.text14, { color: redColor}]}>{`เหลือเวลาในการจอง 04:00 นาที`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 5, right: 5}}>
                    <TouchableOpacity style={[styles.center, { width: 20, height: 20, borderRadius: 15, backgroundColor: grayColor}]}>
                        <Icon name={'times'} size={15} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                <Text style={[styles.text18, { color: 'white' }]}>{`บูธที่สนใจ`}</Text>
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
        this.LoadData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadData () {
        const props = this.props.reducer
        let formData = new FormData();
        formData.append('partners_id',props.userInfo.partners_id)
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_FAVERITE_URL,formData,HEADERFORMDATA,(results)=>{
            console.log('GET_FAVERITE_URL',results)
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data
                })
                this.props.dismissIndicator()
            } else {
                Alert.alert(results.message)
                this.props.dismissIndicator()
            }
        })
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
                    <Text style={[styles.text22, { color: primaryColor }]}>{`รายการบูธที่สนใจ`}</Text>
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5, paddingBottom: 60 }}
                            data={this.state.ListData}
                            extraData={this.state}
                            keyExtractor={(item) => item.interested_id}
                            renderItem={this._renderItem} />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen)