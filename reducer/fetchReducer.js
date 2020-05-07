import {
    OPEN_INDICATOR,
    DISMISS_INDICATOR,
    SAVE_USERINFO,
    CLEAR_USERINFO,
} from '../utils/contants'

const initialState = {
    indicator: false,
    userInfo: [],
    sampleItem: [
        {
            'picture': 'user',
            "name": "Proxima Midnight",
            "email": "proxima@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Ebony Maw",
            "email": "ebony@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Black Dwarf",
            "email": "dwarf@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Mad Titan",
            "email": "thanos@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Supergiant",
            "email": "supergiant@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Loki",
            "email": "loki@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "corvus",
            "email": "corvus@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Proxima Midnight",
            "email": "proxima1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Ebony Maw",
            "email": "ebony1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Black Dwarf",
            "email": "dwarf1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Mad Titan",
            "email": "thanos1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Supergiant",
            "email": "supergiant1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "Loki",
            "email": "loki1@appdividend.com"
        },
        {
            'picture': 'user',
            "name": "corvus",
            "email": "corvus1@appdividend.com"
        }]
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
        default:
            return state
    }
}