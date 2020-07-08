import { exp } from "react-native-reanimated"

/**
 * Color
 */
export const primaryColor       = '#163151'
export const secondaryColor     = '#c9a95e'
export const darkColor          = '#102238'
export const grayColor          = '#949599'
export const redColor           = '#c51f1f'

export const emptyColor         = '#9cd8b4'
export const pendingColor       = '#efd380'
export const reservColor        = '#efa693'
export const alpaGreen          = '#f2fff6'
export const alpaYellow         = '#fffbf0'
export const alpaRed            = '#fff6f5'
 /**
  * End
  */

/**
 * Constants AsyncStorage
 */
export const KEY_LOGIN = 'KEY_LOGIN';

  /**
  * End
  */
 
/**
 * Constants key
 */
export const OPEN_INDICATOR       = 'OPEN_INDICATOR'
export const DISMISS_INDICATOR    = 'DISMISS_INDICATOR'
export const SAVE_USERINFO        = 'SAVE_USERINFO'
export const CLEAR_USERINFO       = 'CLEAR_USERINFO'


export const SAVE_PRODUCT_TYPE    = 'SAVE_PRODUCT_TYPE'
export const SET_DATE_SELECTED    = 'SET_DATE_SELECTED'
export const CLEAR_DATE_SELECTED  = 'CLEAR_DATE_SELECTED'
export const SAVE_BANNER          = 'SAVE_BANNER'
export const SAVE_NEWS            = 'SAVE_NEWS'
export const SAVE_BUILDING        = 'SAVE_BUILDING'

/// reservation
export const SET_BUILDING_ID_SELECTED = 'SET_BUILDING_ID_SELECTED'
export const SET_FLOOR_ID_SELECTED = 'SET_FLOOR_ID_SELECTED'
export const SET_ZONE_ID_SELECTED = 'SET_ZONE_ID_SELECTED'
export const SET_BUILDING_NAME_SELECTED = 'SET_BUILDING_NAME_SELECTED'
export const SET_FLOOR_NAME_SELECTED = 'SET_FLOOR_NAME_SELECTED'
export const SET_ZONE_NAME_SELECTED = 'SET_ZONE_NAME_SELECTED'
export const SET_PREVIOUS_SCREEN = 'SET_PREVIOUS_SCREEN'
export const SET_BOOKINGID_SELECTED = 'SET_BOOKINGID_SELECTED'


///// count nontification
export const SET_MY_CART = 'SET_MY_CART'
/**
 * End
 */

/**
 * API
 */
export const BASE_URL                 = 'http://benz.ots.co.th'
export const LOGIN_URL                = '/singha/api/Login'
export const BANNER_URL               = '/singha/api/Banner'
export const NEWS_URL                 = '/singha/api/News'
export const PROVINCE_URL             = '/singha/api/Province'
export const DISTRICT_URL             = '/singha/api/District'
export const SUBDISTRICT_URL          = '/singha/api/SubDistrict'
export const ACCESSORY_URL            = '/singha/api/Accessory'
export const PRODUCT_CATEGORY_URL     = '/singha/api/ProductCategory'
export const REGISTER_PERSONAL_URL    = '/singha/api/RegisterPersonal'
export const REGISTER_COMPANY_URL     = '/singha/api/RegisterCompany'
export const CHECK_REGISTER_URL       = '/singha/api/CheckRegister'
export const GET_BUILDING_URL         = '/singha/api/GetBuilding'
export const GET_BOOTH_URL            = '/singha/api/GetBooth'
export const CHECK_BOOTH_URL          = '/singha/api/CheckBoothStatus'
export const GET_ACCESSOIRES_URL      = '/singha/api/Accessory'
export const SUBMIT_BOOKING_URL      = '/singha/api/BookingSubmit'
export const CHECK_DISCOUNT_URL       = '/singha/api/CheckDiscount'
export const GET_CONFIRMRESERVATION_URL = '/singha/api/GetConfirmReservation'
export const GET_CART_URL             = '/singha/api/GetCart'
export const GET_PLAN_URL             = '/singha/api/GetPlan'
export const UPDATE_PROFILE_PERSONAL  = '/singha/api/UpdateProfilePersonal'
export const UPDATE_PROFILE_COMPANY  = '/singha/api/UpdateProfileCompany'
export const CHANGE_PASSWORD_URL      = '/singha/api/ChangePassword'
export const CONTACT_SUPPORT_URL      = '/singha/api/SupportSubmit'
export const GET_HISTORY_URL      = '/singha/api/GetHistory'
export const CHECK_IN_HISTORY_URL      = '/singha/api/CheckInHistory'

export const HEADERFORMDATA = {
  'Content-Type': 'multipart/form-data'
}
/**
 * End
 */