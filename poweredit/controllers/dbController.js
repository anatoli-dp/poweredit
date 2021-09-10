const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const dbPath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'database' + path.sep
const pagesPath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'pages' + path.sep
const imagesPath = process.env.APPDATA + path.sep + 'PowerEdit' + path.sep + 'images' + path.sep

fs.mkdirSync(dbPath, { recursive: true })
fs.mkdirSync(pagesPath, { recursive: true })
fs.mkdirSync(imagesPath, { recursive: true })

let authExists = true
if (!fs.existsSync(dbPath + 'auth.sqlite3')) {
    authExists = false
}

let projectsExists = true
if (!fs.existsSync(dbPath + 'projects.sqlite3')) {
    projectsExists = false
}

const dbAuth = new Database(dbPath + 'auth.sqlite3')
if (!authExists) {
    dbAuth.prepare('CREATE TABLE auth (username STRING, password STRING, userlevel STRING)').run()
    dbAuth.prepare('INSERT INTO auth (username, password, userlevel) VALUES (?,?,?)')
    .run('admin', 'sQnzu7wkTrgkQZF+0G1hi5AI3Qmzvv0bXgc5THBqi7mAsdd4Xll27ASbRt9fEyavWi6m0QP9B8lThf+rDKy8hg==', 'admin')
}

const dbProjects = new Database(dbPath + 'projects.sqlite3')
if (!projectsExists) dbProjects.prepare('CREATE TABLE projects (name STRING, url STRING, live BOOLEAN, projectid STRING UNIQUE, hasIndex BOOLEAN)').run()

