import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native'
import {
    darkColor,
    primaryColor,
    secondaryColor,
    grayColor,
    emptyColor,
    pendingColor,
    reservColor
} from '../utils/contants'

const COMPONENT_HIGHT = 45;
const BANNER_HEIGHT = 300;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerRow: {
        flexDirection: 'row'
    },
    backgroundPrimary: {
        backgroundColor: primaryColor
    },
    backgrounSecondary: {
        backgroundColor: secondaryColor
    },
    bold: {
        fontFamily: Platform.OS == 'android' ? 'SinghaEstate-Bold' : 'SinghaEstate-Bold'
    },
    positionBottom: {
        bottom: 0,
        position: 'absolute'
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    inputWithIcon: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: '95%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2,
        margin: 10
    },
    imageLogo: {
        width: 180, 
        height: '20%',
        resizeMode: 'contain', 
    },
    imageToolbar: {
        width: 150,
        height: '40%',
        resizeMode: 'contain', 
    },
    imageProfile: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 4,
        borderColor: secondaryColor
    },
    inputContainer: {
        width: DEVICE_WIDTH - 60,
        height: COMPONENT_HIGHT - 5,
        backgroundColor: 'transparent',
    },
    mainButton: {
        alignSelf: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 70,
        backgroundColor: secondaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    mainButton2: {
        alignSelf: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 60,
        backgroundColor: primaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    twoButton: {
        height: COMPONENT_HIGHT,
        width: (DEVICE_WIDTH / 2) - 30,
        backgroundColor: darkColor,
        borderRadius: 10
    },
    twoButtonRound: {
        height: COMPONENT_HIGHT,
        width: (DEVICE_WIDTH / 2) - 60,
        backgroundColor: darkColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    marginBetweenVertical: {
        height: 10
    },
    text30: {
        fontSize: 30
    },
    text28: {
        fontSize: 28
    },
    text26: {
        fontSize: 26
    },
    text22: {
        fontSize: 22
    },
    text20: {
        fontSize: 20
    },
    text18: {
        fontSize: 18
    },
    text16: {
        fontSize: 16
    },
    text14: {
        fontSize: 14
    },
    text12: {
        fontSize: 12
    },
    fullWidth: {
        width: DEVICE_WIDTH
    },
    fullHeight: {
        height: DEVICE_HIGHT
    },
    bannerHeight: {
        height: BANNER_HEIGHT
    },
    topBorderRadius: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomBorderRadius: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    topRightRadius: {
        borderTopRightRadius: 20
    },
    topLeftRadius: {
        borderTopLeftRadius: 20
    },
    bottomRightRadius: {
        borderBottomRightRadius: 20
    },
    bottomLeftRadius: {
        borderBottomLeftRadius: 20
    },
    panelWhite: {
        backgroundColor: 'white',
        width: DEVICE_WIDTH - 20,
        borderRadius: 20,
        padding: 10
    },
    panelRectangleGray: {
        backgroundColor: grayColor,
        width: DEVICE_WIDTH - 40,
        height: 50,
        borderRadius: 4,
        padding: 20,
        alignSelf: 'center'
    },
    hr: {
        width: '90%',
        height: 0.2,
        backgroundColor: primaryColor,
        alignSelf: 'center',
        margin: 10
    },
    circleGreen: {
        width: 25,
        height: 25,
        borderRadius: 100/2,
        backgroundColor: emptyColor
    },
    circleYellow: {
        width: 25,
        height: 25,
        borderRadius: 100/2,
        backgroundColor: pendingColor
    },
    circleRed: {
        width: 25,
        height: 25,
        borderRadius: 100/2,
        backgroundColor: reservColor
    },
    statusButton: {
        width: 80,
        height: 30,
        borderRadius: 15
    },
    smallStatusButton: {
        width: 50,
        height: 20,
        borderRadius: 10
    }
})

export default styles;