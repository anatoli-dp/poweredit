import { titlebar } from './titlebar/titlebar'
import { tabs } from './tabs/tabs'
import { content } from './content/content'

export function right (base) {
    this.base = base

    this.block = base.newEl('div.ed-gjs-block')
    this.selector = base.newEl('div.ed-gjs-selector')
    this.style = base.newEl('div.ed-gjs-style')
    this.trait = base.newEl('div.ed-gjs-trait')
}

right.prototype.init = function (editor, structRight, structCenter) {
    let lockState = true
    let isOpen = false

    this.block.parentElement.removeChild(this.block)
    this.selector.parentElement.removeChild(this.selector)
    this.style.parentElement.removeChild(this.style)
    this.trait.parentElement.removeChild(this.trait)

    const cmd = editor.Commands

    cmd.add('panel:right:close', function (editor) {
        structRight.classList.remove('ed-structRight-open')
        structRight.classList.add('ed-structRight-close')

        structCenter.classList.remove('ed-structCenter-openRight')
        structCenter.classList.add('ed-structCenter-closeRight')

        editor.trigger('change:device')
        editor.refresh()

        isOpen = false
    })

    cmd.add('panel:right:open', function (editor) {
        structRight.classList.remove('ed-structRight-close')
        structRight.classList.add('ed-structRight-open')

        if (lockState) {
            structCenter.classList.remove('ed-structCenter-closeRight')
            structCenter.classList.add('ed-structCenter-openRight')
        }

        editor.trigger('change:device')
        editor.refresh()

        isOpen = true
    })

    editor.on('panel:right:unlock', function () {
        lockState = false

        if (isOpen) {
            structCenter.classList.remove('ed-structCenter-openRight')
            structCenter.classList.add('ed-structCenter-closeRight')
            editor.refresh()
        }
    })

    editor.on('panel:right:lock', function () {
        lockState = true

        if (isOpen) {
            structCenter.classList.remove('ed-structCenter-closeRight')
            structCenter.classList.add('ed-structCenter-openRight')
            editor.refresh()
        }
    })

    titlebar(editor, this.base)
    tabs(editor, this.base)
    content(editor, this.base, this.block, this.selector, this.style, this.trait)
}