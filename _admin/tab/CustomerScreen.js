import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    TextInput,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import SearchInput, { createFilter } from 'react-native-search-filter'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    KEY_LOGIN,
    GET_CUSTOMER_URL,
    BASE_URL,
    HEADERFORMDATA,
} from '../../utils/contants'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class CustomerScreen extends React.Component {
    backHandlerSubscription = null

    state = {
        keySearch: '',
        ListData: []
    }

    
    ComponentLeft = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.text18, { color: 'white'}]}>{`รายชื่อลูกค้า`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <TouchableOpacity style={{ padding: 10,alignItems:'center',flex:0.2}} onPress={ async () => {
                await StorageServies.clear()
                await this.props.saveUserInfo([])
                this.props.navigation.navigate('Choice')
            }}>
                <Icon name='sign-out' size={20} color='white' />
                <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
            </TouchableOpacity>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.navigate('AuditCustomer')
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
        this.LoadData();
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    LoadData () {
        this.props.openIndicator()
        Hepler.post(BASE_URL + GET_CUSTOMER_URL,null,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {
                this.setState({
                    ListData : results.data
                })
                //Alert.alert(results.message)
            } else {
                Alert.alert(results.message)
                this.setState({ListData : []})
            }
        })
    }
    
    _renderListItem = ({ item }) => {
        return (
            <TouchableOpacity style={{width:'90%',alignSelf: 'center' }} 
            onPress={ async()=>{
                // await this.props.setAuditReservPartners(item)
                // this.props.navigation.goBack()
            }}>
                <View style={{ flexDirection: 'row',paddingTop:10,paddingBottom:10}}>
                    <View style={{flex: 0.9}} >
                        <Text >{item.name_customer}</Text>
                    </View>
                    <View style={{flex: 0.1,alignItems: 'center', justifyContent: 'center'}} >
                        <Icon name='chevron-right' size={15} color={primaryColor} style={{textAlign: 'right'}}/>
                    </View>
                </View>
                <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1,}} /> 
            </TouchableOpacity>
        )
    }

    render() {
        const props = this.props
        const filter = this.state.ListData.filter(createFilter(this.state.keySearch, ['name_customer', 'name', 'lastname']))
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
                    <View style={[styles.containerRow,{width: '90%', marginLeft: 10}]}>
                        <Text style={[styles.text20, { color: primaryColor }]}>{`รายชื่อลูกค้า`}</Text>
                    </View>
                    <View style={[styles.hr]}></View>
                    <View style={[styles.containerRow]}>
                        <View style={[styles.shadow, styles.inputWithIcon,styles.containerRow, { flex:1, alignSelf: 'center', backgroundColor: grayColor,justifyContent: 'space-between'}]}>
                            <TextInput
                                ref={(input) => { this.keySearch = input; }}
                                style={{flex:0.9, width: '100%', height: '100%', alignSelf: 'flex-start', color: '#FFF' }}
                                placeholder='ค้นหารายชื่อลูกค้า...'
                                placeholderTextColor = "#FFF"
                                underlineColorAndroid='transparent'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ keySearch: text })}
                                //onSubmitEditing={() => this.idcard.focus()} 
                            />
                            <View style={{flex:0.1}}>
                                <Icon  name='search' size={20} color={'#FFF'} />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, width:'90%',alignSelf: 'center',}} /> 
                    {
                        this.state.ListData.length > 0 ?
                            <FlatList
                                data={filter}
                                extraData={this.state}
                                keyExtractor={(item) => item.partners_id}
                                renderItem={this._renderListItem}
                            />
                        :
                            <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
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
    openIndicator,
    dismissIndicator,
    saveUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen)