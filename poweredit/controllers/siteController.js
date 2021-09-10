const { dbController } = require('./dbController')

exports.siteController = {
    projectsGetAll: function () {
        return dbController.projectsGetAll()
    },

    projectsAdd: function (name, url) {
        return dbController.projectsAdd(name, url, generateID())
    },

    projectsDelete: function (projectName) {
        let projectData = dbController.projectsGet(projectName)

        let projectid = projectData.projectid
        let response = dbController.projectsDelete(projectid)

        if (response) {
            return true
        } else {
            return false
        }
    },

    projectsEdit: function (projectid, name, url) {
        return dbController.projectsEdit(projectid, name, url)
    },

    projectsSetLive: function (projectid, value) {
        return dbController.projectsSetLive(projectid, value)
    },

    sitesGetAll: function (projectid) {
        let siteData = dbController.sitesGetAll(projectid)

        if (siteData) {
            siteData.forEach(site => {
                delete site.html
                delete site.css
                delete site.assets
                delete site.components
                delete site.styles
                delete site.page
                delete site.fonts
            })
        }

        return siteData
    },

    sitesAdd: function (projectid, name, location) {
        return dbController.sitesAdd(projectid, name, location)
    },

    sitesDelete: function (projectid, name) {
        return dbController.sitesDelete(projectid, name)
    },

    sitesEdit: function (projectid, originalname, name, location) {
        return dbController.sitesEdit(projectid, originalname, name, location)
    },

    sitesSetActive: function (projectid, name, value) {
        return dbController.sitesSetActive(projectid, name, value)
    }
}

function generateID () {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}