import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
const BOTTOM_TAB_CLEARANCE = Platform.OS === 'ios' ? 120 : 90

const sanitizeHtmlStyles = (html) => {
    if (typeof html !== 'string') {
        return ''
    }

    return html.replace(/style=(["'])(.*?)\1/gi, (attribute, quote, declarations) => {
        const safeDeclarations = declarations
            .split(';')
            .filter((declaration) => {
                const separatorIndex = declaration.indexOf(':')
                const value = separatorIndex >= 0 ? declaration.slice(separatorIndex + 1) : ''
                return !/(?:NaN|[+-]?Infinity|undefined|null)/i.test(value)
            })
            .join(';')

        return safeDeclarations.trim() ? `style=${quote}${safeDeclarations}${quote}` : ''
    })
}

class BuildingConditionScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        building_data : null
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข้อตกลงและเงื่อนไข`}</Text>
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
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount() {
        const params = this.props.route && this.props.route.params
        const buildingData = params && params.building_data
        this.setState({ building_data: buildingData || null })
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const buildingData = this.state.building_data
        const conditionHtml = sanitizeHtmlStyles(buildingData && buildingData.building_condition)

        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
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
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <Text style={[styles.bold, { color: secondaryColor, fontSize: 40 }]}>{`SUN PLAZA`}</Text>
                    <Text style={[styles.text20, { color: 'white' }]}>{`ข้อตกลงและเงื่อนไขการจองพื้นที่`}</Text>
                    <ScrollView
                        style={{ width: '100%' }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            flexGrow: 1,
                            paddingBottom: BOTTOM_TAB_CLEARANCE,
                        }}
                        showsVerticalScrollIndicator={false}>
                        <View style={[styles.panelWhite, styles.shadow]}>
                            <View>
                                {conditionHtml ? (
                                    <HTML html={conditionHtml} imagesMaxWidth={DEVICE_WIDTH - 20} />
                                ) : null}
                            </View>
                            <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 10 }]}>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: grayColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                                    onPress={
                                        () => this.handleBack()
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`ยกเลิก`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.twoButtonRound, styles.center, { backgroundColor: secondaryColor }]}
                                    onPress={
                                        () => this.props.navigation.navigate('Floorzone',{
                                            building_data : buildingData
                                        })
                                    }>
                                    <Text style={[styles.text18, { color: '#FFF' }]}>{`ยอมรับ`}</Text>
                                </TouchableOpacity>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuildingConditionScreen)
