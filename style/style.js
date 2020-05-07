import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native'
import {
    darkColor,
    primaryColor,
    secondaryColor,
} from '../utils/contants'

const COMPONENT_HIGHT = 50;
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
        fontFamily: Platform.OS == 'android' ? 'DBMed' : 'DB Helvethaica X'
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
        width: DEVICE_WIDTH - 40,
        backgroundColor: secondaryColor,
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
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
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 40,
        backgroundColor: darkColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    marginBetweenVertical: {
        height: 10
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
    }
})

export default styles;