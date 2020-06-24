import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { CheckBox } from 'react-native-elements'
import {
    darkColor,
    grayColor,
    emptyColor,
    primaryColor,
    secondaryColor,
    redColor
} from '../../utils/contants'

import styles from '../../style/style'
import {
    openIndicator,
    dismissIndicator,
    saveProductType
} from '../../actions'
import Hepler from '../../utils/Helper'


class ProfileCompanyScreen extends React.Component {

    state = {
        privacyAgree : false,
    }

    ComponentLeft = () => {
        return (
            <TouchableOpacity onPress={() => this.handleBack()} style={{ padding: 10 }}>
                <Icon name='chevron-left' size={20} color='white' />
            </TouchableOpacity>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อมูลนิติบุคคล`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const props = this.props.reducer
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={[styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }]}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={[styles.container, { padding: 10 }]}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
                        keyboardShouldPersistTaps="always">
                        <View /* style={[styles.panelWhite]}*/>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลนิติบุคคล`}</Text>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' ,backgroundColor:'#eee'}]}>
                                <Text style={[styles.text16, {color: primaryColor}]}>{'ชื่อนิติบุคคล : ' + props.userInfo.name_customer}</Text>
                            </View>
                            <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center' ,backgroundColor:'#eee'}]}>
                                <Text style={[styles.text16, {color: primaryColor}]}>{'เลขประจำตัวเสียภาษีอากร : ' + props.userInfo.numbertax}</Text>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.TextAreaWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor,width: '100%', height: '100%',textAlignVertical: 'top', padding:10,justifyContent: "flex-start",alignSelf: 'flex-start'}]}>
                                        {'ที่อยู่ : ' + props.userInfo.address}
                                    </Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1,justifyContent: "center",alignSelf: 'center'}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'รหัสสาขา : ' + props.userInfo.branch_code}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'ชื่อสาขา : ' + props.userInfo.branch_name}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลผู้มาติดต่อ`}</Text>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'ชื่อ-นามสกุล : ' + props.userInfo.name}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'เลขบัตรประชาชน : ' + props.userInfo.citizenid}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'เบอร์โทรศัพท์ : ' + props.userInfo.phone}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'Line ID : ' + props.userInfo.lineid}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'อีเมล์ : ' + props.userInfo.email}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>




                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลเพื่อออกใบเสร็จรับเงิน`}</Text>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{props.userInfo.receiptname}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'เบอร์โทรศัพท์ : ' + props.userInfo.receiptphone}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'สำนักงาน : ' + props.userInfo.receiptofficename}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'เบอร์โทรศัพท์ : ' + props.userInfo.receiptofficephone}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'อีเมล์ : ' + props.userInfo.receiptemail}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>




                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text22, { color: primaryColor }]}>{`ข้อมูลเจ้าหน้าที่บัญชี`}</Text>
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'ชื่อ-นามสกุล : ' + props.userInfo.accountname}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[styles.containerRow]}>
                                <View style={[styles.shadow, styles.inputWithIcon, { alignSelf: 'center',flex:0.9}]}>
                                    <Text style={[styles.text16, {color: primaryColor}]}>{'เบอร์โทรศัพท์ : ' + props.userInfo.accountphone}</Text>
                                </View>
                                <TouchableOpacity style={[styles.inputWithIcon, {width:'100%',paddingLeft:0,alignItems:'center',flex:0.1}]}
                                    onPress={()=>{

                                    }}
                                >
                                    <Icon  name='edit' size={20} color={primaryColor} />
                                </TouchableOpacity>
                            </View>

                            

                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`รหัสผ่าน`}</Text>
                            <TouchableOpacity style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}
                            onPress={()=>{
                                this.props.navigation.navigate('ChangePassword')
                            }}
                            >
                                <View style={[styles.containerRow]}>
                                    <Text style={[styles.text16, {color: 'white',flex:0.9}]}>{'เปลี่ยนรหัสผ่าน'}</Text>
                                    <View style={{alignItems:'center',flex:0.1}}>
                                        <Icon  name='chevron-right' size={20} color='white' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`ประเภทสินค้าที่นำมาขาย`}</Text>
                            <View style={[styles.mainButton2, { marginTop: 5, marginBottom: 5, justifyContent: 'center', paddingLeft: 10 }]}>
                                <Text style={[styles.text16, { color: 'white' }]}>{ props.userInfo.product_type.type_name + ` : ` + props.userInfo.product_type.category_name}</Text>
                            </View>
                            <Text style={[styles.text16, { paddingLeft: 20 }]}>{`สินค้าที่เลือก`}</Text>
                            {
                                props.userInfo.product.map((v, i) => {
                                    return (
                                        <View key={i} style={{ paddingLeft: 40 }}>
                                            <Text style={[styles.text14]}>{`${(i + 1)}. ${v.product_name}`}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text style={[styles.text12, { color: primaryColor,paddingTop:5, paddingLeft: 20 }]}>{`*หมายเหตุ ถ้าท่านต้องเปลี่ยนประเภทสินค้าที่ต้องการขาย\n กรุณาติดต่อเจ้าหน้าที่`}</Text>
                            <View style={[styles.marginBetweenVertical]}></View>
                            <View style={[styles.hr]}></View>
                            <Text style={[styles.text14, {textDecorationLine : 'underline', color: primaryColor }]}>{`ข้อตกลงและเงื่อนไขในการจองตลาด`}</Text>
                       
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                    onPress={
                                        () => this.handleBack()
                                    }>
                                    <Text style={[styles.text16, { color: '#FFF' }]}>{`ยกเลิก`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                    onPress={
                                        () => {
                                            
                                        }
                                    }>
                                    <Text style={[styles.text16, { color: '#FFF' }]}>{`บันทึกการแก้ไข`}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text14, {textDecorationLine : 'underline', color: primaryColor }]}>{`ยกเลิกการสมัครสมาชิก`}</Text>
                           
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompanyScreen)