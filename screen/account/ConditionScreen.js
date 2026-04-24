import React,{useCallback } from 'react'
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    Dimensions,
    BackHandler,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    GET_AGREEMENT_REGISTER,
    HEADERFORMDATA
} from '../../utils/contants'

import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

import styles from '../../style/style'


const DEVICE_WIDTH = Dimensions.get('screen').width
class ConditionScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        type: 1,
        licenseAgree: false,
        privacyAgree: false,
        htmlContent : '',
        privacy_url : '',
        apptype: '',
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

    async componentDidMount() {
        await this.LoadAgreement(1)
       // this.LoadAgreement(2)
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onCheckLicense(value) {
        this.setState({ licenseAgree: value })
    }

    onCheckPrivacy(value) {
        this.setState({ privacyAgree: value })
    }


    LoadAgreement (type) {
        let {Field} = this.props.route.params
        this.props.openIndicator()
        let formData = new FormData();
        formData.append('partners_type_id', type)
        Hepler.post(BASE_URL + GET_AGREEMENT_REGISTER,formData,HEADERFORMDATA,(results) => {
            this.props.dismissIndicator()
            if (results.status == 'SUCCESS') {

                this.setState({
                    htmlContent : Field == 'agreement_only' ? results.data['agreement_only'] : results.data['policy_only'],
                    privacy_url : results.data['privacy_url'],
                    type: type,
                    licenseAgree: false,
                    privacyAgree: false,
                    apptype: results.app
                })
            } else {
                Alert.alert(results.message)
                this.setState({
                    htmlContent : '',
                    privacy_url : '',
                    type: type,
                    licenseAgree: false,
                    privacyAgree: false,
                })
            }
        })
    }

    

    render() {
        return (
            <View style={[styles.container, styles.backgroundPrimary, { paddingBottom: 40 }]}>
              
                <View style={[styles.container, { alignItems: 'center' }]}>
                   
                    <ScrollView style={[styles.panelWhite, styles.shadow]}>
                        <View style={[{ zIndex:1000, paddingBottom: 20 }]}>
                           
                            <View>
                                <HTML html={this.state.htmlContent} imagesMaxWidth={DEVICE_WIDTH - 20} />
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
    openIndicator,
    dismissIndicator,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionScreen)