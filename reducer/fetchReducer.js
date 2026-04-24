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
    OAUTHTOKEN,
    SET_TRANSACTION_SELECTED, 
    SET_AUDIT_VERIFY_BUILDING, 
    SET_AUDIT_VERIFY_ZONE,
    SET_CHARGE_SELECTED,
    SET_AUDIT_HOME_BUILDING,
    SET_CONSTANTS, 
} from '../utils/contants'

import ic_credit_card from '../assets/image/icon_creditcard.png'
import ic_banking from '../assets/image/icon_paymeny.png'
import styles from '../style/style'

const initialState = {
    ChargeFines : 0, //// ค่าปรับเมื่อทำผิดกฏ
    LimitReservUserOfDay : 2, ///// จำนวนการจองสูงสุด ต่อ วัน/ผู้ใช้งาน
    CartPaymentTimeOut : {
        Personal : 30,
        Company : 60,
    }, /// ms ระยะเวลาในการชำระเงิน
    ChargeService2C2P : 2.5, //////// ค่าบริการ 2C2P
    UserItemCartCount : 0,
    UserItemNotifyCount : 0,
    AdminItemNotifyCount : 0,
    AuditItemNotifyCount : 2,
    previous_screen : '',
    indicator: false,
    userInfo: {},
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
            channel_name: 'บัตรเครดิต/บัตรเดบิต (ค่าธรรมเนียม 2.5%)',
            channel_icon: ic_credit_card
        },
        {
            channel_id: 2,
            channel_name: 'คิวอาร์โค้ดพร้อมเพย์/Mobile Banking',
            channel_icon: ic_banking
        }
    ],
    product_type: [],  ////
    date_selected: [], //// เก็บข้อมูลการเลือกวันที่จอง โซน บูธ อุปกรณ์ ก่อนไปบันทึกจอง
    personal_vat : 7, // ดึงจาก base
    company_vat : 3, /// ดึงจาก base
    booking_selected : [], //// หน้าเลือกชำระเงิน 
    charge_selected : [], ///หน้าเลือกชำระเงิน 
    mycart : [], /// arr ตะกร้าสินค้า
    token : '',
     ///// จองพื้นที่ audit
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
    oauthtoken: [],
    trans_id_selected : '', //// ฝาก transaction id เพื่อเอาไว้ดึงใบเสร็จหน้า slip

    ///// ตรวจสอบล๊อค
    audit_verify_building : [], 
    audit_verify_zone : {
        selectedValue : '',
        selectedIndex : null,
        selectedName : '',
    },

    /// audit home report
    audit_home_building : [], 
    url_cancel_onetrust : 'https://www.google.com/',
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONSTANTS : 
            return {
                ...state,
                ChargeFines : action.ChargeFines, //// ค่าปรับเมื่อทำผิดกฏ
                LimitReservUserOfDay : action.LimitReservUserOfDay, ///// จำนวนการจองสูงสุด ต่อ วัน/ผู้ใช้งาน
                CartPaymentTimeOut : action.CartPaymentTimeOut, /// ms ระยะเวลาในการชำระเงิน
                ChargeService2C2P : action.ChargeService2C2P, //////// ค่าบริการ 2C2P
                personal_vat : action.personal_vat, // ดึงจาก base
                company_vat : action.company_vat, /// ดึงจาก base
                UserItemCartCount : 0,
                UserItemNotifyCount : 0,
                AdminItemNotifyCount : 0,
                AuditItemNotifyCount : 0,
                url_cancel_onetrust : action.url_cancel_onetrust,
            }
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
        case SET_PREVIOUS_SCREEN : 
            return {
                ...state,
                previous_screen : action.payload
            }
        case SET_BOOKINGID_SELECTED : 
            return {
                ...state,
                booking_selected : action.payload
            }
        case SET_CHARGE_SELECTED : 
            return {
                ...state,
                charge_selected : action.payload
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
        case OAUTHTOKEN : 
            return {
                ...state,
                oauthtoken: action.payload
            }
        case SET_TRANSACTION_SELECTED :
            return {
                ...state,
                trans_id_selected: action.payload
            }
        case SET_AUDIT_VERIFY_BUILDING :
            return {
                ...state,
                audit_verify_building : action.payload
            }
        case SET_AUDIT_VERIFY_ZONE : 
            return {
                ...state,
                audit_verify_zone : action.payload
            }
        case SET_AUDIT_HOME_BUILDING : 
            return {
                ...state,
                audit_home_building : action.payload
            }
        default : 
            return state
    }
}

