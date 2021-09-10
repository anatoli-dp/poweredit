import { blocks } from "./blocks"
import { com } from "./components/components"

export function components (editor, base, block) {
    let components = base.newEl('div.ed-sR-content-acomponents')
    components.style.display = 'none'

    com(editor)

    let Blocks = blocks(editor)

    editor.Commands.add('panel:right:content:components', {
        run() {
            block.parentElement.removeChild(block)
            components.appendChild(block)
            components.style.display = 'block'
            editor.BlockManager.render(Blocks)
        },

        stop() {
            components.style.display = 'none'
        }
    })
}