import { left } from "../control/left/left"
import { right } from "../control/right/right"

export function control (base) {
    this.base = base

    this.Left = base.newEl('div.ed-sC-left')
    this.Right = base.newEl('div.ed-sC-right')
}

control.prototype.init = function (editor) {
    left(editor, this.Left)
    right(editor, this.Right)
}