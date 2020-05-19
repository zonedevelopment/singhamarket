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
import { CheckBox } from 'react-native-elements'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    emptyColor
} from '../../utils/contants'

import styles from '../../style/style'

class CartScreen extends React.Component {

    _renderItem = () => {
        return (
            <View>
                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flex: 0.7 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <CheckBox
                                title={`เลือก`}
                                checked={false}
                                textStyle={[styles.text14, { fontFamily: 'SinghaEstate-Regular', color: primaryColor }]}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', margin: -8, marginRight: -10, marginLeft: -10 }} />
                            <Text style={[styles.text12, { color: 'red' }]}>{`เหลือเวลาในการจอง 09:00 นาที`}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <View style={[styles.containerRow, { justifyContent: 'flex-end' }]}>
                            <TouchableOpacity>
                                <Text style={[styles.text16]}>{`แก้ไข`}</Text>
                            </TouchableOpacity>
                            <View style={{ width: 1, backgroundColor: grayColor, margin: 4 }}></View>
                            <TouchableOpacity>
                                <Text style={[styles.text16]}>{`ลบ`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.containerRow]}>
                    <View style={{ flex: 0.15 }}>
                        <View style={[styles.center, { width: 40, height: 40, backgroundColor: emptyColor, borderRadius: 10 }]}>
                            <Text style={[styles.text16, styles.bold]}>{`C01`}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text16]}>{`วันที่ขาย 27 มี.ค.`}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14]}>{`ค่าบริการพื้นที่`}</Text>
                            <Text style={[styles.text14]}>{`500 บาท`}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14, { flex: 1 }]}>{`ไฟฟ้าและแสงสว่าง`}</Text>
                            <View style={[styles.containerRow, { flex: 0.55, justifyContent: 'space-around', alignItems: 'center' }]}>
                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                                    <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 6, marginRight: 6, textAlignVertical: 'center' }}>{`0`}</Text>
                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                                    <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text14, { flex: 0.5, textAlign: 'right' }]}>{`500 บาท`}</Text>
                        </View>
                        <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[styles.text14, { flex: 1 }]}>{`ไฟฟ้าไม่เกิน 8,000 วัตต์`}</Text>
                            <View style={[styles.containerRow, { flex: 0.55, justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }]}>
                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                                    <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 6, marginRight: 6, textAlignVertical: 'center' }}>{`0`}</Text>
                                <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                                    <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text14, { flex: 0.5, textAlign: 'right' }]}>{`500 บาท`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    ComponentLeft = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`ตะกร้าสินค้า`}</Text>
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
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <ScrollView>
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <View style={[styles.container, { backgroundColor: secondaryColor, borderRadius: 8, height: 80, justifyContent: 'center', paddingLeft: 10 }]}>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`SINGHA COMPLEX 1`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`FLOOR 1 / ZONE A`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`ประเภทสินค้าที่ขาย`}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{` : `}</Text>
                                    <Text style={[styles.text14, styles.bold, { color: 'white' }]}>{`อาหารญี่ปุ่น`}</Text>
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            {
                                this._renderItem()
                            }
                            <View style={[styles.hr]}></View>
                            <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[styles.text16, { textAlign: 'center' }]}>{`โค้ดส่วนลด`}</Text>
                                <View style={[styles.shadow, styles.inputWithIcon, { width: '70%' }]}>
                                    <TextInput
                                        ref={(input) => { this.username = input; }}
                                        style={{ width: '100%', height: '100%', alignSelf: 'flex-start', color: 'black' }}
                                        placeholder='Enter code..'
                                        returnKeyType={'next'}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => null}
                                        onSubmitEditing={() => null} />
                                </View>
                            </View>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.container]}>
                                <Text style={[styles.text16, styles.bold]}>{`ยอดชำระทั้งหมด`}</Text>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`ค่าบริการพื้นที่ x 2`}</Text>
                                    <Text style={[styles.text16]}>{`2,000 บาท`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`โค้ดส่วนลด`}</Text>
                                    <Text style={[styles.text16]}>{`200 บาท`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`ค่าบริการเสริม`}</Text>
                                    <Text style={[styles.text16]}>{`3,600 บาท`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16]}>{`นิติบุคคลหัก ณ ที่จ่าย 3 %`}</Text>
                                    <Text style={[styles.text16]}>{`100 บาท`}</Text>
                                </View>
                                <View style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', padding: 5 }]}>
                                    <Text style={[styles.text16, styles.bold]}>{`ยอดรวมที่ต้องชำระ (รวม Vat)`}</Text>
                                    <Text style={[styles.text16, styles.bold]}>{`5,500 บาท`}</Text>
                                </View>
                                <View style={[styles.container, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                    <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: secondaryColor }]}
                                        onPress={
                                            () => null
                                        }>
                                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ดำเนินการต่อ`}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)