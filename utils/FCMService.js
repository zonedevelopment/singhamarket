import messaging from '@react-native-firebase/messaging'
import {Platform} from 'react-native'

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
}

export const fcmService = new FCMService()