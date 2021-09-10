import simpleScrollbar from '../../../stuffs/simple-scrollbar/simple-scrollbar'
import { navigator } from './navigator/navigator'

export function content (editor, base, layer) {
    let contentContainer = base.newEl('div.ed-sL-contentContainer')
    let content = contentContainer.newEl('div.ed-sL-content')

    simpleScrollbar.initEl(contentContainer)

    navigator(editor, content, layer)
}