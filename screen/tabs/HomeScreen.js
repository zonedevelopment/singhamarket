import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import Carousel from 'react-native-banner-carousel'

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
class HomeScreen extends React.Component {

    renderPage(value, index) {
        return (
            <View key={index}>
                <TouchableOpacity style={{ backgroundColor: 'transparent' }}
                    onPress={
                        () => {

                        }
                    }>
                    <Image style={[styles.fullWidth, styles.bannerHeight, { resizeMode: "stretch" }]} source={{ uri: value.link }} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ flex: 1, width: (DEVICE_WIDTH - 20) / 2, margin: 10 }}
                onPress={
                    () => {

                    }}>
                <View style={{ marginBottom: 5 }}>
                    <Image style={{ width: '100%', height: 150, resizeMode: 'stretch' }} source={{ uri: item.img }} />
                    <Text style={[styles.text16, { flexWrap: 'wrap' }]} >{`${item.title}`} </Text>
                    <Text style={[styles.text14, { color: secondaryColor }]} >{item.building} </Text>
                    <Text style={[styles.text12, { color: grayColor }]} >{`${moment(item.date).format('ll')} ${moment(item.date).format('LT')}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const props = this.props
        const banner = props.reducer.banner
        const news = props.reducer.news

        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
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
                <View style={[styles.container, { paddingTop: 15 }]}>
                    <View>
                        <Text style={[styles.text18, { paddingLeft: 10 }]}>{`ข่าวสารและโปรโมชั่น`}</Text>
                    </View>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)