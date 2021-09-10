const { response } = require('express')
const path = require('path')

const { authController } = require('../controllers/authController')
const { cookieController } = require('../controllers/cookieController')
const { siteController } = require('../controllers/siteController')
const { editorController } = require('../controllers/editorController')

module.exports = {
    post: function (req, res, next) {
        let user = cookieController.getUser(req, res)
        let data = req.body

        switch (req.originalUrl) {
            case '/api/auth/login':
                if (data.username != '' & data.password != '') {
                    let status = authController.verify(data.username, data.password)
            
                    if (status != null) {
                        cookieController.setUser(res, status)
                        res.json({ msg: 'verified' })
                    } else {
                        res.json({})
                    }
                } else {
                    res.json({})
                }                
                break;
            case '/api/projects/get':
                if (user) {
                    let siteData = siteController.projectsGetAll()
                    if (siteData) {
                        res.json({ data: siteData })
                    } else {
                        res.json({ data: null })
                    }
                }
                break;
            case '/api/projects/add':
                if (user) {
                    let response = siteController.projectsAdd(data.name, data.url)
                    res.json(response)
                }
                break;
            case '/api/projects/delete':
                if (user) {
                    let response = siteController.projectsDelete(data.projectName)

                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'error' })
                    }
                }
                break;
            case '/api/projects/edit':
                if (user) {
                    let response = siteController.projectsEdit(data.projectid, data.name, data.url)

                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'error' })
                    }
                }
                break;
            case '/api/projects/live':
                if (user) {
                    let response = siteController.projectsSetLive(data.projectid, data.value)
                    
                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'fail' })
                    }
                }
                break;
            case '/api/sites/get':
                if (user) {
                    let siteData = siteController.sitesGetAll(data.projectid)

                    if (siteData) {
                        res.json({ data: siteData })
                    } else {
                        res.json({ data: null })
                    }
                }
                break;
            case '/api/sites/add':
                if (user) {
                    let response = siteController.sitesAdd(data.projectid, data.name, data.location)
                    res.json(response)
                }
                break;
            case '/api/sites/delete':
                if (user) {
                    let response = siteController.sitesDelete(data.projectid, data.name)

                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'error' })
                    }
                }
                break;
            case '/api/sites/edit':
                if (user) {
                    let response = siteController.sitesEdit(data.projectid, data.originalname, data.name, data.location)

                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'error' })
                    }
                }
                break;
            case '/api/sites/active':
                if (user) {
                    let response = siteController.sitesSetActive(data.projectid, data.name, data.value)
                    
                    if (response) {
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'fail' })
                    }
                }
                break;
            case '/api/editor/set':
                if (user) {
                    cookieController.setEditor(req, res, data.projectid, data.name)
                    res.json({})
                }
                break;
            case '/api/editor/store':
                if (user) {
                    let editorData = cookieController.getEditor(req)
                    if (editorData) {
                        console.log(roughSizeOfObject(data))
                        let status = editorController.store(editorData.projectid, editorData.name, data)
                        if (status) {
                            res.json({ status: 'succeed' })
                        } else {
                            res.json({ status: 'fail' })
                        }
                    } else {
                        res.json({ error: 'no editor' })
                    }
                }
                break;
            case '/api/editor/load':
                if (user) {
                    let editorData = cookieController.getEditor(req)
                    if (editorData) {
                        let data = editorController.load(editorData.projectid, editorData.name)
                        res.json({ data: data})
                    } else {
                        res.json({ error: 'no editor' })
                    }
                }
                break;
            case '/api/editor/publish':
                if (user) {
                    let editorData = cookieController.getEditor(req)
                    if (editorData) {
                        let response = editorController.publish(editorData.projectid, editorData.name)
                        if (response) {
                            res.json({})
                        } else {
                            res.json({ error: 'failed publish' })
                        }
                    } else {
                        res.json({ error: 'no editor' })
                    }
                }
                break;
                case '/api/assets/add':
                    if (user) {
                        let editorData = cookieController.getEditor(req)
                        if (editorData) {
                            let response = editorController.assetAdd(editorData.projectid, data.type, data.name, data.data)
                            res.json(response)
                        } else {
                            res.json({ error: 'no editor' })
                        }
                    }
                    break;
                case '/api/assets/remove':
                    if (user) {
                        let editorData = cookieController.getEditor(req)
                        if (editorData) {
                            let response = editorController.assetRemove(editorData.projectid, data.type, data.name)
                            res.json(response)
                        } else {
                            res.json({ error: 'no editor' })
                        } 
                    }
                    break;
                case '/api/auth/update':
                    if (user) {
                        if (data.username.trim() == '' || data.oldPassword.trim() == '' || data.newPassword.trim() == '') {
                            res.json({ error: 'invalid credentials' })
                        } else {
                            let userData = authController.verify('', data.oldPassword)
                            if (userData) {
                                authController.update(data.username, data.newPassword)

                                res.json({ status: 'success' })
                            } else {
                                res.json({ error: 'invalid credentials' })
                            }
                        }
                    }
            default:
                break;
        }
    }
}

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes/1024/1024;
}