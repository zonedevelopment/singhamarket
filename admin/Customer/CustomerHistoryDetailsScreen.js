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
import { Picker } from "native-base"
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    PRODUCT_CATEGORY_URL,
    HEADERFORMDATA
} from '../../utils/contants'

import styles from '../../style/style'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
class CustomerHistoryDetailsScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        data : [],
        service : [],
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

    async componentDidMount() {
        // const { data,service } = this.props.route.params
        // await this.setState({ data : data,service:service })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const props = this.props.reducer
        const { Details } = this.props.route.params
        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 60 }]}>
                <View style={[styles.container, { padding: 10 }]}>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <Text style={[styles.text20, { color: primaryColor }]}>{`วันที่ขายของ ` + moment(Details.booking_detail_date).format('LL')}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.hr]}></View>
                    <View style={[styles.containerRow, { alignItems: 'center', justifyContent: 'space-between', padding: 10 }]}>
                        <View style={[styles.containerRow]}>
                            <View style={{ flex: 0.2 }}>
                                <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                                    <Text style={[styles.text16, styles.bold,{textAlign:'center'}]}>{Details.booth_name}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={[styles.text14]}>{`สถานที่ ` + Details.name_market}</Text>
                                <Text style={[styles.text14]}>{`บูธ ` + Details.booth_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`รายการสินค้าที่ขาย`}</Text>
                        {/* <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ขนมไทย,ขนมหวาน`}  */}
                        {
                            Details.list_product.map((v, i) => {
                                return (
                                    <Text style={[styles.text16, { paddingLeft: 5 }]}>{`- `+ v.product_name}</Text>
                                )
                            })
                        }
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={[styles.text16, styles.bold]}>{`บริการเสริม`}</Text>
                        {
                            Details.accessoires.map((v, i) => {
                                return (<Text style={[styles.text16, { paddingLeft: 5 }]}>{`- ` + v.service_name}</Text>)
                            })
                        }
                    </View>
                </View>
                {/* <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', padding: 10 }}>
                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => this.handleBack()
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ย้อนกลับ`}</Text>
                    </TouchableOpacity>
                </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHistoryDetailsScreen)