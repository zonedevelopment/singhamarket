import {
    OPEN_INDICATOR,
    SET_TOKEN,
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
    SET_BOOKINGID_SELECTED,
    SET_PRODUCT_SELECTED,
    SET_MY_CART,
    SET_USER_CART_ITEM,
    SET_USER_NOTIFY_ITEM,
    SET_AUDIT_RESERV_PARTNERS,
    SET_AUDIT_RESERV_BUILDING,
    SET_AUDIT_RESERV_FLOOR,
    SET_AUDIT_RESERV_ZONE,
    SET_AUDIT_RESERV_DATE,
    OAUTHTOKEN
} from '../utils/contants'

import ic_credit_card from '../assets/image/icon_creditcard.png'
import ic_banking from '../assets/image/icon_paymeny.png'
import styles from '../style/style'

const initialState = {
    UserItemCartCount : 0,
    UserItemNotifyCount : 0,
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
    reserverion_product : {
        cate_id : '',
        cate_name : '',
        type_id : '',
        type_name : '',
        product : [],
    },
    news: [],
    banner: [/*{ link: 'https://www.smartsme.co.th/media/BorYqhd9Mg2OTmfmqCVvtVwGaECFdstenBmooYh0jMWsGT5Yv3Zm3.png' }*/],
    standardAccessories: [],
    otherService: [],
    paymentChannel: [
        {
            channel_id: 1,
            channel_name: 'บัตรเครดิต / บัตรเดบิต',
            channel_icon: ic_credit_card
        },
        {
            channel_id: 2,
            channel_name: 'คิวอาร์โค้ดพร้อมเพย์ / Mobile Banking',
            channel_icon: ic_banking
        }
    ],
    product_type: [],
    date_selected: [],
    personal_vat : 7, // ดึงจาก base
    company_vat : 3, /// ดึงจาก base
    booking_selected : [],
    mycart : [], /// arr ตะกร้าสินค้า
    token : '',
    
    audit_reserv_partners : [],
    audit_reserv_building : [],
    audit_reserv_floor : {
        selectedValue : '',
        selectedIndex : null,
        selectedName : '',
    },
    audit_reserv_zone : {
        selectedValue : '',
        selectedIndex : null,
        selectedName : '',
    },
    audit_reserv_date : [],
    oauthtoken: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token : action.payload
            }
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
        case SET_BOOKINGID_SELECTED : 
            return {
                ...state,
                booking_selected : action.payload
            }
        case SET_PRODUCT_SELECTED : 
            return {
                ...state,
                reserverion_product : action.payload
            }
        case SET_MY_CART : 
            return {
                ...state,
                mycart : action.payload
            }
        case SET_USER_CART_ITEM : 
            return {
                ...state,
                UserItemCartCount : action.payload
            }
        case SET_USER_NOTIFY_ITEM : 
            return {
                ...state,
                UserItemNotifyCount : action.payload
            }

        
        case SET_AUDIT_RESERV_PARTNERS :
            return {
                ...state,
                audit_reserv_partners : action.payload
            }
        case SET_AUDIT_RESERV_BUILDING : 
            return {
                ...state,
                audit_reserv_building : action.payload
            }
        case SET_AUDIT_RESERV_FLOOR : 
            return {
                ...state,
                audit_reserv_floor : action.payload
            }
        case SET_AUDIT_RESERV_ZONE : 
            return {
                ...state,
                audit_reserv_zone : action.payload
            }
        case SET_AUDIT_RESERV_DATE : 
            return {
                ...state,
                audit_reserv_date : action.payload
            }
        case OAUTHTOKEN:
            return {
                ...state,
                oauthtoken: action.payload
            }
        default:
            return state
    }
}