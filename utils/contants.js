const environment = "DEVELOPMENT"; /// "PRODUCTION"; "DEVELOPMENT"; "SENDBOX";
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
export const KEY_PWD_TXT = 'KEY_PWD_TXT'
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

export const URL_CANCEL_ONETRUST = 'URL_CANCEL_ONETRUST'

/// reservation user
export const SET_CONSTANTS        = 'SET_CONSTANTS'
export const SET_BUILDING_ID_SELECTED = 'SET_BUILDING_ID_SELECTED'
export const SET_FLOOR_ID_SELECTED = 'SET_FLOOR_ID_SELECTED'
export const SET_ZONE_ID_SELECTED = 'SET_ZONE_ID_SELECTED'
export const SET_BUILDING_NAME_SELECTED = 'SET_BUILDING_NAME_SELECTED'
export const SET_FLOOR_NAME_SELECTED = 'SET_FLOOR_NAME_SELECTED'
export const SET_ZONE_NAME_SELECTED = 'SET_ZONE_NAME_SELECTED'
export const SET_PREVIOUS_SCREEN = 'SET_PREVIOUS_SCREEN'
export const SET_BOOKINGID_SELECTED = 'SET_BOOKINGID_SELECTED'
export const SET_PRODUCT_SELECTED = 'SET_PRODUCT_SELECTED'
export const SET_TRANSACTION_SELECTED = 'SET_TRANSACTION_SELECTED'
export const SET_CHARGE_SELECTED = 'SET_CHARGE_SELECTED'

/// reservation audit
export const SET_AUDIT_RESERV_PARTNERS = 'SET_AUDIT_RESERV_PARTNERS'
export const SET_AUDIT_RESERV_BUILDING = 'SET_AUDIT_RESERV_BUILDING'
export const SET_AUDIT_RESERV_FLOOR = 'SET_AUDIT_RESERV_FLOOR'
export const SET_AUDIT_RESERV_ZONE = 'SET_AUDIT_RESERV_ZONE'
export const SET_AUDIT_RESERV_DATE = 'SET_AUDIT_RESERV_DATE'


///// verift audit
export const SET_AUDIT_VERIFY_BUILDING = 'SET_AUDIT_VERIFY_BUILDING'
export const SET_AUDIT_VERIFY_ZONE = 'SET_AUDIT_VERIFY_ZONE'

/// home audit
export const SET_AUDIT_HOME_BUILDING = 'SET_AUDIT_HOME_BUILDING'


///// count nontification
export const SET_MY_CART = 'SET_MY_CART'
/**
 * End
 */
                               

/**
 * API
 */
//export const BASE_URL                 = 'https://benz.ots.co.th/singha'
export const BASE_URL                 = 'https://sunplaza.singhaestate.co.th'
// export const BASE_URL                 = 'https://sunplaza.singhaestate.co.th'
export const API_PATH                 = '/dev_api'

