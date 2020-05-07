import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFO,
    CLEAR_USERINFO,
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