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
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA
} from '../utils/contants'

import {
    saveProductType
} from '../actions'

import styles from '../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class ProductListScreen extends React.Component {

    state = {
        type_id: '',
        productList: [],
        productSelected: [],
        RegisType: ''
    }

    async onItemChecked(item, checked) {
        let selected = []
        let arr = this.state.productList
        let index = arr.findIndex(k => k.product_id == item.product_id);
        arr[index].checked = checked == true ? false : true;

        if (arr[index].checked) {
            selected.push(item)
        } else {
            this.state.productSelected.filter((v, i) => {
                if (v.product_id === arr[index].product_id) {
                    this.state.productSelected.splice(i, 1);
                }
            })
        }
        await this.setState({
            productList: arr,
            productSelected: [...selected, ...this.state.productSelected]
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}>
                <CheckBox
                    title={item.product_name}
                    checked={item.checked}
                    textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }}
                    onPress={
                        () => {
                            this.onItemChecked(item, item.checked);
                        }
                    } />
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
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        const { typeId, product,RegisType } = this.props.route.params
        this.setState({ type_id: typeId, productList: product,RegisType:RegisType })
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
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, styles.bold, { color: primaryColor }]}>{`เลือกประเภท${this.state.type_id == 1 ? 'อาหาร' : 'สินค้า'}ที่ต้องการขาย`}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }]}>
                        <TextInput
                            style={[{ color: 'white' }]}
                            textContentType={{ color: 'white' }}
                            placeholder='ค้นหาประเภทอาหาร...'
                            placeholderTextColor="white" />
                        <Icon name='search' size={16} color='white' />
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    {
                        this.state.productList.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5, paddingBottom: 60 }}
                            data={this.state.productList}
                            keyExtractor={(item) => item.product_id}
                            renderItem={this._renderItem} />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' }]}>
                                <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการ`}</Text>
                            </View>
                    }
                    
                </View>
                {
                    this.state.productSelected.length > 0 ?
                        <View style={[styles.center, { position: 'absolute', bottom: 10, alignSelf: 'center' }]}>
                            <TouchableOpacity style={[styles.mainButton, styles.center]}
                                onPress={
                                    async () => {
                                        await this.props.saveProductType(this.state.productSelected)
                                        if(this.state.RegisType == 'Personal'){
                                            this.props.navigation.navigate('Registerperson')
                                        }else if(this.state.RegisType == 'Company'){
                                            this.props.navigation.navigate('Registercompany')
                                        }else if (this.state.RegisType == 'ProfileCompany'){
                                            this.props.navigation.navigate('Company')
                                        }else{
                                            this.props.navigation.navigate('Personal')
                                        }
                                    }
                                }>
                                <Text style={[styles.text18, { color: '#FFF' }]}>{`ยืนยัน`}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    saveProductType
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListScreen)