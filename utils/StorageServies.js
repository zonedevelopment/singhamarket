import AsyncStorage from '@react-native-community/async-storage'

export default class Storage {

    static async get(name) {
        try {
            const value = await AsyncStorage.getItem(name);
            return value
        } catch(e) {
            console.log('Storage GET ERROR',error)
        // error reading value
        }
    }

    static async set(name, value) {
        try {
            await AsyncStorage.setItem(name, value);
        } catch (error) {
            console.log('Storage SET ERROR',error)

        }
    }

    static async remove(key) {
        await AsyncStorage.removeItem(key)
    }

    static async clear() {
        await AsyncStorage.clear()
    }
    
}