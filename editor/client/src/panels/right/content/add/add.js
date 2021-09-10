import { blocks } from "./blocks"

export function add (editor, base, block) {
    let add = base.newEl('div.ed-sR-content-add')
    let Blocks = blocks(editor)

    add.appendChild(block)

    add.style.display = 'none'

    editor.Commands.add('panel:right:content:add', {
        run() {
            block.parentElement.removeChild(block)
            add.appendChild(block)
            add.style.display = 'block'
            editor.BlockManager.render(Blocks)
        },

        stop() {
            add.style.display = 'none'
        }
    })
}