import { code as codeEditor } from '../code/code.js'
import { links as linksEditor } from '../links/links.js'
import { fonts as fontEditor } from '../fonts/fonts.js'

export function switcher (editor, base, canvas, code, links, fonts) {
    let cmd = editor.Commands

    let currentTab = 'canvas'
    let previewMode = false

    let switcherWrapper = base.newEl('div.ed-scs-switcherWrapper')

    let canvasTab = switcherWrapper.newEl('div.switcherTab.selected')
    canvasTab.innerHTML = 'editor'

    let codeTab = switcherWrapper.newEl('div.switcherTab')
    codeTab.innerHTML = 'code'

    let linksTab = switcherWrapper.newEl('div.switcherTab')
    linksTab.innerHTML = 'links'

    let fontsTab = switcherWrapper.newEl('div.switcherTab')
    fontsTab.innerHTML = 'fonts'

    let rteToolbar = editor.RichTextEditor.getToolbarEl()
    rteToolbar.classList.add('rteToolbar')

    let rteEnabled = false
    editor.on('rte:enable', function () {
        rteToolbar.parentElement.removeChild(rteToolbar)
        base.appendChild(rteToolbar)
        rteEnabled = true
    })

    editor.on('rte:disable', function () {
        rteEnabled = false
    })

    var styleObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName === 'style'){
                if (rteEnabled) rteToolbar.removeAttribute('style')
            }
        })
    })
    styleObserver.observe(rteToolbar, {
        attributes: true, 
        attributeFilter: ["style"]
    })

    canvasTab.onclick = function () {
        editor.runCommand('centerSwitcher:tab:editor')
    }

    codeTab.onclick = function () {
        editor.runCommand('centerSwitcher:tab:code')
    }

    linksTab.onclick = function () {
        editor.runCommand('centerSwitcher:tab:links')
    }

    fontsTab.onclick = function () {
        editor.runCommand('centerSwitcher:tab:fonts')
    }

    editor.Commands.add('centerSwitcher:tab:editor', function () {
        if (!previewMode) currentTab = 'canvas'

        canvas.style.zIndex = 1
        canvasTab.classList.add('selected')

        code.style.zIndex = 0
        codeTab.classList.remove('selected')

        links.style.zIndex = 0
        linksTab.classList.remove('selected')

        fonts.style.visibility = 'hidden'
        fonts.style.zIndex = 0
        fontsTab.classList.remove('selected')

        editor.refresh()
    })

    editor.Commands.add('centerSwitcher:tab:code', function () {
        if (!previewMode) currentTab = 'code'

        canvas.style.zIndex = 0
        canvasTab.classList.remove('selected')

        code.style.zIndex = 1
        codeTab.classList.add('selected')

        links.style.zIndex = 0
        linksTab.classList.remove('selected')

        fonts.style.visibility = 'hidden'
        fonts.style.zIndex = 0
        fontsTab.classList.remove('selected')
    })

    editor.Commands.add('centerSwitcher:tab:links', function () {
        if (!previewMode) currentTab = 'links'

        canvas.style.zIndex = 0
        canvasTab.classList.remove('selected')

        code.style.zIndex = 0
        codeTab.classList.remove('selected')

        links.style.zIndex = 1
        linksTab.classList.add('selected')

        fonts.style.visibility = 'hidden'
        fonts.style.zIndex = 0
        fontsTab.classList.remove('selected')

        editor.trigger('linksLocationsRefresh')
    })

    editor.Commands.add('centerSwitcher:tab:fonts', function () {
        if (!previewMode) currentTab = 'fonts'

        canvas.style.zIndex = 0
        canvasTab.classList.remove('selected')

        code.style.zIndex = 0
        codeTab.classList.remove('selected')

        links.style.zIndex = 0
        linksTab.classList.remove('selected')

        fonts.style.visibility = 'visible'
        fonts.style.zIndex = 1
        fontsTab.classList.add('selected')

        document.querySelector('#app .fonts').style.height = ''
        editor.trigger('fontsSearchSelect')
    })

    editor.on('run:core:preview:before', function () {
        previewMode = true

        if (currentTab != 'canvas') {
            editor.runCommand('centerSwitcher:tab:editor')
        }
    })

    editor.on('stop:core:preview:before', function () {
        if (currentTab == 'code') {
            editor.runCommand('centerSwitcher:tab:code')
        } else if (currentTab == 'links') {
            editor.runCommand('centerSwitcher:tab:links')
        } else if (currentTab == 'fonts') {
            editor.runCommand('centerSwitcher:tab:fonts')
        }

        previewMode = false
    })

    codeEditor(editor, code)
    linksEditor(editor, links)
    fontEditor(editor, fonts)

    editor.runCommand('centerSwitcher:tab:editor')
}