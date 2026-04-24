import React from 'react'
import {
    View,
    Text,
    //Image,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'
import Image from 'react-native-fast-image'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    BASE_URL,
    BANNER_URL,
    NEWS_URL,
    HEADERFORMDATA,
} from '../utils/contants'
import Hepler from '../utils/Helper'
import {
    openIndicator,
    dismissIndicator,
    setStateBanner,
    setStateNews
} from '../actions'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ChoiceScreen extends React.Component {
    backHandlerSubscription = null;

    LoadBanner = () => {
        this.props.openIndicator()
        Hepler.post(BASE_URL + BANNER_URL,null,HEADERFORMDATA, (results) =>{
            console.log('BANNER_URL',results)
            if(results.status == 'SUCCESS'){
                this.props.setStateBanner(results.data)
            }else{
                this.props.setStateBanner([])
            }
            this.props.dismissIndicator()
        })
    }

    LoadNews = () => {
        this.props.openIndicator()
        Hepler.post(BASE_URL + NEWS_URL,null,HEADERFORMDATA, (results) =>{
            console.log('NEWS_URL',results)
            if(results.status == 'SUCCESS'){
                this.props.setStateNews(results.data)
            }else{
                this.props.setStateNews([])
            }
            this.props.dismissIndicator()
        })
    }


    renderPage(value, index) {
        return (
            <View key={index}>
                <TouchableOpacity style={{ backgroundColor: 'transparent' }}
                    onPress={
                        () => {

                        }
                    }>
                    <Image style={[styles.fullWidth, styles.bannerHeight, { resizeMode: "stretch" }]} source={{ uri: value.banner_image }} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ flex: 1, width: (DEVICE_WIDTH - 20) / 2, margin: 10 }}
                onPress={
                    () => {
                        this.props.navigation.navigate('NewsDetails',{
                            news_details : item
                        })
                    }}>
                <View style={{ marginBottom: 5 }}>
                    <Image style={{ width: '100%', height: 150, resizeMode: 'stretch' }} source={{ uri: item.news_thumbs }} />
                    <Text style={[styles.text16, { flexWrap: 'wrap' }]} >{`${item.news_title}`} </Text>
                    <Text style={[styles.text14, { color: secondaryColor }]} >{item.news_building} </Text>
                    <Text style={[styles.text12, { color: grayColor }]} >{`${moment(item.news_date).format('ll')} ${moment(item.news_date).format('LT')}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    };

    componentWillUnmount() {
        // if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
        this.backHandlerSubscription?.remove();
    }

    componentDidMount() {
        //this.props.openIndicator()
        //this.LoadBanner()
        //this.LoadNews()
        //this.props.dismissIndicator()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const props = this.props
        const banner = props.reducer.banner
        const news = props.reducer.news
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={DEVICE_WIDTH}>
                    {
                        banner.map((value, index) => this.renderPage(value, index))
                    }
                </Carousel>
                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 20 }]}>
                    <TouchableOpacity style={[styles.twoButton, styles.center, { backgroundColor: darkColor, borderWidth: 0.5, borderColor: '#FFF' }]}
                        onPress={
                            () => this.props.navigation.navigate('Registercondition')
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`สมัครสมาชิก`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twoButton, styles.center, { backgroundColor: secondaryColor }]}
                        onPress={
                            () => this.props.navigation.navigate('Login')
                        }>
                        <Text style={[styles.text18, { color: '#FFF' }]}>{`เข้าสู่ระบบ`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, styles.topBorderRadius, { backgroundColor: '#FFF' }]}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={news}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderItem}
                        numColumns={2} />
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
    setStateBanner,
    setStateNews
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceScreen)
