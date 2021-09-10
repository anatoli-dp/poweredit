import simpleScrollbar from '../../../stuffs/simple-scrollbar/simple-scrollbar'

//import { pages } from './pages/pages'
import { add } from './add/add'
//import { components } from './components/components'
import { assets } from './assets/assets'
import { settings } from './settings/settings'
import { styles } from './styles/styles'
import { styleManager } from './styleManager/styleManager'

export function content (editor, base, block, selector, style, trait) {
    let contentContainer = base.newEl('div.ed-sR-contentContainer')
    let content = contentContainer.newEl('div.ed-sR-content')

    simpleScrollbar.initEl(contentContainer)

    //pages(editor, content)
    add(editor, content, block)
    //components(editor, content, block)
    assets(editor, base)
    styles(editor, content, selector, style)
    styleManager(editor, content)
    settings(editor, content, trait)
}