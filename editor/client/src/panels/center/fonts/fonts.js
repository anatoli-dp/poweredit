export function fonts (editor, base) {
    let fontsWrapper = base.newEl('div.fontSearchWrapper')

    let fontsModal = null
    let importButton = null

    let initialLoad = true

    editor.on('fontsSearchSelect', function () {
        if (initialLoad) {
            fontsModal = document.querySelector('.fontSearchWrapper #app .modal .modal-inner')

            importButton = fontsModal.newEl('div.fontsImportButton')
            importButton.innerHTML = 'import to page'

            importButton.onclick = function () {
                let linkValue = document.querySelector('p[data-reactid=".0.2.1.1.0"] input').value.split("'")[1]
                let fontFamilyValue = document.querySelector('p[data-reactid=".0.2.1.1.2"] input').value.replace('font-family: ', '').replace(';', '')
                let fontNameValue = document.querySelector('a[data-reactid=".0.2.1.0.0"]').innerHTML

                editor.trigger('linksAddFont', linkValue, fontFamilyValue, fontNameValue)

                alert('font imported')
            }

            /*var prevClassState = fontsModal.classList.contains('show');
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.attributeName == "class"){
                        var currentClassState = mutation.target.classList.contains('show')
                        if(prevClassState !== currentClassState)    {
                            prevClassState = currentClassState;
                            if(currentClassState) {
                                showImportButton()
                            } else {
                                hideImportButton()
                            }
                        }
                    }
                })
            })

            observer.observe(fontsModal, {attributes: true})*/

            initialLoad = false
        }
    })

    editor.on('editorStoreFont', function (url, family, name) {
        editor.storedFonts[url] = {
            family: family,
            name: name
        }
    })

    editor.on('editorRemoveFont', function (url) {
        if ( editor.storedFonts[url]) {
            delete editor.storedFonts[url]
        }

        editor.trigger('updateStylesFonts')
    })

    editor.on('updateStylesFonts', function () {
        let finalFonts = [
            {value: 'Arial, Helvetica, sans-serif', name: 'Arial'},
            {value: 'Arial Black, Gadget, sans-serif', name: 'Arial Black'},
            {value: 'Brush Script MT, sans-serif', name: 'Brush Script MT'},
            {value: 'Comic Sans MS, cursive, sans-serif', name: 'Comic Sans MS'},
            {value: 'Courier New, Courier, monospace', name: 'Courier New'},
            {value: 'Georgia, serif', name: 'Georgia'},
            {value: 'Helvetica, sans-serif', name: 'Helvetica'},
            {value: 'Impact, Charcoal, sans-serif', name: 'Impact'},
            {value: 'Lucida Sans Unicode, Lucida Grande, sans-serif', name: 'Lucida Sans Unicode'},
            {value: 'Tahoma, Geneva, sans-serif', name: 'Tahoma'},
            {value: 'Times New Roman, Times, serif', name: 'Times New Roman'},
            {value: 'Trebuchet MS, Helvetica, sans-serif', name: 'Trebuchet MS'},
            {value: 'Verdana, Geneva, sans-serif', name: 'Verdana'}
        ]

        if (editor.storedFonts) {
            for (const [key, value] of Object.entries(editor.storedFonts)) {
                finalFonts.push({
                    value: value.family,
                    name: value.name
                })
            }
        }

        editor.StyleManager.removeProperty('typography', 'font-family')
        editor.StyleManager.addProperty('typography', {
            name: 'Font family',
            property: 'font-family',
            type: 'select',
            list: finalFonts
        }, { at: 0 })
    })
}