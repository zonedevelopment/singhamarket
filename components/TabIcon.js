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

import ic_home_active from '../assets/image/icon_home_gold.png'
import ic_store_active from '../assets/image/icon_market_gold.png'
import ic_cart_active from '../assets/image/icon_cart_gold.png'
import ic_bell_active from '../assets/image/icon_noti_gold.png'
import ic_profile_active from '../assets/image/icon_user_gold.png'

import ic_home_inactive from '../assets/image/icon_home.png'
import ic_store_inactive from '../assets/image/icon_market.png'
import ic_cart_inactive from '../assets/image/icon_cart.png'
import ic_bell_inactive from '../assets/image/icon_noti.png'
import ic_profile_inactive from '../assets/image/icon_user.png'

const { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('screen').width


const TabIcon = (props) => {
    let ItemCount = 0//props.reducer.UserItemCartCount
    let IconActive = ic_home_active
    let IconInActive = ic_home_inactive

    if(props.Role == 'User'){
        switch(props.Controller) {
            case 'Home':
                ItemCount = 0
                IconActive = ic_home_active
                IconInActive = ic_home_inactive
                break;
            case 'Reserv':
                ItemCount = 0
                IconActive = ic_store_active
                IconInActive = ic_store_inactive
                break;
            case 'Cart':
                ItemCount = props.reducer.UserItemCartCount
                IconActive = ic_cart_active
                IconInActive = ic_cart_inactive
                break;
            case 'Noti':
                ItemCount = props.reducer.UserItemNotifyCount
                IconActive = ic_bell_active
                IconInActive = ic_bell_inactive
                break;
            case 'Profile':
                ItemCount = 0
                IconActive = ic_profile_active
                IconInActive = ic_profile_inactive
                break;
        }
    }

    return (
        <View>
            {
                props.focused ?
                    <Image source={IconActive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                    :
                    <Image source={IconInActive} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
            }
            {
                ItemCount > 0 ?
                <View style={[styles.center, { position: 'absolute', top: -2, right: -10, width: 18, height: 18, borderRadius: 10, backgroundColor: redColor }]}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{ItemCount}</Text>
                </View>
                :
                null
            }
          
        </View>
    )
}

const mapStateToProps = state => {
    return {
        reducer: state.fetchReducer
    }
}

export default connect(mapStateToProps, null)(TabIcon)