export const GET_TIMEOUT_SUMMARY_URL  = `${API_PATH}/GetTimeoutSummary`
export const CONSTANTS_URL            = `${API_PATH}/GetConstants`
export const GET_PAYMENT_CHANNEL_URL  = `${API_PATH}/GetPaymentChannel`
export const LOGIN_URL                = `${API_PATH}/Login`
export const FORGET_PASSWORD_URL      = `${API_PATH}/ForgetPassword`
export const BANNER_URL               = `${API_PATH}/Banner`
export const NEWS_URL                 = `${API_PATH}/News`
export const PROVINCE_URL             = `${API_PATH}/Province`
export const DISTRICT_URL             = `${API_PATH}/District`
export const SUBDISTRICT_URL          = `${API_PATH}/SubDistrict`
export const ACCESSORY_URL            = `${API_PATH}/Accessory`
export const PRODUCT_TYPE_URL         = `${API_PATH}/GetProductType`
export const PRODUCT_CATEGORY_URL     = `${API_PATH}/ProductCategory`
export const REGISTER_PERSONAL_URL    = `${API_PATH}/RegisterPersonal`
export const REGISTER_COMPANY_URL     = `${API_PATH}/RegisterCompany`
export const GET_AGREEMENT_REGISTER   = `${API_PATH}/GetAgreementRegister`
export const CHECK_REGISTER_URL       = `${API_PATH}/CheckRegister`
export const GET_BUILDING_URL         = `${API_PATH}/GetBuilding`
export const GET_BOOTH_URL            = `${API_PATH}/GetBooth`
export const CHECK_BOOTH_URL          = `${API_PATH}/CheckBoothStatus`
export const GET_ACCESSOIRES_URL      = `${API_PATH}/Accessory`
export const SUBMIT_BOOKING_URL       = `${API_PATH}/BookingSubmit`
export const CHECK_DISCOUNT_URL       = `${API_PATH}/CheckDiscount`
export const GET_CONFIRMRESERVATION_URL = `${API_PATH}/GetConfirmReservation`
export const GET_CART_URL             = `${API_PATH}/GetCart`
export const CHECK_BOOTH_HOLIDAY_URL  = `${API_PATH}/CheckHoliday`
export const GET_PLAN_URL             = `${API_PATH}/GetPlan`
export const UPDATE_PROFILE_PERSONAL  = `${API_PATH}/UpdateProfilePersonal`
export const UPDATE_PROFILE_COMPANY   = `${API_PATH}/UpdateProfileCompany`
export const CHANGE_PASSWORD_URL      = `${API_PATH}/ChangePassword`
export const CONTACT_SUPPORT_URL      = `${API_PATH}/SupportSubmit`
export const GET_HISTORY_URL          = `${API_PATH}/GetHistory`
export const CHECK_IN_HISTORY_URL     = `${API_PATH}/CheckInHistory`
export const GET_FAVERITE_URL         = `${API_PATH}/GetFaveriteBooth`
export const SUBMIT_FAVERITE_URL      = `${API_PATH}/SubmitFaveriteBooth`
export const CANCEL_FAVERITE_URL      = `${API_PATH}/CancelFaveriteBooth`
export const RegisterFCMToken         = `${API_PATH}/RegisterFCMToken`
export const UpdateAdminFCMToken      = `${API_PATH}/UpdateAdminFCMToken`
export const GET_CUSTOMER_URL         = `${API_PATH}/GetCustomer`
export const SYSTEMLOGIN_URL          = `${API_PATH}/SystemLogin`
export const GET_NOTIFICATION_URL     = `${API_PATH}/GetNotification`
export const CANCEL_BOOKING_URL       = `${API_PATH}/CancelBooking`
export const UNSUBSCRIBE_PARTNERS_URL     = `${API_PATH}/UnSubscribePartners`
export const CHECK_BLOCK_ZONE_URL     = `${API_PATH}/CheckBlockZone`
export const CHECK_LIMIT_RESERVATION_URL  = `${API_PATH}/CheckLimitResv`
export const GET_CONDITION_CALENDAR_URL   = `${API_PATH}/GetConditionCalendar`


export const CREATE_TRANSACTION_URL   = `${API_PATH}/CreateTransactionPayment`
export const GET_SLIP_PAYMENT_URL     = `${API_PATH}/GetSlipPayment`

export const AUDIT_GET_VERIFY_MAIN      = `${API_PATH}/audit/LoadMainAudit`
export const AUDIT_CHECKED_SUBMIT_MAIN  = `${API_PATH}/audit/AuditSubmitMain`
export const AUDIT_GET_DETAILS_VERIFY   = `${API_PATH}/audit/LoadDetailsAudit`
export const AUDIT_CHECKED_SUBMIT_DETAILS = `${API_PATH}/audit/AuditSubmitDetails`
export const AUDIT_CUTING_SUBMIT        = `${API_PATH}/audit/AuditSubmitCuting`


export const AUDIT_HOME_DASHBOARD   = `${API_PATH}/audit/LoadHomeDashBoard`
export const AUDIT_HOME_BOOTH       = `${API_PATH}/audit/LoadHomeBooth`
export const AUDIT_CUSTOMER_BOOTH   = `${API_PATH}/audit/LoadCustomerBooth`

