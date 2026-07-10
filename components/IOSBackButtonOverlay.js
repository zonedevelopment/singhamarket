import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import DeviceInfo from 'react-native-device-info'

const IOS_BASE_TOP_OFFSET = DeviceInfo.hasNotch() ? 52 : 14

const IOSBackButtonOverlay = ({ onPress, top }) => {
    if (Platform.OS !== 'ios') {
        return null
    }

    return (
        <View pointerEvents='box-none' style={[styles.container, { top: typeof top === 'number' ? top : IOS_BASE_TOP_OFFSET }]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Icon name='chevron-left' size={18} color='white' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        left: 12,
        position: 'absolute',
        zIndex: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgba(10, 32, 62, 0.72)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
})

export default IOSBackButtonOverlay
