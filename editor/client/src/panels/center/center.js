import { canvas } from "./canvas/canvas"
import { switcher } from "./switcher/switcher"

export function center (base) {
    this.switcher = base.newEl('div.ed-structCenterSwitcher')
    this.centerWrapper = base.newEl('div.ed-structCenterWrapper')

    this.canvas = this.centerWrapper.newEl('div.ed-structCanvas')
    this.code = this.centerWrapper.newEl('div.ed-structCode')
    this.links = this.centerWrapper.newEl('div.ed-structLinks')
    this.fonts = this.centerWrapper.newEl('div.ed-fontSearch')
    //this.codeCSS = base.newEl('div.ed-structCodeCSS')
    //this.codeJS = base.newEl('div.ed-structCodeJS')
    this.path = base.newEl('div.ed-structPath')

    this.Canvas = new canvas(this.canvas)
}

center.prototype.init = function (editor, structLeft, structRight) {
    this.Canvas.init(editor)

    switcher(editor, this.switcher, this.canvas, this.code, this.links, this.fonts)
}