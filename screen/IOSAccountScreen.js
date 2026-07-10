import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import styles from '../style/style'
import { grayColor, primaryColor, secondaryColor } from '../utils/contants'
import ProfileScreen from './tabs/ProfileScreen'

const IOSAccountScreen = (props) => {
    const userInfo = props.reducer.userInfo || {}

    if (userInfo.partners_id) {
        return <ProfileScreen {...props} />
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: primaryColor }]}> 
            <View style={[styles.container, styles.center, { paddingHorizontal: 20 }]}> 
                <Text style={[styles.bold, { color: secondaryColor, fontSize: 40, marginBottom: 30 }]}>{`SUN PLAZA`}</Text>
                <View style={[styles.panelWhite, styles.registerPanelShadow, { paddingVertical: 30 }]}> 
                    <Text style={[styles.text22, { color: primaryColor, textAlign: 'center', marginBottom: 20 }]}>{`บัญชี`}</Text>
                    <TouchableOpacity
                        style={[styles.mainButton, styles.center]}
                        onPress={() => props.navigation.navigate('Login')}>
                        <Text style={[styles.text18, { color: 'white' }]}>{`เข้าสู่ระบบ`}</Text>
                    </TouchableOpacity>
                    <View style={styles.marginBetweenVertical} />
                    <TouchableOpacity
                        style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]}
                        onPress={() => props.navigation.navigate('Registercondition')}>
                        <Text style={[styles.text18, { color: 'white' }]}>{`สมัครสมาชิก`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({ reducer: state.fetchReducer })

export default connect(mapStateToProps)(IOSAccountScreen)
