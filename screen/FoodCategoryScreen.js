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

import styles from '../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class FoodCategoryScreen extends React.Component {

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { height: 50, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderBottomColor: grayColor }]}>
                <CheckBox
                    title={item.name}
                    checked={item.checked}
                    textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' }} />
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
                <Text style={[styles.text18, { color: 'white' }]}>{`เลือกประเภทอาหาร`}</Text>
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

        const cate = [
            {
                "category_id": "9",
                "type_id": "1",
                "name": "การแฟ ชาไข่มุก ลงเฉพาะ F1 - F5เท่านั้น",
                "checked": false
            },
            {
                "category_id": "10",
                "type_id": "1",
                "name": "อาหาร",
                "checked": false
            },
            {
                "category_id": "11",
                "type_id": "1",
                "name": "ต้ม ทอด นึ่ง ผัด ยำ (มีกลิ่น) ล้อค F6เท่านั้น",
                "checked": false
            },
            {
                "category_id": "12",
                "type_id": "1",
                "name": "อาหารแพค สำเร็จรูป ล้อค E2-E3",
                "checked": false
            },
        ]

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
                    <Text style={[styles.text20, { color: primaryColor }]}>{`เลือกประเภทอาหารที่ต้องการขาย`}</Text>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }]}>
                        <TextInput
                            style={[{ color: 'white' }]}
                            textContentType={{ color: 'white'}}
                            placeholder='ค้นหาประเภทอาหาร...'
                            placeholderTextColor="white" />
                        <Icon name='search' size={16} color='white' />
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={cate}
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

}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCategoryScreen)