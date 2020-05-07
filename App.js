/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  YellowBox,
  Platform,
  ActivityIndicator
} from 'react-native';
console.disableYellowBox = true
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import styles from './style/style'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props'

const customTextProps = {
  style: {
    fontSize: 22,
    fontFamily: Platform.OS == 'android' ? 'DBYord' : 'DB Yord X',
  }
};
setCustomText(customTextProps);
setCustomTextInput(customTextProps);

import Splashscreen from './screen/SplashScreen'

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splashscreen} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({
  reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)