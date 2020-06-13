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
    SET_BOOKINGID_SELECTED
} from '../utils/contants'

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
/**
* End
*/


