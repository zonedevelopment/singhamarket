import PushNotification from 'react-native-push-notification'
import PushNotificaionIOS from '@react-native-community/push-notification-ios'
import {Platform, PushNotificationIOS} from 'react-native'

class LocalNotificaionService {
    configuere = (onOpenNotification) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister : function (token) {
                console.log('[LocalNotificaionService] onRegister',token)
            },
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification : function (notification) {
                console.log('[LocalNotificaionService] onNotification',notification)
                if(!notification?.data){
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data)

                if(Platform.OS === 'ios'){
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },
            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
              console.log("ACTION:", notification.action);
              console.log("NOTIFICATION:", notification);
          
              // process the action
            },
            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
              console.error(err.message, err);
            }, // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
          
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
          
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotificaion = (id,title,message,data = {},option = {}) => {
        PushNotification.localNotification({
            /// Android Only Propoties
            ...this.buildAndroidNotification(id,title,message,data,option),
            /// IOS Only Propoties
            //...this.buildIOSNotificaion(id,title,message,data,option),
             /// IOS and Android  Propoties
            title : title || '',
            message : message || '',
            playSound : option.playSound || false,
            soundName : option.soundName || 'default',
            userInteraction : false,
        })

    }

    buildAndroidNotification = (id,title,message,data = {},option = {}) => {
        return {
            id : id,
            autoCancel : true,
            largeIcon: option.largeIcon || "ic_launcher",
            smallIcon: option.smallIcon || "ic_notification",
            bigText: message || '', // (optional) default: "message" prop
            subText: title || '',
            vibrate: option.vibrate || true, // (optional) default: true
            vibration: option.vibration || 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            priority: option.priority || "high", // (optional) set notification priority, default: high
            importance: option.importance ||  "high",
            data : data,
        }
    }

    buildIOSNotification = (id,title,message,data = {},option = {}) => {
        return {
            alertAction: option.alertAction || "view", // (optional) default: view
            category: option.category || "", // (optional) default: empty string
            userInfo : {
                id : id,
                item : data
            }
        }
    }

    cancelAllLocalNotification = () => {
        if(Platform.OS === 'ios'){
            PushNotificaionIOS.removeAllDeliveredNotifications()
        }else{
            PushNotification.cancelAllLocalNotifications()
        }
    }

    removeDeliveredNotification = (notificationId) => {
        console.log('[LocalNotificaionService] removeDeliveredNotification',notificationId)
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }

}

export const localNotificationService = new LocalNotificaionService()