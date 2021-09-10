const { dbController } = require('./dbController')

exports.editorController = {
    load: function (projectid, name) {
        return dbController.editorLoad(projectid, name)
    },

    store: function (projectid, name, data) {
        return dbController.editorStore(projectid, name, data)
    },

    publish: function (projectid, name) {
        return dbController.editorPublish(projectid, name)
    },

    assetAdd: function (projectid, type, name, data) {
        switch (type) {
            case 'image':
                return dbController.imageAdd(projectid, name, data)
                break;
            default:
                break;
        }
    },

    assetRemove: function (projectid, type, name) {
        switch (type) {
            case 'image':
                return dbController.imageRemove(projectid, name)
                break;
            default:
                break;
        }
    }
}