const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const { dbController } = require('./dbController')

const dbPath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'database' + path.sep

const db = new Database(dbPath + 'auth.sqlite3')

let userName = ''

exports.authController = {
    verify: function (username, password) {
        if (username != '') userName = username

        let passwordHash = crypto.createHash('sha512').update(password).digest('base64')
        let userData = dbController.authGetUser(userName)
        
        if (userData && userData.password == passwordHash) {
            return userData.userlevel
        } else {
            return null
        }
    },

    update: function (username, password) {
        let oldUsername = userName

        let passwordHash = crypto.createHash('sha512').update(password).digest('base64')
        dbController.authSetUser(oldUsername, username, passwordHash)
    },
}