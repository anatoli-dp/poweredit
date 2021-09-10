const { dbController } = require("./dbController")
const path = require('path')

exports.hostController = {
    get: function (req, res) {
        let host = req.headers.host
        let url = req.originalUrl

        if (url.includes('/favicon.ico')) {
            res.sendStatus(404)
        } else {
            let pageData = dbController.hostGet(host, url)

            if (pageData && pageData.projectid && pageData.page) {
                res.sendFile(process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'pages' + path.sep + pageData.projectid + path.sep + pageData.page + '.html')
            } else if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
                let parts = url.split('/')
                let imagePath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'images' + path.sep + parts[parts.length - 2] + path.sep + parts[parts.length - 1]

                res.sendFile(imagePath)
            } else{
                res.status(404).sendFile(path.join(__dirname, '../defaults/404/404.html'))
            }
        }
    }
}