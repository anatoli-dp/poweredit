import { menu } from './menu/menu'
import { zoom } from './zoom/zoom'
import { redo } from './redo/redo'
import { preview } from './preview/preview'

export function left (editor, base) {
    menu(editor, base)
    zoom(editor, base)
    redo(editor, base)
    preview(editor, base)
}