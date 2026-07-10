import React from 'react'
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button'

import IOSBackButtonOverlay from './IOSBackButtonOverlay'
import styles from '../style/style'
import { grayColor, primaryColor, secondaryColor } from '../utils/contants'

const IOSRegistrationForm = ({
    accountTypeLabel,
    productTypes,
    selectedProducts,
    username,
    password,
    passwordHint,
    onBack,
    onUsernameChange,
    onUsernameBlur,
    onPasswordChange,
    passwordRef,
    onSelectProductType,
    onOpenProductCategories,
    onSubmit,
    onLogin,
}) => (
    <SafeAreaView style={[styles.container, styles.formPageBackground]}>
        <IOSBackButtonOverlay onPress={onBack} />
        <View style={[styles.container, { alignItems: 'center', paddingTop: 20 }]}> 
            <Text style={styles.formHeaderTitle}>{`สมัครสมาชิก`}</Text>
            <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
            <ScrollView
                style={[styles.panelWhite, styles.registerPanelShadow]}
                contentContainerStyle={{ padding: 8, paddingBottom: 30 }}
                keyboardShouldPersistTaps='handled'>
                <Text style={[styles.text20, { color: primaryColor, margin: 10 }]}>{accountTypeLabel}</Text>

                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}> 
                    <TextInput
                        style={{ width: '100%', height: '100%', color: primaryColor }}
                        placeholder='Username'
                        placeholderTextColor='#7C7B7B'
                        autoCapitalize='none'
                        value={username}
                        returnKeyType='next'
                        onBlur={onUsernameBlur}
                        onChangeText={onUsernameChange}
                    />
                </View>
                <View style={[styles.registerFieldShadow, styles.inputWithIcon, { alignSelf: 'center' }]}> 
                    <TextInput
                        ref={passwordRef}
                        style={{ width: '100%', height: '100%', color: primaryColor }}
                        placeholder='Password'
                        placeholderTextColor='#7C7B7B'
                        autoCapitalize='none'
                        secureTextEntry
                        value={password}
                        returnKeyType='done'
                        onChangeText={onPasswordChange}
                    />
                </View>
                <Text style={[styles.text12, styles.regular, { width: '95%', alignSelf: 'center', color: '#7C7B7B', paddingHorizontal: 15 }]}> 
                    {passwordHint}
                </Text>

                <Text style={[styles.text18, { color: primaryColor, margin: 10 }]}>{`กำหนดประเภทสินค้าที่จะนำมาขาย`}</Text>
                {productTypes.length > 0 ? (
                    <RadioGroup
                        size={20}
                        thickness={2}
                        color={primaryColor}
                        style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                        highlightColor='transparent'
                        onSelect={onSelectProductType}>
                        {productTypes.map((item, index) => (
                            <RadioButton
                                key={item.TypeID || `product-type-${index}`}
                                value={item.TypeID}
                                color={primaryColor}
                                style={{ alignItems: 'center', flex: 0.5, marginRight: 25 }}>
                                <Text style={[styles.text16, { color: primaryColor }]}>{item.TypeName}</Text>
                            </RadioButton>
                        ))}
                    </RadioGroup>
                ) : (
                    <Text style={[styles.text16, { color: primaryColor, textAlign: 'center' }]}>{`ไม่พบข้อมูลประเภทสินค้า`}</Text>
                )}

                <Text style={[styles.text18, { color: primaryColor, margin: 10 }]}>{`กำหนดหมวดหมู่สินค้าที่ต้องการขาย`}</Text>
                <TouchableOpacity
                    style={[styles.mainButton2, styles.containerRow, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }]}
                    onPress={onOpenProductCategories}>
                    <Text style={{ color: 'white' }}>{`เลือกหมวดหมู่สินค้า`}</Text>
                    <Icon name='chevron-right' size={12} color='white' />
                </TouchableOpacity>
                <View style={{ margin: 10 }}>
                    <Text style={[styles.text16, { color: primaryColor }]}>{`สินค้าที่เลือก`}</Text>
                    {selectedProducts.length > 0
                        ? selectedProducts.map((item, index) => (
                            <Text key={item.product_id || index} style={styles.text14}>{`${index + 1}. ${item.product_name}`}</Text>
                        ))
                        : <Text style={styles.text14}>{`-`}</Text>}
                </View>

                <TouchableOpacity style={[styles.mainButton, styles.center]} onPress={onSubmit}>
                    <Text style={[styles.text18, { color: 'white' }]}>{`ยืนยัน`}</Text>
                </TouchableOpacity>
                <Text style={[styles.text14, { textAlign: 'center', marginTop: 20 }]}>{`ถ้าท่านเป็นสมาชิกอยู่ กรุณาเข้าสู่ระบบ`}</Text>
                <TouchableOpacity style={[styles.mainButton, styles.center, { backgroundColor: grayColor }]} onPress={onLogin}>
                    <Text style={[styles.text18, { color: 'white' }]}>{`เข้าสู่ระบบ`}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </SafeAreaView>
)

export default IOSRegistrationForm
