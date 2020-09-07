/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect }from 'react';
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
import Orientation from 'react-native-orientation-locker';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import styles from './style/style'
import {
secondaryColor, primaryColor
} from './utils/contants';

import {
    setCustomView,
    setCustomTextInput,
    setCustomText,
    setCustomImage,
    setCustomTouchableOpacity,
} from 'react-native-global-props'

import {
  setToken
} from './actions'

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
import Paymentdirectpayscreen from './screen/PaymentDirectPayScreen'


////////// audit
import AuditMainscreen from './audit/MainScreen'

////////// audit
import AdminMainscreen from './admin/MainScreen'


import { fcmService} from './utils/FCMService'
import {localNotificationService} from './utils/LocalNotificaionService'

const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator
        headerMode='none'
        initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splashscreen} />
        <Stack.Screen name="Choice" component={Choicescreen} />
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="Main" component={Mainscreen}  />
        <Stack.Screen name="Registerperson" component={RegisterPersonscreen} />
        <Stack.Screen name="Registercompany" component={RegisterCompanyscreen} />
        <Stack.Screen name="Registercondition" component={Registerconditionsreen} />
        <Stack.Screen name="Categoryscreen" component={Categoryscreen} />
        <Stack.Screen name="Productlist" component={Productscreen} />
        <Stack.Screen name="Historydetail" component={Historydetailscreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />

        <Stack.Screen name="ConfirmReserv" component={ConfirmReservscreen} />
        <Stack.Screen name="PaymentDirect" component={Paymentdirectpayscreen} />
        <Stack.Screen name="Paymentchannel" component={PaymentChannelscreen} />


        <Stack.Screen name="AuditMain" component={AuditMainscreen}/>
        <Stack.Screen name="AdminMain" component={AdminMainscreen}/>
        </Stack.Navigator>
    );
}

const navigationRef = React.createRef();

class App extends React.Component {
 
    componentDidMount() {
        Orientation.lockToPortrait();
        const props = this.props
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister,onNotificaion,onOpenNotification)
        localNotificationService.configuere(onOpenNotification)

        function onRegister (token) {
            console.log('[App] onRegister',token)
            props.setToken(token)
            fcmService.UpdateToken(token)
        }

        function onNotificaion (notify) {
            console.log('[App] onNotificaion',notify)
            console.log('[App] clickAction ',notify.android.clickAction)
            const option = {
                soundName : 'default',
                playSound : true,
            }
            localNotificationService.showNotificaion(
                0,
                notify.title,
                notify.body,
                notify,
                option
            )
            
            let action = notify.android.clickAction
            if(action != ""){ //// navigation in app
                navigationRef.current && navigationRef.current.navigate(action, { ActionType : 'Notification' });
            }
        }

        function onOpenNotification (notify){
            console.log('[App] onOpenNotification',notify)
            //alert('Open Notification : ' + notify.body)
        }

        return () => {
            console.log('[APP] unregister')
            fcmService.unRegister()
            localNotificationService.unregister()
        }
    } 


    render() {
        const props = this.props.reducer
        return (
        <NavigationContainer ref={navigationRef}>
            <MyStack />
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
    setToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App)