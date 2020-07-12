import React from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'
import Image from 'react-native-fast-image'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    KEY_LOGIN
} from '../../utils/contants'

import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'

const DEVICE_WIDTH = Dimensions.get('screen').width
class HomeScreen extends React.Component {


    componentDidMount(){

    }

    render() {

        const props = this.props

        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <View style={[styles.container, { paddingTop: 15 }]}>
                    <View>
                        <Text style={[styles.text18, { paddingLeft: 10 }]}>{`หน้าแรกออดิทจ้าา`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)