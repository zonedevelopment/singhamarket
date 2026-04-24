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
    TOKEN,
    OAUTHTOKEN,
    OAUTHTOKENHEADER,
    APIKEY,
    APISECRET,
    SET_TRANSACTION_SELECTED,
    SET_AUDIT_VERIFY_BUILDING, 
    SET_AUDIT_VERIFY_ZONE,
    SET_CHARGE_SELECTED,
    SET_AUDIT_HOME_BUILDING,
    SET_CONSTANTS, 
} from '../utils/contants'
import Helper from '../utils/Helper'

/**
 * 
 * Indicator controll
 */
export function indicatorControll(event) {
    return (dispatch) => {
        if (event) {
            dispatch(openIndicator())
        } else {
            dispatch(dismissIndicator())
        }
    }
}

export const openIndicator = (data) => ({
    type: OPEN_INDICATOR
})

export const dismissIndicator = (data) => ({
    type: DISMISS_INDICATOR
})

export const setToken = (data) => ({
    type : SET_TOKEN,
    payload: data
})
/**
 * End
 */

/**
 * User info
 */
export function userInfoControll(event, data) {
    return (dispatch) => {
        if (event == 'save') {
            dispatch(saveUserInfo(data))
        } else if (event == 'clear') {
            dispatch(clearUserInfo())
        }
    }
}

export const saveUserInfo = (data) => ({
    type: SAVE_USERINFO,
    payload: data
})

export const clearUserInfo = (data) => ({
    type: CLEAR_USERINFO
})
/**
* End
*/

export const setConstants = (data) => ({
    type: SET_CONSTANTS,
    ChargeFines : data.ChargeFines, //// ค่าปรับเมื่อทำผิดกฏ
    LimitReservUserOfDay : data.LimitReservUserOfDay, ///// จำนวนการจองสูงสุด ต่อ วัน/ผู้ใช้งาน
    CartPaymentTimeOut : data.CartPaymentTimeOut, /// ms ระยะเวลาในการชำระเงิน
    ChargeService2C2P : data.ChargeService2C2P, //////// ค่าบริการ 2C2P
    personal_vat : data.personal_vat, // ดึงจาก base
    company_vat : data.company_vat, /// ดึงจาก base
    url_cancel_onetrust : data.url_cancel_onetrust,
})


/**
 * Product type
 */
export function saveProductType(data) {
    return (dispatch) => {
        dispatch(setStateProductType(data))
    }
}

export const setStateProductType = (data) => ({
    type: SAVE_PRODUCT_TYPE,
    payload: data
})
/**
* End
*/

/**
 * Date selected
 */
export function saveDateSelected(event, data) {
    return (dispatch) => {
        if (event == 'save') {
            dispatch(setStateDateSelected(data))
        } else if (event == 'clear') {
            dispatch(clearDateSelected())
        }
    }
}

export const setStateDateSelected = (data) => ({
    type: SET_DATE_SELECTED,
    payload: data
})

export const clearDateSelected = (data) => ({
    type: CLEAR_DATE_SELECTED
})
/**
* End
*/

/**
 * BANNER
 */
export const setStateBanner = (data) => ({
    type: SAVE_BANNER,
    payload: data
})
/**
* End
*/

/**
 * NEWS
 */
export const setStateNews = (data) => ({
    type: SAVE_NEWS,
    payload: data
})
/**
* End
*/


/**
 * Building
 */
export const setStateBuilding = (data) => ({
    type: SAVE_BUILDING,
    payload: data
})
/**
* End
*/

/**
 * Reservation
 */
export const setStateSelectedBuildingID = (data) => ({
    type: SET_BUILDING_ID_SELECTED,
    payload: data
})
export const setStateSelectedFloorID = (data) => ({
    type: SET_FLOOR_ID_SELECTED,
    payload: data
})
export const setStateSelectedZoneID = (data) => ({
    type: SET_ZONE_ID_SELECTED,
    payload: data
})
export const setStateSelectedBuildingName = (data) => ({
    type: SET_BUILDING_NAME_SELECTED,
    payload: data
})
export const setStateSelectedFloorName = (data) => ({
    type: SET_FLOOR_NAME_SELECTED,
    payload: data
})
export const setStateSelectedZoneName = (data) => ({
    type: SET_ZONE_NAME_SELECTED,
    payload: data
})

export const setStatePreviousScreen = (data) => ({
    type: SET_PREVIOUS_SCREEN,
    payload: data
})


export const setStateBookingSelected = (data) => ({
    type: SET_BOOKINGID_SELECTED,
    payload: data
})

export const setStateChargeSelected = (data) => ({
    type: SET_CHARGE_SELECTED,
    payload: data
})


export const setStateSelectedProduct = (data) => ({
    type: SET_PRODUCT_SELECTED,
    payload: data
})



export const setStateMyCart = (data) => ({
    type: SET_MY_CART,
    payload: data
})


export const setUserCountCartItem = (data) => ({
    type: SET_USER_CART_ITEM,
    payload: data
})

export const setUserCountNotifyItem = (data) => ({
    type: SET_USER_NOTIFY_ITEM,
    payload: data
})
/**
* End
*/



/**
 * AUDIT RESERVATION
 */
export const setAuditReservPartners = (data) => ({
    type: SET_AUDIT_RESERV_PARTNERS,
    payload: data
})
export const setAuditReservBuilding = (data) => ({
    type: SET_AUDIT_RESERV_BUILDING,
    payload: data
})
export const setAuditReservFloor = (data) => ({
    type: SET_AUDIT_RESERV_FLOOR,
    payload: data
})
export const setAuditReservZone = (data) => ({
    type: SET_AUDIT_RESERV_ZONE,
    payload: data
})
export const setAuditReservDate = (data) => ({
    type: SET_AUDIT_RESERV_DATE,
    payload: data
})
export const setTransactionSelected = (data) => ({
    type: SET_TRANSACTION_SELECTED,
    payload: data
})

/// audit verify
export const setAuditVerifyBuilding = (data) => ({
    type: SET_AUDIT_VERIFY_BUILDING,
    payload: data
})
export const setAuditVerifyZone = (data) => ({
    type: SET_AUDIT_VERIFY_ZONE,
    payload: data
})

/// audit home
export const setAuditHomeBuilding = (data) => ({
    type: SET_AUDIT_HOME_BUILDING,
    payload: data
})




 /**
* End
*/

/**
 * SCB Open API
 */
export  function  generateOauthToken() {
    return (dispatch) => {
        let data = {
            'applicationKey': APIKEY,
            'applicationSecret': APISECRET
        }
        Helper.post(TOKEN, JSON.stringify(data), OAUTHTOKENHEADER, (results) => {
            let status = results.status
            let data   = results.data
            console.log('TOKEN',results)
            if (status.code == 1000) {
                dispatch(setStateOauthToken(data))
            }
        })
        
    }
}

export const setStateOauthToken = (data) => ({
    type: OAUTHTOKEN,
    payload: data
})

/**
 * End
 */