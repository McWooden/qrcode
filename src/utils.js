import axios from "axios";
import { store } from "./redux/store";
import cryptojs from "crypto-js";
// import { io } from 'socket.io-client';


// const URL = import.meta.env.VITE_REST_API || 'http://localhost:3001'
// export const socket = io(URL);


export function decryptObject(encryptedMessage) {
    try {
        const decryptedJsonString = cryptojs.AES.decrypt(encryptedMessage, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString(cryptojs.enc.Utf8)
        const decryptedObject = JSON.parse(decryptedJsonString)
    
        return decryptedObject
    } catch (error) {
        console.log('error', error);
    }
}

//export const REST_API = import.meta.env.VITE_REST_API
// export const REST_API = "https://43df-125-160-110-206.ngrok-free.app"
// const be = store.getState().server.be
// console.log(be);


export async function checkFingerprint(fingerprint) {
    const be = store?.getState()?.server?.be || ''
    try {
        const data = await axios
            .get(be + '/checkFingerprint/' + fingerprint, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            }).then(res => {
                console.log(be + '/checkFingerprint', fingerprint, res)
                return {access: res.data.canAbsen, msg: res.data.canAbsen ? 
                    'Anda dapat melanjutkan absen' 
                    : 
                    'Anda sudah absen hari ini sebagai...'
                }
            }).catch(() => {
                return {access: false, msg: 'Server tidak merespon atau sedang tidak dapat diakses'}
            })
        return data
    } catch (error) {
        return {access: false, msg: 'Client error'}
    }
}

export async function checkValid(ip) {
    const be = store?.getState()?.server?.be || ''
    try {
        const data = await axios
            .get(be + '/checkValid/' + ip, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            })
            .then(res => {
                console.log(be + '/checkValid', ip, res)
                return {access: res.data.canAbsen, msg: res.data.canAbsen ? 
                    'Koneksi IP belum terpakai, anda bisa absen' 
                    : 
                    'Koneksi IP sudah terpakai, anda tidak bisa absen (Hint: pakai koneksi data sendiri atau yang lain)'}
            })
            .catch(() => {
                return {access: false, msg: 'Server tidak merespon atau sedang tidak dapat diakses'}
            })
        return data
    } catch (error) {
        return {access: false, msg: 'Client error'}
    }
}

export function censorName(name) {
    if (!name) return '-'

    // Split the name into words
    let words = name.split(' ')

    // Censor the first word
    if (words.length > 0) {
        let firstWord = words[0].substring(0, 3) + '-'.repeat(words[0].length - 3)
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
    const encryptedMessage = cryptojs.AES.encrypt(string, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
}
export function decryptString(encryptedMessage) {
    const decryptedBytes = cryptojs.AES.decrypt(encryptedMessage, import.meta.env.VITE_CRYPTO_SECRET_KEY)
    const decryptedJsonString = decryptedBytes.toString(cryptojs.enc.Utf8)
    return decryptedJsonString
}

export function encryptObject(object) {
    const jsonString = JSON.stringify(object)

    const encryptedMessage = cryptojs.AES.encrypt(jsonString, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
}

// export function decryptObject(encryptedMessage) {
//     try {
//         console.log('start');
//         const decryptedJsonString = cryptojs.AES.decrypt(encryptedMessage, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString(cryptojs.enc.Utf8)
//         console.log('get json');
    
//         const decryptedObject = JSON.parse(decryptedJsonString)
    
//         return decryptedObject
//     } catch (error) {
//         console.log('error', error);
//     }
// }

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
    if (!key) return console.log('decrypt param not avaible');
    try {
        const dataString = localStorage.getItem(key)
        
        if (dataString) {
            const data = decryptObject(dataString)
            return data
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        // localStorage.removeItem(key)
    }
}
