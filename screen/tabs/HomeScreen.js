import React from 'react'
import {
    View,
    Text,
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
    HEADERFORMDATA,
    BANNER_URL,
    BASE_URL,
    KEY_LOGIN,
    NEWS_URL,
} from '../../utils/contants'
import styles from '../../style/style'
import StorageServies from '../../utils/StorageServies'

import {
    openIndicator,
    setStateNews,
    dismissIndicator,
} from '../../actions'

import Hepler from '../../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('screen').width
class HomeScreen extends React.Component {
    backHandlerSubscription = null


    state = {
        isFetching: false,
        ListNew : [],
        ListBanner : []
    }

    renderPage(value, index) {
        return (
            <View key={index} >
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

    LoadData = () => {
        this.props.openIndicator()
        Hepler.post(BASE_URL + BANNER_URL,null,HEADERFORMDATA, (results) =>{
            console.log('BANNER_URL',results)
            if(results.status == 'SUCCESS'){
                this.setState({
                    ListBanner : results.data
                })
            }else{
                this.setState({
                    ListBanner : []
                })
            }
            this.LoadNew();
        })
    }

    

    LoadNew = () => {
        Hepler.post(BASE_URL + NEWS_URL,null,HEADERFORMDATA, (results) =>{
            console.log('NEWS_URL',results)
            if(results.status == 'SUCCESS'){
                this.setState({
                    isFetching: false,
                    ListNew : results.data
                })
                this.props.dismissIndicator()
            }else{
                this.setState({
                    ListNew : [],
                    isFetching: false
                })
                this.props.dismissIndicator()
            }
        })
       
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
            return true;
        }
    };
    
    componentWillUnmount() {
        if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
    }

    componentDidMount(){
        // this.setState({
        //     ListData : this.props.reducer.news
        // })

        this.LoadData()
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    onRefresh() {
        this.setState({
            isFetching: true
        },() => {
            this.LoadData()
        })
    }


    render() {

        const props = this.props

        return (
            <View style={[styles.container, { backgroundColor: 'white', paddingBottom: 70 }]}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={DEVICE_WIDTH}>
                    {
                        this.state.ListBanner.map((value, index) => this.renderPage(value, index))
                    }
                </Carousel>
                <View style={[styles.container, { paddingTop: 15 }]}>
                    <View>
                        <Text style={[styles.text18, { paddingLeft: 10 }]}>{`ข่าวสารและโปรโมชั่น`}</Text>
                    </View>
                    {
                        this.state.ListNew.length > 0 ?
                            <FlatList
                            style={{ marginTop: 5 }}
                            data={this.state.ListNew}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            keyExtractor={(item) => item.news_id}
                            renderItem={this._renderItem}
                            numColumns={2} />
                        :
                        <View style={[styles.center, { justifyContent : 'center', alignSelf: 'center' ,paddingTop:20}]}>
                            <Text style={[styles.text18, { color: primaryColor }]}>{`ไม่พบรายการข่าว`}</Text>
                        </View>
                    }
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
    setStateNews,
    dismissIndicator,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)