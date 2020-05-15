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
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'

class ReservationScreen extends React.Component {

    _renderItem = ({ item, index }) => {
        return (
            <View key={item.building_id} style={[styles.container, styles.panelWhite, { height: 170, margin: 5 }]}>
                <View style={[styles.containerRow, { marginBottom: 5 }]}>
                    <Image source={{ uri: item.building_img }} style={{ flex: 0.5, width: 120, height: 100 }} />
                    <View style={{ flex: 0.8, padding: 10 }}>
                        <Text style={[styles.bold, styles.text18, { color: primaryColor }]}>{`${item.building_name}`}</Text>
                        <Text style={[styles.text14, { flexWrap: 'wrap' }]}>{`${item.building_address}`}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.mainButton, styles.center]}
                    onPress={
                        () => this.props.navigation.navigate('Condition')
                    }>
                    <Text style={[styles.text18, { color: '#FFF' }]}>{`จองพื้นที่ร้านค้า`}</Text>
                </TouchableOpacity>
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
            <View style={[styles.center]}>
                <Text style={[styles.text18, { color: 'white'}]}>{`จองพื้นที่`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ padding: 10 }}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.navigate('Home')
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
        const building = props.building

        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <Text style={[styles.text26, { color: 'white' }]}>{`เลือกสถานที่ที่ท่านต้องการ`}</Text>
                    <Text style={[styles.text22, { color: 'white'}]}>{`กรุณาเลือกตึกที่ท่านต้องการไปขายของ`}</Text>
                    <View style={[styles.container]}>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={building}
                            keyExtractor={(item) => item.building_id}
                            renderItem={this._renderItem} />
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen)