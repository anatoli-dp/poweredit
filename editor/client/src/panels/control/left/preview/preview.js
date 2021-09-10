export function preview (editor, base) {
    let previewWrapper = base.newEl('div.ed-sC-left-menu.ed-sC-panelButton-left.ed-sC-item.previewWrapper')
    

    editor.Panels.addPanel({
        id: 'ed-sC-left-menu.previewWrapper',
        el: '.ed-sC-left-menu.previewWrapper',
        buttons: [
            {
                id: 'previewButton',
                active: false,
                className: 'fas fa-eye',
                command: 'core:preview'
            }
        ]
    })

    const sT = document.querySelector('.ed-structTop')
    const sB = document.querySelector('.ed-structBottom')
    const sL = document.querySelector('.ed-structLeft')
    const sC = document.querySelector('.ed-structCenter')
    const sR = document.querySelector('.ed-structRight')
    const sCenterSwitcher = document.querySelector('.ed-structCenterSwitcher')
    const sCenterWrapper = document.querySelector('.ed-structCenterWrapper')
    const sPath = document.querySelector('.ed-structPath')

    let hasOutline = false
    let hasOutlineWait = false
    editor.on('run:core:component-outline', function () {
        hasOutline = true
    })
    editor.on('stop:core:component-outline', function () {
        hasOutline = false
    })

    editor.on('run:core:preview:before', function () {
        sT.style.display = 'none'
        sL.style.display = 'none'
        sR.style.display = 'none'
        sPath.style.display = 'none'

        sB.style.top = '0px'
        sCenterWrapper.style.top = '0px'
        sCenterWrapper.style.bottom = '0px'
        sCenterWrapper.style.borderRadius = '0px'
        sC.style.left = '0px'
        sC.style.right = '0px'

        sCenterSwitcher.style.display = 'none'

        if (hasOutline) {
            hasOutlineWait = true
            editor.Commands.stop('core:component-outline')
        }
    })

    editor.on('stop:core:preview', function () {
        sT.style.display = 'block'
        sL.style.display = 'block'
        sR.style.display = 'block'
        sPath.style.display = 'block'

        sB.removeAttribute('style')
        sCenterWrapper.removeAttribute('style')
        sC.removeAttribute('style')

        sCenterSwitcher.removeAttribute('style')

        if (hasOutlineWait) editor.Commands.run('core:component-outline')
    })
}