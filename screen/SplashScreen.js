import React from 'react'
import {
    View,
    Text,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../style/style'

import {
    primaryColor,
    secondaryColor,
    KEY_LOGIN,
    BASE_URL,
    LOGIN_URL,
    BANNER_URL,
    NEWS_URL,
    HEADERFORMDATA,
    GET_CART_URL,
} from '../utils/contants'

import Hepler from '../utils/Helper'
import StorageServies from '../utils/StorageServies'
import {
    setStateBanner,
    saveUserInfo,
    setStateNews,
    setStateMyCart
} from '../actions'


class SplashScreen extends React.Component {
 
    async componentDidMount() {

        await Hepler.post(BASE_URL + BANNER_URL,null,HEADERFORMDATA, (results) =>{
            console.log('BANNER_URL',results)
            if(results.status == 'SUCCESS'){
                this.props.setStateBanner(results.data)
            }else{
                this.props.setStateBanner([])
            }
        })

        await Hepler.post(BASE_URL + NEWS_URL,null,HEADERFORMDATA, (results) =>{
            console.log('NEWS_URL',results)
            if(results.status == 'SUCCESS'){
                this.props.setStateNews(results.data)
            }else{
                this.props.setStateNews([])
            }
        })

        //// check Login
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        if(LOGIN != null){
            LOGIN = JSON.parse(LOGIN)
            let formData = new FormData();
            formData.append('USERNAME', LOGIN.username)
            formData.append('PASSWORD', LOGIN.password_text)
            Hepler.post(BASE_URL + LOGIN_URL,formData,HEADERFORMDATA,(results) => {
                console.log('LOGIN_URL',results)
                if (results.status == 'SUCCESS') {
                    StorageServies.set(KEY_LOGIN,JSON.stringify(results.data))
                    this.props.saveUserInfo(results.data)
                    this.GetMyCart(results.data.partners_id)
                   
                } else {
                    Alert.alert(results.message)
                }
            })
        }else{
            this.props.navigation.replace('Choice')
        }
        // setTimeout(() => {
        //     this.props.navigation.replace('Choice')
        // }, 2500)
    }


    GetMyCart (partners_id) {
        let formData = new FormData();
        formData.append('partners_id',partners_id)
        Hepler.post(BASE_URL + GET_CART_URL,formData,HEADERFORMDATA,(results) => {
            console.log('GET_CART_URL',results)
            if (results.status == 'SUCCESS') {
                this.props.setStateMyCart(results.data)
                this.props.navigation.navigate('Main')
            } else {
                this.props.setStateMyCart([])
                this.props.navigation.navigate('Main')
                Alert.alert(results.message)
            }
        })
    }


    render() {
        return(
            <View style={[styles.container, styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 55 }]}>{`SUN PLAZA`}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
  })
  
  const mapDispatchToProps = {
    setStateBanner,
    setStateNews,
    saveUserInfo,
    setStateMyCart
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)