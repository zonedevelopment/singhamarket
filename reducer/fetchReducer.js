import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFO,
    CLEAR_USERINFO,
    SAVE_PRODUCT_TYPE,
    SET_DATE_SELECTED,
    CLEAR_DATE_SELECTED,
    SAVE_BANNER,
    SAVE_NEWS,
    SAVE_BUILDING,
    SET_BUILDING_ID_SELECTED,
    SET_FLOOR_ID_SELECTED,
    SET_ZONE_ID_SELECTED,
    SET_BUILDING_NAME_SELECTED,
    SET_FLOOR_NAME_SELECTED,
    SET_ZONE_NAME_SELECTED,
    SET_PREVIOUS_SCREEN,

} from '../utils/contants'

import ic_credit_card from '../assets/image/icon_creditcard.png'
import ic_banking from '../assets/image/icon_paymeny.png'
import styles from '../style/style'

const initialState = {
    previous_screen : '',
    indicator: false,
    userInfo: [],
    building: [],
    reserverion_building_id : '',
    reserverion_zone_id : '',
    reserverion_floor_id : '',
    reserverion_building_name : '',
    reserverion_zone_name : '',
    reserverion_floor_name : '',
    news: [],
    banner: [/*{ link: 'https://www.smartsme.co.th/media/BorYqhd9Mg2OTmfmqCVvtVwGaECFdstenBmooYh0jMWsGT5Yv3Zm3.png' }*/],
    standardAccessories: [
        {
            id: 1,
            name: 'โต๊ะพับเอนกประสงค์ 1 ตัว',
            image: ''
        },
        {
            id: 2,
            name: 'เก้าอื้ 2 ตัว',
            image: ''
        }
    ],
    otherService: [],
    paymentChannel: [
        {
            channel_id: 1,
            channel_name: 'บัตรเครดิต / บัตรเดบิต',
            channel_icon: ic_credit_card
        },
        {
            channel_id: 2,
            channel_name: 'iBanking / Mobile Banking',
            channel_icon: ic_banking
        }
    ],
    product_type: [],
    date_selected: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INDICATOR:
            return {
                ...state,
                indicator: true
            }
        case DISMISS_INDICATOR:
            return {
                ...state,
                indicator: false
            }
        case SAVE_USERINFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case CLEAR_USERINFO:
            return {
                ...state,
                userInfo: []
            }
        case SAVE_PRODUCT_TYPE:
            return {
                ...state,
                product_type: action.payload
            }
        case SET_DATE_SELECTED:
            return {
                ...state,
                date_selected: action.payload
            }
        case CLEAR_DATE_SELECTED:
            return {
                ...state,
                date_selected: []
            }
        case SAVE_BANNER:
            return {
                ...state,
                banner : action.payload
            }
        case SAVE_NEWS:
            return {
                ...state,
                news : action.payload
            }
        case SAVE_BUILDING:
            return {
                ...state,
                building : action.payload
            }
        case SET_BUILDING_ID_SELECTED:
            return {
                ...state,
                reserverion_building_id : action.payload
            }
        case SET_FLOOR_ID_SELECTED:
            return {
                ...state,
                reserverion_floor_id : action.payload
            }
        case SET_ZONE_ID_SELECTED:
            return {
                ...state,
                reserverion_zone_id : action.payload
            }
        case SET_BUILDING_NAME_SELECTED:
            return {
                ...state,
                reserverion_building_name : action.payload
            }
        case SET_FLOOR_NAME_SELECTED:
            return {
                ...state,
                reserverion_floor_name : action.payload
            }
        case SET_ZONE_NAME_SELECTED:
            return {
                ...state,
                reserverion_zone_name : action.payload
            }
        case SET_PREVIOUS_SCREEN:
            return {
                ...state,
                previous_screen : action.payload
            }
        
        default:
            return state
    }
}