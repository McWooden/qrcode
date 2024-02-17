import CryptoJS from "crypto-js"

export const REST_API = import.meta.env.VITE_REST_API

export function encryptString(string) {
    //const h = `[[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,82,77,74,81],[80,76,82,78,74,80],[80,76,82,78,74,80],[80,76,82,78,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[75,79,77,82,77,83,81],[80,76,82,78,74,80],[75,80,76,82,77,83,81],[75,80,76,81,76,83,81],[75,80,77,81,76,83,80],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,81,77,74,81],[75,80,77,81,77,83,80],[75,80,77,81,77,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,76,81,78,74,81],[80,76,82,78,74,80],[75,80,76,81,78,74,80],[75,80,77,81,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,77,83,81],[75,79,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,82,78,74,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[75,79,76,81,76,83,81],[75,80,77,81,77,83,80],[80,76,82,76,83,80],[80,77,81,76,83,80],[80,76,82,76,83,81],[80,76,81,76,83,80],[80,76,82,77,83,81],[80,76,81,76,83,80],[80,77,81,77,83,81],[80,76,82,76,83,81],[80,76,82,76,83,81],[80,76,82,78,74,80],[75,80,76,82,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[80,76,82,76,83,80],[80,76,81,77,74,80],[80,76,81,77,74,80],[80,76,82,76,83,81],[80,77,82,77,74,81]]`
    //const g = (k)=>{let dc="";const arr=JSON.parse(k);arr.forEach(n=>{let kk="";n.forEach(c=>{const pp=parseInt(c)-26;const ch=String.fromCharCode(pp);kk+=ch});const bin=parseInt(kk)-527296;const ril=parseInt(bin.toString(),2);dc+=String.fromCharCode(ril)});return dc}
    const encryptedMessage = CryptoJS.AES.encrypt(string, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
    //return eval(g(h))(string)
}

function encryptObject(object) {
    const jsonString = JSON.stringify(object)

    const encryptedMessage = CryptoJS.AES.encrypt(jsonString, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString()
    return encryptedMessage
}

function dencryptObject(encryptedMessage) {
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
            const data = dencryptObject(dataString)
            return data
        } else {
            return null
        }
    } catch (error) {
        localStorage.removeItem(key)
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
