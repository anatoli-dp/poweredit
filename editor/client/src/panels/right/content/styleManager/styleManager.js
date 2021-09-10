import { smEditor } from "./smEditor/smEditor"
import { toCSS, toJSON } from 'cssjson'

export function styleManager (editor, base) {
    let styleManagerContainer = base.newEl('div.ed-sR-content-styleManager')

    let open = false
    let dirty = true

    let lastUpdate = new Date().getTime()

    let smState = {}
    let tempState = {}

    let mediaNames = {}

    let editorOpen = false
    let editorState = ''

    styleManagerContainer.style.display = 'none'
    editor.Commands.add('panel:right:content:style manager', {
        run() {
            styleManagerContainer.style.display = 'block'
            open = true

            if (dirty) {
                smRefresh()
                dirty = false
            }
        },

        stop() {
            editor.trigger('styleManagerEditor:close')
            styleManagerContainer.style.display = 'none'
            open = false
        }
    })

    function updateDeviceNames () {
        mediaNames = {}

        let devices = JSON.parse(JSON.stringify(editor.DeviceManager.getAll()))
        devices.forEach(device => {
            mediaNames['max-width: ' + device.widthMedia] = device.name
        })
    }

    editor.on('component:update', smRefreshTriggers)
    editor.on('update', smRefreshTriggers)
    editor.on('page', smRefreshTriggers)

    function smRefreshTriggers () {
        //if ((new Date().getTime() - lastUpdate) >= 1000) smRefresh()
        smRefresh()
    }

    function smRefresh () {
        if (!open) {
            dirty = true
            return
        }

        updateDeviceNames()

        styleManagerContainer.innerHTML = ''

        tempState = {}

        let queries = smGetSelectors()
        queries.forEach(query => {
            smBuildSelectors(query)
        })

        smState = tempState
        lastUpdate = new Date().getTime()
    }

    function smGetSelectors () {
        let queries = []
        let query = ['base']

        let parts = editor.getCss().split(/{|}/)
        parts.forEach(part => {
            part = part.replace(/\s/g, '')

            if ((part.includes('.') & !part.includes(':')) | (part.includes('#') & !part.includes(':')) | part.includes('@media')) {
                if (part.includes('@media')) {
                    queries.push(query)
                    query = [part]
                } else {
                    query.push(part)
                }
            }
        })
        queries.push(query)

        return queries
    }

    function smBuildSelectors (query) {
        let queryType = query.shift()

        queryType = queryType.replace('@media(', '')
        queryType = queryType.replace(')', '')
        queryType = queryType.replace(':', ': ')

        let queryTypeWrapper = styleManagerContainer.newEl('details')
        let queryTypeName = queryTypeWrapper.newEl('summary')
        
        if (mediaNames[queryType]) {
            queryTypeName.innerHTML = mediaNames[queryType]
        } else if (queryType == 'base') {
            queryTypeName.innerHTML = 'Desktop'
        } else {
            queryTypeName.innerHTML = queryType
        }

        queryTypeWrapper.dataset.media = queryType

        if (smState[queryType] == true) {
            queryTypeWrapper.open = true
            tempState[queryType] = true
        }

        queryTypeWrapper.ontoggle = function (e) {
            let target = e.target

            if (target.open) {
                smState[target.dataset.media] = true
            } else {
                smState[target.dataset.media] = false
            }
        }

        query.forEach(selectors => {
            let selectorWrapper = null

            if (selectors.includes('#')) {
                let selectorSpacer = queryTypeWrapper.newEl('div.selectorSpacer')
                selectorWrapper = selectorSpacer.newEl('div.selectorWrapper')

                let selector = selectors.replace('#', '')
                
                let selectorID = selectorWrapper.newEl('div.selector.selectorID')
                selectorID.innerHTML = selector
            } else {
                let selectorSpacer = queryTypeWrapper.newEl('div.selectorSpacer')
                selectorWrapper = selectorSpacer.newEl('div.selectorWrapper')

                let selectorSet = selectors.split('.')
                selectorSet.forEach(selector => {
                    if (selector != '') {
                        let selectorClass = selectorWrapper.newEl('div.selector.selectorClass')
                        selectorClass.innerHTML = selector
                    }
                })
            }

            selectorWrapper.dataset.selector = selectors

            selectorWrapper.onclick = function (e) {
                editor.trigger('styleManagerEditor:open', {
                    media: e.target.parentElement.parentElement.dataset.media,
                    selector: e.target.dataset.selector,
                    copy: e.target.cloneNode(true)
                })
            }
        })
    }

    smRefresh()
    
    smEditor(editor)
    editor.on('styleManagerEditor:open', function () { editorOpen = true })
    editor.on('styleManagerEditor:close', function () {
        editorOpen = false
        smRefresh()
    })
}