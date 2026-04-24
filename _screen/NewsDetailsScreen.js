import React from 'react'
import {
    View,
    Text,
    //Image,
    FlatList,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Image from 'react-native-fast-image'
import Lightbox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel';
import { CheckBox } from 'react-native-elements'
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('screen').width
class NewsDetailsScreen extends React.Component {
    backHandlerSubscription = null;

    state = {
        news_details: []
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
                <Text style={[styles.text18, { color: 'white' }]}>{`ข่าวสารและโปรโมชั่น`}</Text>
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
        // if (this.backHandlerSubscription) {
            this.backHandlerSubscription.remove();
            this.backHandlerSubscription = null;
        }
        this.backHandlerSubscription?.remove();
    }

    async componentDidMount() {
        const { news_details } = this.props.route.params
        await this.setState({ news_details: news_details })
        // this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        this.backHandlerSubscription = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBack
        );
    }


    renderCarousel = (album, currentPage) => (
        <Carousel style={{ width, height }} currentPage={currentPage} autoplay={false}>
            {album.map(image => (
                <Image
                    style={{ flex: 1, resizeMode: 'contain' }}
                    resizeMode={'contain'}
                    source={{ uri: image.gallery_image }}
                    key={image.gallery_id}
                />))
            }
        </Carousel>
    );


    _renderItem = ({ item, index }) => {
        const currentPage = this.state.news_details.news_gallery.findIndex(x => x.gallery_id === item.gallery_id);
        return (
            <View style={{ flex: 1, width: (DEVICE_WIDTH) / 3, height: 100, margin: 3 }}>
                <Lightbox activeProps={{
                    resizeMode: 'contain',
                    flex: 1,
                    width: null,
                }}
                    renderContent={() => this.renderCarousel(this.state.news_details.news_gallery, currentPage)}
                    underlayColor="white">
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={{ uri: item.gallery_image }} />
                </Lightbox>
            </View>

        )
    }



    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
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
                    <ScrollView>
                        <View>
                            <Lightbox activeProps={{
                                resizeMode: 'contain',
                                flex: 1,
                                width: null,
                            }}>
                                <Image style={[styles.fullWidth, styles.bannerHeight, { resizeMode: "stretch" }]} source={{ uri: this.state.news_details.news_thumbs }} />
                            </Lightbox>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 10
                        }}
                        >
                            <View style={[styles.container]}>
                                <Text style={[styles.text22, { color: primaryColor }]}>{this.state.news_details.news_title}</Text>
                            </View>
                            <View style={{ padding: 5 }} />
                            <View style={[styles.container]}>
                                <Text style={[styles.text18, { color: secondaryColor }]}>{'อาคาร : ' + this.state.news_details.news_building}</Text>
                            </View>
                            <View>
                                <HTML html={this.state.news_details.news_detail} imagesMaxWidth={DEVICE_WIDTH - 20} />
                            </View>

                            {
                                this.state.news_details.news_gallery != '' ?
                                    <>
                                        <View style={[styles.container]}>
                                            <Text style={[styles.text18, { color: primaryColor }]}>{'รูปภาพเพิ่มเติม'}</Text>
                                        </View>
                                        <View style={[styles.container, styles.topBorderRadius]}>
                                            <FlatList
                                                // style={{ marginTop: 5 }}
                                                data={this.state.news_details.news_gallery}
                                                keyExtractor={(item) => item.gallery_id}
                                                renderItem={this._renderItem}
                                                numColumns={3} />
                                        </View>
                                    </>
                                    :
                                    <View></View>
                            }

                            <View style={[styles.container]}>
                                <Text style={[styles.text14, { color: grayColor }]} >{`${moment(this.state.news_details.news_date).format('ll')} ${moment(this.state.news_details.news_date).format('LT')}`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailsScreen)