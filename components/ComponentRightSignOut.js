import React from 'react'
import {
    View,
    Text,
    //Image,
    FlatList,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Image from 'react-native-fast-image'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    redColor
} from '../utils/contants'
import StorageServies from '../utils/StorageServies'
import {
    openIndicator,
    dismissIndicator,
    saveUserInfo
} from '../actions'
import Hepler from '../utils/Helper'
import styles from '../style/style'
const DEVICE_WIDTH = Dimensions.get('screen').width


const ComponentRightSignOut = (props) => {
    return (
        <TouchableOpacity style={{padding: 10,alignItems:'center'}} onPress={ async () => {
                await StorageServies.clear()
                await this.props.saveUserInfo([])
                props.navigation.navigate('Choice')
            }} >
            <Icon name='sign-out' size={20} color='white' />
            <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = state => {
    return {
        reducer: state.fetchReducer
    }
}

const mapDispatchToProps = {
    openIndicator,
    dismissIndicator,
    saveUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentRightSignOut)
