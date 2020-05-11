import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'

import {
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

class SplashScreen extends React.Component {

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
  
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)