export const AUDIT_LIST_BOOKING_SLIP  = `${API_PATH}/audit/LoadListBookingSlip`
export const AUDIT_SUBMIT_UPLOAD_SLIP = `${API_PATH}/audit/SubmitAuditUploadSlip`
export const AUDIT_NOTIFICATION_URL   = `${API_PATH}/audit/GetNotification`


/**
 * SCB Open API /////////////////////////////////////////////////
 * SENDBOX
 */
const OAUTHTOKEN_SENDBOX               = 'OAUTHTOKEN'
const AUTHORIZE_SENDBOX                = 'https://api-sandbox.partners.scb/partners/sandbox/v2/oauth/authorize'
const TOKEN_SENDBOX                    = 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token'
const QRCODECREATE_SENDBOX             = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create'
const PAYMENTTRANSACTION_SENDBOX       = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/'
const AUTHORIZEHEADER_SENDBOX = {
  'apikey': 'l75d40fdc697664d2c8d0736bdfe4b57e7',
  'apisecret': 'abe9a0dd09bb482fa27be9eabe452efe',
  'resourceOwnerId': 'l75d40fdc697664d2c8d0736bdfe4b57e7',
  'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
  'response-channel': 'mobile',
  'endState': 'mobile_app',
  'accept-language': 'EN'
}
const OAUTHTOKENHEADER_SENDBOX = {
  'content-type': 'application/json',
  'resourceOwnerId': APIKEY_SENDBOX,
  'requestUId': requestUId_SENDBOX,
  'accept-language': 'EN'
}
const APIKEY_SENDBOX                   = 'l75d40fdc697664d2c8d0736bdfe4b57e7'
const APISECRET_SENDBOX                = 'abe9a0dd09bb482fa27be9eabe452efe'
const BILLER_ID_SENDBOX                = '227843582030123'
const requestUId_SENDBOX                   = 'c385f890-ba04-4973-9939-98ce407ed740'
const REF3_SENDBOX                      = 'GFD'

/**
 * SCB Open API /////////////////////////////////////////////////
 * UAT
 */

const OAUTHTOKEN_UAT               = 'OAUTHTOKEN'
const AUTHORIZE_UAT                = 'https://api-sandbox.partners.scb/partners/sandbox/v2/oauth/authorize'
const TOKEN_UAT                    = 'https://api-uat.partners.scb/partners/v1/oauth/token'
const QRCODECREATE_UAT             = 'https://api-uat.partners.scb/partners/v1/payment/qrcode/create'
const PAYMENTTRANSACTION_UAT       = 'https://api-uat.partners.scb/partners/v1/payment/billpayment/transactions/'
const QR30_INQUIRY_UAT             ='https://api-uat.partners.scb/partners/v1/payment/billpayment/inquiry'
const AUTHORIZEHEADER_UAT = {
  'apikey': APIKEY_UAT,
  'apisecret': APISECRET_UAT,
  'resourceOwnerId': APIKEY_UAT,
  'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
  'response-channel': 'mobile',
  'endState': 'mobile_app',
  'accept-language': 'EN'
}
const OAUTHTOKENHEADER_UAT = {
  'content-type': 'application/json',
  'resourceOwnerId': APIKEY_UAT,
  'requestUId': requestUId_UAT,
  'accept-language': 'EN'
}
const APIKEY_UAT                   = 'l7f329b707a0714fcf8ee03ee6163f5712'
const APISECRET_UAT                = 'd9bbf66538ee4c57a1d0ef1281361718'
const BILLER_ID_UAT                = '311040039475180'
const requestUId_UAT                 = 'c385f890-ba04-4973-9939-98ce407ed740'
const REF3_UAT                      ='MAF'


/**
 * SCB Open API /////////////////////////////////////////////////
 * PROD
 */
