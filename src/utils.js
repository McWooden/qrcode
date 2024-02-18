import axios from "axios";
import CryptoJS from "crypto-js"
// import { store } from "./redux/store";

//export const REST_API = import.meta.env.VITE_REST_API
export const REST_API = "https://7e61-125-160-110-206.ngrok-free.app"

export async function checkValid(ip) {
    // const be = store.getState().server.be
    try {
        const data = await axios
            .get(REST_API + '/checkValid/' + ip, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            })
            .then(res => {
                console.log(REST_API + '/checkValid', ip, res)
                return res.data
                // return res.data.canAbsen
            })
            .catch(() => {
                // setErrorList(prev => [...prev, error])
                return false
            });
            // console.log('data:', data);
        return data
    } catch (error) {
        console.log(error);
        return false
    }
}

export function censorName(name) {
    if (!name) return '-'

    // Split the name into words
    let words = name.split(' ')

    // Censor the first word
    if (words.length > 0) {
        let firstWord = words[0].substring(0, 3) + '*'.repeat(words[0].length - 3)
        words[0] = firstWord
    }

    // Iterate through each word starting from the second word
    for (let i = 1; i < words.length; i++) {
        // Censor all characters except the first letter
        words[i] = words[i].charAt(0) + '*'.repeat(words[i].length - 1)
    }

    // Join the censored words and return
    return words.join(' ')
}

// crypto and local storage

export function encryptString(string) {
    const encryptedMessage = CryptoJS.AES.encrypt(string, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
}
export function decryptString(encryptedMessage) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, import.meta.env.VITE_CRYPTO_SECRET_KEY)
    const decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8)
    return decryptedJsonString
}

export function encryptObject(object) {
    const jsonString = JSON.stringify(object)

    const encryptedMessage = CryptoJS.AES.encrypt(jsonString, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
}

export function decryptObject(encryptedMessage) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, import.meta.env.VITE_CRYPTO_SECRET_KEY)
    const decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8)

    const decryptedObject = JSON.parse(decryptedJsonString)

    return decryptedObject
}

export function setLocalStorage(key, string) {
    localStorage.setItem(key, string)
}

export function getLocalStorage(key) {
    const dataString = localStorage.getItem(key)

    if (dataString) {
        return dataString
    } else {
        return null
    }
}
export function setObjectLocalStorage(key, data) {
    const dataString = JSON.stringify(data)
    localStorage.setItem(key, dataString)
}
  
export function getObjectLocalStorage(key) {
    const dataString = localStorage.getItem(key)

    if (dataString) {
        const data = JSON.parse(dataString)
        return data
    } else {
        return null
    }
}

export function setEncryptObjectLocalStorage(key, data) {
    const dataString = encryptObject(data)
    localStorage.setItem(key, dataString)
}

export function getDecryptObjectLocalStorage(key) {
    try {
        const dataString = localStorage.getItem(key)
        
        if (dataString) {
            const data = decryptObject(dataString)
            return data
        } else {
            return null
        }
    } catch (error) {
        localStorage.removeItem(key)
    }
}
