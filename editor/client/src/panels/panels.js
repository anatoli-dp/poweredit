import { control } from './control/control'
import { right } from './right/right'
import { left } from './left/left'
import { center } from './center/center'

export function panels(base) {
    this.top = base.newEl('div.ed-structTop')
    this.bottom = base.newEl('div.ed-structBottom')

    this.left = this.bottom.newEl('div.ed-structLeft')
    this.center = this.bottom.newEl('div.ed-structCenter')
    this.right = this.bottom.newEl('div.ed-structRight')

    this.Control = new control(this.top)
    this.Right = new right(this.right)
    this.Center = new center(this.center)
    this.Left = new left(this.left)
}

panels.prototype.init = function (editor) {
    this.Control.init(editor)
    this.Right.init(editor, this.right, this.center)
    this.Center.init(editor)
    this.Left.init(editor, this.left, this.center)
}