const OAUTHTOKEN_PROD               = 'OAUTHTOKEN'
const AUTHORIZE_PROD                = 'https://api.partners.scb/partners/v1/oauth/authorize'
const TOKEN_PROD                   = 'https://api.partners.scb/partners/v1/oauth/token'
const QRCODECREATE_PROD            = 'https://api.partners.scb/partners/v1/payment/qrcode/create'
const PAYMENTTRANSACTION_PROD     = 'https://api.partners.scb/partners/v1/payment/billpayment/transactions/'
const QR30_INQUIRY_PROD             ='https://api.partners.scb/partners/v1/payment/billpayment/inquiry'
const AUTHORIZEHEADER_PROD = {
  'apikey': APIKEY_PROD,
  'apisecret': APISECRET_PROD,
  'resourceOwnerId': APIKEY_PROD,
  'requestUId': 'c385f890-ba04-4973-9939-98ce407ed740',
  'response-channel': 'mobile',
  'endState': 'mobile_app',
  'accept-language': 'EN'
}
const OAUTHTOKENHEADER_PROD = {
  'content-type': 'application/json',
  'resourceOwnerId': APIKEY_PROD,
  'requestUId': requestUId_PROD,
  'accept-language': 'EN'
}
const APIKEY_PROD                   = 'l72f430e812f8245cca37dc2c527447a39'
const APISECRET_PROD                = '9ea6191c93aa4fd6aac092491b05073d'
const BILLER_ID_PROD                = '010555612487501'
const requestUId_PROD                = 'c385f890-ba04-4973-9939-98ce407ed740'
const REF3_PROD                      ='MAF'



// QR SCB SENDBOX เปิด-ปิด โคดเอา
// export const OAUTHTOKEN               = OAUTHTOKEN_SENDBOX
// export const AUTHORIZE                = AUTHORIZE_SENDBOX
// export const TOKEN                    = TOKEN_SENDBOX
// export const QRCODECREATE             = QRCODECREATE_SENDBOX
// export const PAYMENTTRANSACTION       = PAYMENTTRANSACTION_SENDBOX
// export const AUTHORIZEHEADER = AUTHORIZEHEADER_SENDBOX
// export const OAUTHTOKENHEADER = OAUTHTOKENHEADER_SENDBOX
// export const APIKEY                   = APIKEY_SENDBOX
// export const APISECRET                = APISECRET_SENDBOX
// export const BILLER_ID                = BILLER_ID_SENDBOX
// export const REQUESTUID           = requestUId_SENDBOX
// export const REF3                 = REF3_SENDBOX

// ///// QR SCB UAT เปิด-ปิด โคดเอา
export const OAUTHTOKEN               = OAUTHTOKEN_UAT
export const AUTHORIZE                = AUTHORIZE_UAT
export const TOKEN                    = TOKEN_UAT
export const QRCODECREATE             = QRCODECREATE_UAT
export const PAYMENTTRANSACTION       = PAYMENTTRANSACTION_UAT
export const QR30_INQUIRY             = QR30_INQUIRY_UAT
export const AUTHORIZEHEADER          = AUTHORIZEHEADER_UAT
export const OAUTHTOKENHEADER         = OAUTHTOKENHEADER_UAT
export const APIKEY                   = APIKEY_UAT
export const APISECRET                = APISECRET_UAT
export const BILLER_ID                = BILLER_ID_UAT
export const REQUESTUID               = requestUId_UAT
export const REF3                     = REF3_UAT

///// QR SCB PROD เปิด-ปิด โคดเอา
// export const OAUTHTOKEN               = OAUTHTOKEN_PROD
// export const AUTHORIZE                = AUTHORIZE_PROD
// export const TOKEN                    = TOKEN_PROD
// export const QRCODECREATE             = QRCODECREATE_PROD
// export const PAYMENTTRANSACTION       = PAYMENTTRANSACTION_PROD
// export const QR30_INQUIRY             = QR30_INQUIRY_PROD
// export const AUTHORIZEHEADER = AUTHORIZEHEADER_PROD
// export const OAUTHTOKENHEADER = OAUTHTOKENHEADER_PROD
// export const APIKEY                   = APIKEY_PROD
// export const APISECRET                = APISECRET_PROD
// export const BILLER_ID                = BILLER_ID_PROD
// export const REQUESTUID           = requestUId_PROD
// export const REF3                 = REF3_PROD

/**
 * End
 */

/**
 * 2C2P
 */
