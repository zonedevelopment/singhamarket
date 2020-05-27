import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFO,
    CLEAR_USERINFO,
    SAVE_PRODUCT_TYPE,
    SET_DATE_SELECTED,
    CLEAR_DATE_SELECTED,
    SAVE_BANNER,
    SAVE_NEWS
} from '../utils/contants'

import ic_credit_card from '../assets/image/icon_creditcard.png'
import ic_banking from '../assets/image/icon_paymeny.png'
import styles from '../style/style'

const initialState = {
    indicator: false,
    userInfo: [],
    building: [
        {
            building_id: 1,
            building_name: 'SINGHA COMPLEX 1',
            building_img: 'https://th1-cdn.pgimgs.com/listing/6459894/UPHO.65593632.V800/The-Esse-at-Singha-Complex-Watthana-Thailand.jpg',
            building_address: '88 ถนนอโศกมนตรี แขวงคลองเตยเหนือ เขตวัฒนา กทม',
            building_condition: '',
            building_floor: [
                {
                    floor_id: 1,
                    floor_name: 'Floor1'
                },
                {
                    floor_id: 2,
                    floor_name: 'Floor2'
                },
                {
                    floor_id: 3,
                    floor_name: 'Floor3'
                },
                {
                    floor_id: 4,
                    floor_name: 'Floor4'
                }
            ]
        },
        {
            building_id: 2,
            building_name: 'SINGHA COMPLEX 2',
            building_img: 'https://th1-cdn.pgimgs.com/listing/6643379/UPHO.65101474.V800/The-Esse-at-Singha-Complex-%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2-Thailand.jpg',
            building_address: '88 ถนนอโศกมนตรี แขวงคลองเตยเหนือ เขตวัฒนา กทม',
            building_condition: ''
        },
        {
            building_id: 3,
            building_name: 'SINGHA COMPLEX 3',
            building_img: 'https://lh3.googleusercontent.com/proxy/evXIrI_4s_LZxlVFlCVDg5tJaaaE3_01IH6Sq2_CGbxy8VjmFYKqwM_L34FJnX70hByM2KCOE3xF_ocdvVWgoennQXUTcrGi54rvFFwDVdGV6ojv07EPV_2cx4uvP8tetROGiVTzh9_YHmGGigKTwU1GUbkULgI',
            building_address: '88 ถนนอโศกมนตรี แขวงคลองเตยเหนือ เขตวัฒนา กทม',
            building_condition: ''
        }
    ],
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
    otherService: [
        {
            id: 1,
            name: 'ไฟฟ้าและแสงสว่าง',
            description: '(จุดละ 100 บาท)',
            price: 100,
            selected: 0
        },
        {
            id: 2,
            name: 'ไฟฟ้าไม่เกิน 8,000 วัตต์',
            description: '(จุดละ 500 บาท)',
            price: 500,
            selected: 0
        },
        {
            id: 3,
            name: 'ไฟฟ้า 8,000 วัตต์ ขึ้นไป',
            description: '(จุดละ 0 บาท)',
            price: 0,
            selected: 0
        }
    ],
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
        default:
            return state
    }
}