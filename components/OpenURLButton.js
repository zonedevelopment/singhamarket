import React, { useCallback } from "react";
import { Alert, TouchableOpacity, Linking, StyleSheet, View ,Text} from "react-native";
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
} from '../utils/contants'
import styles from '../style/style'
 
const OpenURLButton = ({ url, children,fontSize }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <TouchableOpacity onPress={handlePress} >
        <Text style={{color:primaryColor,fontSize:fontSize,textDecorationLine: 'underline'}}>{children}</Text>
    </TouchableOpacity>;
};
export default OpenURLButton