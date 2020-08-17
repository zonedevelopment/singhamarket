import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
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

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import {setStatePreviousScreen} from '../../actions'
import styles from '../../style/style'

const DEVICE_HEIGHT = Dimensions.get('screen').height
class DaySelectedScreen extends React.Component {

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10, marginRight: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }} >
                    {`วันที่ขาย ${moment(item.date).format('LL')}`}
                </Text>
                <TouchableOpacity disabled={false}
                    style={[styles.mainButton2, styles.containerRow, {justifyContent: 'space-between', alignItems: 'center', padding: 5}]}
                    onPress={
                        async () => {
                            await this.props.setStatePreviousScreen('DaySelected')
                            this.props.navigation.navigate('ReservBoothAudit', {
                                day: item.date,
                                ActionType : 'Only',
                            })
                        }
                    }>
                    <Text style={{ color: 'white' }}>{`${item.boothSelectName == '' ? 'เลือกล็อคขายของ' : item.boothSelectName}`}</Text>
                    <Icon name='chevron-right' size={12} color='white' />
                </TouchableOpacity>
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
                <Text style={[styles.text18, { color: 'white' }]}>{`สรุปรายการเลือกบูธ`}</Text>
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
        const daySelect = props.audit_reserv_date

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
                <View style={[styles.container, { padding: 15 }]}>
                    <View style={[styles.containerRow,{marginLeft : 10}]}>
                        <Text style={[styles.text18, styles.bold, { flex: 1, color: primaryColor }]}>{`จำนวนวันที่ท่านจองทั้งหมด ` + daySelect.length + ' วัน'}</Text>
                    </View>
                    <View style={[styles.marginBetweenVertical]}></View>
                
                    <FlatList
                        data={daySelect}
                        numColumns={1}
                        keyExtractor={(item) => item}
                        renderItem={this._renderItem} />
                </View>
                <View style={[styles.positionBottom, styles.center, { padding: 10, bottom: 10, alignSelf: 'center' }]}>
                    <TouchableOpacity style={[styles.mainButton, styles.center]}
                        onPress={
                            async () => {
                                let validation = true
                                daySelect.map((v,i)=>{
                                    if(v.boothSelectID == ''){
                                        validation = false
                                    }
                                })
                                if(validation == false){
                                    await Alert.alert(
                                        'คำเตือน!',
                                        'กรุณาเลือกบูธที่ต้องการขายของให้ครบ!'
                                    );
                                }else{
                                    this.props.navigation.navigate('ReservAccessoriesAudit')
                                }
                            }
                        }>
                        <Text style={[styles.text18, { color: 'white' }]}>{`ขั้นตอนต่อไป`}</Text>
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
    setStatePreviousScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(DaySelectedScreen)