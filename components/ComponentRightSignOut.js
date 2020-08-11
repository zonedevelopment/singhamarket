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

import styles from '../style/style'
const DEVICE_WIDTH = Dimensions.get('screen').width


const ComponentRightSignOut = (props) => {
    return (
        <View style={{ padding: 10,alignItems:'center',flex:0.2}}>
            <Icon name='sign-out' size={20} color='white' />
            <Text style={{fontSize:8,color:'white'}}>{'Logout'}</Text>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        reducer: state.fetchReducer
    }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentRightSignOut)
