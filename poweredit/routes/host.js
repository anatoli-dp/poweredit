const { Router } = require("express")
const router = new Router();

const adminRoute = require('./admin')
const apiAdmin = require('./apiAdmin')

const { hostController } = require("../controllers/hostController")

router.get('*', (req, res, next) => {
    if (req.subdomains.length == 1 && req.subdomains[0] == 'admin') {
        adminRoute.get(req, res)
    } else {
        hostController.get(req, res)
    }
})

router.post('*', (req, res, next) => {
    if (req.subdomains.length == 1 && req.subdomains[0] == 'admin') {
        apiAdmin.post(req, res, next)
    }
})

module.exports = router