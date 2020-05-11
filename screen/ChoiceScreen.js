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
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('screen').width
class ChoiceScreen extends React.Component {

    state = {
        news: [{
            id: 1,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6ZR-sCVhLk9Qy_EkmBQkq29u_CYhmfJMC9jutBpPWxEt2andE&usqp=CAU',
            title: 'Test news 1',
            building: 'Build A',
            date: '2020-05-11 09:00:00'
        }],
        banner: [{ link: 'https://www.smartsme.co.th/media/BorYqhd9Mg2OTmfmqCVvtVwGaECFdstenBmooYh0jMWsGT5Yv3Zm3.png' }]
    }

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
            <TouchableOpacity style={{ flex: 1, width: (DEVICE_WIDTH - 20) / 2, margin: 10 }}
                onPress={
                    () => {

                    }}>
                <View style={{ marginBottom: 5 }}>
                    <Image style={{ width: (DEVICE_WIDTH / 2) - 10, height: 150, resizeMode: 'stretch' }} source={{ uri: img }} />
                    <Text style={{ fontSize: 16 }} >{item.title} </Text>
                    <Text style={{ fontSize: 16, color: secondaryColor }} >{item.title} </Text>
                    <Text style={{ fontSize: 16, color: grayColor }} > {moment(item.nw_Time).format('LLL')} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    handleBack = () => {
        if (this.props.navigation.state.routeName === 'Choice') {
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
        return (
            <View style={[styles.container, styles.backgroundPrimary]}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={DEVICE_WIDTH}>
                    {
                        this.state.banner.map((value, index) => this.renderPage(value, index))
                    }
                </Carousel>
                <View style={[styles.containerRow, { justifyContent: 'space-around', alignItems: 'center', margin: 20 }]}>
                    <TouchableOpacity style={[styles.twoButton, styles.center, { backgroundColor: darkColor, borderWidth: 0.5, borderColor: '#FFF' }]}>
                        <Text style={[styles.text22, { color: '#FFF' }]}>{`สมัครสามชิก`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.twoButton, styles.center, { backgroundColor: secondaryColor }]}>
                        <Text style={[styles.text22, { color: '#FFF' }]}>{`เข้าสู่ระบบ`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, { backgroundColor: '#FFF' }]}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={this.state.news}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceScreen)