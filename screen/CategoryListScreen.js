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
import { CheckBox } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import {
    openIndicator,
    dismissIndicator
} from '../actions'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA
} from '../utils/contants'

import styles from '../style/style'
import Hepler from '../utils/Helper'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class CategoryListScreen extends React.Component {
    backHandlerSubscription = null

    state = {
        type_id: '',
        cate : [],
        RegisType : '',
        isFetching : false,
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}
                onPress={
                    () => this.props.navigation.navigate('Productlist', {
                        typeId: this.state.type_id,
                        product: item.product,
                        RegisType : this.state.RegisType,
                        category_id : item.category_id,
                        category_name : item.name,
                    })
                }>
                {/* <CheckBox
                    title={item.name}
                    checked={item.checked}
                    textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }} /> */}
                <Text style={[styles.text16, { color: primaryColor }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    LoadData = (product_type) => {
        let formData = new FormData();
        this.props.openIndicator()
        formData.append('product_type', product_type);
        Hepler.post(BASE_URL + PRODUCT_CATEGORY_URL,formData,HEADERFORMDATA,(results) => {
            if (results.status == 'SUCCESS') {
                this.setState({
                    cate: results.data,
                    isFetching: false
                })
                this.props.dismissIndicator()
            } else {
                this.setState({
                    cate : [],
                    isFetching: false
                })
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกประเภท${this.state.type_id == 1 ? 'อาหาร' : 'สินค้า'}`}</Text>
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

        return false;
    };

    componentWillUnmount() {
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    async componentDidMount() {
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        const{ typeId,RegisType } = this.props.route.params
        await this.setState({ type_id : typeId ,RegisType:RegisType})
        this.LoadData(typeId)
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData(this.state.type_id)
        })
    }

    render() {

        return (
            <View style={[styles.container, { backgroundColor: primaryColor }]}>
                {/* <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={[styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                        marginTop: DeviceInfo.hasNotch() ? 20 : 0
                    }]}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} /> */}
                <View style={[styles.container, { padding: 10, backgroundColor: 'white' }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{`เลือกหมวดหมู่สินค้าที่ต้องการขาย`}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                  
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={this.state.cate}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        keyExtractor={(item) => item.category_id}
                        renderItem={this._renderItem} />
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
    dismissIndicator
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListScreen)
