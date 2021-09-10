export function links (editor, base) {
    let linksWrapper = base.newEl('div.linksEditorWrapper')

    let linksAddWrapper = linksWrapper.newEl('div.linksAddWrapper')
    let linksDisplayWrapper = linksWrapper.newEl('div.linksDisplayWrapper')
    //fonts section
    let linksAddFonts = linksAddWrapper.newEl('div.linksAddSection')

    let linksAddFontsButton = linksAddFonts.newEl('div.linksAddButton')
    linksAddFontsButton.innerHTML = 'add font'

    let linksAddFontsLink = linksAddFonts.newEl('div.linksSectionSubTitle')
    linksAddFontsLink.innerHTML = 'font url'

    let linksAddFontsLinkInput = linksAddFonts.newEl('input.linksAddInput')
    linksAddFontsLinkInput.setAttribute('type', 'text')
    linksAddFontsLinkInput.value = ''

    let linksAddFontFamily = linksAddFonts.newEl('div.linksSectionSubTitle')
    linksAddFontFamily.innerHTML = 'font-family'

    let linksAddFontFamilyInput = linksAddFonts.newEl('input.linksAddInput')
    linksAddFontFamilyInput.setAttribute('type', 'text')
    linksAddFontFamilyInput.value = ''

    let linksAddFontName = linksAddFonts.newEl('div.linksSectionSubTitle')
    linksAddFontName.innerHTML = 'font name'

    let linksAddFontNameInput = linksAddFonts.newEl('input.linksAddInput')
    linksAddFontNameInput.setAttribute('type', 'text')
    linksAddFontNameInput.value = ''

    linksAddFontsButton.onclick = function () {
        editor.trigger('linksAddFont', linksAddFontsLinkInput.value, linksAddFontFamilyInput.value, linksAddFontNameInput.value)
    }

    //styles section
    let linksAddStyles = linksAddWrapper.newEl('div.linksAddSection')

    let linksAddStylesButton = linksAddStyles.newEl('div.linksAddButton')
    linksAddStylesButton.innerHTML = 'add stylesheet'

    let linksAddStylesLink = linksAddStyles.newEl('div.linksSectionSubTitle')
    linksAddStylesLink.innerHTML = 'stylesheet url'

    let linksAddStylesLinkInput = linksAddStyles.newEl('input.linksAddInput')
    linksAddStylesLinkInput.setAttribute('type', 'text')
    linksAddStylesLinkInput.value = ''

    linksAddStylesButton.onclick = function () {
        editor.trigger('linksAddStyle', linksAddStylesLinkInput.value)
    }

    //scripts section
    let linksAddScripts = linksAddWrapper.newEl('div.linksAddSection')

    let linksAddScriptsButton = linksAddScripts.newEl('div.linksAddButton')
    linksAddScriptsButton.innerHTML = 'add script'

    let linksAddScriptsLink = linksAddScripts.newEl('div.linksSectionSubTitle')
    linksAddScriptsLink.innerHTML = 'script url'

    let linksAddScriptsLinkInput = linksAddScripts.newEl('input.linksAddInput')
    linksAddScriptsLinkInput.setAttribute('type', 'text')
    linksAddScriptsLinkInput.value = ''

    linksAddScriptsButton.onclick = function () {
        editor.trigger('linksAddScript', linksAddScriptsLinkInput.value)
    }
    
    //other stuffs
    let locations = []

    //build link list
    editor.on('buildLinksList', function () {
        linksDisplayWrapper.innerHTML = ''

        let count = 0

        locations.forEach(component => {
            let attributes = component.attributes
            let isFont = false

            let linkDisplayWrapper = linksDisplayWrapper.newEl('div.linkDisplayWrapper')

            let linkDisplayType = linkDisplayWrapper.newEl('div.linkDisplayType')
            
            if (attributes.tagName == 'script') {
                linkDisplayType.innerHTML = 'script'
            } else if (attributes.tagName == 'link') {
                if (editor.storedFonts[attributes.attributes.href]) {
                    isFont = true
                    linkDisplayType.innerHTML = 'font'
                } else {
                    linkDisplayType.innerHTML = 'link'
                }
            }

            let linkDisplayDelete = linkDisplayWrapper.newEl('i.fas.fa-trash.linkDisplayDelete')
            linkDisplayDelete.onclick = function () {
                editor.trigger('linksRemove', component)
                if (isFont) editor.trigger('editorRemoveFont', attributes.attributes.href)
            }

            let linkDisplayDown = linkDisplayWrapper.newEl('i.fas.fa-arrow-down.linkDisplayDown')
            linkDisplayDown.onclick = function () {
                editor.trigger('linksMoveDown', component)
            }

            let linkDisplayUp = linkDisplayWrapper.newEl('i.fas.fa-arrow-up.linkDisplayUp')
            linkDisplayUp.onclick = function () {
                editor.trigger('linksMoveUp', component)
            }

            let linkDisplayContent = linkDisplayWrapper.newEl('input.linkDisplayContent')
            linkDisplayContent.setAttribute('type', 'text')
            linkDisplayContent.setAttribute('readonly', 'true')

            if (attributes.tagName == 'script') {
                linkDisplayContent.value = attributes.attributes.src
            } else if (attributes.tagName == 'link') {
                linkDisplayContent.value = attributes.attributes.href
            }

            count++
        })
    })

    //triggers
    editor.on('linksAddFont', function (url, fontFamily, fontName) {
        let urlText = url.trim()
        let fontFamilyText = fontFamily.trim()
        let fontNameText = fontName.trim()

        if (urlText != '' && fontFamilyText != '' && fontNameText != '') {
            editor.trigger('linksAddStyle', url)

            editor.trigger('linksLocationsRefresh')

            editor.trigger('editorStoreFont', url, fontFamily, fontName)
            editor.trigger('updateStylesFonts')
        }
    })

    editor.on('linksAddStyle', function (url) {
        let urlText = url.trim()

        if (urlText != '') {
            editor.addComponents(`<link rel="stylesheet" href="${url}"/>`, {
                at : locations.length
            })[0].set({
                layerable: false
            })

            editor.trigger('linksLocationsRefresh')
        }
    })

    editor.on('linksAddScript', function (url) {
        let urlText = url.trim()

        if (urlText != '') {
            editor.addComponents(`<script src="${urlText}" type="text/javascript" defer></script>`, {
                at : locations.length
            })

            editor.trigger('linksLocationsRefresh')
        }
    })

    editor.on('linksRemove', function (component) {
        component.remove()

        editor.trigger('linksLocationsRefresh')
    })

    editor.on('linksMoveDown', function (component) {
        let index = locations.indexOf(component)

        if (locations[index + 1]) {
            component.remove({ temporary: true })
            editor.getWrapper().append(component, { at: index + 1 })
        }

        editor.trigger('linksLocationsRefresh')
    })

    editor.on('linksMoveUp', function (component) {
        let index = locations.indexOf(component)

        if (index > 0) {
            component.remove({ temporary: true })
            editor.getWrapper().append(component, { at: index - 1 })
        }

        editor.trigger('linksLocationsRefresh')
    })

    editor.on('linksLocationsRefresh', function () {
        locations = []
        
        let end = false
        editor.getComponents().forEach(component => {
            if (!end) {
                let attributes = component.attributes

                if (attributes.tagName == 'link' || attributes.tagName == 'script') {
                    locations.push(component)
                } else {
                    end = true
                }
            }
        })

        linksAddFontsLinkInput.value = ''
        linksAddFontFamilyInput.value = ''
        linksAddFontNameInput.value = ''
        linksAddStylesLinkInput.value = ''
        linksAddScriptsLinkInput.value = ''

        editor.trigger('buildLinksList')
    })
}