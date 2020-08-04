/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import configureStore from './utils/configureStore'
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

const store = configureStore()

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <Provider store={store}>
            <App />
        </Provider>;
  }

// const ReduxApp = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

AppRegistry.registerComponent(appName, () => HeadlessCheck);
