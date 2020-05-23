import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFO,
    CLEAR_USERINFO,
    SAVE_PRODUCT_TYPE,
    SET_DATE_SELECTED,
    CLEAR_DATE_SELECTED
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