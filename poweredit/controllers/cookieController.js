const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const securityKey = crypto.randomBytes(32)

const authCookieName = generateID()
const editorCookieName = generateID()

exports.cookieController = {
    encrypt: function (data, expiryTime = null, extendedTime = null) {
        let initVector = crypto.randomBytes(16)
        let initVectorString = initVector.toString('hex')

        let cipher = crypto.createCipheriv(algorithm, securityKey, initVector)

        let finalTime = {}
        if (expiryTime) {
            if (extendedTime) {
                finalTime = getExpiryTime(expiryTime, extendedTime)
            } else {
                finalTime = getExpiryTime(expiryTime, null)
            }
        }

        let payload = JSON.stringify({
            timeData: finalTime,
            payload: data
        })

        let encryptedData = cipher.update(payload, "utf-8", "hex")
        encryptedData += cipher.final('hex')
        encryptedData += initVectorString

        return encryptedData
    },

    decrypt: function (encryptedData) {
        let initVectorString = encryptedData.slice(encryptedData.length - 32)
        let encryptedDataFinal = encryptedData.replace(initVectorString, '')

        let initVectorBufferArray = new Uint8Array(16)
        for (let i = 0; i < 16; i++) {
            initVectorBufferArray[i] = parseInt(initVectorString.substr(i*2, 2), 16)
        }
        let initVector = Buffer.from(initVectorBufferArray)

        let decipher = crypto.createDecipheriv(algorithm, securityKey, initVector)

        let decryptedData = decipher.update(encryptedDataFinal, "hex", "utf-8")
        decryptedData += decipher.final('utf8')

        let finalData = JSON.parse(decryptedData)

        if (Object.keys(finalData.timeData).length == 0) {
            return {
                data: finalData.payload,
                canBeRefreshed: false
            }
        } else {
            let timeData = checkExpiryTime(finalData.timeData)
            if (timeData == 1) {
                return {
                    data: finalData.payload,
                    canBeRefreshed: false
                }
            } else if (timeData == 2) {
                return {
                    data: finalData.payload,
                    canBeRefreshed: true
                }
            } else {
                return null
            }
        }
    },

    getUser: function (req, res) {
        if (req.signedCookies[authCookieName]) {
            let cookieData = this.decrypt(req.signedCookies[authCookieName])
            if (cookieData) {
                if (cookieData.canBeRefreshed) {
                    let newCookieData = this.encrypt(cookieData.data, (24 * 60 * 60 * 1000), (5 * 60 * 1000))
                    res.cookie(authCookieName, newCookieData, { signed: true })
                }
    
                return cookieData.data
            } else {
                return null
            }
        } else {
            return null
        }
    },

    setUser: function (res, status) {
        let encryptedStatus = this.encrypt(status, (24 * 60 * 60 * 1000), (5 * 60 * 1000))
        res.cookie(authCookieName, encryptedStatus, { signed: true })
    },

    getEditor: function (req) {
        if (req.signedCookies[editorCookieName]) {
            let cookieData = this.decrypt(req.signedCookies[editorCookieName])
            if (cookieData) {
                return JSON.parse(cookieData.data)
            } else {
                return null
            }
        } else {
            return null
        }
    },

    setEditor: function (req, res, projectid, name) {
        let encryptedPayload = this.encrypt(JSON.stringify({
            projectid: projectid,
            name: name
        }), null, null)

        res.cookie(editorCookieName, encryptedPayload, { signed: true })
    },

    clearEditor: function (req, res) {
        if (req.signedCookies[editorCookieName]) {
            res.clearCookie(editorCookieName)
        }
    },

    editorExists: function (req) {
        if (req.signedCookies[editorCookieName]) {
            return true
        } else {
            return false
        }
    },

    clearCookies: function (req, res) {
        for (let key in req.cookies) {
            res.clearCookie(key)
        }

        for (let key in req.signedCookies) {
            res.clearCookie(key)
        }
    }
}

function getExpiryTime (expiryTime, extendedTime) {
    let currentTime = getCurrentDate()
    let expiration = currentTime + expiryTime

    if (extendedTime) {
        return {
            expiration: expiration,
            extention: expiration - extendedTime
        }
    } else {
        return {
            expiration: expiration,
            extention: null
        }
    }
}

function checkExpiryTime (timeData) {
    let currentTime = getCurrentDate()

    if (currentTime <= timeData.expiration) {
        if (timeData.extention && currentTime >= timeData.extention) {
            return 2
        } else {
            return 1
        }
    } else {
        return 0
    }
}

function getCurrentDate () {
    return Date.now()
}

function generateID () {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}