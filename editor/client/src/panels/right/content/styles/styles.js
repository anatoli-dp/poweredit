export function styles (editor, base, selector, style) {
    let styleContainer = base.newEl('div.ed-sR-content-style')

    let gjsSelector = styleContainer.newEl('div.ed-gjs-selector')
    gjsSelector.appendChild(selector)

    let gjsStyle = styleContainer.newEl('div.ed-gjs-style')
    gjsStyle.appendChild(style)

    styleContainer.style.display = 'none'

    editor.Commands.add('panel:right:content:styles', {
        run() {
            styleContainer.style.display = 'block'
        },

        stop() {
            styleContainer.style.display = 'none'
        }
    })
}