import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'

import ic_image from '../../assets/image/icon_photo.png'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class AccessoriesScreen extends React.Component {

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.containerRow, { padding: 5, height: 55, borderWidth: 0.5, borderColor: grayColor, marginLeft: 5, marginRight: 5 }]}>
                <View style={{ flex: 0.6, backgroundColor: 'white', justifyContent: 'center', padding: 5 }}>
                    <Text style={[styles.text14, { color: primaryColor }]}>{`${item.name}`}</Text>
                    <Text style={[styles.text12, { color: primaryColor }]}>{`${item.description}`}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: grayColor }}></View>
                <View style={{ flex: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                            <Text style={[styles.text14, { color: 'white' }]}>{`-`}</Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 8, marginRight: 8, textAlignVertical: 'center' }}>{`${item.selected}`}</Text>
                        <TouchableOpacity style={[styles.center, { width: 20, height: 20, backgroundColor: grayColor, borderRadius: 4 }]}>
                            <Text style={[styles.text14, { color: 'white' }]}>{`+`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: 1, backgroundColor: grayColor }}></View>
                <View style={{ flex: 0.25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={[styles.text14, { color: primaryColor }]}>{`${item.price}`}</Text>
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
                <Text style={[styles.text18, { color: 'white' }]}>{`อุปกรณ์เสริม`}</Text>
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
                    <View>
                        <Text style={[styles.text18, styles.bold, { paddingLeft: 10 }]}>{`อุปกรณ์เสริม`}</Text>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#f3f3f3', borderWidth: 0.5, borderColor: 'gray', borderRadius: 4 }}>
                        <View>
                            <Text style={[styles.text14, { paddingLeft: 10 }]}>{`อุปกรณ์เสริมมาตรฐาน`}</Text>
                            {
                                props.standardAccessories.map((v, i) => {
                                    let no = i + 1
                                    return (
                                        <View key={i} style={[styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, margin: 2 }]}>
                                            <Text style={[styles.text14]}>{`${no}. ${v.name}`}</Text>
                                            {
                                                v.image != '' ?
                                                    <Image source={{ uri: v.image }} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={ic_image} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View style={[styles.marginBetweenVertical]}></View>
                    <View>
                        <Text style={[styles.text18, styles.bold, { paddingLeft: 10 }]}>{`บริการเสริม`}</Text>
                    </View>
                    <View style={[styles.containerRow, { padding: 5, height: 55 }]}>
                        <View style={{ flex: 0.6, backgroundColor: primaryColor, justifyContent: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`รายการ`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.3, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text16, { color: 'white' }]}>{`จำนวน/ชุด`}</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: 'white' }}></View>
                        <View style={{ flex: 0.25, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={[styles.text14, { color: 'white' }]}>{`ราคา/บาท`}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={props.otherService}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderItem} />
                    <View>
                        <Text style={[styles.text12, styles.bold, { paddingLeft: 10 }]}>{`หมายเหตุ หากตรวจพบหน้างาน แล้วไม่ตรงตามที่ท่านระบุไว้\nคิดค่าปรับ 500 บาท + ค่าบริการจริง`}</Text>
                    </View>
                </View>
                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                        onPress={
                            () => null
                        }>
                        <Text style={[styles.text14, { color: '#FFF' }]}>{`ไม่รับบริการเสริม`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => this.props.navigation.navigate('Summary')
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`ตกลง`}</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesScreen)