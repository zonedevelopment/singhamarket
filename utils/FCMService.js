import messaging from '@react-native-firebase/messaging'
import {Platform} from 'react-native'
import Helper from './Helper'
import {BASE_URL,HEADERFORMDATA,RegisterFCMToken,KEY_LOGIN } from './contants'
import StorageServies from './StorageServies'
class FCMService {
    register = (onRegister,onNotificaion,onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListener(onRegister,onNotificaion,onOpenNotification)

    }

    registerAppWithFCM = async() => {
        if(Platform.OS === 'ios'){
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
        
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission().then(enabled =>{
            if(enabled){
                this.getToken(onRegister)
            }else{
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.log('[FCM Service] Permission Reject',error)
        })
    }

    getToken = (onRegister) => {
        messaging().getToken().then(fcmToken => {
            if(fcmToken){
                onRegister(fcmToken)
            }else{
                console.log('User does not have device token')
            }
        }).catch(error => {
            console.log('[FCM Service] getToken Reject',error)
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission().then(()=>{
            this.getToken(onRegister)
        }).catch(error => {
            console.log('[FCM Service] Request Permission Reject',error)
        })
    }

    deleteToken = () => {
        console.log('[FCM Service] DeleteToken ')
        messaging().deleteToken().catch(error => {
            console.log('[FCM Service] Delete Token Reject',error)
        })
    }

 
    createNotificationListener = (onRegister,onNotificaion,onOpenNotification) => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('[FCMService] onNotificationOpenedApp Notification cause app to open')
            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        })

        messaging().getInitialNotification().then(remoteMessage => {
            console.log('[FCMService] getInitialNotification Notification cause app to open')
            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        })

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('[FCMService] setBackgroundMessageHandler Message handled in the background!', remoteMessage);
        });
  

        this.messageListener = messaging().onMessage( async remoteMessage => {
            console.log('[FCMService] New FCM Message arrived',remoteMessage)
            if(remoteMessage){
                let notification = null
                if(Platform.OS === 'ios'){
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotificaion(notification)

            }
        })

        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCMService] A New Token Refresh',fcmToken)
            onRegister(fcmToken)
        })

    }

    unRegister = () => {
        this.messageListener()
    }


    UpdateToken = async (token) => {
        let LOGIN = await StorageServies.get(KEY_LOGIN)
        if(LOGIN != null){
            LOGIN = JSON.parse(LOGIN)
            let formData = new FormData();
            formData.append('token', token)
            formData.append('partners_id', LOGIN.partners_id)
            Helper.post(BASE_URL + RegisterFCMToken,formData,HEADERFORMDATA,(results) => {
                console.log('RegisterFCMToken',results)
            })
        }
    }
}

export const fcmService = new FCMService()