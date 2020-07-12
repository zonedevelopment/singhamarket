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
require('moment/locale/th.js');
console.disableYellowBox = true
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import styles from './style/style'
import {
  secondaryColor
} from './utils/contants';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props'

const customTextProps = {
  style: {
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'SinghaEstate-Regular' : 'SinghaEstate-Regular',
  }
};
setCustomText(customTextProps);
setCustomTextInput(customTextProps);


//////// user
import Splashscreen from './screen/SplashScreen'
import Choicescreen from './screen/ChoiceScreen'
import Loginscreen from './screen/LoginScreen'
import Mainscreen from './screen/MainScreen'
import PaymentChannelscreen from './screen/PaymentChannelScreen'
import Registerconditionsreen from './screen/RegisterConditionScreen'
import RegisterPersonscreen from './screen/RegisterPersonScreen'
import RegisterCompanyscreen from './screen/RegisterCompanyScreen'
import Categoryscreen from './screen/CategoryListScreen'
import Productscreen from './screen/ProductListScreen'
import Historydetailscreen from './screen/HistoryDetailScreen'
import NewsDetailsScreen from './screen/NewsDetailsScreen'
import ConfirmReservscreen from './screen/reservation/ConfirmReservScreen'


////////// audit
import AuditMainscreen from './audit/MainScreen'

const Stack = createStackNavigator();
function MyStack({cartItem}) {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splashscreen} />
      <Stack.Screen name="Choice" component={Choicescreen} />
      <Stack.Screen name="Login" component={Loginscreen} />
      <Stack.Screen name="Main" component={Mainscreen} countItem={0} />
      <Stack.Screen name="Paymentchannel" component={PaymentChannelscreen} />
      <Stack.Screen name="Registerperson" component={RegisterPersonscreen} />
      <Stack.Screen name="Registercompany" component={RegisterCompanyscreen} />
      <Stack.Screen name="Registercondition" component={Registerconditionsreen} />
      <Stack.Screen name="Categoryscreen" component={Categoryscreen} />
      <Stack.Screen name="Productlist" component={Productscreen} />
      <Stack.Screen name="Historydetail" component={Historydetailscreen} />
      <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      <Stack.Screen name="ConfirmReserv" component={ConfirmReservscreen} />

      <Stack.Screen name="AuditMain" component={AuditMainscreen}/>

    </Stack.Navigator>
  );
}

class App extends React.Component {

  render() {

    const props = this.props.reducer

    return (
      <NavigationContainer>
        <MyStack cartItem={props.mycart.length} />
        {
          props.indicator ?
            <View style={[styles.loadingIndicator]}>
              <ActivityIndicator color={secondaryColor} />
            </View>
            :
            null
        }
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