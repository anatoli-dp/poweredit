const { cookieController } = require('../controllers/cookieController')
const path = require('path')

module.exports = {
    get: function (req, res) {
        let user = cookieController.getUser(req, res)
        let originalUrl = req.originalUrl
        
        switch (originalUrl) {
            case '/':
                if (user) {
                    res.redirect('/dashboard')
                } else {
                    res.redirect('/login')
                }
                break;
            case '/login':
                if (user) {
                    res.redirect('/dashboard')
                } else {
                    cookieController.clearCookies(req, res)
                    res.sendFile(path.join(__dirname, '../pages/adminLogin/login.html'))
                }
                break;
            case '/dashboard':
                if (user) {
                    //cookieController.clearEditor(req, res)
                    res.sendFile(path.join(__dirname, '../pages/adminDashboard/dashboard.html'))
                } else {
                    res.redirect('/login')
                }
                break;
            case '/editor':
                if (user) {
                    if (cookieController.editorExists(req)) {
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/editor.html'))
                    } else {
                        res.redirect('/dashboard')
                    }
                } else {
                    res.redirect('/login')
                }
                break;
            default:
                switch (originalUrl) {
                    //login stuffs
                    case '/login.css':
                        res.sendFile(path.join(__dirname, '../pages/adminLogin/login.css'))
                        break;
                    case '/login.js':
                        res.sendFile(path.join(__dirname, '../pages/adminLogin/login.js'))
                        break;
                    //dashboard stuffs
                    case '/dashboard.css':
                        res.sendFile(path.join(__dirname, '../pages/adminDashboard/dashboard.css'))
                        break;
                    case '/dashboard.js':
                        res.sendFile(path.join(__dirname, '../pages/adminDashboard/dashboard.js'))
                        break;
                    case '/tabulator.min.css':
                        res.sendFile(path.join(__dirname, '../pages/adminDashboard/tabulator/css/tabulator.min.css'))
                        break;
                    case '/tabulator_bulma.min.css':
                        res.sendFile(path.join(__dirname, '../pages/adminDashboard/tabulator/css/bulma/tabulator_bulma.min.css'))
                        break;
                    case '/tabulator.min.js':
                        res.sendFile(path.join(__dirname, '../pages/adminDashboard/tabulator/js/tabulator.min.js'))
                        break;
                    case '/all.min.css':
                        res.sendFile(path.join(__dirname, '../pages/stuffs/fa_5.15.3/css/all.min.css'))
                        break;
                    case '/webfonts/fa-solid-900.woff2':
                        res.sendFile(path.join(__dirname, '../pages/stuffs/fa_5.15.3/webfonts/fa-solid-900.woff2'))
                        break;
                    case '/webfonts/fa-regular-400.woff2':
                        res.sendFile(path.join(__dirname, '../pages/stuffs/fa_5.15.3/webfonts/fa-solid-900.woff2'))
                        break;
                    //editor stuffs
                    case '/font-awesome.min.css':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/fonts/font-awesome.min.css'))
                        break;
                    case '/main.css':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/main.css'))
                        break;
                    case '/ace.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/ace.js'))
                        break;
                    case '/theme-solarized_dark.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/theme-solarized_dark.js'))
                        break;
                    case '/mode-html.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/mode-html.js'))
                        break;
                    case '/mode-css.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/mode-css.js'))
                        break;
                    case '/mode-javascript.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/mode-javascript.js'))
                        break;
                    case '/ext-beautify.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/ext-beautify.js'))
                        break;
                    case '/ext-language_tools.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/ext-language_tools.js'))
                        break;
                    case '/uglifyjs.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/scripts/uglifyjs.js'))
                        break;
                    case '/editor.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/editor.js'))
                        break;
                    case '/fonts/fontawesome-webfont.woff2?v=4.7.0':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/fonts/fontawesome-webfont.woff2'))
                        break;
                    case '/fonts/bar-chart.svg':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/bar-chart.svg'))
                        break;
                    case '/fonts/custom-chart.svg':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/custom-chart.svg'))
                        break;
                    case '/fonts/donut-chart.svg':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/donut-chart.svg'))
                        break;
                    case '/fonts/main-fonts.eot':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/main-fonts.eot'))
                        break;
                    case '/fonts/main-fonts.svg':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/main-fonts.svg'))
                        break;
                    case '/fonts/main-fonts.ttf':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/main-fonts.ttf'))
                        break;
                    case '/fonts/main-fonts.woff':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/main-fonts.woff'))
                        break;
                    case '/fonts/pie-chart.svg':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fonts/pie-chart.svg'))
                        break;
                    case '/snippets/html.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/snippets/html.js'))
                        break;
                    case '/snippets/css.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/snippets/css.js'))
                        break;
                    case '/snippets/javascript.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/snippets/javascript.js'))
                        break
                    case '/worker-html.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/worker-html.js'))
                        break;
                    case '/worker-css.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/worker-css.js'))
                        break;
                    case '/worker-javascript.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/ace/worker-javascript.js'))
                        break;
                    case '/jquery-2.1.4.min.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fontStuffs/jquery-2.1.4.min.js'))
                        break;
                    case '/webfont.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fontStuffs/webfont.js'))
                        break;
                    case '/bundle.js':
                        res.sendFile(path.join(__dirname, '../pages/adminEditor/fontStuffs/bundle.js'))
                        break;
                    //redirect for unknown stuffs
                    default:
                        if (originalUrl.endsWith('.png') || originalUrl.endsWith('.jpg') || originalUrl.endsWith('.jpeg')) {
                            let parts = originalUrl.split('/')
                            let imagePath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'images' + path.sep + parts[1] + path.sep + parts[2]

                            res.sendFile(imagePath)
                        } else {
                            res.redirect('/')
                        }
                        break;
                }
                break;
        }
    }
}