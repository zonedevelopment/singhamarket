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
export const greenColor         = '#4ec084'
 /**
  * End
  */

/**
 * Constants AsyncStorage
 */
export const KEY_LOGIN = 'KEY_LOGIN';
export const KEY_ROLE = 'KEY_ROLE';
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
export const SET_TOKEN            = 'SET_TOKEN'
export const SET_USER_CART_ITEM   = 'SET_USER_CART_ITEM'
export const SET_USER_NOTIFY_ITEM   = 'SET_USER_NOTIFY_ITEM'

export const SAVE_PRODUCT_TYPE    = 'SAVE_PRODUCT_TYPE'
export const SET_DATE_SELECTED    = 'SET_DATE_SELECTED'
export const CLEAR_DATE_SELECTED  = 'CLEAR_DATE_SELECTED'
export const SAVE_BANNER          = 'SAVE_BANNER'
export const SAVE_NEWS            = 'SAVE_NEWS'
export const SAVE_BUILDING        = 'SAVE_BUILDING'

/// reservation user
export const SET_BUILDING_ID_SELECTED = 'SET_BUILDING_ID_SELECTED'
export const SET_FLOOR_ID_SELECTED = 'SET_FLOOR_ID_SELECTED'
export const SET_ZONE_ID_SELECTED = 'SET_ZONE_ID_SELECTED'
export const SET_BUILDING_NAME_SELECTED = 'SET_BUILDING_NAME_SELECTED'
export const SET_FLOOR_NAME_SELECTED = 'SET_FLOOR_NAME_SELECTED'
export const SET_ZONE_NAME_SELECTED = 'SET_ZONE_NAME_SELECTED'
export const SET_PREVIOUS_SCREEN = 'SET_PREVIOUS_SCREEN'
export const SET_BOOKINGID_SELECTED = 'SET_BOOKINGID_SELECTED'

/// reservation audit
export const SET_AUDIT_RESERV_PARTNERS = 'SET_AUDIT_RESERV_PARTNERS'
export const SET_AUDIT_RESERV_BUILDING = 'SET_AUDIT_RESERV_BUILDING'
export const SET_AUDIT_RESERV_FLOOR = 'SET_AUDIT_RESERV_FLOOR'
export const SET_AUDIT_RESERV_ZONE = 'SET_AUDIT_RESERV_ZONE'
export const SET_AUDIT_RESERV_DATE = 'SET_AUDIT_RESERV_DATE'

///// count nontification
export const SET_MY_CART = 'SET_MY_CART'
/**
 * End
 */

/**
 * API
 */
export const BASE_URL                 = 'https://benz.ots.co.th'
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
export const GET_AGREEMENT_REGISTER   = '/singha/api/GetAgreementRegister'
export const CHECK_REGISTER_URL       = '/singha/api/CheckRegister'
export const GET_BUILDING_URL         = '/singha/api/GetBuilding'
export const GET_BOOTH_URL            = '/singha/api/GetBooth'
export const CHECK_BOOTH_URL          = '/singha/api/CheckBoothStatus'
export const GET_ACCESSOIRES_URL      = '/singha/api/Accessory'
export const SUBMIT_BOOKING_URL       = '/singha/api/BookingSubmit'
export const CHECK_DISCOUNT_URL       = '/singha/api/CheckDiscount'
export const GET_CONFIRMRESERVATION_URL = '/singha/api/GetConfirmReservation'
export const GET_CART_URL             = '/singha/api/GetCart'
export const GET_PLAN_URL             = '/singha/api/GetPlan'
export const UPDATE_PROFILE_PERSONAL  = '/singha/api/UpdateProfilePersonal'
export const UPDATE_PROFILE_COMPANY   = '/singha/api/UpdateProfileCompany'
export const CHANGE_PASSWORD_URL      = '/singha/api/ChangePassword'
export const CONTACT_SUPPORT_URL      = '/singha/api/SupportSubmit'
export const GET_HISTORY_URL          = '/singha/api/GetHistory'
export const CHECK_IN_HISTORY_URL     = '/singha/api/CheckInHistory'
export const GET_FAVERITE_URL         = '/singha/api/GetFaveriteBooth'
export const SUBMIT_FAVERITE_URL      = '/singha/api/SubmitFaveriteBooth'
export const CANCEL_FAVERITE_URL      = '/singha/api/CancelFaveriteBooth'
export const RegisterFCMToken         = '/singha/api/RegisterFCMToken'
export const GET_CUSTOMER_URL         = '/singha/api/GetCustomer'
export const SYSTEMLOGIN_URL          = '/singha/api/SystemLogin'
export const GET_NOTIFICATION_URL     = '/singha/api/GetNotification'
export const CANCEL_BOOKING_URL     = '/singha/api/CancelBooking'

export const CREATE_TRANSACTION_URL   = '/singha/api/CreateTransactionPayment'


/**
 * SCB Open API
 */
export const OAUTHTOKEN               = 'OAUTHTOKEN'
export const AUTHORIZE                = 'https://api-sandbox.partners.scb/partners/sandbox/v2/oauth/authorize'
export const TOKEN                    = 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token'
export const QRCODECREATE             = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create'
export const PAYMENTTRANSACTION       = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/'

export const AUTHORIZEHEADER = {
  'apikey': 'l75d40fdc697664d2c8d0736bdfe4b57e7',
  'apisecret': 'abe9a0dd09bb482fa27be9eabe452efe',
  'resourceOwnerId': 'l75d40fdc697664d2c8d0736bdfe4b57e7',
  'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
  'response-channel': 'mobile',
  'endState': 'mobile_app',
  'accept-language': 'EN'
}

export const OAUTHTOKENHEADER = {
  'content-type': 'application/json',
  'resourceOwnerId': 'l75d40fdc697664d2c8d0736bdfe4b57e7',
  'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
  'accept-language': 'EN'
}

export const APIKEY                   = 'l75d40fdc697664d2c8d0736bdfe4b57e7'
export const APISECRET                = 'abe9a0dd09bb482fa27be9eabe452efe'
/**
 * End
 */

/**
 * 2C2P
 */
export const PRIVATEKEY = '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';
export const MERCHANTID = 'JT04';
export const SECRETKEY = 'QnmrnH6QE23N';
export const PRODUCTIONMODE = false;

export const HEADERFORMDATA = {
  'Content-Type': 'multipart/form-data'
}
/**
 * End
 */