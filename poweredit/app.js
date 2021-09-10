console.log('initiating server')

const cookieKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
})

const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const helmet = require('helmet')

const path = require('path')

const debug = require('debug')('basic-api:server')
const http = require('http')

//const adminRouter = require('./routes/admin')
//const apiAdminAuthRouter = require('./routes/apiAdminAuth')

const hostRouter = require('./routes/host')

const app = express();

//app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
//app.use(helmet.contentSecurityPolicy())
//app.use(helmet.dnsPrefetchControl())
//app.use(helmet.expectCt())
//app.use(helmet.frameguard())
//app.use(helmet.hidePoweredBy())
//app.use(helmet.hsts())
//app.use(helmet.ieNoOpen())
//app.use(helmet.noSniff())
//app.use(helmet.permittedCrossDomainPolicies())
//app.use(helmet.referrerPolicy())
//app.use(helmet.xssFilter())

//app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({
    type: ['application/json', 'text/plain'],
    limit: '1000mb',
}))
app.use(cookieParser(cookieKey))

app.disable('x-powered-by')

//app.use('/admin', adminRouter)
//app.use('/api/admin/auth', apiAdminAuthRouter)

app.use('*', hostRouter)

let portArg = '80'
if (process.argv[2]) portArg = process.argv[2]

const port = normalizePort(process.env.PORT || portArg)
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort (val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError (error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break;
        default:
            throw error
    }
}

function onListening () {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + bind)
}

console.log('server ready . . .')