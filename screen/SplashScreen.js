import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../style/style'

import {
    primaryColor,
    secondaryColor,
    BASE_URL,
    BANNER_URL,
    NEWS_URL,
    HEADERFORMDATA,
} from '../utils/contants'

import Hepler from '../utils/Helper'
import {
    setStateBanner
} from '../actions'


class SplashScreen extends React.Component {


    // LoadBanner = () => {
    //     Hepler.post(BASE_URL + BANNER_URL,null,HEADERFORMDATA, (results) =>{
    //         console.log('BANNER_URL',results)
    //         if(results.state == 'SUCCESS'){
    //             this.props.setStateBanner(results.data)
    //         }else{
    //             this.props.setStateBanner([])
    //         }
    //     })
    // }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('Choice')
        }, 2500)
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
    setStateBanner
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)