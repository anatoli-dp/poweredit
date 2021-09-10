let currentStore = {}
let storeCount = 0

export default (editor, options = {}) => {
    editor.StorageManager.add('powereditStore', {
        load: function (keys, clb, clbErr) {
            editor.trigger('loader:start')
            fetch(window.location.origin + '/api/editor/load', {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(res => {
                if (res.error) {
                    window.location.href = window.location.origin + '/dashboard'
                } else {
                    keys.forEach(key => {
                        currentStore[key] = res.data[key]
                    })

                    if (res.data.fonts) {
                        editor.storedFonts = JSON.parse(res.data.fonts)
                    } else {
                        editor.storedFonts = {}
                    }

                    clb(currentStore)

                    console.log(currentStore)
                    console.log(editor.storedFonts)
                    
                    editor.trigger('updateStylesFonts')
                    editor.trigger('loader:stop')
                }
            })
        },

        store: function (data, clb, clbErr) {
            if (Object.keys(data) == 0) {
                setAssets()
                storeStuffs(clb, editor.storedFonts)
            } else {
                currentStore = data
                setAssets()
            }

            storeCount++
            if (storeCount >= 0) {
                storeStuffs(clb, editor.storedFonts)
            }
        }
    })

    function setAssets () {
        let assetModels = editor.AssetManager.getAll().models
        let assetStore = []

        assetModels.forEach(asset => {
            assetStore.push(asset.attributes)
        })

        currentStore['gjs-assets'] = JSON.stringify(assetStore)
    }

    editor.on('getStoredFonts', function () {
        return { test: 'test' }
    })

    editor.on('main:store', function () {
        editor.trigger('loader:start')
        editor.StorageManager.store()
        editor.trigger('loader:stop')
    })

    /*editor.on('main:publish', function () {
        alert('publish called')
    })*/

    editor.on('asset:add', function (m) {
        editor.trigger('loader:start')

        let attributes = m.attributes

        if (attributes.src.includes('data:image')) {
            editor.AssetManager.remove(attributes.src)

            if (attributes.type == 'image') {
                fetch(window.location.origin + '/api/assets/add', {
                    method: 'POST',
                    credentials: "include",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'image',
                        name: attributes.name,
                        data: attributes.src
                    })
                })
                .then(response => response.json())
                .then(res => {
                    if (res.error) {
                        alert(res.error)
                    } else {
                        editor.AssetManager.add({
                            name: attributes.name,
                            src: `./${res.location}/${attributes.name}`
                        })

                        editor.trigger('loader:stop')
                    }
                })
            }
        } else {
            editor.trigger('loader:stop')
        }
    })

    editor.on('asset:remove', function (m) {
        editor.trigger('loader:start')

        let attributes = m.attributes

        if (!attributes.src.includes('data:image')) {
            if (attributes.src.includes('./')) {
                if (attributes.type == 'image') {
                    fetch(window.location.origin + '/api/assets/remove', {
                        method: 'POST',
                        credentials: "include",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'image',
                            name: attributes.name
                        })
                    })
                    .then(response => response.json())
                    .then(res => {
                        if (res.error) {
                            alert(res.error)
                            
                            editor.AssetManager.add({
                                name: attributes.name,
                                src: attributes.src
                            })
                        }
        
                        editor.trigger('loader:stop')
                    })
                } else {
                    editor.trigger('loader:stop')
                }
            }
        }

        editor.trigger('loader:stop')
    })
}

function storeStuffs (clb, storedFonts) {
    storeCount = 0
    currentStore.fonts = JSON.stringify(storedFonts)

    fetch(window.location.origin + '/api/editor/store', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentStore)
    })
    .then(response => response.json())
    .then(res => {
        if (res.error) {
            window.location.href = window.location.origin + '/dashboard'
        } else {
            clb()
        }
    })
}