exports.dbController = {
    authGetUser: function (username) {
        let userData = dbAuth.prepare('SELECT * FROM auth WHERE username=?')
        .get(username)

        if (userData) {
            return userData
        } else {
            return null
        }
    },

    authSetUser: function (oldUsername, newUsername, newPassword) {
        let NewUsername = oldUsername
        if (newUsername != '') NewUsername = newUsername

        let action = dbAuth.prepare('UPDATE auth SET username=?, password=? WHERE username=?')
        .run(NewUsername, newPassword, oldUsername)
    },

    projectsGetAll: function () {
        let projectData = dbProjects.prepare('SELECT * from projects')
        .all()

        if (projectData) {
            return projectData
        } else {
            return null
        }
    },

    projectsGet: function (projectName) {
        let project = dbProjects.prepare('SELECT * FROM projects WHERE name=?')
        .get(projectName)

        if (project) {
            return project
        } else {
            return null
        }
    },

    projectsAdd: function (name, url, projectid) {
        let project = dbProjects.prepare('SELECT name FROM projects WHERE name=?')
        .get(name)

        if (project) {
            return { error: 'duplicate name' }
        } else {
            let success = false
            try {
                dbProjects.prepare(`INSERT INTO projects (name, url, live, projectid) VALUES (?,?,${false},?)`)
                .run(name, url, projectid)

                fs.mkdirSync(pagesPath + projectid + path.sep, { recursive: true })
                fs.mkdirSync(imagesPath + projectid + path.sep, { recursive: true })

                let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)
                siteDatabase.prepare('CREATE TABLE sites (name STRING, location STRING, active BOOLEAN, html STRING, css STRING, assets STRING, components STRING, styles STRING, fonts STRING, page STRING)').run()
                siteDatabase.close()

                /*let imageDatabase = new Database(imagesPath + `${projectid}` + path.sep + 'images.sqlite3')
                imageDatabase.prepare('CREATE TABLE images (name STRING, location STRING)').run()
                imageDatabase.close()*/

                success = true
            } catch (err) {
                console.log(err)
            }

            if (success) {
                return { status: 'success' }
            } else {
                return { status: 'fail' }
            }
        }
    },

    projectsDelete: function (projectid) {
        let success = false
        try {
            dbProjects.prepare('DELETE FROM projects WHERE projectid=?')
            .run(projectid)

            if (fs.existsSync(dbPath + `${projectid}.sqlite3`)) {
                fs.rmSync(dbPath + `${projectid}.sqlite3`)
            }

            if (fs.existsSync(pagesPath + projectid + path.sep)) {
                fs.rmdirSync(pagesPath + projectid + path.sep, { recursive: true })
            }

            if (fs.existsSync(imagesPath + projectid + path.sep)) {
                fs.rmdirSync(imagesPath + projectid + path.sep, { recursive: true })
            }

            success = true
        } catch (err) {
            console.log(err)
        }

        return success
    },

    projectsEdit: function (projectid, name, url) {
        let action = dbProjects.prepare('UPDATE projects SET name=?, url=? WHERE projectid=?')
        .run(name, url, projectid)

        if (action.changes == 1) {
            return true
        } else {
            return false
        }
    },

    projectsSetLive: function (projectid, value) {
        let succeed = false

        try {
            dbProjects.prepare(`UPDATE projects SET live=${value} WHERE projectid=?`)
            .run(projectid)

            succeed = true
        } catch (err) {
            console.log(err)
        }

        return succeed
    },

    sitesGetAll: function (projectid) {
        let siteData = []
        let success = false
        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)
            
            siteData = siteDatabase.prepare('SELECT * FROM sites')
            .all()

            siteDatabase.close()

            if (siteData.length != 0) {
                success = true
            }
        } catch (err) {
            console.log(err)
        }

        if (success) {
            return siteData
        } else {
            return null
        }
    },

    sitesGet: function (projectid, siteName) {
        //
    },

    sitesAdd: function (projectid, name, location) {
        let error = null
        let success = false
        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let site = siteDatabase.prepare('SELECT name FROM sites WHERE name=?')
            .get(name)

            if (site) {
                error = 'duplicate name'
            } else {
                let response = siteDatabase.prepare(`INSERT INTO sites (name, location, active) VALUES (?,?,${false})`)
                .run(name, location)

                if (response.changes == 1) {
                    success = true
                }
            }

            siteDatabase.close()
        } catch (err) {
            console.log(err)
        }

        if (error) {
            return {  error: error }
        } else {
            if (success) {
                return { status: 'success' }
            } else {
                return { status: 'fail' }
            }
        }
    },

    sitesDelete: function (projectid, siteName) {
        let success = false
        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let pageData = siteDatabase.prepare('SELECT page FROM sites WHERE name=?')
            .get(siteName)

            if (pageData.page) {
                if (fs.existsSync(pagesPath + projectid + path.sep + `${pageData.page}.html`)) {
                    fs.rmSync(pagesPath + projectid + path.sep + `${pageData.page}.html`)
                }
            }

            siteDatabase.prepare('DELETE FROM sites WHERE name=?')
            .run(siteName)

            siteDatabase.close()

            success = true
        } catch (err) {
            console.log(err)
        }

        return success
    },

    sitesEdit: function (projectid, siteOriginalName, siteName, siteLocation) {
        let success = false

        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let action = siteDatabase.prepare('UPDATE sites SET name=?, location=? WHERE name=?')
            .run(siteName, siteLocation, siteOriginalName)

            siteDatabase.close()

            if (action.changes == 1) {
                success = true
            }
        } catch (err) {
            console.log(err)
        }

        return success
    },

    sitesSetActive: function (projectid, name, value) {
        let success = false

        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let action = siteDatabase.prepare(`UPDATE sites SET active=${value} WHERE name=?`)
            .run(name)

            siteDatabase.close()

            if (action.changes == 1) {
                success = true
            }
        } catch (err) {
            console.log(err)
        }

        return success
    },

    editorLoad: function (projectid, name) {
        let finalData = {}
        let success = false

        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)
            
            let keys = [/*'gjs-html','gjs-css',*/'gjs-assets','gjs-components','gjs-styles', 'fonts']
            keys.forEach(key => {
                let data = ''

                switch (key) {
                    case 'gjs-html':
                        data = siteDatabase.prepare('SELECT html FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.html
                        break;
                    case 'gjs-css':
                        data = siteDatabase.prepare('SELECT css FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.css
                        break;
                    case 'gjs-assets':
                        data = siteDatabase.prepare('SELECT assets FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.assets
                        break;
                    case 'gjs-components':
                        data = siteDatabase.prepare('SELECT components FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.components
                        break;
                    case 'gjs-styles':
                        data = siteDatabase.prepare('SELECT styles FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.styles
                        break;
                    case 'fonts':
                        data = siteDatabase.prepare('SELECT fonts FROM sites WHERE name=?')
                        .get(name)

                        finalData[key] = data.fonts
                        break;
                }
            })

            success = true
        } catch (err) {
            console.log(err)
        }

        if (success) {
            return finalData
        } else {
            return null
        }
    },

    editorStore: function (projectid, name, data) {
        let success = false
        
        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            for (let key in data) {
                switch (key) {
                    case 'gjs-html':
                        siteDatabase.prepare('UPDATE sites SET html=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    case 'gjs-css':
                        siteDatabase.prepare('UPDATE sites SET css=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    case 'gjs-assets':
                        siteDatabase.prepare('UPDATE sites SET assets=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    case 'gjs-components':
                        siteDatabase.prepare('UPDATE sites SET components=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    case 'gjs-styles':
                        siteDatabase.prepare('UPDATE sites SET styles=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    case 'fonts':
                        siteDatabase.prepare('UPDATE sites SET fonts=? WHERE name=?')
                        .run(data[key], name)
                        break;
                    default:
                        break;
                }
            }

            siteDatabase.close()
            success = true
        } catch (err) {
            console.log(err)
        }

        return success
    },

    editorPublish: function (projectid, name) {
        let success = true

        try {
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let dataSet = siteDatabase.prepare('SELECT html, css, page FROM sites WHERE name=?')
            .get(name)

            if (!dataSet.html) dataSet.html = ''
            if (!dataSet.css) dataSet.css = ''

            let finalString = '<!DOCTYPE html><html><head><style>' + dataSet.css + '</style></head><body>' + dataSet.html + '</body></html>'

            let pageID = ''
            if (dataSet.page) {
                pageID = dataSet.page
            } else {
                pageID = generateID()
            }

            let pagePath = pagesPath + projectid + path.sep

            fs.writeFileSync(pagePath + pageID + '.html', finalString)

            siteDatabase.prepare('UPDATE sites SET page=? WHERE name=?')
            .run(pageID, name)

            siteDatabase.close()

            success = true
        } catch (err) {
            console.log(err)
        }

        return success
    },

    imageAdd: function (projectid, name, data) {
        let success = false
        let locationPath = imagesPath + `${projectid}` + path.sep

        try {
            let base64Data = data.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
            fs.writeFileSync(locationPath + name, base64Data, 'base64')

            /*let imageDatabase = new Database(locationPath + 'images.sqlite3')
            imageDatabase.prepare('INSERT INTO images (name, location) VALUES (?,?)')
            .run(name, locationPath + name)
            imageDatabase.close()*/

            success = true
        } catch (err) {
            console.log(err)
        }

        if (success) {
            return { location: projectid }
        } else {
            return { error: 'unable to add image' }
        }
    },

    imageRemove: function (projectid, name) {
        let success = false

        try {
            let locationPath = imagesPath + `${projectid}` + path.sep + name

            if (fs.existsSync(locationPath)) {
                fs.rmSync(locationPath)
            }

            success = true
        } catch (err) {
            console.log(err)
        }

        if (success) {
            return { status: 'success' }
        } else {
            return { error: 'unable to remove image' }
        }
    },

    hostGet: function (host, url) {
        let projectData = dbProjects.prepare(`SELECT projectid FROM projects WHERE url=? AND live=${true}`)
        .get(host)

        if (projectData) {
            let projectid = projectData.projectid
            let siteDatabase = new Database(dbPath + `${projectid}.sqlite3`)

            let siteData = null
            if (fs.existsSync(dbPath + 'auth.sqlite3')) {
                siteData = siteDatabase.prepare(`SELECT page FROM sites WHERE location=? AND active=${true}`)
                .get(url)

                siteDatabase.close()
            }

            if (siteData) {
                return {
                    projectid: projectid,
                    page: siteData.page
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }
}

function generateID () {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}