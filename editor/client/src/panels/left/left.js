import { titlebar } from "./titlebar/titlebar"
import { tabs } from "./tabs/tabs"
import { content } from "./content/content"

export function left (base) {
    this.base = base

    this.layer = base.newEl('div.ed-gjs-layer')
}

left.prototype.init = function (editor, structLeft, structCenter) {
    let lockState = true
    let isOpen = false

    this.layer.parentElement.removeChild(this.layer)

    const cmd = editor.Commands

    cmd.add('panel:left:close', function (editor) {
        structLeft.classList.remove('ed-structLeft-open')
        structLeft.classList.add('ed-structLeft-close')

        structCenter.classList.remove('ed-structCenter-openLeft')
        structCenter.classList.add('ed-structCenter-closeLeft')

        editor.trigger('change:device')
        editor.refresh()

        isOpen = false
    })

    cmd.add('panel:left:open', function (editor) {
        structLeft.classList.remove('ed-structLeft-close')
        structLeft.classList.add('ed-structLeft-open')

        if (lockState) {
            structCenter.classList.remove('ed-structCenter-closeLeft')
            structCenter.classList.add('ed-structCenter-openLeft')
        }

        editor.trigger('change:device')
        editor.refresh()

        isOpen = true
    })

    editor.on('panel:left:unlock', function () {
        lockState = false

        if (isOpen) {
            structCenter.classList.remove('ed-structCenter-openLeft')
            structCenter.classList.add('ed-structCenter-closeLeft')
            editor.refresh()
        }
    })

    editor.on('panel:left:lock', function () {
        lockState = true

        if (isOpen) {
            structCenter.classList.remove('ed-structCenter-closeLeft')
            structCenter.classList.add('ed-structCenter-openLeft')
            editor.refresh()
        }
    })

    titlebar(editor, this.base)
    tabs(editor, this.base)
    content(editor, this.base, this.layer)
}