export const PRIVATEKEY = 'MIAGCSqGSIb3DQEHA6CAMIACAQAxggGoMIIBpAIBADCBizB+MQswCQYDVQQGEwJTRzELMAkGA1UECBMCU0cxEjAQBgNVBAcTCVNpbmdhcG9yZTENMAsGA1UEChMEMmMycDENMAsGA1UECxMEMmMycDEPMA0GA1UEAxMGbXkyYzJwMR8wHQYJKoZIhvcNAQkBFhBsdXNpYW5hQDJjMnAuY29tAgkA6a0e/lQFe58wDQYJKoZIhvcNAQEBBQAEggEAIS4xb6ggFfMZN3fElE+FsPFEsjR9FNkqLU7u+AESuhYdIcqrt2XVwa7ZYhEivL/i5bY1v/UFEUFJo2B7LdGDN+JtTgK1SFbVJu5jeXWGkiIgpVNgTDV6rJjOndplaOn74wSyQnfegGcM7x8Aea5vEPliBn1aH+4yYPl1yOZBLFYbHfB2OHyWf9XyPRqYZN0+QgySPWIwpk4Y3HGdEK5OCjJbvIV9+JBlsbVdmeOgdgyzLhHSSWvQQ+G/cBmmRuWpxs1R0COgALwvuw0MonnwyqF4hrn/G3GVh5DIbqUEFpRT3VWtOHRDEpEUP33bT+odtD+JB15/FQgLE392Z90zwzCABgkqhkiG9w0BBwEwHQYJYIZIAWUDBAECBBDFl1mnhCaLMuSpU4IZoF/aoIAEggPolKZmTMnTH+pzwnWMlEv7XYWI0Xw8YLRu+Jfox368DoaZ2By/eVMhv2jkWI1nJ6NcK+8HMPYFvGucsgvUMFXi7MiqXixyyvYIRD4vmZ15OA08PeYNfw8bmwFKNNyF0PdIe7ZOcdooP/wLpu3A9uASGoSpQYhgajlIePweZNhFw1Qpgf49Uq/2WKXqzKj52zvsgo3sn3ESvg9MMiKokfekDSdqnXJUGGTkZlscL0/DOExn6Yp2FveRwHeQ8/bX6CWHjj2A4xQOhXnVG8Pjvv1VBEjVI+MksYZgdhNB1mesKfT3QUobsMY7nwu5lV10H7rrSbFs4KPag3HhTCVdm1l14eylYMJUnFDLPnPpeSs0ebJf76bRP3W++5VzYBrcm5+x5Bg0tdWKpE2wGGLRFWWhP3Q/Kglw2T7nAld8PrXq1vXn+lEQm9mWIffFh1/Ctg0BUGyti4Nagi/mzZqb+A1HBVAN6/L4Xam9tZqec784HHOF1b6DQ6VGSEthhPwqlygZOgJRLKo1rJ+5XGFbbUpriQLGJ5Qjxd1XdDniok67rzhiKvZJTcg42aDK9NuV1hwKPAODJsbRqgsQFat2JeedFd2ZifZ3aSVGGnrGBfOEwAGRoUPJbr6L+1U881F8mLfnQP7oI/xbHTlGCOgx4yxfg1u0GJig2BFIW2aqjLGUFdKjry7wJSeVlY8eZ8w4HceZluwRnLLsHiyK2hPdPNRyGxjhFpmzPVe5gUjz4/mkvdl20FHDf8cVMo8M6z2yWeF8+nWoYykuy9P2M0W1K7y5S90x9XRE164euYGKr9RpxOqU7xSTVBQmM8BLfDQyDapGA8URRjXfQBJcos25HsxdHQE4YJfK46102JSSwOH7QDubWoAMMvtFQECR2l5OV/UzJJ2TIZEN3EYxKkk8yCQF+ch2sN5sCOKrLAHRFfWDHfGL86a2WAEDaz5eFSKY/qSPSt0JNdxKViRhZOdMhTxZVDjcB6rIedejho5gTVK/VEb+UFNvbtFWeIu1vChwDlnQMF3pK4rBIgihMKPmDTa4zwwFFuUJVMhjTTdTPTPq183Uz7GpnL7lcHmcnRldvjAnjNN0g4UE3vd4FSZOrKFpfFBkRyzIVZwznPPr0O0NFFP9+GMbzI0Ve12CbhtgCMDn5kw0wMQ4GV91+WBuQhlcNREExkz26TaOnOJenSjflnKWmT0E2KO+Xctvnyp/6oJVRFAzW/jEpKf4U14P+lJCPPnD63vHMCKuptPEBxJwSgqwdOmkEprATkMb4dK6Q7f/1swXDd4aneQKFOuejnPctR1KmF0a/KBYofESctLvf58v7ampPNn1dASCA+gMylgCOcs1ZeUhjzM3lDEJZbXRZZWbrpYEpveDBYsrUBTfp7CGmpZ6qAnCGq/b8OI86LLZXoYr+DCpxQl+k1LJyC5OQ3AoDI/Eks/SiNEPesEd0GXa5XDLFNlVIlUIy/eL3pJ0PRl92Mihy4K+xGp32xOJ8dleL3cs2pLVIydjzefXrOa8ybQPUhcStgdmtksaGwfjRLxiBZdVuoqCBaFiEueMcChkP3FjrLfCAqPZ+6IUFCycYhwGc6vLDyirEc03iLudGzJrjmqu7sr0UPly5Vs/Kj0P45+ST4B7P+0+8vRHWup0rzejyiULfHEdqHC6Oq2bM2w1kIb3n+00oqPi5oGEKottumaV7Cv9rcHoVEDtFFxcBwbRcA2fOA+6EXLRT+Jtf6IYFng/Zb4LCjS5UVeaUqwsyrewvLwg3Vt294sBHspB9/uGq+WTkrlxUNEZnogf4ESYBco6wVyJ3D+SU2DHicN1zQLVp4AwHMVaXfrF7ebg1TIV9arKho3gVp32YoifRmvHTtvGweK+gVBZ4s2Ai6H8RJ5Un6NDdb2PukKRcdqxO9Kr+xAPrijVtBiy5nB51Vts86LAWxk8YCxxXIVTxeh9Qn1Rxa+jS9AUSWykkQWxvcc5Hedl63MddzLtUeVLOrAWUL5SLiNnWlgS3waI2d2K+ER1ZFFlEXYwPXqFuwKCkFBq/x6wWLZVsIGuJVWZUJSedspnjC/Nwc8HFNCwKGt26IG9wqkUH8On8vMQDm/U2P2373FfI7s389k8D3yhi56B6nLd3+n5lKZSIsp/B55T58/uSI1Sql7UeAMhSxeuAfjQMZFhIhiNE3RkR0M7ft7ngqgdYRQMqql/eVlf8QFbBRNvpg+3EY7smx1U7MgWSAc7f8Yj9NiHPQ7et0KqodAKM9VQLNpaFjgCVyKkOZpR4pw6KuAXaefKqK2ML/ietiXinccnFpqUgLgwzYZ53PRct9JteJYDe6CfLlDGAfxPHBANCFV6752RRu3OCZC2P4eymvA1vuzBTq18Dm/k0GKrGeVDwEypGt9bT9zjd1qjZSbF1+Ckfo5biJ0FRB21yuqFXWGcFPctNyc3LGPf7vtXcz0DzTgMKu6e/ZuaIzSf9OcPCLVXbvmKUESH2ostoUwatu25RadBCqZtP7RgtfxyyxtuL1uEhRfhXMlJ3n4ZG/c4h2kWxw6mLYcWCVCk2JcYpXJPVMJCVqmq5vmaSJPbrVisjt7SToZsjney5uU49CszykPs5LHdR7UYFQGkF0PHPPkfq0Y9+J8qKKCtfyNvIPDrWypdA6IZURnXrd/pqsAghJ9MWbBoLfwyW6vcFmlOBIID6Ha61+ASClQAFNmLkkzG/b6zMKy92Mt8ilw1+xTBZmPw44A1WmOPUVN4QqExUpsi1jFUqx9sCc+05xo3bweOrxSQrny1etu8pRFAwJtA/9Gf3jjUbw6tvTvb0Ft4Vj4zX7RhvdqRN7PQqk4iSCGRL7+lTeQI4/8QzwW3XZrNfrdROMBu0rf6Vv/K2hen7S95MJnmi8hAeQTA8mXYy9Ox+3no8L4zP3rV89TvNggpoTGmbVMGmClNkqfYCRTo/JBFLIS4eOdqE79LohRW6OP28S4KAdP2GhWRFl7+CFhnxeLMlwTvARVcRveRb2qJsweP/o+Swqk4/5A6X17f68biiWg93Ia2H+w35GTBdtl1WGzOkDSH7U6tMPx1UvRbk1+M+HbKHGtNV654tvXNxE+0/O6swRSu2L/t3elk60jayDIJWntTKrxO+9wRs5xcuUs8+ehd97meyqOZvV9HkXUw6JqIGdhlpK3MhkrTlrPQjV5vgf/57GpLeYdxnf/7Cd3Obp67WyiFLiTh1AsRjrLif0NnYtV1hsAiXqZPA8DWP0gKQyuEReKNpcKCTAHNe/G8ATSXP2I0tqkQfXEDqOwvH+36ofWcw6TXqpnyB5sXsVWwp3G3uzsOfGYC4NvBI3a9fdM6NkkPKDjIbnSF0TVFte05BzogxQJzJINr1jGkYBTLZT3mgyM7CKEflfU3CRdaaAKUTPlJ3Z5ATf+uNrWPW7VepGIQo+Ud5K9AvtLMNMs6vf+rqNfa2Z8cMAQZ4LMllw92f1TUJj2E3wSCP4uTNFnsAEZ8guslYWu9XK9WJvSF4/cqn51VOP5FL4IPwmTOhP78QTnUOAe52dCAlJs5LO30eLufhU6iukOGIThJ68ZdppsSvkrICaJOPizlHowgCdnUCcSlCWbu9xAEs8RITcrF3+zdFwpBWO+2rExCGLtsaYJQdLzE2TlbycVsng20BjE7KW2DIfPz4CJ3eAiVsePS6VZTXNqhLSSmc2726Jb3k2oO6cfR0FOWosR4oQXo3NAx20AGnI74K7mM13Nq1ujwVVj5RzDEkAB+LpMmx23A4QhcrXeZZt9xWaDKMvS49XBtw4ZewCpgnam6kK2l7BVOdGdj5aHG6D9ulgxb9VBIP3lq7fv8UQzCovaqxQLwit5qEpclq9apicgkCwEPbGFzKrvdC3YWBu2lP5SIguL2YiSsBIbFxN/7tW3uPYzaGlih4ixghWtUNbZfQ7CKlsvbBfZs/fG3vzAJB6fNpw9+5IBXdyBkeKjZl1JNP4lTI5zOOJEHYiujYnJA7SMzs162XgUwKZtJuLlE0v3I+R4grFJgY21CPZsEgeifnemcdT+XzgubNbUvrc0Eexw+WPx5H9V1rzilTDIEDUMkPBoxZyAfjSDb3KdcwmkZdgRRvuyex3ljlrPfu1B9lLCehwdgP+ylV+Udk16v/z2G4U17CuhLlOWQ2JOwGlTBpVxHfjQRWeD6zB05fVwB5YsmBtNDuCBbbn3HPDAbakxFrKmZwrl1aGBo9TuthndpSujFdIGdkAp55RvawIPxkYAh736d3KshYWzH4M/w24OJyNxvKhOR6CXUdOeSfB9oOTcd8XLVC3ALEPqsHsuxQrhStWsKI/jfCY+z4sLb7g29WhEhQ/YdAAAAAAAAAAAAAA==';
export const MERCHANTID = 'JT04';
export const SECRETKEY = 'QnmrnH6QE23N';
export const PRODUCTIONMODE = false;
export const REQUEST_FORM_URL_2C2P   = '/api/FormRequest2C2P'


export const HEADERFORMDATA = {
  'Content-Type': 'multipart/form-data'
}
/**
 * End
 */