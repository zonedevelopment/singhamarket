import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'

class SplashScreen extends React.Component {
    render() {
        return(
            <View>
                <Text>SplashScreen</Text>
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