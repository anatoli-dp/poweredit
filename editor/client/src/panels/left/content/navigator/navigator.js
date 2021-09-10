export function navigator (editor, base, layer) {
    const navigator = base.newEl('div.ed-sL-content-navigator')
    navigator.appendChild(layer)

    navigator.style.display = 'none'

    editor.Commands.add('panel:left:content:navigator', {
        run() {
            navigator.style.display = 'block'
        },

        stop() {
            navigator.style.display = 'none'
        }
    })
}